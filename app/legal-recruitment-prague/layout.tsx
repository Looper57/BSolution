import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Legal Recruitment Prague | B Solution - Czech Republic Legal Headhunter',
  description: 'Leading legal recruitment consultancy in Prague and Czech Republic. General Counsel, in-house lawyers, and law firm recruitment with 17 years local market expertise.',
  keywords: ['legal recruitment Prague', 'Czech legal headhunter', 'Prague law firm recruitment', 'Czech Republic lawyer jobs', 'General Counsel Prague'],
  alternates: {
    canonical: 'https://www.bsolution.eu/legal-recruitment-prague',
  },
  openGraph: {
    title: 'Legal Recruitment Prague | B Solution',
    description: 'The leading legal recruitment consultancy in Prague and the Czech Republic since 2007.',
    url: 'https://www.bsolution.eu/legal-recruitment-prague',
    images: [{ url: 'https://www.bsolution.eu/images/og-image.jpg', width: 1200, height: 630, alt: 'B Solution - Legal Recruitment Prague' }],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
