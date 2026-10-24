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

  it('states only the owner-confirmed timeline and guarantee, never fees', () => {
    const all = countries.flatMap((c) => Object.values(c.content).flatMap((l) => l.faq ?? []))
    const text = all.map((i) => i.answer).join(' ')
    expect(text).toContain('three to four weeks')
    expect(text).toContain('12 months for senior roles (8+ years of experience)')
    for (const item of all) expect(item.answer).not.toMatch(/%|fee|honorář|Honorar|wynagrodzeni|cena|price|Preis/i)
  })
})
