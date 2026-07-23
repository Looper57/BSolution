import { absoluteUrl, type Locale } from '@/lib/i18n/config'
import type {
  SeoCanonicalRoute,
  SeoCanonicalRouteKind,
  SeoPageDefinition,
  SeoPageType,
  SeoStructuredDataType,
} from '@/lib/seo-pages'

interface FixtureInput {
  id: string
  locale: Locale
  slug: string
  pageType: SeoPageType
  label: string
  sectionHeading: string
  sectionText: string
  parentRouteId: string
  parentBasePath: string
  parentLabel: string
  schemas: SeoStructuredDataType[]
  describesVisibleService?: boolean
}

const localizedLabels = {
  en: { breadcrumbNavigation: 'Breadcrumb navigation', home: 'B Solution', related: 'Related', additionalActions: 'Additional actions', contact: 'Test contact' },
  cs: { breadcrumbNavigation: 'Drobečková navigace', home: 'B Solution', related: 'Související', additionalActions: 'Další možnosti', contact: 'Otestovat kontakt' },
  de: { breadcrumbNavigation: 'Brotkrümelnavigation', home: 'B Solution', related: 'Verwandte Seiten', additionalActions: 'Weitere Aktionen', contact: 'Kontakt testen' },
  pl: { breadcrumbNavigation: 'Nawigacja okruszkowa', home: 'B Solution', related: 'Powiązane strony', additionalActions: 'Dodatkowe działania', contact: 'Sprawdź kontakt' },
} satisfies Record<Locale, { breadcrumbNavigation: string; home: string; related: string; additionalActions: string; contact: string }>

function draftFixture(input: FixtureInput): SeoPageDefinition {
  const basePath = `${input.parentBasePath}/${input.slug}`
  const labels = localizedLabels[input.locale]
  return {
    id: input.id,
    translationKey: `fixture-${input.slug}`,
    ownerKey: 'fixture-owner',
    locale: input.locale,
    contentLocale: input.locale,
    slug: input.slug,
    basePath,
    pageType: input.pageType,
    publicationStatus: 'draft',
    approval: { status: 'pending' },
    evidence: {
      status: 'required',
      requirements: ['Internal fixture evidence requirement'],
    },
    topicStatus: 'clear',
    indexationRequested: false,
    canonical: absoluteUrl(input.locale, basePath),
    title: `${input.label} | Internal fixture`,
    metaDescription: `${input.label} metadata used only for architecture validation.`,
    h1: input.label,
    proposition: `${input.label} proposition used only for architecture validation.`,
    audience: `${input.label} test audience`,
    searchIntent: `${input.label} test intent`,
    sections: [{
      id: `${input.id}-section`,
      locale: input.locale,
      type: 'capability-overview',
      heading: input.sectionHeading,
      paragraphs: [input.sectionText],
    }],
    primaryCta: {
      id: `${input.id}-primary`,
      locale: input.locale,
      label: labels.contact,
      target: { kind: 'route', routeId: `contact-${input.locale}` },
      audience: 'general',
      style: 'primary',
    },
    secondaryCtas: [],
    internalLinks: [],
    parent: {
      target: { kind: 'route', routeId: input.parentRouteId },
      locale: input.locale,
      label: input.parentLabel,
    },
    rendererLabels: {
      locale: input.locale,
      breadcrumbNavigation: labels.breadcrumbNavigation,
      home: labels.home,
      related: labels.related,
      additionalActions: labels.additionalActions,
    },
    structuredData: {
      requested: input.schemas,
      describesVisibleService: input.describesVisibleService ?? false,
    },
  }
}

function routesFor(
  locale: Locale,
  definitions: Array<[string, string, SeoCanonicalRouteKind]>,
): SeoCanonicalRoute[] {
  return definitions.map(([name, basePath, kind]) => ({
    id: `${name}-${locale}`,
    locale,
    basePath,
    kind,
  }))
}

