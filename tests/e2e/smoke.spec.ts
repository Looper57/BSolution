import { expect, test, type Page } from '@playwright/test'

async function structuredDataNodes(page: Page) {
  const jsonLd = await page.locator('script[type="application/ld+json"]').allTextContents()

  return jsonLd
    .map((value) => JSON.parse(value))
    .flatMap((value) => value['@graph'] ?? [value])
}

const standardRoutes = [
  { path: '/', lang: 'en', identity: 'Legal Executive Search for Law Firms and Corporate Legal Departments', home: '/', canonical: 'https://www.bsolution.eu' },
  { path: '/cs', lang: 'cs', identity: 'Butikový Legal Executive Search pro advokátní kanceláře a korporátní právní oddělení', home: '/cs', canonical: 'https://www.bsolution.eu/cs' },
  { path: '/de', lang: 'de', identity: 'Boutique Legal Executive Search für Anwaltskanzleien und Rechtsabteilungen', home: '/de', canonical: 'https://www.bsolution.eu/de' },
  { path: '/pl', lang: 'pl', identity: 'Butikowy Legal Executive Search dla kancelarii prawnych i korporacyjnych działów prawnych', home: '/pl', canonical: 'https://www.bsolution.eu/pl' },
  { path: '/services', lang: 'en', identity: 'Legal Executive Search Services', home: '/', canonical: 'https://www.bsolution.eu/services' },
  { path: '/cs/services', lang: 'cs', identity: 'Služby Legal Executive Search', home: '/cs', canonical: 'https://www.bsolution.eu/cs/services' },
  { path: '/de/services', lang: 'de', identity: 'Legal Executive Search Leistungen', home: '/de', canonical: 'https://www.bsolution.eu/de/services' },
  { path: '/pl/services', lang: 'pl', identity: 'Usługi Legal Executive Search', home: '/pl', canonical: 'https://www.bsolution.eu/pl/services' },
  { path: '/positions', lang: 'en', identity: 'Current Opportunities', home: '/', canonical: 'https://www.bsolution.eu/positions' },
  { path: '/contact', lang: 'en', identity: 'Contact', home: '/', canonical: 'https://www.bsolution.eu/contact' },
  { path: '/privacy', lang: 'en', identity: 'Privacy Policy', home: '/', canonical: 'https://www.bsolution.eu/privacy' },
  { path: '/cs/privacy', lang: 'cs', identity: 'Ochrana osobních údajů', home: '/cs', canonical: 'https://www.bsolution.eu/cs/privacy' },
] as const

for (const route of standardRoutes) {
  test(`${route.path} preserves the production page contract`, async ({ page }) => {
    const response = await page.goto(route.path)
    expect(response?.status()).toBe(200)
    await expect(page.locator('html')).toHaveAttribute('lang', route.lang)
    await expect(page.getByRole('heading', { level: 1, name: new RegExp(route.identity) })).toBeVisible()
    const canonicalLink = page.locator('link[rel="canonical"]')
    await expect(canonicalLink).toHaveCount(1)
    await expect(canonicalLink).toHaveAttribute('href', route.canonical)
    await expect(page.getByText(/Application error|Internal Server Error/)).toHaveCount(0)

    const brandLink = page.getByRole('link', { name: /BSolution (homepage|Startseite)|Domovská stránka BSolution|Strona główna BSolution/ }).first()
    await expect(brandLink).toHaveAttribute('href', route.home)

    const skipLink = page.locator('a[href="#main-content"]').first()
    await expect(skipLink).toHaveCSS('opacity', '0')
    await expect(skipLink).toHaveCSS('pointer-events', 'none')
    await page.keyboard.press('Tab')
    await expect(skipLink).toBeFocused()
    await expect(skipLink).toBeVisible()
    await expect(skipLink).toHaveCSS('opacity', '1')
    await expect(skipLink).toHaveCSS('pointer-events', 'auto')

    const title = await page.title()
    expect(title.match(/B Solution/g)).toHaveLength(1)
  })
}

test('English Services has one visible Legal Executive Search heading', async ({ page }) => {
  await page.goto('/services')
  const serviceHeadings = page
    .getByRole('heading', { level: 2, name: 'Legal Executive Search', exact: true })
    .filter({ visible: true })
  await expect(serviceHeadings).toHaveCount(1)
  await expect(serviceHeadings.first()).toBeVisible()
})

