"use client"

import Link from 'next/link'
import { ArrowRight, Globe, Scale, Building2, TrendingUp } from 'lucide-react'
import { LanguageProvider } from '@/lib/language-context'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { useState } from 'react'
import { legalExecutiveSearchCanonicalPath } from '@/lib/routes'
import { TurnstileField } from '@/components/security/turnstile-field'
import { createContactRequestHeaders } from '@/lib/contact-security-client'

function PageHeader() {
  return (
    <section className="bg-navy pt-32 pb-20 lg:pt-40 lg:pb-28">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-16">
        <div className="max-w-3xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-px bg-gold" />
            <p className="text-gold text-[11px] font-semibold uppercase tracking-[0.2em]">Deutschland</p>
          </div>
          <h1 className="text-white text-[42px] lg:text-[56px] font-serif leading-[1.1]">
            Legal Recruitment Germany
          </h1>
          <p className="mt-8 text-[19px] text-white/55 leading-[1.75] max-w-2xl">
            Executive search for General Counsel, Syndikusanwalt, and senior legal professionals across Germany. Serving Frankfurt, Munich, Dusseldorf, Hamburg, and Berlin.
          </p>
        </div>
      </div>
    </section>
  )
}

function IntroSection() {
  return (
    <section className="bg-cream py-16 lg:py-20 border-b border-gray-200">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-16">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[18px] text-gray-600 leading-[1.8]">
            Germany represents Europe&apos;s largest legal market and one of our core areas of expertise. The German legal profession has its own distinctive characteristics, from the Syndikusanwalt status for in-house counsel to the structure of leading law firms. B Solution has developed deep expertise in German legal recruitment through years of active engagement with corporations and law firms across the country. We understand the specific requirements of the German market and bring genuine relationships with senior legal professionals in Frankfurt, Munich, Dusseldorf, Hamburg, Berlin, and beyond.
          </p>
        </div>
      </div>
    </section>
  )
}

