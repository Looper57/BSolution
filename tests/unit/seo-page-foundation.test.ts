import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { SeoAuthorityPageFoundation } from '@/components/seo-authority-page-foundation'
import {
  buildSeoPageMetadata,
  buildSeoPageStructuredData,
  getEligibleInternalLinks,
  getEligibleStructuredData,
  getLocalizedAlternates,
  getPageCanonical,
  getSitemapEligibleSeoPages,
  isPageIndexable,
  isPagePublishable,
  isSeoPageSitemapEligible,
  normalizeCanonicalBasePath,
  validateSeoPageDefinition,
  validateSeoPageRegistry,
  type SeoCanonicalRoute,
  type SeoPageDefinition,
} from '@/lib/seo-pages'
import {
  approvedFixture,
  draftSeoFixtures,
  fixtureCanonicalRoutes,
} from '@/tests/fixtures/seo-pages'

const serviceDraft = draftSeoFixtures[0]

function approved(
  fixture: SeoPageDefinition = serviceDraft,
  overrides: Partial<SeoPageDefinition> = {},
): SeoPageDefinition {
  return { ...approvedFixture(fixture), ...overrides }
}

function validationCodes(
  pages: readonly SeoPageDefinition[],
  routes: readonly SeoCanonicalRoute[] = fixtureCanonicalRoutes,
) {
  return validateSeoPageRegistry(pages, routes).errors.map((error) => error.code)
}

describe('SEO authority-page publication gates', () => {
  it('keeps every non-approved lifecycle state unpublished and outside the sitemap', () => {
    for (const status of ['draft', 'evidence-required', 'owner-review', 'archived'] as const) {
      const page: SeoPageDefinition = {
        ...serviceDraft,
        publicationStatus: status,
        archiveAction: status === 'archived' ? 'noindex' : undefined,
      }
      expect(isPagePublishable(page, [page], fixtureCanonicalRoutes)).toBe(false)
      expect(isPageIndexable(page, [page], fixtureCanonicalRoutes)).toBe(false)
      expect(isSeoPageSitemapEligible(page, [page], fixtureCanonicalRoutes)).toBe(false)
    }
  })

  it('requires an exact registry record and rejects same-ID substitution', () => {
    const registered = approved()
    const substituted = { ...registered, h1: 'Substituted content' }

    expect(isPagePublishable(registered, [registered], fixtureCanonicalRoutes)).toBe(true)
    expect(isPagePublishable(substituted, [registered], fixtureCanonicalRoutes)).toBe(false)
    expect(buildSeoPageMetadata(substituted, [registered], fixtureCanonicalRoutes).robots).toEqual({
      index: false,
      follow: true,
    })
    expect(getEligibleStructuredData(substituted, [registered], fixtureCanonicalRoutes)).toEqual([])
  })

  it('rejects approved incomplete and conflicting evidence states', () => {
    const incomplete = approved()
    incomplete.sections = []
    expect(isPagePublishable(incomplete, [incomplete], fixtureCanonicalRoutes)).toBe(false)

    const pendingEvidence = approved(serviceDraft, {
      evidence: { status: 'required', requirements: ['Pending proof'] },
    })
    expect(validationCodes([pendingEvidence])).toContain('evidence-not-approved')
    expect(isPagePublishable(pendingEvidence, [pendingEvidence], fixtureCanonicalRoutes)).toBe(false)

    const inconsistent = approved(serviceDraft, {
      evidence: { status: 'not-required', requirements: ['Contradictory proof'] } as unknown as SeoPageDefinition['evidence'],
    })
    expect(validationCodes([inconsistent])).toContain('inconsistent-evidence-state')
  })

  it('does not expose a preview bypass in the production renderer', () => {
    expect(() => renderToStaticMarkup(createElement(
      SeoAuthorityPageFoundation,
      {
        page: serviceDraft,
        registry: [serviceDraft],
        canonicalRoutes: fixtureCanonicalRoutes,
        internalPreview: true,
      } as Parameters<typeof SeoAuthorityPageFoundation>[0] & { internalPreview: boolean },
    ))).toThrow('not approved for public rendering')
  })
})

