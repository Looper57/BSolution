import type { Locale } from '@/lib/i18n/config'

export const STRUCTURED_DATA_IDS = {
  organization: 'https://www.bsolution.eu/#organization',
  person: 'https://www.bsolution.eu/#lukas-benatcan',
  website: 'https://www.bsolution.eu/#website',
  professionalService: 'https://www.bsolution.eu/#professional-service',
} as const

export const organizationSchema = {
  '@type': 'Organization',
  '@id': STRUCTURED_DATA_IDS.organization,
  name: 'B Solution s.r.o.',
  url: 'https://www.bsolution.eu',
  logo: {
    '@type': 'ImageObject',
    '@id': 'https://www.bsolution.eu/#logo',
    url: 'https://www.bsolution.eu/images/logo.png',
  },
  description:
    'Boutique Legal Executive Search firm serving law firms and corporate legal departments across Europe and the Middle East since 2007.',
  foundingDate: '2007',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Prague',
    addressCountry: 'CZ',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+420-272-681-206',
    contactType: 'recruitment',
    email: 'info@bsolution.eu',
    availableLanguage: ['English', 'Czech'],
  },
  areaServed: [
    { '@type': 'Place', name: 'Europe' },
    { '@type': 'Place', name: 'Middle East' },
  ],
  knowsAbout: [
    'Executive Search',
    'Legal Executive Search',
    'Cross-border Executive Search',
    'Law firm recruitment',
    'Corporate legal department recruitment',
    'General Counsel recruitment',
    'Partner recruitment',
    'Leadership recruitment',
  ],
  sameAs: ['https://www.linkedin.com/company/bsolution'],
} as const

export const personSchema = {
  '@type': 'Person',
  '@id': STRUCTURED_DATA_IDS.person,
  name: 'Lukáš Benátčan',
  worksFor: { '@id': STRUCTURED_DATA_IDS.organization },
} as const

export const websiteSchema = {
  '@type': 'WebSite',
  '@id': STRUCTURED_DATA_IDS.website,
  name: 'B Solution',
  url: 'https://www.bsolution.eu',
  publisher: { '@id': STRUCTURED_DATA_IDS.organization },
  inLanguage: ['en', 'cs', 'de', 'pl'],
} as const

export const professionalServiceSchema = {
  '@type': 'ProfessionalService',
  '@id': STRUCTURED_DATA_IDS.professionalService,
  name: 'B Solution Legal Executive Search',
  url: 'https://www.bsolution.eu',
  description:
    'Legal Executive Search and cross-border recruitment for law firms and corporate legal departments across Europe and the Middle East.',
  serviceType: [
    'Executive Search',
    'Legal Executive Search',
    'Cross-border recruitment',
    'Law firm recruitment',
    'In-house counsel recruitment',
  ],
  areaServed: [
    { '@type': 'Place', name: 'Europe' },
    { '@type': 'Place', name: 'Middle East' },
  ],
  parentOrganization: { '@id': STRUCTURED_DATA_IDS.organization },
} as const

export const globalStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    organizationSchema,
    personSchema,
    websiteSchema,
    professionalServiceSchema,
  ],
} as const

interface PageSchemaInput {
  name: string
  description: string
  url: string
  locale: Locale
}

export function buildWebPageSchema({ name, description, url, locale }: PageSchemaInput) {
  return {
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    name,
    description,
    url,
    inLanguage: locale,
    isPartOf: { '@id': STRUCTURED_DATA_IDS.website },
    about: { '@id': STRUCTURED_DATA_IDS.organization },
    publisher: { '@id': STRUCTURED_DATA_IDS.organization },
  }
}

export function buildArticleSchema({ name, description, url, locale }: PageSchemaInput) {
  return {
    '@type': 'Article',
    '@id': `${url}#article`,
    headline: name,
    description,
    url,
    inLanguage: locale,
    mainEntityOfPage: { '@id': `${url}#webpage` },
    isPartOf: { '@id': STRUCTURED_DATA_IDS.website },
    publisher: { '@id': STRUCTURED_DATA_IDS.organization },
  }
}

export function buildServiceSchema({ name, description, url, locale }: PageSchemaInput) {
  return {
    '@type': 'Service',
    '@id': `${url}#service`,
    name,
    description,
    url,
    inLanguage: locale,
    serviceType: name,
    provider: { '@id': STRUCTURED_DATA_IDS.organization },
    areaServed: [
      { '@type': 'Place', name: 'Europe' },
      { '@type': 'Place', name: 'Middle East' },
    ],
  }
}

interface BreadcrumbItem {
  name: string
  item: string
}

export function buildBreadcrumbSchema(url: string, items: BreadcrumbItem[]) {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${url}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  }
}

interface FaqItem {
  question: string
  answer: string
}

export function buildFaqPageSchema(url: string, items: FaqItem[]) {
  if (items.length === 0) return null

  return {
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

export function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, '\\u003c')
}
