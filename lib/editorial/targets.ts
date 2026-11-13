import { authorityEntities } from '../content'
import { LOCALES, localizedPath } from '../i18n/config'
import { productionAuthorityPages } from '../authority-pages/registry'
import type { EditorialTarget } from './publication'
import landingTargets from './landing-targets.json'

export const EDITORIAL_LANDING_PATHS = ['/hire-in-house-counsel', '/hire-legal-leader', '/law-firm-recruitment', '/legal-recruitment-europe'] as const
export type EditorialLandingPath = (typeof EDITORIAL_LANDING_PATHS)[number]

// Generic authority routes and the four explicitly wired server landing
// slots are supported. Case studies and owner-gated services stay excluded.
export function getEditorialTargets(): ReadonlyMap<string, EditorialTarget> {
  const gated = new Set(productionAuthorityPages.map(page => page.basePath))
  if (landingTargets.length !== EDITORIAL_LANDING_PATHS.length || new Set(landingTargets.map(target => target.targetPath)).size !== EDITORIAL_LANDING_PATHS.length || landingTargets.some(target => target.locale !== 'en' || !EDITORIAL_LANDING_PATHS.some(path => path === target.targetPath))) throw new Error('Unwired editorial landing target')
  const genericTargets = authorityEntities
    .filter(entity => entity.kind !== 'caseStudy' && entity.kind !== 'insight' && !gated.has(entity.basePath))
    .flatMap(entity => LOCALES.map(locale => [localizedPath(locale, entity.basePath), { locale, headings: entity.content[locale].sections.map(section => section.heading) }] as const))
  return new Map([...genericTargets, ...landingTargets.map(target => [target.targetPath, { locale: target.locale, headings: target.headings }] as const)])
}
