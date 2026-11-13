import { beforeAll, describe, expect, it, vi } from 'vitest'
import type { MetadataRoute } from 'next'
import sitemap from '@/app/sitemap'
import { getEmployerSitemapEntries } from '@/lib/sitemap-entries'
import { GET as employerSitemap } from '@/app/employer-sitemap.xml/route'

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
    // 134 + the external legal-jobs listing in four locales (M13.3, 2026-10-29).
    // + the available-lawyers listing in four locales (pilot 2026-11-03).
    expect(urls).toHaveLength(142)
    expect(new Set(urls).size).toBe(urls.length)
  })

  it('lists the external legal-jobs page in every locale; with no adverts there are no market or advert pages', () => {
    for (const url of ['https://www.bsolution.eu/legal-jobs', 'https://www.bsolution.eu/cs/legal-jobs', 'https://www.bsolution.eu/de/legal-jobs', 'https://www.bsolution.eu/pl/legal-jobs']) expect(urls).toContain(url)
    expect(urls.filter((url) => /\/legal-jobs\/./.test(url))).toEqual([])
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

describe('employer discovery independent of external feeds', () => {
  it('shares approved canonical inventory with the full sitemap, without jobs or candidate pages', async () => {
    const fetch = vi.fn(async () => { throw new Error('feed unavailable') })
    vi.stubGlobal('fetch', fetch)
    try {
      const employers = getEmployerSitemapEntries()
      expect(fetch).not.toHaveBeenCalled()
      expect(employers.some(entry => entry.url.endsWith('/law-firm-recruitment'))).toBe(true)
      expect(employers.some(entry => entry.url.endsWith('/hire-in-house-counsel'))).toBe(true)
      expect(employers.some(entry => entry.url.endsWith('/de/practice-areas/general-counsel'))).toBe(true)
      expect(employers.some(entry => /\/(legal-jobs|positions|candidates|available-lawyers)(\/|$)/.test(new URL(entry.url).pathname))).toBe(false)
      expect(new Set(employers.map(entry => entry.url)).size).toBe(employers.length)
      const xml = await employerSitemap().text()
      expect(xml).toContain('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"')
      // Only genuinely updated employer pages carry review dates;
      // unchanged pages do not acquire a generated "today" timestamp.
      expect(employers.filter(entry => entry.lastModified).map(entry => entry.url).sort()).toEqual([
        'https://www.bsolution.eu/for-companies',
        'https://www.bsolution.eu/hire-legal-leader',
        'https://www.bsolution.eu/law-firm-recruitment',
      ])
      expect(xml.match(/<lastmod>2026-11-13<\/lastmod>/g)).toHaveLength(3)
      expect(fetch).not.toHaveBeenCalled()
      const all = new Set((await sitemap()).map(entry => entry.url))
      expect(employers.every(entry => all.has(entry.url))).toBe(true)
    } finally { vi.unstubAllGlobals() }
  })

  it('serializes timezone-less dates on source and translated job pages and omits malformed dates', async () => {
    vi.stubGlobal('fetch', vi.fn(async (url: string) => {
      if (url.includes('/positions?')) return new Response(JSON.stringify({ positions: [
        { id: 123, title: 'Legal Counsel', validThrough: '2099-12-31T23:59:59Z', postedAt: '2026-11-11T05:23:02.93' },
      ] }))
      const locale = new URL(url).searchParams.get('locale') ?? 'en'
      return new Response(JSON.stringify({ jobs: [
        { id: '11111111-1111-4111-8111-111111111111', title: 'Legal Counsel', status: 'open', summaryLocale: locale, sourceUrl: 'https://example.com/job', postedAt: '2026-11-10T12:30:45.123456', firstSeenAt: '2026-11-11T00:00:00Z' },
        { id: '22222222-2222-4222-8222-222222222222', title: 'Counsel', status: 'open', summaryLocale: locale, sourceUrl: 'https://example.com/second', postedAt: '2026-02-30T00:00:00Z' },
      ] }))
    }))
    try {
      const entries = await sitemap()
      expect(entries.find(entry => entry.url.includes('/positions/open/123-'))?.lastModified).toBe('2026-11-11')
      for (const prefix of ['', '/cs', '/de', '/pl']) {
        expect(entries.find(entry => entry.url === `https://www.bsolution.eu${prefix}/legal-jobs/11111111-1111-4111-8111-111111111111`)?.lastModified).toBe('2026-11-10')
        expect(entries.find(entry => entry.url === `https://www.bsolution.eu${prefix}/legal-jobs/22222222-2222-4222-8222-222222222222`)?.lastModified).toBeUndefined()
      }
    } finally { vi.unstubAllGlobals() }
  })
})
