"use client";

export function createContactRequestHeaders(): Record<string, string> {
  return {
    "Content-Type": "application/json",
    "Idempotency-Key": crypto.randomUUID(),
    "X-Request-Timestamp": String(Date.now()),
  };
}
