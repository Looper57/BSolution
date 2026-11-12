import type { MetadataRoute } from 'next'
import { sitemapDate } from '@/lib/sitemap-date'

function xml(value: string) {
  return value.replace(/[<>&"']/g, character => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' })[character]!)
}

/** Shared XML envelope for the independently reportable public sitemaps.
 * URL selection and publication checks remain in sitemap-entries. */
export function sitemapXml(entries: MetadataRoute.Sitemap): string {
  const urls = entries.map(entry => {
    const alternatives = Object.entries(entry.alternates?.languages ?? {}).map(([locale, href]) =>
      `<xhtml:link rel="alternate" hreflang="${xml(locale)}" href="${xml(String(href))}"/>`,
    ).join('')
    const value = entry.lastModified
    const date = sitemapDate(value instanceof Date ? Number.isFinite(value.getTime()) ? value.toISOString() : undefined : value)
    return `<url><loc>${xml(entry.url)}</loc>${date ? `<lastmod>${date}</lastmod>` : ''}${alternatives}</url>`
  }).join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>`
}
