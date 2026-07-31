import { describe, expect, it } from 'vitest'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { ProductionAuthorityPage } from '@/components/production-authority-page'
import {
  AUTHORITY_EDITORIAL_SECTION_KINDS,
  productionAuthorityCanonicalRoutes,
  productionAuthorityPages,
  productionAuthorityRegistry,
  buildProductionAuthorityViewModel,
  buildProductionAuthorityMetadata,
  authorityEvidenceRegistry,
  approvedHistoricalOrganisations,
  approvedTestimonials,
  buildAuthorityEvidenceViewModel,
  getAuthorityEvidenceViewModel,
  validateAuthorityEvidenceRegistry,
  productionAuthorityRelationships,
  validateAuthorityRelationships,
  validateProductionAuthorityRelationships,
  getProductionAuthorityViewModel,
  validateProductionAuthorityRegistry,
} from '@/lib/authority-pages'
import { getPageCanonical, isPagePublishable } from '@/lib/seo-pages'

describe('production authority registry', () => {
  it('contains one exact Legal Executive Search record per supported locale', () => {
    expect(productionAuthorityRegistry).toHaveLength(4)
    expect(productionAuthorityRegistry.map(({ page }) => page.locale)).toEqual([
      'en',
      'cs',
      'de',
      'pl',
    ])
    expect(new Set(productionAuthorityPages.map((page) => page.id)).size).toBe(4)
    expect(new Set(productionAuthorityPages.map((page) => page.canonical)).size).toBe(4)
  })

  it('passes the Phase 5A registry and production governance validators', () => {
    expect(validateProductionAuthorityRegistry(productionAuthorityRegistry)).toEqual({
      valid: true,
      errors: [],
    })
  })

  it('remains non-public while owner review and canonical consolidation are pending', () => {
    for (const page of productionAuthorityPages) {
      expect(page.publicationStatus).toBe('owner-review')
      expect(page.approval.status).toBe('pending')
      expect(page.topicStatus).toBe('resolved')
      expect(page.indexationRequested).toBe(false)
      expect(page.structuredData.requested).not.toContain('FAQPage')
      expect(
        isPagePublishable(
          page,
          productionAuthorityPages,
          productionAuthorityCanonicalRoutes,
        ),
      ).toBe(false)
    }
  })

  it('uses normalized locale-specific canonical identity', () => {
    for (const page of productionAuthorityPages) {
      expect(page.basePath).toBe('/services/legal-executive-search')
      expect(page.canonical).toBe(getPageCanonical(page))
      expect(page.translationKey).toBe('authority:legal-executive-search')
      expect(page.ownerKey).toBe('owner:bsolution:legal-executive-search')
    }
  })

  it('records approved trust references without rendering them', () => {
    const expectedKinds = [
      'operating-history',
      'organisation-experience',
      'testimonial',
      'case-study',
      'methodology',
    ]

    for (const record of productionAuthorityRegistry) {
      expect(record.trustSignals.map((signal) => signal.kind)).toEqual(expectedKinds)
      expect(record.trustSignals.every((signal) => signal.status === 'approved')).toBe(true)
      expect(record.review.status).toBe('owner-review')
      expect(record.review.lastReviewed).toBeNull()
      expect(record.review.nextReview).toBeNull()
    }
  })

  it('contains complete native editorial content for every locale', () => {
    const definitions = new Set<string>()
    const searchIntents = new Set<string>()

    for (const { editorial, page } of productionAuthorityRegistry) {
      expect(editorial.locale).toBe(page.locale)
      expect(editorial.h1).toBe(page.h1)
      expect(editorial.proposition).toBe(page.proposition)
      expect(editorial.executiveSummary.paragraphs.length).toBeGreaterThan(0)
      expect(editorial.sections.map((section) => section.kind)).toEqual(
        AUTHORITY_EDITORIAL_SECTION_KINDS,
      )
      expect(new Set(editorial.sections.map((section) => section.id)).size).toBe(
        editorial.sections.length,
      )
      expect(
        editorial.sections.every(
          (section) =>
            section.locale === page.locale
            && section.heading.trim().length > 0
            && section.paragraphs.every((paragraph) => paragraph.trim().length > 0),
        ),
      ).toBe(true)

      const definitionWords = editorial.definition.text.trim().split(/\s+/u)
      expect(definitionWords.length).toBeGreaterThanOrEqual(25)
      expect(definitionWords.length).toBeLessThanOrEqual(60)
      definitions.add(editorial.definition.text)
      searchIntents.add(page.searchIntent)
    }

    expect(definitions.size).toBe(4)
    expect(searchIntents.size).toBe(4)
  })

  it('does not silently reuse English editorial paragraphs in localized records', () => {
    const english = productionAuthorityRegistry.find(
      ({ page }) => page.locale === 'en',
    )
    expect(english).toBeDefined()

    const englishParagraphs = [
      ...english!.editorial.executiveSummary.paragraphs,
      english!.editorial.definition.text,
      ...english!.editorial.sections.flatMap((section) => section.paragraphs),
    ]

    for (const record of productionAuthorityRegistry.filter(
      ({ page }) => page.locale !== 'en',
    )) {
      const localized = JSON.stringify(record.editorial)
      for (const paragraph of englishParagraphs) {
        expect(localized).not.toContain(paragraph)
      }
    }
  })

  it('provides governed FAQs and one subordinate candidate CTA per locale', () => {
    for (const { editorial, page } of productionAuthorityRegistry) {
      expect(editorial.faqs.length).toBeGreaterThanOrEqual(5)
      expect(editorial.faqs.length).toBeLessThanOrEqual(7)
      expect(new Set(editorial.faqs.map((faq) => faq.id)).size).toBe(
        editorial.faqs.length,
      )
      expect(
        editorial.faqs.every(
          (faq) =>
            faq.locale === page.locale
            && faq.question.trim().length > 0
            && faq.answer.trim().length > 0,
        ),
      ).toBe(true)
      expect(page.primaryCta.label).toBe(editorial.primaryCtaLabel)
      expect(page.secondaryCtas).toHaveLength(1)
      expect(page.secondaryCtas[0]).toMatchObject({
        locale: page.locale,
        label: editorial.secondaryCandidateCtaLabel,
        audience: 'candidate',
        style: 'secondary',
      })
    }
  })

  it('uses only approved evidence and contains no prohibited quantified claims', () => {
    const approvedEvidence = new Set([
      'evidence:bsolution-founded-2007',
      'evidence:approved-executive-search-organisations',
      'evidence:approved-testimonials',
      'evidence:general-counsel-fintech-case-study',
      'evidence:legal-executive-search-methodology',
    ])

    for (const { editorial, trustSignals } of productionAuthorityRegistry) {
      expect(
        trustSignals.every((signal) => approvedEvidence.has(signal.evidenceId)),
      ).toBe(true)

      const content = JSON.stringify(editorial)
      expect(content).not.toMatch(/\b\d+(?:[.,]\d+)?\s*%/)
      expect(content).not.toMatch(/\b(?:guaranteed|success rate|market share|number one)\b/i)
    }
  })

  it('rejects incomplete editorial content and unsupported evidence', () => {
    const incomplete = structuredClone(productionAuthorityRegistry)
    incomplete[0].editorial.definition.text = 'Too short.'
    incomplete[0].trustSignals[0].evidenceId = 'evidence:unsupported'

    const result = validateProductionAuthorityRegistry(incomplete)
    expect(result.valid).toBe(false)
    expect(result.errors.map((error) => error.code)).toEqual(
      expect.arrayContaining([
        'invalid-definition-length',
        'unsupported-trust-evidence',
      ]),
    )
  })

  it('builds a render-only view model from the exact validated registry record', () => {
    for (const record of productionAuthorityRegistry) {
      const viewModel = getProductionAuthorityViewModel(record.page.locale)
      expect(viewModel.hero.h1).toBe(record.editorial.h1)
      expect(viewModel.sections.map((section) => section.kind)).toEqual(
        AUTHORITY_EDITORIAL_SECTION_KINDS,
      )
      expect(viewModel.primaryCta.href).toBe(
        record.page.locale === 'en' ? '/contact' : `/${record.page.locale}/contact`,
      )
      expect(viewModel.secondaryCta?.href).toBe(
        record.page.locale === 'en'
          ? '/candidates'
          : `/${record.page.locale}/candidates`,
      )
      expect(viewModel.related.links.every((link) => link.label.trim())).toBe(true)
    }

    const substituted = {
      ...productionAuthorityRegistry[0],
      editorial: {
        ...productionAuthorityRegistry[0].editorial,
        h1: 'Substituted content',
      },
    }
    expect(() =>
      buildProductionAuthorityViewModel(
        substituted,
        productionAuthorityRegistry,
        productionAuthorityCanonicalRoutes,
      ),
    ).toThrow('exact registry record')
  })

  it('fails closed when an integrated registry record becomes invalid', () => {
    const invalid = structuredClone(productionAuthorityRegistry)
    invalid[0].page.indexationRequested = true

    expect(() =>
      buildProductionAuthorityViewModel(
        invalid[0],
        invalid,
        productionAuthorityCanonicalRoutes,
      ),
    ).toThrow('Invalid production authority registry')
  })

  it('renders the governed structure once without evidence or FAQ schema', () => {
    for (const record of productionAuthorityRegistry) {
      const html = renderToStaticMarkup(
        createElement(ProductionAuthorityPage, {
          viewModel: getProductionAuthorityViewModel(record.page.locale),
          evidence: getAuthorityEvidenceViewModel(record.page.locale),
        }),
      )

      expect(html.match(/<h1/g)).toHaveLength(1)
      const positions = AUTHORITY_EDITORIAL_SECTION_KINDS.map((kind) =>
        html.indexOf(`data-authority-section="${kind}"`),
      )
      expect(positions.every((position) => position >= 0)).toBe(true)
      expect(positions).toEqual([...positions].sort((a, b) => a - b))
      expect(html).toContain(record.editorial.faqs[0].question)
      expect(html).toContain(record.editorial.primaryCtaLabel)
      expect(html).toContain(record.editorial.secondaryCandidateCtaLabel)
      expect(html).toContain('Vladimír Polách')
      expect(html).toContain('Dominika Nosačková')
      expect(html).not.toContain('FAQPage')
    }
  })

  it('builds localized noindex metadata from the exact validated registry', () => {
    const expectedLanguages = Object.fromEntries(
      productionAuthorityRegistry.map(({ page }) => [
        page.locale,
        page.canonical,
      ]),
    )
    expectedLanguages['x-default'] =
      'https://www.bsolution.eu/services/legal-executive-search'

    for (const { page } of productionAuthorityRegistry) {
      const metadata = buildProductionAuthorityMetadata(page.locale)
      expect(metadata.title).toBe(page.title)
      expect(metadata.description).toBe(page.metaDescription)
      expect(metadata.alternates).toEqual({
        canonical: page.canonical,
        languages: expectedLanguages,
      })
      expect(metadata.robots).toEqual({ index: false, follow: true })
      expect(metadata.openGraph).toMatchObject({ url: page.canonical })
    }
  })

  it('validates and resolves only the exact approved evidence registry', () => {
    expect(validateAuthorityEvidenceRegistry(authorityEvidenceRegistry)).toEqual({
      valid: true,
      errors: [],
    })
    expect(new Set(authorityEvidenceRegistry.map((item) => item.id)).size).toBe(
      authorityEvidenceRegistry.length,
    )
    expect(approvedHistoricalOrganisations).toEqual([
      'White & Case', 'Clifford Chance', 'Bird & Bird', 'CMS Cameron McKenna',
      'IBM', 'Johnson & Johnson', 'Coca-Cola', 'Zentiva', 'J&T Bank',
      'Komerční banka', 'LBBW Bank', 'Orco Property Group', 'Wolf Theiss',
      'KPMG Legal', 'DLA Piper',
    ])
    expect(approvedTestimonials).toHaveLength(2)

    const substituted = structuredClone(authorityEvidenceRegistry)
    substituted[0].permissionStatus = 'missing' as 'approved'
    expect(() =>
      buildAuthorityEvidenceViewModel(
        productionAuthorityRegistry[0],
        productionAuthorityRegistry,
        substituted,
      ),
    ).toThrow('registries are invalid')
    expect(() =>
      buildAuthorityEvidenceViewModel(
        { ...productionAuthorityRegistry[0] },
        productionAuthorityRegistry,
        authorityEvidenceRegistry,
      ),
    ).toThrow('exact production registry record')
  })

  it('renders exact testimonials, localized evidence, and no rating schema', () => {
    for (const record of productionAuthorityRegistry) {
      const evidence = getAuthorityEvidenceViewModel(record.page.locale)
      expect(evidence.testimonials.items).toEqual(approvedTestimonials)
      expect(evidence.caseStudy.href).toBe(
        record.page.locale === 'en'
          ? '/case-studies/general-counsel-fintech'
          : `/${record.page.locale}/case-studies/general-counsel-fintech`,
      )
      const html = renderToStaticMarkup(
        createElement(ProductionAuthorityPage, {
          viewModel: getProductionAuthorityViewModel(record.page.locale),
          evidence,
        }),
      )
      expect(html.match(/<blockquote lang="en"/g)).toHaveLength(2)
      expect(html).not.toMatch(
        /"@type":"(?:Review|AggregateRating|Rating)"/,
      )
      expect(html).not.toMatch(/trusted by|our clients|current client/i)
      const evidenceKinds = [
        'operating-history',
        'organisation-reference',
        'testimonial',
        'case-study',
        'methodology',
      ]
      const positions = evidenceKinds.map((kind) =>
        html.indexOf(`data-evidence-kind="${kind}"`),
      )
      expect(positions).toEqual([...positions].sort((a, b) => a - b))
    }
  })

  it('validates the complete governed relationship graph', () => {
    expect(validateProductionAuthorityRelationships()).toEqual({
      valid: true,
      errors: [],
    })
    expect(new Set(productionAuthorityRelationships.map((item) => item.id)).size)
      .toBe(productionAuthorityRelationships.length)

    for (const record of productionAuthorityRegistry) {
      const relationships = productionAuthorityRelationships.filter(
        (item) => item.sourcePageId === record.page.id,
      )
      expect(relationships).toHaveLength(17)
      expect(relationships.filter((item) => item.relationship === 'faq')).toHaveLength(7)
      expect(relationships.filter((item) => item.relationship === 'related-practice')).toHaveLength(2)
      expect(relationships.filter((item) => item.relationship === 'related-industry')).toHaveLength(2)
      expect(relationships.filter((item) => item.relationship === 'case-study')).toHaveLength(1)
      expect(relationships.filter((item) => item.relationship === 'methodology')).toHaveLength(1)
      expect(relationships.filter((item) => item.relationship === 'contact')).toHaveLength(1)
      expect(relationships.filter((item) => item.relationship === 'candidate-path')).toHaveLength(1)
      expect(getProductionAuthorityViewModel(record.page.locale).related.links).toHaveLength(5)
    }
  })

  it('rejects duplicate and unresolved relationship targets', () => {
    const invalid = [...structuredClone(productionAuthorityRelationships)]
    invalid.push({ ...invalid[0] })
    invalid[1].target = { kind: 'route', routeId: 'route:missing' }
    const result = validateAuthorityRelationships(invalid, productionAuthorityRegistry)
    expect(result.valid).toBe(false)
    expect(result.errors.join(' ')).toMatch(
      /Duplicate relationship ID|Duplicate relationship edge/,
    )
    expect(result.errors.join(' ')).toContain('Unresolved canonical route')
  })
})
