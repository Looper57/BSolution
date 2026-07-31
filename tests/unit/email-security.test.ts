import { afterEach, describe, expect, it, vi } from "vitest";

import { POST } from "@/app/api/contact/route";
import {
  EmailConfigurationError,
  getEmailConfiguration,
  PRODUCTION_EMAIL_FROM,
} from "@/lib/email/config";
import {
  ContactInputError,
  parseContactInput,
} from "@/lib/email/input";
import {
  createContactEmailContent,
  escapeHtml,
} from "@/lib/email/template";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

function request(body: unknown): Request {
  return new Request("https://www.bsolution.eu/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("production email configuration", () => {
  it("requires the exact approved From identity", () => {
    expect(
      getEmailConfiguration({
        RESEND_API_KEY: "re_test",
        EMAIL_FROM: PRODUCTION_EMAIL_FROM,
        CONTACT_TO_EMAIL: "contact@bsolution.eu",
      })
    ).toEqual({
      apiKey: "re_test",
      from: "B Solution <noreply@bsolution.eu>",
      to: "contact@bsolution.eu",
    });

    expect(() =>
      getEmailConfiguration({
        RESEND_API_KEY: "re_test",
        EMAIL_FROM: "Visitor <visitor@example.com>",
        CONTACT_TO_EMAIL: "contact@bsolution.eu",
      })
    ).toThrow(EmailConfigurationError);
  });

  it("fails closed when mandatory configuration is missing", () => {
    expect(() => getEmailConfiguration({})).toThrow(
      "RESEND_API_KEY, EMAIL_FROM, CONTACT_TO_EMAIL"
    );
  });
});

describe("contact input validation", () => {
  it("normalizes valid input while preserving message line breaks", async () => {
    await expect(
      parseContactInput(
        request({
          name: "  Ada   Lovelace ",
          email: " ADA@EXAMPLE.COM ",
          message: " First line\r\nSecond line ",
        })
      )
    ).resolves.toMatchObject({
      name: "Ada Lovelace",
      email: "ada@example.com",
      message: "First line\nSecond line",
    });
  });

  it.each([
    { name: "Bad\nName", email: "a@example.com", message: "Hello" },
    { name: "Name", email: "not-an-email", message: "Hello" },
    { name: "Name", email: "a@example.com", message: "Bad\u0000message" },
  ])("rejects unsafe or malformed input", async (body) => {
    await expect(parseContactInput(request(body))).rejects.toBeInstanceOf(
      ContactInputError
    );
  });

  it("rejects malformed UTF-8 before JSON parsing", async () => {
    const malformed = new Uint8Array([0x7b, 0x22, 0x78, 0x22, 0x3a, 0xc3, 0x7d]);
    const malformedRequest = new Request(
      "https://www.bsolution.eu/api/contact",
      {
        method: "POST",
        body: malformed,
      }
    );

    await expect(parseContactInput(malformedRequest)).rejects.toThrow(
      "valid UTF-8 JSON"
    );
  });

  it("rejects oversized request bodies", async () => {
    await expect(
      parseContactInput(
        request({
          name: "Name",
          email: "a@example.com",
          message: "x".repeat(20_000),
        })
      )
    ).rejects.toThrow("too large");
  });
});

describe("contact email content", () => {
  it("escapes every user-supplied HTML value", () => {
    const content = createContactEmailContent({
      name: '<img src=x onerror="alert(1)">',
      email: "a&b@example.com",
      message: "<script>alert('x')</script>",
    });

    expect(content.html).not.toContain("<script>");
    expect(content.html).not.toContain("<img");
    expect(content.html).toContain("&lt;script&gt;");
    expect(content.html).toContain("&amp;");
    expect(content.text).toContain("<script>alert('x')</script>");
  });

  it("provides accessible HTML and a plain-text alternative", () => {
    const content = createContactEmailContent({
      name: "Ada Lovelace",
      email: "ada@example.com",
      message: "Confidential enquiry",
    });

    expect(content.html).toContain('<meta charset="utf-8">');
    expect(content.html).toContain("<main>");
    expect(content.html).toContain("<h1>");
    expect(content.html).not.toMatch(/<script|onerror=|javascript:/iu);
    expect(content.text).toContain("Name: Ada Lovelace");
    expect(content.text).toContain("Message:\nConfidential enquiry");
  });

  it("escapes all HTML-sensitive characters", () => {
    expect(escapeHtml(`&<>"'`)).toBe("&amp;&lt;&gt;&quot;&#39;");
  });
});

describe("contact email API boundary", () => {
  it("uses the approved From and visitor address only as Reply-To", async () => {
    vi.stubEnv("RESEND_API_KEY", "re_secret");
    vi.stubEnv("EMAIL_FROM", PRODUCTION_EMAIL_FROM);
    vi.stubEnv("CONTACT_TO_EMAIL", "contact@bsolution.eu");
    vi.stubEnv("TURNSTILE_SECRET_KEY", "");
    vi.spyOn(console, "info").mockImplementation(() => undefined);
    vi.spyOn(console, "error").mockImplementation(() => undefined);

    const send = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ id: "email_123" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    );

    const response = await POST(
      request({
        name: "Ada Lovelace",
        email: "visitor@example.com",
        message: "A confidential enquiry",
      })
    );

    expect(response.status).toBe(200);
    expect(send).toHaveBeenCalledTimes(1);
    const [, init] = send.mock.calls[0];
    const payload = JSON.parse(String(init?.body)) as Record<string, unknown>;
    expect(payload.from).toBe(PRODUCTION_EMAIL_FROM);
    expect(payload.reply_to).toBe("visitor@example.com");
    expect(payload.from).not.toContain("visitor@example.com");
    expect(payload).toHaveProperty("html");
    expect(payload).toHaveProperty("text");
  });

  it("returns a generic error without exposing a Resend payload", async () => {
    vi.stubEnv("RESEND_API_KEY", "re_secret");
    vi.stubEnv("EMAIL_FROM", PRODUCTION_EMAIL_FROM);
    vi.stubEnv("CONTACT_TO_EMAIL", "contact@bsolution.eu");
    vi.stubEnv("TURNSTILE_SECRET_KEY", "");
    vi.spyOn(console, "info").mockImplementation(() => undefined);
    vi.spyOn(console, "error").mockImplementation(() => undefined);
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify({
          message: "provider detail",
          apiKey: "must-not-leak",
        }),
        {
          status: 422,
          headers: { "Content-Type": "application/json" },
        }
      )
    );

    const response = await POST(
      request({
        name: "Ada Lovelace",
        email: "visitor@example.com",
        message: "A confidential enquiry",
      })
    );
    const result = await response.json();

    expect(response.status).toBe(500);
    expect(result).toEqual({
      success: false,
      error: "Unable to send message. Please try again later.",
    });
    expect(JSON.stringify(result)).not.toContain("provider detail");
    expect(JSON.stringify(result)).not.toContain("must-not-leak");
  });
});
