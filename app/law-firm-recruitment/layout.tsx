import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Law Firm Recruitment | B Solution - Partner & Associate Search',
  description: 'Specialist Executive Search for law firms across Europe, including partner recruitment, practice development, team moves and succession appointments.',
  keywords: ['law firm recruitment', 'lateral partner search', 'legal associate hiring', 'practice group recruitment', 'law firm headhunter'],
  alternates: {
    canonical: 'https://www.bsolution.eu/law-firm-recruitment',
  },
  openGraph: {
    title: 'Law Firm Recruitment | B Solution',
    description: 'Lateral partner recruitment, practice group development, and strategic talent acquisition for law firms across Europe.',
    url: 'https://www.bsolution.eu/law-firm-recruitment',
    images: [{ url: 'https://www.bsolution.eu/images/og-image.jpg', width: 1200, height: 630, alt: 'B Solution - Law Firm Recruitment' }],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
