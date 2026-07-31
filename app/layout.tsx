import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { headers } from 'next/headers'
import { globalStructuredData, serializeJsonLd } from '@/lib/structured-data'
import './globals.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0F1B2D',
}

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
  adjustFontFallback: true,
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-playfair',
  display: 'swap',
  preload: true,
  fallback: ['Georgia', 'serif'],
  adjustFontFallback: true,
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.bsolution.eu'),
  title: {
    default: 'B Solution | Legal Executive Search',
    template: '%s | B Solution'
  },
  description: 'Specialist legal executive search for corporations and law firms across Europe and the Middle East. Trusted advisers on General Counsel, Chief Legal Officer and senior legal appointments since 2007.',
  keywords: ['legal executive search', 'General Counsel recruitment', 'CLO search', 'legal headhunting', 'law firm partner recruitment', 'in-house legal recruitment', 'legal jobs Europe', 'Prague legal recruitment'],
  authors: [{ name: 'B Solution s.r.o.' }],
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    shortcut: '/favicon.ico',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: 'B Solution | Legal Executive Search',
    description: 'Specialist legal executive search for corporations and law firms across Europe and the Middle East, trusted since 2007.',
    type: 'website',
    locale: 'en_GB',
    siteName: 'B Solution',
    url: 'https://www.bsolution.eu',
    images: [
      {
        url: 'https://www.bsolution.eu/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'B Solution - Legal Executive Search',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'B Solution | Legal Executive Search',
    description: 'Specialist legal executive search for corporations and law firms across Europe and the Middle East.',
    images: ['https://www.bsolution.eu/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: 'oq1pfmKL5cmAL8YGuIgixsfqIRuCdQj7yBzThDs_O8o',
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = (await headers()).get('x-bsolution-pathname') ?? '/'
  const routeLocale = pathname.split('/')[1]
  const lang = routeLocale === 'cs' || routeLocale === 'de' || routeLocale === 'pl' ? routeLocale : 'en'

  return (
    <html lang={lang} className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(globalStructuredData) }}
        />
      </head>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
