import type { SeoCanonicalRoute, SeoPageDefinition } from './types'
import {
  isPageIndexable,
  isPagePublishable,
  validateSeoPageRegistry,
} from './validation'

export function isSeoPageSitemapEligible(
  page: SeoPageDefinition,
  pages: readonly SeoPageDefinition[],
  routes: readonly SeoCanonicalRoute[],
): boolean {
  return (
    page.publicationStatus === 'approved'
    && page.topicStatus === 'clear'
    && isPagePublishable(page, pages, routes)
    && isPageIndexable(page, pages, routes)
  )
}

export function getSitemapEligibleSeoPages(
  pages: readonly SeoPageDefinition[],
  routes: readonly SeoCanonicalRoute[],
): SeoPageDefinition[] {
  const validation = validateSeoPageRegistry(pages, routes)
  if (!validation.valid) {
    throw new Error(`Invalid SEO page registry: ${validation.errors.map((error) => error.message).join(' ')}`)
  }
  return pages.filter((page) => isSeoPageSitemapEligible(page, pages, routes))
}
