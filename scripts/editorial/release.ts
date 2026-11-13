import { inspectQueue, queueSchema, type WorkflowContext } from './workflow'
import { editorialEntryHash, parseEditorialPublication, type EditorialTarget, type PublishedEditorialEntry } from '../../lib/editorial/publication'

export function stageEditorialRelease(input: unknown, taskId: string, existing: unknown, context: WorkflowContext, targets: ReadonlyMap<string, EditorialTarget>) {
  const report = inspectQueue(input, context)
  if (!report.valid) throw new Error('Editorial queue validation failed')
  const queue = queueSchema.parse(input)
  const task = queue.tasks.find(task => task.id === taskId)
  const check = report.tasks.find(task => task.id === taskId)
  // Replaying already-published owner-approved bytes is allowed, without
  // changing any review/publication record or falsely labelling a new review.
  if (!task?.content || !task.review || !check || !(check.ready || task.status === 'published' && check.issues.length === 0)) throw new Error('Task is not an exact current reviewed revision')
  const previous = parseEditorialPublication(existing, targets)
  if (previous.entries.some(entry => entry.id === taskId && entry.targetPath !== task.targetPath)) throw new Error('A published task cannot be silently moved to another route')
  const publicEntry: Omit<PublishedEditorialEntry, 'entryHash'> = {
    id: task.id, targetPath: task.targetPath, locale: task.locale,
    heading: task.content.title, paragraphs: task.content.body.split(/\n\s*\n/).map(paragraph => paragraph.trim()).filter(Boolean),
    contentUpdatedAt: task.review.reviewedAt, reviewedRevision: task.review.revision,
  }
  const entry = { ...publicEntry, entryHash: editorialEntryHash(publicEntry) }
  const entries = [...previous.entries.filter(old => old.id !== taskId && old.targetPath !== entry.targetPath), entry].sort((a, b) => a.targetPath.localeCompare(b.targetPath))
  return parseEditorialPublication({ version: 1, entries }, targets)
}
