import completeSitemap from '@/lib/sitemap-entries'

// Do not keep an independent build/ISR snapshot of a changing jobs feed.
// Both full sitemap URLs must read the current collection on each request.
export const dynamic = 'force-dynamic'
export const revalidate = 0
export default completeSitemap
