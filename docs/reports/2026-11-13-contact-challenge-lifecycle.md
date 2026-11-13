# Repeat employer enquiries and a pending challenge script

The successful-message screen removes the form DOM. Previously its mount-only effect retained the old widget reference, so choosing Send Another Message restored a form without a fresh challenge widget. A separate navigation race occurred when the shared script was still pending: only its first creator had an onload callback, closing over an unmounted form.

Each mounted form now owns a widget and a detachable script-load listener. A success disposes its widget; the next message mounts a fresh one. A newly mounted form can attach to an existing pending script. Cleanup ignores late callbacks and removes only its own widget. Failed delivery retains the brief, clears the used token and resets the active widget. Provider errors fail closed.

The official explicit-rendering script, contact action, environment site key and server validation remain in use. No production key, mail recipient, API validation, consent, price or public content change. No production enquiry is sent for verification.

Eight unit cases cover widget ownership, pending-script navigation, callbacks, reset, cleanup, re-entry and exceptions. The existing browser suite runs unchanged. A separate CI build uses Cloudflare's documented public dummy site key; two additional native journeys intercept both the provider script and all contact responses. They exercise failure/retry/another message with distinct tokens, and navigating away/back while loading. No test hook or mocked provider is shipped in the application; no secret test key is introduced. This tests the client lifecycle, not provider acceptance or real email delivery.

Validation results and deployed-source evidence are recorded in the shared private roadmap after the ordinary source/main checks. This change removes an enquiry obstacle; it does not establish ranking or lead growth.

Primary documentation: https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/ and https://developers.cloudflare.com/turnstile/troubleshooting/testing/ .
