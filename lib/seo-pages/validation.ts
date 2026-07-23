import { LOCALES, SITE_URL, absoluteUrl, localizedPath } from '@/lib/i18n/config'
import {
  SEO_CANONICAL_ROUTE_KINDS,
  SEO_LINK_RELATIONSHIPS,
  SEO_PAGE_TYPES,
  SEO_PUBLICATION_STATUSES,
  SEO_SECTION_TYPES,
  SEO_STRUCTURED_DATA_TYPES,
  type SeoCanonicalRoute,
  type SeoNavigationTarget,
  type SeoPageDefinition,
  type SeoValidationError,
  type SeoValidationResult,
} from './types'

const EXPECTED_PARENT_KIND = {
  service: 'service-hub',
  'practice-area': 'practice-area-hub',
  location: 'location-hub',
  'client-intent': 'client-hub',
  'candidate-intent': 'candidate-hub',
} as const

function hasText(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0
}

export function normalizeCanonicalBasePath(value: string): string | null {
  if (!hasText(value) || !value.startsWith('/') || value.startsWith('//')) return null
  if (value.includes('//') || value.includes('?') || value.includes('#') || value.includes('\\')) return null
  if (value !== '/' && value.endsWith('/')) return null

  let decoded: string
  try {
    decoded = decodeURIComponent(value)
  } catch {
    return null
  }
  if (decoded !== value || decoded.includes('/./') || decoded.includes('/../')) return null

  const segments = value.split('/').filter(Boolean)
  if (segments.some((segment) => !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(segment))) return null
  if (segments[0] && LOCALES.includes(segments[0] as (typeof LOCALES)[number])) return null
  return value
}

function findRoute(routeId: string, routes: readonly SeoCanonicalRoute[]): SeoCanonicalRoute | undefined {
  return routes.find((route) => route.id === routeId)
}

export function getCanonicalRouteHref(route: SeoCanonicalRoute): string {
  return localizedPath(route.locale, route.basePath)
}

export function getPageCanonical(page: Pick<SeoPageDefinition, 'locale' | 'basePath'>): string {
  return absoluteUrl(page.locale, page.basePath)
}

export function isExactRegistryRecord(
  page: SeoPageDefinition,
  pages: readonly SeoPageDefinition[],
): boolean {
  return pages.includes(page)
}

function validateCanonicalRoutes(routes: readonly SeoCanonicalRoute[]): SeoValidationError[] {
  const errors: SeoValidationError[] = []
  const ids = new Set<string>()
  const hrefs = new Set<string>()

  for (const route of routes) {
    if (!hasText(route.id) || ids.has(route.id)) {
      errors.push({ code: 'invalid-canonical-route-id', message: `Canonical route ID ${route.id || '(empty)'} is missing or duplicated.` })
    }
    ids.add(route.id)
    if (!LOCALES.includes(route.locale)) {
      errors.push({ code: 'invalid-canonical-route-locale', message: `Canonical route ${route.id} has an unsupported locale.` })
    }
    if (!SEO_CANONICAL_ROUTE_KINDS.includes(route.kind)) {
      errors.push({ code: 'invalid-canonical-route-kind', message: `Canonical route ${route.id} has an unsupported route kind.` })
    }
    if (normalizeCanonicalBasePath(route.basePath) !== route.basePath) {
      errors.push({ code: 'invalid-canonical-route-path', message: `Canonical route ${route.id} has an unsafe base path.` })
    }
    const href = getCanonicalRouteHref(route)
    if (hrefs.has(href)) {
      errors.push({ code: 'duplicate-canonical-route', message: `Canonical route path ${href} is duplicated.` })
    }
    hrefs.add(href)
  }
  return errors
}

function resolveTarget(
  source: SeoPageDefinition,
  target: SeoNavigationTarget,
  pages: readonly SeoPageDefinition[],
  routes: readonly SeoCanonicalRoute[],
): { href: string; page?: SeoPageDefinition } | null {
  if (target.kind === 'route') {
    const route = findRoute(target.routeId, routes)
    if (!route || route.locale !== source.locale) return null
    return { href: getCanonicalRouteHref(route) }
  }
  const page = pages.find((candidate) => candidate.id === target.pageId)
  if (!page || page.locale !== source.locale || page === source) return null
  return { href: localizedPath(page.locale, page.basePath), page }
}

