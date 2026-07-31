import { validateSeoPageRegistry } from '@/lib/seo-pages'
import {
  AUTHORITY_EDITORIAL_SECTION_KINDS,
  AUTHORITY_REVIEW_STATUSES,
  AUTHORITY_TRUST_SIGNAL_KINDS,
  type AuthorityRegistryValidationError,
  type AuthorityRegistryValidationResult,
  type ProductionAuthorityRecord,
} from './types'
import { productionAuthorityCanonicalRoutes } from './registry'

function hasText(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0
}

function isIsoDate(value: string | null): boolean {
  return value === null || /^\d{4}-\d{2}-\d{2}$/.test(value)
}

const APPROVED_EVIDENCE_IDS = new Set([
  'evidence:bsolution-founded-2007',
  'evidence:approved-executive-search-organisations',
  'evidence:approved-testimonials',
  'evidence:general-counsel-fintech-case-study',
  'evidence:legal-executive-search-methodology',
])

const PROHIBITED_CLAIMS = [
  /\bguaranteed\b/i,
  /\bsuccess rate\b/i,
  /\bmarket share\b/i,
  /\bnumber one\b/i,
  /\baward-winning\b/i,
  /\bgarantovan\w*\b/i,
  /\bgarantiert\w*\b/i,
  /\bgwarantowan\w*\b/i,
  /\b\d+(?:[.,]\d+)?\s*%/,
]

function wordCount(value: string): number {
  return value.trim().split(/\s+/u).filter(Boolean).length
}

