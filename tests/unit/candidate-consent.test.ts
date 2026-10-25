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

describe('consent for a CV without a position (M6.1)', () => {
  it('matches lawbridge.eu and does not mention "this position"', async () => {
    const { registrationConsentText, REGISTRATION_CONSENT_VERSION, REGISTER_ENDPOINT } = await import('@/lib/candidate-consent')
    expect(REGISTRATION_CONSENT_VERSION).toBe('2026-10-24-yours-solution-2y-future')
    expect(registrationConsentText('cs')).toContain('nabízení vhodných pozic')
    expect(registrationConsentText('en')).not.toContain('this position')
    expect(REGISTER_ENDPOINT).toMatch(/\/api\/recruitment\/candidates$/)
  })
})

describe('search mandate consent (M12.1)', () => {
  it('matches lawbridge.eu: approach only confirmed companies, free for the lawyer', async () => {
    const { mandateConsentText, MANDATE_CONSENT_VERSION } = await import('@/lib/candidate-consent')
    expect(MANDATE_CONSENT_VERSION).toBe('2026-10-25-yours-solution-2y-mandate')
    expect(mandateConsentText('cs')).toContain('až poté, co danou firmu potvrdím')
    expect(mandateConsentText('cs')).toContain('zdarma')
    expect(mandateConsentText('fr')).toBe(mandateConsentText('en'))
  })
})
