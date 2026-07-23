import type { Metadata } from 'next'
import { buildAlternates } from '@/lib/i18n/config'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with B Solution for confidential legal recruitment discussions. Based in Prague, serving clients across Europe and the Middle East.',
  alternates: buildAlternates('en', '/contact'),
  openGraph: {
    title: 'Contact B Solution | Legal Executive Search',
    description: 'Schedule a confidential discussion about your legal recruitment needs. All enquiries handled with strict confidentiality.',
    url: 'https://www.bsolution.eu/contact',
    images: [
      {
        url: 'https://www.bsolution.eu/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact B Solution - Legal Executive Search',
      },
    ],
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
