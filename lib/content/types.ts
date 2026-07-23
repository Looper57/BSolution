import type { Locale } from '@/lib/i18n/config'

/** A single rich content section rendered on a detail page. */
export interface ContentSection {
  heading: string
  /** Each string is rendered as a paragraph. */
  paragraphs: string[]
  /** Optional bullet list rendered after the paragraphs. */
  bullets?: string[]
}

/** Localized fields shared by every taxonomy/detail entity. */
export interface LocalizedEntity {
  /** Slug is locale-independent so hreflang pairs map cleanly. */
  title: string
  /** Short one-line summary used in cards, meta descriptions, listings. */
  summary: string
  /** SEO meta title (falls back to title when omitted). */
  metaTitle?: string
  /** SEO meta description (falls back to summary when omitted). */
  metaDescription?: string
  /** Ordered body sections. */
  sections: ContentSection[]
}

export type EntityKind =
  | 'service'
  | 'practice'
  | 'industry'
  | 'country'
  | 'caseStudy'
  | 'insight'

/** The registry entry: a stable slug plus content for every locale. */
export interface Entity {
  kind: EntityKind
  slug: string
  /** Root-relative English base path, e.g. /services/legal-executive-search */
  basePath: string
  /** True once all four locales are authored to publication quality. */
  complete: boolean
  content: Record<Locale, LocalizedEntity>
  /** Slugs of related entities for internal linking. */
  related?: {
    services?: string[]
    practices?: string[]
    industries?: string[]
    insights?: string[]
    caseStudies?: string[]
  }
  /** Optional country ISO code for schema (countries only). */
  areaServed?: string
  /** Optional publish/review dates for insights (ISO). */
  published?: string
  reviewed?: string
}

export type EntityRegistry = Record<string, Entity>
