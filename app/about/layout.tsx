import type { Metadata } from 'next'
import { buildAlternates } from '@/lib/i18n/config'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'B Solution is a boutique Legal Executive Search firm serving law firms and corporate legal departments across Europe and the Middle East since 2007.',
  alternates: buildAlternates('en', '/about'),
  openGraph: {
    title: 'About B Solution | Legal Executive Search',
    description: 'Boutique Legal Executive Search firm supporting General Counsel, CLO and senior legal appointments since 2007.',
    url: 'https://www.bsolution.eu/about',
    images: [
      {
        url: 'https://www.bsolution.eu/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'About B Solution - Legal Executive Search',
      },
    ],
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
