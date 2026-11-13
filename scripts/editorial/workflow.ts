import { createHash } from 'node:crypto'
import { z } from 'zod'
import { sitemapDate } from '../../lib/sitemap-date'

const text = z.string().trim().min(1)
const date = z.string().refine(value => /^\d{4}-\d{2}-\d{2}$/.test(value) && sitemapDate(value) === value, 'Invalid calendar date')
const digest = z.string().regex(/^[a-f0-9]{64}$/)
const https = z.string().url().refine(value => {
  const url = new URL(value)
  return url.protocol === 'https:' && !url.username && !url.password && !url.hash
}, 'Use a credential-free HTTPS source')
const source = z.object({ id: text, url: https, checkedAt: date, supports: text }).strict()
const claim = z.object({ id: text, kind: z.enum(['source-fact', 'company-experience']), text, sourceIds: z.array(text).min(1), evidenceId: text.optional(), evidencePageId: text.optional() }).strict()
const review = z.object({
  reviewer: text, reviewedAt: date, revision: digest,
  factsChecked: z.literal(true), noConfidentialData: z.literal(true),
  noInventedExperience: z.literal(true), usefulForEmployer: z.literal(true),
  languageChecked: z.literal(true), linksChecked: z.literal(true),
}).strict()
export const taskSchema = z.object({
  id: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  status: z.enum(['proposed', 'research', 'draft', 'review', 'approved', 'published', 'paused']),
  audience: z.enum(['law-firm', 'in-house']), locale: z.enum(['en', 'cs', 'de', 'pl']),
  situation: text, targetPath: text, rationale: text, nextAction: text, nextReview: date,
  content: z.object({ title: text, body: text, sources: z.array(source), claims: z.array(claim) }).strict().optional(),
  review: review.optional(),
  publication: z.object({ date, commit: z.string().regex(/^[a-f0-9]{40}$/), revision: digest, rollbackCommit: z.string().regex(/^[a-f0-9]{40}$/), verifiedUrl: https }).strict().optional(),
}).strict()
export const queueSchema = z.object({ version: z.literal(1), tasks: z.array(taskSchema) }).strict()
export type EditorialTask = z.infer<typeof taskSchema>
export interface WorkflowContext {
  asOf: string
  allowedPaths: ReadonlySet<string>
  pageIds: ReadonlyMap<string, string>
  evidence: readonly { id: string; approvalStatus: string; publicationEligible: boolean; permissionStatus: string; localeAvailability: readonly string[]; relatedPageIds: readonly string[] }[]
}

// Review binds to all publishable content, its source/claim mapping, intended
// audience, route and language. Status and scheduling do not alter the text.
export function contentRevision(input: EditorialTask): string {
  // Schema normalization gives the same field order and whitespace rules to
  // a caller creating the review and a later JSON/CLI reader.
  const task = taskSchema.parse(input)
  return createHash('sha256').update(JSON.stringify({ targetPath: task.targetPath, locale: task.locale, audience: task.audience, situation: task.situation, nextAction: task.nextAction, content: task.content })).digest('hex')
}

