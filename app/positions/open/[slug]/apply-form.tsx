"use client"

import { useState } from 'react'
import { APPLY_ENDPOINT, REGISTER_ENDPOINT, candidateConsentText, registrationConsentText } from '@/lib/candidate-consent'

const COPY = {
  en: { future: 'Send your CV for similar roles', title: 'Apply for this position', first: 'First name', last: 'Last name', email: 'E-mail', phone: 'Phone', message: 'Message (optional)', cv: 'CV (PDF or Word, up to 3 MB)', submit: 'Send application', sending: 'Sending…', sent: 'Thank you. B Solution will contact you if your profile fits.', failed: 'The application was not sent. Please try again or write to info@bsolution.eu.', closed: 'This position is no longer open.' },
  cs: { future: 'Poslat životopis pro podobné role', title: 'Přihlásit se na pozici', first: 'Jméno', last: 'Příjmení', email: 'E-mail', phone: 'Telefon', message: 'Zpráva (nepovinné)', cv: 'Životopis (PDF nebo Word, do 3 MB)', submit: 'Odeslat přihlášku', sending: 'Odesílám…', sent: 'Děkujeme. Pokud se váš profil hodí, B Solution se vám ozve.', failed: 'Přihlášku se nepodařilo odeslat. Zkuste to znovu nebo napište na info@bsolution.eu.', closed: 'Tato pozice už není otevřená.' },
} as const

/** With a jobId: an application to an open position. Without one: a CV
 * for future opportunities (no position), optionally naming the example
 * mandate it came from. */
export function ApplyForm({ jobId, locale, similarTo, id }: { jobId?: number; locale: string; similarTo?: string; id?: string }) {
  const copy = locale === 'cs' ? COPY.cs : COPY.en
  const consent = jobId ? candidateConsentText(locale) : registrationConsentText(locale)
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'failed' | 'closed'>('idle')

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const cv = form.get('cv')
    if (cv instanceof File && cv.size > 3 * 1024 * 1024) { setState('failed'); return }
    form.set('consent', form.get('consentBox') === 'on' ? 'yes' : '')
    form.delete('consentBox')
    form.set('consentText', consent)
    form.set('source', 'bsolution')
    if (!jobId && similarTo) form.set('message', [`Similar to: ${similarTo}`, String(form.get('message') ?? '')].filter(Boolean).join('\n\n'))
    setState('sending')
    try {
      const response = await fetch(jobId ? APPLY_ENDPOINT(jobId) : REGISTER_ENDPOINT, { method: 'POST', body: form })
      setState(response.ok ? 'sent' : response.status === 410 ? 'closed' : 'failed')
    } catch {
      setState('failed')
    }
  }

  if (state === 'sent') return <p className="mt-10 text-navy">{copy.sent}</p>
  const input = 'w-full border border-navy/20 bg-white px-4 py-3 text-navy'
  return (
    <form id={id} onSubmit={submit} className="mt-12 space-y-4 border border-navy/10 bg-white p-8">
      <h2 className="text-navy text-xl font-serif">{jobId ? copy.title : copy.future}</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm text-navy/70">{copy.first}<input name="firstName" required maxLength={80} className={input} /></label>
        <label className="text-sm text-navy/70">{copy.last}<input name="lastName" required maxLength={80} className={input} /></label>
        <label className="text-sm text-navy/70">{copy.email}<input name="email" type="email" required maxLength={200} className={input} /></label>
        <label className="text-sm text-navy/70">{copy.phone}<input name="phone" maxLength={40} className={input} /></label>
      </div>
      <label className="block text-sm text-navy/70">{copy.message}<textarea name="message" maxLength={4000} rows={4} className={input} /></label>
      <label className="block text-sm text-navy/70">{copy.cv}<input name="cv" type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" className="mt-1 block w-full text-sm" /></label>
      <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <label className="flex items-start gap-3 text-sm text-navy/70"><input name="consentBox" type="checkbox" required className="mt-1" /><span>{consent}</span></label>
      {state === 'failed' ? <p className="text-sm text-red-700">{copy.failed}</p> : null}
      {state === 'closed' ? <p className="text-sm text-red-700">{copy.closed}</p> : null}
      <button type="submit" disabled={state === 'sending'} className="bg-gold px-8 py-3 font-semibold text-navy disabled:opacity-50">{state === 'sending' ? copy.sending : copy.submit}</button>
    </form>
  )
}
