import { readFile, writeFile } from 'node:fs/promises'
import { editorialContext } from './context'
import { stageEditorialRelease } from './release'
import { getEditorialTargets } from '../../lib/editorial/targets'

async function main() {
  const args = process.argv.slice(2), options: Record<string, string> = Object.create(null)
  for (let index = 0; index < args.length; index += 2) {
    const key = args[index], value = args[index + 1]
    if (!['--input', '--task', '--registry', '--output', '--as-of', '--publish-on'].includes(key) || !value || value.startsWith('--') || Object.hasOwn(options, key)) throw new Error('Invalid arguments')
    options[key] = value
  }
  if (!options['--input'] || !options['--task'] || !options['--registry'] || !options['--output']) throw new Error('Explicit private input, task, public registry and new output are required')
  const input = JSON.parse(await readFile(options['--input'], 'utf8'))
  const existing = JSON.parse(await readFile(options['--registry'], 'utf8'))
  const publication = stageEditorialRelease(input, options['--task'], existing, editorialContext(options['--as-of'] ?? new Date().toISOString().slice(0, 10)), getEditorialTargets(), options['--publish-on'])
  // Never overwrite source, the queue, registry, another draft or symlink.
  // Promotion of this candidate remains a reviewed source change and release.
  await writeFile(options['--output'], JSON.stringify(publication, null, 2) + '\n', { flag: 'wx', mode: 0o600 })
  console.log(JSON.stringify({ staged: true, entries: publication.entries.length, scheduled: publication.calendar?.entries.length ?? 0, scope: 'Public candidate file only; no commit, PR, deployment, approval or private queue mutation.' }))
}
main().catch(() => {
  console.error('Editorial staging refused. Check approval, supported target, current revision, arguments and that the output does not exist. Private input is not printed.')
  process.exitCode = 1
})
