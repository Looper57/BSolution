"use client"

import Link from 'next/link'
import { ArrowRight, Building, UserCheck, Globe, Handshake } from 'lucide-react'
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
            <p className="text-gold text-[11px] font-semibold uppercase tracking-[0.2em]">Private Practice</p>
          </div>
          <h1 className="text-white text-[42px] lg:text-[56px] font-serif leading-[1.1]">
            Law Firm Recruitment
          </h1>
          <p className="mt-8 text-[19px] text-white/55 leading-[1.75] max-w-2xl">
            Partner recruitment, practice-group development and strategic legal talent search for international and regional law firms across Europe.
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
            This page focuses on private-practice mandates: partner recruitment, succession appointments, team moves and practice development. B Solution has supported international and regional law firms through confidential Executive Search assignments since 2007.
          </p>
        </div>
      </div>
    </section>
  )
}

function WhySection() {
  const reasons = [
    {
      icon: Building,
      title: 'Firm-Focused Expertise',
      description: 'We understand firm economics, partnership structures, and the complex factors that determine whether a lateral hire will succeed. Our advice is grounded in real market experience.'
    },
    {
      icon: UserCheck,
      title: 'Candidate Quality',
      description: 'We focus on quality over quantity, presenting only candidates who genuinely match your requirements. Our thorough vetting process saves partner time and improves outcomes.'
    },
    {
      icon: Globe,
      title: 'European Network',
      description: 'Active relationships across major European legal markets allow us to identify cross-border opportunities and support firms expanding internationally.'
    },
    {
      icon: Handshake,
      title: 'Mandate Context',
      description: 'We invest in understanding the firm, partnership structure, practice priorities and cultural context before approaching the market.'
    }
  ]
  
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-16">
        <div className="text-center mb-16">
          <p className="text-gold text-[11px] font-semibold uppercase tracking-[0.2em] mb-4">Our Distinction</p>
          <h2 className="text-navy text-[32px] lg:text-[40px] font-serif">
            Why Law Firms Choose B Solution
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

function ServicesSection() {
  const services = [
    { num: '01', title: 'Lateral Partner Recruitment', desc: 'Identifying and approaching partners who can bring valuable client relationships, expertise, and practice development capability to your firm.' },
    { num: '02', title: 'Practice Group Development', desc: 'Strategic talent planning to build or strengthen practice areas through coordinated recruitment at partner and associate level.' },
    { num: '03', title: 'Associate & Counsel Hiring', desc: 'Finding talented lawyers at all levels who will develop within your firm and contribute to long-term success.' },
    { num: '04', title: 'Market Intelligence', desc: 'Detailed insights into competitor structures, compensation benchmarks, and talent availability to inform your hiring strategy.' },
  ]
  
  return (
    <section className="bg-gray-100 py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-16">
        <div className="max-w-3xl mb-16">
          <p className="text-gold text-[11px] font-semibold uppercase tracking-[0.2em] mb-4">Our Services</p>
          <h2 className="text-navy text-[32px] lg:text-[40px] font-serif">
            Comprehensive Law Firm Recruitment Services
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {services.map((service, index) => (
            <div key={index}>
              <span className="text-gold text-[12px] font-semibold tracking-[0.15em]">{service.num}</span>
              <div className="w-full h-px bg-gray-300 my-5" />
              <h3 className="text-navy text-[18px] font-serif mb-4">{service.title}</h3>
              <p className="text-gray-500 text-[15px] leading-[1.7]">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function PracticeAreasSection() {
  const areas = [
    'Corporate / M&A',
    'Banking & Finance',
    'Capital Markets',
    'Private Equity',
    'Litigation & Arbitration',
    'Real Estate',
    'Employment',
    'Restructuring',
    'Competition / Antitrust',
    'Tax',
    'IP / Technology',
    'Regulatory'
  ]
  
  return (
    <section className="bg-navy py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <p className="text-gold text-[11px] font-semibold uppercase tracking-[0.2em] mb-4">Practice Coverage</p>
            <h2 className="text-white text-[32px] lg:text-[40px] font-serif mb-6">
              All Major Practice Areas
            </h2>
            <p className="text-white/55 text-[17px] leading-[1.8]">
              Our consultants have deep knowledge across all major practice areas, allowing us to assess technical capability and market positioning effectively. We understand the specific dynamics of each practice area and how they vary across different markets.
            </p>
            <Link 
              href="/services"
              className="inline-flex items-center mt-8 text-gold hover:text-gold/80 text-[13px] font-semibold uppercase tracking-[0.1em] transition-colors"
            >
              View All Services
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          <div className="bg-white/5 p-10">
            <div className="grid grid-cols-2 gap-4">
              {areas.map((area, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-gold flex-shrink-0" />
                  <span className="text-white/80 text-[14px]">{area}</span>
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
          <p className="mt-4 text-gray-600">We will contact you shortly to discuss your law firm recruitment requirements.</p>
        </CardContent>
      </Card>
    )
  }
  
  return (
    <Card className="border-0 shadow-lg bg-white">
      <CardContent className="p-8">
        <h3 className="text-navy font-serif text-xl mb-6">Discuss Your Firm&apos;s Needs</h3>
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
            <Label htmlFor="company">Firm</Label>
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
              Strengthen Your Practice
            </h2>
            <p className="text-gray-600 text-[17px] leading-[1.8] mb-8">
              Whether you are pursuing a specific lateral target, looking to build a practice area, or planning strategic growth, B Solution provides the market intelligence, candidate access, and execution capability to deliver results.
            </p>
            <div className="space-y-4">
              <Link href={legalExecutiveSearchCanonicalPath} className="flex items-center text-gold hover:text-gold/80 text-[14px] font-medium">
                <ArrowRight className="mr-2 h-4 w-4" /> Legal Executive Search
              </Link>
              <Link href="/legal-recruitment-europe" className="flex items-center text-gold hover:text-gold/80 text-[14px] font-medium">
                <ArrowRight className="mr-2 h-4 w-4" /> Legal Recruitment Europe
              </Link>
              <Link href="/candidates" className="flex items-center text-gold hover:text-gold/80 text-[14px] font-medium">
                <ArrowRight className="mr-2 h-4 w-4" /> Information for Candidates
              </Link>
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  )
}

function LawFirmRecruitmentPage() {
  return (
    <>
      <Header />
      <main>
        <PageHeader />
        <IntroSection />
        <WhySection />
        <ServicesSection />
        <PracticeAreasSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}

export default function Page() {
  return (
    <LanguageProvider>
      <LawFirmRecruitmentPage />
    </LanguageProvider>
  )
}
