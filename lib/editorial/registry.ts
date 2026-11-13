import payload from './published.json'
import { parseEditorialPublication, editorialEntriesOn } from './publication'
import { getEditorialTargets } from './targets'
import { localizedPath, type Locale } from '../i18n/config'

const publication = parseEditorialPublication(payload, getEditorialTargets())
export function currentEditorialEntries() { return editorialEntriesOn(publication) }
export function publishedEditorialSections(basePath: string, locale: Locale) {
  const path = localizedPath(locale, basePath)
  return currentEditorialEntries().filter(entry => entry.targetPath === path)
}
export function publishedEditorialDates(): Readonly<Record<string, string>> {
  return Object.fromEntries(currentEditorialEntries().map(entry => [entry.targetPath, entry.contentUpdatedAt]))
}
