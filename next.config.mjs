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
      // Legacy site paths (2026-10-25: 8 URLs reported as 404 in Search
      // Console, some with ?lang=sk|ar). Every variant goes to the new page.
      {
        source: '/for-clients',
        destination: '/clients',
        statusCode: 301,
      },
      {
        source: '/for-candidates',
        destination: '/candidates',
        statusCode: 301,
      },
      {
        source: '/our-services',
        destination: '/services',
        statusCode: 301,
      },
      {
        source: '/our-story',
        destination: '/about',
        statusCode: 301,
      },
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
