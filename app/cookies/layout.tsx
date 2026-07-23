import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'B Solution cookie policy. Learn how we use cookies and similar technologies on our website.',
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
