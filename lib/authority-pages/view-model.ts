import type { Locale } from '@/lib/i18n/config'
import {
  getEligibleInternalLinks,
  resolveValidatedParent,
  resolveValidatedTarget,
  type SeoCanonicalRoute,
  type SeoPageDefinition,
} from '@/lib/seo-pages'
import {
  productionAuthorityCanonicalRoutes,
  productionAuthorityPages,
  productionAuthorityRelationships,
  productionAuthorityRegistry,
} from './registry'
import type {
  AuthorityEditorialSection,
  AuthorityFaqItem,
  ProductionAuthorityRecord,
} from './types'
import { validateProductionAuthorityRegistry } from './validation'
import { validateAuthorityRelationships } from './relationships'

export interface ProductionAuthorityViewModel {
  id: string
  locale: Locale
  canonical: string
  basePath: string
  title: string
  metaDescription: string
  breadcrumb: {
    navigationLabel: string
    homeLabel: string
    homeHref: string
    parentLabel: string
    parentHref: string
    currentLabel: string
  }
  hero: {
    parentLabel: string
    h1: string
    proposition: string
  }
  executiveSummary: {
    heading: string
    paragraphs: readonly string[]
  }
  definition: {
    heading: string
    text: string
  }
  sections: readonly AuthorityEditorialSection[]
  faq: {
    heading: string
    items: readonly AuthorityFaqItem[]
  }
  related: {
    heading: string
    links: readonly {
      id: string
      href: string
      label: string
    }[]
  }
  primaryCta: {
    href: string
    label: string
  }
  secondaryCta: {
    href: string
    label: string
  } | null
  additionalActionsLabel: string
  structuredData: SeoPageDefinition['structuredData']
}

export function buildProductionAuthorityViewModel(
  record: ProductionAuthorityRecord,
  registry: readonly ProductionAuthorityRecord[],
  canonicalRoutes: readonly SeoCanonicalRoute[],
): ProductionAuthorityViewModel {
  if (!registry.includes(record)) {
    throw new Error('Authority rendering requires the exact registry record.')
  }

  const validation = validateProductionAuthorityRegistry(registry)
  const relationshipValidation = validateAuthorityRelationships(
    productionAuthorityRelationships,
    registry,
  )
  if (!validation.valid || !relationshipValidation.valid) {
    throw new Error(
      `Invalid production authority registry: ${validation.errors
        .map((error) => error.message)
        .join(' ')}`,
    )
  }

  const { page, editorial, rendering } = record
  if (
    rendering.status !== 'existing-route-integration'
    || rendering.locale !== page.locale
    || rendering.basePath !== page.basePath
    || rendering.canonical !== page.canonical
    || page.publicationStatus !== 'owner-review'
    || page.approval.status !== 'pending'
    || page.indexationRequested
    || page.topicStatus !== 'resolved'
  ) {
    throw new Error(`Authority page ${page.id} is not eligible for existing-route integration.`)
  }

  const parent = resolveValidatedParent(page, productionAuthorityPages, canonicalRoutes)
  const primaryHref = resolveValidatedTarget(
    page,
    page.primaryCta.target,
    productionAuthorityPages,
    canonicalRoutes,
  )
  if (!parent || !primaryHref) {
    throw new Error(`Authority page ${page.id} has an unresolved required destination.`)
  }

  const resolvedSecondary = page.secondaryCtas.map((cta) => ({
    cta,
    href: resolveValidatedTarget(
      page,
      cta.target,
      productionAuthorityPages,
      canonicalRoutes,
    ),
  }))
  if (resolvedSecondary.length > 1 || resolvedSecondary.some(({ href }) => !href)) {
    throw new Error(`Authority page ${page.id} has an invalid secondary CTA.`)
  }

  const relatedLinks = getEligibleInternalLinks(
    page,
    productionAuthorityPages,
    canonicalRoutes,
  )
  if (relatedLinks.length !== page.internalLinks.length) {
    throw new Error(`Authority page ${page.id} has an unresolved related-page link.`)
  }

  return {
    id: page.id,
    locale: page.locale,
    canonical: page.canonical,
    basePath: page.basePath,
    title: page.title,
    metaDescription: page.metaDescription,
    breadcrumb: {
      navigationLabel: page.rendererLabels.breadcrumbNavigation,
      homeLabel: page.rendererLabels.home,
      homeHref: page.locale === 'en' ? '/' : `/${page.locale}`,
      parentLabel: parent.label,
      parentHref: parent.href,
      currentLabel: page.h1,
    },
    hero: {
      parentLabel: editorial.parentLabel,
      h1: editorial.h1,
      proposition: editorial.proposition,
    },
    executiveSummary: editorial.executiveSummary,
    definition: editorial.definition,
    sections: editorial.sections,
    faq: {
      heading: editorial.faqHeading,
      items: editorial.faqs,
    },
    related: {
      heading: editorial.relatedHeading,
      links: relatedLinks.map((link) => ({
        id: link.id,
        href: link.href,
        label: link.anchorText,
      })),
    },
    primaryCta: {
      href: primaryHref,
      label: page.primaryCta.label,
    },
    secondaryCta: resolvedSecondary[0]
      ? {
          href: resolvedSecondary[0].href!,
          label: resolvedSecondary[0].cta.label,
        }
      : null,
    additionalActionsLabel: page.rendererLabels.additionalActions,
    structuredData: page.structuredData,
  }
}

export function getProductionAuthorityViewModel(
  locale: Locale,
): ProductionAuthorityViewModel {
  const record = productionAuthorityRegistry.find(
    ({ page }) => page.locale === locale,
  )
  if (!record) {
    throw new Error(`No production authority record exists for locale ${locale}.`)
  }
  return buildProductionAuthorityViewModel(
    record,
    productionAuthorityRegistry,
    productionAuthorityCanonicalRoutes,
  )
}
