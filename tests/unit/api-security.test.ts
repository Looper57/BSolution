import { afterEach, describe, expect, it, vi } from "vitest";

import { POST } from "@/app/api/contact/route";
import {
  ApiSecurityConfigurationError,
  getApiSecurityConfiguration,
} from "@/lib/api-security/config";
import { secureJsonResponse } from "@/lib/api-security/headers";
import {
  hmacFingerprint,
  readIdempotencyKey,
  validateRequestTimestamp,
} from "@/lib/api-security/identity";
import { UpstashApiSecurityStore } from "@/lib/api-security/store";
import { verifyTurnstile } from "@/lib/api-security/turnstile";
import { parseContactInput } from "@/lib/email/input";
import { PRODUCTION_EMAIL_FROM } from "@/lib/email/config";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

describe("API security configuration", () => {
  it("fails closed when production security configuration is incomplete", () => {
    expect(() =>
      getApiSecurityConfiguration({ NODE_ENV: "production" })
    ).toThrow(ApiSecurityConfigurationError);
  });

  it("still fails closed in production when only Turnstile is missing, even with Redis configured", () => {
    expect(() =>
      getApiSecurityConfiguration({
        NODE_ENV: "production",
        UPSTASH_REDIS_REST_URL: "https://example.upstash.io",
        UPSTASH_REDIS_REST_TOKEN: "token",
        API_SECURITY_HASH_SECRET: "x".repeat(32),
      })
    ).toThrow(ApiSecurityConfigurationError);
  });

  it("does not fail closed in production when only Turnstile is configured (Upstash not yet provisioned)", () => {
    const config = getApiSecurityConfiguration({
      NODE_ENV: "production",
      TURNSTILE_SECRET_KEY: "turnstile-secret",
      NEXT_PUBLIC_TURNSTILE_SITE_KEY: "turnstile-site-key",
    });
    expect(config.production).toBe(true);
    expect(config.redisUrl).toBe("");
    expect(config.redisToken).toBe("");
    expect(config.fingerprintSecret).toBe("");
  });

  it("accepts complete production configuration and configurable limits", () => {
    const config = getApiSecurityConfiguration({
      NODE_ENV: "production",
      UPSTASH_REDIS_REST_URL: "https://example.upstash.io",
      UPSTASH_REDIS_REST_TOKEN: "token",
      API_SECURITY_HASH_SECRET: "x".repeat(32),
      TURNSTILE_SECRET_KEY: "turnstile-secret",
      NEXT_PUBLIC_TURNSTILE_SITE_KEY: "turnstile-site-key",
      API_RATE_LIMIT: "7",
      API_RATE_WINDOW_MS: "120000",
    });
    expect(config.production).toBe(true);
    expect(config.rateLimit).toBe(7);
    expect(config.rateWindowMs).toBe(120_000);
  });
});

describe("request identity and replay primitives", () => {
  it("requires a well-formed idempotency key", () => {
    const valid = new Request("https://www.bsolution.eu/api/contact", {
      headers: { "Idempotency-Key": "12345678-1234-4234-8234-123456789abc" },
    });
    expect(readIdempotencyKey(valid)).toContain("12345678");
    expect(() =>
      readIdempotencyKey(
        new Request("https://www.bsolution.eu/api/contact", {
          headers: { "Idempotency-Key": "bad\r\nkey" },
        })
      )
    ).toThrow();
  });

  it("rejects missing, malformed, future and expired timestamps", () => {
    const now = 1_750_000_000_000;
    const make = (value?: string) =>
      new Request("https://www.bsolution.eu/api/contact", {
        headers: value ? { "X-Request-Timestamp": value } : {},
      });
    expect(validateRequestTimestamp(make(String(now)), now, 300_000)).toBe(now);
    expect(() => validateRequestTimestamp(make(), now, 300_000)).toThrow();
    expect(() =>
      validateRequestTimestamp(make(String(now - 300_001)), now, 300_000)
    ).toThrow();
    expect(() =>
      validateRequestTimestamp(make(String(now + 300_001)), now, 300_000)
    ).toThrow();
  });

  it("creates a stable non-personal HMAC fingerprint", async () => {
    const fingerprint = await hmacFingerprint("x".repeat(32), [
      "192.0.2.1",
      "browser",
      "/api/contact",
    ]);
    expect(fingerprint).toMatch(/^[a-f0-9]{64}$/u);
    expect(fingerprint).not.toContain("192.0.2.1");
    await expect(
      hmacFingerprint("x".repeat(32), [
        "192.0.2.1",
        "browser",
        "/api/contact",
      ])
    ).resolves.toBe(fingerprint);
  });
});

