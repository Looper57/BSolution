import { afterEach, expect, it } from 'vitest'
import { mkdtempSync, writeFileSync, readFileSync, rmSync, statSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { spawnSync } from 'node:child_process'
import payload from '@/lib/editorial/published.json'
const dirs: string[] = []
afterEach(() => { for (const dir of dirs.splice(0)) rmSync(dir, { recursive: true, force: true }) })
function fixture() {
  const dir = mkdtempSync(join(tmpdir(), 'calendar-cli-')); dirs.push(dir)
  const input = join(dir, 'registry.json'), output = join(dir, 'candidate.json'); writeFileSync(input, JSON.stringify(payload))
  const run = (args: string[] = []) => spawnSync(process.execPath, [resolve('node_modules/tsx/dist/cli.mjs'), resolve('scripts/editorial/calendar.mts'), '--registry', input, '--output', output, '--action', 'pause', '--as-of', '2026-11-13', ...args], { encoding: 'utf8', timeout: 20000 })
  return { input, output, run }
}
it('writes a protected paused candidate without changing the live registry', () => {
  const f = fixture(), before = readFileSync(f.input, 'utf8'), r = f.run()
  expect(r.status).toBe(0); expect(statSync(f.output).mode & 0o777).toBe(0o600)
  const candidate = JSON.parse(readFileSync(f.output, 'utf8'))
  expect(candidate.calendar.pausedOn).toBe('2026-11-13')
  expect(candidate.entries).toEqual(payload.entries)
  expect(candidate.calendar.entries).toEqual(payload.calendar.entries)
  expect(readFileSync(f.input, 'utf8')).toBe(before)
  expect(r.stdout).not.toContain(payload.entries[0].paragraphs[0])
})
it('refuses existing output files, duplicate arguments and private parser excerpts', () => {
  const f = fixture(); writeFileSync(f.output, 'KEEP')
  expect(f.run().status).toBe(1); expect(readFileSync(f.output, 'utf8')).toBe('KEEP')
  expect(f.run(['--action', 'resume']).status).toBe(1)
  writeFileSync(f.input, 'PRIVATE-BROKEN-JSON'); const r = f.run()
  expect(r.status).toBe(1); expect(r.stdout + r.stderr).not.toContain('PRIVATE'); expect(r.stderr).not.toContain(f.input)
})

it('does not let the temporary browser fixture mutate the registry outside GitHub CI', () => {
  const original = readFileSync('lib/editorial/published.json', 'utf8')
  const result = spawnSync(process.execPath, [resolve('node_modules/tsx/dist/cli.mjs'), resolve('scripts/ci/editorial-calendar-fixture.mts')], { encoding: 'utf8', timeout: 20000, env: { ...process.env, CI: 'false', GITHUB_ACTIONS: 'false' } })
  expect(result.status).not.toBe(0)
  expect(readFileSync('lib/editorial/published.json', 'utf8')).toBe(original)
})
