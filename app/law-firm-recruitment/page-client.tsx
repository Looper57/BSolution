"use client"

import type { ReactNode } from 'react'

import Link from 'next/link'
import { ContactForm } from '@/components/contact-form'
import { RecruitmentBrief } from '@/components/recruitment-brief'
import { ArrowRight } from 'lucide-react'
import { LawFirmMandateGuide, LawFirmSearchProcess } from '@/components/law-firm-mandates'
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
            <p className="text-gold text-[11px] font-semibold uppercase tracking-[0.2em]">Private Practice</p>
          </div>
          <h1 className="text-white text-[42px] lg:text-[56px] font-serif leading-[1.1]">
            International Law Firm Recruitment
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
              Define the Practice Area
            </h2>
            <p className="text-white/55 text-[17px] leading-[1.8]">
              Define the work the appointment must cover, the level of responsibility and the office where the lawyer will be based. A specialist hire and a partner responsible for building a wider practice need different assessment criteria.
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
              Discuss the purpose of your appointment, the practice and the office involved. B Solution can help you define a search brief for a lateral partner, a team move or practice development.
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
          <ContactForm heading="Discuss Your Firm&apos;s Needs" initialType="hiring" />
        </div>
      </div>
    </section>
  )
}

function LawFirmRecruitmentPage({ editorialSupplement }: { editorialSupplement: ReactNode }) {
  return (
    <>
      <Header />
      <main>
        <PageHeader />
        <IntroSection />
        <LawFirmMandateGuide />
        <LawFirmSearchProcess />
        <PracticeAreasSection />
        <RecruitmentBrief audience="law-firm" />
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
      <LawFirmRecruitmentPage editorialSupplement={editorialSupplement} />
    </LanguageProvider>
  )
}
