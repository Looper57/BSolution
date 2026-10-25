import { beforeAll, describe, expect, it, vi } from 'vitest'
import type { MetadataRoute } from 'next'
import sitemap from '@/app/sitemap'

describe('sitemap', () => {
  // The open-positions feed (LawBridge) is empty here; tests/unit/live-positions.test.ts covers it.
  let entries: MetadataRoute.Sitemap = []
  let urls: string[] = []
  beforeAll(async () => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response(JSON.stringify({ positions: [] }), { status: 200 })))
    entries = await sitemap()
    urls = entries.map((entry) => entry.url)
    vi.unstubAllGlobals()
  })

  it('contains only unique canonical URLs', () => {
    expect(urls).toHaveLength(134)
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
  it('lists the owner-approved Legal Executive Search page once per locale, never the legacy route', () => {
    expect(urls).not.toContain('https://www.bsolution.eu/legal-executive-search')
    expect(urls.filter((url) => url.endsWith('/services/legal-executive-search')).sort()).toEqual([
      'https://www.bsolution.eu/cs/services/legal-executive-search',
      'https://www.bsolution.eu/de/services/legal-executive-search',
      'https://www.bsolution.eu/pl/services/legal-executive-search',
      'https://www.bsolution.eu/services/legal-executive-search',
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
