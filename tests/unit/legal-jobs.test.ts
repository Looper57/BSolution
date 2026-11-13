import { afterEach, describe, expect, it, vi } from 'vitest'
import { COPY, getLegalJob, getLegalJobs, isCountrySegment, isJobId, place, type LegalJob } from '@/lib/legal-jobs'
import { LOCALES } from '@/lib/i18n/config'
import { legalJobsMetadata } from '@/lib/legal-jobs-route'

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

  it('uses the same locale collection for all-market, country and detail views', async () => {
    const fetch = vi.fn<(url: string) => Promise<Response>>(async () => new Response(JSON.stringify({ jobs: [JOB, { ...JOB, id: '11111111-1111-4111-8111-111111111111', country: 'DE' }] })))
    vi.stubGlobal('fetch', fetch)
    expect(await getLegalJob(JOB.id, 'en')).toEqual(JOB)
    expect((await getLegalJobs('en', 'CZ')).map(job => job.id)).toEqual([JOB.id])
    expect(await getLegalJobs('en', 'AE')).toEqual([])
    expect(fetch.mock.calls.every(([url]) => String(url).endsWith('?locale=en'))).toBe(true)
  })

  it('cannot resurrect an advert absent from the current list via an independently stale detail response', async () => {
    const fetch = vi.fn(async (url: string) => new Response(JSON.stringify(url.includes('&id=') ? { job: JOB } : { jobs: [] })))
    vi.stubGlobal('fetch', fetch)
    expect(await getLegalJobs('en')).toEqual([])
    expect(await getLegalJob(JOB.id, 'en')).toBeNull()
    expect(fetch.mock.calls.some(([url]) => url.includes('&id='))).toBe(false)
  })

  it('leaves room for the brand in long job search titles while preserving the full source title', async () => {
    const longJob = { ...JOB, title: 'Senior International Legal Counsel for Commercial Contracts and Employment Law', city: 'Warsaw' }
    vi.stubGlobal('fetch', vi.fn(async () => new Response(JSON.stringify({ jobs: [longJob] }))))
    const metadata = await legalJobsMetadata('en', JOB.id)
    expect(`${metadata.title} | B Solution`.length).toBeLessThanOrEqual(65)
    expect(String(metadata.title)).toContain('Senior International Legal Counsel')
    expect((await getLegalJob(JOB.id, 'en'))?.title).toBe(longJob.title)
  })

  it('keeps UAE search snippets concise in each language while retaining canonical country targeting', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response(JSON.stringify({ jobs: [JOB] }))))
    for (const locale of LOCALES) {
      const metadata = await legalJobsMetadata(locale, 'ae')
      expect(`${metadata.title} | B Solution`.length).toBeLessThanOrEqual(65)
      expect(String(metadata.description).length).toBeLessThanOrEqual(155)
      expect(metadata.alternates?.canonical).toContain('/legal-jobs/ae')
    }
  })
})
