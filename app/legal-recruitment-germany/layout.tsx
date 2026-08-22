import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Legal Recruitment Germany | Syndikusanwalt',
  description: 'Legal recruitment in Germany. Executive search for General Counsel, Syndikusanwalt, and senior legal professionals in Frankfurt, Munich and Berlin.',
  keywords: ['legal recruitment Germany', 'Syndikusanwalt recruitment', 'German legal headhunter', 'Frankfurt legal jobs', 'Munich lawyer recruitment'],
  alternates: {
    canonical: 'https://www.bsolution.eu/legal-recruitment-germany',
  },
  openGraph: {
    title: 'Legal Recruitment Germany | B Solution',
    description: 'Executive search for General Counsel, Syndikusanwalt, and senior legal professionals across Germany.',
    url: 'https://www.bsolution.eu/legal-recruitment-germany',
    images: [{ url: 'https://www.bsolution.eu/images/og-image.jpg', width: 1200, height: 630, alt: 'B Solution - Legal Recruitment Germany' }],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
