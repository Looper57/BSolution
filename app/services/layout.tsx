import type { Metadata } from 'next'
import { buildAlternates } from '@/lib/i18n/config'
import { hubRouteMetadata } from '@/lib/i18n/route-metadata'

const serviceMetadata = hubRouteMetadata.en.services

export const metadata: Metadata = {
  title: serviceMetadata.title,
  description: serviceMetadata.description,
  alternates: buildAlternates('en', '/services'),
  openGraph: {
    type: 'website',
    siteName: 'B Solution',
    title: `${serviceMetadata.title} | B Solution`,
    description: serviceMetadata.description,
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
