import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { afterEach, expect, it, vi } from 'vitest'
import { editorialEntryHash, editorialScheduleHash, editorialEntriesOn, parseEditorialPublication, type PublishedEditorialEntry } from '@/lib/editorial/publication'
import { controlEditorialCalendar } from '@/lib/editorial/calendar-control'
import { EditorialSections } from '@/components/published-editorial'
import { stageEditorialRelease } from '@/scripts/editorial/release'
import { contentRevision, type EditorialTask } from '@/scripts/editorial/workflow'
const path = '/hire-in-house-counsel', targets = new Map([[path, { locale: 'en', headings: ['Static heading'] }]])
function entry(heading = 'Current section', date = '2026-11-13'): PublishedEditorialEntry {
  const row = { id: 'calendar-test', targetPath: path, locale: 'en' as const, heading, paragraphs: ['Reviewed text for ' + heading], contentUpdatedAt: date, reviewedRevision: 'a'.repeat(64) }
  return { ...row, entryHash: editorialEntryHash(row) }
}
function scheduled(publishOn = '2026-11-20', heading = 'Future section', reviewUntil = '2026-12-13') {
  const item = { publishOn, reviewUntil, entry: entry(heading, publishOn) }
  return { ...item, scheduleHash: editorialScheduleHash(item) }
}
function calendar() { return parseEditorialPublication({ version: 1, entries: [entry()], calendar: { entries: [scheduled()] } }, targets) }
afterEach(() => vi.useRealTimers())
it('preserves the current version before the UTC boundary and replaces it on the due day', () => {
  const p = calendar()
  expect(editorialEntriesOn(p, '2026-11-19')[0].heading).toBe('Current section')
  expect(editorialEntriesOn(p, '2026-11-20')[0].heading).toBe('Future section')
  expect(editorialEntriesOn(p, '2026-11-21')).toHaveLength(1)
})
it('evaluates the actual clock on every call rather than freezing it at module load', () => {
  const p = calendar(); vi.useFakeTimers(); vi.setSystemTime('2026-11-19T23:59:59Z')
  expect(editorialEntriesOn(p)[0].heading).toBe('Current section')
  vi.setSystemTime('2026-11-20T00:00:00Z')
  expect(editorialEntriesOn(p)[0].heading).toBe('Future section')
})
it('renders only the due reviewed text and keeps future paragraphs out of server markup', () => {
  const p = calendar()
  const before = renderToStaticMarkup(createElement(EditorialSections, { entries: editorialEntriesOn(p, '2026-11-19') }))
  expect(before).toContain('Current section'); expect(before).not.toContain('Future section')
  const after = renderToStaticMarkup(createElement(EditorialSections, { entries: editorialEntriesOn(p, '2026-11-20') }))
  expect(after).toContain('Future section'); expect(after).not.toContain('Current section')
})
it('supports multiple reviewed versions in chronological order without duplicated visible sections', () => {
  const p = calendar(); p.calendar!.entries.push(scheduled('2026-11-22', 'Later section'))
  const valid = parseEditorialPublication(p, targets)
  expect(editorialEntriesOn(valid, '2026-11-21')[0].heading).toBe('Future section')
  expect(editorialEntriesOn(valid, '2026-11-22')[0].heading).toBe('Later section')
})
it('pauses a future release without removing the currently visible version', () => {
  const p = controlEditorialCalendar(calendar(), 'pause', '2026-11-19', targets)
  expect(editorialEntriesOn(p, '2026-11-25')[0].heading).toBe('Current section')
  expect(p.calendar!.entries).toHaveLength(1)
  expect(controlEditorialCalendar(p, 'pause', '2026-11-24', targets)).toEqual(p)
})
it('snapshots content already due when pausing instead of unpublishing it', () => {
  const p = controlEditorialCalendar(calendar(), 'pause', '2026-11-21', targets)
  expect(p.entries[0].heading).toBe('Future section'); expect(p.calendar!.entries).toHaveLength(0)
  expect(editorialEntriesOn(p, '2026-11-25')[0].heading).toBe('Future section')
})
it('resumes held content with the actual release day and preserves its reviewed revision', () => {
  const paused = controlEditorialCalendar(calendar(), 'pause', '2026-11-19', targets)
  const resumed = controlEditorialCalendar(paused, 'resume', '2026-11-22', targets)
  expect(resumed.entries[0]).toMatchObject({ heading: 'Future section', contentUpdatedAt: '2026-11-22', reviewedRevision: 'a'.repeat(64) })
  expect(resumed.entries[0].entryHash).toBe(editorialEntryHash(resumed.entries[0]))
  expect(resumed.calendar!.pausedOn).toBeUndefined()
})
it('refuses expired held work, conflicting slots, altered bytes and dates outside review', () => {
  const paused = controlEditorialCalendar(calendar(), 'pause', '2026-11-19', targets)
  expect(() => controlEditorialCalendar(paused, 'resume', '2026-12-13', targets)).toThrow('fresh review')
  const p = calendar(); p.calendar!.entries.push(scheduled())
  expect(() => parseEditorialPublication(p, targets)).toThrow('Conflicting')
  const tampered = calendar(); tampered.calendar!.entries[0].entry.paragraphs[0] += 'Changed'
  expect(() => parseEditorialPublication(tampered, targets)).toThrow('integrity')
  const expired = calendar(); expired.calendar!.entries = [scheduled('2026-11-20', 'Future section', '2026-11-20')]
  expect(() => parseEditorialPublication(expired, targets)).toThrow('reviewed window')
})
it('refuses unsupported targets, duplicate static headings, unchanged re-dating and invalid dates', () => {
  const invalid = calendar(); invalid.calendar!.entries[0] = scheduled('2026-11-20', 'Static heading')
  expect(() => parseEditorialPublication(invalid, targets)).toThrow('Unsupported')
  const unchanged = calendar(); unchanged.calendar!.entries[0] = scheduled('2026-11-20', 'Current section')
  expect(() => parseEditorialPublication(unchanged, targets)).toThrow('unchanged')
  expect(() => editorialEntriesOn(calendar(), '2026-02-30')).toThrow('date')
})
it('stages only an exact current approved task into its reviewed future window', () => {
  const task: EditorialTask = { id: 'new-task', targetPath: path, locale: 'en', audience: 'in-house', status: 'approved', situation: 'Synthetic brief', rationale: 'Private reason', nextAction: 'Discuss', nextReview: '2026-12-13', content: { title: 'New reviewed section', body: 'New reviewed text', sources: [], claims: [] } }
  task.review = { reviewer: 'SYNTHETIC-REVIEWER', reviewedAt: '2026-11-13', revision: contentRevision(task), factsChecked: true, noConfidentialData: true, noInventedExperience: true, usefulForEmployer: true, languageChecked: true, linksChecked: true }
  const context = { asOf: '2026-11-13', allowedPaths: new Set([path]), pageIds: new Map(), evidence: [] }
  const staged = stageEditorialRelease({ version: 1, tasks: [task] }, task.id, { version: 1, entries: [] }, context, targets, '2026-11-20')
  expect(staged.entries).toEqual([]); expect(editorialEntriesOn(staged, '2026-11-19')).toEqual([])
  expect(editorialEntriesOn(staged, '2026-11-20')[0].paragraphs).toEqual(['New reviewed text'])
  expect(JSON.stringify(staged)).not.toMatch(/Private reason|SYNTHETIC-REVIEWER/)
  expect(() => stageEditorialRelease({ version: 1, tasks: [task] }, task.id, { version: 1, entries: [] }, context, targets, '2026-12-13')).toThrow()
  task.status = 'draft'
  expect(() => stageEditorialRelease({ version: 1, tasks: [task] }, task.id, { version: 1, entries: [] }, context, targets, '2026-11-20')).toThrow()
})

it('resumes only the latest held version and retains later future work', () => {
  const p = calendar(); p.calendar!.entries.push(scheduled('2026-11-22', 'Latest held section'), scheduled('2026-11-25', 'Still future section'))
  const paused = controlEditorialCalendar(p, 'pause', '2026-11-19', targets)
  const result = controlEditorialCalendar(paused, 'resume', '2026-11-23', targets)
  expect(result.entries[0].heading).toBe('Latest held section')
  expect(result.calendar!.entries).toHaveLength(1)
  expect(editorialEntriesOn(result, '2026-11-25')[0].heading).toBe('Still future section')
})
