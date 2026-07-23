import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Current Opportunities',
  description: 'Explore current legal executive positions and career opportunities. General Counsel, CLO, partner, and senior legal roles at law firms and corporations across Europe and the Middle East.',
  alternates: {
    canonical: 'https://www.bsolution.eu/positions',
    languages: {
      en: 'https://www.bsolution.eu/positions',
      cs: 'https://www.bsolution.eu/cs/positions',
      'x-default': 'https://www.bsolution.eu/positions',
    },
  },
  openGraph: {
    title: 'Legal Job Opportunities | B Solution',
    description: 'Current legal executive positions. General Counsel, partner, and senior legal roles at leading organizations.',
    url: 'https://www.bsolution.eu/positions',
    images: [
      {
        url: 'https://www.bsolution.eu/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'B Solution - Legal Job Opportunities',
      },
    ],
  },
}

export default function PositionsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
