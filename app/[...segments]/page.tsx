import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import AboutPage from '@/app/about/page'
import ClientsPage from '@/app/clients/page'
import CandidatesPage from '@/app/candidates/page'
import ContactPage from '@/app/contact/page'
import PositionsPage from '@/app/positions/page'
import PrivacyPage from '@/app/privacy/page'
import CookiesPage from '@/app/cookies/page'
import { ServicesOverview } from '@/app/services/page'
import { JobDetailClient } from '@/app/positions/[slug]/job-detail-client'
import { getAllJobs, getJobBySlug } from '@/lib/jobs-data'
import { AuthorityPage } from '@/components/authority-page'
import { AuthorityHub } from '@/components/authority-hub'
import { authoritySections, getEntitiesForSection, getEntity } from '@/lib/content'
import { absoluteUrl, buildAlternates, LOCALES, SITE_URL, type Locale } from '@/lib/i18n/config'
import { hubRouteMetadata, staticRouteMetadata } from '@/lib/i18n/route-metadata'
import { authorityHubKinds, isLocalizedLegalRoute, localizedStaticPages } from '@/lib/routes'

const staticPages = { about: AboutPage, clients: ClientsPage, candidates: CandidatesPage, contact: ContactPage } as const
const legalPages = { privacy: PrivacyPage, cookies: CookiesPage } as const
const ogLocales: Record<Locale, string> = { en: 'en_GB', cs: 'cs_CZ', de: 'de_DE', pl: 'pl_PL' }

function translatedPositionAlternates(path: string) {
  return {
    languages: {
      en: absoluteUrl('en', path),
      cs: absoluteUrl('cs', path),
      'x-default': absoluteUrl('en', path),
    },
  }
}

function parseSegments(segments: string[]) {
  const first = segments[0]
  const locale: Locale = LOCALES.includes(first as Locale) ? first as Locale : 'en'
  return { locale, path: locale === 'en' ? segments : segments.slice(1) }
}

function socialMetadata(locale: Locale, path: string, title: string, description: string): Metadata {
  const url = absoluteUrl(locale, path)
  return {
    title, description, alternates: buildAlternates(locale, path),
    openGraph: { title, description, url, siteName: 'B Solution', type: 'website', locale: ogLocales[locale], images: [{ url: `${SITE_URL}/images/og-image.jpg`, width: 1200, height: 630, alt: `${title} — B Solution` }] },
    twitter: { card: 'summary_large_image', title, description, images: [`${SITE_URL}/images/og-image.jpg`] },
  }
}

export async function generateMetadata({ params }: { params: Promise<{ segments: string[] }> }): Promise<Metadata> {
  const { locale, path } = parseSegments((await params).segments)
  if (path.length === 1 && path[0] in authorityHubKinds) {
    const copy = hubRouteMetadata[locale][path[0]]
    return socialMetadata(locale, `/${path[0]}`, copy.title, copy.description)
  }
  if (path.length === 1 && path[0] in staticPages) {
    const copy = staticRouteMetadata[locale][path[0]]
    return socialMetadata(locale, `/${path[0]}`, copy.title, copy.description)
  }
  if (path.length === 1 && path[0] === 'positions') {
    const copy = staticRouteMetadata[locale].positions
    const metadata = socialMetadata(locale, '/positions', copy.title, copy.description)
    metadata.alternates = {
      canonical: absoluteUrl(locale === 'cs' ? 'cs' : 'en', '/positions'),
      ...translatedPositionAlternates('/positions'),
    }
    if (locale === 'de' || locale === 'pl') metadata.robots = { index: false, follow: true }
    return metadata
  }
  if (path.length === 1 && path[0] in legalPages && isLocalizedLegalRoute(`/${path[0]}`, locale)) {
    const title = path[0] === 'privacy'
      ? (locale === 'cs' ? 'Ochrana osobních údajů' : 'Privacy Policy')
      : (locale === 'cs' ? 'Zásady používání cookies' : 'Cookie Policy')
    const description = path[0] === 'privacy'
      ? (locale === 'cs' ? 'Informace o tom, jak B Solution shromažďuje, používá a chrání osobní údaje.' : 'Learn how B Solution collects, uses, and protects personal data.')
      : (locale === 'cs' ? 'Informace o používání cookies a podobných technologií na webu B Solution.' : 'Learn how B Solution uses cookies and similar technologies.')
    const metadata = socialMetadata(locale, `/${path[0]}`, title, description)
    metadata.alternates = {
      canonical: absoluteUrl(locale, `/${path[0]}`),
      languages: {
        en: absoluteUrl('en', `/${path[0]}`),
        cs: absoluteUrl('cs', `/${path[0]}`),
        'x-default': absoluteUrl('en', `/${path[0]}`),
      },
    }
    return metadata
  }
  if (path.length === 2 && path[0] === 'positions') {
    const job = getJobBySlug(path[1])
    if (!job) return {}
    const title = locale === 'cs' ? job.titleCs : job.title
    const description = locale === 'cs' ? job.shortDescriptionCs : job.shortDescription
    const jobPath = `/positions/${job.slug}`
    const metadata = socialMetadata(locale, jobPath, `${title} - ${locale === 'cs' ? job.locationCs : job.location}`, description)
    metadata.alternates = {
      canonical: absoluteUrl(locale === 'cs' ? 'cs' : 'en', jobPath),
      ...translatedPositionAlternates(jobPath),
    }
    if (locale === 'de' || locale === 'pl') metadata.robots = { index: false, follow: true }
    return metadata
  }
  if (path.length !== 2) return {}
  const entity = getEntity(path[0], path[1])
  if (!entity) return {}
  const copy = entity.content[locale]
  return socialMetadata(locale, entity.basePath, copy.metaTitle ?? copy.title, copy.metaDescription ?? copy.summary)
}

