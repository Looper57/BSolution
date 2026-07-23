import { HomepageCS } from '@/components/homepage-cs'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'B Solution | Legal Executive Search | Najděte právního lídra',
  description: 'Vyhledejte Head of Legal nebo General Counsel, který skutečně vede. Specializovaná firma pro executive search v právním sektoru působící v Evropě a na Blízkém východě od roku 2007.',
  alternates: {
    canonical: 'https://www.bsolution.eu/cs',
    languages: {
      'en': 'https://www.bsolution.eu/',
      'cs': 'https://www.bsolution.eu/cs',
      'de': 'https://www.bsolution.eu/de',
      'pl': 'https://www.bsolution.eu/pl',
      'x-default': 'https://www.bsolution.eu/',
    },
  },
  openGraph: {
    title: 'B Solution | Legal Executive Search | Najděte právního lídra',
    description: 'Vyhledejte Head of Legal nebo General Counsel, který skutečně vede. Specializovaná firma pro executive search v právním sektoru.',
    locale: 'cs_CZ',
    url: 'https://www.bsolution.eu/cs',
    images: [
      {
        url: 'https://www.bsolution.eu/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'B Solution - Executive Search pro právní lídry',
      },
    ],
  },
}

export default function CzechPage() {
  return <HomepageCS />
}
