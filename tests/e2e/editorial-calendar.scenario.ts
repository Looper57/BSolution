import { test, expect } from '@playwright/test'
import { mkdir, writeFile } from 'node:fs/promises'

test('the real server route renders a due fixture and keeps future content out of HTML', async ({ page, request }) => {
  await page.route('https://challenges.cloudflare.com/turnstile/v0/api.js*', route => route.fulfill({ contentType: 'application/javascript', body: '/* No provider call in the calendar-only fixture. */' }))
  const due = await page.goto('/law-firm-recruitment')
  expect(due?.status()).toBe(200)
  await expect(page.getByRole('heading', { name: 'CI_ONLY_DUE_SECTION', exact: true })).toBeVisible()
  await expect(page.locator('[data-editorial-id="ci-calendar-due"]')).toHaveCount(1)
  expect(await due!.text()).toContain('CI_ONLY_DUE_SECTION')
  const future = await page.goto('/hire-in-house-counsel')
  expect(future?.status()).toBe(200)
  await expect(page.locator('[data-editorial-id="ci-calendar-future"]')).toHaveCount(0)
  expect(await future!.text()).not.toContain('CI_ONLY_FUTURE_SECTION')
  const xml = await request.get('/site-sitemap.xml')
  expect(xml.status()).toBe(200)
  const futureDate = new Date(Date.parse(new Date().toISOString().slice(0, 10)) + 2 * 86400000).toISOString().slice(0, 10)
  const row = (await xml.text()).match(/<url>(?:(?!<\/url>)[\s\S])*<loc>https:\/\/www.bsolution.eu\/hire-in-house-counsel<\/loc>(?:(?!<\/url>)[\s\S])*<\/url>/)?.[0]
  expect(row).toBeTruthy(); expect(row).not.toContain(futureDate)
  await mkdir('artifacts', { recursive: true })
  await writeFile('artifacts/editorial-calendar-fixture-proof.json', JSON.stringify({ synthetic: true, realRouteDueVisible: true, futureAbsentFromHtml: true, futureDateAbsentFromSitemap: true, productionContentChangedByFixture: false }, null, 2) + '\n')
})
