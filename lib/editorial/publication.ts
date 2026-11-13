import { createHash } from 'node:crypto'
import { z } from 'zod'
import { sitemapDate } from '../sitemap-date'

const text = z.string().trim().min(1)
const entrySchema = z.object({
  id: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  targetPath: text, locale: z.enum(['en', 'cs', 'de', 'pl']),
  heading: text, paragraphs: z.array(text).min(1),
  contentUpdatedAt: z.string().refine(value => /^\d{4}-\d{2}-\d{2}$/.test(value) && sitemapDate(value) === value),
  reviewedRevision: z.string().regex(/^[a-f0-9]{64}$/),
  entryHash: z.string().regex(/^[a-f0-9]{64}$/),
}).strict()
const publicationSchema = z.object({ version: z.literal(1), entries: z.array(entrySchema) }).strict()
export type PublishedEditorialEntry = z.infer<typeof entrySchema>
export type EditorialTarget = { locale: string; headings: readonly string[] }

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
    if (target.headings.includes(entry.heading)) throw new Error('Editorial publication duplicates an existing section')
    if (entry.entryHash !== editorialEntryHash(entry)) throw new Error('Editorial publication integrity mismatch')
    ids.add(entry.id); paths.add(entry.targetPath)
  }
  return result.data
}
