import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hire a Legal Leader | Executive Search',
  description: 'Find your next General Counsel, Head of Legal, or CLO with B Solution. Specialist legal executive search firm serving corporations across Europe.',
  alternates: {
    canonical: 'https://www.bsolution.eu/hire-legal-leader',
  },
  openGraph: {
    title: 'Hire a Legal Leader | B Solution',
    description: 'Specialist executive search for General Counsel, Head of Legal, and senior legal leadership positions.',
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
