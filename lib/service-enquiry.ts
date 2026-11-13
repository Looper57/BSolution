import { localizedPath, type Locale } from '@/lib/i18n/config'

export const enquiryServices = {
  'executive-search': { en: 'Legal Executive Search', cs: 'Legal Executive Search', de: 'Legal Executive Search', pl: 'Legal Executive Search' },
  'retained-recruitment': { en: 'Retained Legal Recruitment', cs: 'Mandátní právní nábor', de: 'Mandatierte juristische Personalsuche', pl: 'Rekrutacja prawnicza na zlecenie' },
  'market-intelligence': { en: 'Market Intelligence', cs: 'Průzkum trhu', de: 'Marktanalyse', pl: 'Analiza rynku' },
  'strategic-advisory': { en: 'Strategic Advisory', cs: 'Strategické poradenství', de: 'Strategische Beratung', pl: 'Doradztwo strategiczne' },
} as const

export type EnquiryService = keyof typeof enquiryServices

export function enquiryService(value: unknown): EnquiryService | undefined {
  return typeof value === 'string' && Object.prototype.hasOwnProperty.call(enquiryServices, value)
    ? value as EnquiryService : undefined
}

// An explicit service choice, not browsing attribution. Fragments do not
// create another contact URL for the server, canonical or sitemap.
export function serviceEnquiryHref(service: string, locale: Locale): string {
  const valid = enquiryService(service)
  return localizedPath(locale, '/contact') + (valid ? `#service-${valid}` : '')
}

export function enquiryServiceFromHash(hash: string): EnquiryService | undefined {
  return hash.startsWith('#service-') ? enquiryService(hash.slice('#service-'.length)) : undefined
}
