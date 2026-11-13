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
  { path: '/positions', lang: 'en', identity: 'Legal Career Opportunities', home: '/', canonical: 'https://www.bsolution.eu/positions' },
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
    h1: 'Executive search a nábor seniorních právníků',
    breadcrumb: 'Drobečková navigace',
    primary: ['Probrat důvěrné hledání', '/cs/contact'],
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
  // Regression (2026-08-22 Ahrefs audit): not-found.tsx previously had no
  // metadata export, so it inherited the root layout's global
  // `robots: { index: true }` — the 404 page was indexable. Next renders
  // more than one <meta name="robots"> for this boundary (layout chain +
  // the not-found segment both contribute), so assert every one of them is
  // restrictive rather than assuming exactly one tag.
  const robotsContents = await page.locator('meta[name="robots"]').evaluateAll((elements) =>
    elements.map((element) => element.getAttribute('content')),
  )
  expect(robotsContents.length).toBeGreaterThan(0)
  for (const content of robotsContents) {
    expect(content).toMatch(/noindex/)
  }
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(0)
  await expect(page.locator('link[rel="alternate"][hrefLang]')).toHaveCount(0)
})

// Regression (2026-08-22 Ahrefs audit): position cards on /de/positions and
// /pl/positions used to link to /de/positions/[slug] and /pl/positions/[slug]
// — a noindex, canonical-elsewhere duplicate — as the primary destination,
// because jobsData has no de/pl fields at all (positionFallbackLocales).
// Internal links must resolve to the authoritative English page instead.
for (const locale of ['de', 'pl'] as const) {
  test(`${locale}/positions links to the authoritative English position page, not the untranslated fallback`, async ({ page }) => {
    await page.goto(`/${locale}/positions`)
    const firstPositionLink = page.locator('a[href*="/positions/general-counsel-prague"]').first()
    await expect(firstPositionLink).toHaveAttribute('href', '/positions/general-counsel-prague')
    await expect(page.locator(`a[href="/${locale}/positions/general-counsel-prague"]`)).toHaveCount(0)
  })
}

// Regression (2026-08-22 Ahrefs audit — "Hreflang to non-canonical", 18
// occurrences): every /de and /pl positions listing and detail page
// canonicalizes to the English original but was still declaring hreflang
// annotations on itself, which is invalid per Google's guidance (hreflang
// belongs only on the canonical page) and exactly what Ahrefs flagged.
for (const path of ['/de/positions', '/pl/positions', '/de/positions/general-counsel-prague', '/pl/positions/general-counsel-prague']) {
  test(`${path} canonicalizes to the English page and declares no hreflang on itself`, async ({ page }) => {
    const response = await page.goto(path)
    expect(response?.status()).toBe(200)
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href')
    expect(canonical).not.toContain(`/${path.split('/')[1]}/positions`)
    await expect(page.locator('link[rel="alternate"][hrefLang]')).toHaveCount(0)
  })
}


test('international employer journeys are crawlable in initial HTML and reach canonical services', async ({ page, request }) => {
  // Read the actual server HTML before browser hydration: search bots and
  // visitors must receive useful links without waiting for client effects.
  const html = await request.get('/')
  expect(html.status()).toBe(200)
  expect(await html.text()).toContain('Legal recruitment for international law firms and in-house teams')
  await page.goto('/')
  const section = page.getByRole('region', { name: 'Legal recruitment for international law firms and in-house teams', exact: true })
  await expect(section).toBeVisible()
  for (const path of ['/law-firm-recruitment', '/services/legal-executive-search', '/hire-in-house-counsel', '/practice-areas/general-counsel', '/practice-areas/compliance-officer', '/legal-recruitment-europe', '/legal-recruitment-germany', '/legal-recruitment-dubai', '/contact']) {
    await expect(section.locator(`a[href="${path}"]`)).toHaveCount(1)
    const response = await request.get(path, { maxRedirects: 0 })
    expect(response.status(), path).toBe(200)
    expect(await response.text(), path).toContain(`href="https://www.bsolution.eu${path}"`)
  }
  await section.getByRole('link', { name: 'Hire an in-house lawyer', exact: true }).click()
  await expect(page).toHaveURL(/\/hire-in-house-counsel$/)
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  await page.goto('/services')
  await expect(page).toHaveTitle('Legal Recruitment & Executive Search Services | B Solution')
  const reference = await request.get('/llms.txt')
  expect(reference.status()).toBe(200)
  expect(reference.headers()['content-type']).toContain('text/plain')
  expect(await reference.text()).toContain('Yours Solution s.r.o.')
})


