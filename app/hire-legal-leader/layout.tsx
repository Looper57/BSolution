import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Confidential General Counsel & Head of Legal Search',
  description: 'Hire a General Counsel or Head of Legal across Europe. Define a confidential replacement, succession plan or new leadership mandate with B Solution.',
  alternates: {
    canonical: 'https://www.bsolution.eu/hire-legal-leader',
  },
  openGraph: {
    type: 'website',
    siteName: 'B Solution',
    title: 'Confidential General Counsel & Head of Legal Search | B Solution',
    description: 'Confidential search for General Counsel and Head of Legal appointments, including replacement, succession and new leadership mandates.',
    url: 'https://www.bsolution.eu/hire-legal-leader',
    images: [
      {
        url: 'https://www.bsolution.eu/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'B Solution - Hire a Legal Leader',
      },
    ],
  },
}

export default function HireLegalLeaderLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
