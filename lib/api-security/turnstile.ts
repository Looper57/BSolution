type TurnstileVerification = {
  success?: unknown;
  challenge_ts?: unknown;
  hostname?: unknown;
  action?: unknown;
};

export async function verifyTurnstile(options: {
  secret: string;
  token: string;
  remoteIp: string;
  expectedHostname: string;
  expectedAction: string;
  now: number;
  maxAgeMs: number;
}): Promise<boolean> {
  if (!options.token || options.token.length > 2_048) return false;
  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        secret: options.secret,
        response: options.token,
        remoteip: options.remoteIp,
      }),
      cache: "no-store",
    }
  );
  if (!response.ok) return false;
  const result = (await response.json()) as TurnstileVerification;
  if (
    result.success !== true ||
    result.hostname !== options.expectedHostname ||
    result.action !== options.expectedAction ||
    typeof result.challenge_ts !== "string"
  ) {
    return false;
  }
  const challengeTime = Date.parse(result.challenge_ts);
  return (
    Number.isFinite(challengeTime) &&
    challengeTime <= options.now + 30_000 &&
    options.now - challengeTime <= options.maxAgeMs
  );
}
