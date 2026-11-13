import type { MetadataRoute } from 'next'
import { sitemapDate } from '@/lib/sitemap-date'
import { jobsData } from '@/lib/jobs-data'
import { getLivePositions, livePositionPath } from '@/lib/live-positions'
import { getLegalJobs, legalJobPath, legalJobsCountryPath, legalJobsPath } from '@/lib/legal-jobs'
import { AVAILABLE_LAWYERS, availableLawyersPath } from '@/lib/available-lawyers'
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

// Significant, source-reviewed content edits only. Never use the sitemap
// generation time as a modification date for unchanged pages.
const employerContentUpdates: Readonly<Record<string, string>> = {
  '/for-companies': '2026-11-13',
  '/hire-legal-leader': '2026-11-13',
  '/law-firm-recruitment': '2026-11-13',
  '/hire-in-house-counsel': '2026-11-13',
  '/legal-recruitment-germany': '2026-11-13',
  '/legal-recruitment-dubai': '2026-11-13',
}

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

// `alternateLocales` narrows the hreflang cluster to the locales that really
// have content (2026-11-03 Ahrefs audit: positions listed de/pl, whose pages
// are noindex with a canonical to English — "hreflang to non-canonical").
function localizedEntry(path: string, locale: Locale, alternateLocales: readonly Locale[] = LOCALES): MetadataRoute.Sitemap[number] {
  return {
    url: absoluteCanonicalUrl(locale, path),
    changeFrequency: path === '/' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : 0.7,
    alternates: {
      languages: {
        ...Object.fromEntries(alternateLocales.map((alternate) => [alternate, absoluteCanonicalUrl(alternate, path)])),
        'x-default': absoluteCanonicalUrl('en', path),
      },
    },
  }
}

async function translatedLegalJobPages(): Promise<MetadataRoute.Sitemap> {
  const perLocale = await Promise.all(LOCALES.filter((locale) => locale !== 'en').map(async (locale) =>
    (await getLegalJobs(locale))
      .filter((job) => job.summaryLocale === locale)
      .map((job) => ({ url: absoluteCanonicalUrl(locale, legalJobPath(job)), lastModified: sitemapDate(job.postedAt ?? job.firstSeenAt), changeFrequency: 'weekly' as const, priority: 0.5 })),
  ))
  return perLocale.flat()
}

export function getEmployerSitemapEntries(): MetadataRoute.Sitemap {
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
  const englishPages = englishOnlyStaticPages.map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...localizedPages, ...authorityPages, ...gatedAuthorityPages, ...englishPages]
    .filter(entry => !/\/(?:cs\/|de\/|pl\/)?candidates$/.test(new URL(entry.url).pathname))
    .map(entry => {
      const updated = employerContentUpdates[new URL(entry.url).pathname]
      return updated ? { ...entry, lastModified: updated } : entry
    })
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const employerEntries = getEmployerSitemapEntries()
  const candidatePages = LOCALES.map(locale => localizedEntry('/candidates', locale))
  const positionListings = positionContentLocales.map((locale) =>
    localizedEntry(positionListingPath, locale, positionContentLocales)
  )
  const positionPages = jobsData.flatMap((job) =>
    positionContentLocales.map((locale) => ({
      ...localizedEntry(`/positions/${job.slug}`, locale, positionContentLocales),
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
  // Positions published for bsolution.eu in the LawBridge console (M4);
  // English-only URLs, the text is as entered, and they leave the sitemap
  // as soon as they close or expire.
  const openPositionPages = (await getLivePositions({ revalidateSeconds: 3600 })).map((position) => ({
    url: `${SITE_URL}${livePositionPath(position)}`,
    lastModified: sitemapDate(position.postedAt),
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
    ...legalJobs.map((job) => ({ url: `${SITE_URL}${legalJobPath(job)}`, lastModified: sitemapDate(job.postedAt ?? job.firstSeenAt), changeFrequency: 'weekly' as const, priority: 0.5 })),
    // An advert whose summary exists in a locale is its own indexable,
    // self-canonical page there (lib/legal-jobs-route.tsx) — it belongs in
    // the sitemap too (2026-11-03: listings linked dozens of them, the graph
    // crawl gate failed on the link-to-inventory ratio).
    ...(await translatedLegalJobPages()),
  ]

  // Anonymous profiles of available lawyers (pilot 2026-11-03), every
  // locale, only while a profile is listed.
  const availableLawyerPages = AVAILABLE_LAWYERS.length === 0 ? [] : LOCALES.map((locale) => ({
    ...localizedEntry(availableLawyersPath, locale),
    changeFrequency: 'weekly' as const,
  }))

  const entries = [...employerEntries, ...candidatePages, ...availableLawyerPages, ...positionListings, ...positionPages, ...openPositionPages, ...legalJobPages, ...legalPages]
  const urls = new Set(entries.map((entry) => entry.url))
  if (urls.size !== entries.length) throw new Error('Sitemap contains duplicate canonical URLs')
  return entries
}
