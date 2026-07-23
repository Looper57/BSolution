import { HomepageDE } from '@/components/homepage-de'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'B Solution | Legal Executive Search | Deutschland',
  description: 'Besetzen Sie die Position Head of Legal oder General Counsel mit der richtigen Führungspersönlichkeit. Spezialisierte Executive-Search-Firma für den Rechtssektor in Europa seit 2007.',
  alternates: {
    canonical: 'https://www.bsolution.eu/de',
    languages: {
      'en': 'https://www.bsolution.eu/',
      'cs': 'https://www.bsolution.eu/cs',
      'de': 'https://www.bsolution.eu/de',
      'pl': 'https://www.bsolution.eu/pl',
    },
  },
  openGraph: {
    title: 'B Solution | Legal Executive Search | Deutschland',
    description: 'Spezialisierte Executive-Search-Firma für den Rechtssektor in Europa seit 2007. Vermeiden Sie kostspielige Fehlbesetzungen.',
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
