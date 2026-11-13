import { test, expect, type Page } from '@playwright/test'

// Only returned by the test's intercepted script request. Never shipped by the app.
const provider = `(() => {
  let sequence = 0;
  const widgets = new Map();
  window.turnstile = {
    render(container, options) {
      const id = 'test-widget-' + (++sequence);
      const marker = document.createElement('span');
      marker.dataset.testChallenge = id;
      container.appendChild(marker);
      widgets.set(id, { options, marker });
      queueMicrotask(() => options.callback('test-token-' + (++sequence)));
      return id;
    },
    reset(id) { const w = widgets.get(id); if (!w) throw Error('removed widget'); queueMicrotask(() => w.options.callback('test-token-' + (++sequence))); },
    remove(id) { const w = widgets.get(id); w?.marker.remove(); widgets.delete(id); }
  };
})();`

async function fillBrief(page: Page) {
  const form = page.locator('form#contact-form')
  await form.locator('#name').fill('Test Employer')
  await form.locator('#email').fill('employer@example.com')
  await form.locator('#company').fill('Example Legal')
  await form.locator('#message').fill('Synthetic international legal recruitment brief')
  return form
}

test('widget-enabled employer retry and a second message use fresh tokens', async ({ page }) => {
  await page.route('https://challenges.cloudflare.com/turnstile/v0/api.js*', route => route.fulfill({ contentType: 'application/javascript', body: provider }))
  const requests: Record<string, unknown>[] = []
  await page.route('**/api/contact', route => {
    requests.push(route.request().postDataJSON())
    return route.fulfill({ status: requests.length === 1 ? 503 : 200, contentType: 'application/json', body: JSON.stringify({ success: requests.length !== 1 }) })
  })
  await page.goto('/contact#service-executive-search')
  await expect(page.locator('[data-test-challenge]')).toHaveCount(1)
  const form = await fillBrief(page)
  const submit = form.getByRole('button', { name: 'Send Message', exact: true })
  await submit.click()
  await expect(form.getByRole('alert')).toBeVisible()
  await expect(form.locator('#message')).toHaveValue('Synthetic international legal recruitment brief')
  await submit.click()
  await expect(form).toHaveCount(0)
  await expect(page.locator('[data-test-challenge]')).toHaveCount(0)
  await page.getByRole('button', { name: 'Send Another Message', exact: true }).click()
  await expect(page.locator('[data-test-challenge]')).toHaveCount(1)
  await fillBrief(page)
  await expect(form.getByLabel('I am...', { exact: true })).toContainText('Seeking to hire')
  await submit.click()
  await expect(form).toHaveCount(0)
  expect(requests).toHaveLength(3)
  expect(new Set(requests.map(r => r.turnstileToken)).size).toBe(3)
  for (const request of requests) {
    expect(request).toMatchObject({ type: 'hiring', serviceInterest: 'executive-search', formPage: '/contact' })
    expect(request.turnstileToken).toMatch(/^test-token-/)
  }
})

test('a pending shared script attaches to the current form after SPA navigation', async ({ page }) => {
  let release!: () => void
  const gate = new Promise<void>(resolve => { release = resolve })
  let requested!: () => void
  const started = new Promise<void>(resolve => { requested = resolve })
  await page.route('https://challenges.cloudflare.com/turnstile/v0/api.js*', async route => {
    requested(); await gate
    await route.fulfill({ contentType: 'application/javascript', body: provider })
  })
  const requests: Record<string, unknown>[] = []
  await page.route('**/api/contact', route => {
    requests.push(route.request().postDataJSON())
    return route.fulfill({ contentType: 'application/json', body: '{"success":true}' })
  })
  // The deliberately pending async script prevents the load event; hydration still runs.
  await page.goto('/contact', { waitUntil: 'domcontentloaded' })
  await started
  await page.locator('header a[href="/"]').first().click()
  await expect(page).toHaveURL('/')
  await page.locator('a[href="/contact"]').first().click()
  await expect(page).toHaveURL('/contact')
  await expect(page.locator('form#contact-form')).toBeVisible()
  const form = await fillBrief(page)
  await form.getByLabel('I am...', { exact: true }).click()
  await page.getByRole('option', { name: 'Seeking to hire', exact: true }).click()
  await form.getByRole('button', { name: 'Send Message', exact: true }).click()
  await expect(form.getByRole('alert')).toBeVisible()
  expect(requests).toHaveLength(0)
  release()
  await expect(page.locator('[data-test-challenge]')).toHaveCount(1)
  await form.getByRole('button', { name: 'Send Message', exact: true }).click()
  await expect(form).toHaveCount(0)
  expect(requests).toHaveLength(1)
  expect(requests[0]).toMatchObject({ formPage: '/contact', type: 'hiring' })
  expect(requests[0].turnstileToken).toMatch(/^test-token-/)
})
