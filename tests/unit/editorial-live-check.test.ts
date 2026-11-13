import { describe, expect, it } from 'vitest'
import { verifyEditorialHtml, verifyEditorialSitemap } from '../../scripts/editorial/live-check'
import type { PublishedEditorialEntry } from '../../lib/editorial/publication'

const entry: PublishedEditorialEntry = { id: 'synthetic-public', targetPath: '/practice-areas/compliance-officer', locale: 'en', heading: 'Role & scope', paragraphs: ['A lawyer’s "scope" <requires> clarity & support.', "The employer's expectations."], contentUpdatedAt: '2026-11-13', reviewedRevision: 'a'.repeat(64), entryHash: 'b'.repeat(64) }
const section = '<section data-editorial-id="synthetic-public"><h2>Role &amp; scope</h2><div><p>A lawyer’s &quot;scope&quot; &lt;requires&gt; clarity &amp; support.</p><p>The employer&#x27;s expectations.</p></div></section>'
const page = (body = section) => `<html lang="en"><head><link rel="canonical" href="https://www.bsolution.eu${entry.targetPath}"/><meta name="robots" content="index, follow"/></head><body>${body}</body></html>`
const sitemap = (date = '2026-11-13') => `<urlset><url><loc>https://www.bsolution.eu${entry.targetPath}</loc><lastmod>${date}</lastmod></url></urlset>`

describe('actual public editorial HTML contract', () => {
  it('verifies exact section and paragraphs while decoding rendered entities', () => {
    expect(verifyEditorialHtml(page(), entry)).toEqual([])
    expect(verifyEditorialSitemap(sitemap(), entry)).toEqual([])
  })
  it('does not count transport scripts, styles or comments as a visible section', () => {
    for (const body of [`<script>${section}</script>`, `<style>${section}</style>`, `<!--${section}-->`]) expect(verifyEditorialHtml(page(body), entry)).toContain('editorial-section-count')
  })
  it('rejects duplicate, missing and altered paragraphs rather than matching text elsewhere', () => {
    expect(verifyEditorialHtml(page(section + section), entry)).toContain('editorial-section-count')
    expect(verifyEditorialHtml(page(section.replace("The employer&#x27;s expectations.", 'Changed.')), entry)).toContain('paragraph-mismatch')
    expect(verifyEditorialHtml(page(section.replace('<p>The employer&#x27;s expectations.</p>', '')), entry)).toContain('paragraph-mismatch')
    expect(verifyEditorialHtml(page(section.replace('Role &amp; scope', 'Different heading')), entry)).toContain('heading-mismatch')
  })
  it('rejects unexpected embedded markup and bad canonical, language or indexation', () => {
    expect(verifyEditorialHtml(page(section.replace('clarity', '<span>clarity</span>')), entry)).toContain('unexpected-editorial-markup')
    expect(verifyEditorialHtml(page().replace('lang="en"', 'lang="de"'), entry)).toContain('language-mismatch')
    expect(verifyEditorialHtml(page().replace('content="index, follow"', 'content="noindex, follow"'), entry)).toContain('unexpected-noindex')
    expect(verifyEditorialHtml(page().replace(`href="https://www.bsolution.eu${entry.targetPath}"`, 'href="https://example.org"'), entry)).toContain('canonical-mismatch')
  })
  it('requires the exact sitemap document and a valid, non-regressing content date', () => {
    expect(verifyEditorialSitemap(sitemap('2026-11-12'), entry)).toContain('sitemap-modification-date')
    expect(verifyEditorialSitemap(sitemap('2026-99-99'), entry)).toContain('sitemap-modification-date')
    expect(verifyEditorialSitemap(sitemap('2026-11-14'), entry)).toEqual([])
    expect(verifyEditorialSitemap('<urlset/>', entry)).toContain('sitemap-document-count')
    expect(verifyEditorialSitemap(sitemap().replace('</urlset>', sitemap().replace('<urlset>', '')), entry)).toContain('sitemap-document-count')
  })
})
