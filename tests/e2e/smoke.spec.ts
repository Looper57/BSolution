import { expect, test } from '@playwright/test'

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
