import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'International Law Firm Recruitment | Partner & Lateral Search',
  description: 'Partner, counsel and senior associate recruitment for international law firms in Europe. Discuss a confidential lateral hire, succession or team-move brief with B Solution.',
  keywords: ['law firm recruitment', 'lateral partner search', 'legal associate hiring', 'practice group recruitment', 'law firm headhunter'],
  alternates: {
    canonical: 'https://www.bsolution.eu/law-firm-recruitment',
  },
  openGraph: {
    type: 'website',
    siteName: 'B Solution',
    title: 'International Law Firm Recruitment | B Solution',
    description: 'Confidential partner, counsel and senior associate recruitment for law firms across Europe. Discuss a lateral hire, succession or team move.',
    url: 'https://www.bsolution.eu/law-firm-recruitment',
    images: [{ url: 'https://www.bsolution.eu/images/og-image.jpg', width: 1200, height: 630, alt: 'B Solution - Law Firm Recruitment' }],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
