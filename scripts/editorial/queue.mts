import { readFile } from 'node:fs/promises'
import { getEmployerSitemapEntries } from '../../lib/sitemap-entries'
import { authorityEvidenceRegistry } from '../../lib/authority-pages/evidence'
import { inspectQueue } from './workflow'
import { productionAuthorityPages } from '../../lib/authority-pages/registry'
import { localizedPath } from '../../lib/i18n/config'

async function main() {
  const args = process.argv.slice(2)
  const options: Record<string, string> = Object.create(null)
  for (let index = 0; index < args.length; index += 2) {
    const key = args[index], value = args[index + 1]
    if (!['--input', '--as-of', '--prepare'].includes(key) || !value || value.startsWith('--') || Object.hasOwn(options, key)) throw new Error('Usage: content:queue --input private-queue.json [--as-of YYYY-MM-DD] [--prepare task-id]')
    options[key] = value
  }
  if (!options['--input']) throw new Error('A private queue file is required; no default private path is stored in the repository.')
  const allowedPaths = new Set(getEmployerSitemapEntries().map(entry => new URL(entry.url).pathname))
  const report = inspectQueue(JSON.parse(await readFile(options['--input'], 'utf8')), { asOf: options['--as-of'] ?? new Date().toISOString().slice(0, 10), allowedPaths, pageIds: new Map(productionAuthorityPages.map(page => [localizedPath(page.locale, page.basePath), page.id])), evidence: authorityEvidenceRegistry })
  if (options['--prepare']) {
    const task = report.tasks.find(task => task.id === options['--prepare'])
    if (!report.valid || !task?.ready) {
      console.log(JSON.stringify({ prepared: false, issues: report.issues, reason: 'The selected task and queue must pass review before a handoff can be prepared.' }, null, 2))
      process.exitCode = 1
      return
    }
    console.log(JSON.stringify({ prepared: true, task, scope: 'Editorial preflight only. Does not publish, approve owner-gated evidence, change routes or bypass release checks.' }, null, 2))
    return
  }
  console.log(JSON.stringify(report, null, 2))
  if (!report.valid) process.exitCode = 1
}
main().catch(() => {
  // Do not echo private input, parser excerpts, local filenames or credentials.
  console.error('Content queue could not be read or evaluated. Check the input, arguments and calendar date locally.')
  process.exitCode = 1
})