test('international employer pages answer distinct hiring needs without merging search intent', async ({ page }) => {
  await page.goto('/hire-in-house-counsel')
  const corporate = page.getByRole('region', { name: 'Planning an in-house legal hire across borders', exact: true })
  await expect(corporate).toContainText('Group General Counsel')
  await expect(corporate.locator('dt')).toHaveCount(3)
  await corporate.getByRole('link', { name: 'General Counsel and Head of Legal recruitment', exact: true }).click()
  await expect(page).toHaveURL(/\/practice-areas\/general-counsel$/)
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  await page.goto('/law-firm-recruitment')
  const firm = page.getByRole('region', { name: 'Planning a partner, lateral hire or team move', exact: true })
  await expect(firm.locator('dt')).toHaveCount(3)
  await expect(firm).toContainText('target jurisdiction')
  await expect(firm.getByRole('link', { name: 'Discuss a law firm recruitment brief', exact: true })).toHaveAttribute('href', '/contact')
})


test('German employers can discover a leadership service and initiate their own enquiry', async ({ page, request }) => {
  const response = await request.get('/de')
  expect(await response.text()).toContain('Sie suchen juristische Verstärkung')
  await page.goto('/de')
  const help = page.getByRole('region', { name: 'Sie suchen juristische Verstärkung für Ihr Unternehmen oder Ihre Kanzlei?', exact: true })
  await expect(help).toBeVisible()
  await expect(help.getByRole('link', { name: 'Zusammenarbeit mit B Solution', exact: true })).toHaveAttribute('href', '/de/clients')
  await help.getByRole('link', { name: 'General Counsel oder Head of Legal finden', exact: true }).click()
  await expect(page).toHaveURL(/\/de\/practice-areas\/general-counsel$/)
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Head of Legal')
  await page.locator('aside a[href="/de/contact"]').click()
  await expect(page).toHaveURL(/\/de\/contact$/)
  await expect(page.getByRole('textbox').first()).toBeVisible()
})

for (const route of [
  { path: '/practice-areas/general-counsel', lang: 'en', question: 'Do we need a General Counsel, a Group General Counsel or a Head of Legal?', heading: 'Which legal leadership appointment does your business need?' },
  { path: '/de/practice-areas/general-counsel', lang: 'de', question: 'Brauchen wir einen General Counsel, Group General Counsel oder Head of Legal?', heading: 'Welche juristische Führungsrolle braucht Ihr Unternehmen?' },
]) {
  test(`${route.lang} leadership answers stay visible, canonical and consistent with FAQ data`, async ({ page, request }) => {
    const response = await request.get(route.path)
    expect(response.status()).toBe(200)
    expect(await response.text()).toContain(route.question)
    await page.goto(route.path)
    await expect(page.locator('html')).toHaveAttribute('lang', route.lang)
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://www.bsolution.eu${route.path}`)
    await expect(page.getByRole('heading', { name: route.heading, exact: true })).toBeVisible()
    const visible = await page.locator('section[aria-labelledby="faq-heading"] dt').allTextContents()
    expect(visible).toContain(route.question)
    const nodes = await structuredDataNodes(page)
    const faq = nodes.find(node => node['@type'] === 'FAQPage')
    expect(faq.mainEntity.map((item: { name: string }) => item.name)).toEqual(visible)
  })
}

