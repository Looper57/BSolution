import { HomepageDE } from '@/components/homepage-de'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: { absolute: 'B Solution | Legal Executive Search | Deutschland' },
  description: 'Mandatierte Legal Executive Search für General Counsel, Head of Legal und juristische Führungskräfte in Europa und im Nahen Osten seit 2007.',
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
    title: 'B Solution | Legal Executive Search | Deutschland',
    description: 'Mandatierte Legal Executive Search für General Counsel, Head of Legal und juristische Führungskräfte in Europa und im Nahen Osten.',
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
