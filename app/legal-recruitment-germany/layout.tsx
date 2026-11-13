import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Legal Recruitment Germany | In-House & Law Firms',
  description: 'Hire General Counsel, Head of Legal, in-house lawyers and law firm partners in Germany. Define your recruitment brief with B Solution.',
  keywords: ['legal recruitment Germany', 'General Counsel recruitment Germany', 'Head of Legal search Germany', 'law firm recruitment Germany'],
  alternates: {
    canonical: 'https://www.bsolution.eu/legal-recruitment-germany',
  },
  openGraph: {
    type: 'website',
    siteName: 'B Solution',
    title: 'Legal Recruitment Germany | B Solution',
    description: 'Recruit in-house lawyers, legal leaders and law firm partners in Germany. Discuss the location, responsibilities and search brief with B Solution.',
    url: 'https://www.bsolution.eu/legal-recruitment-germany',
    images: [{ url: 'https://www.bsolution.eu/images/og-image.jpg', width: 1200, height: 630, alt: 'B Solution - Legal Recruitment Germany' }],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
