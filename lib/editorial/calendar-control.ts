import { editorialEntriesOn, editorialEntryHash, sameEditorialText, parseEditorialPublication, type EditorialTarget } from './publication'

/** Produces a reviewed-source candidate only. Never mutates the live registry. */
export function controlEditorialCalendar(input: unknown, action: 'pause' | 'resume', asOf: string, targets: ReadonlyMap<string, EditorialTarget>) {
  const publication = parseEditorialPublication(input, targets)
  const visible = editorialEntriesOn(publication, asOf)
  const pausedOn = publication.calendar?.pausedOn
  if (action === 'pause') {
    const cutoff = pausedOn && pausedOn < asOf ? pausedOn : asOf
    return parseEditorialPublication({ version: 1, entries: visible, calendar: { pausedOn: cutoff, entries: (publication.calendar?.entries ?? []).filter(item => item.publishOn > cutoff) } }, targets)
  }
  if (!pausedOn) return publication
  if (asOf < pausedOn) throw new Error('Resume precedes the pause date')
  const latest = new Map<string, NonNullable<typeof publication.calendar>['entries'][number]>()
  for (const item of [...publication.calendar!.entries].sort((a, b) => a.publishOn.localeCompare(b.publishOn))) {
    if (item.publishOn > pausedOn && item.publishOn <= asOf) latest.set(item.entry.targetPath, item)
  }
  const entries = new Map(visible.map(entry => [entry.targetPath, entry]))
  for (const item of latest.values()) {
    if (item.reviewUntil <= asOf) throw new Error('Held content needs a fresh review before resuming')
    // Held work is first released now, not backdated to the missed calendar day.
    const current = entries.get(item.entry.targetPath)
    const entry = { ...item.entry, contentUpdatedAt: current && sameEditorialText(current, item.entry) ? current.contentUpdatedAt : asOf }
    entry.entryHash = editorialEntryHash(entry)
    entries.set(entry.targetPath, entry)
  }
  return parseEditorialPublication({ version: 1, entries: [...entries.values()], calendar: { entries: publication.calendar!.entries.filter(item => item.publishOn > asOf) } }, targets)
}
