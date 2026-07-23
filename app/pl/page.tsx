import { HomepagePL } from '@/components/homepage-pl'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'B Solution | Legal Executive Search | Polska',
  description: 'Zatrudnij Head of Legal lub General Counsel, który naprawdę potrafi zarządzać. Wyspecjalizowana firma executive search dla sektora prawnego w Europie i na Bliskim Wschodzie od 2007 roku.',
  alternates: {
    canonical: 'https://www.bsolution.eu/pl',
    languages: {
      'en': 'https://www.bsolution.eu/',
      'cs': 'https://www.bsolution.eu/cs',
      'de': 'https://www.bsolution.eu/de',
      'pl': 'https://www.bsolution.eu/pl',
      'x-default': 'https://www.bsolution.eu/',
    },
  },
  openGraph: {
    title: 'B Solution | Legal Executive Search | Polska',
    description: 'Wyspecjalizowana firma executive search dla sektora prawnego w Europie i na Bliskim Wschodzie od 2007 roku.',
    locale: 'pl_PL',
    url: 'https://www.bsolution.eu/pl',
    images: [
      {
        url: 'https://www.bsolution.eu/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'B Solution - Executive Search dla liderów prawnych',
      },
    ],
  },
}

export default function PolishPage() {
  return <HomepagePL />
}
