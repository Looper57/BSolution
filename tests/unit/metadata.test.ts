import { describe, expect, it } from 'vitest'
import { hubRouteMetadata, staticRouteMetadata } from '@/lib/i18n/route-metadata'
import { LOCALES } from '@/lib/i18n/config'

describe('localized route metadata', () => {
  it.each(LOCALES)('provides non-empty core metadata for %s', (locale) => {
    for (const route of ['about', 'clients', 'candidates', 'contact', 'positions']) {
      expect(staticRouteMetadata[locale][route].title).toBeTruthy()
      expect(staticRouteMetadata[locale][route].description).toBeTruthy()
    }
  })

  it.each(LOCALES)('provides non-empty Services hub metadata for %s', (locale) => {
    expect(hubRouteMetadata[locale].services.title).toBeTruthy()
    expect(hubRouteMetadata[locale].services.description).toBeTruthy()
  })
})
