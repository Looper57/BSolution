import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Corporate Legal Recruitment | For Companies',
  description: 'Recruit in-house lawyers and legal leaders across Europe and the Middle East. Define the right hiring brief for your company with B Solution.',
  alternates: {
    canonical: 'https://www.bsolution.eu/for-companies',
  },
  openGraph: {
    type: 'website',
    siteName: 'B Solution',
    title: 'Corporate Legal Recruitment | B Solution',
    description: 'Recruit in-house lawyers and legal leaders across Europe and the Middle East. Define the right hiring brief for your company with B Solution.',
    url: 'https://www.bsolution.eu/for-companies',
    images: [
      {
        url: 'https://www.bsolution.eu/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'B Solution - Legal Executive Search for Companies',
      },
    ],
  },
}

export default function ForCompaniesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
