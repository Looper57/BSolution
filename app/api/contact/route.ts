export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL;

    if (!apiKey) {
      console.error("[v0] Missing RESEND_API_KEY");
      return Response.json(
        { success: false, error: "Missing RESEND_API_KEY" },
        { status: 500 }
      );
    }

    if (!toEmail) {
      console.error("[v0] Missing CONTACT_TO_EMAIL");
      return Response.json(
        { success: false, error: "Missing CONTACT_TO_EMAIL" },
        { status: 500 }
      );
    }

    const body = await req.json();
    const name = String(body?.name || "").trim();
    const email = String(body?.email || "").trim();
    const message = String(body?.message || "").trim();
    const turnstileToken = String(body?.turnstileToken || "").trim();
    const honeypot = String(body?._hp || "").trim();

    // Honeypot check - silently reject if filled (bot detected)
    if (honeypot) {
      // Return success to not alert the bot, but don't send email
      return Response.json({ success: true }, { status: 200 });
    }

    if (!name || !email || !message) {
      return Response.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Verify Cloudflare Turnstile token if secret key is configured
    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
    console.log("[v0] Turnstile token present:", !!turnstileToken, "Secret configured:", !!turnstileSecret);
    
    if (turnstileSecret) {
      if (!turnstileToken) {
        console.error("[v0] Missing Turnstile token - returning 400");
        return Response.json(
          { success: false, error: "Turnstile failed" },
          { status: 400 }
        );
      }

      console.log("[v0] Verifying Turnstile token...");
      
      const turnstileResponse = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            secret: turnstileSecret,
            response: turnstileToken,
          }),
        }
      );

      const turnstileResult = await turnstileResponse.json();
      console.log("[v0] Turnstile verification result:", JSON.stringify(turnstileResult));

      if (turnstileResult.success !== true) {
        console.error("[v0] Turnstile verification failed - returning 400:", turnstileResult);
        return Response.json(
          { success: false, error: "Turnstile failed" },
          { status: 400 }
        );
      }

      console.log("[v0] Turnstile verification success === true, proceeding to send email");
    }

    console.log("[v0] Sending email via Resend API", { to: toEmail, from: email, name });

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "onboarding@resend.dev",
        to: [toEmail],
        subject: `New contact form message from ${name}`,
        reply_to: email,
        html: `
          <h2>New contact form message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `,
      }),
    });

    const result = await resendResponse.json();

    console.log("[v0] Resend API response:", result);

    if (!resendResponse.ok) {
      console.error("[v0] Resend API error:", result);
      return Response.json(
        { success: false, error: result },
        { status: 500 }
      );
    }

    console.log("[v0] Email sent successfully");
    return Response.json({ success: true });
  } catch (error: unknown) {
    console.error("[v0] API error:", error);
    const message =
      error instanceof Error && error.message.length > 0
        ? error.message
        : typeof error === "object" &&
            error !== null &&
            "message" in error &&
            typeof error.message === "string" &&
            error.message.length > 0
          ? error.message
          : "Unknown error";
    return Response.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
