import { authorityEntities } from '../content'
import { LOCALES, localizedPath } from '../i18n/config'
import { productionAuthorityPages } from '../authority-pages/registry'
import type { EditorialTarget } from './publication'

// Only routes actually rendered by AuthorityPage support this first adapter.
// Case studies and separately owner-gated service renderers stay excluded.
export function getEditorialTargets(): ReadonlyMap<string, EditorialTarget> {
  const gated = new Set(productionAuthorityPages.map(page => page.basePath))
  return new Map(authorityEntities
    .filter(entity => entity.kind !== 'caseStudy' && entity.kind !== 'insight' && !gated.has(entity.basePath))
    .flatMap(entity => LOCALES.map(locale => [localizedPath(locale, entity.basePath), { locale, headings: entity.content[locale].sections.map(section => section.heading) }] as const)))
}
