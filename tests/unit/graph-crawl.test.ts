import { describe, expect, it } from 'vitest'
import {
  checkForbiddenStructuredData,
  checkHreflangOnNonCanonicalPage,
  checkOrganizationConsistency,
  extractCanonical,
  extractHreflangLinks,
  extractRobotsNoindex,
  heroImageAltOk,
  isGraphCrawlClean,
  type GraphCrawlReport,
} from '@/lib/seo/graph-crawl'
import { organizationSchema } from '@/lib/structured-data'

function cleanTotals(): GraphCrawlReport['totals'] {
  return {
    inventoryUrls: 102,
    rendered200: 102,
    unexpected3xx: 0,
    unexpected4xx: 0,
    hreflangLinksChecked: 300,
    uniqueHreflangTargetsChecked: 102,
    brokenHreflangTargets: 0,
    redirectingHreflangTargets: 0,
    duplicateLanguages: 0,
    missingReciprocal: 0,
    invalidXDefault: 0,
    canonicalMismatch: 0,
    noindexInSitemap: 0,
    discoveredFirstPartyLinks: 110,
    invalidInternalLinks: 0,
    jsonLdUrlMismatches: 0,
    heroImageAltViolations: 0,
    unknownRouteViolations: 0,
    crawlableUrlExpansionRatio: 1.08,
    entityConsistencyViolations: 0,
    forbiddenStructuredData: 0,
    orphanPages: 0,
    hreflangOnNonCanonicalPage: 0,
  }
}

function emptyFindings(): GraphCrawlReport['findings'] {
  return {
    unexpectedStatus: [],
    brokenHreflangTargets: [],
    redirectingHreflangTargets: [],
    duplicateLanguages: [],
    missingReciprocal: [],
    invalidXDefault: [],
    canonicalMismatch: [],
    noindexInSitemap: [],
    invalidInternalLinks: [],
    jsonLdUrlMismatches: [],
    heroImageAltViolations: [],
    unknownRouteViolations: [],
    entityConsistencyViolations: [],
    forbiddenStructuredData: [],
    orphanPages: [],
    hreflangOnNonCanonicalPage: [],
  }
}

describe('isGraphCrawlClean', () => {
  it('passes an all-zero report', () => {
    expect(isGraphCrawlClean({ totals: cleanTotals(), findings: emptyFindings() })).toBe(true)
  })

  it.each([
    'unexpected3xx',
    'unexpected4xx',
    'brokenHreflangTargets',
    'redirectingHreflangTargets',
    'duplicateLanguages',
    'missingReciprocal',
    'invalidXDefault',
    'canonicalMismatch',
    'noindexInSitemap',
    'invalidInternalLinks',
    'jsonLdUrlMismatches',
    'heroImageAltViolations',
    'unknownRouteViolations',
    'entityConsistencyViolations',
    'forbiddenStructuredData',
    'orphanPages',
    'hreflangOnNonCanonicalPage',
  ] as const)('fails when %s is nonzero', (field) => {
    const totals = cleanTotals()
    totals[field] = 1
    expect(isGraphCrawlClean({ totals, findings: emptyFindings() })).toBe(false)
  })

  it('fails when crawlable URL expansion exceeds 1.25x the authoritative inventory', () => {
    const totals = cleanTotals()
    totals.crawlableUrlExpansionRatio = 1.3
    expect(isGraphCrawlClean({ totals, findings: emptyFindings() })).toBe(false)
  })

  it('allows expansion right at the 1.25x boundary', () => {
    const totals = cleanTotals()
    totals.crawlableUrlExpansionRatio = 1.25
    expect(isGraphCrawlClean({ totals, findings: emptyFindings() })).toBe(true)
  })
})

describe('extractCanonical', () => {
  it('reads the canonical href', () => {
    const html = '<head><link rel="canonical" href="https://www.bsolution.eu/services" /></head>'
    expect(extractCanonical(html)).toBe('https://www.bsolution.eu/services')
  })

  it('returns null when absent', () => {
    expect(extractCanonical('<head></head>')).toBeNull()
  })
})

