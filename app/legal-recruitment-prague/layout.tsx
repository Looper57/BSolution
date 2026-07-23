import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Legal Recruitment Prague | B Solution - Czech Republic Legal Headhunter',
  description: 'Legal Executive Search in Prague and the Czech market for law firms and corporate legal departments, supporting senior legal and leadership appointments since 2007.',
  keywords: ['legal recruitment Prague', 'Czech legal headhunter', 'Prague law firm recruitment', 'Czech Republic lawyer jobs', 'General Counsel Prague'],
  alternates: {
    canonical: 'https://www.bsolution.eu/legal-recruitment-prague',
  },
  openGraph: {
    title: 'Legal Recruitment Prague | B Solution',
    description: 'Prague-based Legal Executive Search for corporate legal departments, financial institutions and law firms since 2007.',
    url: 'https://www.bsolution.eu/legal-recruitment-prague',
    images: [{ url: 'https://www.bsolution.eu/images/og-image.jpg', width: 1200, height: 630, alt: 'B Solution - Legal Recruitment Prague' }],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
