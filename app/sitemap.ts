import type { MetadataRoute } from 'next'
import { jobsData } from '@/lib/jobs-data'
import { authorityEntities } from '@/lib/content'
import { LOCALES, localizedPath, SITE_URL, type Locale } from '@/lib/i18n/config'
import {
  authorityHubs,
  englishOnlyStaticPages,
  legalRoutes,
  localizedStaticPages,
  positionContentLocales,
  positionListingPath,
} from '@/lib/routes'

function localizedEntry(path: string, locale: Locale): MetadataRoute.Sitemap[number] {
  return {
    url: `${SITE_URL}${localizedPath(locale, path)}`,
    changeFrequency: path === '/' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : 0.7,
    alternates: {
      languages: {
        ...Object.fromEntries(LOCALES.map((alternate) => [alternate, `${SITE_URL}${localizedPath(alternate, path)}`])),
        'x-default': `${SITE_URL}${localizedPath('en', path)}`,
      },
    },
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const fullyLocalizedPaths = [
    '/',
    ...localizedStaticPages,
    ...authorityHubs,
  ]

  const localizedPages = fullyLocalizedPaths.flatMap((path) =>
    LOCALES.map((locale) => localizedEntry(path, locale))
  )
  const authorityPages = authorityEntities.flatMap((entity) =>
    LOCALES.map((locale) => localizedEntry(entity.basePath, locale))
  )
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

  const entries = [...localizedPages, ...authorityPages, ...positionListings, ...positionPages, ...legalPages, ...englishPages]
  const urls = new Set(entries.map((entry) => entry.url))
  if (urls.size !== entries.length) throw new Error('Sitemap contains duplicate canonical URLs')
  return entries
}
