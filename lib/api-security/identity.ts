const IDEMPOTENCY_KEY = /^[A-Za-z0-9][A-Za-z0-9._:-]{15,127}$/u;

export function readIdempotencyKey(request: Request): string {
  const value = request.headers.get("idempotency-key")?.trim() ?? "";
  if (!IDEMPOTENCY_KEY.test(value)) {
    throw new Error("Invalid Idempotency-Key");
  }
  return value;
}

export function validateRequestTimestamp(
  request: Request,
  now: number,
  replayWindowMs: number
): number {
  const raw = request.headers.get("x-request-timestamp");
  if (!raw || !/^\d{13}$/u.test(raw)) {
    throw new Error("Invalid request timestamp");
  }
  const timestamp = Number(raw);
  if (Math.abs(now - timestamp) > replayWindowMs) {
    throw new Error("Expired request timestamp");
  }
  return timestamp;
}

export function getTrustedClientIp(request: Request): string {
  const vercelForwarded = request.headers.get("x-vercel-forwarded-for");
  if (vercelForwarded) return vercelForwarded.split(",")[0].trim();
  if (process.env.NODE_ENV !== "production") {
    return request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      "development";
  }
  throw new Error("Trusted client IP unavailable");
}

export async function hmacFingerprint(
  secret: string,
  parts: readonly string[]
): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(parts.join("\u001f"))
  );
  return Array.from(new Uint8Array(signature), (byte) =>
    byte.toString(16).padStart(2, "0")
  ).join("");
}
