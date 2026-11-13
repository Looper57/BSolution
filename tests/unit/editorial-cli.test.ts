import { afterEach, describe, expect, it } from 'vitest'
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { resolve, join } from 'node:path'
import { spawnSync } from 'node:child_process'
import { contentRevision, type EditorialTask } from '../../scripts/editorial/workflow'

const directories: string[] = []
afterEach(() => { for (const directory of directories.splice(0)) rmSync(directory, { recursive: true, force: true }) })
function run(input: unknown, args: string[] = [], raw = false) {
  const directory = mkdtempSync(join(tmpdir(), 'bsolution-editorial-test-')); directories.push(directory)
  const file = join(directory, 'private-input.json')
  writeFileSync(file, raw ? String(input) : JSON.stringify(input))
  const result = spawnSync(process.execPath, [resolve('node_modules/tsx/dist/cli.mjs'), resolve('scripts/editorial/queue.mts'), '--input', file, '--as-of', '2026-11-13', ...args], { encoding: 'utf8', timeout: 20000 })
  expect(result.error).toBeUndefined()
  return { ...result, file }
}
function task(): EditorialTask {
  return { id: 'synthetic-brief', status: 'proposed', audience: 'in-house', locale: 'en', situation: 'Synthetic test', targetPath: '/hire-in-house-counsel', rationale: 'Fixture only', nextAction: 'Discuss the brief', nextReview: '2026-11-20' }
}
describe('actual content queue command', () => {
  it('evaluates proposed work and refuses to prepare it without changing the file', () => {
    const input = { version: 1, tasks: [task()] }
    const report = run(input)
    expect(report.status).toBe(0)
    expect(JSON.parse(report.stdout)).toMatchObject({ valid: true, tasks: [{ ready: false }] })
    const prepare = run(input, ['--prepare', 'synthetic-brief'])
    expect(prepare.status).toBe(1)
    expect(JSON.parse(prepare.stdout).prepared).toBe(false)
    expect(JSON.parse(readFileSync(prepare.file, 'utf8'))).toEqual(input)
  })
  it('prepares only the exact reviewed revision, and refuses a subsequent edit', () => {
    const row = task(); row.status = 'approved'; row.content = { title: 'Synthetic title', body: 'Synthetic instructions only. PRIVATE-DRAFT-MARKER', claims: [], sources: [] }
    row.review = { reviewer: 'test-reviewer', reviewedAt: '2026-11-13', revision: contentRevision(row), factsChecked: true, noConfidentialData: true, noInventedExperience: true, usefulForEmployer: true, languageChecked: true, linksChecked: true }
    const ready = run({ version: 1, tasks: [row] }, ['--prepare', row.id])
    expect(ready.status).toBe(0)
    expect(JSON.parse(ready.stdout)).toMatchObject({ prepared: true, task: { revision: row.review.revision } })
    expect(ready.stdout + ready.stderr).not.toContain('PRIVATE-DRAFT-MARKER')
    row.content.body += ' An unreviewed addition.'
    const stale = run({ version: 1, tasks: [row] }, ['--prepare', row.id])
    expect(stale.status).toBe(1)
    expect(JSON.parse(stale.stdout)).toMatchObject({ prepared: false })
    expect(stale.stdout).toContain('review-stale')
  })
  it('does not echo malformed private data or local filenames', () => {
    const result = run('{"draft":"PRIVATE-MARKER",invalid}', [], true)
    expect(result.status).toBe(1)
    expect(result.stdout + result.stderr).not.toContain('PRIVATE-MARKER')
    expect(result.stdout + result.stderr).not.toContain(result.file)
  })
  it('fails closed on unknown or duplicate options', () => {
    for (const args of [['--publish', 'yes'], ['--as-of', '2026-11-13'], ['--prepare', 'not-present']]) {
      const result = run({ version: 1, tasks: [task()] }, args)
      expect(result.status).toBe(1)
    }
  })
})
