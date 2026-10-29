import { afterEach, describe, expect, it, vi } from 'vitest'
import { COPY, getLegalJob, getLegalJobs, isCountrySegment, isJobId, place, type LegalJob } from '@/lib/legal-jobs'
import { LOCALES } from '@/lib/i18n/config'

const JOB: LegalJob = { id: '0b8a1c2e-1111-4222-8333-944455556666', title: 'Senior Legal Counsel', employer: 'Firm', country: 'CZ', city: 'Prague', remote: false, role: 'in_house_counsel', seniority: 'senior', practiceAreas: ['corporate'], languages: ['en'], summary: 'Summary.', summaryLocale: 'en', sourceUrl: 'https://job-boards.greenhouse.io/firm/jobs/1', postedAt: null, firstSeenAt: '2026-10-29T00:00:00Z', status: 'open' }

afterEach(() => vi.unstubAllGlobals())

describe('external legal jobs (M13.3)', () => {
  it('every locale says the position is external and that you apply with the employer', () => {
    for (const locale of LOCALES) expect(COPY[locale].external.length).toBeGreaterThan(30)
  })

  it('never shows a closed advert, and an unreachable feed is simply empty', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response(JSON.stringify({ jobs: [JOB, { ...JOB, id: 'x', status: 'closed' }] }))))
    expect((await getLegalJobs('en')).map((j) => j.id)).toEqual([JOB.id])
    vi.stubGlobal('fetch', vi.fn(async () => new Response(JSON.stringify({ job: { ...JOB, status: 'closed' } }))))
    expect(await getLegalJob(JOB.id, 'en')).toBeNull()
    vi.stubGlobal('fetch', vi.fn(async () => { throw new Error('down') }))
    expect(await getLegalJobs('cs')).toEqual([])
  })

  it('tells a market page from an advert page', () => {
    expect(isCountrySegment('cz')).toBe(true)
    expect(isJobId(JOB.id)).toBe(true)
    expect(isCountrySegment(JOB.id)).toBe(false)
    expect(isJobId('cz')).toBe(false)
  })

  it('names the place in the page language', () => {
    expect(place(JOB, 'cs')).toBe('Prague, Česko')
    expect(place({ ...JOB, remote: true }, 'de')).toContain('remote')
  })
})
