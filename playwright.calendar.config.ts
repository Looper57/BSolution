import { defineConfig } from '@playwright/test'
import base from './playwright.config'

export default defineConfig({ ...base, testMatch: '**/editorial-calendar.scenario.ts', retries: 0, workers: 1, outputDir: 'test-results-calendar' })
