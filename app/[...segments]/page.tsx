import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import AboutPage from '@/app/about/page'
import ServicesPage from '@/app/services/page'
import ClientsPage from '@/app/clients/page'
import CandidatesPage from '@/app/candidates/page'
import ContactPage from '@/app/contact/page'
import PositionsPage from '@/app/positions/page'
import { AuthorityPage } from '@/components/authority-page'
import { AuthorityHub } from '@/components/authority-hub'
import { authoritySections, getEntitiesForSection, getEntity } from '@/lib/content'
import { absoluteUrl, buildAlternates, LOCALES, SITE_URL, type Locale } from '@/lib/i18n/config'
import { UI } from '@/lib/i18n/ui'

const staticPages = { about: AboutPage, services: ServicesPage, clients: ClientsPage, candidates: CandidatesPage, contact: ContactPage, positions: PositionsPage } as const
const hubKinds = { services: 'service', 'practice-areas': 'practice', industries: 'industry', locations: 'country', 'case-studies': 'caseStudy' } as const
const ogLocales: Record<Locale, string> = { en: 'en_GB', cs: 'cs_CZ', de: 'de_DE', pl: 'pl_PL' }

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
  if (path.length === 1 && path[0] in hubKinds) {
    const key = path[0] === 'locations' ? 'countries' : path[0] === 'practice-areas' ? 'practiceAreas' : path[0] === 'case-studies' ? 'caseStudies' : path[0]
    const label = UI[locale].nav[key as 'services' | 'practiceAreas' | 'industries' | 'countries' | 'caseStudies']
    return socialMetadata(locale, `/${path[0]}`, label, `${label} — B Solution Legal Executive Search across Europe and the Middle East.`)
  }
  if (path.length === 1 && path[0] in staticPages) {
    const label = path[0] === 'about' ? UI[locale].nav.about : path[0] === 'contact' ? UI[locale].nav.contact : path[0] === 'services' ? UI[locale].nav.services : path[0]
    return socialMetadata(locale, `/${path[0]}`, String(label), `${String(label)} — B Solution Legal Executive Search.`)
  }
  if (path.length !== 2) return {}
  const entity = getEntity(path[0], path[1])
  if (!entity) return {}
  const copy = entity.content[locale]
  return socialMetadata(locale, entity.basePath, copy.metaTitle ?? copy.title, copy.metaDescription ?? copy.summary)
}

export function generateStaticParams() {
  const details = LOCALES.flatMap((locale) => authoritySections.flatMap((section) => getEntitiesForSection(section).map((entity) => ({ segments: [...(locale === 'en' ? [] : [locale]), section, entity.slug] }))))
  const hubs = LOCALES.flatMap((locale) => Object.keys(hubKinds).map((section) => ({ segments: [...(locale === 'en' ? [] : [locale]), section] })))
  const localizedStatic = LOCALES.filter((locale) => locale !== 'en').flatMap((locale) => Object.keys(staticPages).map((page) => ({ segments: [locale, page] })))
  return [...details, ...hubs, ...localizedStatic]
}

export default async function Page({ params }: { params: Promise<{ segments: string[] }> }) {
  const { locale, path } = parseSegments((await params).segments)
  if (path.length === 1 && path[0] in staticPages) {
    const StaticPage = staticPages[path[0] as keyof typeof staticPages]
    return <StaticPage />
  }
  if (path.length === 1 && path[0] in hubKinds) {
    const section = path[0]
    return <AuthorityHub locale={locale} kind={hubKinds[section as keyof typeof hubKinds]} path={`/${section}`} entities={getEntitiesForSection(section)} />
  }
  if (path.length === 2) {
    const entity = getEntity(path[0], path[1])
    if (entity) return <AuthorityPage entity={entity} locale={locale} section={path[0]} />
  }
  notFound()
}
