import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Law Firm Recruitment | B Solution - Partner & Associate Search',
  description: 'Specialist law firm recruitment. Lateral partner search, practice group development, and associate hiring for law firms across Europe. Magic Circle to boutique.',
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
