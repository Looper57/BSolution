// Loaded only by the isolated production-runtime check, never by the app.
// All outbound fetches are intercepted or rejected. No real email is sent.
import assert from 'node:assert/strict'

globalThis.fetch = async (input, init) => {
  const url = new URL(typeof input === 'string' || input instanceof URL ? input : input.url)
  if (url.href === 'https://challenges.cloudflare.com/turnstile/v0/siteverify') {
    process.stdout.write('[observability-fixture] mocked-turnstile-request\n')
    const body = new URLSearchParams(init?.body)
    assert.equal(body.get('secret'), 'observability-fixture-secret')
    return Response.json({
      success: body.get('response') === 'observability-valid-token',
      hostname: 'localhost', action: 'contact', challenge_ts: new Date().toISOString(),
    })
  }
  if (url.href === 'https://api.resend.com/emails') {
    const payload = JSON.parse(init?.body)
    assert.deepEqual(payload.to, ['runtime-observability@example.com'])
    assert.equal(payload.from, 'B Solution <noreply@bsolution.eu>')
    assert.ok(payload.text.includes('Recruitment page (browser-declared): /de/hire-in-house-counsel'))
    assert.equal(new Headers(init?.headers).get('authorization'), 'Bearer re_observability_fixture')
    process.stdout.write('[observability-fixture] mocked-provider-request\n')
    return payload.text.includes('runtime-provider-failure')
      ? Response.json({ error: 'fixture provider rejection' }, { status: 503 })
      : Response.json({ id: 'observability_fixture_delivery' })
  }
  throw new Error('Unexpected network request in isolated observability fixture')
}
