import type { Locale } from '@/lib/i18n/config'

export const SEO_PAGE_TYPES = [
  'service',
  'practice-area',
  'location',
  'client-intent',
  'candidate-intent',
] as const

export type SeoPageType = (typeof SEO_PAGE_TYPES)[number]

export const SEO_PUBLICATION_STATUSES = [
  'draft',
  'evidence-required',
  'owner-review',
  'approved',
  'archived',
] as const

export type SeoPublicationStatus = (typeof SEO_PUBLICATION_STATUSES)[number]
export type SeoTopicStatus = 'clear' | 'duplicate' | 'cannibalizing'
export type SeoArchiveAction = 'noindex' | 'redirect' | 'gone'

export type SeoEvidence =
  | { status: 'not-required'; requirements: [] }
  | { status: 'required'; requirements: [string, ...string[]] }
  | { status: 'approved'; requirements: [string, ...string[]] }

export type SeoOwnerApproval =
  | { status: 'pending' }
  | { status: 'approved'; ownerId: string }

export const SEO_SECTION_TYPES = [
  'proposition',
  'audience-problem',
  'capability-overview',
  'evidence',
  'process',
  'roles-opportunities',
] as const

export type SeoSectionType = (typeof SEO_SECTION_TYPES)[number]

export interface SeoContentSection {
  id: string
  locale: Locale
  type: SeoSectionType
  heading: string
  paragraphs: string[]
  items?: string[]
}

export type SeoCtaAudience = 'general' | 'client' | 'candidate'

export type SeoNavigationTarget =
  | { kind: 'page'; pageId: string }
  | { kind: 'route'; routeId: string }

export interface SeoCta {
  id: string
  locale: Locale
  label: string
  target: SeoNavigationTarget
  audience: SeoCtaAudience
  style: 'primary' | 'secondary'
}

export const SEO_LINK_RELATIONSHIPS = [
  'parent',
  'child',
  'related-service',
  'related-practice',
  'related-location',
  'candidate-path',
  'client-path',
  'case-study',
  'contact',
] as const

export type SeoLinkRelationship = (typeof SEO_LINK_RELATIONSHIPS)[number]

export interface SeoInternalLink {
  id: string
  locale: Locale
  target: SeoNavigationTarget
  relationship: SeoLinkRelationship
  anchorText: string
  purpose: string
}

export type SeoParentTarget =
  | { kind: 'page'; pageId: string }
  | { kind: 'route'; routeId: string }

export interface SeoParent {
  target: SeoParentTarget
  locale: Locale
  label: string
}

export const SEO_CANONICAL_ROUTE_KINDS = [
  'service-hub',
  'practice-area-hub',
  'location-hub',
  'client-hub',
  'candidate-hub',
  'contact',
  'positions',
  'case-study',
  'other',
] as const

export type SeoCanonicalRouteKind = (typeof SEO_CANONICAL_ROUTE_KINDS)[number]

export interface SeoCanonicalRoute {
  id: string
  locale: Locale
  basePath: string
  kind: SeoCanonicalRouteKind
}

export const SEO_STRUCTURED_DATA_TYPES = [
  'WebPage',
  'BreadcrumbList',
  'Service',
] as const

export type SeoStructuredDataType = (typeof SEO_STRUCTURED_DATA_TYPES)[number]

export interface SeoStructuredDataEligibility {
  requested: SeoStructuredDataType[]
  describesVisibleService: boolean
}

export interface SeoRendererLabels {
  locale: Locale
  breadcrumbNavigation: string
  home: string
  related: string
  additionalActions: string
}

export interface SeoPageDefinition {
  id: string
  translationKey: string
  ownerKey: string
  locale: Locale
  contentLocale: Locale
  slug: string
  basePath: string
  pageType: SeoPageType
  publicationStatus: SeoPublicationStatus
  approval: SeoOwnerApproval
  evidence: SeoEvidence
  topicStatus: SeoTopicStatus
  indexationRequested: boolean
  archiveAction?: SeoArchiveAction
  canonical: string
  title: string
  metaDescription: string
  h1: string
  proposition: string
  audience: string
  searchIntent: string
  sections: SeoContentSection[]
  primaryCta: SeoCta
  secondaryCtas: SeoCta[]
  internalLinks: SeoInternalLink[]
  parent: SeoParent
  rendererLabels: SeoRendererLabels
  structuredData: SeoStructuredDataEligibility
}

export interface SeoValidationError {
  code: string
  message: string
  pageId?: string
}

export interface SeoValidationResult {
  valid: boolean
  errors: SeoValidationError[]
}
