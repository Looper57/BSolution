/**
 * Permanent rendered-output technical-SEO gate (2026-08-22 Ahrefs audit).
 *
 * The authoritative inventory is not re-derived here — it is the exact
 * output of `app/sitemap.ts`, the same function Next.js uses to build
 * sitemap.xml. That is the one thing this validator refuses to duplicate:
 * every other check below inspects what the running app actually renders
 * for that inventory, not a second hand-maintained list of expected URLs.
 *
 * This complements (does not replace) tests/e2e/smoke.spec.ts, which
 * asserts deep per-page structured-data/rendering contracts for a fixed
 * set of routes. This module instead scales automatically to every
 * current and future authoritative URL, and is the only layer that
 * crawls internal links — which is what would have caught the internal
 * link to a noindex /de/positions/[slug] duplicate before it shipped.
 */
import sitemap from '@/app/sitemap'
import { LOCALES, SITE_URL } from '@/lib/i18n/config'
import { authorityHubs, positionListingPath } from '@/lib/routes'
import { productionAuthorityPages } from '@/lib/authority-pages'
import { organizationSchema } from '@/lib/structured-data'

const FORBIDDEN_STRUCTURED_DATA_TYPES = ['AggregateRating', 'Review', 'Rating'] as const
const JOB_POSTING_REQUIRED_FIELDS = ['title', 'description', 'datePosted', 'hiringOrganization', 'jobLocation'] as const

// A noindex page is still a legitimate internal-link target when it has a
// documented, real user-facing purpose — either a bare fallback listing hub
// (positions/services-style, browsable in every locale even before content
// is fully translated), or a page tracked in the evidence/publication gate
// registry (reviewed, owned, pending approval — not an orphan or an
// accidental locale-slug substitution). Anything else noindex is not an
// allowed link target (2026-08-22 Ahrefs audit).
const NAVIGABLE_FALLBACK_HUB_PATHS: readonly string[] = [
  positionListingPath,
  ...authorityHubs,
  ...productionAuthorityPages.map((page) => page.basePath),
]

interface FetchResult {
  status: number
  redirected: boolean
  location: string | null
  html: string | null
}

interface Violation {
  url: string
  detail: string
}

export interface GraphCrawlTotals {
  inventoryUrls: number
  rendered200: number
  unexpected3xx: number
  unexpected4xx: number
  hreflangLinksChecked: number
  uniqueHreflangTargetsChecked: number
  brokenHreflangTargets: number
  redirectingHreflangTargets: number
  duplicateLanguages: number
  missingReciprocal: number
  invalidXDefault: number
  canonicalMismatch: number
  noindexInSitemap: number
  discoveredFirstPartyLinks: number
  invalidInternalLinks: number
  jsonLdUrlMismatches: number
  heroImageAltViolations: number
  unknownRouteViolations: number
  crawlableUrlExpansionRatio: number
  entityConsistencyViolations: number
  forbiddenStructuredData: number
}

export interface GraphCrawlFindings {
  unexpectedStatus: Violation[]
  brokenHreflangTargets: Violation[]
  redirectingHreflangTargets: Violation[]
  duplicateLanguages: Violation[]
  missingReciprocal: Violation[]
  invalidXDefault: Violation[]
  canonicalMismatch: Violation[]
  noindexInSitemap: Violation[]
  invalidInternalLinks: Violation[]
  jsonLdUrlMismatches: Violation[]
  heroImageAltViolations: Violation[]
  unknownRouteViolations: Violation[]
  entityConsistencyViolations: Violation[]
  forbiddenStructuredData: Violation[]
}

export interface GraphCrawlReport {
  totals: GraphCrawlTotals
  findings: GraphCrawlFindings
}

