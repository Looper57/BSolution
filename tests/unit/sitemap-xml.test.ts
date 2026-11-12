import { describe, expect, it } from 'vitest'
import { sitemapXml } from '@/lib/sitemap-xml'

describe('shared public sitemap XML', () => {
  it('escapes canonical and alternative values without changing the underlying URL', () => {
    const xml = sitemapXml([{ url: 'https://example.com/?a=1&b=<test>', alternates: { languages: { en: 'https://example.com/?title="A"&name=O\'Brien' } } }])
    expect(xml).toContain('<loc>https://example.com/?a=1&amp;b=&lt;test&gt;</loc>')
    expect(xml).toContain('href="https://example.com/?title=&quot;A&quot;&amp;name=O&apos;Brien"')
    expect(xml).toContain('xmlns:xhtml="http://www.w3.org/1999/xhtml"')
  })

  it('emits supported source dates from Date values and strings', () => {
    const xml = sitemapXml([{ url: 'https://example.com/one', lastModified: new Date('2026-11-11T05:00:00Z') }, { url: 'https://example.com/two', lastModified: '2026-11-10T12:00:00' }])
    expect(xml).toContain('<lastmod>2026-11-11</lastmod>')
    expect(xml).toContain('<lastmod>2026-11-10</lastmod>')
  })

  it('keeps URLs with missing or malformed optional dates without inventing a date', () => {
    const xml = sitemapXml([{ url: 'https://example.com/one' }, { url: 'https://example.com/two', lastModified: new Date('invalid') }, { url: 'https://example.com/three', lastModified: '2026-02-30' }])
    expect(xml.match(/<url>/g)).toHaveLength(3)
    expect(xml).not.toContain('<lastmod>')
  })
})
