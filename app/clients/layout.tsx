import type { Metadata } from 'next'
import { buildAlternates } from '@/lib/i18n/config'

export const metadata: Metadata = {
  title: 'For Clients',
  description: 'Partner with B Solution for legal recruitment. We serve corporations seeking in-house counsel and law firms seeking partners and associates across Europe.',
  alternates: buildAlternates('en', '/clients'),
  openGraph: {
    title: 'Legal Recruitment for Clients | B Solution',
    description: 'Executive search and recruitment services for corporations and law firms. General Counsel, CLO, partners, and senior legal appointments.',
    url: 'https://www.bsolution.eu/clients',
    images: [
      {
        url: 'https://www.bsolution.eu/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'B Solution - Legal Recruitment for Clients',
      },
    ],
  },
}

export default function ClientsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
