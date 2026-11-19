import completeSitemap from '@/lib/sitemap-entries'
import { sitemapXml } from '@/lib/sitemap-xml'

export const dynamic = 'force-dynamic'
export const revalidate = 0

/** Complete canonical inventory at a fresh, independently submitted URL.
 * The original sitemap.xml remains available with the same inventory. */
export async function GET() {
  return new Response(sitemapXml(await completeSitemap()), {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  })
}
