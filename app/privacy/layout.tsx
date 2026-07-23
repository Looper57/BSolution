import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'B Solution privacy policy. Learn how we collect, use, and protect your personal data in compliance with data protection regulations.',
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://www.bsolution.eu/privacy',
  },
  openGraph: {
    title: 'Privacy Policy | B Solution',
    description: 'Learn how we collect, use, and protect your personal data.',
    url: 'https://www.bsolution.eu/privacy',
  },
}

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
