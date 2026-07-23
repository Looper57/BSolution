"use client"

import Link from 'next/link'
import { ArrowRight, Briefcase, Scale, Users, TrendingUp } from 'lucide-react'
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
            <p className="text-gold text-[11px] font-semibold uppercase tracking-[0.2em]">In-House Legal</p>
          </div>
          <h1 className="text-white text-[42px] lg:text-[56px] font-serif leading-[1.1]">
            Hire In-House Counsel
          </h1>
          <p className="mt-8 text-[19px] text-white/55 leading-[1.75] max-w-2xl">
            Build your corporate legal team with exceptional in-house counsel who combine commercial acumen with legal expertise. From first legal hires to General Counsel appointments.
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
            The modern in-house counsel role has evolved dramatically. Today's corporate lawyers must be strategic advisors, risk managers, and business partners while maintaining the highest standards of legal excellence. Finding professionals who excel across all these dimensions requires specialist expertise and deep market knowledge. B Solution has spent over seventeen years identifying, assessing, and placing in-house legal professionals across Europe, from Legal Counsel to General Counsel and Chief Legal Officer appointments.
          </p>
        </div>
      </div>
    </section>
  )
}

function WhySection() {
  const reasons = [
    {
      icon: Briefcase,
      title: 'Corporate Understanding',
      description: 'We understand corporate environments, from start-ups building their first legal function to multinationals restructuring regional teams. Every placement reflects this commercial awareness.'
    },
    {
      icon: Scale,
      title: 'Technical Assessment',
      description: 'Our consultants evaluate legal competency rigorously, ensuring candidates possess the substantive expertise your business requires across relevant practice areas.'
    },
    {
      icon: Users,
      title: 'Cultural Fit Focus',
      description: 'In-house success depends heavily on cultural alignment. We invest significant effort understanding your organization and assessing candidate fit accordingly.'
    },
    {
      icon: TrendingUp,
      title: 'Career Trajectory',
      description: 'We identify candidates with genuine long-term potential, not just those seeking short-term moves. Our placements are designed for sustainable success.'
    }
  ]
  
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-16">
        <div className="text-center mb-16">
          <p className="text-gold text-[11px] font-semibold uppercase tracking-[0.2em] mb-4">Why B Solution</p>
          <h2 className="text-navy text-[32px] lg:text-[40px] font-serif">
            In-House Recruitment Expertise
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
    { num: '01', title: 'Requirement Analysis', desc: 'Deep-dive into your legal function structure, team dynamics, growth plans, and the specific profile you need.' },
    { num: '02', title: 'Candidate Identification', desc: 'Targeted search across relevant sectors, identifying candidates with the right blend of technical skills and commercial orientation.' },
    { num: '03', title: 'Rigorous Assessment', desc: 'Multi-stage evaluation process covering legal competency, commercial judgment, and cultural alignment.' },
    { num: '04', title: 'Successful Integration', desc: 'Support throughout the offer process and onboarding period to ensure your new hire succeeds from day one.' },
  ]
  
  return (
    <section className="bg-gray-100 py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-16">
        <div className="max-w-3xl mb-16">
          <p className="text-gold text-[11px] font-semibold uppercase tracking-[0.2em] mb-4">Our Process</p>
          <h2 className="text-navy text-[32px] lg:text-[40px] font-serif">
            How We Find Your In-House Counsel
          </h2>
          <p className="mt-6 text-gray-600 text-[17px] leading-[1.8]">
            Our methodology is designed specifically for in-house placements, recognizing that corporate legal roles require assessment of factors beyond legal expertise alone.
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
    'Chief Legal Officer',
    'Head of Legal',
    'Legal Director',
    'Deputy General Counsel',
    'Regional Legal Counsel',
    'Senior Legal Counsel',
    'Legal Counsel',
    'Compliance Director',
    'Privacy Counsel',
    'Corporate Secretary',
    'Contract Manager'
  ]
  
  const sectors = [
    'Technology & Software',
    'Financial Services',
    'Manufacturing',
    'Energy & Utilities',
    'Healthcare & Pharma',
    'Real Estate',
    'Retail & Consumer',
    'Professional Services'
  ]
  
  return (
    <section className="bg-navy py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <p className="text-gold text-[11px] font-semibold uppercase tracking-[0.2em] mb-4">In-House Roles</p>
            <h2 className="text-white text-[32px] lg:text-[40px] font-serif mb-6">
              Positions We Recruit
            </h2>
            <p className="text-white/55 text-[17px] leading-[1.8] mb-8">
              From building a legal function from scratch to strengthening an established team, we recruit across all levels of in-house legal seniority and across every key industry sector.
            </p>
            <div className="bg-white/5 p-8">
              <p className="text-white text-[12px] font-semibold uppercase tracking-[0.15em] mb-4">Roles</p>
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
          <div>
            <p className="text-gold text-[11px] font-semibold uppercase tracking-[0.2em] mb-4">Sector Expertise</p>
            <h2 className="text-white text-[32px] lg:text-[40px] font-serif mb-6">
              Industries We Serve
            </h2>
            <p className="text-white/55 text-[17px] leading-[1.8] mb-8">
              Our sector specialists understand the specific legal requirements, regulatory environments, and talent dynamics that define recruitment in each industry.
            </p>
            <div className="bg-white/5 p-8">
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
          <p className="mt-4 text-gray-600">We will contact you shortly to discuss your in-house counsel recruitment needs.</p>
        </CardContent>
      </Card>
    )
  }
  
  return (
    <Card className="border-0 shadow-lg bg-white">
      <CardContent className="p-8">
        <h3 className="text-navy font-serif text-xl mb-6">Discuss Your In-House Needs</h3>
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
              Build Your In-House Legal Team
            </h2>
            <p className="text-gray-600 text-[17px] leading-[1.8] mb-8">
              Whether you need your first legal hire or are expanding an established team, B Solution provides the expertise and network to find exceptional in-house counsel who will add immediate value to your organization.
            </p>
            <div className="space-y-4">
              <Link href="/legal-executive-search" className="flex items-center text-gold hover:text-gold/80 text-[14px] font-medium">
                <ArrowRight className="mr-2 h-4 w-4" /> Legal Executive Search
              </Link>
              <Link href="/legal-recruitment-europe" className="flex items-center text-gold hover:text-gold/80 text-[14px] font-medium">
                <ArrowRight className="mr-2 h-4 w-4" /> Legal Recruitment Europe
              </Link>
              <Link href="/clients" className="flex items-center text-gold hover:text-gold/80 text-[14px] font-medium">
                <ArrowRight className="mr-2 h-4 w-4" /> How We Serve Clients
              </Link>
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  )
}

function HireInHouseCounselPage() {
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
      <HireInHouseCounselPage />
    </LanguageProvider>
  )
}
