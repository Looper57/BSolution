import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'B Solution is a boutique legal executive search firm with 17+ years of experience serving law firms and corporations across Europe and the Middle East. Learn about our values, approach, and commitment to excellence.',
  alternates: {
    canonical: 'https://www.bsolution.eu/about',
  },
  openGraph: {
    title: 'About B Solution | Legal Executive Search',
    description: 'Boutique legal recruitment firm with 17+ years of experience. Trusted partner for General Counsel, CLO, and senior legal appointments.',
    url: 'https://www.bsolution.eu/about',
    images: [
      {
        url: 'https://www.bsolution.eu/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'About B Solution - Legal Executive Search',
      },
    ],
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
