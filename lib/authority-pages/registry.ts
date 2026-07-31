import { absoluteUrl, LOCALES, type Locale } from '@/lib/i18n/config'
import { caseStudies } from '@/lib/content/case-studies'
import { practices } from '@/lib/content/practices'
import { industries } from '@/lib/content/industries'
import { services } from '@/lib/content/services'
import { legalExecutiveSearchContent } from './content'
import type {
  SeoCanonicalRoute,
  SeoContentSection,
  SeoInternalLink,
  SeoPageDefinition,
} from '@/lib/seo-pages'
import type {
  AuthorityReviewInformation,
  AuthorityRelationship,
  AuthorityTrustSignalReference,
  ProductionAuthorityRecord,
} from './types'

function getLegalExecutiveSearch() {
  const service = services.find((item) => item.slug === 'legal-executive-search')
  if (!service) {
    throw new Error('The approved Legal Executive Search service content is missing.')
  }
  return service
}

const legalExecutiveSearch = getLegalExecutiveSearch()

function relatedTitle(
  locale: Locale,
  collection: typeof practices | typeof industries | typeof caseStudies,
  slug: string,
): string {
  const entity = collection.find((item) => item.slug === slug)
  if (!entity) throw new Error(`Related authority entity ${slug} is missing.`)
  return entity.content[locale].title
}

const rendererLabels = {
  en: {
    breadcrumbNavigation: 'Breadcrumb navigation',
    home: 'Home',
    related: 'Related pages',
    additionalActions: 'Additional actions',
  },
  cs: {
    breadcrumbNavigation: 'Drobečková navigace',
    home: 'Domů',
    related: 'Související stránky',
    additionalActions: 'Další možnosti',
  },
  de: {
    breadcrumbNavigation: 'Brotkrümelnavigation',
    home: 'Startseite',
    related: 'Verwandte Seiten',
    additionalActions: 'Weitere Aktionen',
  },
  pl: {
    breadcrumbNavigation: 'Nawigacja okruszkowa',
    home: 'Strona główna',
    related: 'Powiązane strony',
    additionalActions: 'Dodatkowe działania',
  },
} as const

const trustSignals: readonly AuthorityTrustSignalReference[] = [
  {
    id: 'trust:legal-executive-search:operating-history',
    kind: 'operating-history',
    evidenceId: 'evidence:bsolution-founded-2007',
    status: 'approved',
  },
  {
    id: 'trust:legal-executive-search:organisation-experience',
    kind: 'organisation-experience',
    evidenceId: 'evidence:approved-executive-search-organisations',
    status: 'approved',
  },
  {
    id: 'trust:legal-executive-search:testimonials',
    kind: 'testimonial',
    evidenceId: 'evidence:approved-testimonials',
    status: 'approved',
  },
  {
    id: 'trust:legal-executive-search:case-study',
    kind: 'case-study',
    evidenceId: 'evidence:general-counsel-fintech-case-study',
    status: 'approved',
  },
  {
    id: 'trust:legal-executive-search:methodology',
    kind: 'methodology',
    evidenceId: 'evidence:legal-executive-search-methodology',
    status: 'approved',
  },
] as const

function routeId(locale: Locale, name: string): string {
  return `route:${locale}:${name}`
}

export const productionAuthorityCanonicalRoutes: readonly SeoCanonicalRoute[] =
  LOCALES.flatMap((locale) => [
    {
      id: routeId(locale, 'home'),
      locale,
      basePath: '/',
      kind: 'other' as const,
    },
    {
      id: routeId(locale, 'services'),
      locale,
      basePath: '/services',
      kind: 'service-hub' as const,
    },
    {
      id: routeId(locale, 'contact'),
      locale,
      basePath: '/contact',
      kind: 'contact' as const,
    },
    {
      id: routeId(locale, 'candidates'),
      locale,
      basePath: '/candidates',
      kind: 'candidate-hub' as const,
    },
    {
      id: routeId(locale, 'general-counsel'),
      locale,
      basePath: '/practice-areas/general-counsel',
      kind: 'other' as const,
    },
    {
      id: routeId(locale, 'compliance-officer'),
      locale,
      basePath: '/practice-areas/compliance-officer',
      kind: 'other' as const,
    },
    {
      id: routeId(locale, 'financial-services'),
      locale,
      basePath: '/industries/financial-services',
      kind: 'other' as const,
    },
    {
      id: routeId(locale, 'technology'),
      locale,
      basePath: '/industries/technology',
      kind: 'other' as const,
    },
    {
      id: routeId(locale, 'general-counsel-fintech-case-study'),
      locale,
      basePath: '/case-studies/general-counsel-fintech',
      kind: 'case-study' as const,
    },
  ])

