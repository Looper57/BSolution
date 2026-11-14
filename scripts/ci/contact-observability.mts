import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { mkdir, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { setTimeout as delay } from 'node:timers/promises'
import { enquiryReport, logRows } from '../enquiries/aggregate'

// Exercise the compiled production API, not the uncompiled source mocked by
// unit tests. Provider calls stay inside the child process fixture above.
const origin = 'http://127.0.0.1:3116'
const preload = resolve('scripts/ci/contact-observability-providers.mjs')
const child = spawn(process.execPath, [resolve('node_modules/next/dist/bin/next'), 'start', '-H', '127.0.0.1', '-p', '3116'], {
  env: {
    ...process.env, NODE_ENV: 'production', VERCEL_ENV: 'production',
    NODE_OPTIONS: `--import=${JSON.stringify(preload)}`,
    RESEND_API_KEY: 're_observability_fixture',
    EMAIL_FROM: 'B Solution <noreply@bsolution.eu>',
    CONTACT_TO_EMAIL: 'runtime-observability@example.com',
    TURNSTILE_SECRET_KEY: 'observability-fixture-secret',
    NEXT_PUBLIC_TURNSTILE_SITE_KEY: '1x00000000000000000000AA',
    UPSTASH_REDIS_REST_URL: '', UPSTASH_REDIS_REST_TOKEN: '', API_SECURITY_HASH_SECRET: '',
    NEXT_TELEMETRY_DISABLED: '1',
  },
  stdio: ['ignore', 'pipe', 'pipe'],
})
let stdout = '', stderr = ''
child.stdout.on('data', data => { stdout += String(data) })
child.stderr.on('data', data => { stderr += String(data) })
let failure: unknown
const statuses: number[] = []
let report: ReturnType<typeof enquiryReport> | undefined
try {
  let ready = false
  for (let attempt = 0; attempt < 90; attempt++) {
    if (child.exitCode !== null) throw new Error('Production fixture server stopped before readiness')
    try { ready = (await fetch(`${origin}/api/contact`, { signal: AbortSignal.timeout(1000) })).status === 405 } catch { /* server is starting */ }
    if (ready) break
    await delay(500)
  }
  assert.ok(ready, 'Production fixture server did not become ready')
  const payload = {
    name: 'Runtime Private Name', email: 'runtime-private@example.com', company: 'Runtime Private Company',
    phone: '+49 000000000', message: 'runtime-private-brief', type: 'hiring',
    formPage: '/contact', recruitmentPage: '/de/hire-in-house-counsel', serviceInterest: 'executive-search', discoverySource: 'google',
    turnstileToken: 'observability-valid-token',
  }
  const post = async (body: Record<string, unknown>) => {
    const response = await fetch(`${origin}/api/contact`, {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'x-vercel-forwarded-for': '192.0.2.1' },
      body: JSON.stringify(body), signal: AbortSignal.timeout(10_000),
    })
    statuses.push(response.status)
    return response
  }
  assert.deepEqual(await (await post(payload)).json(), { success: true })
  assert.equal((await post({ ...payload, message: 'runtime-provider-failure' })).status, 500)
  assert.equal((await post({ ...payload, turnstileToken: 'observability-invalid-token' })).status, 400)
  assert.deepEqual(await (await post({ ...payload, _hp: 'fixture honeypot' })).json(), { success: true })
  const invalid = await fetch(`${origin}/api/contact`, { method: 'POST', headers: { 'Content-Type': 'text/plain' }, body: 'runtime-private-content' })
  statuses.push(invalid.status)
  assert.deepEqual(statuses, [200, 500, 400, 200, 415])
  await delay(100)
  const output = `${stdout}\n${stderr}`
  const lines = output.split(/\r?\n/)
  const events = lines.filter(line => line.startsWith('[contact-email] ')).map(line => JSON.parse(line.slice('[contact-email] '.length)))
  assert.deepEqual(events.map(event => event.status).sort(), ['accepted', 'input-error', 'provider-error', 'rejected', 'security-error'])
  assert.equal(events.filter(event => event.status === 'accepted').length, 1)
  assert.ok(lines.some(line => line.startsWith('[api-security] ') && JSON.parse(line.slice('[api-security] '.length)).category === 'invalid-turnstile'))
  assert.equal(lines.filter(line => line === '[observability-fixture] mocked-provider-request').length, 2)
  for (const value of [...Object.values(payload).slice(0, 5), 'runtime-provider-failure', 'runtime-private-content', 're_observability_fixture', 'observability-fixture-secret', 'observability-invalid-token']) {
    assert.ok(!output.includes(value), 'Private fixture content leaked to production logs')
  }
  report = enquiryReport(logRows(output))
  assert.equal(report.providerAcceptedMessages, 1)
  assert.equal(report.declaredEmployerEnquiries, 1)
  assert.equal(report.employerBySubmissionPage['/contact'], 1)
  assert.equal(report.employerByRecruitmentPage['/de/hire-in-house-counsel'], 1)
  assert.equal(report.recordedQualifiedEmployerEnquiries, null)
} catch (error) {
  failure = error
} finally {
  child.kill('SIGTERM')
  await Promise.race([new Promise<void>(done => child.once('exit', () => done())), delay(5000)])
  if (child.exitCode === null && child.signalCode === null) child.kill('SIGKILL')
  await mkdir('artifacts', { recursive: true })
  await writeFile('artifacts/contact-observability-proof.json', JSON.stringify({
    valid: !failure, productionRuntime: true, providersIntercepted: true,
    externalEmailsSent: 0, requestStatuses: statuses,
    providerAcceptedMessages: report?.providerAcceptedMessages ?? null,
    declaredEmployerEnquiries: report?.declaredEmployerEnquiries ?? null,
    mockedTurnstileRequests: stdout.split('[observability-fixture] mocked-turnstile-request').length - 1,
    mockedProviderRequests: stdout.split('[observability-fixture] mocked-provider-request').length - 1,
    qualificationsInferred: false,
    recruitmentPageRetained: report?.employerByRecruitmentPage['/de/hire-in-house-counsel'] === 1,
  }, null, 2) + '\n')
}
if (failure) throw failure
console.log('Production contact observability passed: accepted, rejected, security and provider events survive compilation; no private content logged; no external email sent.')
