import type { Metadata } from 'next'
import { absoluteUrl, buildAlternates, SITE_URL, type Locale } from '@/lib/i18n/config'
import { LegalJobDetail, LegalJobsListing } from '@/components/legal-jobs'
import { COPY, countryName, getLegalJob, getLegalJobs, isCountrySegment, isJobId, legalJobPath, legalJobsCountryPath, legalJobsPath, type LegalJob } from '@/lib/legal-jobs'

const NOINDEX: Metadata = { robots: { index: false, follow: true } }
const ogLocales: Record<Locale, string> = { en: 'en_GB', cs: 'cs_CZ', de: 'de_DE', pl: 'pl_PL' }

function social(locale: Locale, path: string, title: string, description: string, alternates: Metadata['alternates']): Metadata {
  const url = absoluteUrl(locale, path)
  return {
    title, description, alternates,
    openGraph: { title, description, url, siteName: 'B Solution', type: 'website', locale: ogLocales[locale], images: [{ url: `${SITE_URL}/images/og-image.jpg`, width: 1200, height: 630, alt: `${title} — B Solution` }] },
  }
}

// The root template appends " | B Solution" (13 characters). Reserve
// that space and shorten only search metadata; the visible job title stays full.
function searchTitle(value: string): string {
  if (value.length <= 52) return value
  const prefix = value.slice(0, 51)
  const boundary = prefix.lastIndexOf(' ')
  return `${boundary >= 30 ? prefix.slice(0, boundary) : prefix}…`
}

/**
 * /legal-jobs (all markets), /legal-jobs/{cc} (one market) and
 * /legal-jobs/{uuid} (one external advert), in every site locale. A detail
 * whose summary exists only in English is canonical to the English page.
 */
export async function legalJobsMetadata(locale: Locale, segment: string | null): Promise<Metadata> {
  const copy = COPY[locale]
  if (segment === null) return social(locale, legalJobsPath, copy.title, copy.metaDescription, buildAlternates(locale, legalJobsPath))
  if (isCountrySegment(segment)) {
    const name = countryName(segment.toUpperCase(), locale)
    const path = legalJobsCountryPath(segment)
    const jobs = await getLegalJobs(locale, segment.toUpperCase())
    const searchName = segment.toUpperCase() === 'AE' ? { en: 'UAE', cs: 'SAE', de: 'VAE', pl: 'ZEA' }[locale] : name
    const metadata = social(locale, path, searchTitle(copy.countryTitle(searchName)), copy.countryMeta(searchName), buildAlternates(locale, path))
    // An empty market page is thin content until the first advert arrives.
    return jobs.length === 0 ? { ...metadata, ...NOINDEX } : metadata
  }
  const job = isJobId(segment) ? await getLegalJob(segment, locale) : null
  if (!job) return NOINDEX
  const path = legalJobPath(job)
  const title = searchTitle(`${job.title}${job.city ? ` – ${job.city}` : ''}`)
  const description = job.summary.replace(/\s+/g, ' ').slice(0, 155)
  const alternates = job.summaryLocale === locale ? buildAlternates(locale, path) : { canonical: absoluteUrl('en', path) }
  return social(locale, path, title, description, alternates)
}

/** null means 404: unknown segment, or an advert that closed or is not a lawyer role. */
export async function legalJobsPage(locale: Locale, segment: string | null): Promise<React.ReactElement | null> {
  if (segment === null) return <LegalJobsListing locale={locale} jobs={await getLegalJobs(locale)} country={null} />
  if (isCountrySegment(segment)) return <LegalJobsListing locale={locale} jobs={await getLegalJobs(locale)} country={segment.toUpperCase()} />
  const job: LegalJob | null = isJobId(segment) ? await getLegalJob(segment, locale) : null
  return job ? <LegalJobDetail locale={locale} job={job} /> : null
}
