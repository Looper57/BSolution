import { afterEach, expect, it } from 'vitest'
import { mkdtempSync, writeFileSync, readFileSync, rmSync, statSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { spawnSync } from 'node:child_process'
const dirs: string[] = []
afterEach(() => { for (const dir of dirs.splice(0)) rmSync(dir, { recursive: true, force: true }) })
function fixture() {
  const dir = mkdtempSync(join(tmpdir(), 'enquiry-report-')); dirs.push(dir)
  const input = join(dir, 'input.json'), output = join(dir, 'output.json')
  writeFileSync(input, JSON.stringify([{ status: 'accepted', requestId: 'r1', resendMessageId: 'p1', timestamp: '2026-11-13T10:00:00Z', enquiryType: 'hiring', discoverySource: 'ai-assistant', email: 'PRIVATE@example.com' }]))
  const run = (extra: string[] = []) => spawnSync(process.execPath, [resolve('node_modules/tsx/dist/cli.mjs'), resolve('scripts/enquiries/report.mts'), '--input', input, '--output', output, '--as-of', '2026-11-13', ...extra], { encoding: 'utf8', timeout: 20000 })
  return { input, output, run }
}
it('writes a private aggregate file and leaves the source untouched', () => {
  const f = fixture(), original = readFileSync(f.input, 'utf8'), r = f.run()
  expect(r.status).toBe(0); expect(JSON.parse(readFileSync(f.output, 'utf8'))).toMatchObject({ declaredEmployerEnquiries: 1, employerByDiscovery: { 'ai-assistant': 1 }, recordedEmployerMandates: null })
  expect(statSync(f.output).mode & 0o777).toBe(0o600)
  expect(readFileSync(f.input, 'utf8')).toBe(original); expect(r.stdout + r.stderr + readFileSync(f.output, 'utf8')).not.toContain('PRIVATE')
})
it('refuses to overwrite an existing file including the input', () => {
  const f = fixture(); writeFileSync(f.output, 'KEEP'); expect(f.run().status).toBe(1); expect(readFileSync(f.output, 'utf8')).toBe('KEEP')
  expect(f.run(['--output', f.input]).status).toBe(1)
})
it('fails without printing private parser excerpts, paths or unknown arguments', () => {
  const f = fixture(); writeFileSync(f.input, 'PRIVATE-BROKEN-JSON')
  const r = f.run(); expect(r.status).toBe(1); expect(r.stdout + r.stderr).not.toContain('PRIVATE'); expect(r.stderr).not.toContain(f.input)
  expect(f.run(['--unknown', 'PRIVATE']).status).toBe(1)
})