describe('canonical and parent validation', () => {
  it('normalizes only clean unprefixed canonical base paths', () => {
    expect(normalizeCanonicalBasePath('/services/example')).toBe('/services/example')
    for (const unsafe of [
      '//external.example/path',
      '/services//example',
      '/services/%2e%2e/about',
      '/services/../about',
      '/de/services/example',
      '/services/example?preview=1',
      '/services/example#section',
      '/services/example/',
    ]) {
      expect(normalizeCanonicalBasePath(unsafe)).toBeNull()
    }
  })

  it('rejects malformed paths, duplicated locale prefixes, and slug divergence', () => {
    for (const basePath of [
      '/services//internal-service-test',
      '/services/%2e%2e/internal-service-test',
      '/de/services/internal-service-test',
      '/services/different-slug',
    ]) {
      const page = approved(serviceDraft, {
        basePath,
        canonical: getPageCanonical({ locale: 'en', basePath }),
      })
      expect(validateSeoPageDefinition(page, fixtureCanonicalRoutes).valid).toBe(false)
    }
  })

  it('rejects self-parent, unpublished parent, cross-locale parent, and parent cycles', () => {
    const parent = approved(serviceDraft, {
      id: 'fixture-parent',
      translationKey: 'fixture-parent',
      slug: 'parent',
      basePath: '/services/parent',
      canonical: 'https://www.bsolution.eu/services/parent',
      title: 'Fixture parent',
      h1: 'Fixture parent',
    })
    const child = approved(serviceDraft, {
      id: 'fixture-child',
      translationKey: 'fixture-child',
      slug: 'child',
      basePath: '/services/parent/child',
      canonical: 'https://www.bsolution.eu/services/parent/child',
      title: 'Fixture child',
      h1: 'Fixture child',
      parent: { target: { kind: 'page', pageId: parent.id }, locale: 'en', label: 'Fixture parent' },
    })
    expect(validateSeoPageRegistry([parent, child], fixtureCanonicalRoutes).valid).toBe(true)

    const selfParent = { ...parent, parent: { target: { kind: 'page' as const, pageId: parent.id }, locale: 'en' as const, label: 'Self' } }
    expect(validationCodes([selfParent])).toEqual(expect.arrayContaining(['self-parent', 'circular-parent']))

    const draftParent = { ...parent, publicationStatus: 'draft' as const, approval: { status: 'pending' as const }, indexationRequested: false }
    expect(validationCodes([draftParent, child])).toContain('unpublished-parent')

    const crossLocale = { ...parent, locale: 'de' as const, contentLocale: 'de' as const }
    expect(validationCodes([crossLocale, child])).toContain('cross-locale-parent')

    const cyclicParent = { ...parent, parent: { target: { kind: 'page' as const, pageId: child.id }, locale: 'en' as const, label: 'Child' } }
    expect(validationCodes([cyclicParent, child])).toContain('circular-parent')
  })
})

