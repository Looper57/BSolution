// Technical-SEO graph crawl gate (2026-08-22 Ahrefs audit) — starts a
// production server against the already-built .next output (no rebuild:
// the caller already ran `pnpm build`), waits for it to answer, runs the
// full-site graph crawl (scripts/graph-crawl.mts), then tears the server
// down. Exits with the crawl's own exit code.
import { spawn, spawnSync } from 'node:child_process'

const PORT = process.env.GRAPH_CRAWL_PORT ?? '3102'
const BASE_URL = `http://localhost:${PORT}`

async function waitForReady(url, timeoutMs = 60_000) {
  const deadline = Date.now() + timeoutMs
  while (Date.now() < deadline) {
    try {
      const res = await fetch(url)
      if (res.ok || res.status < 500) return true
    } catch {
      // server not up yet
    }
    await new Promise((resolve) => setTimeout(resolve, 1000))
  }
  return false
}

async function main() {
  // `pnpm exec next start` (not `pnpm run start`) so an intentional SIGTERM
  // teardown below isn't misreported as a pnpm lifecycle failure.
  const server = spawn('pnpm', ['exec', 'next', 'start', '-p', PORT], { stdio: 'inherit', env: process.env })

  try {
    const ready = await waitForReady(`${BASE_URL}/`)
    if (!ready) {
      console.error('[run-graph-crawl-gate] server did not become ready in time')
      process.exitCode = 1
      return
    }
    const result = spawnSync('pnpm', ['exec', 'tsx', 'scripts/graph-crawl.mts'], {
      stdio: 'inherit',
      env: { ...process.env, GRAPH_CRAWL_BASE_URL: BASE_URL },
    })
    process.exitCode = result.status || 0
  } finally {
    server.kill('SIGTERM')
  }
}

main()
