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
  '/legal-executive-search',
  '/hire-in-house-counsel',
  '/law-firm-recruitment',
  '/legal-recruitment-prague',
  '/legal-recruitment-germany',
  '/legal-recruitment-dubai',
] as const

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