describe('CTA and internal-link safety', () => {
  it('rejects unknown, external-shaped, query, and locale-dropping primary CTA targets', () => {
    for (const target of [
      { kind: 'route', routeId: 'https://external.example' },
      { kind: 'route', routeId: '//external.example' },
      { kind: 'route', routeId: 'contact-en?preview=1' },
      { kind: 'route', routeId: 'contact-de' },
    ] as SeoPageDefinition['primaryCta']['target'][]) {
      const page = approved(serviceDraft, {
        primaryCta: { ...serviceDraft.primaryCta, target },
      })
      expect(validationCodes([page])).toContain('invalid-cta-destination')
    }
  })

  it('validates secondary CTAs and rejects unpublished page destinations', () => {
    const draftTarget = draftSeoFixtures[4]
    const source = approved(serviceDraft, {
      secondaryCtas: [{
        id: 'unsafe-secondary',
        locale: 'en',
        label: 'Unsafe',
        target: { kind: 'page', pageId: draftTarget.id },
        audience: 'candidate',
        style: 'secondary',
      }],
    })
    expect(validationCodes([source, draftTarget])).toContain('unpublished-cta-destination')

    const externalShaped = approved(serviceDraft, {
      secondaryCtas: [{
        id: 'external-secondary',
        locale: 'en',
        label: 'Unsafe external target',
        target: { kind: 'route', routeId: '//external.example' },
        audience: 'general',
        style: 'secondary',
      }],
    })
    expect(validationCodes([externalShaped])).toContain('invalid-cta-destination')
  })

  it('rejects duplicate link IDs, duplicate targets, self-links, and link cycles', () => {
    const target = approved(serviceDraft, {
      id: 'fixture-link-target',
      translationKey: 'fixture-link-target',
      slug: 'link-target',
      basePath: '/services/link-target',
      canonical: 'https://www.bsolution.eu/services/link-target',
      title: 'Link target',
      h1: 'Link target',
    })
    const source = approved(serviceDraft, {
      id: 'fixture-link-source',
      translationKey: 'fixture-link-source',
      slug: 'link-source',
      basePath: '/services/link-source',
      canonical: 'https://www.bsolution.eu/services/link-source',
      title: 'Link source',
      h1: 'Link source',
      internalLinks: [
        {
          id: 'duplicate',
          locale: 'en',
          target: { kind: 'page', pageId: target.id },
          relationship: 'related-service',
          anchorText: 'Target',
          purpose: 'Test target',
        },
        {
          id: 'duplicate',
          locale: 'en',
          target: { kind: 'page', pageId: target.id },
          relationship: 'related-service',
          anchorText: 'Target again',
          purpose: 'Duplicate target',
        },
        {
          id: 'self',
          locale: 'en',
          target: { kind: 'page', pageId: 'fixture-link-source' },
          relationship: 'related-service',
          anchorText: 'Self',
          purpose: 'Self target',
        },
      ],
    })
    expect(validationCodes([source, target])).toEqual(expect.arrayContaining([
      'duplicate-link-id',
      'duplicate-link-target',
      'self-link',
    ]))

    const cyclicTarget = {
      ...target,
      internalLinks: [{
        id: 'back-to-source',
        locale: 'en' as const,
        target: { kind: 'page' as const, pageId: source.id },
        relationship: 'related-service' as const,
        anchorText: 'Source',
        purpose: 'Create a cycle',
      }],
    }
    expect(validationCodes([{ ...source, internalLinks: [source.internalLinks[0]] }, cyclicTarget])).toContain('circular-link')
  })

  it('resolves links only through a complete canonical registry', () => {
    const source = approved(serviceDraft, {
      internalLinks: [{
        id: 'contact',
        locale: 'en',
        target: { kind: 'route', routeId: 'contact-en' },
        relationship: 'contact',
        anchorText: 'Contact',
        purpose: 'Canonical contact route',
      }],
    })
    expect(getEligibleInternalLinks(source, [source], fixtureCanonicalRoutes)).toEqual([
      expect.objectContaining({ href: '/contact' }),
    ])
    expect(getEligibleInternalLinks(source, [source], [])).toEqual([])
  })
})