test('brand fonts load from this site without Google Fonts requests', async ({ page, request }) => {
  const externalFontRequests: string[] = []
  page.on('request', req => {
    if (/^https:\/\/(fonts\.googleapis\.com|fonts\.gstatic\.com)\//.test(req.url())) externalFontRequests.push(req.url())
  })
  await page.goto('/de')
  const fontUrls = await page.locator('link[rel="preload"][as="font"]').evaluateAll(elements => elements.map(element => element.getAttribute('href')!))
  expect(fontUrls).toHaveLength(2)
  for (const url of fontUrls) {
    expect(url).toMatch(/^\/_next\/static\/media\/.+\.woff2$/)
    const response = await request.get(url)
    expect(response.status()).toBe(200)
    expect((await response.body()).subarray(0, 4).toString()).toBe('wOF2')
  }
  const fonts = await page.evaluate(async () => {
    await document.fonts.ready
    return [...document.fonts].filter(font => !font.family.includes('Fallback')).map(font => font.status)
  })
  expect(fonts).toEqual(['loaded', 'loaded'])
  expect(externalFontRequests).toEqual([])
})

test('Google receives valid sitemap dates and a separate canonical employer inventory', async ({ page, request }) => {
  const full = await request.get('/site-sitemap.xml')
  const legacy = await request.get('/sitemap.xml')
  const employers = await request.get('/employer-sitemap.xml')
  expect(full.status()).toBe(200)
  expect(legacy.status()).toBe(200)
  expect(employers.status()).toBe(200)
  expect(employers.headers()['content-type']).toContain('application/xml')
  await page.goto('/de')
  const parsed = await page.evaluate(({ fullXml, employerXml, legacyXml }) => {
    const read = (xml: string) => {
      const document = new DOMParser().parseFromString(xml, 'application/xml')
      const values = (name: string) => [...document.getElementsByTagNameNS('http://www.sitemaps.org/schemas/sitemap/0.9', name)].map(node => node.textContent!)
      return { errors: document.querySelectorAll('parsererror').length, urls: values('loc'), dates: values('lastmod'), alternateCount: document.getElementsByTagNameNS('http://www.w3.org/1999/xhtml', 'link').length }
    }
    return { full: read(fullXml), employers: read(employerXml), legacy: read(legacyXml) }
  }, { fullXml: await full.text(), employerXml: await employers.text(), legacyXml: await legacy.text() })
  expect(parsed.full.errors).toBe(0)
  expect(parsed.employers.errors).toBe(0)
  expect(parsed.legacy.errors).toBe(0)
  expect(parsed.full.urls.slice().sort()).toEqual(parsed.legacy.urls.slice().sort())
  expect(parsed.employers.urls.length).toBeGreaterThan(50)
  expect(new Set(parsed.employers.urls).size).toBe(parsed.employers.urls.length)
  expect(parsed.employers.alternateCount).toBeGreaterThan(0)
  expect(parsed.employers.urls.every(url => parsed.full.urls.includes(url))).toBe(true)
  expect(parsed.employers.urls).toContain('https://www.bsolution.eu/hire-in-house-counsel')
  expect(parsed.employers.urls).toContain('https://www.bsolution.eu/law-firm-recruitment')
  expect(parsed.employers.urls.some(url => /\/(positions|legal-jobs|candidates|available-lawyers)(\/|$)/.test(new URL(url).pathname))).toBe(false)
  expect(parsed.full.dates.every(date => /^\d{4}-\d{2}-\d{2}$/.test(date))).toBe(true)
  const robots = await request.get('/robots.txt')
  expect(await robots.text()).toContain('Sitemap: https://www.bsolution.eu/employer-sitemap.xml')
  expect(await robots.text()).toContain('Sitemap: https://www.bsolution.eu/site-sitemap.xml')
})

test('foreign employer pages state their recruitment scope and lead to a voluntary enquiry', async ({ page, request }) => {
  for (const route of [
    { path: '/law-firm-recruitment', heading: 'International Law Firm Recruitment', title: 'International Law Firm Recruitment', enquiry: 'Discuss a law firm recruitment brief' },
    { path: '/hire-in-house-counsel', heading: 'In-House Legal Recruitment for Companies', title: 'In-House Legal Recruitment', enquiry: 'Discuss an in-house legal recruitment brief' },
  ]) {
    const response = await request.get(route.path)
    expect(await response.text()).toContain(route.heading)
    await page.goto(route.path)
    await expect(page).toHaveTitle(new RegExp(route.title))
    await expect(page.getByRole('heading', { level: 1, name: route.heading, exact: true })).toBeVisible()
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://www.bsolution.eu${route.path}`)
    await page.getByRole('link', { name: route.enquiry, exact: true }).click()
    await expect(page).toHaveURL(/\/contact$/)
    await expect(page.getByRole('textbox').first()).toBeVisible()
  }
})

test('company visitors can choose the right legal recruitment service from crawlable content', async ({ page, request }) => {
  const response = await request.get('/for-companies')
  expect(await response.text()).toContain('Which legal recruitment brief fits your company?')
  await page.goto('/for-companies')
  await expect(page).toHaveTitle('Corporate Legal Recruitment | For Companies | B Solution')
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://www.bsolution.eu/for-companies')
  const guide = page.getByRole('region', { name: 'Which legal recruitment brief fits your company?', exact: true })
  await expect(guide.getByRole('article')).toHaveCount(3)
  await expect(guide.getByRole('link', { name: 'international law firm partner and lateral recruitment', exact: true })).toHaveAttribute('href', '/law-firm-recruitment')
  await guide.getByRole('link', { name: 'Plan your first in-house counsel appointment', exact: true }).click()
  await expect(page).toHaveURL(/\/hire-in-house-counsel$/)
  await expect(page.getByRole('heading', { level: 1 })).toContainText('In-House Legal Recruitment')
})

test('leadership visitors receive a decision brief and clearly labelled illustrative context', async ({ page, request }) => {
  const response = await request.get('/hire-legal-leader')
  const html = await response.text()
  expect(html).toContain('A legal leadership brief your decision-makers can agree')
  expect(html).not.toContain('Replacing the wrong hire often takes 6–12 months')
  await page.goto('/hire-legal-leader')
  const brief = page.getByRole('region', { name: 'A legal leadership brief your decision-makers can agree', exact: true })
  await expect(brief.locator('dt')).toHaveCount(4)
  await expect(brief.getByRole('link', { name: 'illustrative first-General-Counsel mandate for a cross-border fintech', exact: true })).toHaveAttribute('href', '/case-studies/general-counsel-fintech')
  await expect(brief.getByRole('link', { name: 'General Counsel and Head of Legal role', exact: true })).toHaveAttribute('href', '/practice-areas/general-counsel')
  await brief.getByRole('link', { name: 'Discuss your legal leadership brief', exact: true }).click()
  await expect(page).toHaveURL(/\/contact$/)
  await expect(page.getByRole('textbox').first()).toBeVisible()
})


for (const locale of ['de', 'pl', 'cs']) {
  test(`${locale} homepage enquiry waits for confirmed delivery and retains employer details`, async ({ page }) => {
    const requests: Record<string, unknown>[] = []
    await page.route('**/api/contact', async route => {
      requests.push(route.request().postDataJSON())
      const first = requests.length === 1
      await route.fulfill({ status: first ? 503 : 200, contentType: 'application/json', body: JSON.stringify({ success: requests.length > 2 }) })
    })
    await page.goto(`/${locale}#kontakt-form`)
    const form = page.locator('#kontakt-form form')
    await form.locator('#name').fill('Test Employer')
    await form.locator('#email').fill('employer@example.com')
    await form.locator('#company').fill('Example Legal')
    await form.locator('#phone').fill('+49 123 456')
    await form.locator('#message').fill('Test legal recruitment brief')
    await form.getByRole('combobox').click()
    await page.getByRole('option').first().click()
    await form.getByRole('button', { name: /./ }).click()
    await expect(form).toBeVisible()
    await expect(form.locator('#company')).toHaveValue('Example Legal')
    await expect(form.getByRole('alert')).toBeVisible()
    await form.getByRole('button', { name: /./ }).click()
    await expect(form.getByRole('alert')).toBeVisible()
    await form.getByRole('button', { name: /./ }).click()
    await expect(form).toHaveCount(0)
    expect(requests).toHaveLength(3)
    expect(requests[2]).toMatchObject({ name: 'Test Employer', email: 'employer@example.com', company: 'Example Legal', phone: '+49 123 456', type: 'hiring', message: 'Test legal recruitment brief' })
  })
}


for (const path of ['/hire-in-house-counsel', '/law-firm-recruitment', '/legal-recruitment-europe', '/legal-recruitment-germany', '/legal-recruitment-dubai', '/legal-recruitment-prague']) {
  test(`${path} preserves a failed employer brief and records only the submission page`, async ({ page }) => {
    const requests: Record<string, unknown>[] = []
    await page.route('**/api/contact', async route => {
      requests.push(route.request().postDataJSON())
      if (requests.length === 1) return route.abort('failed')
      await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ success: requests.length > 2 }) })
    })
    await page.goto(`${path}?private=must-not-be-recorded#contact-form`)
    const form = page.locator('form#contact-form')
    await expect(form.getByLabel('I am...', { exact: true })).toContainText('Seeking to hire')
    await form.locator('#name').fill('Test Employer')
    await form.locator('#email').fill('employer@example.com')
    await form.locator('#company').fill('Example Legal')
    await form.locator('#message').fill('Test recruitment brief')
    const submit = form.getByRole('button', { name: 'Send Message', exact: true })
    await submit.click()
    await expect(form.getByRole('alert')).toBeVisible()
    await expect(form.locator('#message')).toHaveValue('Test recruitment brief')
    await submit.click()
    await expect(form.getByRole('alert')).toBeVisible()
    if (path === '/law-firm-recruitment') {
      await form.getByLabel('I am...', { exact: true }).click()
      await page.getByRole('option', { name: 'A legal professional', exact: true }).click()
    }
    await submit.click()
    await expect(form).toHaveCount(0)
    expect(requests).toHaveLength(3)
    expect(requests[2]).toMatchObject({ company: 'Example Legal', type: path === '/law-firm-recruitment' ? 'candidate' : 'hiring', formPage: path })
    expect(JSON.stringify(requests)).not.toContain('must-not-be-recorded')
    await page.getByRole('button', { name: 'Send Another Message', exact: true }).click()
    await expect(form.locator('#message')).toHaveValue('')
    await expect(form.getByLabel('I am...', { exact: true })).toContainText('Seeking to hire')
  })
}


