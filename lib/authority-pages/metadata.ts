import type { Metadata } from 'next'
import { DEFAULT_LOCALE, LOCALE_META, SITE_URL, type Locale } from '@/lib/i18n/config'
import {
  productionAuthorityRegistry,
} from './registry'
import { validateProductionAuthorityRegistry } from './validation'

const openGraphLocales: Record<Locale, string> = {
  en: 'en_GB',
  cs: 'cs_CZ',
  de: 'de_DE',
  pl: 'pl_PL',
}

export function buildProductionAuthorityMetadata(locale: Locale): Metadata {
  const validation = validateProductionAuthorityRegistry(productionAuthorityRegistry)
  if (!validation.valid) {
    throw new Error(
      `Invalid production authority registry: ${validation.errors
        .map((error) => error.message)
        .join(' ')}`,
    )
  }

  const record = productionAuthorityRegistry.find(
    ({ page }) => page.locale === locale,
  )
  if (!record || !productionAuthorityRegistry.includes(record)) {
    throw new Error(`No exact production authority record exists for locale ${locale}.`)
  }

  const { page } = record
  const languages = Object.fromEntries(
    productionAuthorityRegistry.map(({ page: alternate }) => [
      LOCALE_META[alternate.locale].htmlLang,
      alternate.canonical,
    ]),
  )
  const english = productionAuthorityRegistry.find(
    ({ page: alternate }) => alternate.locale === DEFAULT_LOCALE,
  )
  if (english) languages['x-default'] = english.page.canonical

  return {
    title: page.title,
    description: page.metaDescription,
    alternates: {
      canonical: page.canonical,
      languages,
    },
    robots: {
      index: page.indexationRequested,
      follow: true,
    },
    openGraph: {
      title: page.title,
      description: page.metaDescription,
      url: page.canonical,
      siteName: 'B Solution',
      type: 'website',
      locale: openGraphLocales[locale],
      images: [
        {
          url: `${SITE_URL}/images/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: `${page.h1} — B Solution`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.metaDescription,
      images: [`${SITE_URL}/images/og-image.jpg`],
    },
  }
}
