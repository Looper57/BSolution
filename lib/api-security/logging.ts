export type AbuseCategory =
  | "bot"
  | "replay"
  | "rate-limit"
  | "invalid-turnstile"
  | "malformed-request"
  | "suspicious-pattern";

export function logAbuseEvent(event: {
  requestId: string;
  fingerprintId: string;
  category: AbuseCategory;
  timestamp: string;
  endpoint: string;
}): void {
  console.warn("[api-security]", JSON.stringify(event));
}
