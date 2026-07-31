"use client"

import Link from 'next/link'
import { ArrowRight, MapPin, Building2, Users, Award } from 'lucide-react'
import { LanguageProvider } from '@/lib/language-context'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { useState } from 'react'
import { TurnstileField } from '@/components/security/turnstile-field'
import { createContactRequestHeaders } from '@/lib/contact-security-client'

function PageHeader() {
  return (
    <section className="bg-navy pt-32 pb-20 lg:pt-40 lg:pb-28">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-16">
        <div className="max-w-3xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-px bg-gold" />
            <p className="text-gold text-[11px] font-semibold uppercase tracking-[0.2em]">Czech Republic</p>
          </div>
          <h1 className="text-white text-[42px] lg:text-[56px] font-serif leading-[1.1]">
            Legal Recruitment Prague
          </h1>
          <p className="mt-8 text-[19px] text-white/55 leading-[1.75] max-w-2xl">
            Prague-based Legal Executive Search for corporate legal departments, financial institutions and law firms in the Czech market.
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
            This page focuses on Legal Executive Search in Prague and the Czech Republic. Headquartered in Prague since 2007, B Solution supports corporate legal departments, financial institutions and law firms with appointments ranging from specialist legal roles to partners and General Counsel.
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
      title: 'Established in Prague',
      description: 'B Solution has operated from Prague since 2007, supporting legal appointments in the Czech market and cross-border assignments.'
    },
    {
      icon: Building2,
      title: 'Legal-Market Focus',
      description: 'We work with international law firms, domestic practices, multinational corporations, financial institutions and Czech enterprises.'
    },
    {
      icon: Users,
      title: 'Bilingual Capability',
      description: 'Native Czech speakers with fluent English allow us to serve both international clients and local candidates with equal effectiveness. All communications handled in preferred language.'
    },
    {
      icon: Award,
      title: 'Executive Search Experience',
      description: 'Previous cooperation includes international law firms and corporate organisations across legal and leadership appointments.'
    }
  ]
  
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-16">
        <div className="text-center mb-16">
          <p className="text-gold text-[11px] font-semibold uppercase tracking-[0.2em] mb-4">Why B Solution</p>
          <h2 className="text-navy text-[32px] lg:text-[40px] font-serif">
            Your Partner for Czech Legal Recruitment
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
    { num: '01', title: 'Market Briefing', desc: 'Understanding your requirements and providing insight into the Czech legal talent landscape, compensation benchmarks, and realistic expectations.' },
    { num: '02', title: 'Targeted Search', desc: 'Leveraging our extensive network to identify suitable candidates across law firms, in-house teams, and international organizations.' },
    { num: '03', title: 'Rigorous Assessment', desc: 'Comprehensive evaluation of technical skills, language proficiency, and cultural fit for your specific environment.' },
    { num: '04', title: 'Successful Placement', desc: 'Managing negotiations, coordinating notice periods, and ensuring smooth transitions for both clients and candidates.' },
  ]
  
  return (
    <section className="bg-gray-100 py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-16">
        <div className="max-w-3xl mb-16">
          <p className="text-gold text-[11px] font-semibold uppercase tracking-[0.2em] mb-4">Our Approach</p>
          <h2 className="text-navy text-[32px] lg:text-[40px] font-serif">
            How We Deliver Results in the Czech Market
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
    'Banking & Financial Services',
    'Technology & Telecommunications',
    'Manufacturing & Automotive',
    'Energy & Utilities',
    'Real Estate & Construction',
    'Pharmaceutical & Healthcare',
    'Retail & Consumer',
    'Professional Services'
  ]
  
  const roles = [
    'General Counsel',
    'Head of Legal',
    'Legal Director',
    'Senior Legal Counsel',
    'Legal Counsel',
    'Compliance Manager',
    'Partner',
    'Associate'
  ]
  
  return (
    <section className="bg-navy py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <p className="text-gold text-[11px] font-semibold uppercase tracking-[0.2em] mb-4">Market Coverage</p>
            <h2 className="text-white text-[32px] lg:text-[40px] font-serif mb-6">
              Sectors and Roles We Cover
            </h2>
            <p className="text-white/55 text-[17px] leading-[1.8] mb-8">
              Our expertise spans all major industry sectors operating in the Czech Republic and all levels of legal seniority, from junior associate positions to C-level appointments.
            </p>
            <div className="bg-white/5 p-8 mb-8">
              <p className="text-white text-[12px] font-semibold uppercase tracking-[0.15em] mb-4">Key Sectors</p>
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
            <div className="bg-white/5 p-8 h-full">
              <p className="text-white text-[12px] font-semibold uppercase tracking-[0.15em] mb-4">Positions</p>
              <div className="grid grid-cols-2 gap-3">
                {roles.map((role, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-gold flex-shrink-0" />
                    <span className="text-white/70 text-[13px]">{role}</span>
                  </div>
                ))}
              </div>
              <Link 
                href="/positions"
                className="inline-flex items-center mt-8 text-gold hover:text-gold/80 text-[13px] font-semibold uppercase tracking-[0.1em] transition-colors"
              >
                View Current Positions
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
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
          <p className="mt-4 text-gray-600">We will contact you shortly to discuss your Czech legal recruitment needs.</p>
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
              Start Your Czech Legal Search
            </h2>
            <p className="text-gray-600 text-[17px] leading-[1.8] mb-8">
              Whether you are establishing your first Czech legal function, expanding an existing team or seeking lateral talent for your law firm, B Solution provides a focused and confidential search process.
            </p>
            <div className="space-y-4">
              <Link href="/legal-recruitment-europe" className="flex items-center text-gold hover:text-gold/80 text-[14px] font-medium">
                <ArrowRight className="mr-2 h-4 w-4" /> Legal Recruitment Europe
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

function LegalRecruitmentPraguePage() {
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
      <LegalRecruitmentPraguePage />
    </LanguageProvider>
  )
}
