import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SITE_URL } from '@/lib/i18n/config'
import { getLivePositionBySlug, jobPostingJsonLd, livePositionPath } from '@/lib/live-positions'
import { OpenPositionDetail } from './open-position-detail'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const position = await getLivePositionBySlug((await params).slug)
  if (!position) return { title: 'Position Not Found', robots: { index: false, follow: true }, alternates: {} }
  const place = [position.city, position.country].filter(Boolean).join(', ')
  const description = position.description.replace(/\s+/g, ' ').slice(0, 155)
  return {
    title: `${position.title} – ${place}`.slice(0, 60),
    description,
    alternates: { canonical: `${SITE_URL}${livePositionPath(position)}` },
    openGraph: { title: position.title, description, url: `${SITE_URL}${livePositionPath(position)}` },
  }
}

/** A position published for bsolution.eu in the LawBridge console. Gone
 * from the feed (closed, paused or expired) means 404 — never a stale ad. */
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
