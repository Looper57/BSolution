import type { Metadata } from 'next'
import { PositionsPageContent } from './positions-client'

// This listing's own canonical/hreflang/OpenGraph must live here, not in
// layout.tsx (which also wraps /positions/[slug]) — a layout-level
// `alternates` is inherited by that route's not-found boundary too, so an
// unknown job slug's 404 page was rendering this listing's canonical and
// full hreflang cluster as if the 404 URL were a real member of it
// (2026-08-22 Ahrefs audit).
export const metadata: Metadata = {
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

export default function Page() {
  return <PositionsPageContent />
}
