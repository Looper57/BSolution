// Public form locations only: never accept a full URL, query, fragment or
// arbitrary path as enquiry context. This is the submission page, not a
// visitor identifier or first-touch/organic attribution.
export const contactFormPages = [
  '/de', '/pl', '/cs',
  '/contact', '/de/contact', '/pl/contact', '/cs/contact',
  '/hire-in-house-counsel', '/law-firm-recruitment',
  '/legal-recruitment-europe', '/legal-recruitment-germany',
  '/legal-recruitment-dubai', '/legal-recruitment-prague',
] as const

export type ContactFormPage = typeof contactFormPages[number]

export function contactFormPage(value: unknown): ContactFormPage | undefined {
  return typeof value === 'string' && contactFormPages.some(page => page === value)
    ? value as ContactFormPage
    : undefined
}
