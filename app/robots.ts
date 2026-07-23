import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    },
    sitemap: 'https://www.bsolution.eu/sitemap.xml',
    host: 'https://www.bsolution.eu',
  }
}
