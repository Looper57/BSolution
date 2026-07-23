import { describe, expect, it } from 'vitest'
import {
  absoluteUrl,
  buildAlternates,
  localizedPath,
  localePrefix,
  SITE_URL,
} from '@/lib/i18n/config'

describe('locale-aware URL helpers', () => {
  it('keeps English unprefixed and prefixes supported localized routes', () => {
    expect(localePrefix('en')).toBe('')
    expect(localePrefix('cs')).toBe('/cs')
    expect(localizedPath('en', '/services')).toBe('/services')
    expect(localizedPath('cs', '/services')).toBe('/cs/services')
    expect(localizedPath('de', '/')).toBe('/de')
    expect(localizedPath('pl', '/')).toBe('/pl')
  })

  it('normalizes a trailing slash without changing the homepage', () => {
    expect(localizedPath('en', '/')).toBe('/')
    expect(localizedPath('cs', '/')).toBe('/cs')
    expect(localizedPath('de', '/services/')).toBe('/de/services')
  })

  it('builds canonical absolute URLs on the production domain', () => {
    expect(absoluteUrl('en', '/about')).toBe(`${SITE_URL}/about`)
    expect(absoluteUrl('pl', '/about')).toBe(`${SITE_URL}/pl/about`)
  })

  it('builds reciprocal alternates with English as x-default', () => {
    expect(buildAlternates('de', '/services')).toEqual({
      canonical: `${SITE_URL}/de/services`,
      languages: {
        en: `${SITE_URL}/services`,
        cs: `${SITE_URL}/cs/services`,
        de: `${SITE_URL}/de/services`,
        pl: `${SITE_URL}/pl/services`,
        'x-default': `${SITE_URL}/services`,
      },
    })
  })
})