test('law firm decision-makers can define a partner or team mandate and reach its enquiry form', async ({ page, request }) => {
  const html = await (await request.get('/law-firm-recruitment')).text()
  expect(html).toContain('Which partner or team search does your firm need?')
  expect(html).toContain('Assess proposed client opportunities separately from confirmed commitments.')
  await page.goto('/law-firm-recruitment')
  const guide = page.getByRole('region', { name: 'Which partner or team search does your firm need?', exact: true })
  await expect(guide.getByRole('article')).toHaveCount(3)
  await expect(guide.getByRole('heading', { name: 'Bring in a partner and team', exact: true })).toBeVisible()
  const process = page.getByRole('region', { name: 'From a growth priority to a defined search', exact: true })
  await expect(process.getByRole('listitem')).toHaveCount(4)
  await expect(process.getByRole('link', { name: /published experience/ })).toHaveAttribute('href', '/services/legal-executive-search')
  await guide.getByRole('link', { name: 'Discuss your partner or team recruitment brief', exact: true }).click()
  await expect(page).toHaveURL(/\/law-firm-recruitment#contact-form$/)
  await expect(page.locator('form#contact-form #name')).toBeVisible()
  await expect(page.locator('form#contact-form').getByLabel('I am...', { exact: true })).toContainText('Seeking to hire')
})


test('companies can compare in-house responsibilities and reach a scoped employer enquiry', async ({ page, request }) => {
  const html = await (await request.get('/hire-in-house-counsel')).text()
  expect(html).toContain('Which in-house legal role fits the work?')
  expect(html).toContain('A first hire does not automatically mean a junior role.')
  await page.goto('/hire-in-house-counsel')
  const comparison = page.getByRole('region', { name: 'Compare in-house legal hiring responsibilities', exact: true })
  await expect(comparison.getByRole('row')).toHaveCount(4)
  await expect(comparison.getByRole('rowheader', { name: 'General Counsel or Head of Legal', exact: true })).toBeVisible()
  const brief = page.getByRole('region', { name: 'Prepare a brief your business and legal stakeholders can assess', exact: true })
  await expect(brief.locator('dt')).toHaveCount(4)
  await expect(brief.getByRole('link', { name: 'illustrative General Counsel mandate for a cross-border fintech', exact: true })).toHaveAttribute('href', '/case-studies/general-counsel-fintech')
  await brief.getByRole('link', { name: 'Discuss the scope of your in-house legal hire', exact: true }).click()
  await expect(page).toHaveURL(/\/hire-in-house-counsel#contact-form$/)
  await expect(page.locator('form#contact-form').getByLabel('I am...', { exact: true })).toContainText('Seeking to hire')
  await page.setViewportSize({ width: 375, height: 812 })
  await expect(comparison).toBeVisible()
  const widths = await page.evaluate(() => ({ page: document.documentElement.scrollWidth, viewport: window.innerWidth }))
  expect(widths.page).toBeLessThanOrEqual(widths.viewport)
})

for (const market of [
  { path: '/legal-recruitment-germany', heading: 'Define your legal recruitment brief for Germany', enquiry: 'Discuss a legal hire in Germany', distinct: 'DACH or group-wide remit', removed: 'years of active engagement' },
  { path: '/legal-recruitment-dubai', heading: 'Define your legal recruitment brief for Dubai and the UAE', enquiry: 'Discuss a legal hire in Dubai or the UAE', distinct: 'Dubai or Abu Dhabi appointment', removed: 'B Solution has built significant expertise in Middle East' },
]) {
  test(`${market.path} keeps employer intent and market scope distinct`, async ({ page, request }) => {
    const html = await (await request.get(market.path)).text()
    expect(html).toContain(market.heading)
    expect(html).toContain(market.distinct)
    expect(html).not.toContain(market.removed)
    await page.goto(market.path)
    const guide = page.getByRole('region', { name: market.heading, exact: true })
    await expect(guide.getByRole('article')).toHaveCount(2)
    await expect(guide.getByRole('link', { name: 'Define your in-house recruitment scope', exact: true })).toHaveAttribute('href', '/hire-in-house-counsel')
    await expect(guide.getByRole('link', { name: 'Plan a partner or team search', exact: true })).toHaveAttribute('href', '/law-firm-recruitment')
    const scope = page.getByRole('region', { name: 'Agree the location, responsibilities and assessment', exact: true })
    await expect(scope.locator('dt')).toHaveCount(4)
    await expect(scope.getByRole('link', { name: /published experience/ })).toHaveAttribute('href', '/services/legal-executive-search')
    await guide.getByRole('link', { name: market.enquiry, exact: true }).click()
    await expect(page).toHaveURL(new RegExp(`${market.path}#contact-form$`))
    await expect(page.locator('form#contact-form').getByLabel('I am...', { exact: true })).toContainText('Seeking to hire')
  })
}

test('German employers can knowingly open the English Germany recruitment brief', async ({ page }) => {
  await page.goto('/de')
  await page.getByRole('link', { name: 'Personalbedarf in Deutschland konkretisieren (Englisch)', exact: true }).click()
  await expect(page).toHaveURL(/legal-recruitment-germany$/)
  await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  await expect(page.getByRole('heading', { name: 'Define your legal recruitment brief for Germany', exact: true })).toBeVisible()
  await page.locator('header a[href="/clients"]').click()
  await expect(page).toHaveURL(/clients$/)
  await page.locator('header').getByRole('button', { name: 'Auf Deutsch umschalten', exact: true }).click()
  await expect(page).toHaveURL(/de\/clients$/)
  await expect(page.locator('html')).toHaveAttribute('lang', 'de')
})

test('an explicitly chosen service reaches the visible enquiry and survives a failed send', async ({ page }) => {
  const requests: Record<string, unknown>[] = []
  await page.route('**/api/contact', async route => {
    requests.push(route.request().postDataJSON())
    await route.fulfill({ status: requests.length === 1 ? 503 : 200, contentType: 'application/json', body: JSON.stringify({ success: requests.length > 1 }) })
  })
  await page.goto('/services')
  await page.locator('#executive-search').getByRole('link', { name: 'Discuss This Service', exact: true }).click()
  await expect(page).toHaveURL(/contact#service-executive-search$/)
  const form = page.locator('form#contact-form')
  const selected = form.getByRole('region', { name: 'Selected service', exact: true })
  await expect(selected).toContainText('Legal Executive Search')
  await expect(selected).toBeInViewport()
  await expect(form.getByLabel('I am...', { exact: true })).toContainText('Seeking to hire')
  await form.locator('#name').fill('Test Employer')
  await form.locator('#email').fill('employer@example.com')
  await form.locator('#message').fill('Test search brief')
  await form.getByRole('button', { name: 'Send Message', exact: true }).click()
  await expect(form.getByRole('alert')).toBeVisible()
  await expect(selected).toContainText('Legal Executive Search')
  await expect(form.locator('#message')).toHaveValue('Test search brief')
  await form.getByRole('button', { name: 'Send Message', exact: true }).click()
  await expect(form).toHaveCount(0)
  expect(requests).toHaveLength(2)
  expect(requests[1]).toMatchObject({ serviceInterest: 'executive-search', formPage: '/contact', type: 'hiring', message: 'Test search brief' })
})

test('a visitor can clear the service choice without losing their brief', async ({ page }) => {
  let submitted: Record<string, unknown> | undefined
  await page.route('**/api/contact', async route => {
    submitted = route.request().postDataJSON()
    await route.fulfill({ status: 200, contentType: 'application/json', body: '{"success":true}' })
  })
  await page.goto('/services')
  await page.locator('#strategic-advisory').getByRole('link', { name: 'Discuss This Service', exact: true }).click()
  const form = page.locator('form#contact-form')
  await expect(form.getByRole('region', { name: 'Selected service', exact: true })).toContainText('Strategic Advisory')
  await form.locator('#name').fill('Test Employer')
  await form.locator('#email').fill('employer@example.com')
  await form.locator('#message').fill('Keep this brief')
  await form.getByRole('button', { name: 'Clear service selection', exact: true }).click()
  await expect(page).toHaveURL(/contact#contact-form$/)
  await expect(form.getByRole('region', { name: 'Selected service', exact: true })).toHaveCount(0)
  await expect(form.locator('#message')).toHaveValue('Keep this brief')
  await form.getByRole('button', { name: 'Send Message', exact: true }).click()
  await expect(form).toHaveCount(0)
  expect(submitted).not.toHaveProperty('serviceInterest')
  expect(submitted).toMatchObject({ message: 'Keep this brief', formPage: '/contact' })
})

test('unknown or query-bearing service fragments do not become an enquiry selection', async ({ page }) => {
  for (const fragment of ['__proto__', 'executive-search?email=ignored']) {
    await page.goto(`/contact#service-${fragment}`)
    await expect(page.getByRole('region', { name: 'Selected service', exact: true })).toHaveCount(0)
    await expect(page.locator('form#contact-form').getByLabel('I am...', { exact: true })).toContainText('Select an option')
  }
})


test('an explicit service choice follows the visitor to a translated contact form', async ({ page }) => {
  await page.goto('/services')
  await page.locator('#executive-search').getByRole('link', { name: 'Discuss This Service', exact: true }).click()
  await expect(page.getByRole('region', { name: 'Selected service', exact: true })).toContainText('Legal Executive Search')
  await page.locator('header').getByRole('button', { name: 'Auf Deutsch umschalten', exact: true }).click()
  await expect(page).toHaveURL(/de\/contact#service-executive-search$/)
  await expect(page.locator('html')).toHaveAttribute('lang', 'de')
  await expect(page.getByRole('region', { name: 'Ausgewählte Leistung', exact: true })).toContainText('Legal Executive Search')
  await page.locator('header').getByRole('button', { name: 'Switch to English', exact: true }).click()
  await expect(page).toHaveURL(/contact#service-executive-search$/)
  await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  await expect(page.getByRole('region', { name: 'Selected service', exact: true })).toContainText('Legal Executive Search')
})

test('European employers can scope a cross-border hire and find the matching service', async ({ page, request }) => {
  const html = await (await request.get('/legal-recruitment-europe')).text()
  expect(html).toContain('What does your European legal hire need to achieve?')
  expect(html).not.toContain('Real-time insight into compensation benchmarks')
  await page.goto('/legal-recruitment-europe')
  const situations = page.getByRole('region', { name: 'What does your European legal hire need to achieve?', exact: true })
  await expect(situations.getByRole('article')).toHaveCount(3)
  await expect(situations.getByRole('link', { name: 'Plan an in-house counsel appointment', exact: true })).toHaveAttribute('href', '/hire-in-house-counsel')
  await expect(situations.getByRole('link', { name: 'Define the legal leadership remit', exact: true })).toHaveAttribute('href', '/practice-areas/general-counsel')
  await expect(situations.getByRole('link', { name: 'Plan a partner or team search', exact: true })).toHaveAttribute('href', '/law-firm-recruitment')
  const scope = page.getByRole('region', { name: 'Agree the cross-border search brief', exact: true })
  await expect(scope.locator('dt')).toHaveCount(6)
  const process = page.getByRole('region', { name: 'From an international requirement to an agreed search', exact: true })
  await expect(process.getByRole('link', { name: /published experience/ })).toHaveAttribute('href', '/services/legal-executive-search')
  await situations.getByRole('link', { name: 'Plan a partner or team search', exact: true }).click()
  await expect(page).toHaveURL(/law-firm-recruitment$/)
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
})

test('a mobile European employer can reach and submit the existing scoped enquiry', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  let submitted: Record<string, unknown> | undefined
  await page.route('**/api/contact', async route => {
    submitted = route.request().postDataJSON()
    await route.fulfill({ status: 200, contentType: 'application/json', body: '{"success":true}' })
  })
  await page.goto('/legal-recruitment-europe')
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
  await page.getByRole('link', { name: 'Discuss a cross-border legal recruitment brief', exact: true }).click()
  await expect(page).toHaveURL(/legal-recruitment-europe#contact-form$/)
  const form = page.locator('form#contact-form')
  await expect(form.getByLabel('I am...', { exact: true })).toContainText('Seeking to hire')
  await expect(form.locator('#name')).toBeInViewport()
  await form.locator('#name').fill('Test Employer')
  await form.locator('#email').fill('employer@example.com')
  await form.locator('#message').fill('Germany-based regional legal lead, English and German, group reporting.')
  await form.getByRole('button', { name: 'Send Message', exact: true }).click()
  await expect(form).toHaveCount(0)
  expect(submitted).toMatchObject({ type: 'hiring', formPage: '/legal-recruitment-europe', message: 'Germany-based regional legal lead, English and German, group reporting.' })
})

test('an employer can read the compliance scope and reach the established search enquiry', async ({ page, request }) => {
  const path = '/practice-areas/compliance-officer'
  const html = await (await request.get(path)).text()
  expect(html).toContain('Define the compliance role before the search')
  expect(html).toContain('coordinates a regional or group programme')
  await page.goto(path)
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://www.bsolution.eu${path}`)
  await expect(page.getByRole('heading', { name: 'Define the compliance role before the search', exact: true })).toBeVisible()
  const section = page.locator('article section').filter({ has: page.getByRole('heading', { name: 'Define the compliance role before the search', exact: true }) })
  await expect(section.locator('p')).toHaveCount(6)
  await expect(section).toContainText('Identify confidentiality requirements for a replacement search.')
  await expect(page.locator('article a[href="/services/legal-executive-search"]')).toBeVisible()
  await page.locator('aside a[href="/contact"]').click()
  await expect(page).toHaveURL(/contact$/)
  await expect(page.locator('form#contact-form')).toBeVisible()
})

for (const route of [
  { locale: 'en', path: '/clients', heading: 'Choose the next step for your legal hire', catalogue: '/available-lawyers', directory: 'https://www.lawbridge.eu/en/lawyers', selection: 'Selected service' },
  { locale: 'cs', path: '/cs/clients', heading: 'Vyberte další krok pro váš právní tým', catalogue: '/cs/available-lawyers', directory: 'https://www.lawbridge.eu/cs/advokati', selection: 'Vybraná služba' },
  { locale: 'de', path: '/de/clients', heading: 'Wählen Sie den nächsten Schritt für Ihr Rechtsteam', catalogue: '/de/available-lawyers', directory: 'https://www.lawbridge.eu/de/anwaelte', selection: 'Ausgewählte Leistung' },
  { locale: 'pl', path: '/pl/clients', heading: 'Wybierz kolejny krok dla swojego zespołu prawnego', catalogue: '/pl/available-lawyers', directory: 'https://www.lawbridge.eu/pl/prawnicy', selection: 'Wybrana usługa' },
]) {
  test(`${route.locale} employer can choose candidate profiles, a scoped search or the separate legal-adviser directory`, async ({ page, request }) => {
    expect(await (await request.get(route.path)).text()).toContain(route.heading)
    await page.goto(route.path)
    const guide = page.getByRole('region', { name: route.heading, exact: true })
    await expect(guide.getByRole('article')).toHaveCount(2)
    await expect(guide.locator(`a[href="${route.directory}"]`)).toHaveCount(1)
    await expect(guide.locator('aside')).toContainText('LawBridge')
    await guide.locator(`a[href="${route.catalogue}"]`).click()
    await expect(page).toHaveURL(new RegExp(`${route.catalogue}$`))
    await expect(page.locator('html')).toHaveAttribute('lang', route.locale)
    await page.goBack()
    await expect(page).toHaveURL(new RegExp(`${route.path}$`))
    await page.getByRole('region', { name: route.heading, exact: true }).locator('a[href$="#service-executive-search"]').click()
    await expect(page).toHaveURL(/contact#service-executive-search$/)
    await expect(page.getByRole('region', { name: route.selection, exact: true })).toBeVisible()
    await expect(page.locator('html')).toHaveAttribute('lang', route.locale)
  })
}
