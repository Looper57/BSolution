"use client"

import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { contactFormPage } from '@/lib/contact-form-context'
import { enquiryServices, enquiryServiceFromHash, type EnquiryService } from '@/lib/service-enquiry'
import { Send, CheckCircle } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { COPY as availableLawyersCopy, PROFILE_INQUIRY_KEY, isProfileRef } from '@/lib/available-lawyers'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { mountContactChallenge, type ContactChallenge } from '@/lib/contact-challenge'
import { createContactRequestHeaders } from '@/lib/contact-security-client'

export const contactUiCopy = {
  en: {
    security: 'Please complete the security verification.',
    failure: 'Failed to send message. Please try again or contact us directly at info@bsolution.eu',
    thanks: 'Thank You',
    success: 'We will contact you shortly.',
    confidentiality: 'All enquiries are handled with strict confidentiality.',
    another: 'Send Another Message',
    select: 'Select an option',
    selectedService: 'Selected service',
    clearService: 'Clear service selection',
    sending: 'Sending...',
    location: 'Prague, Czech Republic',
  },
  cs: {
    security: 'Prosím dokončete bezpečnostní ověření.',
    failure: 'Nepodařilo se odeslat zprávu. Zkuste to znovu nebo nás kontaktujte přímo na info@bsolution.eu',
    thanks: 'Děkujeme',
    success: 'Brzy se vám ozveme.',
    confidentiality: 'Všechny dotazy jsou zpracovávány s naprostou důvěrností.',
    another: 'Odeslat další zprávu',
    select: 'Vyberte možnost',
    selectedService: 'Vybraná služba',
    clearService: 'Zrušit výběr služby',
    sending: 'Odesílám...',
    location: 'Praha, Česká republika',
  },
  de: {
    security: 'Bitte schließen Sie die Sicherheitsüberprüfung ab.',
    failure: 'Die Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt unter info@bsolution.eu.',
    thanks: 'Vielen Dank',
    success: 'Wir melden uns in Kürze bei Ihnen.',
    confidentiality: 'Alle Anfragen werden streng vertraulich behandelt.',
    another: 'Weitere Nachricht senden',
    select: 'Bitte auswählen',
    selectedService: 'Ausgewählte Leistung',
    clearService: 'Leistungsauswahl aufheben',
    sending: 'Wird gesendet...',
    location: 'Prag, Tschechien',
  },
  pl: {
    security: 'Prosimy o ukończenie weryfikacji bezpieczeństwa.',
    failure: 'Nie udało się wysłać wiadomości. Spróbuj ponownie lub skontaktuj się z nami bezpośrednio pod adresem info@bsolution.eu.',
    thanks: 'Dziękujemy',
    success: 'Skontaktujemy się wkrótce.',
    confidentiality: 'Wszystkie zapytania traktujemy jako ściśle poufne.',
    another: 'Wyślij kolejną wiadomość',
    select: 'Wybierz opcję',
    selectedService: 'Wybrana usługa',
    clearService: 'Wyczyść wybór usługi',
    sending: 'Wysyłanie...',
    location: 'Praga, Czechy',
  },
} as const

