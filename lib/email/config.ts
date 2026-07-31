export const PRODUCTION_EMAIL_FROM =
  "B Solution <noreply@bsolution.eu>" as const;

export type EmailConfiguration = {
  apiKey: string;
  from: typeof PRODUCTION_EMAIL_FROM;
  to: string;
};

export class EmailConfigurationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "EmailConfigurationError";
  }
}

export function getEmailConfiguration(
  environment: Readonly<Record<string, string | undefined>> = process.env
): EmailConfiguration {
  const apiKey = environment.RESEND_API_KEY?.trim();
  const from = environment.EMAIL_FROM?.trim();
  const to = environment.CONTACT_TO_EMAIL?.trim();

  const missing = [
    !apiKey && "RESEND_API_KEY",
    !from && "EMAIL_FROM",
    !to && "CONTACT_TO_EMAIL",
  ].filter(Boolean);

  if (missing.length > 0) {
    throw new EmailConfigurationError(
      `Missing required email configuration: ${missing.join(", ")}`
    );
  }

  if (from !== PRODUCTION_EMAIL_FROM) {
    throw new EmailConfigurationError(
      `EMAIL_FROM must exactly equal "${PRODUCTION_EMAIL_FROM}"`
    );
  }

  if (!isMailbox(to!)) {
    throw new EmailConfigurationError("CONTACT_TO_EMAIL is not a valid mailbox");
  }

  return {
    apiKey: apiKey!,
    from: PRODUCTION_EMAIL_FROM,
    to: to!,
  };
}

function isMailbox(value: string): boolean {
  return (
    value.length <= 254 &&
    !/[\u0000-\u001f\u007f]/u.test(value) &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/u.test(value)
  );
}
