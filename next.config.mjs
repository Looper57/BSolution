/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  async redirects() {
    return [
      {
        source: '/legal-executive-search',
        destination: '/services/legal-executive-search',
        permanent: true,
      },
      {
        source: '/for-clients',
        has: [{ type: 'query', key: 'lang', value: 'sk' }],
        destination: '/clients',
        statusCode: 301,
      },
      {
        source: '/for-clients',
        has: [{ type: 'query', key: 'lang', value: 'ar' }],
        destination: '/clients',
        statusCode: 301,
      },
      {
        source: '/for-candidates',
        has: [{ type: 'query', key: 'lang', value: 'ar' }],
        destination: '/candidates',
        statusCode: 301,
      },
      {
        source: '/our-services',
        has: [{ type: 'query', key: 'lang', value: 'sk' }],
        destination: '/services',
        statusCode: 301,
      },
      {
        source: '/our-story',
        has: [{ type: 'query', key: 'lang', value: 'ar' }],
        destination: '/about',
        statusCode: 301,
      },
      {
        source: '/our-story',
        has: [{ type: 'query', key: 'lang', value: 'sk' }],
        destination: '/about',
        statusCode: 301,
      },
      {
        source: '/our-story',
        destination: '/about',
        statusCode: 301,
      },
      // Force the canonical host: redirect the apex domain (bsolution.eu)
      // to the www subdomain with a permanent 301.
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'bsolution.eu' }],
        destination: 'https://www.bsolution.eu/:path*',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
