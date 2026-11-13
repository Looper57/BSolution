import { describe, expect, it } from 'vitest'
import { contentRevision, inspectQueue, inspectTask, taskSchema, type EditorialTask, type WorkflowContext } from '../../scripts/editorial/workflow'

const context: WorkflowContext = {
  asOf: '2026-11-13', allowedPaths: new Set(['/hire-in-house-counsel', '/services/legal-executive-search', '/de/services/legal-executive-search']),
  pageIds: new Map([['/services/legal-executive-search', 'authority:legal-executive-search:en'], ['/de/services/legal-executive-search', 'authority:legal-executive-search:de']]),
  evidence: [{ id: 'existing-approved-experience', approvalStatus: 'approved', publicationEligible: true, permissionStatus: 'approved', localeAvailability: ['en'], relatedPageIds: ['authority:legal-executive-search:en'] }],
}
function approved(): EditorialTask {
  const task: EditorialTask = {
    id: 'first-in-house', status: 'approved', audience: 'in-house', locale: 'en', situation: 'First internal legal hire', targetPath: '/hire-in-house-counsel', rationale: 'Improve an existing employer decision page', nextAction: 'Discuss the role', nextReview: '2026-12-13',
    content: { title: 'Define the work', body: 'Agree responsibilities and reporting before the search.', sources: [{ id: 'source-one', url: 'https://example.org/source', checkedAt: '2026-11-12', supports: 'An explicitly attributed source statement.' }], claims: [{ id: 'claim-one', kind: 'source-fact', text: 'A synthetic sourced statement for testing.', sourceIds: ['source-one'] }] },
  }
  task.review = { reviewer: 'editorial:test-reviewer', reviewedAt: '2026-11-13', revision: contentRevision(task), factsChecked: true, noConfidentialData: true, noInventedExperience: true, usefulForEmployer: true, languageChecked: true, linksChecked: true }
  return task
}
const queue = (task: unknown) => ({ version: 1, tasks: [task] })