function WhySection() {
  const reasons = [
    {
      icon: Globe,
      title: 'German Market Expertise',
      description: 'Active presence and deep relationships in the German legal market. We understand Syndikusanwalt requirements, German corporate structures, and local compensation benchmarks.'
    },
    {
      icon: Scale,
      title: 'Rechtliche Kompetenz',
      description: 'Our consultants understand German legal qualifications, state bar requirements, and practice area specializations, ensuring accurate candidate assessment.'
    },
    {
      icon: Building2,
      title: 'Major City Coverage',
      description: 'Strong networks in Frankfurt, Munich, Dusseldorf, Hamburg, and Berlin, covering all key financial and industrial centers.'
    },
    {
      icon: TrendingUp,
      title: 'Corporate & Law Firm',
      description: 'Equal strength serving multinational corporations building German legal teams and international law firms seeking lateral talent.'
    }
  ]
  
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-16">
        <div className="text-center mb-16">
          <p className="text-gold text-[11px] font-semibold uppercase tracking-[0.2em] mb-4">Our Expertise</p>
          <h2 className="text-navy text-[32px] lg:text-[40px] font-serif">
            Why Choose B Solution for German Recruitment
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {reasons.map((reason, index) => (
            <div key={index}>
              <reason.icon className="h-8 w-8 text-gold mb-6" />
              <h3 className="text-navy text-[18px] font-serif mb-4">{reason.title}</h3>
              <p className="text-gray-500 text-[15px] leading-[1.7]">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProcessSection() {
  const steps = [
    { num: '01', title: 'Anforderungsanalyse', desc: 'Detailed briefing to understand your requirements, the German market context, and specific Syndikusanwalt or qualification needs.' },
    { num: '02', title: 'Marktrecherche', desc: 'Comprehensive mapping of relevant candidates across German corporations, law firms, and international organizations.' },
    { num: '03', title: 'Diskrete Ansprache', desc: 'Confidential engagement with potential candidates, presenting your opportunity professionally while protecting all parties.' },
    { num: '04', title: 'Erfolgreiche Besetzung', desc: 'Managing the offer process, negotiating packages appropriate to the German market, and ensuring smooth transitions.' },
  ]
  
  return (
    <section className="bg-gray-100 py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-16">
        <div className="max-w-3xl mb-16">
          <p className="text-gold text-[11px] font-semibold uppercase tracking-[0.2em] mb-4">Unser Prozess</p>
          <h2 className="text-navy text-[32px] lg:text-[40px] font-serif">
            Proven Methodology for the German Market
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {steps.map((step, index) => (
            <div key={index}>
              <span className="text-gold text-[12px] font-semibold tracking-[0.15em]">{step.num}</span>
              <div className="w-full h-px bg-gray-300 my-5" />
              <h3 className="text-navy text-[18px] font-serif mb-4">{step.title}</h3>
              <p className="text-gray-500 text-[15px] leading-[1.7]">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function SectorsSection() {
  const sectors = [
    'Automotive & Manufacturing',
    'Banking & Financial Services',
    'Technology & Digital',
    'Energy & Chemicals',
    'Healthcare & Pharma',
    'Industrial & Engineering',
    'Private Equity',
    'Insurance'
  ]
  
  const roles = [
    'General Counsel',
    'Head of Legal / Leiter Recht',
    'Syndikusanwalt',
    'Legal Director',
    'Senior Legal Counsel',
    'Compliance Director',
    'Partner',
    'Counsel'
  ]
  
  return (
    <section className="bg-navy py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <p className="text-gold text-[11px] font-semibold uppercase tracking-[0.2em] mb-4">Branchen</p>
            <h2 className="text-white text-[32px] lg:text-[40px] font-serif mb-6">
              Key German Sectors
            </h2>
            <p className="text-white/55 text-[17px] leading-[1.8] mb-8">
              Germany&apos;s strength in automotive, manufacturing, and financial services creates specific legal talent requirements. Our sector specialists understand these dynamics and the legal expertise they demand.
            </p>
            <div className="bg-white/5 p-8">
              <div className="grid grid-cols-2 gap-3">
                {sectors.map((sector, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-gold flex-shrink-0" />
                    <span className="text-white/70 text-[13px]">{sector}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <p className="text-gold text-[11px] font-semibold uppercase tracking-[0.2em] mb-4">Positionen</p>
            <h2 className="text-white text-[32px] lg:text-[40px] font-serif mb-6">
              Roles We Fill
            </h2>
            <p className="text-white/55 text-[17px] leading-[1.8] mb-8">
              From C-level legal appointments to senior associate positions, we recruit across all levels of seniority in both corporate and private practice environments.
            </p>
            <div className="bg-white/5 p-8">
              <div className="grid grid-cols-2 gap-3">
                {roles.map((role, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-gold flex-shrink-0" />
                    <span className="text-white/70 text-[13px]">{role}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const [turnstileAttempt, setTurnstileAttempt] = useState(0)
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' })
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && !turnstileToken) return
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: createContactRequestHeaders(),
        body: JSON.stringify({ ...formData, turnstileToken }),
      })
      if (response.ok) setSubmitted(true)
    } finally {
      setTurnstileToken(null)
      setTurnstileAttempt((attempt) => attempt + 1)
      setIsSubmitting(false)
    }
  }
  
  if (submitted) {
    return (
      <Card className="border-0 shadow-lg bg-white">
        <CardContent className="p-8 text-center">
          <h3 className="text-navy font-serif text-xl">Vielen Dank</h3>
          <p className="mt-4 text-gray-600">We will contact you shortly to discuss your German legal recruitment needs.</p>
        </CardContent>
      </Card>
    )
  }
  
  return (
    <Card className="border-0 shadow-lg bg-white">
      <CardContent className="p-8">
        <h3 className="text-navy font-serif text-xl mb-6">Discuss Your German Search</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Name *</Label>
              <Input id="name" name="name" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input id="email" name="email" type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
            </div>
          </div>
          <div>
            <Label htmlFor="company">Company / Unternehmen</Label>
            <Input id="company" value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} />
          </div>
          <div>
            <Label htmlFor="message">Message *</Label>
            <Textarea id="message" name="message" rows={4} required value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} />
          </div>
          <TurnstileField key={turnstileAttempt} onToken={setTurnstileToken} />
          <Button type="submit" disabled={isSubmitting} className="w-full bg-gold hover:bg-gold/90 text-white">
            {isSubmitting ? 'Sending...' : 'Anfrage senden'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

function CTASection() {
  return (
    <section className="bg-cream py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-navy text-[32px] lg:text-[40px] font-serif mb-6">
              Start Your German Legal Search
            </h2>
            <p className="text-gray-600 text-[17px] leading-[1.8] mb-8">
              Whether you are establishing a legal function in Germany, seeking a Syndikusanwalt, or recruiting partners for your German offices, B Solution provides the market access and expertise to deliver outstanding results.
            </p>
            <div className="space-y-4">
              <Link href="/legal-recruitment-europe" className="flex items-center text-gold hover:text-gold/80 text-[14px] font-medium">
                <ArrowRight className="mr-2 h-4 w-4" /> Legal Recruitment Europe
              </Link>
              <Link href={legalExecutiveSearchCanonicalPath} className="flex items-center text-gold hover:text-gold/80 text-[14px] font-medium">
                <ArrowRight className="mr-2 h-4 w-4" /> Legal Executive Search
              </Link>
              <Link href="/hire-in-house-counsel" className="flex items-center text-gold hover:text-gold/80 text-[14px] font-medium">
                <ArrowRight className="mr-2 h-4 w-4" /> In-House Counsel Recruitment
              </Link>
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  )
}

function LegalRecruitmentGermanyPage() {
  return (
    <>
      <Header />
      <main>
        <PageHeader />
        <IntroSection />
        <WhySection />
        <ProcessSection />
        <SectorsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}

export default function Page() {
  return (
    <LanguageProvider>
      <LegalRecruitmentGermanyPage />
    </LanguageProvider>
  )
}
