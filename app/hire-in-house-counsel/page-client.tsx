"use client"

import type { ReactNode } from 'react'

import Link from 'next/link'
import { ContactForm } from '@/components/contact-form'
import { RecruitmentBrief } from '@/components/recruitment-brief'
import { ArrowRight } from 'lucide-react'
import { InHouseHiringScope, InHouseAssessmentBrief } from '@/components/inhouse-hiring-scope'
import { LanguageProvider } from '@/lib/language-context'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { legalExecutiveSearchCanonicalPath } from '@/lib/routes'

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
            In-House Legal Recruitment for Companies
          </h1>
          <p className="mt-8 text-[19px] text-white/55 leading-[1.75] max-w-2xl">
            Specialist search for corporate legal professionals, from first in-house counsel appointments to General Counsel and Chief Legal Officer mandates.
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
            This page focuses on building corporate legal capability at every level. Since 2007, B Solution has supported corporate legal departments and financial institutions with searches for Legal Counsel, senior specialists, Heads of Legal, General Counsel and Chief Legal Officers across Europe and selected Middle Eastern markets.
          </p>
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
              Define the level of responsibility your team needs, from a first internal appointment to specialist counsel or legal leadership. The title should reflect the actual work and reporting line.
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
              Discuss the business model, products, customers and geographic scope alongside the legal role. These help identify which sector experience is essential and which work will need specialist support.
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
              Whether you need your first legal hire or are expanding an established team, B Solution provides a targeted and confidential search process shaped around the role, market and organisation.
            </p>
            <div className="space-y-4">
              <Link href={legalExecutiveSearchCanonicalPath} className="flex items-center text-gold hover:text-gold/80 text-[14px] font-medium">
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
          <ContactForm heading="Discuss Your In-House Needs" initialType="hiring" />
        </div>
      </div>
    </section>
  )
}

function HireInHouseCounselPage({ editorialSupplement }: { editorialSupplement: ReactNode }) {
  return (
    <>
      <Header />
      <main>
        <PageHeader />
        <IntroSection />
        <InHouseHiringScope />
        <InHouseAssessmentBrief />
        <RolesSection />
        <RecruitmentBrief audience="in-house" />
        {editorialSupplement}
        <CTASection />
      </main>
      <Footer />
    </>
  )
}

export default function PageClient({ editorialSupplement }: { editorialSupplement: ReactNode }) {
  return (
    <LanguageProvider>
      <HireInHouseCounselPage editorialSupplement={editorialSupplement} />
    </LanguageProvider>
  )
}
