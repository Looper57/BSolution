import { getEmployerSitemapEntries } from '@/lib/sitemap-entries'
import { sitemapXml } from '@/lib/sitemap-xml'

export const dynamic = 'force-static'

/** Stable employer discovery and separate Search Console reporting. This
 * uses the same publication gates and canonical inventory as sitemap.xml;
 * generating it never waits for the live jobs or candidate feeds. */
export function GET() {
  return new Response(sitemapXml(getEmployerSitemapEntries()), {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  })
}
