const MAX_REQUEST_BYTES = 16_384;
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 10_000;

export type ContactEmailInput = {
  name: string;
  email: string;
  message: string;
  turnstileToken: string;
  honeypot: string;
};

export class ContactInputError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ContactInputError";
  }
}

export async function parseContactInput(
  request: Request
): Promise<ContactEmailInput> {
  const declaredLength = Number(request.headers.get("content-length"));

  if (
    Number.isFinite(declaredLength) &&
    declaredLength > MAX_REQUEST_BYTES
  ) {
    throw new ContactInputError("Request payload is too large");
  }

  const bytes = new Uint8Array(await request.arrayBuffer());
  if (bytes.byteLength > MAX_REQUEST_BYTES) {
    throw new ContactInputError("Request payload is too large");
  }

  let body: unknown;
  try {
    const source = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
    if (hasDuplicateTopLevelKeys(source)) {
      throw new ContactInputError("Request body contains duplicate fields");
    }
    body = JSON.parse(source);
  } catch (error: unknown) {
    if (error instanceof ContactInputError) throw error;
    throw new ContactInputError("Request body must be valid UTF-8 JSON");
  }

  if (!isRecord(body)) {
    throw new ContactInputError("Request body must be an object");
  }

  const rawName = readString(body, "name");
  const name = normalizeSingleLine(rawName);
  const email = normalizeEmail(readString(body, "email"));
  const message = normalizeMessage(readString(body, "message"));
  const turnstileToken = normalizeToken(
    readOptionalString(body, "turnstileToken")
  );
  const honeypot = normalizeSingleLine(readOptionalString(body, "_hp"));

  if (
    !name ||
    name.length > MAX_NAME_LENGTH ||
    hasControlCharacter(rawName)
  ) {
    throw new ContactInputError("Name is invalid");
  }

  if (
    !email ||
    email.length > MAX_EMAIL_LENGTH ||
    hasControlCharacter(email) ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/u.test(email)
  ) {
    throw new ContactInputError("Email is invalid");
  }

  if (
    !message ||
    message.length > MAX_MESSAGE_LENGTH ||
    hasUnsafeMessageControlCharacter(message)
  ) {
    throw new ContactInputError("Message is invalid");
  }

  return { name, email, message, turnstileToken, honeypot };
}

function hasDuplicateTopLevelKeys(source: string): boolean {
  const keys = new Set<string>();
  let depth = 0;
  let index = 0;
  while (index < source.length) {
    const character = source[index];
    if (character === "{") {
      depth += 1;
      index += 1;
      continue;
    }
    if (character === "}") {
      depth -= 1;
      index += 1;
      continue;
    }
    if (character !== '"') {
      index += 1;
      continue;
    }

    const start = index;
    index += 1;
    let escaped = false;
    while (index < source.length) {
      const current = source[index];
      if (!escaped && current === '"') break;
      escaped = !escaped && current === "\\";
      if (current !== "\\") escaped = false;
      index += 1;
    }
    const end = index;
    index += 1;
    if (depth !== 1) continue;
    while (/\s/u.test(source[index] ?? "")) index += 1;
    if (source[index] !== ":") continue;
    const key = JSON.parse(source.slice(start, end + 1)) as string;
    if (keys.has(key)) return true;
    keys.add(key);
  }
  return false;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readString(
  record: Record<string, unknown>,
  key: string
): string {
  const value = record[key];
  if (typeof value !== "string") {
    throw new ContactInputError(`${key} must be a string`);
  }
  return value;
}

function readOptionalString(
  record: Record<string, unknown>,
  key: string
): string {
  const value = record[key];
  if (value === undefined || value === null) return "";
  if (typeof value !== "string") {
    throw new ContactInputError(`${key} must be a string`);
  }
  return value;
}

function normalizeSingleLine(value: string): string {
  return value.trim().replace(/\s+/gu, " ");
}

function normalizeEmail(value: string): string {
  return value.trim().toLowerCase();
}

function normalizeMessage(value: string): string {
  return value.replace(/\r\n?/gu, "\n").trim();
}

function normalizeToken(value: string): string {
  return value.trim();
}

function hasControlCharacter(value: string): boolean {
  return /[\u0000-\u001f\u007f]/u.test(value) || hasLoneSurrogate(value);
}

function hasUnsafeMessageControlCharacter(value: string): boolean {
  return /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/u.test(value) ||
    hasLoneSurrogate(value);
}

function hasLoneSurrogate(value: string): boolean {
  for (let index = 0; index < value.length; index += 1) {
    const code = value.charCodeAt(index);
    if (code >= 0xd800 && code <= 0xdbff) {
      const next = value.charCodeAt(index + 1);
      if (next < 0xdc00 || next > 0xdfff) return true;
      index += 1;
    } else if (code >= 0xdc00 && code <= 0xdfff) {
      return true;
    }
  }
  return false;
}