function validateCtaShape(
  page: SeoPageDefinition,
  cta: SeoPageDefinition['primaryCta'],
  label: string,
  errors: SeoValidationError[],
) {
  if (!cta || !hasText(cta.id) || !hasText(cta.label)) {
    errors.push({ code: 'invalid-cta', message: `${label} requires an ID and localized label.`, pageId: page.id })
    return
  }
  if (cta.locale !== page.locale) {
    errors.push({ code: 'cta-locale-mismatch', message: `${label} must use locale ${page.locale}.`, pageId: page.id })
  }
  if (!cta.target || !['page', 'route'].includes(cta.target.kind)) {
    errors.push({ code: 'invalid-cta-target', message: `${label} has an unsupported target.`, pageId: page.id })
  }
}

export function validateSeoPageDefinition(
  page: SeoPageDefinition,
  routes: readonly SeoCanonicalRoute[],
): SeoValidationResult {
  const errors: SeoValidationError[] = [...validateCanonicalRoutes(routes)]
  const add = (code: string, message: string) => errors.push({ code, message, pageId: page.id })

  if (!hasText(page.id)) add('missing-id', 'A stable page ID is required.')
  if (!hasText(page.translationKey)) add('missing-translation-key', 'A translation key is required.')
  if (!hasText(page.ownerKey)) add('missing-owner-key', 'A stable content owner key is required.')
  if (!LOCALES.includes(page.locale)) add('invalid-locale', `Unsupported locale: ${String(page.locale)}.`)
  if (page.contentLocale !== page.locale) add('content-locale-mismatch', `Content locale must equal ${page.locale}.`)
  if (!SEO_PAGE_TYPES.includes(page.pageType)) add('invalid-page-type', `Unsupported page type: ${String(page.pageType)}.`)
  if (!SEO_PUBLICATION_STATUSES.includes(page.publicationStatus)) {
    add('invalid-publication-status', `Unsupported publication status: ${String(page.publicationStatus)}.`)
  }
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(page.slug)) add('invalid-slug', 'Slug must be lowercase and hyphen-delimited.')
  if (normalizeCanonicalBasePath(page.basePath) !== page.basePath) {
    add('invalid-base-path', 'Base path must be a normalized, unprefixed, root-relative route.')
  }

  const parentRoute = page.parent?.target?.kind === 'route'
    ? findRoute(page.parent.target.routeId, routes)
    : undefined
  if (!page.parent || !hasText(page.parent.label)) {
    add('missing-parent', 'Every SEO detail page requires a valid parent hub.')
  } else if (page.parent.locale !== page.locale) {
    add('parent-locale-mismatch', `Parent must use locale ${page.locale}.`)
  } else if (page.parent.target.kind === 'route') {
    if (!parentRoute) add('missing-parent-target', `Parent route ${page.parent.target.routeId} does not exist.`)
    else {
      if (parentRoute.locale !== page.locale) add('cross-locale-parent', 'Parent route must preserve the page locale.')
      if (parentRoute.kind !== EXPECTED_PARENT_KIND[page.pageType]) {
        add('mismatched-parent-hierarchy', `${page.pageType} pages require a ${EXPECTED_PARENT_KIND[page.pageType]} parent.`)
      }
      const expectedBasePath = `${parentRoute.basePath === '/' ? '' : parentRoute.basePath}/${page.slug}`
      if (page.basePath !== expectedBasePath) add('slug-divergence', `Base path must equal ${expectedBasePath}.`)
    }
  }

  if (!page.canonical.startsWith(`${SITE_URL}/`) && page.canonical !== SITE_URL) {
    add('unsafe-canonical', 'Canonical must use the production origin.')
  }
  if (page.canonical !== getPageCanonical(page)) {
    add('canonical-mismatch', `Canonical must equal ${getPageCanonical(page)}.`)
  }
  try {
    const canonical = new URL(page.canonical)
    if (canonical.origin !== SITE_URL || canonical.protocol !== 'https:' || canonical.search || canonical.hash) {
      add('unsafe-canonical', 'Canonical must be a clean HTTPS URL on www.bsolution.eu.')
    }
    if (canonical.pathname !== localizedPath(page.locale, page.basePath)) {
      add('unsafe-canonical-normalization', 'Canonical pathname must preserve the normalized localized route exactly.')
    }
  } catch {
    add('unsafe-canonical', 'Canonical must be a valid absolute URL.')
  }

  if (!hasText(page.title)) add('missing-title', 'A locale-specific title is required.')
  if (!hasText(page.metaDescription)) add('missing-description', 'A locale-specific meta description is required.')
  if (!hasText(page.h1)) add('missing-h1', 'A unique visible H1 is required.')
  if (!hasText(page.proposition)) add('missing-proposition', 'A short visible proposition is required.')
  if (!hasText(page.audience)) add('missing-audience', 'The target audience must be explicit.')
  if (!hasText(page.searchIntent)) add('missing-search-intent', 'The primary search intent must be explicit.')
  if (!page.rendererLabels || page.rendererLabels.locale !== page.locale) add('renderer-label-locale-mismatch', 'Renderer labels must match the page locale.')
  if (!hasText(page.rendererLabels?.breadcrumbNavigation)) add('missing-renderer-label', 'Renderer label breadcrumbNavigation is required.')
  for (const [key, value] of Object.entries(page.rendererLabels ?? {})) {
    if (key !== 'locale' && !hasText(value)) add('missing-renderer-label', `Renderer label ${key} is required.`)
  }
  if (page.sections.length === 0) add('empty-sections', 'At least one visible content section is required.')

  const sectionIds = new Set<string>()
  for (const section of page.sections) {
    if (!hasText(section.id) || sectionIds.has(section.id)) add('duplicate-section-id', `Section ID ${section.id || '(empty)'} is missing or duplicated.`)
    sectionIds.add(section.id)
    if (section.locale !== page.locale) add('section-locale-mismatch', `Section ${section.id} must use locale ${page.locale}.`)
    if (!SEO_SECTION_TYPES.includes(section.type)) add('invalid-section-type', `Unsupported section type: ${String(section.type)}.`)
    if (!hasText(section.heading)) add('empty-section-heading', `Section ${section.id} requires a heading.`)
    if (section.paragraphs.some((paragraph) => !hasText(paragraph)) || section.items?.some((item) => !hasText(item))) {
      add('empty-section-value', `Section ${section.id} contains an empty visible value.`)
    }
    if (section.paragraphs.length === 0 && (!section.items || section.items.length === 0)) {
      add('empty-visible-section', `Section ${section.id} has no visible content.`)
    }
    if (section.heading.trim() === page.h1.trim()) add('duplicate-h1-data', `Section ${section.id} duplicates the page H1.`)
  }

  validateCtaShape(page, page.primaryCta, 'Primary CTA', errors)
  const ctaIds = new Set([page.primaryCta?.id])
  for (const cta of page.secondaryCtas) {
    validateCtaShape(page, cta, `Secondary CTA ${cta.id}`, errors)
    if (ctaIds.has(cta.id)) add('duplicate-cta-id', `CTA ID ${cta.id} is duplicated.`)
    ctaIds.add(cta.id)
  }

  if (page.publicationStatus === 'approved' && page.approval.status !== 'approved') {
    add('approved-without-owner-approval', 'Approved status requires an identified owner approval.')
  }
  if (page.approval.status === 'approved' && !hasText(page.approval.ownerId)) {
    add('missing-owner-identity', 'Owner approval requires a stable owner identity.')
  }
  if (page.approval.status === 'approved' && page.approval.ownerId !== page.ownerKey) {
    add('owner-identity-mismatch', 'Owner approval identity must match the page owner key.')
  }
  if (page.evidence.status === 'not-required' && page.evidence.requirements.length > 0) {
    add('inconsistent-evidence-state', 'Evidence marked not required cannot contain proof requirements.')
  }
  if (page.evidence.status !== 'not-required' && page.evidence.requirements.length === 0) {
    add('inconsistent-evidence-state', 'Required or approved evidence must identify at least one proof requirement.')
  }
  if (page.evidence.status !== 'not-required' && page.evidence.requirements.some((requirement) => !hasText(requirement))) {
    add('invalid-evidence-requirement', 'Evidence requirements must be non-empty.')
  }
  if (page.publicationStatus === 'evidence-required' && page.evidence.status !== 'required') {
    add('inconsistent-evidence-state', 'Evidence-required status requires pending evidence.')
  }
  if (page.publicationStatus === 'approved' && page.evidence.status === 'required') {
    add('evidence-not-approved', 'Approved pages cannot retain pending evidence.')
  }
  if (page.indexationRequested && (page.approval.status !== 'approved' || page.publicationStatus !== 'approved')) {
    add('indexable-without-approval', 'Indexation cannot be requested before owner-approved publication.')
  }
  if (page.publicationStatus === 'archived' && page.indexationRequested) add('archived-indexable', 'Archived pages cannot request indexation.')
  if (page.publicationStatus === 'archived' && !page.archiveAction) add('missing-archive-action', 'Archived pages require an explicit action.')
  if (page.topicStatus !== 'clear' && page.indexationRequested) add('topic-conflict-indexable', 'Conflicting pages cannot request indexation.')

  const requested = page.structuredData.requested as readonly string[]
  if (new Set(requested).size !== requested.length) add('duplicate-schema-request', 'Structured-data types cannot be requested more than once.')
  for (const schemaType of requested) {
    if (!SEO_STRUCTURED_DATA_TYPES.includes(schemaType as never)) add('unsupported-schema', `Unsupported structured-data type: ${schemaType}.`)
  }
  if (requested.includes('Service') && !(page.pageType === 'service' || (page.pageType === 'client-intent' && page.structuredData.describesVisibleService))) {
    add('ineligible-service-schema', `${page.pageType} pages cannot emit Service schema.`)
  }
  if (requested.includes('Service') && !page.structuredData.describesVisibleService) {
    add('service-schema-without-visible-service', 'Service schema requires a genuine visible service description.')
  }

  const linkIds = new Set<string>()
  const linkTargets = new Set<string>()
  for (const link of page.internalLinks) {
    if (!hasText(link.id) || linkIds.has(link.id)) add('duplicate-link-id', `Internal link ID ${link.id || '(empty)'} is missing or duplicated.`)
    linkIds.add(link.id)
    if (!SEO_LINK_RELATIONSHIPS.includes(link.relationship)) add('invalid-link-relationship', `Internal link ${link.id} has an unsupported relationship.`)
    if (!hasText(link.anchorText) || !hasText(link.purpose)) add('invalid-internal-link', `Internal link ${link.id} requires localized anchor text and purpose.`)
    if (link.locale !== page.locale) add('internal-link-locale-mismatch', `Internal link ${link.id} must preserve locale ${page.locale}.`)
    const targetKey = `${link.target.kind}:${link.target.kind === 'page' ? link.target.pageId : link.target.routeId}`
    if (linkTargets.has(targetKey)) add('duplicate-link-target', `Internal link target ${targetKey} is duplicated.`)
    linkTargets.add(targetKey)
    if (link.target.kind === 'page' && link.target.pageId === page.id) add('self-link', `Page ${page.id} cannot link to itself.`)
  }

  return { valid: errors.length === 0, errors }
}

