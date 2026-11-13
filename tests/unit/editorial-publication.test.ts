import { afterEach, describe, expect, it, vi } from 'vitest'
import { editorialEntryHash, parseEditorialPublication, type PublishedEditorialEntry } from '../../lib/editorial/publication'
import { stageEditorialRelease } from '../../scripts/editorial/release'
import { contentRevision, type EditorialTask, type WorkflowContext } from '../../scripts/editorial/workflow'
import { publishedEditorialSections, publishedEditorialDates } from '../../lib/editorial/registry'
import { getEditorialTargets } from '../../lib/editorial/targets'
import payload from '../../lib/editorial/published.json'

afterEach(() => vi.useRealTimers())

const targets = new Map([['/practice-areas/compliance-officer', { locale: 'en', headings: ['Existing section'] }]])
const context: WorkflowContext = { asOf: '2026-11-13', allowedPaths: new Set(targets.keys()), pageIds: new Map(), evidence: [] }
function task(): EditorialTask {
  const row: EditorialTask = { id: 'synthetic-role', targetPath: '/practice-areas/compliance-officer', locale: 'en', audience: 'in-house', status: 'approved', situation: 'Synthetic scope', rationale: 'PRIVATE-RATIONALE', nextAction: 'Discuss scope', nextReview: '2026-12-13', content: { title: 'Synthetic new section', body: 'A first paragraph.\n\nA second paragraph.', sources: [{ id: 'private-source-note', url: 'https://example.org/source', checkedAt: '2026-11-12', supports: 'PRIVATE-SOURCE-MARKER' }], claims: [] } }
  row.review = { reviewer: 'PRIVATE-REVIEWER', reviewedAt: '2026-11-13', revision: contentRevision(row), factsChecked: true, noConfidentialData: true, noInventedExperience: true, usefulForEmployer: true, languageChecked: true, linksChecked: true }
  return row
}
const empty = { version: 1, entries: [] }
const queue = (row: EditorialTask) => ({ version: 1, tasks: [row] })
function staged() { return stageEditorialRelease(queue(task()), 'synthetic-role', empty, context, targets) }

