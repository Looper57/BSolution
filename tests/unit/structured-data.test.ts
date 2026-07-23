import { describe, expect, it } from 'vitest'
import {
  STRUCTURED_DATA_IDS,
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildFaqPageSchema,
  buildServiceSchema,
  globalStructuredData,
  serializeJsonLd,
} from '@/lib/structured-data'

describe('structured data', () => {
  it('defines one verified Organization with stable references', () => {
    const organizations = globalStructuredData['@graph'].filter(
      (entity) => entity['@type'] === 'Organization',
    )

    expect(organizations).toHaveLength(1)
    expect(organizations[0]).toMatchObject({
      '@id': STRUCTURED_DATA_IDS.organization,
      name: 'B Solution s.r.o.',
      foundingDate: '2007',
      url: 'https://www.bsolution.eu',
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'recruitment',
      },
    })
    expect(JSON.stringify(organizations[0])).not.toContain('customer service')
  })

  it('connects the verified Person to the Organization', () => {
    const person = globalStructuredData['@graph'].find(
      (entity) => entity['@type'] === 'Person',
    )

    expect(person).toEqual({
      '@type': 'Person',
      '@id': STRUCTURED_DATA_IDS.person,
      name: 'Lukáš Benátčan',
      worksFor: { '@id': STRUCTURED_DATA_IDS.organization },
    })
  })

  it('defines the ProfessionalService offering without unsupported claims', () => {
    const service = globalStructuredData['@graph'].find(
      (entity) => entity['@type'] === 'ProfessionalService',
    )

    expect(service).toMatchObject({
      '@id': STRUCTURED_DATA_IDS.professionalService,
      parentOrganization: { '@id': STRUCTURED_DATA_IDS.organization },
      serviceType: expect.arrayContaining([
        'Executive Search',
        'Legal Executive Search',
        'Cross-border recruitment',
        'Law firm recruitment',
        'In-house counsel recruitment',
      ]),
    })
  })

  it('builds a Service and BreadcrumbList with stable entity links', () => {
    const url = 'https://www.bsolution.eu/services/legal-executive-search'
    const service = buildServiceSchema({
      name: 'Legal Executive Search',
      description: 'A verified service description.',
      url,
      locale: 'en',
    })
    const breadcrumbs = buildBreadcrumbSchema(url, [
      { name: 'Home', item: 'https://www.bsolution.eu/' },
      { name: 'Services', item: 'https://www.bsolution.eu/services' },
      { name: 'Legal Executive Search', item: url },
    ])

    expect(service).toMatchObject({
      '@type': 'Service',
      '@id': `${url}#service`,
      provider: { '@id': STRUCTURED_DATA_IDS.organization },
    })
    expect(breadcrumbs.itemListElement.map((item) => item.position)).toEqual([1, 2, 3])
  })

  it('builds FAQPage only from supplied visible FAQ content', () => {
    expect(buildFaqPageSchema('https://www.bsolution.eu/example', [])).toBeNull()
    expect(
      buildFaqPageSchema('https://www.bsolution.eu/example', [
        { question: 'A visible question?', answer: 'A visible answer.' },
      ]),
    ).toMatchObject({
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'A visible question?',
          acceptedAnswer: { '@type': 'Answer', text: 'A visible answer.' },
        },
      ],
    })
  })

  it('retains Article schema for real case-study pages and safely serializes hostile input', () => {
    const article = buildArticleSchema({
      name: 'Case study',
      description: 'A visible case study.',
      url: 'https://www.bsolution.eu/case-studies/example',
      locale: 'en',
    })
    const hostileValue = '</script><script>alert("x")</script>'
    const serialized = serializeJsonLd({ value: hostileValue })

    expect(article['@type']).toBe('Article')
    expect(serialized).not.toContain('</script>')
    expect(serialized).toContain('\\u003c')
    expect(JSON.parse(serialized)).toEqual({ value: hostileValue })
  })
})
