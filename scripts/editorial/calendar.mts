import { readFile, writeFile } from 'node:fs/promises'
import { controlEditorialCalendar } from '../../lib/editorial/calendar-control'
import { getEditorialTargets } from '../../lib/editorial/targets'

try {
  const args = process.argv.slice(2), options = new Map<string, string>()
  for (let i = 0; i < args.length; i += 2) {
    const key = args[i], value = args[i + 1]
    if (!['--registry', '--output', '--action', '--as-of'].includes(key) || !value || options.has(key)) throw new Error('arguments')
    options.set(key, value)
  }
  const registry = options.get('--registry'), output = options.get('--output'), action = options.get('--action')
  if (!registry || !output || action !== 'pause' && action !== 'resume') throw new Error('arguments')
  const result = controlEditorialCalendar(JSON.parse(await readFile(registry, 'utf8')), action, options.get('--as-of') ?? new Date().toISOString().slice(0, 10), getEditorialTargets())
  await writeFile(output, JSON.stringify(result, null, 2) + '\n', { flag: 'wx', mode: 0o600 })
  console.log(JSON.stringify({ candidateWritten: true, action, entries: result.entries.length, scheduled: result.calendar?.entries.length ?? 0, scope: 'Candidate only; normal source checks/deployment required. No approval, queue write or live change.' }))
} catch {
  console.error('Editorial calendar change refused. Check arguments, current reviewed data and a new output file. No private input is printed.')
  process.exitCode = 1
}