describe('private editorial queue preflight', () => {
  it('accepts a reviewed revision without exposing its body or source data in the report', () => {
    const task = approved(), result = inspectQueue(queue(task), context)
    expect(result.valid).toBe(true)
    expect(result.tasks[0].ready).toBe(true)
    expect(JSON.stringify(result)).not.toContain(task.content!.body)
    expect(JSON.stringify(result)).not.toContain('example.org')
    expect(JSON.stringify(result)).not.toContain('test-reviewer')
  })
  it('rejects an invalid evaluation date even for an empty queue', () => {
    expect(inspectQueue({ version: 1, tasks: [] }, { ...context, asOf: '2026-02-30' })).toMatchObject({ valid: false, issues: [{ code: 'invalid-evaluation-date' }] })
  })
  it('keeps proposed work valid but unpublishable without inventing approval', () => {
    const task = approved(); task.status = 'proposed'; delete task.content; delete task.review
    expect(inspectQueue(queue(task), context)).toMatchObject({ valid: true, tasks: [{ ready: false }] })
  })
  it.each(['paused', 'draft', 'review'] as const)('never prepares a %s task even when a review is attached', status => {
    const task = approved(); task.status = status
    expect(inspectTask(task, context).ready).toBe(false)
  })
  it.each(['title', 'body'] as const)('invalidates approval after a %s edit', field => {
    const task = approved(); task.content![field] += ' changed'
    expect(inspectTask(task, context).issues).toContain('review-stale')
  })
  it('invalidates approval when source evidence, audience or next action changes', () => {
    for (const edit of [(task: EditorialTask) => { task.content!.sources[0].supports += ' changed' }, (task: EditorialTask) => { task.audience = 'law-firm' }, (task: EditorialTask) => { task.nextAction += ' changed' }]) {
      const task = approved(); edit(task)
      expect(inspectTask(task, context).issues).toContain('review-stale')
    }
  })
  it('rejects missing review, missing claim sources, unknown routes and mismatched language', () => {
    const task = approved(); delete task.review; task.targetPath = '/de/unapproved'; task.content!.claims[0].sourceIds = ['missing']
    expect(inspectTask(task, context).issues).toEqual(expect.arrayContaining(['review-missing', 'claim-source-missing', 'target-not-in-approved-inventory', 'target-language-mismatch']))
  })
  it('rejects future source/review dates and expired review', () => {
    const task = approved(); task.content!.sources[0].checkedAt = '2026-11-15'; task.review!.reviewedAt = '2026-11-14'; task.nextReview = '2026-11-13'
    expect(inspectTask(task, context).issues).toEqual(expect.arrayContaining(['future-source-check', 'future-review', 'source-checked-after-review', 'review-overdue']))
  })
  it('requires approved experience in the exact page and language scope', () => {
    const task = approved(); task.targetPath = '/services/legal-executive-search'
    Object.assign(task.content!.claims[0], { kind: 'company-experience', evidenceId: 'existing-approved-experience', evidencePageId: 'authority:legal-executive-search:en' })
    task.review!.revision = contentRevision(task)
    expect(inspectTask(task, context).ready).toBe(true)
    task.targetPath = '/hire-in-house-counsel'
    expect(inspectTask(task, context).issues).toContain('experience-evidence-not-approved')
    task.targetPath = '/de/services/legal-executive-search'; task.locale = 'de'; task.content!.claims[0].evidencePageId = 'authority:legal-executive-search:de'
    expect(inspectTask(task, context).issues).toContain('experience-evidence-not-approved')
  })
  it('requires evidence for experience claims even if a competitor URL is cited', () => {
    const task = approved(); task.content!.claims[0].kind = 'company-experience'
    expect(inspectTask(task, context).issues).toContain('experience-evidence-not-approved')
    const evidence = context.evidence.map(record => ({ ...record, permissionStatus: 'pending' }))
    task.content!.claims[0].evidenceId = 'existing-approved-experience'
    expect(inspectTask(task, { ...context, evidence }).ready).toBe(false)
  })
  it('requires exact publication revision, URL, chronology and rollback record', () => {
    const task = approved(); task.status = 'published'
    expect(inspectTask(task, context).issues).toContain('publication-proof-missing')
    task.publication = { date: '2026-11-13', commit: 'a'.repeat(40), revision: contentRevision(task), rollbackCommit: 'b'.repeat(40), verifiedUrl: 'https://www.bsolution.eu/hire-in-house-counsel' }
    expect(inspectTask(task, context).issues).toEqual([])
    expect(inspectTask(task, context).ready).toBe(false)
    task.publication.rollbackCommit = task.publication.commit
    expect(inspectTask(task, context).issues).toContain('rollback-does-not-change-revision')
    task.publication.revision = '0'.repeat(64); task.publication.verifiedUrl = 'https://example.org'; task.publication.date = '2026-11-12'
    expect(inspectTask(task, context).issues).toEqual(expect.arrayContaining(['publication-stale', 'publication-url-mismatch', 'publication-date-invalid']))
  })
  it('rejects duplicate IDs, competing active work and source/claim IDs', () => {
    const task = approved(), other = structuredClone(task); task.content!.sources.push(task.content!.sources[0]); task.content!.claims.push(task.content!.claims[0])
    const result = inspectQueue({ version: 1, tasks: [task, other] }, context)
    expect(result.valid).toBe(false)
    expect(result.issues.map(issue => issue.code)).toEqual(expect.arrayContaining(['duplicate-task-id', 'competing-active-task', 'duplicate-source-id', 'duplicate-claim-id']))
  })
  it('rejects malformed dates, unknown keys, false review assertions and unsafe sources without echoing input', () => {
    for (const edit of [(task: Record<string, unknown>) => { task.nextReview = '2026-02-30' }, (task: Record<string, unknown>) => { task.privateContact = 'secret-marker' }, (task: Record<string, unknown>) => { (task.review as Record<string, unknown>).factsChecked = false }]) {
      const task = approved() as unknown as Record<string, unknown>; edit(task)
      const result = inspectQueue(queue(task), context)
      expect(result.valid).toBe(false); expect(JSON.stringify(result)).not.toContain('secret-marker')
    }
    const task = approved(); task.content!.sources[0].url = 'https://user:secret@example.org/source'
    expect(taskSchema.safeParse(task).success).toBe(false)
    expect(() => inspectTask(approved(), { ...context, asOf: 'invalid' })).toThrow('Invalid evaluation date')
  })
})
