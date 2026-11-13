import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Legal Recruitment Dubai | UAE Executive Search',
  description: 'Recruit in-house lawyers, legal leaders and law firm partners in Dubai and the UAE. Define local and regional responsibilities with B Solution.',
  keywords: ['legal recruitment Dubai', 'UAE legal headhunter', 'in-house legal recruitment UAE', 'law firm partner recruitment Dubai', 'regional General Counsel search'],
  alternates: {
    canonical: 'https://www.bsolution.eu/legal-recruitment-dubai',
  },
  openGraph: {
    type: 'website',
    siteName: 'B Solution',
    title: 'Legal Recruitment Dubai & UAE | B Solution',
    description: 'Recruit in-house lawyers and law firm partners in Dubai and the UAE. Define the workplace, regional remit and search brief with B Solution.',
    url: 'https://www.bsolution.eu/legal-recruitment-dubai',
    images: [{ url: 'https://www.bsolution.eu/images/og-image.jpg', width: 1200, height: 630, alt: 'B Solution - Legal Recruitment Dubai' }],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
