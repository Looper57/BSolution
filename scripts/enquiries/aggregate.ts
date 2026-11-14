import { discoverySource } from '../../lib/enquiry-discovery'
import { contactFormPage } from '../../lib/contact-form-context'
import { enquiryService } from '../../lib/service-enquiry'
import { recruitmentPage } from '../../lib/enquiry-recruitment'

type Outcome = { requestId: string; status: 'qualified' | 'mandated' | 'not-qualified'; recordedOn: string }
type Accepted = { requestId: string; deliveryId: string; day: string; type: string; source: string; page: string; service: string; recruitment: string }
const identifier = (v: unknown): v is string => typeof v === 'string' && /^[a-zA-Z0-9_-]{1,128}$/.test(v)
const record = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v)
const date = (v: unknown): v is string => typeof v === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(v) && !Number.isNaN(Date.parse(v)) && new Date(v).toISOString().slice(0, 10) === v

/** Consume ordinary JSON exports or one JSON/prefixed contact log per line. No raw data leaves this module. */
export function logRows(text: string): unknown[] {
  try { const value = JSON.parse(text); return Array.isArray(value) ? value : [value] } catch {
    return text.split(/\r?\n/).filter(line => line.trim()).map(line => {
      try { return JSON.parse(line) } catch { return line }
    })
  }
}
const contactStatuses = ['accepted', 'rejected', 'configuration-error', 'input-error', 'security-error', 'provider-error', 'unexpected-error']
function unwrap(value: unknown): unknown {
  if (record(value) && contactStatuses.includes(String(value.status))) return value
  const line = record(value) && typeof value.message === 'string' ? value.message : value
  if (typeof line !== 'string') return line
  const prefix = '[contact-email] '
  if (!line.startsWith(prefix)) return undefined
  try { return JSON.parse(line.slice(prefix.length)) } catch { return undefined }
}
export function enquiryReport(input: unknown[], outcomes: unknown = undefined, asOf = new Date().toISOString().slice(0, 10)) {
  if (!date(asOf)) throw new Error('Invalid report date')
  const byRequest = new Map<string, Outcome>()
  if (outcomes !== undefined) {
    if (!Array.isArray(outcomes)) throw new Error('Invalid outcome register')
    for (const value of outcomes) {
      if (!record(value) || !identifier(value.requestId) || !['qualified', 'mandated', 'not-qualified'].includes(String(value.status)) || !date(value.recordedOn) || value.recordedOn > asOf) throw new Error('Invalid outcome register')
      const item = value as unknown as Outcome, old = byRequest.get(item.requestId)
      if (old && old.recordedOn === item.recordedOn && old.status !== item.status) throw new Error('Conflicting outcome records')
      if (!old || item.recordedOn > old.recordedOn) byRequest.set(item.requestId, item)
    }
  }
  const accepted = new Map<string, Accepted>(), requestIds = new Map<string, string>()
  let invalidRows = 0, otherRows = 0, unrecognizedRows = 0, duplicateAcceptedRows = 0
  for (const row of input) {
    const e = unwrap(row)
    if (!record(e) || !contactStatuses.includes(String(e.status))) { unrecognizedRows++; continue }
    if (e.status !== 'accepted') { otherRows++; continue }
    if (!identifier(e.requestId) || !identifier(e.resendMessageId) || typeof e.timestamp !== 'string' || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?Z$/.test(e.timestamp) || Number.isNaN(Date.parse(e.timestamp))) { invalidRows++; continue }
    const day = new Date(e.timestamp).toISOString().slice(0, 10)
    if (day > asOf || !['hiring', 'candidate', 'other', 'unspecified'].includes(String(e.enquiryType ?? 'unspecified')) || e.discoverySource !== undefined && !discoverySource(e.discoverySource) || e.formPage !== undefined && !contactFormPage(e.formPage) || e.serviceInterest !== undefined && !enquiryService(e.serviceInterest) || e.recruitmentPage !== undefined && !recruitmentPage(e.recruitmentPage)) { invalidRows++; continue }
    const entry: Accepted = { requestId: e.requestId, deliveryId: e.resendMessageId, day, type: String(e.enquiryType ?? 'unspecified'), source: String(e.discoverySource ?? 'unspecified'), page: String(e.formPage ?? 'unspecified'), service: String(e.serviceInterest ?? 'unspecified'), recruitment: String(e.recruitmentPage ?? 'unspecified') }
    const old = accepted.get(entry.deliveryId), previousDelivery = requestIds.get(entry.requestId)
    if (previousDelivery && previousDelivery !== entry.deliveryId) throw new Error('Conflicting acceptance references')
    requestIds.set(entry.requestId, entry.deliveryId)
    if (old) {
      if (old.day !== entry.day || old.type !== entry.type || old.source !== entry.source || old.page !== entry.page || old.service !== entry.service || old.recruitment !== entry.recruitment) throw new Error('Conflicting acceptance records')
      duplicateAcceptedRows++; continue
    }
    accepted.set(entry.deliveryId, entry)
  }
  if (input.length && unrecognizedRows === input.length) throw new Error('No recognized contact log records')
  const stages = new Map<string, Outcome>()
  let unlinkedOutcomeRecords = 0
  for (const [requestId, outcome] of byRequest) {
    const delivery = requestIds.get(requestId)
    if (!delivery) { unlinkedOutcomeRecords++; continue }
    if (outcome.recordedOn < accepted.get(delivery)!.day) throw new Error('Outcome precedes enquiry')
    const old = stages.get(delivery)
    if (old && old.recordedOn === outcome.recordedOn && old.status !== outcome.status) throw new Error('Conflicting outcome records')
    if (!old || outcome.recordedOn > old.recordedOn) stages.set(delivery, outcome)
  }
  const entries = [...accepted.values()], employers = entries.filter(e => e.type === 'hiring')
  const counts = (items: Accepted[], key: keyof Accepted) => Object.fromEntries([...new Set(items.map(e => e[key]))].sort().map(v => [v, items.filter(e => e[key] === v).length]))
  return {
    scope: 'Provider-accepted contact messages and optional visitor-reported discovery. Not email delivery, web traffic, inferred organic attribution or automatically qualified leads. Outcome counts require an independently maintained private register.',
    asOf, inputRows: input.length, invalidAcceptedRows: invalidRows, otherRows, unrecognizedRows, duplicateAcceptedRows,
    providerAcceptedMessages: entries.length, declaredEmployerEnquiries: employers.length,
    employerByDiscovery: counts(employers, 'source'), allByEnquiryType: counts(entries, 'type'), employerByDay: counts(employers, 'day'), employerBySubmissionPage: counts(employers, 'page'), employerByService: counts(employers, 'service'),
    employerByRecruitmentPage: counts(employers, 'recruitment'),
    outcomesProvided: outcomes !== undefined,
    employerOutcomesRecorded: employers.filter(e => stages.has(e.deliveryId)).length,
    recordedQualifiedEmployerEnquiries: outcomes === undefined ? null : employers.filter(e => ['qualified', 'mandated'].includes(stages.get(e.deliveryId)?.status ?? '')).length,
    recordedEmployerMandates: outcomes === undefined ? null : employers.filter(e => stages.get(e.deliveryId)?.status === 'mandated').length,
    unlinkedOutcomeRecords,
  }
}