test('structured data exposes one connected global entity graph', async ({ page }) => {
  await page.goto('/')
  const nodes = await structuredDataNodes(page)

  await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(1)
  const organizations = nodes.filter((node) => node['@type'] === 'Organization')
  expect(organizations).toHaveLength(1)
  expect(organizations[0]).toMatchObject({
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'recruitment',
    },
  })
  expect(JSON.stringify(organizations[0])).not.toContain('customer service')
  expect(nodes.find((node) => node['@type'] === 'Person')).toMatchObject({
    name: 'Lukáš Benátčan',
    worksFor: { '@id': 'https://www.bsolution.eu/#organization' },
  })
  expect(nodes.find((node) => node['@type'] === 'ProfessionalService')).toBeTruthy()
})

const localizedServiceSchemas = [
  {
    path: '/services/legal-executive-search',
    canonical: 'https://www.bsolution.eu/services/legal-executive-search',
    breadcrumbs: [
      'https://www.bsolution.eu/',
      'https://www.bsolution.eu/services',
      'https://www.bsolution.eu/services/legal-executive-search',
    ],
  },
  {
    path: '/cs/services/legal-executive-search',
    canonical: 'https://www.bsolution.eu/cs/services/legal-executive-search',
    breadcrumbs: [
      'https://www.bsolution.eu/cs',
      'https://www.bsolution.eu/cs/services',
      'https://www.bsolution.eu/cs/services/legal-executive-search',
    ],
  },
  {
    path: '/de/services/legal-executive-search',
    canonical: 'https://www.bsolution.eu/de/services/legal-executive-search',
    breadcrumbs: [
      'https://www.bsolution.eu/de',
      'https://www.bsolution.eu/de/services',
      'https://www.bsolution.eu/de/services/legal-executive-search',
    ],
  },
  {
    path: '/pl/services/legal-executive-search',
    canonical: 'https://www.bsolution.eu/pl/services/legal-executive-search',
    breadcrumbs: [
      'https://www.bsolution.eu/pl',
      'https://www.bsolution.eu/pl/services',
      'https://www.bsolution.eu/pl/services/legal-executive-search',
    ],
  },
] as const

for (const route of localizedServiceSchemas) {
  test(`${route.path} exposes localized Service and ordered Breadcrumb schemas`, async ({ page }) => {
    const response = await page.goto(route.path)
    expect(response?.status()).toBe(200)
    const nodes = await structuredDataNodes(page)
    const service = nodes.find((node) => node['@type'] === 'Service')
    const breadcrumbs = nodes.find((node) => node['@type'] === 'BreadcrumbList')

    expect(nodes.filter((node) => node['@type'] === 'Organization')).toHaveLength(1)
    expect(nodes.find((node) => node['@type'] === 'WebPage')).toMatchObject({
      url: route.canonical,
    })
    expect(service).toMatchObject({
      '@id': `${route.canonical}#service`,
      url: route.canonical,
      provider: { '@id': 'https://www.bsolution.eu/#organization' },
    })
    expect(breadcrumbs.itemListElement.map((item: { position: number }) => item.position)).toEqual([1, 2, 3])
    expect(breadcrumbs.itemListElement.map((item: { item: string }) => item.item)).toEqual(route.breadcrumbs)
  })
}

const authorityRenderingRoutes = [
  {
    path: '/services/legal-executive-search',
    lang: 'en',
    h1: 'Legal Executive Search',
    breadcrumb: 'Breadcrumb navigation',
    primary: ['Discuss a confidential search', '/contact'],
    secondary: ['For candidates', '/candidates'],
    faq: 'Frequently asked questions',
  },
  {
    path: '/cs/services/legal-executive-search',
    lang: 'cs',
    h1: 'Executive search v právním sektoru',
    breadcrumb: 'Drobečková navigace',
    primary: ['Projednat důvěrné vyhledávání', '/cs/contact'],
    secondary: ['Pro kandidáty', '/cs/candidates'],
    faq: 'Časté otázky',
  },
  {
    path: '/de/services/legal-executive-search',
    lang: 'de',
    h1: 'Legal Executive Search',
    breadcrumb: 'Brotkrümelnavigation',
    primary: ['Vertrauliche Suche besprechen', '/de/contact'],
    secondary: ['Für Kandidaten', '/de/candidates'],
    faq: 'Häufig gestellte Fragen',
  },
  {
    path: '/pl/services/legal-executive-search',
    lang: 'pl',
    h1: 'Executive search w sektorze prawnym',
    breadcrumb: 'Nawigacja okruszkowa',
    primary: ['Omów poufne poszukiwanie', '/pl/contact'],
    secondary: ['Dla kandydatów', '/pl/candidates'],
    faq: 'Najczęściej zadawane pytania',
  },
] as const

