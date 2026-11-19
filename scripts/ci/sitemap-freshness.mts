import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { mkdir, writeFile } from 'node:fs/promises'
import { createServer } from 'node:http'
import { resolve } from 'node:path'
import { setTimeout as delay } from 'node:timers/promises'

// Change a local-only upstream after compilation. Both public sitemap URLs
// must follow that change without waiting for separate output-cache refreshes.
const id = '7b871e06-aee6-4df6-8035-33dfb40cc019'
let open = true
let upstreamRequests = 0
const feed = createServer((request, response) => {
  upstreamRequests++
  const url = new URL(request.url ?? '/', 'http://localhost')
  response.setHeader('Content-Type', 'application/json')
  if (url.pathname === '/positions') return response.end(JSON.stringify({ positions: [] }))
  const locale = url.searchParams.get('locale') ?? 'en'
  response.end(JSON.stringify({ jobs: open ? [{
    id, title: 'Synthetic sitemap counsel', employer: null, country: 'CZ', city: 'Prague',
    remote: false, role: 'in_house_counsel', seniority: null, practiceAreas: [], languages: [],
    summary: 'Synthetic local fixture only.', summaryLocale: locale,
    sourceUrl: 'https://example.com/synthetic-sitemap-job', postedAt: null,
    firstSeenAt: '2026-11-19T00:00:00Z', status: 'open',
  }] : [] }))
})
await new Promise<void>(resolve => feed.listen(0, '127.0.0.1', resolve))
const address = feed.address()
assert.ok(address && typeof address === 'object')
const feedOrigin = `http://127.0.0.1:${address.port}`
const origin = 'http://127.0.0.1:3126'
const child = spawn(process.execPath, [resolve('node_modules/next/dist/bin/next'), 'start', '-H', '127.0.0.1', '-p', '3126'], {
  env: { ...process.env, NODE_ENV: 'production', NEXT_TELEMETRY_DISABLED: '1',
    LAWBRIDGE_LEGAL_JOBS_FEED_URL: `${feedOrigin}/jobs`, LAWBRIDGE_POSITIONS_FEED_URL: `${feedOrigin}/positions` },
  stdio: ['ignore', 'pipe', 'pipe'],
})
let output = ''
child.stdout.on('data', data => { output += String(data) })
child.stderr.on('data', data => { output += String(data) })
let failure: unknown
try {
  let ready = false
  for (let attempt = 0; attempt < 90; attempt++) {
    if (child.exitCode !== null) throw new Error('Sitemap fixture server exited')
    try { ready = (await fetch(`${origin}/api/contact`, { signal: AbortSignal.timeout(1000) })).status === 405 } catch { /* starting */ }
    if (ready) break
    await delay(500)
  }
  assert.ok(ready, 'Production fixture server did not start')
  const urls = async (path: string) => {
    const response = await fetch(origin + path, { signal: AbortSignal.timeout(20_000) })
    assert.equal(response.status, 200)
    assert.ok(response.headers.get('content-type')?.includes('xml'))
    const xml = await response.text()
    return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]).sort()
  }
  const openPrimary = await urls('/sitemap.xml')
  const openSubmitted = await urls('/site-sitemap.xml')
  assert.equal(openPrimary.filter(url => url.endsWith(`/legal-jobs/${id}`)).length, 4, 'Original sitemap must read the runtime feed, not retain a build snapshot')
  assert.deepEqual(openPrimary, openSubmitted)
  for (const locale of ['', '/cs', '/de', '/pl']) {
    assert.equal((await fetch(`${origin}${locale}/legal-jobs/${id}`)).status, 200)
  }
  open = false
  const closedPrimary = await urls('/sitemap.xml')
  const closedSubmitted = await urls('/site-sitemap.xml')
  assert.ok(!closedPrimary.some(url => url.includes(id)), 'Withdrawn fixture must immediately leave the original sitemap')
  assert.deepEqual(closedPrimary, closedSubmitted)
  for (const locale of ['', '/cs', '/de', '/pl']) {
    assert.equal((await fetch(`${origin}${locale}/legal-jobs/${id}`)).status, 404)
  }
  assert.deepEqual(closedPrimary, openPrimary.filter(url => !url.includes(`/legal-jobs/${id}`) && !/\/legal-jobs\/cz$/.test(url)))
  await mkdir('artifacts', { recursive: true })
  await writeFile('artifacts/sitemap-freshness-proof.json', JSON.stringify({ valid: true, productionRuntime: true,
    localUpstreamOnly: true, upstreamRequests, openUrls: openPrimary.length, closedUrls: closedPrimary.length,
    bothSitemapsAgree: true, withdrawnJobRemovedWithoutRebuild: true, allFourJobDetailsFollowWithdrawal: true }, null, 2) + '\n')
  console.log('Sitemap freshness: runtime addition and withdrawal verified on both public endpoints')
} catch (error) { failure = error } finally {
  child.kill('SIGTERM')
  await new Promise<void>(resolve => { if (child.exitCode !== null) resolve(); else child.once('exit', () => resolve()) })
  await new Promise<void>(resolve => feed.close(() => resolve()))
}
if (failure) { console.error(output); throw failure }
