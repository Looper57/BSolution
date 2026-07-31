import {
  EmailConfigurationError,
  getEmailConfiguration,
} from "@/lib/email/config";
import {
  ContactInputError,
  parseContactInput,
} from "@/lib/email/input";
import { logEmailEvent, type EmailLogStatus } from "@/lib/email/logging";
import { createContactEmailContent } from "@/lib/email/template";
import {
  ApiSecurityConfigurationError,
  getApiSecurityConfiguration,
} from "@/lib/api-security/config";
import { secureJsonResponse } from "@/lib/api-security/headers";
import {
  getTrustedClientIp,
  hmacFingerprint,
  readIdempotencyKey,
  validateRequestTimestamp,
} from "@/lib/api-security/identity";
import { logAbuseEvent, type AbuseCategory } from "@/lib/api-security/logging";
import { UpstashApiSecurityStore } from "@/lib/api-security/store";
import { verifyTurnstile } from "@/lib/api-security/turnstile";

const GENERIC_ERROR = "Unable to send message. Please try again later.";

type ResendResult = {
  id?: unknown;
};

export async function POST(req: Request) {
  const startedAt = performance.now();
  const requestId = crypto.randomUUID();
  const environment = process.env.VERCEL_ENV ?? process.env.NODE_ENV ?? "unknown";

  const respond = (
    status: EmailLogStatus,
    httpStatus: number,
    options: {
      success?: boolean;
      resendMessageId?: string;
      errorCategory?: string;
    } = {}
  ) => {
    logEmailEvent({
      requestId,
      timestamp: new Date().toISOString(),
      environment,
      status,
      durationMs: Math.round(performance.now() - startedAt),
      resendMessageId: options.resendMessageId,
      errorCategory: options.errorCategory,
    });

    return secureJsonResponse(
      options.success
        ? { success: true }
        : { success: false, error: GENERIC_ERROR },
      { status: httpStatus }
    );
  };

  try {
    const contentType = req.headers.get("content-type")?.split(";")[0].trim();
    if (contentType !== "application/json") {
      return respond("input-error", 415, {
        errorCategory: "unsupported-content-type",
      });
    }

    const config = getEmailConfiguration();
    const security = getApiSecurityConfiguration();
    const input = await parseContactInput(req);

    if (input.honeypot) {
      return respond("rejected", 200, {
        success: true,
        errorCategory: "honeypot",
      });
    }

    let store: UpstashApiSecurityStore | null = null;
    let idempotencyKey = "";
    let requestFingerprint = "";
    let fingerprintId = "development";
    const endpoint = "/api/contact";
    const now = Date.now();
    const clientIp = getTrustedClientIp(req);

    // Interim state: Upstash was never provisioned for bsolution.eu, so
    // getApiSecurityConfiguration() no longer hard-requires these three
    // (see that function's own comment) — gate the whole Redis-backed
    // layer on them actually being present instead of on `security.production`.
    // Turnstile verification below runs unconditionally in production
    // either way. Once Upstash is provisioned and these vars are set,
    // this block activates automatically — no code change needed.
    const redisAvailable = Boolean(
      security.redisUrl && security.redisToken && security.fingerprintSecret
    );

    if (redisAvailable) {
      idempotencyKey = readIdempotencyKey(req);
      const timestamp = validateRequestTimestamp(
        req,
        now,
        security.replayWindowMs
      );
      store = new UpstashApiSecurityStore(
        security.redisUrl,
        security.redisToken
      );
      const userAgent = req.headers.get("user-agent")?.slice(0, 512) ?? "";
      const actorId = await hmacFingerprint(security.fingerprintSecret, [
        clientIp,
        userAgent,
        endpoint,
      ]);
      fingerprintId = await hmacFingerprint(security.fingerprintSecret, [
        actorId,
        String(Math.floor(timestamp / security.replayWindowMs)),
      ]);
      requestFingerprint = await hmacFingerprint(security.fingerprintSecret, [
        actorId,
        input.name,
        input.email,
        input.message,
      ]);

      const stored = await store.getResult(`api:idem:${idempotencyKey}`);
      if (stored) {
        if (stored.fingerprint !== requestFingerprint) {
          logSecurity(
            requestId,
            fingerprintId,
            "suspicious-pattern",
            endpoint
          );
          return respond("security-error", 409, {
            errorCategory: "idempotency-conflict",
          });
        }
        return secureJsonResponse(stored.body, { status: stored.status });
      }

      const rate = await store.rateLimit(
        `api:rate:${actorId}`,
        now,
        security.rateWindowMs,
        security.rateLimit,
        requestId
      );
      if (!rate.allowed) {
        logSecurity(requestId, fingerprintId, "rate-limit", endpoint);
        return secureJsonResponse(
          { success: false, error: GENERIC_ERROR },
          {
            status: 429,
            headers: { "Retry-After": String(rate.retryAfterSeconds) },
          }
        );
      }

    }

    if (security.production || security.turnstileSecret) {
      if (!input.turnstileToken) {
        logSecurity(
          requestId,
          fingerprintId,
          "invalid-turnstile",
          endpoint
        );
        return respond("security-error", 400, {
          errorCategory: "turnstile-missing",
        });
      }

      const validTurnstile = await verifyTurnstile({
        secret: security.turnstileSecret,
        token: input.turnstileToken,
        remoteIp: clientIp,
        expectedHostname: new URL(req.url).hostname,
        expectedAction: "contact",
        now,
        maxAgeMs: security.replayWindowMs,
      });
      if (!validTurnstile) {
        logSecurity(
          requestId,
          fingerprintId,
          "invalid-turnstile",
          endpoint
        );
        return respond("security-error", 400, {
          errorCategory: "turnstile-rejected",
        });
      }

      if (store) {
        const tokenFingerprint = await hmacFingerprint(
          security.fingerprintSecret,
          [input.turnstileToken]
        );
        const unused = await store.acquire(
          `api:turnstile:${tokenFingerprint}`,
          requestId,
          Math.ceil(security.replayWindowMs / 1000)
        );
        if (!unused) {
          logSecurity(requestId, fingerprintId, "replay", endpoint);
          return respond("security-error", 409, {
            errorCategory: "turnstile-replay",
          });
        }
      }
    }

    if (store) {
      const acquired = await store.acquire(
        `api:idem:${idempotencyKey}`,
        `pending:${requestFingerprint}`,
        security.idempotencyTtlSeconds
      );
      if (!acquired) {
        logSecurity(requestId, fingerprintId, "replay", endpoint);
        return secureJsonResponse(
          { success: false, error: GENERIC_ERROR },
          { status: 409, headers: { "Retry-After": "1" } }
        );
      }

      const uniqueRequest = await store.acquire(
        `api:replay:${fingerprintId}:${requestFingerprint}`,
        requestId,
        Math.ceil(security.replayWindowMs / 1000)
      );
      if (!uniqueRequest) {
        logSecurity(requestId, fingerprintId, "replay", endpoint);
        return respond("security-error", 409, {
          errorCategory: "replay",
        });
      }
    }

    const content = createContactEmailContent(input);
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        from: config.from,
        to: [config.to],
        subject: content.subject,
        reply_to: input.email,
        html: content.html,
        text: content.text,
        tags: [{ name: "source", value: "website-contact-form" }],
      }),
    });

    const result: ResendResult = await resendResponse.json();
    if (!resendResponse.ok) {
      if (store) {
        await store.storeResult(
          `api:idem:${idempotencyKey}`,
          {
            fingerprint: requestFingerprint,
            status: 500,
            body: { success: false, error: GENERIC_ERROR },
          },
          security.idempotencyTtlSeconds
        );
      }
      return respond("provider-error", 500, {
        errorCategory: `resend-http-${resendResponse.status}`,
      });
    }

    if (typeof result.id !== "string" || result.id.length === 0) {
      if (store) {
        await store.storeResult(
          `api:idem:${idempotencyKey}`,
          {
            fingerprint: requestFingerprint,
            status: 500,
            body: { success: false, error: GENERIC_ERROR },
          },
          security.idempotencyTtlSeconds
        );
      }
      return respond("provider-error", 500, {
        errorCategory: "resend-invalid-response",
      });
    }

    const successBody = { success: true };
    if (store) {
      await store.storeResult(
        `api:idem:${idempotencyKey}`,
        {
          fingerprint: requestFingerprint,
          status: 200,
          body: successBody,
        },
        security.idempotencyTtlSeconds
      );
    }
    return respond("accepted", 200, {
      success: true,
      resendMessageId: result.id,
    });
  } catch (error: unknown) {
    if (error instanceof ContactInputError) {
      return respond("input-error", 400, {
        errorCategory: error.name,
      });
    }
    if (error instanceof EmailConfigurationError) {
      return respond("configuration-error", 500, {
        errorCategory: error.name,
      });
    }
    if (error instanceof ApiSecurityConfigurationError) {
      return respond("configuration-error", 500, {
        errorCategory: error.name,
      });
    }
    if (
      error instanceof Error &&
      [
        "Invalid Idempotency-Key",
        "Invalid request timestamp",
        "Expired request timestamp",
        "Trusted client IP unavailable",
      ].includes(error.message)
    ) {
      return respond("security-error", 400, {
        errorCategory: "malformed-security-request",
      });
    }
    return respond("unexpected-error", 500, {
      errorCategory:
        error instanceof Error && error.name ? error.name : "UnknownError",
    });
  }
}

function logSecurity(
  requestId: string,
  fingerprintId: string,
  category: AbuseCategory,
  endpoint: string
): void {
  logAbuseEvent({
    requestId,
    fingerprintId,
    category,
    timestamp: new Date().toISOString(),
    endpoint,
  });
}
