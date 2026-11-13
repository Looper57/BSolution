import { defineConfig } from '@playwright/test'
import base from './playwright.config'

export default defineConfig({
  ...base,
  testMatch: '**/contact-challenge.scenario.ts',
  // These journeys use intercepted provider/contact responses and a public dummy key.
  retries: 0,
  workers: 1,
  outputDir: 'test-results-challenge',
})
