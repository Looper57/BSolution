import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'In-House Legal Recruitment | Hire Corporate Lawyers',
  description: 'Recruit in-house counsel, Senior Legal Counsel and legal leaders for your company in Europe. Define your first legal hire or cross-border team brief with B Solution.',
  keywords: ['in-house counsel recruitment', 'corporate legal hiring', 'General Counsel search', 'Legal Director recruitment', 'in-house lawyer'],
  alternates: {
    canonical: 'https://www.bsolution.eu/hire-in-house-counsel',
  },
  openGraph: {
    type: 'website',
    siteName: 'B Solution',
    title: 'In-House Legal Recruitment for Companies | B Solution',
    description: 'Specialist search for corporate lawyers and legal leaders across Europe, from a first in-house counsel appointment to a cross-border legal team.',
    url: 'https://www.bsolution.eu/hire-in-house-counsel',
    images: [{ url: 'https://www.bsolution.eu/images/og-image.jpg', width: 1200, height: 630, alt: 'B Solution - In-House Counsel Recruitment' }],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
