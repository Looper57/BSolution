# Production email architecture

## Scope and flow

The contact API validates a bounded UTF-8 JSON request, verifies the optional
Cloudflare Turnstile challenge when configured, creates text and HTML variants,
and submits one transactional notification to Resend.

The visible sender is always `B Solution <noreply@bsolution.eu>`. The visitor's
validated mailbox is used only as `Reply-To`. Resend supplies the MIME envelope,
UTF-8 transport, DKIM signature, Return-Path, and delivery infrastructure.

Logs contain only a request ID, timestamp, environment, status, duration,
optional Resend message ID, and non-personal error category.

## Required configuration

Production must provide:

- `RESEND_API_KEY`: a restricted Resend sending key.
- `EMAIL_FROM`: exactly `B Solution <noreply@bsolution.eu>`.
- `CONTACT_TO_EMAIL`: the internal mailbox receiving enquiries.

When Turnstile is enabled, both `TURNSTILE_SECRET_KEY` and
`NEXT_PUBLIC_TURNSTILE_SITE_KEY` must be configured and every submitting form
must supply a token. Configuration validation is fail-closed at the email API
boundary. In a serverless deployment, this is the earliest reliable runtime
boundary; the deployment pipeline must run the checklist below before traffic
is switched.

DNS cannot be proven by an environment variable or a static build. It is a
deployment gate verified against public DNS and a delivered message.

## Authentication

The expected authentication path is:

1. Header From: `noreply@bsolution.eu`.
2. Resend Return-Path: `send.bsolution.eu`.
3. SPF: `send.bsolution.eu` authorizes Amazon SES.
4. DKIM: Resend signs with an aligned `bsolution.eu` domain.
5. DMARC: either aligned SPF or aligned DKIM passes for `bsolution.eu`.

Current public DNS at the time this document was created:

- `bsolution.eu`: `v=spf1 a mx include:_spf.webglobe.cz ~all`
- `send.bsolution.eu`: `v=spf1 include:amazonses.com ~all`
- `send.bsolution.eu` MX: `feedback-smtp.eu-west-1.amazonses.com`
- `resend._domainkey.bsolution.eu`: a published RSA public key
- `_dmarc.bsolution.eu`: missing and required before release

Start DMARC monitoring with:

`v=DMARC1; p=none; rua=mailto:dmarc@bsolution.eu; adkim=r; aspf=r; pct=100`

The reporting mailbox must exist. Move to `p=quarantine`, and later `p=reject`,
only after all legitimate senders have passed monitored SPF/DKIM alignment.

## Deployment checklist

1. Confirm the Resend domain `bsolution.eu` is verified.
2. Confirm the production environment contains all mandatory variables.
3. Confirm `EMAIL_FROM` exactly matches the approved identity.
4. Publish DMARC with `p=none` and a working aggregate-report mailbox.
5. Confirm there is exactly one SPF record at each relevant hostname.
6. Confirm Resend's current DKIM records; rotate the legacy key if Resend offers
   a stronger current configuration.
7. Send test enquiries to Gmail and Microsoft-hosted recipients.
8. Inspect message headers for `spf=pass`, `dkim=pass`, `dmarc=pass`, aligned
   `header.from=bsolution.eu`, and expected `smtp.mailfrom`.
9. Confirm HTML and plain-text MIME parts are present and UTF-8 is intact.
10. Confirm no visitor data appears in server logs.
11. Confirm Resend bounce, complaint, and delayed-delivery monitoring.
12. Confirm Turnstile coverage and rate limiting before treating the endpoint as
    abuse-resistant.

## Operations

Monitor Resend delivery events, suppress repeated delivery to hard-bouncing
addresses, review DMARC aggregate reports, and periodically inspect Gmail and
Microsoft authentication headers. DMARC enforcement must not be tightened until
every legitimate sender using `bsolution.eu` has been identified and aligned.
