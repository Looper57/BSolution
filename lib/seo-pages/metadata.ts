import type { Metadata } from 'next'
import { DEFAULT_LOCALE } from '@/lib/i18n/config'
import type { SeoCanonicalRoute, SeoPageDefinition } from './types'
import {
  getPageCanonical,
  isPageIndexable,
  isPagePublishable,
} from './validation'

export function getLocalizedAlternates(
  page: SeoPageDefinition,
  pages: readonly SeoPageDefinition[],
  routes: readonly SeoCanonicalRoute[],
): Record<string, string> {
  if (!isPageIndexable(page, pages, routes)) return {}

  const equivalents = pages.filter(
    (candidate) => (
      candidate.translationKey === page.translationKey
      && candidate.pageType === page.pageType
      && isPageIndexable(candidate, pages, routes)
    ),
  )
  const languages = Object.fromEntries(
    equivalents.map((candidate) => [candidate.locale, getPageCanonical(candidate)]),
  )
  const english = equivalents.find((candidate) => candidate.locale === DEFAULT_LOCALE)
  if (english) languages['x-default'] = getPageCanonical(english)
  return languages
}

export function buildSeoPageMetadata(
  page: SeoPageDefinition,
  pages: readonly SeoPageDefinition[],
  routes: readonly SeoCanonicalRoute[],
): Metadata {
  const indexable = isPageIndexable(page, pages, routes)
  const publishable = isPagePublishable(page, pages, routes)

  return {
    title: page.title,
    description: page.metaDescription,
    alternates: publishable
      ? {
          canonical: getPageCanonical(page),
          languages: getLocalizedAlternates(page, pages, routes),
        }
      : undefined,
    robots: {
      index: indexable,
      follow: true,
    },
  }
}
