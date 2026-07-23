import type { MetadataRoute } from 'next'
import { jobsData } from '@/lib/jobs-data'
import { authorityEntities } from '@/lib/content'
import { LOCALES, localizedPath, SITE_URL } from '@/lib/i18n/config'

const localizedStaticPaths = ['', '/about', '/services', '/contact', '/clients', '/candidates', '/positions']
const hubs = ['/practice-areas', '/industries', '/locations', '/case-studies']
const englishOnlyPaths = ['/for-companies', '/hire-legal-leader', '/legal-recruitment-europe', '/legal-executive-search', '/hire-in-house-counsel', '/law-firm-recruitment', '/legal-recruitment-prague', '/legal-recruitment-germany', '/legal-recruitment-dubai', '/privacy', '/cookies']

function localizedEntry(path: string, locale: (typeof LOCALES)[number], now: Date): MetadataRoute.Sitemap[number] {
  return {
    url: `${SITE_URL}${localizedPath(locale, path || '/')}`,
    lastModified: now,
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : 0.7,
    alternates: {
      languages: {
        ...Object.fromEntries(LOCALES.map((alternate) => [alternate, `${SITE_URL}${localizedPath(alternate, path || '/')}`])),
        'x-default': `${SITE_URL}${localizedPath('en', path || '/')}`,
      },
    },
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const localizedEntries = [...localizedStaticPaths, ...hubs].flatMap((path) => LOCALES.map((locale) => localizedEntry(path, locale, now)))
  const authorityEntries = authorityEntities.flatMap((entity) => LOCALES.map((locale) => localizedEntry(entity.basePath, locale, now)))
  const englishEntries = englishOnlyPaths.map((path) => ({ url: `${SITE_URL}${path}`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.6 }))
  const jobEntries = jobsData.map((job) => ({ url: `${SITE_URL}/positions/${job.slug}`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.7 }))
  return [...localizedEntries, ...authorityEntries, ...englishEntries, ...jobEntries]
}
