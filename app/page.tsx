import { Homepage } from '@/components/homepage'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: { absolute: 'B Solution | Legal Executive Search' },
  description: 'Retained legal executive search for General Counsel, legal leaders and law-firm partners across Europe and the Middle East since 2007.',
  keywords: ['legal executive search', 'General Counsel recruitment', 'CLO search', 'Head of Legal hiring', 'law firm partner recruitment'],
  alternates: {
    canonical: 'https://www.bsolution.eu/',
    languages: {
      'en': 'https://www.bsolution.eu/',
      'cs': 'https://www.bsolution.eu/cs',
      'de': 'https://www.bsolution.eu/de',
      'pl': 'https://www.bsolution.eu/pl',
      'x-default': 'https://www.bsolution.eu/',
    },
  },
  openGraph: {
    title: 'B Solution | Executive Search for Legal Leaders',
    description: 'Retained legal executive search for General Counsel, legal leaders and law-firm partners across Europe and the Middle East since 2007.',
    url: 'https://www.bsolution.eu/',
    type: 'website',
    images: [
      {
        url: 'https://www.bsolution.eu/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'B Solution - Executive Search for Legal Leaders',
      },
    ],
  },
}

export default function Page() {
  return <Homepage lang="en" />
}