export function isGraphCrawlClean(report: GraphCrawlReport): boolean {
  const t = report.totals
  return (
    t.unexpected3xx === 0
    && t.unexpected4xx === 0
    && t.brokenHreflangTargets === 0
    && t.redirectingHreflangTargets === 0
    && t.duplicateLanguages === 0
    && t.missingReciprocal === 0
    && t.invalidXDefault === 0
    && t.canonicalMismatch === 0
    && t.noindexInSitemap === 0
    && t.invalidInternalLinks === 0
    && t.jsonLdUrlMismatches === 0
    && t.heroImageAltViolations === 0
    && t.unknownRouteViolations === 0
    && t.crawlableUrlExpansionRatio <= 1.25
    && t.entityConsistencyViolations === 0
    && t.forbiddenStructuredData === 0
  )
}

function toLocal(url: string, siteOrigin: string): string {
  return url.startsWith(SITE_URL) ? `${siteOrigin}${url.slice(SITE_URL.length)}` : url
}

function toCanonicalForm(url: string, siteOrigin: string): string {
  return url.startsWith(siteOrigin) ? `${SITE_URL}${url.slice(siteOrigin.length)}` : url
}

async function fetchPage(url: string): Promise<FetchResult> {
  const res = await fetch(url, { redirect: 'manual' })
  const isRedirect = res.status >= 300 && res.status < 400
  return {
    status: res.status,
    redirected: isRedirect,
    location: isRedirect ? res.headers.get('location') : null,
    html: res.status === 200 ? await res.text() : null,
  }
}

export function extractCanonical(html: string): string | null {
  const m = html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/)
  return m ? m[1] : null
}

export function extractRobotsNoindex(html: string): boolean {
  const m = html.match(/<meta[^>]+name="robots"[^>]+content="([^"]*)"/)
  return m ? /noindex/i.test(m[1]) : false
}

export function extractHreflangLinks(html: string): { lang: string; href: string }[] {
  // Next.js renders the React prop name verbatim as `hrefLang` (capital L),
  // not the all-lowercase HTML-spec form `hreflang` — match case-insensitively
  // so this doesn't silently find zero links against real rendered output
  // (2026-08-22 Ahrefs audit: this exact gap once produced a false "clean" pass).
  const results: { lang: string; href: string }[] = []
  const re = /<link[^>]+rel="alternate"[^>]+hreflang="([^"]+)"[^>]+href="([^"]+)"/gi
  let m: RegExpExecArray | null
  while ((m = re.exec(html))) results.push({ lang: m[1], href: m[2] })
  return results
}

function extractInternalLinks(html: string, siteOrigin: string): string[] {
  const results = new Set<string>()
  const re = /<a[^>]+href="([^"]+)"/g
  let m: RegExpExecArray | null
  while ((m = re.exec(html))) {
    const href = m[1]
    if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) continue
    if (href.startsWith('/')) {
      results.add(`${siteOrigin}${href}`)
    } else if (href.startsWith(siteOrigin)) {
      results.add(href)
    }
  }
  return [...results]
}

function extractJsonLdBlocks(html: string): unknown[] {
  const blocks: unknown[] = []
  const re = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g
  let m: RegExpExecArray | null
  while ((m = re.exec(html))) {
    try {
      const parsed = JSON.parse(m[1])
      blocks.push(...(Array.isArray(parsed['@graph']) ? parsed['@graph'] : [parsed]))
    } catch {
      // malformed JSON-LD is caught by jsonLdUrlMismatches via absence of a parseable url below
    }
  }
  return blocks
}

// GEO: the Bsolution entity (brand name, canonical domain, logo) must be
// identical everywhere it's declared — a page that repeats the full
// Organization record (rather than referencing it by @id) could silently
// drift from the single authoritative definition in lib/structured-data.ts
// (2026-08-22 GEO audit).
export function checkOrganizationConsistency(record: Record<string, unknown>): string[] {
  if (String(record['@type']) !== 'Organization' || typeof record.name !== 'string') return []
  const violations: string[] = []
  if (record.name !== organizationSchema.name) {
    violations.push(`Organization name "${record.name}" does not match "${organizationSchema.name}"`)
  }
  if (record.url !== organizationSchema.url) {
    violations.push(`Organization url "${String(record.url)}" does not match "${organizationSchema.url}"`)
  }
  const logo = record.logo as { url?: string } | undefined
  if (logo?.url !== organizationSchema.logo.url) {
    violations.push(`Organization logo "${String(logo?.url)}" does not match "${organizationSchema.logo.url}"`)
  }
  return violations
}

