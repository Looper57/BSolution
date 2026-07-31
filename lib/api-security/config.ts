export type ApiSecurityConfiguration = {
  production: boolean;
  redisUrl: string;
  redisToken: string;
  fingerprintSecret: string;
  turnstileSecret: string;
  turnstileSiteKey: string;
  rateLimit: number;
  rateWindowMs: number;
  idempotencyTtlSeconds: number;
  replayWindowMs: number;
};

export class ApiSecurityConfigurationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ApiSecurityConfigurationError";
  }
}

export function getApiSecurityConfiguration(
  environment: Readonly<Record<string, string | undefined>> = process.env
): ApiSecurityConfiguration {
  const production = environment.NODE_ENV === "production";
  const values = {
    redisUrl: environment.UPSTASH_REDIS_REST_URL?.trim() ?? "",
    redisToken: environment.UPSTASH_REDIS_REST_TOKEN?.trim() ?? "",
    fingerprintSecret: environment.API_SECURITY_HASH_SECRET?.trim() ?? "",
    turnstileSecret: environment.TURNSTILE_SECRET_KEY?.trim() ?? "",
    turnstileSiteKey:
      environment.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() ?? "",
  };

  if (production) {
    // UPSTASH_REDIS_REST_URL/TOKEN and API_SECURITY_HASH_SECRET are
    // deliberately NOT in this required list. They were never provisioned
    // for bsolution.eu (no Upstash database exists yet), and requiring
    // them here made every production /api/contact request throw before
    // Turnstile or email — which DO have real secrets configured — ever
    // ran. Interim state: Redis-backed rate limiting, idempotency, and
    // replay protection are active only when those three vars are
    // actually present (see `redisAvailable` in app/api/contact/route.ts);
    // Turnstile verification and email delivery work unconditionally.
    // Provisioning Upstash and setting these three vars later re-enables
    // the Redis layer with no code change needed.
    const missing = [
      !values.turnstileSecret && "TURNSTILE_SECRET_KEY",
      !values.turnstileSiteKey && "NEXT_PUBLIC_TURNSTILE_SITE_KEY",
    ].filter(Boolean);
    if (missing.length > 0) {
      throw new ApiSecurityConfigurationError(
        `Missing required API security configuration: ${missing.join(", ")}`
      );
    }
  }

  if (values.redisUrl && !/^https:\/\//u.test(values.redisUrl)) {
    throw new ApiSecurityConfigurationError(
      "UPSTASH_REDIS_REST_URL must use HTTPS"
    );
  }
  if (
    values.fingerprintSecret &&
    values.fingerprintSecret.length < 32
  ) {
    throw new ApiSecurityConfigurationError(
      "API_SECURITY_HASH_SECRET must contain at least 32 characters"
    );
  }

  return {
    production,
    ...values,
    rateLimit: positiveInteger(environment.API_RATE_LIMIT, 5),
    rateWindowMs: positiveInteger(environment.API_RATE_WINDOW_MS, 60_000),
    idempotencyTtlSeconds: positiveInteger(
      environment.API_IDEMPOTENCY_TTL_SECONDS,
      86_400
    ),
    replayWindowMs: positiveInteger(
      environment.API_REPLAY_WINDOW_MS,
      300_000
    ),
  };
}

function positiveInteger(value: string | undefined, fallback: number): number {
  if (!value) return fallback;
  const parsed = Number(value);
  if (!Number.isSafeInteger(parsed) || parsed <= 0) {
    throw new ApiSecurityConfigurationError(
      "API security numeric configuration must be a positive integer"
    );
  }
  return parsed;
}
