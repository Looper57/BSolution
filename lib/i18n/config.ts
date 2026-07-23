export const LOCALES = ['en', 'cs', 'de', 'pl'] as const

export type Locale = (typeof LOCALES)[number]

export const DEFAULT_LOCALE: Locale = 'en'

export const SITE_URL = 'https://www.bsolution.eu'

/** Locale display metadata used by the language switcher and hreflang tags. */
export const LOCALE_META: Record<Locale, { label: string; short: string; htmlLang: string; ariaLabel: string }> = {
  en: { label: 'English', short: 'En', htmlLang: 'en', ariaLabel: 'Switch to English' },
  cs: { label: 'Čeština', short: 'Cz', htmlLang: 'cs', ariaLabel: 'Přepnout na češtinu' },
  de: { label: 'Deutsch', short: 'De', htmlLang: 'de', ariaLabel: 'Auf Deutsch umschalten' },
  pl: { label: 'Polski', short: 'Pl', htmlLang: 'pl', ariaLabel: 'Przełącz na polski' },
}

/** English routes are unprefixed; other locales use a leading path segment. */
export function localePrefix(locale: Locale): string {
  return locale === DEFAULT_LOCALE ? '' : `/${locale}`
}

/** Build an absolute, locale-aware path from a root-relative English path. */
export function localizedPath(locale: Locale, path: string): string {
  const clean = path === '/' ? '' : path.replace(/\/$/, '')
  const prefix = localePrefix(locale)
  const result = `${prefix}${clean}`
  return result === '' ? '/' : result
}

/** Build an absolute canonical URL for a locale-aware path. */
export function absoluteUrl(locale: Locale, path: string): string {
  return `${SITE_URL}${localizedPath(locale, path)}`
}

/**
 * Build the alternates object (canonical + reciprocal hreflang, incl. x-default)
 * for a given English base path. Every indexable page uses this for parity.
 */
export function buildAlternates(locale: Locale, path: string) {
  const languages: Record<string, string> = {}
  for (const l of LOCALES) {
    languages[LOCALE_META[l].htmlLang] = absoluteUrl(l, path)
  }
  languages['x-default'] = absoluteUrl(DEFAULT_LOCALE, path)
  return {
    canonical: absoluteUrl(locale, path),
    languages,
  }
}