describe('public editorial release boundary', () => {
  it('exports exactly reviewed text and no private research, reviewer, rationale or next action', () => {
    const publication = staged()
    expect(publication.entries[0].paragraphs).toEqual(['A first paragraph.', 'A second paragraph.'])
    expect(publication.entries[0].contentUpdatedAt).toBe('2026-11-13')
    expect(Object.keys(publication.entries[0]).sort()).toEqual(['contentUpdatedAt', 'entryHash', 'heading', 'id', 'locale', 'paragraphs', 'reviewedRevision', 'targetPath'].sort())
    expect(JSON.stringify(publication)).not.toMatch(/PRIVATE-|Discuss scope|example.org/)
  })
  it.each(['draft', 'paused', 'proposed', 'review'] as const)('does not export %s content even with a review record attached', status => {
    const row = task(); row.status = status
    expect(() => stageEditorialRelease(queue(row), row.id, empty, context, targets)).toThrow()
  })
  it('refuses a changed paragraph, overdue review or unreviewed source edit', () => {
    const row = task(); row.content!.body += ' Changed.'
    expect(() => stageEditorialRelease(queue(row), row.id, empty, context, targets)).toThrow()
    expect(() => stageEditorialRelease(queue(task()), row.id, empty, { ...context, asOf: '2026-12-13' }, targets)).toThrow()
    const edited = task(); edited.content!.sources[0].supports += ' Edited.'
    expect(() => stageEditorialRelease(queue(edited), edited.id, empty, context, targets)).toThrow()
  })
  it('supports exact published replay without modifying input or fabricating a fresh review', () => {
    const row = task(); row.status = 'published'; row.publication = { date: '2026-11-13', commit: 'a'.repeat(40), revision: contentRevision(row), rollbackCommit: 'b'.repeat(40), verifiedUrl: 'https://www.bsolution.eu/practice-areas/compliance-officer' }
    const input = queue(row), before = JSON.stringify(input)
    expect(stageEditorialRelease(input, row.id, empty, context, targets)).toEqual(staged())
    expect(JSON.stringify(input)).toBe(before)
  })
  it('blocks unsupported renderers, language mismatches and duplicate static headings', () => {
    const row = task()
    expect(() => stageEditorialRelease(queue(row), row.id, empty, context, new Map())).toThrow()
    expect(() => parseEditorialPublication(staged(), new Map([[row.targetPath, { locale: 'de', headings: [] }]]))).toThrow()
    expect(() => parseEditorialPublication(staged(), new Map([[row.targetPath, { locale: 'en', headings: [row.content!.title] }]]))).toThrow()
    expect(getEditorialTargets().has('/services/legal-executive-search')).toBe(false)
    expect([...getEditorialTargets().keys()].some(path => path.includes('/case-studies/'))).toBe(false)
  })
  it('detects tampered public bytes, duplicate routes and unwanted fields before render', () => {
    const original = staged(), changed = structuredClone(original)
    changed.entries[0].paragraphs[0] = 'Unreviewed change'
    expect(() => parseEditorialPublication(changed, targets)).toThrow('integrity')
    expect(() => parseEditorialPublication({ ...original, entries: [original.entries[0], original.entries[0]] }, targets)).toThrow('Duplicate')
    expect(() => parseEditorialPublication({ ...original, reviewer: 'private' }, targets)).toThrow('schema')
    expect(() => parseEditorialPublication({ ...original, entries: [{ ...original.entries[0], sources: ['private'] }] }, targets)).toThrow('schema')
  })
  it('replaces an existing supplement on the same route rather than accumulating duplicates', () => {
    const row = task(); row.id = 'another-task'; row.content!.body = 'A revised complete supplement.'; row.review!.revision = contentRevision(row)
    const replacement = stageEditorialRelease(queue(row), row.id, staged(), context, targets)
    expect(replacement.entries).toHaveLength(1)
    expect(replacement.entries[0].id).toBe('another-task')
  })
  it('does not silently move an old task to another route', () => {
    const original = staged(), moved = task(); moved.targetPath = '/practice-areas/general-counsel'; moved.review!.revision = contentRevision(moved)
    const nextTargets = new Map([...targets, [moved.targetPath, { locale: 'en', headings: [] }]])
    expect(() => stageEditorialRelease(queue(moved), moved.id, original, { ...context, allowedPaths: new Set(nextTargets.keys()) }, nextTargets)).toThrow('silently moved')
  })
  it('renders the actual approved supplement once, only on the intended language and route', () => {
    vi.useFakeTimers(); vi.setSystemTime('2026-11-13T12:00:00Z')
    const records = publishedEditorialSections('/practice-areas/compliance-officer', 'en')
    expect(records).toHaveLength(1)
    expect(records[0].paragraphs).toHaveLength(6)
    expect(records[0].reviewedRevision).toBe('855b1325e73b9680be5a1b974be0e96554b75fa5791784e39e5db90c8b17bc64')
    for (const locale of ['cs', 'de', 'pl'] as const) expect(publishedEditorialSections('/practice-areas/compliance-officer', locale)).toEqual([])
    expect(publishedEditorialSections('/practice-areas/general-counsel', 'en')).toEqual([])
    expect(publishedEditorialDates()).toEqual({ '/practice-areas/compliance-officer': '2026-11-13', '/hire-legal-leader': '2026-11-13' })
    expect(() => parseEditorialPublication(payload, getEditorialTargets())).not.toThrow()
    const entry = records[0] as PublishedEditorialEntry
    expect(entry.entryHash).toBe(editorialEntryHash(entry))
  })
})

it('keeps the real content date when an unchanged text is reviewed again', () => {
  const previous = staged(), row = task()
  row.review!.reviewedAt = '2026-11-18'
  const result = stageEditorialRelease(queue(row), row.id, previous, { ...context, asOf: '2026-11-18' }, targets)
  expect(result.entries[0].contentUpdatedAt).toBe('2026-11-13')
  expect(result.entries[0].paragraphs).toEqual(previous.entries[0].paragraphs)
})
