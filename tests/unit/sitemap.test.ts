import { describe, expect, it } from 'vitest'
import sitemap from '@/app/sitemap'

describe('sitemap', () => {
  const entries = sitemap()
  const urls = entries.map((entry) => entry.url)

  it('contains only unique canonical URLs', () => {
    expect(urls).toHaveLength(102)
    expect(new Set(urls).size).toBe(urls.length)
  })

  // /services/legal-executive-search is a distinct, evidence-gated page
  // definition (lib/authority-pages/registry.ts) awaiting owner approval —
  // its `indexationRequested` is currently false in all four locales, and
  // it actually renders noindex. The generic content entity in
  // lib/content/services.ts is unrelated and merely feeds the compiled
  // registry; it must not put a noindex URL in the sitemap on its own
  // (2026-08-22 Ahrefs audit: this test previously asserted the opposite,
  // which is exactly the drift that produced the defect).
  it('omits the Legal Executive Search service route until its evidence gate approves indexation', () => {
    expect(urls).not.toContain('https://www.bsolution.eu/legal-executive-search')
    expect(urls.filter((url) => url.endsWith('/services/legal-executive-search'))).toEqual([])
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