export function ContactForm({ heading, initialType = '' }: {
  heading?: string
  initialType?: '' | 'hiring' | 'candidate' | 'other'
} = {}) {
  const { language, t } = useLanguage()
  const copy = contactUiCopy[language]
  const formPage = contactFormPage(usePathname())
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const turnstileRef = useRef<HTMLDivElement>(null)
  const challengeRef = useRef<ContactChallenge | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    type: String(initialType),
    message: '',
  })
  const [honeypot, setHoneypot] = useState('')
  const [serviceInterest, setServiceInterest] = useState<EnquiryService | undefined>()

  useEffect(() => {
    const syncService = () => {
      const selected = enquiryServiceFromHash(window.location.hash)
      setServiceInterest(selected)
      if (selected) {
        setFormData(current => current.type ? current : { ...current, type: 'hiring' })
        document.getElementById('contact-form')?.scrollIntoView({ block: 'start' })
      }
    }
    syncService()
    window.addEventListener('hashchange', syncService)
    return () => window.removeEventListener('hashchange', syncService)
  }, [])

  const clearService = () => {
    setServiceInterest(undefined)
    window.history.replaceState(window.history.state, '', '#contact-form')
  }

  // "Ask for the full profile" on /available-lawyers hands over the profile
  // reference (PROFILE_INQUIRY_KEY): the enquiry arrives naming the profile.
  useEffect(() => {
    let ref: string | null = null
    try {
      ref = sessionStorage.getItem(PROFILE_INQUIRY_KEY)
      sessionStorage.removeItem(PROFILE_INQUIRY_KEY)
    } catch {
      return
    }
    if (!isProfileRef(ref)) return
    const message = availableLawyersCopy[language].inquiry(ref)
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time prefill from the profile link after hydration
    setFormData((current) => (current.message ? current : { ...current, message }))
  }, [language])
  
  // A successful message removes the form; another message needs a fresh widget.
  useEffect(() => {
    const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
    if (submitted || !siteKey || !turnstileRef.current) return
    const challenge = mountContactChallenge(turnstileRef.current, siteKey, setTurnstileToken)
    challengeRef.current = challenge
    return () => {
      challenge.dispose()
      challengeRef.current = null
    }
  }, [submitted])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    
    // Check if Turnstile token is available
    const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
    if (siteKey && !turnstileToken) {
      setError(copy.security)
      setIsSubmitting(false)
      return
    }
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: createContactRequestHeaders(),
        body: JSON.stringify({
          ...formData,
          formPage,
          serviceInterest,
          turnstileToken,
          _hp: honeypot,
        }),
      })
      
      const data = await response.json()
      
      if (!response.ok || data.success !== true) {
        throw new Error(data.error || 'Failed to send message')
      }
      
      setSubmitted(true)
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        type: serviceInterest ? 'hiring' : String(initialType),
        message: '',
      })
      setTurnstileToken(null)
    } catch {
      setError(copy.failure)
      setTurnstileToken(null)
      challengeRef.current?.reset()
    } finally {
      setIsSubmitting(false)
    }
  }
  
  if (submitted) {
    return (
      <Card className="border-0 shadow-lg bg-white">
        <CardContent className="p-10 lg:p-12 text-center">
          <CheckCircle className="h-16 w-16 text-gold mx-auto" />
          <h3 className="mt-6 text-navy font-serif text-2xl">
            {copy.thanks}
          </h3>
          <p className="mt-4 text-charcoal/70">
            {copy.success}
          </p>
          <p className="mt-6 text-charcoal/50 text-sm italic">
            {copy.confidentiality}
          </p>
          <Button 
            onClick={() => setSubmitted(false)}
            className="mt-8 bg-gold hover:bg-gold-hover text-white"
          >
            {copy.another}
          </Button>
        </CardContent>
      </Card>
    )
  }
  
  return (
    <Card className="border-0 shadow-lg bg-white">
      <CardContent className="p-8 lg:p-10">
        <h3 className="text-navy font-serif text-xl font-medium mb-8">
          {heading ?? t('contact.form.title')}
        </h3>
        <form id="contact-form" onSubmit={handleSubmit} className="space-y-6 scroll-mt-28">
          {serviceInterest && <div className="rounded border border-gold/40 bg-cream p-4" role="region" aria-label={copy.selectedService}>
            <p className="font-medium text-navy">{copy.selectedService}: {enquiryServices[serviceInterest][language]}</p>
            <button type="button" className="mt-2 text-sm underline underline-offset-4 hover:text-gold" onClick={clearService}>{copy.clearService}</button>
          </div>}
          {/* Honeypot field - hidden from users, catches bots */}
          <div className="absolute -left-[9999px]" aria-hidden="true">
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
            />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-charcoal">
                {t('contact.form.name')} *
              </Label>
              <Input
                maxLength={100}
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="border-gray-light focus:border-gold focus:ring-gold"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-charcoal">
                {t('contact.form.email')} *
              </Label>
              <Input
                maxLength={254}
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="border-gray-light focus:border-gold focus:ring-gold"
              />
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="company" className="text-charcoal">
                {t('contact.form.company')}
              </Label>
              <Input
                maxLength={200}
                id="company"
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="border-gray-light focus:border-gold focus:ring-gold"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-charcoal">
                {t('contact.form.phone')}
              </Label>
              <Input
                maxLength={80}
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="border-gray-light focus:border-gold focus:ring-gold"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="type" className="text-charcoal">
              {t('contact.form.type')}
            </Label>
            <Select
              value={formData.type}
              onValueChange={(value) => {
                // The form control can emit an empty change when its value
                // is set after hydration. No empty option is offered here;
                // explicit new-message resets remain controlled by the form.
                if (value === 'hiring' || value === 'candidate' || value === 'other') {
                  setFormData(current => ({ ...current, type: value }))
                }
              }}
            >
              <SelectTrigger id="type" className="border-gray-light focus:border-gold focus:ring-gold">
                <SelectValue placeholder={copy.select}>{formData.type ? t(`contact.form.type.${formData.type}`) : undefined}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hiring">{t('contact.form.type.hiring')}</SelectItem>
                <SelectItem value="candidate">{t('contact.form.type.candidate')}</SelectItem>
                <SelectItem value="other">{t('contact.form.type.other')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message" className="text-charcoal">
              {t('contact.form.message')} *
            </Label>
            <Textarea
              maxLength={10000}
              id="message"
              name="message"
              required
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="border-gray-light focus:border-gold focus:ring-gold resize-none"
            />
          </div>
          
          {/* Cloudflare Turnstile Widget */}
          {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && (
            <div ref={turnstileRef} className="flex justify-center" />
          )}
          
          {error && (
            <div role="alert" className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}
          
          <Button 
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="w-full bg-gold hover:bg-gold-hover text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                {copy.sending}
                <span className="ml-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              </>
            ) : (
              <>
                {t('contact.form.submit')}
                <Send className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
          
          <p className="text-center text-charcoal/50 text-sm mt-6">
            {copy.confidentiality}
          </p>
        </form>
      </CardContent>
    </Card>
  )
}

