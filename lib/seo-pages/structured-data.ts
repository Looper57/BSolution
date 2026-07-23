import { SITE_URL, absoluteUrl } from '@/lib/i18n/config'
import {
  buildBreadcrumbSchema,
  buildServiceSchema,
  buildWebPageSchema,
} from '@/lib/structured-data'
import type {
  SeoCanonicalRoute,
  SeoPageDefinition,
  SeoStructuredDataType,
} from './types'
import {
  isPagePublishable,
  resolveValidatedParent,
} from './validation'

export function getEligibleStructuredData(
  page: SeoPageDefinition,
  pages: readonly SeoPageDefinition[],
  routes: readonly SeoCanonicalRoute[],
): SeoStructuredDataType[] {
  if (!isPagePublishable(page, pages, routes)) return []

  return page.structuredData.requested.filter((schemaType) => {
    if (schemaType === 'WebPage' || schemaType === 'BreadcrumbList') return true
    if (schemaType !== 'Service') return false
    return (
      page.structuredData.describesVisibleService
      && (page.pageType === 'service' || page.pageType === 'client-intent')
    )
  })
}

export function buildSeoPageStructuredData(
  page: SeoPageDefinition,
  pages: readonly SeoPageDefinition[],
  routes: readonly SeoCanonicalRoute[],
) {
  const eligible = getEligibleStructuredData(page, pages, routes)
  const parent = resolveValidatedParent(page, pages, routes)
  if (eligible.length === 0 || !parent) return null

  const input = {
    name: page.h1,
    description: page.metaDescription,
    url: page.canonical,
    locale: page.locale,
  }
  const graph = []

  if (eligible.includes('WebPage')) graph.push(buildWebPageSchema(input))
  if (eligible.includes('Service')) graph.push(buildServiceSchema(input))
  if (eligible.includes('BreadcrumbList')) {
    graph.push(buildBreadcrumbSchema(page.canonical, [
      { name: page.rendererLabels.home, item: absoluteUrl(page.locale, '/') },
      { name: parent.label, item: `${SITE_URL}${parent.href}` },
      { name: page.h1, item: page.canonical },
    ]))
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  }
}