function detectPageCycles(
  pages: readonly SeoPageDefinition[],
  edgesFor: (page: SeoPageDefinition) => string[],
  code: string,
  label: string,
): SeoValidationError[] {
  const errors: SeoValidationError[] = []
  const visiting = new Set<string>()
  const visited = new Set<string>()
  const byId = new Map(pages.map((page) => [page.id, page]))

  function visit(id: string, path: string[]) {
    if (visiting.has(id)) {
      errors.push({ code, message: `${label} cycle detected: ${[...path, id].join(' -> ')}.`, pageId: id })
      return
    }
    if (visited.has(id)) return
    visiting.add(id)
    const page = byId.get(id)
    for (const target of page ? edgesFor(page) : []) visit(target, [...path, id])
    visiting.delete(id)
    visited.add(id)
  }
  for (const page of pages) visit(page.id, [])
  return errors
}

export function validateSeoPageRegistry(
  pages: readonly SeoPageDefinition[],
  routes: readonly SeoCanonicalRoute[],
): SeoValidationResult {
  const errors = [
    ...validateCanonicalRoutes(routes),
    ...pages.flatMap((page) => validateSeoPageDefinition(page, routes).errors),
  ]
  const ids = new Map<string, string>()
  const canonicals = new Map<string, string>()
  const localePaths = new Map<string, string>()
  const localeTitles = new Map<string, string>()
  const localeH1s = new Map<string, string>()

  for (const page of pages) {
    const checks: Array<[Map<string, string>, string, string, string]> = [
      [ids, page.id, 'duplicate-page-id', `Duplicate page ID: ${page.id}.`],
      [canonicals, page.canonical, 'duplicate-canonical', `Duplicate canonical URL: ${page.canonical}.`],
      [localePaths, `${page.locale}:${page.basePath}`, 'duplicate-locale-path', `Duplicate locale and path: ${page.locale}:${page.basePath}.`],
      [localeTitles, `${page.locale}:${page.title.trim().toLocaleLowerCase(page.locale)}`, 'duplicate-localized-title', `Duplicate localized title in ${page.locale}: ${page.title}.`],
      [localeH1s, `${page.locale}:${page.h1.trim().toLocaleLowerCase(page.locale)}`, 'duplicate-localized-h1', `Duplicate localized H1 in ${page.locale}: ${page.h1}.`],
    ]
    for (const [map, key, code, message] of checks) {
      if (map.has(key)) errors.push({ code, message, pageId: page.id })
      else map.set(key, page.id)
    }
  }

  const byId = new Map(pages.map((page) => [page.id, page]))
  const routeById = new Map(routes.map((route) => [route.id, route]))
  for (const page of pages) {
    if (page.parent.target.kind === 'page') {
      const parent = byId.get(page.parent.target.pageId)
      if (!parent) errors.push({ code: 'missing-parent-target', message: `Parent page ${page.parent.target.pageId} does not exist.`, pageId: page.id })
      else {
        if (parent === page) errors.push({ code: 'self-parent', message: `Page ${page.id} cannot parent itself.`, pageId: page.id })
        if (parent.locale !== page.locale) errors.push({ code: 'cross-locale-parent', message: `Parent ${parent.id} is not available in ${page.locale}.`, pageId: page.id })
        if (parent.pageType !== page.pageType) errors.push({ code: 'mismatched-parent-hierarchy', message: `Parent ${parent.id} does not belong to the ${page.pageType} hierarchy.`, pageId: page.id })
        if (!isLocallyPublishable(parent, routes)) errors.push({ code: 'unpublished-parent', message: `Parent ${parent.id} is not publishable.`, pageId: page.id })
        const expectedPath = `${parent.basePath}/${page.slug}`
        if (page.basePath !== expectedPath) errors.push({ code: 'mismatched-parent-hierarchy', message: `Page path must be nested under ${parent.basePath}.`, pageId: page.id })
      }
    }

    const targets = [page.primaryCta, ...page.secondaryCtas].map((cta) => ({ id: cta.id, target: cta.target }))
    for (const { id, target } of targets) {
      const resolved = resolveTarget(page, target, pages, routes)
      if (!resolved) errors.push({ code: 'invalid-cta-destination', message: `CTA ${id} does not resolve to a canonical same-locale destination.`, pageId: page.id })
      else if (resolved.page && !isLocallyPublishable(resolved.page, routes)) {
        errors.push({ code: 'unpublished-cta-destination', message: `CTA ${id} targets unpublished page ${resolved.page.id}.`, pageId: page.id })
      }
    }

    for (const link of page.internalLinks) {
      const resolved = resolveTarget(page, link.target, pages, routes)
      if (!resolved) errors.push({ code: 'invalid-link-target', message: `Internal link ${link.id} does not resolve canonically in ${page.locale}.`, pageId: page.id })
      else if (resolved.page && !isLocallyPublishable(resolved.page, routes)) {
        errors.push({ code: 'unpublished-link-target', message: `Internal link ${link.id} targets unpublished page ${resolved.page.id}.`, pageId: page.id })
      }
    }
  }

  errors.push(...detectPageCycles(
    pages,
    (page) => page.parent.target.kind === 'page' ? [page.parent.target.pageId] : [],
    'circular-parent',
    'Parent',
  ))
  errors.push(...detectPageCycles(
    pages,
    (page) => page.internalLinks.flatMap((link) => link.target.kind === 'page' ? [link.target.pageId] : []),
    'circular-link',
    'Internal link',
  ))

  const groups = new Map<string, SeoPageDefinition[]>()
  for (const page of pages) groups.set(page.translationKey, [...(groups.get(page.translationKey) ?? []), page])
  for (const group of groups.values()) {
    const first = group[0]
    const locales = new Set<string>()
    const firstParentFamily = first.parent.target.kind === 'route'
      ? routeById.get(first.parent.target.routeId)?.kind
      : byId.get(first.parent.target.pageId)?.translationKey
    for (const page of group) {
      if (locales.has(page.locale)) errors.push({ code: 'duplicate-translation-locale', message: `Translation group ${page.translationKey} has duplicate locale ${page.locale}.`, pageId: page.id })
      locales.add(page.locale)
      const parentFamily = page.parent.target.kind === 'route'
        ? routeById.get(page.parent.target.routeId)?.kind
        : byId.get(page.parent.target.pageId)?.translationKey
      if (page.pageType !== first.pageType || page.ownerKey !== first.ownerKey || parentFamily !== firstParentFamily) {
        errors.push({ code: 'translation-group-collision', message: `Translation group ${page.translationKey} combines unrelated page identities.`, pageId: page.id })
      }
    }
  }

  return { valid: errors.length === 0, errors }
}

