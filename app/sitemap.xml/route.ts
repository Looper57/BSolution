import completeSitemap from '@/lib/sitemap-entries'
import { sitemapXml } from '@/lib/sitemap-xml'

// Use an explicit XML handler, like the submitted full sitemap. The hosting
// adapter must not package this changing endpoint as a metadata-file asset.
export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  return new Response(sitemapXml(await completeSitemap()), {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  })
}
