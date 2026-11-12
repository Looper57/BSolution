import { getEmployerSitemapEntries } from '@/lib/sitemap-entries'

export const dynamic = 'force-static'

function xml(value: string) {
  return value.replace(/[<>&"']/g, character => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' })[character]!)
}

/** Stable employer discovery and separate Search Console reporting. This
 * uses the same publication gates and canonical inventory as sitemap.xml;
 * generating it never waits for the live jobs or candidate feeds. */
export function GET() {
  const entries = getEmployerSitemapEntries().map(entry => {
    const alternatives = Object.entries(entry.alternates?.languages ?? {}).map(([locale, href]) =>
      `<xhtml:link rel="alternate" hreflang="${xml(locale)}" href="${xml(String(href))}"/>`,
    ).join('')
    return `<url><loc>${xml(entry.url)}</loc>${alternatives}</url>`
  }).join('\n')
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${entries}\n</urlset>`, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  })
}
