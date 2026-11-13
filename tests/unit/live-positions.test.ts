import { afterEach, describe, expect, it, vi } from 'vitest'
import { getLivePositionBySlug, getLivePositions, jobPostingJsonLd, livePositionPath } from '@/lib/live-positions'

const future = new Date(Date.now() + 30 * 86_400_000).toISOString()
const past = new Date(Date.now() - 86_400_000).toISOString()
const feed = (positions: unknown[]) => vi.fn(async () => new Response(JSON.stringify({ positions }), { status: 200 }))

afterEach(() => { vi.unstubAllGlobals(); vi.useRealTimers() })

describe('open positions from the LawBridge console (M4, 2026-10-24)', () => {
  it('shows only positions still open, each with a stable slug', async () => {
    vi.stubGlobal('fetch', feed([
      { id: 501, title: 'Senior Associate – M&A', city: 'Praha', country: 'Czech Republic', employer: '', description: 'A role.', postedAt: '2026-10-24T00:00:00Z', validThrough: future },
      { id: 502, title: 'Expired', city: 'Brno', country: 'Czech Republic', employer: '', description: 'Old.', postedAt: null, validThrough: past },
    ]))
    const positions = await getLivePositions()
    expect(positions.map((p) => p.id)).toEqual([501])
    expect(livePositionPath(positions[0])).toBe('/positions/open/501-senior-associate-m-a')
    expect((await getLivePositionBySlug('501-anything'))?.id).toBe(501)
    expect(await getLivePositionBySlug('999-missing')).toBeNull()
  })

  it('shows nothing (and never fails the page) when the feed is down', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => { throw new Error('offline') }))
    expect(await getLivePositions()).toEqual([])
  })

  it.each(['offline', 'http', 'malformed'])('does not turn an unavailable %s feed into a missing job or empty sitemap', async failure => {
    vi.stubGlobal('fetch', vi.fn(async () => {
      if (failure === 'offline') throw new Error('private upstream details')
      return failure === 'http' ? new Response('', { status: 503 }) : new Response('{"unrelated":[]}', { status: 200 })
    }))
    await expect(getLivePositionBySlug('501-role')).rejects.toThrow('Published positions temporarily unavailable')
    await expect(getLivePositions({ required: true })).rejects.toThrow('Published positions temporarily unavailable')
    expect(await getLivePositions()).toEqual([])
  })

  it('treats a successful empty publication list as actual absence', async () => {
    vi.stubGlobal('fetch', feed([]))
    expect(await getLivePositions({ required: true })).toEqual([])
    expect(await getLivePositionBySlug('501-role')).toBeNull()
  })

  it('rechecks expiry at read time even when the cached feed still contains the position', async () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-11-13T10:00:00Z'))
    const request = feed([{ id: 501, title: 'Legal Counsel', validThrough: '2026-11-13T10:01:00Z' }])
    vi.stubGlobal('fetch', request)
    expect((await getLivePositionBySlug('501-role'))?.id).toBe(501)
    vi.setSystemTime(new Date('2026-11-13T10:01:00Z'))
    expect(await getLivePositionBySlug('501-role')).toBeNull()
    expect(await getLivePositions({ required: true })).toEqual([])
  })

  it('builds a JobPosting with the real place of work, the end date and a confidential employer', () => {
    const json = jobPostingJsonLd({ id: 7, slug: '7-x', title: 'Koncipient', city: 'Brno', country: 'Czech Republic', employer: '', description: 'Line 1\nLine <2>', postedAt: '2026-10-24T08:00:00Z', validThrough: future })
    expect(json['@type']).toBe('JobPosting')
    expect(json.jobLocation.address).toEqual({ '@type': 'PostalAddress', addressLocality: 'Brno', addressCountry: 'Czech Republic' })
    expect(json.validThrough).toBe(future)
    expect(json.hiringOrganization.name).toBe('B Solution')
    expect(json.description).toBe('<p>Line 1</p><p>Line &lt;2&gt;</p>')
  })
})
