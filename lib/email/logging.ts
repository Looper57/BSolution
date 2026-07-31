export type EmailLogStatus =
  | "accepted"
  | "rejected"
  | "configuration-error"
  | "input-error"
  | "security-error"
  | "provider-error"
  | "unexpected-error";

export type EmailLogEvent = {
  requestId: string;
  timestamp: string;
  environment: string;
  status: EmailLogStatus;
  durationMs: number;
  resendMessageId?: string;
  errorCategory?: string;
};

export function logEmailEvent(event: EmailLogEvent): void {
  const serialized = JSON.stringify(event);
  if (
    event.status === "provider-error" ||
    event.status === "configuration-error" ||
    event.status === "unexpected-error"
  ) {
    console.error("[contact-email]", serialized);
    return;
  }
  console.info("[contact-email]", serialized);
}
