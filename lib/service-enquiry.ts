import { localizedPath, type Locale } from '@/lib/i18n/config'
import { recruitmentPage, type RecruitmentPage } from '@/lib/enquiry-recruitment'

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
export function serviceEnquiryHref(service: string, locale: Locale, page?: string): string {
  const valid = enquiryService(service)
  const context = recruitmentPage(page)
  return localizedPath(locale, '/contact') + (valid ? `#service-${valid}${context ? `&recruitment=${encodeURIComponent(context)}` : ''}` : '')
}

export function enquiryServiceFromHash(hash: string): EnquiryService | undefined {
  return enquiryContextFromHash(hash)?.service
}

export function recruitmentPageFromHash(hash: string): RecruitmentPage | undefined {
  return enquiryContextFromHash(hash)?.page
}

function enquiryContextFromHash(hash: string): { service: EnquiryService; page?: RecruitmentPage } | undefined {
  if (!hash.startsWith('#service-')) return
  const [value, ...rest] = hash.slice('#service-'.length).split('&')
  const service = enquiryService(value)
  if (!service || rest.length > 1) return
  if (!rest.length) return { service }
  const params = new URLSearchParams(rest[0])
  if (params.size !== 1 || !params.has('recruitment')) return
  const page = recruitmentPage(params.get('recruitment'))
  return page ? { service, page } : undefined
}
