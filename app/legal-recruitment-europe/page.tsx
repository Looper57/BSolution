"use client"

import Link from 'next/link'
import { ArrowRight, MapPin, Users, Building2, Award } from 'lucide-react'
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
            <p className="text-gold text-[11px] font-semibold uppercase tracking-[0.2em]">Regional Expertise</p>
          </div>
          <h1 className="text-white text-[42px] lg:text-[56px] font-serif leading-[1.1]">
            Legal Recruitment Across Europe
          </h1>
          <p className="mt-8 text-[19px] text-white/55 leading-[1.75] max-w-2xl">
            Specialist legal executive search serving corporations and law firms throughout Central Europe, Western Europe, and the Middle East since 2007.
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
            This page focuses on cross-border Legal Executive Search across Europe. From Prague, B Solution supports corporate legal departments, financial institutions and international law firms with assignments that require coordinated market knowledge across jurisdictions. Selected projects also extend into the Middle East.
          </p>
        </div>
      </div>
    </section>
  )
}

function WhySection() {
  const reasons = [
    {
      icon: MapPin,
      title: 'Pan-European Network',
      description: 'Established relationships across selected European legal markets support searches that extend beyond a single jurisdiction.'
    },
    {
      icon: Users,
      title: 'Cross-Border Expertise',
      description: 'Deep understanding of multi-jurisdictional legal teams, international mobility considerations, and the complexities of cross-border legal recruitment.'
    },
    {
      icon: Building2,
      title: 'Market Intelligence',
      description: 'Real-time insight into compensation benchmarks, talent flows, and competitive dynamics across European legal markets.'
    },
    {
      icon: Award,
      title: 'Since 2007',
      description: 'B Solution has conducted Executive Search for international law firms, corporate legal departments and financial institutions since 2007.'
    }
  ]
  
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-16">
        <div className="text-center mb-16">
          <p className="text-gold text-[11px] font-semibold uppercase tracking-[0.2em] mb-4">Why B Solution</p>
          <h2 className="text-navy text-[32px] lg:text-[40px] font-serif">
            Your Partner for European Legal Recruitment
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
    { num: '01', title: 'Strategic Briefing', desc: 'Understanding your requirements, organizational culture, and the specific market dynamics of your target jurisdiction.' },
    { num: '02', title: 'Market Mapping', desc: 'Comprehensive identification of potential candidates across relevant European markets and competitor organizations.' },
    { num: '03', title: 'Confidential Approach', desc: 'Discrete engagement with qualified candidates, presenting your opportunity while protecting your competitive position.' },
    { num: '04', title: 'Assessment & Selection', desc: 'Rigorous evaluation including competency interviews, reference verification, and cultural fit assessment.' },
  ]
  
  return (
    <section className="bg-gray-100 py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-16">
        <div className="max-w-3xl mb-16">
          <p className="text-gold text-[11px] font-semibold uppercase tracking-[0.2em] mb-4">Our Process</p>
          <h2 className="text-navy text-[32px] lg:text-[40px] font-serif">
            A Proven Methodology for International Search
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

function IndustriesSection() {
  const industries = [
    'Banking & Financial Services',
    'Technology & Digital',
    'Energy & Natural Resources',
    'Manufacturing & Industrial',
    'Private Equity & Investment',
    'Pharmaceuticals & Healthcare',
    'Real Estate & Construction',
    'Telecommunications'
  ]
  
  return (
    <section className="bg-navy py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <p className="text-gold text-[11px] font-semibold uppercase tracking-[0.2em] mb-4">Industries We Serve</p>
            <h2 className="text-white text-[32px] lg:text-[40px] font-serif mb-6">
              Deep Sector Expertise Across Key Industries
            </h2>
            <p className="text-white/55 text-[17px] leading-[1.8]">
              Our consultants bring sector-specific knowledge to every search, understanding the unique legal challenges and regulatory environments that shape talent requirements in each industry.
            </p>
            <Link 
              href="/services"
              className="inline-flex items-center mt-8 text-gold hover:text-gold/80 text-[13px] font-semibold uppercase tracking-[0.1em] transition-colors"
            >
              View Our Services
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          <div className="bg-white/5 p-10">
            <div className="grid grid-cols-2 gap-4">
              {industries.map((industry, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-gold flex-shrink-0" />
                  <span className="text-white/80 text-[14px]">{industry}</span>
                </div>
              ))}
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
          <h3 className="text-navy font-serif text-xl">Thank You</h3>
          <p className="mt-4 text-gray-600">We will contact you shortly to discuss your European legal recruitment needs.</p>
        </CardContent>
      </Card>
    )
  }
  
  return (
    <Card className="border-0 shadow-lg bg-white">
      <CardContent className="p-8">
        <h3 className="text-navy font-serif text-xl mb-6">Discuss Your Requirements</h3>
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
            <Label htmlFor="company">Company</Label>
            <Input id="company" value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} />
          </div>
          <div>
            <Label htmlFor="message">Message *</Label>
            <Textarea id="message" name="message" rows={4} required value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} />
          </div>
          <TurnstileField key={turnstileAttempt} onToken={setTurnstileToken} />
          <Button type="submit" disabled={isSubmitting} className="w-full bg-gold hover:bg-gold/90 text-white">
            {isSubmitting ? 'Sending...' : 'Submit Enquiry'}
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
              Start Your European Legal Search
            </h2>
            <p className="text-gray-600 text-[17px] leading-[1.8] mb-8">
              Whether you are recruiting a General Counsel, building an in-house legal team or seeking law firm partners across borders, B Solution provides a confidential and coordinated search process.
            </p>
            <div className="space-y-4">
              <Link href={legalExecutiveSearchCanonicalPath} className="flex items-center text-gold hover:text-gold/80 text-[14px] font-medium">
                <ArrowRight className="mr-2 h-4 w-4" /> Legal Executive Search Services
              </Link>
              <Link href="/hire-in-house-counsel" className="flex items-center text-gold hover:text-gold/80 text-[14px] font-medium">
                <ArrowRight className="mr-2 h-4 w-4" /> In-House Counsel Recruitment
              </Link>
              <Link href="/law-firm-recruitment" className="flex items-center text-gold hover:text-gold/80 text-[14px] font-medium">
                <ArrowRight className="mr-2 h-4 w-4" /> Law Firm Recruitment
              </Link>
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  )
}

function LegalRecruitmentEuropePage() {
  return (
    <>
      <Header />
      <main>
        <PageHeader />
        <IntroSection />
        <WhySection />
        <ProcessSection />
        <IndustriesSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}

export default function Page() {
  return (
    <LanguageProvider>
      <LegalRecruitmentEuropePage />
    </LanguageProvider>
  )
}
