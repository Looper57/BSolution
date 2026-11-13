"use client"

import type { ReactNode } from 'react'

import Link from 'next/link'
import { ContactForm } from '@/components/contact-form'
import { ArrowRight } from 'lucide-react'
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
            <p className="text-gold text-[11px] font-semibold uppercase tracking-[0.2em]">Cross-border legal hiring</p>
          </div>
          <h1 className="text-white text-[42px] lg:text-[56px] font-serif leading-[1.1]">
            Legal Recruitment Across Europe
          </h1>
          <p className="mt-8 text-[19px] text-white/55 leading-[1.75] max-w-2xl">
            Hire an in-house lawyer, appoint a legal leader or recruit a law firm partner across European markets. Start with the work, location and responsibilities the appointment must cover.
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
            From Prague, B Solution supports corporate legal departments and law firms with Legal Executive Search. A European search may mean hiring in one country for a wider regional role, comparing candidates in several markets or building a team across offices. Agree which situation applies before deciding where to search.
          </p>
        </div>
      </div>
    </section>
  )
}

function EmployerBriefSection() {
  const situations = [
    { title: 'A first lawyer in a new market', text: 'Separate the immediate local workload from group responsibilities. Define which matters the new in-house lawyer will own, who will supervise the role and which work stays with external advisers.', href: '/hire-in-house-counsel', label: 'Plan an in-house counsel appointment' },
    { title: 'Regional or group legal leadership', text: 'A General Counsel or Head of Legal may be based in one country while supporting several businesses. Agree decision-making authority, reporting to headquarters and the existing team before using the title to define seniority.', href: '/practice-areas/general-counsel', label: 'Define the legal leadership remit' },
    { title: 'A law firm partner, practice or team', text: 'Specify the target office, practice and client needs. Distinguish an individual lateral partner from a team move or a new practice, with a separate brief for commercial contribution, delivery and integration.', href: '/law-firm-recruitment', label: 'Plan a partner or team search' },
  ]
  return (
    <section className="bg-white px-6 py-20 lg:px-16 lg:py-28" aria-labelledby="europe-hiring-situation">
      <div className="mx-auto max-w-[1200px]">
        <h2 id="europe-hiring-situation" className="font-serif text-3xl leading-tight text-navy md:text-4xl">What does your European legal hire need to achieve?</h2>
        <p className="mt-6 max-w-3xl leading-relaxed text-gray-600">Choose the business situation first. The employment country, countries supported and candidate search markets are related decisions, but they need not be the same.</p>
        <div className="mt-10 grid gap-10 lg:grid-cols-3">{situations.map(situation => (
          <article key={situation.title} className="border-t border-gold/40 pt-6">
            <h3 className="font-serif text-2xl text-navy">{situation.title}</h3>
            <p className="mt-4 leading-relaxed text-gray-600">{situation.text}</p>
            <Link href={situation.href} className="mt-5 inline-block underline underline-offset-4 hover:text-gold">{situation.label}</Link>
          </article>
        ))}</div>
        <Link href="#contact-form" className="mt-10 inline-block bg-navy px-6 py-4 text-sm font-medium text-white hover:bg-navy-light">Discuss a cross-border legal recruitment brief</Link>
      </div>
    </section>
  )
}

