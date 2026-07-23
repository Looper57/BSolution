import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'For Companies | Legal Executive Search',
  description: 'Partner with B Solution to hire senior legal leaders. We help corporations and law firms find General Counsel, Head of Legal, and CLO candidates across Europe.',
  alternates: {
    canonical: 'https://www.bsolution.eu/for-companies',
  },
  openGraph: {
    title: 'Legal Executive Search for Companies | B Solution',
    description: 'Hire senior legal leaders with B Solution. Trusted partner for General Counsel and Head of Legal recruitment since 2007.',
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
