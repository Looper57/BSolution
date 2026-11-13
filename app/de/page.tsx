import { HomepageDE } from '@/components/homepage-de'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: { absolute: 'Juristische Personalberatung & Executive Search | B Solution' },
  description: 'General Counsel, Head of Legal und Partner für Unternehmen und Kanzleien finden. Vertrauliche juristische Personalsuche in Europa mit B Solution.',
  alternates: {
    canonical: 'https://www.bsolution.eu/de',
    languages: {
      'en': 'https://www.bsolution.eu/',
      'cs': 'https://www.bsolution.eu/cs',
      'de': 'https://www.bsolution.eu/de',
      'pl': 'https://www.bsolution.eu/pl',
      'x-default': 'https://www.bsolution.eu/',
    },
  },
  openGraph: {
    type: 'website',
    siteName: 'B Solution',
    title: 'Juristische Personalberatung & Executive Search | B Solution',
    description: 'Vertrauliche juristische Personalsuche für General Counsel, Head of Legal und Kanzleipartner in Europa.',
    locale: 'de_DE',
    url: 'https://www.bsolution.eu/de',
    images: [
      {
        url: 'https://www.bsolution.eu/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'B Solution - Executive Search für juristische Führungskräfte',
      },
    ],
  },
}

export default function GermanPage() {
  return <HomepageDE />
}