describe("distributed sliding-window store", () => {
  it("executes an atomic Redis sorted-set sliding window", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ result: [0, "1000"] }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    );
    const store = new UpstashApiSecurityStore(
      "https://example.upstash.io",
      "token"
    );
    const result = await store.rateLimit("rate:key", 60_000, 60_000, 5, "req");
    expect(result).toEqual({ allowed: false, retryAfterSeconds: 1 });
    const [, init] = fetchMock.mock.calls[0];
    const command = JSON.parse(String(init?.body)) as string[];
    expect(command[0]).toBe("EVAL");
    expect(command[1]).toContain("ZREMRANGEBYSCORE");
    expect(command[1]).toContain("ZADD");
    expect(command[1]).toContain("ZCARD");
  });

  it("uses atomic NX acquisition for replay and idempotency locks", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ result: "OK" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    );
    const store = new UpstashApiSecurityStore(
      "https://example.upstash.io",
      "token"
    );
    await expect(store.acquire("key", "value", 300)).resolves.toBe(true);
    const command = JSON.parse(
      String(fetchMock.mock.calls[0][1]?.body)
    ) as string[];
    expect(command).toEqual(["SET", "key", "value", "EX", "300", "NX"]);
  });
});

describe("Turnstile verification", () => {
  it("requires success, hostname, action and a fresh challenge", async () => {
    const now = Date.now();
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify({
          success: true,
          hostname: "www.bsolution.eu",
          action: "contact",
          challenge_ts: new Date(now - 1_000).toISOString(),
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      )
    );
    await expect(
      verifyTurnstile({
        secret: "secret",
        token: "token",
        remoteIp: "192.0.2.1",
        expectedHostname: "www.bsolution.eu",
        expectedAction: "contact",
        now,
        maxAgeMs: 300_000,
      })
    ).resolves.toBe(true);
  });

  it("rejects mismatched or stale challenges", async () => {
    const now = Date.now();
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify({
          success: true,
          hostname: "attacker.example",
          action: "other",
          challenge_ts: new Date(now - 600_000).toISOString(),
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      )
    );
    await expect(
      verifyTurnstile({
        secret: "secret",
        token: "token",
        remoteIp: "192.0.2.1",
        expectedHostname: "www.bsolution.eu",
        expectedAction: "contact",
        now,
        maxAgeMs: 300_000,
      })
    ).resolves.toBe(false);
  });
});

describe("API response and input hardening", () => {
  it("sets all mandatory no-cache and content security headers", () => {
    const response = secureJsonResponse({ success: false }, { status: 429 });
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect(response.headers.get("pragma")).toBe("no-cache");
    expect(response.headers.get("referrer-policy")).toBe("no-referrer");
    expect(response.headers.get("x-content-type-options")).toBe("nosniff");
    expect(response.headers.get("content-type")).toBe(
      "application/json; charset=utf-8"
    );
  });

  it("rejects duplicated top-level JSON fields", async () => {
    const duplicated = new Request("https://www.bsolution.eu/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: '{"name":"A","name":"B","email":"a@example.com","message":"Hi"}',
    });
    await expect(parseContactInput(duplicated)).rejects.toThrow(
      "duplicate fields"
    );
  });
});

describe("production idempotency integration", () => {
  it("returns the stored result without a duplicate Resend submission", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("RESEND_API_KEY", "re_test");
    vi.stubEnv("EMAIL_FROM", PRODUCTION_EMAIL_FROM);
    vi.stubEnv("CONTACT_TO_EMAIL", "contact@bsolution.eu");
    vi.stubEnv("UPSTASH_REDIS_REST_URL", "https://redis.example");
    vi.stubEnv("UPSTASH_REDIS_REST_TOKEN", "redis-token");
    vi.stubEnv("API_SECURITY_HASH_SECRET", "x".repeat(32));
    vi.stubEnv("TURNSTILE_SECRET_KEY", "turnstile-secret");
    vi.stubEnv("NEXT_PUBLIC_TURNSTILE_SITE_KEY", "turnstile-site-key");
    vi.spyOn(console, "info").mockImplementation(() => undefined);
    vi.spyOn(console, "warn").mockImplementation(() => undefined);
    vi.spyOn(console, "error").mockImplementation(() => undefined);

    let storedResult: string | null = null;
    let resendCalls = 0;
    vi.spyOn(globalThis, "fetch").mockImplementation(async (input, init) => {
      const url = String(input);
      if (url === "https://redis.example") {
        const command = JSON.parse(String(init?.body)) as string[];
        if (command[0] === "GET") {
          return Response.json({ result: storedResult });
        }
        if (command[0] === "EVAL") {
          return Response.json({ result: [1, String(Date.now())] });
        }
        if (command[0] === "SET" && command[1].startsWith("api:idem:")) {
          if (!command.includes("NX")) storedResult = command[2];
          return Response.json({ result: "OK" });
        }
        return Response.json({ result: "OK" });
      }
      if (url.includes("challenges.cloudflare.com")) {
        return Response.json({
          success: true,
          hostname: "www.bsolution.eu",
          action: "contact",
          challenge_ts: new Date().toISOString(),
        });
      }
      if (url === "https://api.resend.com/emails") {
        resendCalls += 1;
        return Response.json({ id: "email_123" });
      }
      throw new Error(`Unexpected URL: ${url}`);
    });

    const timestamp = String(Date.now());
    const makeRequest = () =>
      new Request("https://www.bsolution.eu/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Idempotency-Key": "12345678-1234-4234-8234-123456789abc",
          "X-Request-Timestamp": timestamp,
          "X-Vercel-Forwarded-For": "192.0.2.1",
          "User-Agent": "security-test",
        },
        body: JSON.stringify({
          name: "Ada Lovelace",
          email: "ada@example.com",
          message: "Confidential enquiry",
          turnstileToken: "single-use-token",
        }),
      });

    const first = await POST(makeRequest());
    const second = await POST(makeRequest());
    expect(first.status).toBe(200);
    expect(second.status).toBe(200);
    await expect(second.json()).resolves.toEqual({ success: true });
    expect(resendCalls).toBe(1);
  });
});