export function generateStaticParams() {
  const details = LOCALES.flatMap((locale) => authoritySections.flatMap((section) => getEntitiesForSection(section).map((entity) => ({ segments: [...(locale === 'en' ? [] : [locale]), section, entity.slug] }))))
  const hubs = LOCALES.flatMap((locale) => Object.keys(authorityHubKinds)
    .filter((section) => !(locale === 'en' && section === 'services'))
    .map((section) => ({ segments: [...(locale === 'en' ? [] : [locale]), section] })))
  const localizedStatic = LOCALES.filter((locale) => locale !== 'en').flatMap((locale) => [
    ...localizedStaticPages.map((page) => ({ segments: [locale, page.slice(1)] })),
    { segments: [locale, 'positions'] },
  ])
  const localizedLegal = [{ segments: ['cs', 'privacy'] }, { segments: ['cs', 'cookies'] }]
  const localizedJobs = LOCALES.filter((locale) => locale !== 'en').flatMap((locale) =>
    getAllJobs().map((job) => ({ segments: [locale, 'positions', job.slug] }))
  )
  return [...details, ...hubs, ...localizedStatic, ...localizedLegal, ...localizedJobs]
}

export default async function Page({ params }: { params: Promise<{ segments: string[] }> }) {
  const { locale, path } = parseSegments((await params).segments)
  if (path.length === 1 && path[0] in staticPages) {
    const StaticPage = staticPages[path[0] as keyof typeof staticPages]
    return <StaticPage />
  }
  if (path.length === 1 && path[0] === 'positions') return <PositionsPage />
  if (path.length === 1 && path[0] in legalPages && isLocalizedLegalRoute(`/${path[0]}`, locale)) {
    const LegalPage = legalPages[path[0] as keyof typeof legalPages]
    return <LegalPage />
  }
  if (path.length === 1 && path[0] in authorityHubKinds) {
    const section = path[0]
    return <AuthorityHub locale={locale} kind={authorityHubKinds[section as keyof typeof authorityHubKinds]} path={`/${section}`} entities={getEntitiesForSection(section)} supplement={section === 'services' && (locale === 'en' || locale === 'cs') ? <ServicesOverview /> : undefined} />
  }
  if (path.length === 2 && path[0] === 'positions') {
    const job = getJobBySlug(path[1])
    if (job) return <JobDetailClient job={job} />
  }
  if (path.length === 2) {
    const entity = getEntity(path[0], path[1])
    if (entity) return <AuthorityPage entity={entity} locale={locale} section={path[0]} />
  }
  notFound()
}
