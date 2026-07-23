"use client"

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { MapPin, Phone, Mail, Linkedin, Send, CheckCircle } from 'lucide-react'
import { LanguageProvider, useLanguage } from '@/lib/language-context'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

function PageHeader() {
  const { t } = useLanguage()
  
  return (
    <section className="bg-navy pt-32 pb-20 lg:pt-40 lg:pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h1 className="text-white">{t('contact.page.title')}</h1>
          <p className="mt-6 text-xl text-white/70 leading-relaxed">
            {t('contact.page.subtitle')}
          </p>
        </div>
      </div>
    </section>
  )
}

// Declare Turnstile types
declare global {
  interface Window {
    turnstile?: {
      render: (container: string | HTMLElement, options: {
        sitekey: string;
        callback: (token: string) => void;
        'expired-callback'?: () => void;
        'error-callback'?: () => void;
      }) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

function ContactForm() {
  const { language, t } = useLanguage()
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const turnstileRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    type: '',
    message: '',
  })
  const [honeypot, setHoneypot] = useState('')
  
  // Load Turnstile script and render widget
  useEffect(() => {
    const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
    if (!siteKey) return
    
    const scriptId = 'turnstile-script'
    let script = document.getElementById(scriptId) as HTMLScriptElement | null
    
    const renderWidget = () => {
      if (window.turnstile && turnstileRef.current && !widgetIdRef.current) {
        widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
          sitekey: siteKey,
          callback: (token: string) => setTurnstileToken(token),
          'expired-callback': () => setTurnstileToken(null),
          'error-callback': () => setTurnstileToken(null),
        })
      }
    }
    
    if (!script) {
      script = document.createElement('script')
      script.id = scriptId
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js'
      script.async = true
      script.onload = renderWidget
      document.head.appendChild(script)
    } else if (window.turnstile) {
      renderWidget()
    }
    
    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current)
        widgetIdRef.current = null
      }
    }
  }, [])
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    
    // Check if Turnstile token is available
    const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
    if (siteKey && !turnstileToken) {
      setError(
        language === 'en'
          ? 'Please complete the security verification.'
          : 'Prosím dokončete bezpečnostní ověření.'
      )
      setIsSubmitting(false)
      return
    }
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          turnstileToken,
          _hp: honeypot,
        }),
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message')
      }
      
      setSubmitted(true)
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        type: '',
        message: '',
      })
      setTurnstileToken(null)
      // Reset Turnstile widget
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.reset(widgetIdRef.current)
      }
    } catch {
      setError(
        language === 'en'
          ? 'Failed to send message. Please try again or contact us directly at info@bsolution.eu'
          : 'Nepodařilo se odeslat zprávu. Zkuste to znovu nebo nás kontaktujte přímo na info@bsolution.eu'
      )
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
            {language === 'en' ? 'Thank You' : 'Děkujeme'}
          </h3>
          <p className="mt-4 text-charcoal/70">
            {language === 'en'
              ? 'We will contact you shortly.'
              : 'Brzy se vám ozveme.'
            }
          </p>
          <p className="mt-6 text-charcoal/50 text-sm italic">
            {language === 'en'
              ? 'All enquiries are handled with strict confidentiality.'
              : 'Všechny dotazy jsou zpracovávány s naprostou důvěrností.'
            }
          </p>
          <Button 
            onClick={() => setSubmitted(false)}
            className="mt-8 bg-gold hover:bg-gold-hover text-white"
          >
            {language === 'en' ? 'Send Another Message' : 'Odeslat další zprávu'}
          </Button>
        </CardContent>
      </Card>
    )
  }
  
  return (
    <Card className="border-0 shadow-lg bg-white">
      <CardContent className="p-8 lg:p-10">
        <h3 className="text-navy font-serif text-xl font-medium mb-8">
          {t('contact.form.title')}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-6">
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
              onValueChange={(value) => setFormData({ ...formData, type: value })}
            >
              <SelectTrigger className="border-gray-light focus:border-gold focus:ring-gold">
                <SelectValue placeholder={language === 'en' ? 'Select an option' : 'Vyberte možnost'} />
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
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
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
                {language === 'en' ? 'Sending...' : 'Odesílám...'}
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
            {language === 'en'
              ? 'All enquiries are handled with strict confidentiality.'
              : 'Všechny dotazy jsou zpracovávány s naprostou důvěrností.'
            }
          </p>
        </form>
      </CardContent>
    </Card>
  )
}

function ContactInfo() {
  const { t } = useLanguage()
  
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-navy font-serif text-xl font-medium mb-6">
          {t('contact.info.title')}
        </h3>
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-off-white flex items-center justify-center shrink-0">
              <MapPin className="h-5 w-5 text-gold" />
            </div>
            <div>
              <h3 className="font-medium text-navy text-base">{t('contact.info.address')}</h3>
              <p className="mt-1 text-charcoal/70">
                B Solution s.r.o.<br />
                Prague, Czech Republic
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-off-white flex items-center justify-center shrink-0">
              <Phone className="h-5 w-5 text-gold" />
            </div>
            <div>
              <h3 className="font-medium text-navy text-base">{t('contact.info.phone')}</h3>
              <a 
                href="tel:+420272681206" 
                className="mt-1 text-charcoal/70 hover:text-gold transition-colors block"
              >
                +420 272 681 206
              </a>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-off-white flex items-center justify-center shrink-0">
              <Mail className="h-5 w-5 text-gold" />
            </div>
            <div>
              <h3 className="font-medium text-navy text-base">{t('contact.info.email')}</h3>
              <a 
                href="mailto:info@bsolution.eu" 
                className="mt-1 text-charcoal/70 hover:text-gold transition-colors block"
              >
                info@bsolution.eu
              </a>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-off-white flex items-center justify-center shrink-0">
              <Linkedin className="h-5 w-5 text-gold" />
            </div>
            <div>
              <h3 className="font-medium text-navy text-base">{t('contact.info.linkedin')}</h3>
              <a 
                href="https://www.linkedin.com/company/bsolution" 
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 text-charcoal/70 hover:text-gold transition-colors block"
              >
                linkedin.com/company/bsolution
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Quick Links Card */}
      <Card className="border-0 bg-navy">
        <CardContent className="p-8">
          <h4 className="text-gold font-medium text-sm uppercase tracking-wider mb-4">
            {t('footer.services')}
          </h4>
          <div className="space-y-3">
            <Link 
              href="/clients" 
              className="block text-white/80 hover:text-gold transition-colors"
            >
              {t('nav.clients')}
            </Link>
            <Link 
              href="/candidates" 
              className="block text-white/80 hover:text-gold transition-colors"
            >
              {t('nav.candidates')}
            </Link>
            <Link 
              href="/positions" 
              className="block text-white/80 hover:text-gold transition-colors"
            >
              {t('nav.positions')}
            </Link>
            <Link 
              href="/services" 
              className="block text-white/80 hover:text-gold transition-colors"
            >
              {t('nav.services')}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function ContactSection() {
  return (
    <section className="bg-off-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
          <div className="lg:col-span-2">
            <ContactForm />
          </div>
          <div>
            <ContactInfo />
          </div>
        </div>
      </div>
    </section>
  )
}

function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <PageHeader />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}

export default function Page() {
  return (
    <LanguageProvider>
      <ContactPage />
    </LanguageProvider>
  )
}
