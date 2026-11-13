"use client"

import Link from 'next/link'
import { ContactForm, contactUiCopy } from '@/components/contact-form'
import { MapPin, Phone, Mail, Linkedin } from 'lucide-react'
import { LanguageProvider, useLanguage } from '@/lib/language-context'

const CONTACT_FORM_LABEL = { en: 'Contact form', cs: 'Kontaktní formulář', de: 'Kontaktformular', pl: 'Formularz kontaktowy' } as const
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card, CardContent } from '@/components/ui/card'
import { localizedPath } from '@/lib/i18n/config'

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

function ContactInfo() {
  const { language, t } = useLanguage()
  const copy = contactUiCopy[language]
  
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
                B Solution · Yours Solution s.r.o.<br />
                Školská 689/20, 110 00 Praha 1<br />
                {copy.location}
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
              {/* The form on this page, not a mailto link: a visible address
                  is harvested by spam bots (owner, 2026-11-03). */}
              <a
                href="#contact-form"
                className="mt-1 text-charcoal/70 hover:text-gold transition-colors block"
              >
                {CONTACT_FORM_LABEL[language]}
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
              href={localizedPath(language, '/clients')}
              className="block text-white/80 hover:text-gold transition-colors"
            >
              {t('nav.clients')}
            </Link>
            <Link 
              href={localizedPath(language, '/candidates')}
              className="block text-white/80 hover:text-gold transition-colors"
            >
              {t('nav.candidates')}
            </Link>
            <Link 
              href={localizedPath(language, '/positions')}
              className="block text-white/80 hover:text-gold transition-colors"
            >
              {t('nav.positions')}
            </Link>
            <Link 
              href={localizedPath(language, '/services')}
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