describe('localization, metadata, and hreflang safety', () => {
  function localizedService(
    locale: 'en' | 'de',
    translationKey = 'fixture-localized-service',
  ): SeoPageDefinition {
    const routeId = locale === 'en' ? 'services-en' : 'services-de'
    return approved(serviceDraft, {
      id: `fixture-service-${locale}-localized`,
      translationKey,
      locale,
      contentLocale: locale,
      slug: 'localized-service',
      basePath: '/services/localized-service',
      canonical: getPageCanonical({ locale, basePath: '/services/localized-service' }),
      title: locale === 'de' ? 'Lokalisierter Dienst' : 'Localized service',
      metaDescription: locale === 'de' ? 'Lokalisierte Beschreibung.' : 'Localized description.',
      h1: locale === 'de' ? 'Lokalisierter Dienst' : 'Localized service',
      proposition: locale === 'de' ? 'Lokalisierter Vorschlag.' : 'Localized proposition.',
      audience: locale === 'de' ? 'Deutsche Zielgruppe' : 'English audience',
      searchIntent: locale === 'de' ? 'Deutsche Suchabsicht' : 'English search intent',
      sections: [{
        id: `localized-${locale}`,
        locale,
        type: 'capability-overview',
        heading: locale === 'de' ? 'Lokalisierter Abschnitt' : 'Localized section',
        paragraphs: [locale === 'de' ? 'Deutscher Inhalt.' : 'English content.'],
      }],
      primaryCta: {
        ...serviceDraft.primaryCta,
        id: `localized-cta-${locale}`,
        locale,
        label: locale === 'de' ? 'Kontakt' : 'Contact',
        target: { kind: 'route', routeId: `contact-${locale}` },
      },
      parent: {
        target: { kind: 'route', routeId },
        locale,
        label: locale === 'de' ? 'Leistungen' : 'Services',
      },
      rendererLabels: {
        locale,
        breadcrumbNavigation: locale === 'de' ? 'Brotkrümelnavigation' : 'Breadcrumb navigation',
        home: 'B Solution',
        related: locale === 'de' ? 'Verwandte Seiten' : 'Related',
        additionalActions: locale === 'de' ? 'Weitere Aktionen' : 'Additional actions',
      },
    })
  }

  const germanRoutes: SeoCanonicalRoute[] = [
    ...fixtureCanonicalRoutes,
    { id: 'services-de', locale: 'de', basePath: '/services', kind: 'service-hub' },
  ]

  it('emits hreflang only for validated equivalents', () => {
    const english = localizedService('en')
    const german = localizedService('de')
    expect(getLocalizedAlternates(german, [english, german], germanRoutes)).toEqual({
      en: english.canonical,
      de: german.canonical,
      'x-default': english.canonical,
    })
  })

  it('keeps an approved locale publishable while excluding its unapproved translation', () => {
    const english = localizedService('en')
    const germanApproved = localizedService('de')
    const germanDraft: SeoPageDefinition = {
      ...germanApproved,
      publicationStatus: 'draft',
      approval: { status: 'pending' },
      evidence: { status: 'required', requirements: ['Pending localized approval'] },
      indexationRequested: false,
    }

    expect(validateSeoPageRegistry([english, germanDraft], germanRoutes).valid).toBe(true)
    expect(getLocalizedAlternates(english, [english, germanDraft], germanRoutes)).toEqual({
      en: english.canonical,
      'x-default': english.canonical,
    })
  })

  it('rejects unrelated pages colliding on a translation key', () => {
    const english = localizedService('en')
    const german = { ...localizedService('de'), ownerKey: 'different-owner' }
    expect(validationCodes([english, german], germanRoutes)).toContain('translation-group-collision')
    expect(getLocalizedAlternates(english, [english, german], germanRoutes)).toEqual({})
  })

  it('requires registry-backed metadata and excludes missing translations', () => {
    const english = localizedService('en')
    const metadata = buildSeoPageMetadata(english, [english], germanRoutes)
    expect(metadata.alternates?.languages).toEqual({
      en: english.canonical,
      'x-default': english.canonical,
    })

    const clone = { ...english }
    expect(buildSeoPageMetadata(clone, [english], germanRoutes).alternates).toBeUndefined()
  })

  it('rejects declared content, section, CTA, and renderer locale mismatches', () => {
    const page = approved(serviceDraft, {
      contentLocale: 'de',
      sections: [{ ...serviceDraft.sections[0], locale: 'de' }],
      primaryCta: { ...serviceDraft.primaryCta, locale: 'de' },
      rendererLabels: { ...serviceDraft.rendererLabels, locale: 'de' },
    })
    expect(validationCodes([page])).toEqual(expect.arrayContaining([
      'content-locale-mismatch',
      'section-locale-mismatch',
      'cta-locale-mismatch',
      'renderer-label-locale-mismatch',
    ]))
  })
})

describe('sitemap and structured-data gates', () => {
  it('includes only exact approved, valid, indexable registry records', () => {
    const page = approved()
    expect(getSitemapEligibleSeoPages([page], fixtureCanonicalRoutes)).toEqual([page])
    expect(isSeoPageSitemapEligible({ ...page }, [page], fixtureCanonicalRoutes)).toBe(false)
  })

  it('rejects duplicate page identities and canonicals', () => {
    const page = approved()
    expect(validationCodes([page, { ...page }])).toEqual(expect.arrayContaining([
      'duplicate-page-id',
      'duplicate-canonical',
      'duplicate-locale-path',
    ]))
    expect(() => getSitemapEligibleSeoPages([page, { ...page }], fixtureCanonicalRoutes)).toThrow('Invalid SEO page registry')
  })

  it('rejects duplicate schema requests and unsupported schema injection', () => {
    const duplicate = approved(serviceDraft, {
      structuredData: {
        requested: ['WebPage', 'WebPage', 'Service'],
        describesVisibleService: true,
      },
    })
    expect(validationCodes([duplicate])).toContain('duplicate-schema-request')

    const location = {
      ...approved(draftSeoFixtures[2]),
      structuredData: { requested: ['WebPage', 'LocalBusiness'], describesVisibleService: false },
    } as unknown as SeoPageDefinition
    const candidate = {
      ...approved(draftSeoFixtures[4]),
      structuredData: { requested: ['WebPage', 'JobPosting'], describesVisibleService: false },
    } as unknown as SeoPageDefinition
    expect(validationCodes([location])).toContain('unsupported-schema')
    expect(validationCodes([candidate])).toContain('unsupported-schema')
  })

  it('requires registry-backed schema and preserves visible breadcrumb labels', () => {
    const page = approved()
    expect(getEligibleStructuredData({ ...page }, [page], fixtureCanonicalRoutes)).toEqual([])

    const graph = buildSeoPageStructuredData(page, [page], fixtureCanonicalRoutes)?.['@graph'] ?? []
    const breadcrumb = graph.find((node) => node['@type'] === 'BreadcrumbList') as
      | { itemListElement: Array<{ name: string; item: string }> }
      | undefined
    expect(breadcrumb?.itemListElement).toEqual([
      expect.objectContaining({ name: page.rendererLabels.home, item: 'https://www.bsolution.eu/' }),
      expect.objectContaining({ name: page.parent.label, item: 'https://www.bsolution.eu/services' }),
      expect.objectContaining({ name: page.h1, item: page.canonical }),
    ])
  })

  it('does not emit Service for practice/location or employment/FAQ schema for candidate pages', () => {
    for (const fixture of draftSeoFixtures.filter((page) => ['practice-area', 'location', 'candidate-intent'].includes(page.pageType))) {
      const page = approved(fixture)
      const serialized = JSON.stringify(buildSeoPageStructuredData(page, [page], fixtureCanonicalRoutes))
      expect(serialized).not.toContain('"Service"')
      expect(serialized).not.toContain('LocalBusiness')
      expect(serialized).not.toContain('JobPosting')
      expect(serialized).not.toContain('FAQPage')
    }
  })
})

