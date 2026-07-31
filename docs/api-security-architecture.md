# API security architecture

## Protected endpoint inventory

The only public application API is `POST /api/contact`. It is called by the
main localized Contact form and six specialist recruitment enquiry forms.
Every caller supplies a Turnstile token, an `Idempotency-Key`, and an
`X-Request-Timestamp`.

## Production request flow

1. Require `application/json`.
2. Load fail-closed email and API security configuration.
3. Enforce a 16 KiB UTF-8 JSON body and reject duplicate top-level fields.
4. Validate the idempotency key and timestamp freshness.
5. Derive HMAC identifiers from the trusted Vercel client IP, user agent,
   endpoint, and timestamp bucket. Raw signals are never stored or logged.
6. Return a previously completed idempotent result when key and request digest
   match.
7. Apply an atomic Redis sorted-set sliding-window limit.
8. Verify Turnstile server-side, including hostname, action, challenge age, and
   remote IP.
9. Record the Turnstile token HMAC with Redis `SET NX` to prevent reuse.
10. Acquire idempotency and replay locks with Redis `SET NX`.
11. Process the existing contact-email operation once.
12. Persist the successful response for idempotent retries.

Any production storage or security configuration failure stops processing.
There is no in-memory production fallback.

## Distributed rate limiting

Upstash Redis REST is used without an additional runtime package. A Lua script
atomically removes timestamps outside the window, counts the remaining sorted
set, adds the current request, and applies expiry. Defaults are five requests
per 60 seconds. `API_RATE_LIMIT` and `API_RATE_WINDOW_MS` override them.
Rejected requests receive HTTP 429 and `Retry-After`.

## Idempotency and replay protection

Clients generate a UUID `Idempotency-Key` per intentional submission. Completed
responses are stored for `API_IDEMPOTENCY_TTL_SECONDS` (default 24 hours) and
bound to an HMAC request digest. Reusing a key for different content is rejected.
Concurrent processing is blocked by an atomic pending lock.

`X-Request-Timestamp` must be a 13-digit Unix millisecond value within
`API_REPLAY_WINDOW_MS` (default five minutes). A request fingerprint and
timestamp bucket are stored only as HMAC values. Turnstile tokens are separately
single-use.

## Turnstile

Production requires both `TURNSTILE_SECRET_KEY` and
`NEXT_PUBLIC_TURNSTILE_SITE_KEY`. Development may omit both. Verification checks
Cloudflare success, the request hostname, the `contact` action, challenge age,
and remote IP. Tokens missing, malformed, expired, mismatched, or reused do not
reach email delivery.

## Configuration

Production additionally requires:

- `UPSTASH_REDIS_REST_URL` using HTTPS
- `UPSTASH_REDIS_REST_TOKEN`
- `API_SECURITY_HASH_SECRET` with at least 32 random characters
- `TURNSTILE_SECRET_KEY`
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`

Optional:

- `API_RATE_LIMIT` (default `5`)
- `API_RATE_WINDOW_MS` (default `60000`)
- `API_IDEMPOTENCY_TTL_SECONDS` (default `86400`)
- `API_REPLAY_WINDOW_MS` (default `300000`)

## Observability

Structured application logs allow private metrics for total, accepted, blocked,
rate-limited, replayed, Turnstile-failed, duplicate, and categorized abuse
requests. Security events contain only request ID, HMAC fingerprint ID,
category, timestamp, and endpoint. Metrics must be created in the private log
backend; no public metrics route exists.

## Deployment checklist

1. Provision a production Upstash database in the same preferred region.
2. Add all mandatory variables to Production and Preview environments.
3. Use a cryptographically random hash secret and keep it out of source control.
4. Add production and Preview hostnames to the Turnstile widget allowlist.
5. Verify every form renders Turnstile and sends all security headers.
6. Exercise successful, expired, reused, rate-limited and idempotent requests.
7. Confirm 429 includes `Retry-After` and every API response has no-store
   headers.
8. Confirm Redis outages fail closed and generate an operational alert.
9. Create private dashboards and alerts from structured security logs.
10. Rotate Redis, Turnstile and HMAC secrets according to the security policy.