function isLocallyPublishable(page: SeoPageDefinition, routes: readonly SeoCanonicalRoute[]): boolean {
  return (
    page.publicationStatus === 'approved'
    && page.approval.status === 'approved'
    && page.evidence.status !== 'required'
    && page.topicStatus === 'clear'
    && validateSeoPageDefinition(page, routes).valid
  )
}

export function isPagePublishable(
  page: SeoPageDefinition,
  pages: readonly SeoPageDefinition[],
  routes: readonly SeoCanonicalRoute[],
): boolean {
  return (
    isExactRegistryRecord(page, pages)
    && isLocallyPublishable(page, routes)
    && validateSeoPageRegistry(pages, routes).valid
  )
}

export function isPageIndexable(
  page: SeoPageDefinition,
  pages: readonly SeoPageDefinition[],
  routes: readonly SeoCanonicalRoute[],
): boolean {
  return isPagePublishable(page, pages, routes) && page.indexationRequested && page.publicationStatus !== 'archived'
}

export function resolveValidatedTarget(
  source: SeoPageDefinition,
  target: SeoNavigationTarget,
  pages: readonly SeoPageDefinition[],
  routes: readonly SeoCanonicalRoute[],
): string | null {
  if (!isExactRegistryRecord(source, pages) || !validateSeoPageRegistry(pages, routes).valid) return null
  const resolved = resolveTarget(source, target, pages, routes)
  if (!resolved || (resolved.page && !isPagePublishable(resolved.page, pages, routes))) return null
  return resolved.href
}

export function resolveValidatedParent(
  page: SeoPageDefinition,
  pages: readonly SeoPageDefinition[],
  routes: readonly SeoCanonicalRoute[],
): { href: string; label: string } | null {
  if (!isExactRegistryRecord(page, pages) || !validateSeoPageRegistry(pages, routes).valid) return null
  const target = page.parent.target
  if (target.kind === 'route') {
    const route = findRoute(target.routeId, routes)
    return route ? { href: getCanonicalRouteHref(route), label: page.parent.label } : null
  }
  const parent = pages.find((candidate) => candidate.id === target.pageId)
  return parent && isPagePublishable(parent, pages, routes)
    ? { href: localizedPath(parent.locale, parent.basePath), label: page.parent.label }
    : null
}
