import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'For Clients',
  description: 'Partner with B Solution for your legal recruitment needs. We serve corporations seeking in-house counsel and law firms looking for partners and associates across Europe and the Middle East.',
  alternates: {
    canonical: 'https://www.bsolution.eu/clients',
  },
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
