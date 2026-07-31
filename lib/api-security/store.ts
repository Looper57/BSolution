export type RateLimitResult = {
  allowed: boolean;
  retryAfterSeconds: number;
};

export type StoredApiResult = {
  fingerprint: string;
  status: number;
  body: unknown;
};

export interface ApiSecurityStore {
  rateLimit(
    key: string,
    now: number,
    windowMs: number,
    limit: number,
    member: string
  ): Promise<RateLimitResult>;
  acquire(key: string, value: string, ttlSeconds: number): Promise<boolean>;
  getResult(key: string): Promise<StoredApiResult | null>;
  storeResult(
    key: string,
    result: StoredApiResult,
    ttlSeconds: number
  ): Promise<void>;
}

export class UpstashApiSecurityStore implements ApiSecurityStore {
  constructor(
    private readonly url: string,
    private readonly token: string
  ) {}

  async rateLimit(
    key: string,
    now: number,
    windowMs: number,
    limit: number,
    member: string
  ): Promise<RateLimitResult> {
    const script = [
      "redis.call('ZREMRANGEBYSCORE', KEYS[1], 0, ARGV[1])",
      "local count = redis.call('ZCARD', KEYS[1])",
      "if count >= tonumber(ARGV[3]) then",
      " local oldest = redis.call('ZRANGE', KEYS[1], 0, 0, 'WITHSCORES')",
      " return {0, oldest[2] or ARGV[2]}",
      "end",
      "redis.call('ZADD', KEYS[1], ARGV[2], ARGV[4])",
      "redis.call('PEXPIRE', KEYS[1], ARGV[5])",
      "return {1, ARGV[2]}",
    ].join("\n");
    const result = await this.command<[number, string]>([
      "EVAL",
      script,
      "1",
      key,
      String(now - windowMs),
      String(now),
      String(limit),
      member,
      String(windowMs),
    ]);
    const allowed = Number(result[0]) === 1;
    const oldest = Number(result[1]);
    return {
      allowed,
      retryAfterSeconds: allowed
        ? 0
        : Math.max(1, Math.ceil((oldest + windowMs - now) / 1000)),
    };
  }

  async acquire(
    key: string,
    value: string,
    ttlSeconds: number
  ): Promise<boolean> {
    const result = await this.command<string | null>([
      "SET",
      key,
      value,
      "EX",
      String(ttlSeconds),
      "NX",
    ]);
    return result === "OK";
  }

  async getResult(key: string): Promise<StoredApiResult | null> {
    const result = await this.command<string | null>(["GET", key]);
    if (!result || result.startsWith("pending:")) return null;
    try {
      return JSON.parse(result) as StoredApiResult;
    } catch {
      throw new Error("Invalid idempotency record");
    }
  }

  async storeResult(
    key: string,
    result: StoredApiResult,
    ttlSeconds: number
  ): Promise<void> {
    await this.command<string>([
      "SET",
      key,
      JSON.stringify(result),
      "EX",
      String(ttlSeconds),
    ]);
  }

  private async command<T>(command: readonly string[]): Promise<T> {
    const response = await fetch(this.url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(command),
      cache: "no-store",
    });
    if (!response.ok) throw new Error("Distributed security store unavailable");
    const payload: unknown = await response.json();
    if (
      typeof payload !== "object" ||
      payload === null ||
      !("result" in payload)
    ) {
      throw new Error("Invalid distributed security store response");
    }
    return payload.result as T;
  }
}
