import type { Metadata } from 'next'
import { buildAlternates } from '@/lib/i18n/config'

export const metadata: Metadata = {
  title: 'For Candidates',
  description: 'Explore confidential legal career opportunities with B Solution. We connect legal professionals with senior roles at law firms and corporations.',
  alternates: buildAlternates('en', '/candidates'),
  openGraph: {
    title: 'Legal Career Opportunities | B Solution',
    description: 'Confidential legal career opportunities. General Counsel, partner, and senior legal roles at leading law firms and corporations.',
    url: 'https://www.bsolution.eu/candidates',
    images: [
      {
        url: 'https://www.bsolution.eu/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'B Solution - Legal Career Opportunities',
      },
    ],
  },
}

export default function CandidatesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