for (const route of authorityRenderingRoutes) {
  test(`${route.path} renders governed localized authority content`, async ({ page }) => {
    const browserErrors: string[] = []
    page.on('console', (message) => {
      if (
        message.type() === 'error'
        && /hydration|application error|internal server error/i.test(message.text())
      ) {
        browserErrors.push(message.text())
      }
    })
    page.on('pageerror', (error) => browserErrors.push(error.message))

    const response = await page.goto(route.path)
    expect(response?.status()).toBe(200)
    await expect(page.locator('html')).toHaveAttribute('lang', route.lang)
    const canonical = localizedServiceSchemas.find(
      ({ path }) => path === route.path,
    )!.canonical
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      canonical,
    )
    const expectedAlternates = {
      en: 'https://www.bsolution.eu/services/legal-executive-search',
      cs: 'https://www.bsolution.eu/cs/services/legal-executive-search',
      de: 'https://www.bsolution.eu/de/services/legal-executive-search',
      pl: 'https://www.bsolution.eu/pl/services/legal-executive-search',
      'x-default': 'https://www.bsolution.eu/services/legal-executive-search',
    }
    for (const [language, href] of Object.entries(expectedAlternates)) {
      await expect(
        page.locator(`link[rel="alternate"][hreflang="${language}"]`),
      ).toHaveAttribute('href', href)
    }
    await expect(
      page.locator(
        'link[rel="alternate"][href="https://www.bsolution.eu/legal-executive-search"]',
      ),
    ).toHaveCount(0)
    await expect(page.getByRole('main')).toHaveCount(1)
    await expect(page.getByRole('heading', { level: 1, name: route.h1 })).toHaveCount(1)
    await expect(page.getByRole('navigation', { name: route.breadcrumb })).toBeVisible()
    await expect(page.getByRole('heading', { level: 2, name: route.faq })).toBeVisible()

    const sectionKinds = await page
      .locator('[data-authority-section]')
      .evaluateAll((elements) =>
        elements.map((element) => element.getAttribute('data-authority-section')),
      )
    expect(sectionKinds).toEqual([
      'market-context',
      'employer-challenges',
      'candidate-profile',
      'typical-mandates',
      'search-methodology',
      'assessment-methodology',
      'cross-border-capability',
      'process-timeline',
      'why-bsolution',
    ])

    await expect(page.locator('[data-authority-cta="primary"]')).toHaveAttribute(
      'href',
      route.primary[1],
    )
    await expect(page.locator('[data-authority-cta="primary"]')).toHaveText(
      new RegExp(route.primary[0]),
    )
    await expect(page.locator('[data-authority-cta="secondary"]')).toHaveAttribute(
      'href',
      route.secondary[1],
    )
    await expect(page.locator('[data-authority-cta="secondary"]')).toHaveText(
      new RegExp(route.secondary[0]),
    )
    const evidence = page.locator('[data-authority-evidence="root"]')
    await expect(evidence).toBeVisible()
    await expect(evidence.getByText('Vladimír Polách', { exact: true })).toBeVisible()
    await expect(evidence.getByText('Dominika Nosačková', { exact: true })).toBeVisible()
    await expect(evidence.locator('blockquote[lang="en"]')).toHaveCount(2)
    await expect(evidence.getByText('Wolf Theiss', { exact: true })).toBeVisible()
    await expect(evidence.getByText('KPMG Legal', { exact: true })).toBeVisible()
    await expect(evidence.getByText('DLA Piper', { exact: true })).toBeVisible()

    const nodes = await structuredDataNodes(page)
    expect(nodes.some((node) => node['@type'] === 'FAQPage')).toBe(false)
    expect(nodes.some((node) => ['Review', 'AggregateRating', 'Rating'].includes(node['@type']))).toBe(false)
    expect(browserErrors).toEqual([])
  })
}

test('legacy Legal Executive Search route permanently redirects in one hop', async ({
  page,
}) => {
  const redirect = await page.request.get('/legal-executive-search', {
    maxRedirects: 0,
  })
  expect(redirect.status()).toBe(308)
  expect(
    new URL(
      redirect.headers().location,
      'http://127.0.0.1:3100',
    ).pathname,
  ).toBe('/services/legal-executive-search')
  const redirectBody = await redirect.text()
  expect(redirectBody).not.toContain('rel="canonical"')
  expect(redirectBody).not.toContain('hreflang=')
  expect(redirectBody).not.toContain('application/ld+json')

  const response = await page.goto('/legal-executive-search')
  expect(response?.status()).toBe(200)
  expect(new URL(response!.url()).pathname).toBe(
    '/services/legal-executive-search',
  )
  let redirects = 0
  let request = response!.request()
  while (request.redirectedFrom()) {
    redirects += 1
    request = request.redirectedFrom()!
  }
  expect(redirects).toBe(1)
})

