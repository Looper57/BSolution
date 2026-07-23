import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Legal Executive Search | B Solution - General Counsel & CLO Recruitment',
  description: 'Retained legal executive search for General Counsel, Chief Legal Officer, and senior legal leadership. Proven methodology for C-suite legal appointments across Europe.',
  keywords: ['legal executive search', 'General Counsel recruitment', 'CLO search', 'Chief Legal Officer headhunter', 'senior legal recruitment'],
  alternates: {
    canonical: 'https://www.bsolution.eu/legal-executive-search',
  },
  openGraph: {
    title: 'Legal Executive Search | B Solution',
    description: 'Retained executive search for General Counsel, Chief Legal Officers, and senior legal leadership positions.',
    url: 'https://www.bsolution.eu/legal-executive-search',
    images: [{ url: 'https://www.bsolution.eu/images/og-image.jpg', width: 1200, height: 630, alt: 'B Solution - Legal Executive Search' }],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