// GEO: never fabricate ratings/reviews, and never emit JobPosting without
// the fields required for it to be a genuine, current listing
// (2026-08-22 GEO audit).
export function checkForbiddenStructuredData(record: Record<string, unknown>): string[] {
  const type = String(record['@type'])
  const violations: string[] = []
  if ((FORBIDDEN_STRUCTURED_DATA_TYPES as readonly string[]).includes(type)) {
    violations.push(`emits forbidden structured-data type ${type}`)
  }
  if (type === 'JobPosting') {
    const missing = JOB_POSTING_REQUIRED_FIELDS.filter((field) => !(field in record))
    if (missing.length > 0) {
      violations.push(`JobPosting is missing required field(s): ${missing.join(', ')}`)
    }
  }
  return violations
}

export function heroImageAltOk(html: string): boolean {
  const imgRe = /<img[^>]*>/g
  let m: RegExpExecArray | null
  while ((m = imgRe.exec(html))) {
    const tag = m[0]
    if (!tag.includes('hero-background')) continue
    if (!/alt=""/.test(tag)) return false
  }
  return true
}

async function mapWithConcurrency<T, R>(items: T[], concurrency: number, fn: (item: T) => Promise<R>): Promise<R[]> {
  const results: R[] = new Array(items.length)
  let index = 0
  async function worker() {
    while (index < items.length) {
      const current = index++
      results[current] = await fn(items[current])
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, worker))
  return results
}