export function validateProductionAuthorityRegistry(
  records: readonly ProductionAuthorityRecord[],
): AuthorityRegistryValidationResult {
  const pages = records.map((record) => record.page)
  const pageValidation = validateSeoPageRegistry(
    pages,
    productionAuthorityCanonicalRoutes,
  )
  const errors: AuthorityRegistryValidationError[] = [...pageValidation.errors]
  const recordIds = new Set<string>()

  for (const record of records) {
    const { page, editorial, rendering, review, trustSignals } = record
    const add = (code: string, message: string) => {
      errors.push({ code, message, pageId: page.id })
    }

    if (recordIds.has(page.id)) {
      add('duplicate-production-record', `Production record ${page.id} is duplicated.`)
    }
    recordIds.add(page.id)

    if (!AUTHORITY_REVIEW_STATUSES.includes(review.status)) {
      add('invalid-review-status', `Review status ${review.status} is unsupported.`)
    }
    if (review.status !== page.publicationStatus) {
      add('review-lifecycle-mismatch', 'Review status must match the page lifecycle.')
    }
    if (review.locale !== page.locale) {
      add('review-locale-mismatch', 'Review information must match the page locale.')
    }
    if (
      review.contentOwnerId !== page.ownerKey
      || review.evidenceOwnerId !== page.ownerKey
    ) {
      add('review-owner-mismatch', 'Review owners must match the stable page owner.')
    }
    if (!isIsoDate(review.lastReviewed) || !isIsoDate(review.nextReview)) {
      add('invalid-review-date', 'Review dates must be null or ISO calendar dates.')
    }

    if (editorial.locale !== page.locale) {
      add('editorial-locale-mismatch', 'Editorial content must match the page locale.')
    }
    if (editorial.h1 !== page.h1 || !hasText(editorial.h1)) {
      add('editorial-h1-mismatch', 'Editorial content must supply the page’s single H1 value.')
    }
    if (editorial.proposition !== page.proposition || !hasText(editorial.proposition)) {
      add('editorial-proposition-mismatch', 'Editorial proposition must match the page record.')
    }
    if (
      !hasText(editorial.parentLabel)
      || !hasText(editorial.executiveSummary.heading)
      || editorial.executiveSummary.paragraphs.some((paragraph) => !hasText(paragraph))
      || !hasText(editorial.definition.heading)
      || !hasText(editorial.definition.text)
      || !hasText(editorial.faqHeading)
      || !hasText(editorial.relatedHeading)
      || !hasText(editorial.primaryCtaLabel)
      || !hasText(editorial.secondaryCandidateCtaLabel)
    ) {
      add('incomplete-editorial-content', 'Editorial headings, copy and CTA labels must be complete.')
    }
    if (
      rendering.status !== 'existing-route-integration'
      || rendering.locale !== page.locale
      || rendering.basePath !== page.basePath
      || rendering.canonical !== page.canonical
    ) {
      add(
        'invalid-rendering-integration',
        'Rendering integration must match the exact existing localized route identity.',
      )
    }
    if (
      page.publicationStatus !== 'owner-review'
      || page.approval.status !== 'pending'
      || page.indexationRequested
      || page.topicStatus !== 'resolved'
    ) {
      add(
        'unsafe-rendering-integration-state',
        'Existing-route rendering requires owner review, pending approval, disabled indexation and resolved canonical ownership.',
      )
    }

    const definitionWords = wordCount(editorial.definition.text)
    if (definitionWords < 25 || definitionWords > 60) {
      add(
        'invalid-definition-length',
        `The Legal Executive Search definition must contain 25–60 words; found ${definitionWords}.`,
      )
    }

    const sectionIds = new Set<string>()
    const sectionKinds = new Set<string>()
    for (const section of editorial.sections) {
      if (!hasText(section.id) || sectionIds.has(section.id)) {
        add('duplicate-editorial-section', `Editorial section ${section.id || '(empty)'} is missing or duplicated.`)
      }
      sectionIds.add(section.id)
      sectionKinds.add(section.kind)
      if (
        section.locale !== page.locale
        || !hasText(section.heading)
        || section.paragraphs.length === 0
        || section.paragraphs.some((paragraph) => !hasText(paragraph))
        || section.items?.some((item) => !hasText(item))
      ) {
        add('incomplete-editorial-section', `Editorial section ${section.id} is incomplete.`)
      }
    }
    for (const kind of AUTHORITY_EDITORIAL_SECTION_KINDS) {
      if (!sectionKinds.has(kind)) {
        add('missing-editorial-section', `Required editorial section ${kind} is missing.`)
      }
    }
    if (
      sectionKinds.size !== AUTHORITY_EDITORIAL_SECTION_KINDS.length
      || editorial.sections.length !== AUTHORITY_EDITORIAL_SECTION_KINDS.length
    ) {
      add('invalid-editorial-section-set', 'Each required editorial section must appear exactly once.')
    }

    const faqIds = new Set<string>()
    if (editorial.faqs.length < 5 || editorial.faqs.length > 7) {
      add('invalid-faq-count', 'Editorial content must contain between five and seven FAQs.')
    }
    for (const faq of editorial.faqs) {
      if (!hasText(faq.id) || faqIds.has(faq.id)) {
        add('duplicate-faq', `FAQ ${faq.id || '(empty)'} is missing or duplicated.`)
      }
      faqIds.add(faq.id)
      if (
        faq.locale !== page.locale
        || !hasText(faq.question)
        || !hasText(faq.answer)
      ) {
        add('incomplete-faq', `FAQ ${faq.id} is incomplete or has the wrong locale.`)
      }
    }
    if (page.secondaryCtas.length > 1) {
      add('too-many-secondary-ctas', 'Authority content may contain at most one secondary CTA.')
    }

    const editorialText = JSON.stringify(editorial)
    for (const prohibited of PROHIBITED_CLAIMS) {
      if (prohibited.test(editorialText)) {
        add('prohibited-authority-claim', `Editorial content matches prohibited claim ${prohibited}.`)
      }
    }

    const signalIds = new Set<string>()
    for (const signal of trustSignals) {
      if (!hasText(signal.id) || signalIds.has(signal.id)) {
        add('duplicate-trust-signal', `Trust signal ${signal.id || '(empty)'} is missing or duplicated.`)
      }
      signalIds.add(signal.id)
      if (!AUTHORITY_TRUST_SIGNAL_KINDS.includes(signal.kind)) {
        add('invalid-trust-signal-kind', `Trust signal ${signal.id} has an unsupported kind.`)
      }
      if (!hasText(signal.evidenceId)) {
        add('missing-trust-evidence', `Trust signal ${signal.id} requires an evidence ID.`)
      } else if (!APPROVED_EVIDENCE_IDS.has(signal.evidenceId)) {
        add('unsupported-trust-evidence', `Trust signal ${signal.id} references unapproved evidence.`)
      }
      if (!['pending', 'approved'].includes(signal.status)) {
        add('invalid-trust-status', `Trust signal ${signal.id} has an unsupported status.`)
      }
    }
  }

  return { valid: errors.length === 0, errors }
}