export const productionAuthorityRelationships: readonly AuthorityRelationship[] =
  LOCALES.flatMap((locale) => {
    const pageId = `authority:legal-executive-search:${locale}`
    const editorial = legalExecutiveSearchContent[locale]
    const routeRelationship = (
      name: string,
      relationship: AuthorityRelationship['relationship'],
      anchor: string,
      evidenceRequirement: string | null = null,
      visibility: AuthorityRelationship['visibility'] = 'visible',
    ): AuthorityRelationship => ({
      id: `relationship:legal-executive-search:${locale}:${name}`,
      sourcePageId: pageId,
      target: { kind: 'route', routeId: routeId(locale, name) },
      relationship,
      locale,
      visibility,
      anchor,
      evidenceRequirement,
      publicationEligible: true,
    })

    return [
      routeRelationship('services', 'parent', editorial.parentLabel, null, 'structural'),
      routeRelationship('home', 'breadcrumb', rendererLabels[locale].home, null, 'structural'),
      routeRelationship('general-counsel', 'related-practice', relatedTitle(locale, practices, 'general-counsel')),
      routeRelationship('compliance-officer', 'related-practice', relatedTitle(locale, practices, 'compliance-officer')),
      routeRelationship('financial-services', 'related-industry', relatedTitle(locale, industries, 'financial-services')),
      routeRelationship('technology', 'related-industry', relatedTitle(locale, industries, 'technology')),
      routeRelationship(
        'general-counsel-fintech-case-study',
        'case-study',
        relatedTitle(locale, caseStudies, 'general-counsel-fintech'),
        'evidence:general-counsel-fintech-case-study',
      ),
      {
        id: `relationship:legal-executive-search:${locale}:methodology`,
        sourcePageId: pageId,
        target: { kind: 'evidence', evidenceId: 'evidence:legal-executive-search-methodology' },
        relationship: 'methodology',
        locale,
        visibility: 'structural',
        anchor: editorial.sections.find((section) => section.kind === 'search-methodology')!.heading,
        evidenceRequirement: 'evidence:legal-executive-search-methodology',
        publicationEligible: true,
      },
      ...editorial.faqs.map((faq) => ({
        id: `relationship:${faq.id}`,
        sourcePageId: pageId,
        target: { kind: 'faq' as const, faqId: faq.id },
        relationship: 'faq' as const,
        locale,
        visibility: 'structural' as const,
        anchor: faq.question,
        evidenceRequirement: null,
        publicationEligible: true,
      })),
      routeRelationship('contact', 'contact', editorial.primaryCtaLabel),
      routeRelationship('candidates', 'candidate-path', editorial.secondaryCandidateCtaLabel),
    ]
  })

function sectionsFor(locale: Locale): SeoContentSection[] {
  const editorial = legalExecutiveSearchContent[locale]
  const sectionTypes = {
    'market-context': 'capability-overview',
    'employer-challenges': 'audience-problem',
    'candidate-profile': 'roles-opportunities',
    'typical-mandates': 'roles-opportunities',
    'search-methodology': 'process',
    'assessment-methodology': 'process',
    'cross-border-capability': 'capability-overview',
    'process-timeline': 'process',
    'why-bsolution': 'evidence',
  } as const

  return [
    {
      id: `legal-executive-search:${locale}:definition`,
      locale,
      type: 'proposition',
      heading: editorial.definition.heading,
      paragraphs: [editorial.definition.text],
    },
    ...editorial.sections.map((section) => ({
      id: section.id,
      locale,
      type: sectionTypes[section.kind],
      heading: section.heading,
      paragraphs: section.paragraphs,
      items: section.items,
    })),
  ]
}

