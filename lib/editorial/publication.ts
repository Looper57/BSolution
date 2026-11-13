import { createHash } from 'node:crypto'
import { z } from 'zod'
import { sitemapDate } from '../sitemap-date'

const text = z.string().trim().min(1)
const date = z.string().refine(value => /^\d{4}-\d{2}-\d{2}$/.test(value) && sitemapDate(value) === value)
const entrySchema = z.object({
  id: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  targetPath: text, locale: z.enum(['en', 'cs', 'de', 'pl']),
  heading: text, paragraphs: z.array(text).min(1),
  contentUpdatedAt: date,
  reviewedRevision: z.string().regex(/^[a-f0-9]{64}$/),
  entryHash: z.string().regex(/^[a-f0-9]{64}$/),
}).strict()
const scheduledSchema = z.object({ publishOn: date, reviewUntil: date, entry: entrySchema, scheduleHash: z.string().regex(/^[a-f0-9]{64}$/) }).strict()
const publicationSchema = z.object({ version: z.literal(1), entries: z.array(entrySchema), calendar: z.object({ pausedOn: date.optional(), entries: z.array(scheduledSchema) }).strict().optional() }).strict()
export type EditorialPublication = z.infer<typeof publicationSchema>
export type ScheduledEditorialEntry = z.infer<typeof scheduledSchema>
export function editorialScheduleHash(item: Omit<ScheduledEditorialEntry, 'scheduleHash'>) {
  return createHash('sha256').update(JSON.stringify({ publishOn: item.publishOn, reviewUntil: item.reviewUntil, entryHash: item.entry.entryHash })).digest('hex')
}
export function editorialEntriesOn(publication: EditorialPublication, asOf = new Date().toISOString().slice(0, 10)): PublishedEditorialEntry[] {
  if (!date.safeParse(asOf).success) throw new Error('Invalid editorial calendar date')
  const cutoff = publication.calendar?.pausedOn && publication.calendar.pausedOn < asOf ? publication.calendar.pausedOn : asOf
  const visible = new Map(publication.entries.map(entry => [entry.targetPath, entry]))
  for (const item of [...(publication.calendar?.entries ?? [])].sort((a, b) => a.publishOn.localeCompare(b.publishOn))) {
    if (item.publishOn <= cutoff) visible.set(item.entry.targetPath, item.entry)
  }
  return [...visible.values()].sort((a, b) => a.targetPath.localeCompare(b.targetPath))
}
export type PublishedEditorialEntry = z.infer<typeof entrySchema>
export type EditorialTarget = { locale: string; headings: readonly string[] }
const normalizedText = (value: string) => value.replace(/\s+/g, ' ').trim()
export function sameEditorialText(a: Pick<PublishedEditorialEntry, 'heading' | 'paragraphs'>, b: Pick<PublishedEditorialEntry, 'heading' | 'paragraphs'>) {
  return normalizedText(a.heading) === normalizedText(b.heading) && JSON.stringify(a.paragraphs.map(normalizedText)) === JSON.stringify(b.paragraphs.map(normalizedText))
}


// Integrity of the public bytes, not reviewer identity or an owner signature.
export function editorialEntryHash(entry: Omit<PublishedEditorialEntry, 'entryHash'>): string {
  return createHash('sha256').update(JSON.stringify({ id: entry.id, targetPath: entry.targetPath, locale: entry.locale, heading: entry.heading, paragraphs: entry.paragraphs, contentUpdatedAt: entry.contentUpdatedAt, reviewedRevision: entry.reviewedRevision })).digest('hex')
}

export function parseEditorialPublication(input: unknown, targets: ReadonlyMap<string, EditorialTarget>) {
  const result = publicationSchema.safeParse(input)
  if (!result.success) throw new Error('Invalid public editorial publication schema')
  const ids = new Set<string>(), paths = new Set<string>()
  for (const entry of result.data.entries) {
    const target = targets.get(entry.targetPath)
    if (!target || target.locale !== entry.locale) throw new Error('Unsupported editorial publication target or language')
    if (ids.has(entry.id) || paths.has(entry.targetPath)) throw new Error('Duplicate editorial publication ID or target')
    if (target.headings.some(heading => normalizedText(heading) === normalizedText(entry.heading))) throw new Error('Editorial publication duplicates an existing section')
    if (entry.entryHash !== editorialEntryHash(entry)) throw new Error('Editorial publication integrity mismatch')
    ids.add(entry.id); paths.add(entry.targetPath)
  }
  const knownIds = new Map(result.data.entries.map(entry => [entry.id, entry.targetPath]))
  const scheduledSlots = new Set<string>()
  const timeline = new Map(result.data.entries.map(entry => [entry.targetPath, entry]))
  for (const item of [...(result.data.calendar?.entries ?? [])].sort((a, b) => a.publishOn.localeCompare(b.publishOn))) {
    const entry = item.entry, target = targets.get(entry.targetPath)
    if (!target || target.locale !== entry.locale || target.headings.some(heading => normalizedText(heading) === normalizedText(entry.heading))) throw new Error('Unsupported calendar target or heading')
    if (entry.entryHash !== editorialEntryHash(entry) || item.scheduleHash !== editorialScheduleHash(item)) throw new Error('Calendar integrity mismatch')
    if (entry.contentUpdatedAt !== item.publishOn || item.reviewUntil <= item.publishOn) throw new Error('Calendar publication is outside its reviewed window')
    if (knownIds.has(entry.id) && knownIds.get(entry.id) !== entry.targetPath) throw new Error('A calendar task cannot move to another route')
    knownIds.set(entry.id, entry.targetPath)
    const slot = entry.targetPath + ':' + item.publishOn
    if (scheduledSlots.has(slot)) throw new Error('Conflicting editorial calendar slot')
    scheduledSlots.add(slot)
    const previous = timeline.get(entry.targetPath)
    if (previous && item.publishOn <= previous.contentUpdatedAt) throw new Error('Calendar precedes the current content version')
    if (previous && sameEditorialText(previous, entry)) throw new Error('Calendar cannot republish unchanged text for a new date')
    timeline.set(entry.targetPath, entry)
  }
  return result.data
}
