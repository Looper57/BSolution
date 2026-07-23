import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Legal Recruitment Dubai | B Solution - UAE Legal Executive Search',
  description: 'Legal recruitment in Dubai, Abu Dhabi, and UAE. Executive search for General Counsel, Regional Legal Directors, and law firm partners in the Middle East.',
  keywords: ['legal recruitment Dubai', 'UAE legal headhunter', 'DIFC lawyer recruitment', 'Abu Dhabi legal jobs', 'Middle East legal search'],
  alternates: {
    canonical: 'https://www.bsolution.eu/legal-recruitment-dubai',
  },
  openGraph: {
    title: 'Legal Recruitment Dubai & UAE | B Solution',
    description: 'Executive search for legal professionals in Dubai, Abu Dhabi, and across the UAE and Middle East.',
    url: 'https://www.bsolution.eu/legal-recruitment-dubai',
    images: [{ url: 'https://www.bsolution.eu/images/og-image.jpg', width: 1200, height: 630, alt: 'B Solution - Legal Recruitment Dubai' }],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