describe('extractRobotsNoindex', () => {
  it('detects noindex', () => {
    expect(extractRobotsNoindex('<meta name="robots" content="noindex, follow" />')).toBe(true)
  })

  it('does not false-positive on index,follow', () => {
    expect(extractRobotsNoindex('<meta name="robots" content="index, follow" />')).toBe(false)
  })

  it('treats a missing robots meta as indexable (site default)', () => {
    expect(extractRobotsNoindex('<head></head>')).toBe(false)
  })
})

describe('extractHreflangLinks', () => {
  it('parses a reciprocal cluster: genuine translation (en/cs case study)', () => {
    const html = [
      '<link rel="canonical" href="https://www.bsolution.eu/case-studies/general-counsel-fintech" />',
      '<link rel="alternate" hreflang="en" href="https://www.bsolution.eu/case-studies/general-counsel-fintech" />',
      '<link rel="alternate" hreflang="cs" href="https://www.bsolution.eu/cs/case-studies/general-counsel-fintech" />',
      '<link rel="alternate" hreflang="de" href="https://www.bsolution.eu/de/case-studies/general-counsel-fintech" />',
      '<link rel="alternate" hreflang="pl" href="https://www.bsolution.eu/pl/case-studies/general-counsel-fintech" />',
      '<link rel="alternate" hreflang="x-default" href="https://www.bsolution.eu/case-studies/general-counsel-fintech" />',
    ].join('\n')
    const links = extractHreflangLinks(html)
    expect(links).toHaveLength(5)
    expect(links.filter((l) => l.lang !== 'x-default')).toHaveLength(4)
  })

  it('parses an untranslated-fallback cluster: position page omits de/pl entirely', () => {
    const html = [
      '<link rel="canonical" href="https://www.bsolution.eu/positions/general-counsel-prague" />',
      '<link rel="alternate" hreflang="en" href="https://www.bsolution.eu/positions/general-counsel-prague" />',
      '<link rel="alternate" hreflang="cs" href="https://www.bsolution.eu/cs/positions/general-counsel-prague" />',
      '<link rel="alternate" hreflang="x-default" href="https://www.bsolution.eu/positions/general-counsel-prague" />',
    ].join('\n')
    const links = extractHreflangLinks(html).filter((l) => l.lang !== 'x-default')
    expect(links.map((l) => l.lang).sort()).toEqual(['cs', 'en'])
    expect(links.some((l) => l.lang === 'de' || l.lang === 'pl')).toBe(false)
  })

  it('detects a duplicate-language cluster (regression fixture)', () => {
    const html = [
      '<link rel="alternate" hreflang="en" href="https://www.bsolution.eu/services" />',
      '<link rel="alternate" hreflang="en" href="https://www.bsolution.eu/services/legal-executive-search" />',
    ].join('\n')
    const links = extractHreflangLinks(html)
    const langs = links.map((l) => l.lang)
    expect(langs.filter((l) => l === 'en')).toHaveLength(2)
  })

  it('returns an empty array when no hreflang is rendered', () => {
    expect(extractHreflangLinks('<head></head>')).toEqual([])
  })
})

describe('checkHreflangOnNonCanonicalPage (2026-08-22 Ahrefs audit: "Hreflang to non-canonical")', () => {
  const SITE = 'https://www.bsolution.eu'

  it('passes a canonical page that declares hreflang on itself', () => {
    const url = `${SITE}/positions`
    const html = [
      `<link rel="canonical" href="${url}" />`,
      `<link rel="alternate" hrefLang="en" href="${url}" />`,
      `<link rel="alternate" hrefLang="cs" href="${SITE}/cs/positions" />`,
    ].join('\n')
    expect(checkHreflangOnNonCanonicalPage(url, extractCanonical(html), html, SITE)).toEqual([])
  })

  it('passes a non-canonical page that correctly declares no hreflang (fixed state)', () => {
    const url = `${SITE}/de/positions`
    const html = `<link rel="canonical" href="${SITE}/positions" />`
    expect(checkHreflangOnNonCanonicalPage(url, extractCanonical(html), html, SITE)).toEqual([])
  })

  it('flags a non-canonical page that still declares hreflang on itself (regression fixture — every /de and /pl positions page before the fix)', () => {
    const url = `${SITE}/de/positions/general-counsel-prague`
    const html = [
      `<link rel="canonical" href="${SITE}/positions/general-counsel-prague" />`,
      `<link rel="alternate" hrefLang="en" href="${SITE}/positions/general-counsel-prague" />`,
      `<link rel="alternate" hrefLang="cs" href="${SITE}/cs/positions/general-counsel-prague" />`,
      `<link rel="alternate" hrefLang="x-default" href="${SITE}/positions/general-counsel-prague" />`,
    ].join('\n')
    const violations = checkHreflangOnNonCanonicalPage(url, extractCanonical(html), html, SITE)
    expect(violations).toHaveLength(1)
    expect(violations[0].detail).toContain('en, cs, x-default')
  })

  it('flags a page with no canonical tag at all that still declares hreflang', () => {
    const url = `${SITE}/pl/positions`
    const html = `<link rel="alternate" hrefLang="en" href="${SITE}/positions" />`
    expect(checkHreflangOnNonCanonicalPage(url, extractCanonical(html), html, SITE)).toHaveLength(1)
  })
})