function SearchScopeSection() {
  const decisions = [
    { title: 'Workplace and geographic responsibility', text: 'Name the employment location, countries supported, travel and working arrangements. A Germany-based role with a regional remit needs a different brief from separate local hires in several countries.' },
    { title: 'Legal work and working languages', text: 'Describe the matters the lawyer must handle and the languages used with management, clients and headquarters. Specify the qualifications required for that work rather than assuming one profile covers every jurisdiction.' },
    { title: 'Local candidates or relocation', text: 'Decide whether to consider candidates already in the employment market, candidates considering relocation or both. Clarify availability and the practical arrangements the employer can support before comparing profiles.' },
    { title: 'Seniority, resources and reporting', text: 'Set the reporting line, decision-making authority, budget and access to internal colleagues or external advisers. Compare responsibility and support alongside title and experience.' },
    { title: 'One assessment across decision-makers', text: 'Agree who interviews, who decides and which examples of judgement, leadership and technical work will be assessed. Use consistent criteria when candidates come from different markets.' },
    { title: 'Confidentiality and sequencing', text: 'Identify sensitive information and who may receive it at each stage, especially for a confidential replacement, partner approach or team move. Agree how the brief may be presented to candidates.' },
  ]
  return (
    <section className="bg-cream px-6 py-20 lg:px-16 lg:py-28" aria-labelledby="europe-search-scope">
      <div className="mx-auto max-w-[1200px]">
        <h2 id="europe-search-scope" className="font-serif text-3xl leading-tight text-navy md:text-4xl">Agree the cross-border search brief</h2>
        <dl className="mt-10 grid gap-8 md:grid-cols-2">{decisions.map(decision => <div key={decision.title}><dt className="text-lg font-medium text-navy">{decision.title}</dt><dd className="mt-3 leading-relaxed text-gray-600">{decision.text}</dd></div>)}</dl>
        <p className="mt-10 max-w-3xl leading-relaxed text-gray-600">For a Germany-based appointment, see the <Link href="/legal-recruitment-germany" className="underline underline-offset-4 hover:text-gold">Germany legal recruitment brief</Link>. For a UK-based appointment, prepare the <Link href="/locations/united-kingdom" className="underline underline-offset-4 hover:text-gold">UK legal recruitment brief</Link>. For a corporate role, compare <Link href="/hire-legal-leader" className="underline underline-offset-4 hover:text-gold">Legal Counsel, Head of Legal and General Counsel responsibilities</Link> before setting the search criteria.</p>
      </div>
    </section>
  )
}

function ProcessSection() {
  const steps = [
    { title: 'Define the assignment', text: 'Discuss the role, markets, working languages, decision-makers and confidentiality needs. Agree the search scope and commercial terms before the assignment starts.' },
    { title: 'Map and approach candidates', text: 'Focus the search on the agreed candidate markets and assess interest in the specific opportunity. Review the brief if location, availability or responsibilities limit the relevant pool.' },
    { title: 'Compare evidence and decide', text: 'Assess candidates against the agreed work and leadership criteria. Coordinate interviews, feedback and the next steps with the hiring decision-makers.' },
  ]
  return (
    <section className="bg-white px-6 py-20 lg:px-16 lg:py-28" aria-labelledby="europe-search-process">
      <div className="mx-auto max-w-[1200px]">
        <h2 id="europe-search-process" className="font-serif text-3xl leading-tight text-navy md:text-4xl">From an international requirement to an agreed search</h2>
        <ol className="mt-10 grid gap-10 md:grid-cols-3">{steps.map((step, index) => <li key={step.title} className="border-t border-gray-200 pt-6"><p className="text-sm font-semibold text-gold">0{index + 1}</p><h3 className="mt-4 font-serif text-2xl text-navy">{step.title}</h3><p className="mt-4 leading-relaxed text-gray-600">{step.text}</p></li>)}</ol>
        <p className="mt-10 max-w-3xl leading-relaxed text-gray-600">Review <Link href={legalExecutiveSearchCanonicalPath} className="underline underline-offset-4 hover:text-gold">B Solution’s search methodology and published experience</Link>, or compare the <Link href="/services" className="underline underline-offset-4 hover:text-gold">available recruitment and advisory services</Link>.</p>
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
              Start Your European Legal Search
            </h2>
            <p className="text-gray-600 text-[17px] leading-[1.8] mb-8">
              Tell us whether you are hiring for a company or a law firm, the employment location, countries supported, role and working languages. Include your preferred timing and any confidentiality requirements so we can discuss the scope with you.
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
          <ContactForm heading="Discuss Your Requirements" initialType="hiring" />
        </div>
      </div>
    </section>
  )
}

function LegalRecruitmentEuropePage({ editorialSupplement }: { editorialSupplement: ReactNode }) {
  return (
    <>
      <Header />
      <main>
        <PageHeader />
        <IntroSection />
        <EmployerBriefSection />
        <SearchScopeSection />
        <ProcessSection />
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
      <LegalRecruitmentEuropePage editorialSupplement={editorialSupplement} />
    </LanguageProvider>
  )
}
