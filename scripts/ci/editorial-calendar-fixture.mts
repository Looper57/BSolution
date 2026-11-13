import { readFile, writeFile } from 'node:fs/promises'
import { editorialEntriesOn, editorialEntryHash, editorialScheduleHash, parseEditorialPublication, type PublishedEditorialEntry } from '../../lib/editorial/publication'
import { getEditorialTargets } from '../../lib/editorial/targets'

// Temporary runner workspace only: never invoked by the production build or website.
if (process.env.CI !== 'true' || process.env.GITHUB_ACTIONS !== 'true' || process.env.VERCEL) throw new Error('Calendar browser fixture is limited to GitHub CI')
const today = new Date().toISOString().slice(0, 10)
const day = (offset: number) => new Date(Date.parse(today) + offset * 86400000).toISOString().slice(0, 10)
const targets = getEditorialTargets()
const original = parseEditorialPublication(JSON.parse(await readFile('lib/editorial/published.json', 'utf8')), targets)
const fixturePaths = ['/hire-in-house-counsel', '/law-firm-recruitment']
const entry = (targetPath: string, id: string, heading: string, date: string): PublishedEditorialEntry => {
  const value = { id, targetPath, locale: 'en' as const, heading, paragraphs: [heading + ' — synthetic CI text, never a production publication.'], contentUpdatedAt: date, reviewedRevision: 'c'.repeat(64) }
  return { ...value, entryHash: editorialEntryHash(value) }
}
const scheduled = (value: PublishedEditorialEntry) => {
  const item = { entry: value, publishOn: value.contentUpdatedAt, reviewUntil: day(30) }
  return { ...item, scheduleHash: editorialScheduleHash(item) }
}
const result = parseEditorialPublication({ version: 1,
  entries: editorialEntriesOn(original).filter(e => !fixturePaths.includes(e.targetPath)),
  calendar: { entries: [scheduled(entry(fixturePaths[0], 'ci-calendar-future', 'CI_ONLY_FUTURE_SECTION', day(2))), scheduled(entry(fixturePaths[1], 'ci-calendar-due', 'CI_ONLY_DUE_SECTION', day(-1)))] },
}, targets)
await writeFile('lib/editorial/published.json', JSON.stringify(result, null, 2) + '\n')
console.log('Installed synthetic calendar fixture in CI workspace only; no approval or production change.')
