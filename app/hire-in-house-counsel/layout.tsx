import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hire In-House Counsel | Legal Recruitment',
  description: 'Specialist search for corporate legal teams, from in-house counsel and Legal Directors to General Counsel appointments across Europe.',
  keywords: ['in-house counsel recruitment', 'corporate legal hiring', 'General Counsel search', 'Legal Director recruitment', 'in-house lawyer'],
  alternates: {
    canonical: 'https://www.bsolution.eu/hire-in-house-counsel',
  },
  openGraph: {
    title: 'Hire In-House Counsel | B Solution',
    description: 'Specialist search for in-house counsel, Legal Directors and General Counsel across Europe.',
    url: 'https://www.bsolution.eu/hire-in-house-counsel',
    images: [{ url: 'https://www.bsolution.eu/images/og-image.jpg', width: 1200, height: 630, alt: 'B Solution - In-House Counsel Recruitment' }],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
