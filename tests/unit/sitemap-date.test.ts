import { describe, expect, it } from 'vitest'
import { sitemapDate } from '@/lib/sitemap-date'

describe('sitemap calendar dates from public feeds', () => {
  it.each([
    ['2026-11-11T05:23:02.93', '2026-11-11'],
    ['2026-11-11 05:23:02.123456', '2026-11-11'],
    ['2026-11-11T23:59:59Z', '2026-11-11'],
    ['2026-11-11T23:59:59+02:00', '2026-11-11'],
    ['2026-11-11T23:59:59-05:00', '2026-11-11'],
    ['2024-02-29', '2024-02-29'],
    ['2026-11-11', '2026-11-11'],
    ['2026-02-29', undefined],
    ['2026-02-30T01:00:00Z', undefined],
    ['2026-13-01', undefined],
    ['2026-11-11T25:00:00Z', undefined],
    ['2026-11-11T05:99:00Z', undefined],
    ['2026-11-11T05:23:02+99:00', undefined],
    ['yesterday', undefined],
    ['', undefined],
    [null, undefined],
    [undefined, undefined],
  ])('uses the source date or omits an invalid optional value: %s', (input, expected) => {
    expect(sitemapDate(input)).toBe(expected)
  })
})
