"use client"

import Link from 'next/link'
import { ArrowRight, Globe, Building, Sun, Briefcase } from 'lucide-react'
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
            <p className="text-gold text-[11px] font-semibold uppercase tracking-[0.2em]">Middle East</p>
          </div>
          <h1 className="text-white text-[42px] lg:text-[56px] font-serif leading-[1.1]">
            Legal Recruitment Dubai
          </h1>
          <p className="mt-8 text-[19px] text-white/55 leading-[1.75] max-w-2xl">
            Executive search for legal professionals in Dubai, Abu Dhabi, and across the UAE. Connecting international talent with the region&apos;s leading corporations and law firms.
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
            Dubai and the wider UAE have emerged as one of the world&apos;s most dynamic legal markets, attracting international law firms, multinational corporations, and ambitious legal professionals from across the globe. B Solution has built significant expertise in Middle East legal recruitment, understanding the unique dynamics of the region including DIFC and ADGM requirements, the mix of common law and civil law frameworks, and the specific expectations of employers and candidates in the Gulf. We connect exceptional legal talent with outstanding opportunities across Dubai, Abu Dhabi, and the broader GCC region.
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
      title: 'Regional Understanding',
      description: 'Deep knowledge of the UAE legal landscape including DIFC, ADGM, onshore requirements, and the specific dynamics of international versus local law firms and corporations.'
    },
    {
      icon: Building,
      title: 'Premium Client Base',
      description: 'Relationships with leading international law firms, sovereign wealth funds, major corporations, and regional champions seeking exceptional legal talent.'
    },
    {
      icon: Sun,
      title: 'Candidate Network',
      description: 'Access to qualified international lawyers considering relocation and established UAE-based professionals open to new opportunities.'
    },
    {
      icon: Briefcase,
      title: 'Relocation Support',
      description: 'Guidance on compensation expectations, visa requirements, and practical considerations for candidates relocating to the region.'
    }
  ]
  
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-16">
        <div className="text-center mb-16">
          <p className="text-gold text-[11px] font-semibold uppercase tracking-[0.2em] mb-4">Our Expertise</p>
          <h2 className="text-navy text-[32px] lg:text-[40px] font-serif">
            Why Choose B Solution for UAE Recruitment
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
    { num: '01', title: 'Regional Briefing', desc: 'Understanding your specific requirements within the UAE context, including jurisdiction, qualification requirements, and compensation expectations.' },
    { num: '02', title: 'International Search', desc: 'Identifying candidates from our international network and UAE-based contacts, focusing on those with genuine interest and appropriate qualifications.' },
    { num: '03', title: 'Thorough Assessment', desc: 'Evaluating technical capability, cultural fit, and commitment to relocate or remain in the region long-term.' },
    { num: '04', title: 'Successful Placement', desc: 'Supporting offer negotiations, relocation planning, and ensuring smooth transitions for both clients and candidates.' },
  ]
  
  return (
    <section className="bg-gray-100 py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-16">
        <div className="max-w-3xl mb-16">
          <p className="text-gold text-[11px] font-semibold uppercase tracking-[0.2em] mb-4">Our Process</p>
          <h2 className="text-navy text-[32px] lg:text-[40px] font-serif">
            How We Deliver Results in the Middle East
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
    'Energy & Utilities',
    'Real Estate & Construction',
    'Technology & Digital',
    'Aviation & Logistics',
    'Healthcare',
    'Sovereign Wealth',
    'Private Equity'
  ]
  
  const roles = [
    'General Counsel',
    'Regional Legal Director',
    'Head of Legal - MENA',
    'Senior Legal Counsel',
    'Legal Counsel',
    'Compliance Director',
    'Partner (Law Firm)',
    'Of Counsel'
  ]
  
  return (
    <section className="bg-navy py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <p className="text-gold text-[11px] font-semibold uppercase tracking-[0.2em] mb-4">Sectors</p>
            <h2 className="text-white text-[32px] lg:text-[40px] font-serif mb-6">
              Key Industries in the UAE
            </h2>
            <p className="text-white/55 text-[17px] leading-[1.8] mb-8">
              Dubai and Abu Dhabi&apos;s diverse economies create demand for legal professionals across multiple sectors, each with distinct requirements and compensation structures.
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
            <p className="text-gold text-[11px] font-semibold uppercase tracking-[0.2em] mb-4">Positions</p>
            <h2 className="text-white text-[32px] lg:text-[40px] font-serif mb-6">
              Roles We Recruit
            </h2>
            <p className="text-white/55 text-[17px] leading-[1.8] mb-8">
              From MENA regional counsel positions to local legal team members, we recruit across all levels of seniority for both in-house and private practice roles.
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
          <h3 className="text-navy font-serif text-xl">Thank You</h3>
          <p className="mt-4 text-gray-600">We will contact you shortly to discuss your UAE legal recruitment needs.</p>
        </CardContent>
      </Card>
    )
  }
  
  return (
    <Card className="border-0 shadow-lg bg-white">
      <CardContent className="p-8">
        <h3 className="text-navy font-serif text-xl mb-6">Discuss Your UAE Search</h3>
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
              Start Your Dubai Legal Search
            </h2>
            <p className="text-gray-600 text-[17px] leading-[1.8] mb-8">
              Whether you are establishing a regional legal function, expanding your Dubai office, or seeking to relocate to the UAE, B Solution provides the expertise and network to make it happen.
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

function LegalRecruitmentDubaiPage() {
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
      <LegalRecruitmentDubaiPage />
    </LanguageProvider>
  )
}
