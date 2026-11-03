import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'B Solution privacy policy. Learn how we collect, use, and protect your personal data in compliance with data protection regulations.',
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://www.bsolution.eu/privacy',
    languages: {
      en: 'https://www.bsolution.eu/privacy',
      cs: 'https://www.bsolution.eu/cs/privacy',
      'x-default': 'https://www.bsolution.eu/privacy',
    },
  },
  openGraph: {
    type: 'website',
    siteName: 'B Solution',
    images: [{ url: 'https://www.bsolution.eu/images/og-image.jpg', width: 1200, height: 630, alt: 'B Solution - Legal Executive Search' }],
    title: 'Privacy Policy | B Solution',
    description: 'Learn how we collect, use, and protect your personal data.',
    url: 'https://www.bsolution.eu/privacy',
    locale: 'en_GB',
  },
}

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
