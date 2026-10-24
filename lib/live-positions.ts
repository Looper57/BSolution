import { SITE_URL } from '@/lib/i18n/config'

/**
 * Positions published for bsolution.eu in the LawBridge console (roadmap
 * M4, 2026-10-24). PCRecruiter is the record; the LawBridge feed returns
 * only positions published for this site with a publication end in the
 * future, so an empty feed simply shows nothing extra.
 */
export interface LivePosition {
  id: number
  slug: string
  title: string
  city: string
  country: string
  /** Empty unless the employer agreed to be named. */
  employer: string
  description: string
  postedAt: string | null
  validThrough: string
}

const FEED_URL = process.env.LAWBRIDGE_POSITIONS_FEED_URL ?? 'https://www.lawbridge.eu/api/recruitment/positions?site=bsolution'

function slugify(text: string): string {
  return text.toLowerCase().normalize('NFD').replace(/\p{M}/gu, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60)
}

export async function getLivePositions(): Promise<LivePosition[]> {
  try {
    // No local cache: the LawBridge feed is already cached for an hour at
    // its CDN and in front of PCRecruiter. A local data cache kept serving
    // the empty pre-publication feed for hours (2026-10-24).
    const response = await fetch(FEED_URL, { cache: 'no-store' })
    if (!response.ok) return []
    const body = (await response.json()) as { positions?: Omit<LivePosition, 'slug'>[] }
    return (body.positions ?? [])
      .filter((p) => Number.isSafeInteger(p.id) && p.title && new Date(p.validThrough) > new Date())
      .map((p) => ({ ...p, slug: `${p.id}-${slugify(p.title) || 'position'}` }))
  } catch {
    return []
  }
}

export async function getLivePositionBySlug(slug: string): Promise<LivePosition | null> {
  const id = Number(slug.split('-')[0])
  if (!Number.isSafeInteger(id)) return null
  return (await getLivePositions()).find((p) => p.id === id) ?? null
}

export function livePositionPath(position: Pick<LivePosition, 'slug'>): string {
  return `/positions/open/${position.slug}`
}

/** Google JobPosting for a real, open position: the true place of work and
 * the publication end. A recruiter posting names B Solution unless the
 * employer agreed to be named. */
export function jobPostingJsonLd(position: LivePosition) {
  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: position.title,
    description: position.description.split('\n').filter(Boolean).map((line) => `<p>${line.replace(/[<>&]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' })[c] ?? c)}</p>`).join(''),
    datePosted: (position.postedAt ?? new Date().toISOString()).slice(0, 10),
    validThrough: position.validThrough,
    hiringOrganization: position.employer
      ? { '@type': 'Organization', name: position.employer }
      : { '@type': 'Organization', name: 'B Solution', sameAs: SITE_URL },
    jobLocation: { '@type': 'Place', address: { '@type': 'PostalAddress', addressLocality: position.city, addressCountry: position.country } },
    identifier: { '@type': 'PropertyValue', name: 'B Solution', value: String(position.id) },
    directApply: false,
    url: `${SITE_URL}${livePositionPath(position)}`,
  }
}