describe('foundation component rendering', () => {
  it('renders exactly one H1, supplied sections, and validated CTAs', () => {
    const page = approved(serviceDraft, {
      secondaryCtas: [{
        id: 'candidate-action',
        locale: 'en',
        label: 'Candidate route',
        target: { kind: 'route', routeId: 'candidates-en' },
        audience: 'candidate',
        style: 'secondary',
      }],
    })
    const html = renderToStaticMarkup(createElement(SeoAuthorityPageFoundation, {
      page,
      registry: [page],
      canonicalRoutes: fixtureCanonicalRoutes,
    }))
    expect(html.match(/<h1/g)).toHaveLength(1)
    expect(html).toContain(page.sections[0].heading)
    expect(html).toContain('href="/contact"')
    expect(html).toContain('href="/candidates"')
    expect(html).toContain('<nav aria-label="Breadcrumb navigation"')
  })

  it('renders localized breadcrumb, Related, and Additional actions labels without English fallback', () => {
    for (const locale of ['cs', 'de', 'pl'] as const) {
      const fixture = draftSeoFixtures.find((page) => page.locale === locale)!
      const target = approved(fixture, {
        id: `${fixture.id}-target`,
        translationKey: `${fixture.translationKey}-target`,
        slug: `${fixture.slug}-target`,
        basePath: `${fixture.parent.target.kind === 'route' ? fixture.basePath.slice(0, -(fixture.slug.length + 1)) : ''}/${fixture.slug}-target`,
        canonical: getPageCanonical({
          locale,
          basePath: `${fixture.basePath.slice(0, -(fixture.slug.length + 1))}/${fixture.slug}-target`,
        }),
        title: `${fixture.title} target`,
        h1: `${fixture.h1} target`,
      })
      const page = approved(fixture, {
        internalLinks: [{
          id: `${fixture.id}-related`,
          locale,
          target: { kind: 'page', pageId: target.id },
          relationship: 'child',
          anchorText: `${fixture.h1} target`,
          purpose: 'Localized renderer test',
        }],
        secondaryCtas: [{
          id: `${fixture.id}-secondary`,
          locale,
          label: fixture.primaryCta.label,
          target: fixture.primaryCta.target,
          audience: 'general',
          style: 'secondary',
        }],
      })
      const html = renderToStaticMarkup(createElement(SeoAuthorityPageFoundation, {
        page,
        registry: [page, target],
        canonicalRoutes: fixtureCanonicalRoutes,
      }))
      expect(html).toContain(page.rendererLabels.related)
      expect(html).toContain(`<nav aria-label="${page.rendererLabels.breadcrumbNavigation}"`)
      expect(html).toContain(`aria-label="${page.rendererLabels.additionalActions}"`)
      expect(html).not.toContain('aria-label="Breadcrumb navigation"')
      expect(html).not.toContain('>Related<')
      expect(html).not.toContain('aria-label="Additional actions"')
    }
  })

  it('rejects a renderer definition that omits the breadcrumb navigation label', () => {
    const page = approved()
    const incompleteLabels = Object.fromEntries(
      Object.entries(page.rendererLabels).filter(([key]) => key !== 'breadcrumbNavigation'),
    )
    const invalid = {
      ...page,
      rendererLabels: incompleteLabels,
    } as unknown as SeoPageDefinition

    expect(validateSeoPageDefinition(invalid, fixtureCanonicalRoutes).errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ code: 'missing-renderer-label' }),
      ]),
    )
  })
})
