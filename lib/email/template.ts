import type { ContactEmailInput } from "./input";

export type ContactEmailContent = {
  subject: string;
  html: string;
  text: string;
};

export function createContactEmailContent(
  input: Pick<ContactEmailInput, "name" | "email" | "message">
): ContactEmailContent {
  const safeName = escapeHtml(input.name);
  const safeEmail = escapeHtml(input.email);
  const safeMessage = escapeHtml(input.message);

  return {
    subject: `B Solution website enquiry — ${stripHeaderControls(input.name)}`,
    text: [
      "New contact form enquiry",
      "",
      `Name: ${input.name}`,
      `Email: ${input.email}`,
      "",
      "Message:",
      input.message,
    ].join("\n"),
    html: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>New contact form enquiry</title>
  </head>
  <body>
    <main>
      <h1>New contact form enquiry</h1>
      <p><strong>Name:</strong> ${safeName}</p>
      <p><strong>Email:</strong> ${safeEmail}</p>
      <p><strong>Message:</strong></p>
      <p style="white-space: pre-wrap;">${safeMessage}</p>
    </main>
  </body>
</html>`,
  };
}

export function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function stripHeaderControls(value: string): string {
  return value.replace(/[\r\n]+/gu, " ").slice(0, 100);
}
