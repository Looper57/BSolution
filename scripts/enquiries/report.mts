import { readFile, stat, writeFile } from 'node:fs/promises'
import { isAbsolute } from 'node:path'
import { enquiryReport, logRows } from './aggregate'

try {
  const args = process.argv.slice(2), options = new Map<string, string>()
  for (let i = 0; i < args.length; i += 2) {
    const key = args[i], value = args[i + 1]
    if (!['--input', '--output', '--outcomes', '--as-of'].includes(key) || !value || options.has(key)) throw new Error('arguments')
    options.set(key, value)
  }
  const input = options.get('--input'), output = options.get('--output'), outcomes = options.get('--outcomes')
  if (!input || !output || !isAbsolute(input) || !isAbsolute(output) || outcomes && !isAbsolute(outcomes)) throw new Error('paths')
  const read = async (path: string) => {
    const info = await stat(path)
    if (!info.isFile() || info.size > 20_000_000) throw new Error('input size')
    return readFile(path, 'utf8')
  }
  const report = enquiryReport(logRows(await read(input)), outcomes ? JSON.parse(await read(outcomes)) : undefined, options.get('--as-of'))
  await writeFile(output, JSON.stringify(report, null, 2) + '\n', { flag: 'wx', mode: 0o600 })
  console.log(JSON.stringify({ written: true, providerAcceptedMessages: report.providerAcceptedMessages, declaredEmployerEnquiries: report.declaredEmployerEnquiries, outcomesProvided: report.outcomesProvided }))
} catch {
  console.error('Enquiry report refused: check arguments, input format, references and a new output file. No private data is included in this error.')
  process.exitCode = 1
}
