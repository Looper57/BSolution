import type {
  SeoCanonicalRoute,
  SeoInternalLink,
  SeoPageDefinition,
} from './types'
import { resolveValidatedTarget } from './validation'

export interface ResolvedSeoInternalLink extends SeoInternalLink {
  href: string
}

export function getEligibleInternalLinks(
  source: SeoPageDefinition,
  pages: readonly SeoPageDefinition[],
  routes: readonly SeoCanonicalRoute[],
): ResolvedSeoInternalLink[] {
  return source.internalLinks.flatMap((link) => {
    const href = resolveValidatedTarget(source, link.target, pages, routes)
    return href ? [{ ...link, href }] : []
  })
}