test('real case studies retain Article structured data', async ({ page }) => {
  await page.goto('/case-studies/general-counsel-fintech')
  const nodes = await structuredDataNodes(page)

  expect(nodes.find((node) => node['@type'] === 'Article')).toMatchObject({
    headline: 'Appointing a General Counsel for a scaling fintech',
    publisher: { '@id': 'https://www.bsolution.eu/#organization' },
  })
})

for (const path of ['/positions/general-counsel-prague', '/cs/positions/general-counsel-prague']) {
  test(`${path} omits JobPosting without a verified publication date`, async ({ page }) => {
    const response = await page.goto(path)
    expect(response?.status()).toBe(200)
    const nodes = await structuredDataNodes(page)

    expect(nodes.find((node) => node['@type'] === 'JobPosting')).toBeUndefined()
  })
}

test('schema types stay within their intended page boundaries', async ({ page }) => {
  const cases = [
    { path: '/', absent: ['Service', 'Article', 'FAQPage'] },
    { path: '/about', absent: ['Service', 'Article', 'FAQPage'] },
    { path: '/clients', absent: ['Service', 'Article', 'FAQPage'] },
    {
      path: '/services/legal-executive-search',
      absent: ['Article', 'FAQPage'],
    },
    {
      path: '/case-studies/general-counsel-fintech',
      absent: ['Service', 'FAQPage'],
    },
    {
      path: '/positions/general-counsel-prague',
      absent: ['Service', 'Article', 'JobPosting', 'FAQPage'],
    },
  ]

  for (const entry of cases) {
    const response = await page.goto(entry.path)
    expect(response?.status()).toBe(200)
    const nodes = await structuredDataNodes(page)

    for (const type of entry.absent) {
      expect(nodes.filter((node) => node['@type'] === type), `${entry.path} must not emit ${type}`).toHaveLength(0)
    }
  }
})

const homepageEvidence = [
  {
    path: '/',
    lang: 'en',
    heading: 'Selected Executive Search Experience',
    introduction: 'Selected organisations we have supported through Executive Search assignments.',
    primary: { label: 'Discuss a Search', href: '/contact' },
    secondary: { label: 'Explore Our Services', href: '/services' },
  },
  {
    path: '/cs',
    lang: 'cs',
    heading: 'Vybrané zkušenosti z Executive Search',
    introduction: 'Vybrané organizace, které jsme podpořili prostřednictvím projektů Executive Search.',
    primary: { label: 'Probrat vyhledávání', href: '#kontakt-form' },
  },
  {
    path: '/de',
    lang: 'de',
    heading: 'Ausgewählte Executive-Search-Erfahrung',
    introduction: 'Ausgewählte Organisationen, die wir bei Executive-Search-Mandaten unterstützt haben.',
    primary: { label: 'Bedarf vertraulich besprechen', href: '#kontakt-form' },
  },
  {
    path: '/pl',
    lang: 'pl',
    heading: 'Wybrane doświadczenie w Executive Search',
    introduction: 'Wybrane organizacje, które wspieraliśmy w ramach projektów Executive Search.',
    primary: { label: 'Omów swoje potrzeby (poufnie)', href: '#kontakt-form' },
  },
] as const

