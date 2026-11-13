import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SITE_URL } from '@/lib/i18n/config'
import { getLivePositionBySlug, jobPostingJsonLd, livePositionPath } from '@/lib/live-positions'
import { OpenPositionDetail } from './open-position-detail'

// Keep expiry checks at request time without forcing every feed read
// past the shared data cache (as force-dynamic would).
export const revalidate = 0

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const position = await getLivePositionBySlug((await params).slug)
  if (!position) return { title: 'Position Not Found', robots: { index: false, follow: true }, alternates: {} }
  const place = [position.city, position.country].filter(Boolean).join(', ')
  const description = position.description.replace(/\s+/g, ' ').slice(0, 155)
  return {
    title: `${position.title} – ${place}`.slice(0, 60),
    description,
    alternates: { canonical: `${SITE_URL}${livePositionPath(position)}` },
    openGraph: { title: position.title, description, url: `${SITE_URL}${livePositionPath(position)}`, siteName: 'B Solution', type: 'website', images: [{ url: `${SITE_URL}/images/og-image.jpg`, width: 1200, height: 630, alt: position.title }] },
  }
}

/** A position published for bsolution.eu in the LawBridge console. Gone
 * from a successful feed (closed/paused), or expired, means 404.
 * An unavailable feed throws instead of claiming that the position is gone. */
export default async function OpenPositionPage({ params }: { params: Promise<{ slug: string }> }) {
  const position = await getLivePositionBySlug((await params).slug)
  if (!position) notFound()
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingJsonLd(position)).replace(/</g, '\\u003c') }} />
      <OpenPositionDetail position={position} />
    </>
  )
}