export function inspectTask(task: EditorialTask, context: WorkflowContext) {
  if (sitemapDate(context.asOf) !== context.asOf || !/^\d{4}-\d{2}-\d{2}$/.test(context.asOf)) throw new Error('Invalid evaluation date')
  const issues: string[] = []
  const fullReview = ['approved', 'published'].includes(task.status)
  if (!context.allowedPaths.has(task.targetPath)) issues.push('target-not-in-approved-inventory')
  const pathLocale = /^\/(cs|de|pl)(?:\/|$)/.exec(task.targetPath)?.[1] ?? 'en'
  if (pathLocale !== task.locale) issues.push('target-language-mismatch')
  if (['draft', 'review', 'approved', 'published'].includes(task.status) && !task.content) issues.push('content-missing')
  const content = task.content
  if (content) {
    const sources = new Map(content.sources.map(item => [item.id, item]))
    if (sources.size !== content.sources.length) issues.push('duplicate-source-id')
    if (new Set(content.claims.map(item => item.id)).size !== content.claims.length) issues.push('duplicate-claim-id')
    for (const item of content.sources) if (item.checkedAt > context.asOf) issues.push('future-source-check')
    for (const item of content.claims) {
      if (item.sourceIds.some(id => !sources.has(id))) issues.push('claim-source-missing')
      // Experience permission is checked against the existing registry's exact
      // page and locale scope; competitor sources cannot grant this permission.
      if (item.kind === 'company-experience' || item.evidenceId || item.evidencePageId) {
        const record = context.evidence.find(record => record.id === item.evidenceId)
        if (!record || record.approvalStatus !== 'approved' || !record.publicationEligible || record.permissionStatus !== 'approved' || !record.localeAvailability.includes(task.locale) || !item.evidencePageId || context.pageIds.get(task.targetPath) !== item.evidencePageId || !record.relatedPageIds.includes(item.evidencePageId)) issues.push('experience-evidence-not-approved')
      }
    }
  }
  if (fullReview && !task.review) issues.push('review-missing')
  if (task.review) {
    if (task.review.revision !== contentRevision(task)) issues.push('review-stale')
    if (task.review.reviewedAt > context.asOf) issues.push('future-review')
    if (content?.sources.some(source => source.checkedAt > task.review!.reviewedAt)) issues.push('source-checked-after-review')
    if (task.nextReview <= task.review.reviewedAt) issues.push('next-review-not-after-review')
  }
  if (fullReview && task.nextReview <= context.asOf) issues.push('review-overdue')
  if (task.status === 'published' && !task.publication) issues.push('publication-proof-missing')
  if (task.publication) {
    if (task.status !== 'published') issues.push('publication-state-mismatch')
    if (task.publication.revision !== contentRevision(task)) issues.push('publication-stale')
    if (task.publication.rollbackCommit === task.publication.commit) issues.push('rollback-does-not-change-revision')
    if (task.publication.date > context.asOf || !task.review || task.publication.date < task.review.reviewedAt) issues.push('publication-date-invalid')
    if (task.publication.verifiedUrl !== `https://www.bsolution.eu${task.targetPath === '/' ? '' : task.targetPath}`) issues.push('publication-url-mismatch')
  }
  return { id: task.id, status: task.status, targetPath: task.targetPath, locale: task.locale, audience: task.audience, nextReview: task.nextReview, due: task.nextReview <= context.asOf, revision: contentRevision(task), ready: task.status === 'approved' && issues.length === 0, issues: [...new Set(issues)] }
}

export function inspectQueue(input: unknown, context: WorkflowContext) {
  if (!date.safeParse(context.asOf).success) return { valid: false as const, issues: [{ path: 'asOf', code: 'invalid-evaluation-date' }], tasks: [] }
  const parsed = queueSchema.safeParse(input)
  if (!parsed.success) return { valid: false as const, issues: parsed.error.issues.map(item => ({ path: item.path.join('.'), code: item.code })), tasks: [] }
  const issues: { path: string; code: string }[] = []
  const ids = new Set<string>(), targets = new Set<string>()
  const tasks = parsed.data.tasks.map((task, index) => {
    if (ids.has(task.id)) issues.push({ path: `tasks.${index}.id`, code: 'duplicate-task-id' })
    ids.add(task.id)
    if (!['paused', 'published'].includes(task.status)) {
      if (targets.has(task.targetPath)) issues.push({ path: `tasks.${index}.targetPath`, code: 'competing-active-task' })
      targets.add(task.targetPath)
    }
    const result = inspectTask(task, context)
    for (const code of result.issues) issues.push({ path: `tasks.${index}`, code })
    return result
  })
  return { valid: issues.length === 0, issues, tasks }
}
