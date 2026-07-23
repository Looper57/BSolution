import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Legal Recruitment Europe | B Solution Executive Search',
  description: 'Specialist legal recruitment across Europe. Executive search for General Counsel, in-house lawyers, and law firm partners in Czech Republic, Germany, Austria, Poland, UK, and Middle East.',
  keywords: ['legal recruitment Europe', 'European legal headhunter', 'international legal search', 'cross-border legal recruitment'],
  alternates: {
    canonical: 'https://www.bsolution.eu/legal-recruitment-europe',
  },
  openGraph: {
    title: 'Legal Recruitment Across Europe | B Solution',
    description: 'Specialist legal executive search serving corporations and law firms throughout Europe since 2007.',
    url: 'https://www.bsolution.eu/legal-recruitment-europe',
    images: [{ url: 'https://www.bsolution.eu/images/og-image.jpg', width: 1200, height: 630, alt: 'B Solution - Legal Recruitment Europe' }],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
