"use client"

import Link from 'next/link'
import { ArrowRight, Target, Shield, Clock, CheckCircle } from 'lucide-react'
import { LanguageProvider } from '@/lib/language-context'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { useState } from 'react'

function PageHeader() {
  return (
    <section className="bg-navy pt-32 pb-20 lg:pt-40 lg:pb-28">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-16">
        <div className="max-w-3xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-px bg-gold" />
            <p className="text-gold text-[11px] font-semibold uppercase tracking-[0.2em]">Executive Search</p>
          </div>
          <h1 className="text-white text-[42px] lg:text-[56px] font-serif leading-[1.1]">
            Legal Executive Search
          </h1>
          <p className="mt-8 text-[19px] text-white/55 leading-[1.75] max-w-2xl">
            Retained Executive Search for General Counsel, Chief Legal Officers and senior legal leadership appointments across Europe and the Middle East.
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
            This page focuses on the confidential process used for senior legal leadership appointments. Since 2007, B Solution has supported corporate legal departments, financial institutions and international law firms through targeted market mapping, direct approach and structured assessment.
          </p>
        </div>
      </div>
    </section>
  )
}

function WhySection() {
  const reasons = [
    {
      icon: Target,
      title: 'Precision Targeting',
      description: 'We identify the specific individuals who can transform your legal function, not just candidates who meet basic qualifications. Our research is exhaustive and our approach is strategic.'
    },
    {
      icon: Shield,
      title: 'Absolute Discretion',
      description: 'Executive searches require complete confidentiality. We protect your competitive position and candidate privacy throughout every engagement, operating under strict NDAs when required.'
    },
    {
      icon: Clock,
      title: 'Disciplined Process',
      description: 'Each search follows a defined process from mandate briefing and market mapping through direct approach, assessment and appointment support.'
    },
    {
      icon: CheckCircle,
      title: 'Leadership Assessment',
      description: 'Assessment considers legal experience, leadership capability, motivation and the specific organisational context of the appointment.'
    }
  ]
  
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-16">
        <div className="text-center mb-16">
          <p className="text-gold text-[11px] font-semibold uppercase tracking-[0.2em] mb-4">Our Approach</p>
          <h2 className="text-navy text-[32px] lg:text-[40px] font-serif">
            Why Choose B Solution for Executive Search
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
    { num: '01', title: 'Strategic Definition', desc: 'Comprehensive briefing to understand not just the role, but your organization\'s culture, strategic direction, and what success looks like for this position.' },
    { num: '02', title: 'Market Intelligence', desc: 'Detailed mapping of the target talent landscape, identifying potential candidates and understanding competitive dynamics.' },
    { num: '03', title: 'Executive Approach', desc: 'Confidential, senior-level engagement with identified candidates, presenting your opportunity compellingly while maintaining discretion.' },
    { num: '04', title: 'Assessment & Delivery', desc: 'Thorough evaluation including competency-based interviews, psychometric assessment where appropriate, and comprehensive reference verification.' },
  ]
  
  return (
    <section className="bg-gray-100 py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-16">
        <div className="max-w-3xl mb-16">
          <p className="text-gold text-[11px] font-semibold uppercase tracking-[0.2em] mb-4">Our Methodology</p>
          <h2 className="text-navy text-[32px] lg:text-[40px] font-serif">
            A Rigorous Process for Senior Appointments
          </h2>
          <p className="mt-6 text-gray-600 text-[17px] leading-[1.8]">
            Every executive search follows our proven four-phase methodology, adapted to the specific requirements and timeline of each engagement.
          </p>
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

function RolesSection() {
  const roles = [
    'General Counsel',
    'Chief Legal Officer (CLO)',
    'Chief Compliance Officer',
    'Head of Legal',
    'Regional Legal Director',
    'Deputy General Counsel',
    'Group Legal Counsel',
    'Managing Partner',
    'Practice Group Leader',
    'Board-Level Legal Appointments'
  ]
  
  return (
    <section className="bg-navy py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <p className="text-gold text-[11px] font-semibold uppercase tracking-[0.2em] mb-4">Positions We Fill</p>
            <h2 className="text-white text-[32px] lg:text-[40px] font-serif mb-6">
              Senior Legal Leadership Roles
            </h2>
            <p className="text-white/55 text-[17px] leading-[1.8]">
              Our executive search practice focuses exclusively on senior legal appointments where the stakes are highest. These are positions that shape legal strategy, influence business outcomes, and require exceptional individuals who combine legal expertise with leadership capability.
            </p>
            <Link 
              href="/clients"
              className="inline-flex items-center mt-8 text-gold hover:text-gold/80 text-[13px] font-semibold uppercase tracking-[0.1em] transition-colors"
            >
              How We Serve Clients
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          <div className="bg-white/5 p-10">
            <div className="space-y-4">
              {roles.map((role, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-gold flex-shrink-0" />
                  <span className="text-white/80 text-[15px]">{role}</span>
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
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' })
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (response.ok) setSubmitted(true)
    } finally {
      setIsSubmitting(false)
    }
  }
  
  if (submitted) {
    return (
      <Card className="border-0 shadow-lg bg-white">
        <CardContent className="p-8 text-center">
          <h3 className="text-navy font-serif text-xl">Thank You</h3>
          <p className="mt-4 text-gray-600">We will contact you shortly to discuss your executive search requirements.</p>
        </CardContent>
      </Card>
    )
  }
  
  return (
    <Card className="border-0 shadow-lg bg-white">
      <CardContent className="p-8">
        <h3 className="text-navy font-serif text-xl mb-6">Begin Your Executive Search</h3>
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
          <Button type="submit" disabled={isSubmitting} className="w-full bg-gold hover:bg-gold/90 text-white">
            {isSubmitting ? 'Sending...' : 'Request Consultation'}
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
              Ready to Find Your Next Legal Leader?
            </h2>
            <p className="text-gray-600 text-[17px] leading-[1.8] mb-8">
              Contact us to discuss how our executive search methodology can help you identify and secure the senior legal talent your organization needs. All initial consultations are complimentary and confidential.
            </p>
            <div className="space-y-4">
              <Link href="/legal-recruitment-europe" className="flex items-center text-gold hover:text-gold/80 text-[14px] font-medium">
                <ArrowRight className="mr-2 h-4 w-4" /> Legal Recruitment Across Europe
              </Link>
              <Link href="/hire-in-house-counsel" className="flex items-center text-gold hover:text-gold/80 text-[14px] font-medium">
                <ArrowRight className="mr-2 h-4 w-4" /> In-House Counsel Recruitment
              </Link>
              <Link href="/services" className="flex items-center text-gold hover:text-gold/80 text-[14px] font-medium">
                <ArrowRight className="mr-2 h-4 w-4" /> All Recruitment Services
              </Link>
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  )
}

function LegalExecutiveSearchPage() {
  return (
    <>
      <Header />
      <main>
        <PageHeader />
        <IntroSection />
        <WhySection />
        <ProcessSection />
        <RolesSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}

export default function Page() {
  return (
    <LanguageProvider>
      <LegalExecutiveSearchPage />
    </LanguageProvider>
  )
}
