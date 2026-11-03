import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'B Solution cookie policy: which cookies and similar technologies the bsolution.eu website uses, what they are for and how long they are kept.',
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://www.bsolution.eu/cookies',
    languages: {
      en: 'https://www.bsolution.eu/cookies',
      cs: 'https://www.bsolution.eu/cs/cookies',
      'x-default': 'https://www.bsolution.eu/cookies',
    },
  },
  openGraph: {
    type: 'website',
    siteName: 'B Solution',
    images: [{ url: 'https://www.bsolution.eu/images/og-image.jpg', width: 1200, height: 630, alt: 'B Solution - Legal Executive Search' }],
    title: 'Cookie Policy | B Solution',
    description: 'Learn how we use cookies and similar technologies on our website.',
    url: 'https://www.bsolution.eu/cookies',
    locale: 'en_GB',
  },
}

export default function CookiesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
