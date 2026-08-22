import { describe, expect, it } from 'vitest'
import {
  apiRoutes,
  authorityHubs,
  isAuthorityHub,
  isEnglishOnlyStaticPage,
  isLocalizedLegalRoute,
  isLocalizedStaticPage,
  legalExecutiveSearchCanonicalPath,
  legalPath,
  localizedHomepages,
  positionContentLocales,
  positionDetailLocale,
  positionFallbackLocales,
} from '@/lib/routes'

describe('public route registry', () => {
  it('has unique homepage and authority-hub paths', () => {
    expect(new Set(localizedHomepages).size).toBe(localizedHomepages.length)
    expect(new Set(authorityHubs).size).toBe(authorityHubs.length)
    expect(authorityHubs).toContain('/services')
  })

  it('classifies stable public routes', () => {
    expect(isLocalizedStaticPage('/about')).toBe(true)
    expect(isAuthorityHub('/services')).toBe(true)
    expect(isEnglishOnlyStaticPage('/legal-executive-search')).toBe(false)
    expect(legalExecutiveSearchCanonicalPath).toBe(
      '/services/legal-executive-search',
    )
    expect(apiRoutes).toEqual(['/api/contact'])
  })

  it('keeps legal localization limited to approved English and Czech content', () => {
    expect(isLocalizedLegalRoute('/privacy', 'en')).toBe(true)
    expect(isLocalizedLegalRoute('/privacy', 'cs')).toBe(true)
    expect(isLocalizedLegalRoute('/privacy', 'de')).toBe(false)
    expect(legalPath('cs', '/privacy')).toBe('/cs/privacy')
    expect(legalPath('de', '/privacy')).toBe('/privacy')
  })

  it('separates translated and fallback job locales', () => {
    expect(positionContentLocales).toEqual(['en', 'cs'])
    expect(positionFallbackLocales).toEqual(['de', 'pl'])
  })

  it('never resolves a position detail link to a fallback locale (2026-08-22 Ahrefs audit)', () => {
    // en/cs have genuine job content — link stays in the visitor's own locale.
    expect(positionDetailLocale('en')).toBe('en')
    expect(positionDetailLocale('cs')).toBe('cs')
    // de/pl positions are an untranslated English duplicate kept noindex —
    // internal links must resolve to the authoritative English page, never
    // to the de/pl duplicate as a primary destination.
    expect(positionDetailLocale('de')).toBe('en')
    expect(positionDetailLocale('pl')).toBe('en')
  })
})
