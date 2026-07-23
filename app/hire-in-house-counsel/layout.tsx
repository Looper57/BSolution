import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hire In-House Counsel | B Solution - Corporate Legal Recruitment',
  description: 'Specialist in-house counsel recruitment. Build your corporate legal team with exceptional General Counsel, Legal Directors, and in-house lawyers across Europe.',
  keywords: ['in-house counsel recruitment', 'corporate legal hiring', 'General Counsel search', 'Legal Director recruitment', 'in-house lawyer'],
  alternates: {
    canonical: 'https://www.bsolution.eu/hire-in-house-counsel',
  },
  openGraph: {
    title: 'Hire In-House Counsel | B Solution',
    description: 'Build your corporate legal team with exceptional in-house counsel who combine commercial acumen with legal expertise.',
    url: 'https://www.bsolution.eu/hire-in-house-counsel',
    images: [{ url: 'https://www.bsolution.eu/images/og-image.jpg', width: 1200, height: 630, alt: 'B Solution - In-House Counsel Recruitment' }],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
