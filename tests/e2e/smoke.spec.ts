import { expect, test } from '@playwright/test'

const standardRoutes = [
  { path: '/', lang: 'en', identity: 'Hire Top Legal Talent in Europe', home: '/', canonical: 'https://www.bsolution.eu' },
  { path: '/cs', lang: 'cs', identity: 'Executive Search pro právní lídry', home: '/cs', canonical: 'https://www.bsolution.eu/cs' },
  { path: '/de', lang: 'de', identity: 'Executive Search für juristische Führungskräfte', home: '/de', canonical: 'https://www.bsolution.eu/de' },
  { path: '/pl', lang: 'pl', identity: 'Executive Search dla liderów prawnych', home: '/pl', canonical: 'https://www.bsolution.eu/pl' },
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

test('missing routes return the custom 404', async ({ page }) => {
  const response = await page.goto('/test-404-neexistuje')
  expect(response?.status()).toBe(404)
  await expect(page.getByText('Page not found', { exact: true })).toBeVisible()
  await expect(page.getByText(/Application error|Internal Server Error/)).toHaveCount(0)
})