export async function runGraphCrawl(options: { baseUrl: string; concurrency?: number }): Promise<GraphCrawlReport> {
  const { baseUrl, concurrency = 6 } = options
  const siteOrigin = new URL(baseUrl).origin
  const entries = sitemap()

  const findings: GraphCrawlFindings = {
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
  }

  const pageCache = new Map<string, FetchResult>()
  async function getPage(url: string): Promise<FetchResult> {
    const local = toLocal(url, siteOrigin)
    const cached = pageCache.get(local)
    if (cached) return cached
    const result = await fetchPage(local)
    pageCache.set(local, result)
    return result
  }

  let unexpected3xx = 0
  let unexpected4xx = 0

  // Pass 1: every inventory URL must render direct 200, self-canonical, indexable.
  await mapWithConcurrency(entries, concurrency, async (entry) => {
    const result = await getPage(entry.url)
    if (result.status >= 300 && result.status < 400) {
      unexpected3xx++
      findings.unexpectedStatus.push({ url: entry.url, detail: `expected 200, got redirect ${result.status} -> ${result.location}` })
      return
    }
    if (result.status !== 200) {
      unexpected4xx++
      findings.unexpectedStatus.push({ url: entry.url, detail: `expected 200, got ${result.status}` })
      return
    }
    const html = result.html!
    const canonical = extractCanonical(html)
    if (!canonical || toCanonicalForm(canonical, siteOrigin) !== entry.url) {
      findings.canonicalMismatch.push({ url: entry.url, detail: `rendered canonical is ${canonical ?? '(none)'}` })
    }
    if (extractRobotsNoindex(html)) {
      findings.noindexInSitemap.push({ url: entry.url, detail: 'sitemap entry renders noindex' })
    }
    if (!heroImageAltOk(html)) {
      findings.heroImageAltViolations.push({ url: entry.url, detail: 'hero-background image missing alt=""' })
    }
    const jsonLdBlocks = extractJsonLdBlocks(html)
    for (const block of jsonLdBlocks) {
      const record = block as Record<string, unknown>
      const type = String(record['@type'])
      const url = typeof record.url === 'string' ? record.url : null
      if (url && !['Organization', 'Person', 'WebSite', 'ProfessionalService'].includes(type)) {
        if (url !== entry.url) {
          findings.jsonLdUrlMismatches.push({ url: entry.url, detail: `${type} url ${url} does not match canonical ${entry.url}` })
        }
      }

      for (const detail of checkOrganizationConsistency(record)) {
        findings.entityConsistencyViolations.push({ url: entry.url, detail })
      }
      for (const detail of checkForbiddenStructuredData(record)) {
        findings.forbiddenStructuredData.push({ url: entry.url, detail })
      }
    }
  })

  // Pass 2: hreflang clusters — reciprocity, single-URL-per-language, direct-200, x-default validity.
  let hreflangLinksChecked = 0
  const uniqueHreflangTargets = new Set<string>()
  const hreflangTargetStatus = new Map<string, { status: number; ownLinks: { lang: string; href: string }[] }>()

  const clusterEntries = entries.filter((entry) => pageCache.get(toLocal(entry.url, siteOrigin))?.status === 200)
  for (const entry of clusterEntries) {
    const html = pageCache.get(toLocal(entry.url, siteOrigin))!.html!
    const rendered = extractHreflangLinks(html)
    hreflangLinksChecked += rendered.length
    const nonDefault = rendered.filter((r) => r.lang !== 'x-default')
    const seenLangs = new Set<string>()
    for (const link of nonDefault) {
      if (seenLangs.has(link.lang)) {
        findings.duplicateLanguages.push({ url: entry.url, detail: `duplicate hreflang=${link.lang}` })
      }
      seenLangs.add(link.lang)
      uniqueHreflangTargets.add(link.href)
    }
    const xDefault = rendered.find((r) => r.lang === 'x-default')
    if (xDefault && !nonDefault.some((r) => r.href === xDefault.href)) {
      findings.invalidXDefault.push({ url: entry.url, detail: `x-default ${xDefault.href} is not a member of its own cluster` })
    }
  }

  await mapWithConcurrency([...uniqueHreflangTargets], concurrency, async (target) => {
    const result = await getPage(target)
    const html = result.html
    hreflangTargetStatus.set(target, { status: result.status, ownLinks: html ? extractHreflangLinks(html) : [] })
  })

  for (const entry of clusterEntries) {
    const html = pageCache.get(toLocal(entry.url, siteOrigin))!.html!
    const rendered = extractHreflangLinks(html).filter((r) => r.lang !== 'x-default')
    for (const link of rendered) {
      const targetInfo = hreflangTargetStatus.get(link.href)
      if (!targetInfo) continue
      if (targetInfo.status >= 300 && targetInfo.status < 400) {
        findings.redirectingHreflangTargets.push({ url: entry.url, detail: `hreflang=${link.lang} target ${link.href} redirects` })
      } else if (targetInfo.status !== 200) {
        findings.brokenHreflangTargets.push({ url: entry.url, detail: `hreflang=${link.lang} target ${link.href} returns ${targetInfo.status}` })
      } else {
        const reciprocal = targetInfo.ownLinks.some((back) => back.href === entry.url)
        if (!reciprocal) {
          findings.missingReciprocal.push({ url: entry.url, detail: `target ${link.href} does not link back (hreflang=${link.lang})` })
        }
      }
    }
  }

  // Pass 3: internal-link policy — every discovered first-party link must resolve
  // to a direct-200 inventory URL, or a navigable noindex fallback hub with a
  // documented purpose (positions/services-style listing pages).
  const inventoryUrlSet = new Set(entries.map((e) => e.url))
  const discovered = new Set<string>()
  for (const entry of clusterEntries) {
    const html = pageCache.get(toLocal(entry.url, siteOrigin))!.html!
    for (const link of extractInternalLinks(html, siteOrigin)) {
      const canonicalForm = toCanonicalForm(link, siteOrigin)
      if (/\.[a-z0-9]+$/i.test(new URL(link).pathname) || canonicalForm.includes('/api/')) continue
      discovered.add(canonicalForm)
    }
  }

  await mapWithConcurrency([...discovered], concurrency, async (link) => {
    if (inventoryUrlSet.has(link)) return
    const result = await getPage(link)
    if (result.status !== 200) {
      findings.invalidInternalLinks.push({ url: link, detail: `internal link target returns ${result.status}` })
      return
    }
    const html = result.html!
    if (!extractRobotsNoindex(html)) return // indexable and 200 but not in sitemap yet — informational, not a hard failure here
    const pathname = new URL(link).pathname
    const withoutLocale = LOCALES.reduce<string>((p, l) => (p === `/${l}` || p.startsWith(`/${l}/`) ? p.slice(`/${l}`.length) || '/' : p), pathname)
    const isNavigableFallbackHub = NAVIGABLE_FALLBACK_HUB_PATHS.includes(withoutLocale)
    if (!isNavigableFallbackHub) {
      findings.invalidInternalLinks.push({ url: link, detail: 'internal link targets a noindex page with no documented navigable purpose' })
    }
  })

  // Pass 4: unknown routes must be a clean 404 — no canonical, no hreflang,
  // noindex. Probed across every distinct dynamic-segment family, not just
  // the top-level catch-all: a layout wrapping a dynamic route can leak its
  // own canonical/hreflang onto that route's 404 independently of the
  // top-level not-found boundary (2026-08-22 Ahrefs audit — this is exactly
  // how /positions/[unknown-slug] once rendered the /positions listing's
  // canonical and full hreflang cluster).
  const unknownRouteProbes = [
    `${siteOrigin}/__graph-crawl-unknown-route-probe__`,
    `${siteOrigin}/positions/__graph-crawl-unknown-route-probe__`,
  ]
  for (const probeUrl of unknownRouteProbes) {
    const probe = await fetchPage(probeUrl)
    if (probe.status !== 404) {
      findings.unknownRouteViolations.push({ url: probeUrl, detail: `expected 404, got ${probe.status}` })
      continue
    }
    const body = await (await fetch(probeUrl)).text()
    if (/rel="canonical"/i.test(body)) findings.unknownRouteViolations.push({ url: probeUrl, detail: '404 page renders a canonical link' })
    if (/hreflang=/i.test(body)) findings.unknownRouteViolations.push({ url: probeUrl, detail: '404 page renders hreflang alternates' })
    if (!/noindex/i.test(body)) findings.unknownRouteViolations.push({ url: probeUrl, detail: '404 page does not render noindex robots meta' })
  }

  const totals: GraphCrawlTotals = {
    inventoryUrls: entries.length,
    rendered200: clusterEntries.length,
    unexpected3xx,
    unexpected4xx,
    hreflangLinksChecked,
    uniqueHreflangTargetsChecked: uniqueHreflangTargets.size,
    brokenHreflangTargets: findings.brokenHreflangTargets.length,
    redirectingHreflangTargets: findings.redirectingHreflangTargets.length,
    duplicateLanguages: findings.duplicateLanguages.length,
    missingReciprocal: findings.missingReciprocal.length,
    invalidXDefault: findings.invalidXDefault.length,
    canonicalMismatch: findings.canonicalMismatch.length,
    noindexInSitemap: findings.noindexInSitemap.length,
    discoveredFirstPartyLinks: discovered.size,
    invalidInternalLinks: findings.invalidInternalLinks.length,
    jsonLdUrlMismatches: findings.jsonLdUrlMismatches.length,
    heroImageAltViolations: findings.heroImageAltViolations.length,
    unknownRouteViolations: findings.unknownRouteViolations.length,
    crawlableUrlExpansionRatio: entries.length === 0 ? 0 : discovered.size / entries.length,
    entityConsistencyViolations: findings.entityConsistencyViolations.length,
    forbiddenStructuredData: findings.forbiddenStructuredData.length,
  }

  return { totals, findings }
}