describe("production without Upstash provisioned (current bsolution.eu state)", () => {
  it("still verifies Turnstile and sends the email — Redis absence never blocks the request", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("RESEND_API_KEY", "re_test");
    vi.stubEnv("EMAIL_FROM", PRODUCTION_EMAIL_FROM);
    vi.stubEnv("CONTACT_TO_EMAIL", "contact@bsolution.eu");
    vi.stubEnv("TURNSTILE_SECRET_KEY", "turnstile-secret");
    vi.stubEnv("NEXT_PUBLIC_TURNSTILE_SITE_KEY", "turnstile-site-key");
    // Deliberately no UPSTASH_REDIS_REST_URL/TOKEN/API_SECURITY_HASH_SECRET.
    vi.spyOn(console, "info").mockImplementation(() => undefined);
    vi.spyOn(console, "warn").mockImplementation(() => undefined);
    vi.spyOn(console, "error").mockImplementation(() => undefined);

    let turnstileCalls = 0;
    let resendCalls = 0;
    vi.spyOn(globalThis, "fetch").mockImplementation(async (input) => {
      const url = String(input);
      if (url.includes("challenges.cloudflare.com")) {
        turnstileCalls += 1;
        return Response.json({
          success: true,
          hostname: "www.bsolution.eu",
          action: "contact",
          challenge_ts: new Date().toISOString(),
        });
      }
      if (url === "https://api.resend.com/emails") {
        resendCalls += 1;
        return Response.json({ id: "email_456" });
      }
      throw new Error(`Unexpected URL in no-Redis production path: ${url}`);
    });

    const request = new Request("https://www.bsolution.eu/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Vercel-Forwarded-For": "192.0.2.1",
        "User-Agent": "security-test",
      },
      body: JSON.stringify({
        name: "Grace Hopper",
        email: "grace@example.com",
        message: "Enquiry without Redis configured",
        turnstileToken: "single-use-token",
      }),
    });

    const response = await POST(request);
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ success: true });
    expect(turnstileCalls).toBe(1);
    expect(resendCalls).toBe(1);
  });

  it("still rejects a request with no Turnstile token — Redis absence never weakens Turnstile enforcement", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("RESEND_API_KEY", "re_test");
    vi.stubEnv("EMAIL_FROM", PRODUCTION_EMAIL_FROM);
    vi.stubEnv("CONTACT_TO_EMAIL", "contact@bsolution.eu");
    vi.stubEnv("TURNSTILE_SECRET_KEY", "turnstile-secret");
    vi.stubEnv("NEXT_PUBLIC_TURNSTILE_SITE_KEY", "turnstile-site-key");
    vi.spyOn(console, "info").mockImplementation(() => undefined);
    vi.spyOn(console, "warn").mockImplementation(() => undefined);
    vi.spyOn(console, "error").mockImplementation(() => undefined);
    const fetchSpy = vi.spyOn(globalThis, "fetch");

    const request = new Request("https://www.bsolution.eu/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Vercel-Forwarded-For": "192.0.2.1",
        "User-Agent": "security-test",
      },
      body: JSON.stringify({
        name: "No Token",
        email: "no-token@example.com",
        message: "Missing Turnstile token",
      }),
    });

    const response = await POST(request);
    expect(response.status).toBe(400);
    expect(fetchSpy).not.toHaveBeenCalled();
  });
});
