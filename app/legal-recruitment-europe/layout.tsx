import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Legal Recruitment Europe | Executive Search',
  description: 'Cross-border legal recruitment for companies and law firms in Europe. Define your in-house counsel, legal leadership, partner or team search with B Solution.',
  keywords: ['legal recruitment Europe', 'European legal headhunter', 'international legal search', 'cross-border legal recruitment'],
  alternates: {
    canonical: 'https://www.bsolution.eu/legal-recruitment-europe',
  },
  openGraph: {
    type: 'website',
    siteName: 'B Solution',
    title: 'Legal Recruitment Across Europe | B Solution',
    description: 'Cross-border legal recruitment for companies and law firms: in-house counsel, General Counsel, partners and teams across European markets.',
    url: 'https://www.bsolution.eu/legal-recruitment-europe',
    images: [{ url: 'https://www.bsolution.eu/images/og-image.jpg', width: 1200, height: 630, alt: 'B Solution - Legal Recruitment Europe' }],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
