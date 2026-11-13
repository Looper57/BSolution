"use client"

import Link from 'next/link'
import { ContactForm } from '@/components/contact-form'
import { ArrowRight } from 'lucide-react'
import { InternationalEmployerBrief } from '@/components/international-employer-brief'
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
            <p className="text-gold text-[11px] font-semibold uppercase tracking-[0.2em]">Middle East</p>
          </div>
          <h1 className="text-white text-[42px] lg:text-[56px] font-serif leading-[1.1]">
            Legal Recruitment Dubai
          </h1>
          <p className="mt-8 text-[19px] text-white/55 leading-[1.75] max-w-2xl">
            Recruitment for companies and law firms hiring legal professionals in Dubai, Abu Dhabi and the UAE, including roles with wider regional responsibilities.
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
            For a company hiring in Dubai or Abu Dhabi, or a law firm strengthening its UAE practice, define the local responsibilities and any wider regional scope together. B Solution can help shape a confidential brief for in-house lawyers, legal leaders and private-practice appointments.
          </p>
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
              Describe the products, clients and business activities the new lawyer will support. Agree the specialist experience, internal resources and external adviser support the position requires.
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
              Outline the place of work, legal responsibilities and regional coverage. Discuss your in-house appointment or law firm brief, including the candidate availability and practical arrangements your organisation can support.
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
          <ContactForm heading="Discuss Your UAE Search" initialType="hiring" />
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
        <InternationalEmployerBrief market="uae" />
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
