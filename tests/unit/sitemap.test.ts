import { describe, expect, it } from 'vitest'
import sitemap from '@/app/sitemap'

describe('sitemap', () => {
  const entries = sitemap()
  const urls = entries.map((entry) => entry.url)

  it('contains only unique canonical URLs', () => {
    expect(urls).toHaveLength(106)
    expect(new Set(urls).size).toBe(urls.length)
  })

  it('contains only canonical Legal Executive Search service routes', () => {
    expect(urls).not.toContain('https://www.bsolution.eu/legal-executive-search')
    expect(
      urls.filter((url) => url.endsWith('/services/legal-executive-search')),
    ).toEqual([
      'https://www.bsolution.eu/services/legal-executive-search',
      'https://www.bsolution.eu/cs/services/legal-executive-search',
      'https://www.bsolution.eu/de/services/legal-executive-search',
      'https://www.bsolution.eu/pl/services/legal-executive-search',
    ])
  })

  it('contains one Services hub per supported locale', () => {
    expect(
      new Set(urls.filter((url) => /\/(?:cs\/|de\/|pl\/)?services$/.test(url))),
    ).toEqual(
      new Set([
        'https://www.bsolution.eu/services',
        'https://www.bsolution.eu/cs/services',
        'https://www.bsolution.eu/de/services',
        'https://www.bsolution.eu/pl/services',
      ]),
    )
  })

  it('excludes German and Polish fallback job details', () => {
    expect(urls.some((url) => url.includes('/de/positions/'))).toBe(false)
    expect(urls.some((url) => url.includes('/pl/positions/'))).toBe(false)
  })
})
