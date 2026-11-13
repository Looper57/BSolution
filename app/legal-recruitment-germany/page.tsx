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
            <p className="text-gold text-[11px] font-semibold uppercase tracking-[0.2em]">Deutschland</p>
          </div>
          <h1 className="text-white text-[42px] lg:text-[56px] font-serif leading-[1.1]">
            Legal Recruitment Germany
          </h1>
          <p className="mt-8 text-[19px] text-white/55 leading-[1.75] max-w-2xl">
            Recruitment for companies hiring in-house lawyers and law firms appointing partners, counsel or senior associates in Germany.
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
            For a German business, an international company hiring in Germany or a law firm strengthening its German practice, the search starts with the work and responsibilities. B Solution can help define a confidential recruitment brief for in-house counsel, General Counsel, Head of Legal and private-practice appointments.
          </p>
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
              Discuss the products, customers, transactions and operational work the role will support. Define which sector experience is essential for the appointment and which specialist resources will be available.
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
              Outline the legal work, office, reporting line and reason for hiring. Discuss a first internal lawyer, a legal leadership appointment or a partner and team search with B Solution.
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
          <ContactForm heading="Discuss Your German Search" initialType="hiring" />
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
        <InternationalEmployerBrief market="germany" />
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