for (const homepage of homepageEvidence) {
  test(`${homepage.path} presents approved Executive Search evidence`, async ({ page }) => {
    const response = await page.goto(homepage.path)
    expect(response?.status()).toBe(200)
    await expect(page.locator('html')).toHaveAttribute('lang', homepage.lang)

    const evidenceHeading = page.getByRole('heading', {
      level: 2,
      name: homepage.heading,
      exact: true,
    })
    await expect(evidenceHeading).toHaveCount(1)
    await expect(evidenceHeading).toBeVisible()

    const evidenceSection = page.locator('section').filter({ has: evidenceHeading })
    await expect(evidenceSection.getByText('Vladimír Polách', { exact: true })).toBeVisible()
    await expect(evidenceSection.getByText('Dominika Nosačková', { exact: true })).toBeVisible()
    await expect(evidenceSection.getByText(homepage.introduction, { exact: true })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Trusted by Legal Leaders', exact: true })).toHaveCount(0)

    await expect(
      page.getByRole('link', { name: homepage.primary.label, exact: true }).first(),
    ).toHaveAttribute('href', homepage.primary.href)

    if ('secondary' in homepage) {
      await expect(
        page.getByRole('link', { name: homepage.secondary.label, exact: true }).first(),
      ).toHaveAttribute('href', homepage.secondary.href)
    }
  })
}

test('English homepage preserves the approved testimonial contract', async ({ page }) => {
  await page.goto('/')
  const evidenceSection = page.locator('section').filter({
    has: page.getByRole('heading', {
      level: 2,
      name: 'Selected Executive Search Experience',
      exact: true,
    }),
  })

  await expect(evidenceSection.getByText('Vladimír Polách', { exact: true })).toBeVisible()
  await expect(evidenceSection.getByText('Partner, Squire Patton Boggs Prague', { exact: true })).toBeVisible()
  await expect(
    evidenceSection.getByText(
      '“Lukas is an experienced professional, customer oriented and constantly focused on business solutions providing a significant added value and professional guidance for his clients.”',
      { exact: true },
    ),
  ).toBeVisible()
  await expect(evidenceSection.getByText('Dominika Nosačková', { exact: true })).toBeVisible()
  await expect(
    evidenceSection.getByText('Head of Legal, Coca-Cola HBC Czech Republic & Slovakia', { exact: true }),
  ).toBeVisible()
  await expect(
    evidenceSection.getByText(
      '“Lukáš is a real expert and professional – reliable, trustworthy, task oriented. He is good advisor, perfectly understanding and supporting business.”',
      { exact: true },
    ),
  ).toBeVisible()
})

const localizedCoreRoutes = [
  {
    path: '/de/about',
    lang: 'de',
    forbidden: [
      'Our Values',
      'Ready to Start a Conversation?',
      'Countries',
      'Legal Focus',
      'Europe & Dubai',
    ],
    requiredStats: ['Länder', 'Fokus auf den Rechtsmarkt', 'Europa und Dubai'],
  },
  {
    path: '/pl/about',
    lang: 'pl',
    forbidden: [
      'Our Values',
      'Ready to Start a Conversation?',
      'Countries',
      'Legal Focus',
      'Europe & Dubai',
    ],
    requiredStats: ['Kraje', 'Specjalizacja prawna', 'Europa i Dubaj'],
  },
  {
    path: '/de/clients',
    lang: 'de',
    forbidden: ['Our Methodology', 'Our Distinction'],
  },
  {
    path: '/pl/clients',
    lang: 'pl',
    forbidden: ['Our Methodology', 'Our Distinction'],
  },
  {
    path: '/de/candidates',
    lang: 'de',
    forbidden: ['Types of Opportunities', 'How We Work With Candidates'],
  },
  {
    path: '/pl/candidates',
    lang: 'pl',
    forbidden: ['Types of Opportunities', 'How We Work With Candidates'],
  },
  {
    path: '/de/contact',
    lang: 'de',
    forbidden: ['Select an option', 'All enquiries are handled with strict confidentiality.'],
  },
  {
    path: '/pl/contact',
    lang: 'pl',
    forbidden: ['Select an option', 'All enquiries are handled with strict confidentiality.'],
  },
] as const

for (const route of localizedCoreRoutes) {
  test(`${route.path} preserves locale and contains no reviewed English fallback`, async ({ page }) => {
    const response = await page.goto(route.path)
    expect(response?.status()).toBe(200)
    await expect(page.locator('html')).toHaveAttribute('lang', route.lang)
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      `https://www.bsolution.eu${route.path}`,
    )
    await expect(page.locator('a[href="/contact"]')).toHaveCount(0)
    await expect(page.locator('a[href="/positions"]')).toHaveCount(0)

    for (const text of route.forbidden) {
      await expect(page.getByText(text, { exact: true })).toHaveCount(0)
    }

    if ('requiredStats' in route) {
      for (const text of route.requiredStats) {
        await expect(page.getByText(text, { exact: true })).toBeVisible()
      }
    }
  })
}

test('missing routes return the custom 404', async ({ page }) => {
  const response = await page.goto('/test-404-neexistuje')
  expect(response?.status()).toBe(404)
  await expect(page.getByText('Page not found', { exact: true })).toBeVisible()
  await expect(page.getByText(/Application error|Internal Server Error/)).toHaveCount(0)
})
