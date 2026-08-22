import type { Locale } from '@/lib/i18n/config'
import type { EntityKind } from '@/lib/content/types'

export type PublicRouteKind =
  | 'staticPage'
  | 'authorityHub'
  | 'authorityDetail'
  | 'positionListing'
  | 'positionDetail'
  | 'legalPage'
  | 'localizedHomepage'
  | 'apiRoute'

export const localizedHomepages = ['/', '/cs', '/de', '/pl'] as const

export const localizedStaticPages = [
  '/about',
  '/clients',
  '/candidates',
  '/contact',
] as const

export const positionListingPath = '/positions' as const
export const positionContentLocales = ['en', 'cs'] as const satisfies readonly Locale[]
export const positionFallbackLocales = ['de', 'pl'] as const satisfies readonly Locale[]

/**
 * A position detail page only has genuine content in `positionContentLocales`
 * (see jobsData: no de/pl fields exist). Internal links must never point to
 * the de/pl noindex duplicate as a primary destination — resolve to the
 * locale-appropriate authoritative page instead (2026-08-22 Ahrefs audit).
 */
export function positionDetailLocale(locale: Locale): (typeof positionContentLocales)[number] {
  return (positionContentLocales as readonly Locale[]).includes(locale) ? (locale as (typeof positionContentLocales)[number]) : 'en'
}
export const legalExecutiveSearchCanonicalPath =
  '/services/legal-executive-search' as const

export const authorityDetailKinds = {
  services: 'service',
  'practice-areas': 'practice',
  industries: 'industry',
  locations: 'country',
  'case-studies': 'caseStudy',
  insights: 'insight',
} as const satisfies Record<string, EntityKind>

export const authorityHubKinds = Object.fromEntries(
  Object.entries(authorityDetailKinds).filter(([section]) => section !== 'insights')
) as Omit<typeof authorityDetailKinds, 'insights'>

export const authorityHubs = Object.keys(authorityHubKinds).map((section) => `/${section}`)

export const legalRoutes = {
  '/privacy': ['en', 'cs'],
  '/cookies': ['en', 'cs'],
} as const satisfies Record<string, readonly Locale[]>

export const englishOnlyStaticPages = [
  '/for-companies',
  '/hire-legal-leader',
  '/legal-recruitment-europe',
  '/hire-in-house-counsel',
  '/law-firm-recruitment',
  '/legal-recruitment-prague',
  '/legal-recruitment-germany',
  '/legal-recruitment-dubai',
] as const

// English-only recruitment landing pages, one per country, used to give the
// dedicated country-specific page in englishOnlyStaticPages above a real
// crawlable internal link from its matching location/country detail page —
// previously reachable only via sitemap.xml, which Ahrefs correctly flags as
// an orphan page (2026-08-22 Ahrefs audit).
export const countryRecruitmentLandingPages = {
  germany: '/legal-recruitment-germany',
  'czech-republic': '/legal-recruitment-prague',
  'united-arab-emirates': '/legal-recruitment-dubai',
} as const satisfies Partial<Record<string, (typeof englishOnlyStaticPages)[number]>>

export const apiRoutes = ['/api/contact'] as const

export function isLocalizedStaticPage(path: string): path is (typeof localizedStaticPages)[number] {
  return (localizedStaticPages as readonly string[]).includes(path)
}

export function isAuthorityHub(path: string): boolean {
  return authorityHubs.includes(path)
}

export function isEnglishOnlyStaticPage(path: string): path is (typeof englishOnlyStaticPages)[number] {
  return (englishOnlyStaticPages as readonly string[]).includes(path)
}

export function isLocalizedLegalRoute(path: string, locale: Locale): boolean {
  const locales = legalRoutes[path as keyof typeof legalRoutes] as readonly Locale[] | undefined
  return Boolean(locales?.includes(locale))
}

export function legalPath(locale: Locale, path: keyof typeof legalRoutes): string {
  return locale === 'cs' ? `/cs${path}` : path
}
