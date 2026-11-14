import type { Locale } from '@/lib/i18n/config'

// Closed, public corporate recruitment contexts. This is the page of the
// chosen brief, not a visitor identifier, first landing page or referrer.
export const recruitmentPages = {
  '/hire-in-house-counsel': 'inhouse',
  '/de/hire-in-house-counsel': 'inhouse',
  '/hire-legal-leader': 'leadership',
  '/for-companies': 'company',
  '/practice-areas/general-counsel': 'leadership',
  '/cs/practice-areas/general-counsel': 'leadership',
  '/de/practice-areas/general-counsel': 'leadership',
  '/pl/practice-areas/general-counsel': 'leadership',
} as const

export type RecruitmentPage = keyof typeof recruitmentPages

export function recruitmentPage(value: unknown): RecruitmentPage | undefined {
  return typeof value === 'string' && Object.prototype.hasOwnProperty.call(recruitmentPages, value)
    ? value as RecruitmentPage : undefined
}

const labels = {
  inhouse: { en: 'In-house legal recruitment', de: 'Unternehmensjuristen einstellen', cs: 'Nábor firemních právníků', pl: 'Rekrutacja prawników wewnętrznych' },
  leadership: { en: 'General Counsel and legal leadership', de: 'General Counsel und juristische Führung', cs: 'General Counsel a vedení právního oddělení', pl: 'General Counsel i kierownictwo działu prawnego' },
  company: { en: 'Building a corporate legal team', de: 'Eine interne Rechtsabteilung aufbauen', cs: 'Budování firemního právního týmu', pl: 'Budowanie firmowego zespołu prawnego' },
} as const

export function recruitmentPageLabel(page: RecruitmentPage, locale: Locale): string {
  return labels[recruitmentPages[page]][locale]
}
