import { Homepage } from '@/components/homepage'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: { absolute: 'International Legal Recruitment | B Solution' },
  description: 'Legal recruitment and retained executive search for law firms and in-house teams across Europe and the Middle East. Discuss your hiring brief with B Solution.',
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
    siteName: 'B Solution',
    title: 'International Legal Recruitment | B Solution',
    description: 'Legal recruitment and retained executive search for law firms and in-house teams across Europe and the Middle East. Discuss your hiring brief with B Solution.',
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
