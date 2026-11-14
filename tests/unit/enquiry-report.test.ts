import { expect, it } from 'vitest'
import { enquiryReport, logRows } from '@/scripts/enquiries/aggregate'
import { discoverySource, discoverySources } from '@/lib/enquiry-discovery'
const asOf = '2026-11-13'
const event = (overrides = {}) => ({ requestId: 'request-1', resendMessageId: 'provider-1', timestamp: '2026-11-13T10:00:00Z', status: 'accepted', enquiryType: 'hiring', formPage: '/hire-in-house-counsel', serviceInterest: 'executive-search', discoverySource: 'google', ...overrides })
const outcome = (overrides = {}) => ({ requestId: 'request-1', status: 'qualified', recordedOn: '2026-11-13', ...overrides })

it.each(Object.keys(discoverySources))('recognizes the explicit discovery value %s', value => { expect(discoverySource(value)).toBe(value) })
it('rejects inherited, arbitrary and URL-like discovery values', () => {
  for (const value of ['__proto__', 'constructor', 'google?email=private@example.com', {}, null]) expect(discoverySource(value)).toBeUndefined()
})
it('counts only provider-accepted messages and keeps employer/candidate traffic apart', () => {
  const r = enquiryReport([event(), event({ requestId: 'request-2', resendMessageId: 'provider-2', enquiryType: 'candidate', discoverySource: 'ai-assistant' }), event({ status: 'provider-error' })], undefined, asOf)
  expect(r).toMatchObject({ providerAcceptedMessages: 2, declaredEmployerEnquiries: 1, employerByDiscovery: { google: 1 }, allByEnquiryType: { hiring: 1, candidate: 1 }, otherRows: 1, recordedQualifiedEmployerEnquiries: null, recordedEmployerMandates: null })
})
it('marks missing self-reports as unspecified rather than inferring Google or direct traffic', () => {
  expect(enquiryReport([event({ discoverySource: undefined })], undefined, asOf).employerByDiscovery).toEqual({ unspecified: 1 })
})
it('counts browser-declared recruitment context independently of submission page and discovery, without backfilling older logs', () => {
  const r = enquiryReport([event({ recruitmentPage: '/de/hire-in-house-counsel', formPage: '/contact' }), event({ requestId: 'legacy', resendMessageId: 'legacy-provider', formPage: '/hire-in-house-counsel' })], undefined, asOf)
  expect(r.employerByRecruitmentPage).toEqual({ '/de/hire-in-house-counsel': 1, unspecified: 1 })
  expect(r.employerBySubmissionPage).toEqual({ '/contact': 1, '/hire-in-house-counsel': 1 })
  expect(r.recordedQualifiedEmployerEnquiries).toBeNull()
})
it('refuses unsafe or conflicting recruitment context in accepted log records', () => {
  expect(enquiryReport([event({ recruitmentPage: '/hire-in-house-counsel?secret=PRIVATE' })], undefined, asOf).invalidAcceptedRows).toBe(1)
  expect(() => enquiryReport([event({ recruitmentPage: '/hire-in-house-counsel' }), event({ recruitmentPage: '/hire-legal-leader' })], undefined, asOf)).toThrow('Conflicting acceptance records')
})
it('deduplicates provider acceptance and links a recorded outcome through any request alias', () => {
  const r = enquiryReport([event(), event({ requestId: 'request-alias' })], [outcome({ requestId: 'request-alias', status: 'mandated' })], asOf)
  expect(r).toMatchObject({ providerAcceptedMessages: 1, duplicateAcceptedRows: 1, employerOutcomesRecorded: 1, recordedQualifiedEmployerEnquiries: 1, recordedEmployerMandates: 1 })
})
it('uses the latest independently entered outcome and does not qualify candidates as employers', () => {
  const r = enquiryReport([event({ timestamp: '2026-11-12T10:00:00Z' }), event({ requestId: 'candidate', resendMessageId: 'candidate-provider', enquiryType: 'candidate' })], [outcome({ recordedOn: '2026-11-12' }), outcome({ status: 'not-qualified' }), outcome({ requestId: 'candidate', status: 'mandated' })], asOf)
  expect(r.recordedQualifiedEmployerEnquiries).toBe(0); expect(r.recordedEmployerMandates).toBe(0)
})
it('does not turn unmatched outcomes into qualified enquiries', () => {
  const r = enquiryReport([event()], [outcome({ requestId: 'unknown' })], asOf)
  expect(r.unlinkedOutcomeRecords).toBe(1); expect(r.employerOutcomesRecorded).toBe(0); expect(r.recordedQualifiedEmployerEnquiries).toBe(0)
})
it('refuses conflicting acceptance references, duplicate dimensions and impossible outcomes', () => {
  expect(() => enquiryReport([event(), event({ discoverySource: 'ai-assistant' })], undefined, asOf)).toThrow()
  expect(() => enquiryReport([event(), event({ resendMessageId: 'another-provider' })], undefined, asOf)).toThrow()
  expect(() => enquiryReport([event()], [outcome({ recordedOn: '2026-11-12' })], asOf)).toThrow()
  expect(() => enquiryReport([event()], [outcome(), outcome({ status: 'mandated' })], asOf)).toThrow()
  expect(() => enquiryReport([event()], [outcome({ recordedOn: '2026-11-14' })], asOf)).toThrow()
})
it('omits private content and identifiers from the aggregate output', () => {
  const r = enquiryReport([event({ email: 'private@example.com', message: 'PRIVATE-BRIEF', name: 'PRIVATE-NAME', token: 'PRIVATE-TOKEN' })], undefined, asOf)
  const json = JSON.stringify(r)
  for (const value of ['private@example.com', 'PRIVATE-', 'request-1', 'provider-1']) expect(json).not.toContain(value)
})
it('rejects unsafe dimensions instead of publishing them as aggregation keys', () => {
  const r = enquiryReport([event({ discoverySource: '__proto__' }), event({ formPage: '/contact?secret=PRIVATE' }), event({ timestamp: 'bad' })], undefined, asOf)
  expect(r.invalidAcceptedRows).toBe(3); expect(r.providerAcceptedMessages).toBe(0); expect(JSON.stringify(r)).not.toContain('PRIVATE')
})
it('reads structured exports and prefixed JSON lines without echoing malformed data', () => {
  const line = '[contact-email] ' + JSON.stringify(event())
  expect(enquiryReport(logRows(JSON.stringify([{ message: line }])), undefined, asOf).providerAcceptedMessages).toBe(1)
  expect(enquiryReport(logRows(line + '\nPRIVATE-UNRELATED'), undefined, asOf)).toMatchObject({ providerAcceptedMessages: 1, unrecognizedRows: 1 })
  expect(() => enquiryReport(logRows('PRIVATE-UNRELATED'), undefined, asOf)).toThrow()
})
