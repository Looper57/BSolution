import { mkdir, writeFile } from 'node:fs/promises'
import { parseEditorialPublication } from '../../lib/editorial/publication'
import { getEditorialTargets } from '../../lib/editorial/targets'
import payload from '../../lib/editorial/published.json' with { type: 'json' }
import { verifyEditorialHtml, verifyEditorialSitemap } from './live-check'

async function main() {
  const origin = new URL(process.env.EDITORIAL_VERIFY_ORIGIN ?? 'https://www.bsolution.eu')
  const production = origin.origin === 'https://www.bsolution.eu'
  const local = origin.protocol === 'http:' && ['127.0.0.1', 'localhost'].includes(origin.hostname)
  if ((!production && !local) || origin.username || origin.password || origin.pathname !== '/' || origin.search || origin.hash) throw new Error('Unsupported verification origin')
  const publication = parseEditorialPublication(payload, getEditorialTargets())
  const rows: { id: string; targetPath: string; errors: string[]; attempts: number }[] = []
  const read = async (path: string) => {
    const result = await fetch(new URL(path, origin), { redirect: 'manual', signal: AbortSignal.timeout(15000), headers: { 'User-Agent': 'BSolution-EditorialPostflight/1.0' } })
    if (result.status !== 200) throw new Error('Unexpected HTTP status')
    return result.text()
  }
  for (const entry of publication.entries) {
    let errors = ['request-failed'], attempts = 0
    for (let attempt = 1; attempt <= 3; attempt++) {
      attempts = attempt
      try {
        const [html, xml] = await Promise.all([read(entry.targetPath), read('/site-sitemap.xml')])
        errors = [...verifyEditorialHtml(html, entry), ...verifyEditorialSitemap(xml, entry)]
      } catch { errors = ['request-failed'] }
      if (!errors.length) break
      if (attempt < 3) await new Promise(resolve => setTimeout(resolve, 3000))
    }
    rows.push({ id: entry.id, targetPath: entry.targetPath, errors, attempts })
  }
  const report = { scope: 'Public editorial HTML and sitemap only; no ranking, leads, complete-site or browser-visibility claim.', origin: origin.origin, checkedAt: new Date().toISOString(), checked: rows.length, valid: rows.every(row => row.errors.length === 0), entries: rows }
  await mkdir('artifacts', { recursive: true })
  await writeFile('artifacts/editorial-live-check.json', JSON.stringify(report, null, 2) + '\n')
  console.log(JSON.stringify(report, null, 2))
  if (!report.valid) process.exitCode = 1
}
main().catch(async () => {
  await mkdir('artifacts', { recursive: true })
  await writeFile('artifacts/editorial-live-check.json', JSON.stringify({ valid: false, error: 'verification-not-completed' }) + '\n')
  console.error('Public editorial postflight could not complete; no private input or response body is printed.')
  process.exitCode = 1
})
