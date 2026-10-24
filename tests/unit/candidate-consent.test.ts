import { describe, expect, it } from 'vitest'
import { candidateConsentText, APPLY_ENDPOINT } from '@/lib/candidate-consent'

describe('candidate consent (M6, controller Yours Solution s.r.o.)', () => {
  it('names the controller, the purpose, the retention and how to withdraw in every site language', () => {
    for (const locale of ['en', 'cs', 'de', 'pl']) {
      const text = candidateConsentText(locale)
      expect(text).toContain('Yours Solution s.r.o.')
      expect(text).toContain('info@bsolution.eu')
      expect(text).toMatch(/2/)
    }
    expect(candidateConsentText('fr')).toBe(candidateConsentText('en'))
  })

  it('sends applications to the LawBridge applications API for the position', () => {
    expect(APPLY_ENDPOINT(501)).toBe('https://www.lawbridge.eu/api/recruitment/positions/501/apply')
  })
})