describe('heroImageAltOk', () => {
  it('accepts a decorative hero image with empty alt', () => {
    const html = '<img src="/_next/image?url=%2Fimages%2Fhero-background.png" alt="" aria-hidden="true" />'
    expect(heroImageAltOk(html)).toBe(true)
  })

  it('flags a hero image missing alt entirely (regression fixture)', () => {
    const html = '<img src="/_next/image?url=%2Fimages%2Fhero-background.png" />'
    expect(heroImageAltOk(html)).toBe(false)
  })

  it('flags a hero image with non-empty alt text (should stay decorative)', () => {
    const html = '<img src="/_next/image?url=%2Fimages%2Fhero-background.png" alt="hero image" />'
    expect(heroImageAltOk(html)).toBe(false)
  })

  it('ignores unrelated images', () => {
    const html = '<img src="/images/logo.png" alt="B Solution" />'
    expect(heroImageAltOk(html)).toBe(true)
  })
})

describe('checkOrganizationConsistency (GEO entity consistency)', () => {
  it('passes a full Organization record matching the authoritative entity', () => {
    expect(checkOrganizationConsistency({ ...organizationSchema })).toEqual([])
  })

  it('ignores an @id-only reference (no name field)', () => {
    expect(checkOrganizationConsistency({ '@id': organizationSchema['@id'] })).toEqual([])
  })

  it('flags a drifted brand name (regression fixture)', () => {
    const violations = checkOrganizationConsistency({ ...organizationSchema, name: 'B Solution Recruitment Ltd' })
    expect(violations.some((v) => v.includes('name'))).toBe(true)
  })

  it('flags a drifted canonical domain', () => {
    const violations = checkOrganizationConsistency({ ...organizationSchema, url: 'https://bsolution.com' })
    expect(violations.some((v) => v.includes('url'))).toBe(true)
  })

  it('flags a drifted logo', () => {
    const violations = checkOrganizationConsistency({ ...organizationSchema, logo: { '@type': 'ImageObject', url: 'https://www.bsolution.eu/images/old-logo.png' } })
    expect(violations.some((v) => v.includes('logo'))).toBe(true)
  })
})

describe('checkForbiddenStructuredData (GEO claims audit)', () => {
  it('allows ordinary structured-data types', () => {
    expect(checkForbiddenStructuredData({ '@type': 'Service', name: 'Legal Executive Search' })).toEqual([])
  })

  it.each(['AggregateRating', 'Review', 'Rating'])('flags fabricated %s data (regression fixture)', (type) => {
    expect(checkForbiddenStructuredData({ '@type': type, ratingValue: 5 })).toHaveLength(1)
  })

  it('flags a JobPosting missing required factual fields (regression fixture)', () => {
    const violations = checkForbiddenStructuredData({ '@type': 'JobPosting', title: 'General Counsel' })
    expect(violations).toHaveLength(1)
    expect(violations[0]).toContain('datePosted')
  })

  it('allows a JobPosting that carries every required field', () => {
    const violations = checkForbiddenStructuredData({
      '@type': 'JobPosting',
      title: 'General Counsel',
      description: 'Lead the legal function.',
      datePosted: '2026-08-01',
      hiringOrganization: { '@type': 'Organization', name: 'A confidential client' },
      jobLocation: { '@type': 'Place', address: 'Prague' },
    })
    expect(violations).toEqual([])
  })
})
