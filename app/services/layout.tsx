import type { Metadata } from 'next'
import { buildAlternates } from '@/lib/i18n/config'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Legal executive search, retained recruitment, market intelligence, and strategic advisory services. Comprehensive legal talent solutions for law firms and corporations.',
  alternates: buildAlternates('en', '/services'),
  openGraph: {
    title: 'Legal Recruitment Services | B Solution',
    description: 'Executive search, retained recruitment, market intelligence, and strategic advisory for legal professionals and organizations.',
    url: 'https://www.bsolution.eu/services',
    images: [
      {
        url: 'https://www.bsolution.eu/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'B Solution - Legal Recruitment Services',
      },
    ],
  },
}

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
