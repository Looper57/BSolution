import { mkdir, writeFile } from 'node:fs/promises'
import { dirname } from 'node:path'
import { runGraphCrawl, isGraphCrawlClean } from '../lib/seo/graph-crawl'

async function main() {
  const baseUrl = process.env.GRAPH_CRAWL_BASE_URL ?? 'http://localhost:3100'
  const concurrency = Number(process.env.GRAPH_CRAWL_CONCURRENCY ?? '6')
  const outputPath = process.env.GRAPH_CRAWL_OUTPUT ?? 'artifacts/graph-crawl-report.json'

  console.log(`Graph crawl starting against ${baseUrl}`)
  const report = await runGraphCrawl({ baseUrl, concurrency })

  await mkdir(dirname(outputPath), { recursive: true })
  await writeFile(outputPath, JSON.stringify(report, null, 2))
  console.log(`Report written to ${outputPath}`)

  console.log(JSON.stringify(report.totals, null, 2))

  if (isGraphCrawlClean(report)) {
    console.log('\n✓ Graph crawl: all zero-error invariants satisfied.')
    return
  }

  console.log('\n✗ Graph crawl FAILED — violations found:')
  for (const [category, items] of Object.entries(report.findings)) {
    if (!Array.isArray(items) || items.length === 0) continue
    console.log(`\n${category} (${items.length}):`)
    for (const item of items.slice(0, 20)) {
      console.log(`  ${item.url} — ${item.detail}`)
    }
    if (items.length > 20) console.log(`  ... and ${items.length - 20} more`)
  }
  process.exitCode = 1
}

main().catch((err) => {
  console.error(err)
  process.exitCode = 1
})