function relationshipsFor(locale: Locale): SeoInternalLink[] {
  return productionAuthorityRelationships
    .filter((item) => (
      item.locale === locale
      && item.visibility === 'visible'
      && item.target.kind === 'route'
      && ['related-practice', 'related-industry', 'case-study'].includes(item.relationship)
    ))
    .map((item) => ({
      id: item.id,
      locale,
      target: item.target as { kind: 'route'; routeId: string },
      relationship: item.relationship as SeoInternalLink['relationship'],
      anchorText: item.anchor,
      purpose: `Governed ${item.relationship} relationship.`,
    }))
}

function reviewFor(locale: Locale): AuthorityReviewInformation {
  return {
    status: 'owner-review',
    locale,
    contentOwnerId: 'owner:bsolution:legal-executive-search',
    evidenceOwnerId: 'owner:bsolution:legal-executive-search',
    lastReviewed: null,
    nextReview: null,
  }
}

function pageFor(locale: Locale): SeoPageDefinition {
  const copy = legalExecutiveSearch.content[locale]
  const editorial = legalExecutiveSearchContent[locale]

  return {
    id: `authority:legal-executive-search:${locale}`,
    translationKey: 'authority:legal-executive-search',
    ownerKey: 'owner:bsolution:legal-executive-search',
    locale,
    contentLocale: locale,
    slug: legalExecutiveSearch.slug,
    basePath: legalExecutiveSearch.basePath,
    pageType: 'service',
    publicationStatus: 'owner-review',
    approval: { status: 'pending' },
    evidence: {
      status: 'approved',
      requirements: [
        'Operating history since 2007',
        'Approved historical Executive Search experience',
        'Approved testimonials',
        'Approved case study',
        'Documented Legal Executive Search methodology',
      ],
    },
    topicStatus: 'resolved',
    indexationRequested: false,
    canonical: absoluteUrl(locale, legalExecutiveSearch.basePath),
    title: copy.metaTitle ?? copy.title,
    metaDescription: copy.metaDescription ?? copy.summary,
    h1: editorial.h1,
    proposition: editorial.proposition,
    audience: editorial.executiveSummary.heading,
    searchIntent: editorial.executiveSummary.paragraphs.join(' '),
    sections: sectionsFor(locale),
    primaryCta: {
      id: `legal-executive-search:${locale}:contact`,
      locale,
      label: editorial.primaryCtaLabel,
      target: { kind: 'route', routeId: routeId(locale, 'contact') },
      audience: 'client',
      style: 'primary',
    },
    secondaryCtas: [
      {
        id: `legal-executive-search:${locale}:candidates`,
        locale,
        label: editorial.secondaryCandidateCtaLabel,
        target: { kind: 'route', routeId: routeId(locale, 'candidates') },
        audience: 'candidate',
        style: 'secondary',
      },
    ],
    internalLinks: relationshipsFor(locale),
    parent: {
      target: { kind: 'route', routeId: routeId(locale, 'services') },
      locale,
      label: editorial.parentLabel,
    },
    rendererLabels: {
      locale,
      ...rendererLabels[locale],
    },
    structuredData: {
      requested: ['WebPage', 'BreadcrumbList', 'Service'],
      describesVisibleService: true,
    },
  }
}

export const productionAuthorityRegistry: readonly ProductionAuthorityRecord[] =
  LOCALES.map((locale) => ({
    page: pageFor(locale),
    editorial: legalExecutiveSearchContent[locale],
    rendering: {
      status: 'existing-route-integration',
      locale,
      basePath: legalExecutiveSearch.basePath,
      canonical: absoluteUrl(locale, legalExecutiveSearch.basePath),
    },
    review: reviewFor(locale),
    trustSignals,
  }))

export const productionAuthorityPages: readonly SeoPageDefinition[] =
  productionAuthorityRegistry.map((record) => record.page)
