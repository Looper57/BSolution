import { describe, expect, it } from 'vitest'
import { countries } from '@/lib/content/countries'

describe('country pages open with questions and direct answers', () => {
  for (const slug of ['czech-republic', 'germany', 'united-arab-emirates']) {
    it(`${slug} has Q&A in every locale, each answer a complete sentence`, () => {
      const country = countries.find((c) => c.slug === slug)!
      for (const locale of ['en', 'cs', 'de', 'pl'] as const) {
        const faq = country.content[locale].faq ?? []
        expect(faq.length, `${slug} ${locale}`).toBeGreaterThanOrEqual(3)
        for (const item of faq) {
          expect(item.question.trim().endsWith('?')).toBe(true)
          expect(item.answer.trim()).toMatch(/[.!]$/)
        }
      }
    })
  }

  it('never promises timelines, fees or guarantees the site does not state', () => {
    const all = countries.flatMap((c) => Object.values(c.content).flatMap((l) => l.faq ?? []))
    for (const item of all) expect(item.answer).not.toMatch(/\d+\s*(weeks|týdn|Wochen|tygodni|%)|guarantee|záruk|Garantie|gwarancj/i)
  })
})