export const fixtureCanonicalRoutes: SeoCanonicalRoute[] = [
  ...routesFor('en', [
    ['services', '/services', 'service-hub'],
    ['candidates', '/candidates', 'candidate-hub'],
    ['contact', '/contact', 'contact'],
  ]),
  ...routesFor('cs', [
    ['practice-areas', '/practice-areas', 'practice-area-hub'],
    ['contact', '/contact', 'contact'],
  ]),
  ...routesFor('de', [
    ['locations', '/locations', 'location-hub'],
    ['contact', '/contact', 'contact'],
  ]),
  ...routesFor('pl', [
    ['clients', '/clients', 'client-hub'],
    ['contact', '/contact', 'contact'],
  ]),
]

export const draftSeoFixtures: SeoPageDefinition[] = [
  draftFixture({
    id: 'fixture-service-en',
    locale: 'en',
    slug: 'internal-service-test',
    pageType: 'service',
    label: 'Internal service fixture',
    sectionHeading: 'Supplied service section',
    sectionText: 'Artificial test content with no business claim.',
    parentRouteId: 'services-en',
    parentBasePath: '/services',
    parentLabel: 'Services',
    schemas: ['WebPage', 'BreadcrumbList', 'Service'],
    describesVisibleService: true,
  }),
  draftFixture({
    id: 'fixture-practice-cs',
    locale: 'cs',
    slug: 'interni-oblast-test',
    pageType: 'practice-area',
    label: 'Interní test oblasti',
    sectionHeading: 'Dodaný testovací oddíl',
    sectionText: 'Umělý testovací obsah bez obchodního tvrzení.',
    parentRouteId: 'practice-areas-cs',
    parentBasePath: '/practice-areas',
    parentLabel: 'Oblasti praxe',
    schemas: ['WebPage', 'BreadcrumbList'],
  }),
  draftFixture({
    id: 'fixture-location-de',
    locale: 'de',
    slug: 'interner-standort-test',
    pageType: 'location',
    label: 'Interne Standort-Testseite',
    sectionHeading: 'Bereitgestellter Testabschnitt',
    sectionText: 'Künstlicher Testinhalt ohne geschäftliche Aussage.',
    parentRouteId: 'locations-de',
    parentBasePath: '/locations',
    parentLabel: 'Standorte',
    schemas: ['WebPage', 'BreadcrumbList'],
  }),
  draftFixture({
    id: 'fixture-client-pl',
    locale: 'pl',
    slug: 'wewnetrzny-klient-test',
    pageType: 'client-intent',
    label: 'Wewnętrzna strona testowa klienta',
    sectionHeading: 'Dostarczona sekcja testowa',
    sectionText: 'Sztuczna treść testowa bez twierdzeń biznesowych.',
    parentRouteId: 'clients-pl',
    parentBasePath: '/clients',
    parentLabel: 'Dla klientów',
    schemas: ['WebPage', 'BreadcrumbList'],
  }),
  draftFixture({
    id: 'fixture-candidate-en',
    locale: 'en',
    slug: 'internal-candidate-test',
    pageType: 'candidate-intent',
    label: 'Internal candidate fixture',
    sectionHeading: 'Supplied candidate section',
    sectionText: 'Artificial test content with no employment claim.',
    parentRouteId: 'candidates-en',
    parentBasePath: '/candidates',
    parentLabel: 'Candidates',
    schemas: ['WebPage', 'BreadcrumbList'],
  }),
]

export function approvedFixture(
  fixture: SeoPageDefinition = draftSeoFixtures[0],
): SeoPageDefinition {
  return {
    ...fixture,
    publicationStatus: 'approved',
    approval: { status: 'approved', ownerId: 'fixture-owner' },
    evidence: {
      status: 'approved',
      requirements: ['Internal fixture evidence requirement'],
    },
    indexationRequested: true,
  }
}
