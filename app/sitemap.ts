import type { MetadataRoute } from 'next'
import { jobsData } from '@/lib/jobs-data'
import { getLivePositions, livePositionPath } from '@/lib/live-positions'
import { getLegalJobs, legalJobPath, legalJobsCountryPath, legalJobsPath } from '@/lib/legal-jobs'
import { authorityEntities } from '@/lib/content'
import { productionAuthorityCanonicalRoutes, productionAuthorityPages } from '@/lib/authority-pages'
import { getSitemapEligibleSeoPages } from '@/lib/seo-pages'
import { LOCALES, localizedPath, SITE_URL, type Locale } from '@/lib/i18n/config'
import {
  authorityHubs,
  englishOnlyStaticPages,
  legalRoutes,
  localizedStaticPages,
  positionContentLocales,
  positionListingPath,
} from '@/lib/routes'

// Base paths whose real indexation state is governed by the fully-validated
// evidence/publication gate in lib/seo-pages (isPageIndexable etc.), not by
// the generic content registry's `complete` flag. Without this exclusion,
// this file and the evidence gate silently drifted apart: the compiled
// content entity for /services/legal-executive-search is `complete: true`
// and was being listed here unconditionally, while the page that actually
// renders at that URL is a distinct, still-pending-approval definition that
// currently renders noindex — a sitemap entry pointing at a noindex page
// (2026-08-22 Ahrefs audit).
const productionGatedBasePaths = new Set(productionAuthorityPages.map((page) => page.basePath))

// `localizedPath` deliberately returns `/` for the English root so on-page
// `<Link href>` navigation is never an empty string — correct for
// navigation, but Next's own canonical-tag renderer normalizes the root to
// the bare origin with no trailing slash. sitemap.xml's <loc> must match
// that exact rendered canonical, not the navigation-shaped path
// (2026-08-22 Ahrefs audit).
function absoluteCanonicalUrl(locale: Locale, path: string): string {
  const url = `${SITE_URL}${localizedPath(locale, path)}`
  return url === `${SITE_URL}/` ? SITE_URL : url
}

function localizedEntry(path: string, locale: Locale): MetadataRoute.Sitemap[number] {
  return {
    url: absoluteCanonicalUrl(locale, path),
    changeFrequency: path === '/' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : 0.7,
    alternates: {
      languages: {
        ...Object.fromEntries(LOCALES.map((alternate) => [alternate, absoluteCanonicalUrl(alternate, path)])),
        'x-default': absoluteCanonicalUrl('en', path),
      },
    },
  }
}

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const fullyLocalizedPaths = [
    '/',
    ...localizedStaticPages,
    ...authorityHubs,
  ]

  const localizedPages = fullyLocalizedPaths.flatMap((path) =>
    LOCALES.map((locale) => localizedEntry(path, locale))
  )
  const authorityPages = authorityEntities
    .filter((entity) => !productionGatedBasePaths.has(entity.basePath))
    .flatMap((entity) => LOCALES.map((locale) => localizedEntry(entity.basePath, locale)))

  // Evidence-gated authority pages (see productionGatedBasePaths above):
  // only the locales that pass the full registry validation AND are
  // approved AND request indexation get a sitemap entry, and their
  // hreflang cluster is built from that approved set alone — not from the
  // full LOCALES list — so it can never advertise a locale that isn't
  // really ready.
  const indexableGatedPages = getSitemapEligibleSeoPages(productionAuthorityPages, productionAuthorityCanonicalRoutes)
  const gatedLanguages = Object.fromEntries(indexableGatedPages.map((page) => [page.locale, page.canonical]))
  const gatedXDefault = indexableGatedPages.find((page) => page.locale === 'en')?.canonical
  const gatedAuthorityPages: MetadataRoute.Sitemap = indexableGatedPages.map((page) => ({
    url: page.canonical,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
    alternates: { languages: gatedXDefault ? { ...gatedLanguages, 'x-default': gatedXDefault } : gatedLanguages },
  }))
  const positionListings = positionContentLocales.map((locale) =>
    localizedEntry(positionListingPath, locale)
  )
  const positionPages = jobsData.flatMap((job) =>
    positionContentLocales.map((locale) => ({
      ...localizedEntry(`/positions/${job.slug}`, locale),
      changeFrequency: 'weekly' as const,
    }))
  )
  const legalPages = Object.entries(legalRoutes).flatMap(([path, locales]) =>
    locales.map((locale) => {
      const entry = localizedEntry(path, locale)
      entry.alternates = {
        languages: {
          en: `${SITE_URL}${path}`,
          cs: `${SITE_URL}/cs${path}`,
          'x-default': `${SITE_URL}${path}`,
        },
      }
      return entry
    })
  )
  const englishPages = englishOnlyStaticPages.map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  // Positions published for bsolution.eu in the LawBridge console (M4);
  // English-only URLs, the text is as entered, and they leave the sitemap
  // as soon as they close or expire.
  const openPositionPages = (await getLivePositions({ revalidateSeconds: 3600 })).map((position) => ({
    url: `${SITE_URL}${livePositionPath(position)}`,
    lastModified: position.postedAt ?? undefined,
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }))

  // External legal positions (M13.3): the listing and every market page
  // that has adverts, in all locales; each advert's English page (a closed
  // one leaves the feed and the sitemap the same day).
  const legalJobs = await getLegalJobs('en')
  const legalJobCountries = [...new Set(legalJobs.map((job) => job.country).filter((c): c is string => Boolean(c)))]
  const legalJobPages = [
    ...LOCALES.map((locale) => ({ ...localizedEntry(legalJobsPath, locale), changeFrequency: 'daily' as const })),
    ...legalJobCountries.flatMap((country) => LOCALES.map((locale) => ({ ...localizedEntry(legalJobsCountryPath(country), locale), changeFrequency: 'daily' as const }))),
    ...legalJobs.map((job) => ({ url: `${SITE_URL}${legalJobPath(job)}`, lastModified: job.postedAt ?? job.firstSeenAt, changeFrequency: 'weekly' as const, priority: 0.5 })),
  ]

  const entries = [...localizedPages, ...authorityPages, ...gatedAuthorityPages, ...positionListings, ...positionPages, ...openPositionPages, ...legalJobPages, ...legalPages, ...englishPages]
  const urls = new Set(entries.map((entry) => entry.url))
  if (urls.size !== entries.length) throw new Error('Sitemap contains duplicate canonical URLs')
  return entries
}
