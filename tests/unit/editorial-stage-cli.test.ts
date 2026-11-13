import { afterEach, describe, expect, it } from 'vitest'
import { mkdtempSync, readFileSync, rmSync, writeFileSync, existsSync, symlinkSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { resolve, join } from 'node:path'
import { spawnSync } from 'node:child_process'
import { contentRevision, type EditorialTask } from '../../scripts/editorial/workflow'

const directories: string[] = []
afterEach(() => { for (const directory of directories.splice(0)) rmSync(directory, { recursive: true, force: true }) })
function fixture() {
  const directory = mkdtempSync(join(tmpdir(), 'bsolution-stage-test-')); directories.push(directory)
  const input = join(directory, 'private.json'), registry = join(directory, 'public.json'), output = join(directory, 'candidate.json')
  const task: EditorialTask = { id: 'synthetic-stage', targetPath: '/practice-areas/compliance-officer', locale: 'en', audience: 'in-house', situation: 'Synthetic assignment', rationale: 'PRIVATE-RESEARCH', nextAction: 'Discuss scope', nextReview: '2026-12-13', status: 'approved', content: { title: 'Synthetic distinct heading', body: 'Public text intended for this test.', sources: [], claims: [] } }
  task.review = { reviewer: 'PRIVATE-REVIEWER', reviewedAt: '2026-11-13', revision: contentRevision(task), factsChecked: true, noConfidentialData: true, noInventedExperience: true, usefulForEmployer: true, languageChecked: true, linksChecked: true }
  const write = () => writeFileSync(input, JSON.stringify({ version: 1, tasks: [task] }))
  write(); writeFileSync(registry, JSON.stringify({ version: 1, entries: [] }))
  const run = (args: string[] = []) => spawnSync(process.execPath, [resolve('node_modules/tsx/dist/cli.mjs'), resolve('scripts/editorial/stage.mts'), '--input', input, '--task', task.id, '--registry', registry, '--output', output, '--as-of', '2026-11-13', ...args], { encoding: 'utf8', timeout: 20000 })
  return { task, write, input, registry, output, run }
}
describe('actual editorial staging command', () => {
  it('writes only the public candidate and leaves the queue and live registry unchanged', () => {
    const f = fixture(), originalQueue = readFileSync(f.input, 'utf8'), originalRegistry = readFileSync(f.registry, 'utf8'), result = f.run()
    expect(result.error).toBeUndefined(); expect(result.status).toBe(0)
    expect(JSON.parse(result.stdout)).toMatchObject({ staged: true, entries: 1 })
    expect(result.stdout).not.toContain('Public text')
    expect(readFileSync(f.output, 'utf8')).not.toMatch(/PRIVATE-|nextAction|rationale|reviewer/)
    expect(JSON.parse(readFileSync(f.output, 'utf8')).entries[0].paragraphs).toEqual(['Public text intended for this test.'])
    expect(readFileSync(f.input, 'utf8')).toBe(originalQueue)
    expect(readFileSync(f.registry, 'utf8')).toBe(originalRegistry)
  })
  it('refuses to overwrite an existing file or follow an output symlink', () => {
    const f = fixture(); writeFileSync(f.output, 'existing-output')
    expect(f.run().status).toBe(1)
    expect(readFileSync(f.output, 'utf8')).toBe('existing-output')
    rmSync(f.output); symlinkSync(f.input, f.output)
    const original = readFileSync(f.input, 'utf8')
    expect(f.run().status).toBe(1)
    expect(readFileSync(f.input, 'utf8')).toBe(original)
  })
  it('writes nothing for paused or stale content and does not print private input', () => {
    const f = fixture(); f.task.status = 'paused'; f.write()
    const paused = f.run(); expect(paused.status).toBe(1); expect(existsSync(f.output)).toBe(false)
    f.task.status = 'approved'; f.task.content!.body += ' Unreviewed edit.'; f.write()
    const stale = f.run(); expect(stale.status).toBe(1); expect(existsSync(f.output)).toBe(false)
    expect(stale.stdout + stale.stderr).not.toMatch(/PRIVATE-|Unreviewed edit|private.json/)
  })
  it('rejects unknown or duplicate options without creating an output', () => {
    const f = fixture()
    expect(f.run(['--publish', 'yes']).status).toBe(1)
    expect(f.run(['--as-of', '2026-11-13']).status).toBe(1)
    expect(existsSync(f.output)).toBe(false)
  })
})
