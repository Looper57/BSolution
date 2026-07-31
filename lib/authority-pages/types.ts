import type { Locale } from '@/lib/i18n/config'
import type { SeoPageDefinition } from '@/lib/seo-pages'

export const AUTHORITY_REVIEW_STATUSES = [
  'draft',
  'evidence-required',
  'owner-review',
  'approved',
  'archived',
] as const

export type AuthorityReviewStatus = (typeof AUTHORITY_REVIEW_STATUSES)[number]

export const AUTHORITY_TRUST_SIGNAL_KINDS = [
  'operating-history',
  'organisation-experience',
  'testimonial',
  'case-study',
  'methodology',
] as const

export type AuthorityTrustSignalKind = (typeof AUTHORITY_TRUST_SIGNAL_KINDS)[number]

export interface AuthorityTrustSignalReference {
  id: string
  kind: AuthorityTrustSignalKind
  evidenceId: string
  status: 'pending' | 'approved'
}

export interface AuthorityReviewInformation {
  status: AuthorityReviewStatus
  locale: Locale
  contentOwnerId: string
  evidenceOwnerId: string
  lastReviewed: string | null
  nextReview: string | null
}

export const AUTHORITY_EDITORIAL_SECTION_KINDS = [
  'market-context',
  'employer-challenges',
  'candidate-profile',
  'typical-mandates',
  'search-methodology',
  'assessment-methodology',
  'cross-border-capability',
  'process-timeline',
  'why-bsolution',
] as const

export type AuthorityEditorialSectionKind =
  (typeof AUTHORITY_EDITORIAL_SECTION_KINDS)[number]

export interface AuthorityEditorialSection {
  id: string
  locale: Locale
  kind: AuthorityEditorialSectionKind
  heading: string
  paragraphs: [string, ...string[]]
  items?: [string, ...string[]]
}

export interface AuthorityFaqItem {
  id: string
  locale: Locale
  question: string
  answer: string
}

export interface AuthorityEditorialContent {
  locale: Locale
  parentLabel: string
  h1: string
  proposition: string
  executiveSummary: {
    heading: string
    paragraphs: [string, ...string[]]
  }
  definition: {
    heading: string
    text: string
  }
  sections: readonly AuthorityEditorialSection[]
  faqs: readonly AuthorityFaqItem[]
  faqHeading: string
  relatedHeading: string
  primaryCtaLabel: string
  secondaryCandidateCtaLabel: string
}

export interface ProductionAuthorityRecord {
  page: SeoPageDefinition
  editorial: AuthorityEditorialContent
  rendering: {
    status: 'existing-route-integration'
    locale: Locale
    basePath: string
    canonical: string
  }
  review: AuthorityReviewInformation
  trustSignals: readonly AuthorityTrustSignalReference[]
}

export const AUTHORITY_RELATIONSHIP_TYPES = [
  'parent', 'child', 'related-service', 'related-practice',
  'related-industry', 'related-location', 'case-study', 'insight',
  'methodology', 'faq', 'client-path', 'candidate-path', 'contact',
  'breadcrumb',
] as const

export type AuthorityRelationshipType =
  (typeof AUTHORITY_RELATIONSHIP_TYPES)[number]

export interface AuthorityRelationship {
  id: string
  sourcePageId: string
  target:
    | { kind: 'route'; routeId: string }
    | { kind: 'faq'; faqId: string }
    | { kind: 'evidence'; evidenceId: string }
  relationship: AuthorityRelationshipType
  locale: Locale
  visibility: 'visible' | 'structural'
  anchor: string
  evidenceRequirement: string | null
  publicationEligible: boolean
}

export interface AuthorityRegistryValidationError {
  code: string
  message: string
  pageId?: string
}

export interface AuthorityRegistryValidationResult {
  valid: boolean
  errors: AuthorityRegistryValidationError[]
}
