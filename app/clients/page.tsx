"use client"

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { LanguageProvider, useLanguage } from '@/lib/language-context'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

function PageHeader() {
  const { t } = useLanguage()
  
  return (
    <section className="bg-navy pt-32 pb-20 lg:pt-40 lg:pb-28">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-16">
        <div className="max-w-3xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-px bg-gold" />
            <p className="eyebrow">{t('clients.eyebrow')}</p>
          </div>
          <h1 className="text-white">{t('clients.page.title')}</h1>
          <p className="mt-8 text-[19px] text-white/55 leading-[1.75] max-w-2xl">
            {t('clients.page.subtitle')}
          </p>
        </div>
      </div>
    </section>
  )
}

function IntroSection() {
  const { t } = useLanguage()
  
  return (
    <section className="bg-cream section-padding-sm border-b border-gray-200">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-16">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[18px] text-gray-600 leading-[1.8]">
            {t('clients.page.intro')}
          </p>
        </div>
      </div>
    </section>
  )
}

function CorporationsSection() {
  const { language, t } = useLanguage()
  
  const roles = language === 'en'
    ? ['General Counsel', 'Chief Legal Officer', 'Head of Legal', 'Legal Director', 'Senior Legal Counsel', 'Legal Counsel', 'Compliance Director', 'Chief Compliance Officer']
    : ['General Counsel', 'Chief Legal Officer', 'Head of Legal', 'Legal Director', 'Senior Legal Counsel', 'Legal Counsel', 'Compliance Director', 'Chief Compliance Officer']
  
  return (
    <section id="corporations" className="bg-white section-padding">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <div>
            <span className="text-gold text-[13px] font-semibold tracking-[0.15em]">01</span>
            <div className="w-full h-px bg-gray-200 my-6" />
            <h2 className="text-navy">{t('clients.corporations.title')}</h2>
            <p className="mt-6 text-gray-600 text-[17px] leading-[1.8]">
              {t('clients.corporations.intro')}
            </p>
            <p className="mt-6 text-gray-500 text-[17px] leading-[1.8]">
              {language === 'en'
                ? 'We have helped multinationals, regional headquarters, private equity portfolio companies, and market-leading enterprises build legal teams that deliver. From first legal hires to General Counsel appointments, we understand the unique dynamics of corporate legal recruitment.'
                : 'Pomohli jsme nadnárodním společnostem, regionálním centrálám, portfoliovým společnostem private equity a předním podnikům budovat právní týmy, které přinášejí výsledky. Od prvních právních náboru po jmenování General Counsel chápeme unikátní dynamiku korporátního právního recruitmentu.'
              }
            </p>
            <Link 
              href="/contact"
              className="inline-flex items-center mt-10 text-gold hover:text-gold-dark text-[13px] font-semibold uppercase tracking-[0.1em] transition-colors"
            >
              {language === 'en' ? 'Discuss Corporate Search' : 'Projednat korporátní search'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          <div className="bg-navy p-10 lg:p-12">
            <p className="eyebrow mb-6">
              {language === 'en' ? 'Executive Roles We Cover' : 'Exekutivní pozice, které obsazujeme'}
            </p>
            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
              {roles.map((role, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="w-1 h-1 bg-gold flex-shrink-0" />
                  <span className="text-white/80 text-[14px]">{role}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function LawFirmsSection() {
  const { language, t } = useLanguage()
  
  const roles = language === 'en' 
    ? ['Managing Partner', 'Equity Partner', 'Partner', 'Of Counsel', 'Practice Group Head', 'Senior Associate', 'Associate', 'Counsel']
    : ['Managing Partner', 'Equity Partner', 'Partner', 'Of Counsel', 'Vedoucí praxe', 'Senior Advokát', 'Advokát', 'Counsel']
  
  return (
    <section id="law-firms" className="bg-gray-100 section-padding">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <div className="lg:order-2">
            <span className="text-gold text-[13px] font-semibold tracking-[0.15em]">02</span>
            <div className="w-full h-px bg-gray-300 my-6" />
            <h2 className="text-navy">{t('clients.lawfirms.title')}</h2>
            <p className="mt-6 text-gray-600 text-[17px] leading-[1.8]">
              {t('clients.lawfirms.intro')}
            </p>
            <p className="mt-6 text-gray-500 text-[17px] leading-[1.8]">
              {language === 'en' 
                ? 'Whether you need to strengthen a practice area, bring in lateral talent, or plan partner succession, we provide the market knowledge and candidate access to make it happen. Our track record spans top-tier international firms, leading domestic practices, and boutique specialists across Central Europe and beyond.'
                : 'Ať už potřebujete posílit oblast praxe, přivést laterální talent nebo plánovat nástupnictví partnerů, poskytujeme znalost trhu a přístup ke kandidátům, aby se to podařilo. Naše historie zahrnuje přední mezinárodní firmy, vedoucí domácí kanceláře a boutique specialisty napříč střední Evropou a dále.'
              }
            </p>
            <Link 
              href="/contact"
              className="inline-flex items-center mt-10 text-gold hover:text-gold-dark text-[13px] font-semibold uppercase tracking-[0.1em] transition-colors"
            >
              {language === 'en' ? 'Discuss Law Firm Search' : 'Projednat search pro kanceláře'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          <div className="lg:order-1 bg-white p-10 lg:p-12 border border-gray-200">
            <p className="text-charcoal text-[12px] font-semibold uppercase tracking-[0.15em] mb-6">
              {language === 'en' ? 'Roles We Fill for Law Firms' : 'Pozice pro advokátní kanceláře'}
            </p>
            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
              {roles.map((role, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="w-1 h-1 bg-gold flex-shrink-0" />
                  <span className="text-charcoal/80 text-[14px]">{role}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ApproachSection() {
  const { language, t } = useLanguage()
  
  const steps = language === 'en' ? [
    { num: '01', title: 'Understanding', desc: 'In-depth briefing to understand your requirements, culture, team dynamics, and strategic objectives.' },
    { num: '02', title: 'Intelligence', desc: 'Leveraging our network and market knowledge to identify and map potential candidates.' },
    { num: '03', title: 'Approach', desc: 'Confidential outreach to suitable candidates, protecting your competitive position.' },
    { num: '04', title: 'Assessment', desc: 'Rigorous screening, interviews, and reference checks to ensure quality matches.' },
  ] : [
    { num: '01', title: 'Pochopení', desc: 'Hloubkový briefing k pochopení vašich požadavků, kultury, dynamiky týmu a strategických cílů.' },
    { num: '02', title: 'Inteligence', desc: 'Využití naší sítě a znalosti trhu k identifikaci a mapování potenciálních kandidátů.' },
    { num: '03', title: 'Přístup', desc: 'Důvěrné oslovení vhodných kandidátů s ochranou vaší konkurenční pozice.' },
    { num: '04', title: 'Hodnocení', desc: 'Důsledný screening, pohovory a kontrola referencí k zajištění kvalitních shod.' },
  ]
  
  return (
    <section className="bg-white section-padding">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-16">
        <div className="max-w-3xl mb-20">
          <p className="eyebrow mb-6">
            {language === 'en' ? 'Our Methodology' : 'Naše metodologie'}
          </p>
          <h2 className="text-navy">{t('clients.approach.title')}</h2>
          <p className="mt-6 text-gray-500 text-[17px] leading-[1.8]">
            {t('clients.approach.desc')}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {steps.map((step, index) => (
            <div key={index}>
              <span className="text-gold text-[12px] font-semibold tracking-[0.15em]">{step.num}</span>
              <div className="w-full h-px bg-gray-200 my-5" />
              <h3 className="text-navy text-[18px] font-serif mb-4">
                {step.title}
              </h3>
              <p className="text-gray-500 text-[15px] leading-[1.7]">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function WhySection() {
  const { language } = useLanguage()
  
  const reasons = language === 'en' ? [
    { title: 'Legal Focus', desc: 'We work exclusively in legal recruitment, giving us unmatched sector expertise and network depth.' },
    { title: 'Quality First', desc: 'We present fewer, better-matched candidates, saving you time and ensuring superior outcomes.' },
    { title: 'Market Access', desc: 'Our established network reaches candidates who are not actively looking but would consider the right opportunity.' },
    { title: 'Discretion', desc: 'Complete confidentiality in every search, protecting all parties involved throughout the process.' },
    { title: 'International', desc: 'Active across Europe and the Middle East with genuine local market knowledge in each jurisdiction.' },
    { title: 'Partnership', desc: 'We build relationships, not just fill roles. Many clients have worked with us for over a decade.' },
  ] : [
    { title: 'Právní zaměření', desc: 'Pracujeme výhradně v právním recruitmentu, což nám dává nepřekonatelnou sektorovou expertízu a hloubku sítě.' },
    { title: 'Kvalita na prvním místě', desc: 'Prezentujeme méně, ale lépe odpovídajících kandidátů, šetříme váš čas a zajišťujeme lepší výsledky.' },
    { title: 'Přístup k trhu', desc: 'Naše zavedená síť oslovuje kandidáty, kteří aktivně nehledají, ale zvážili by správnou příležitost.' },
    { title: 'Diskrétnost', desc: 'Naprostá důvěrnost v každém vyhledávání, ochrana všech zúčastněných stran v průběhu celého procesu.' },
    { title: 'Mezinárodní', desc: 'Aktivní po celé Evropě a na Blízkém východě se skutečnou místní znalostí trhu v každé jurisdikci.' },
    { title: 'Partnerství', desc: 'Budujeme vztahy, ne jen obsazujeme pozice. Mnoho klientů s námi spolupracuje přes deset let.' },
  ]
  
  return (
    <section className="bg-navy section-padding">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-16">
        <div className="text-center mb-20">
          <p className="eyebrow mb-6">
            {language === 'en' ? 'Our Distinction' : 'Čím se odlišujeme'}
          </p>
          <h2 className="text-white max-w-2xl mx-auto">
            {language === 'en' ? 'Why Clients Choose B Solution' : 'Proč si klienti vybírají B Solution'}
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-8">
          {reasons.map((reason, index) => (
            <div key={index}>
              <span className="text-gold text-[12px] font-semibold tracking-[0.15em]">0{index + 1}</span>
              <div className="w-full h-px bg-white/10 my-5" />
              <h3 className="text-white text-[18px] font-serif mb-4">{reason.title}</h3>
              <p className="text-white/45 text-[15px] leading-[1.7]">{reason.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTASection() {
  const { language, t } = useLanguage()
  
  return (
    <section className="bg-cream section-padding">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-16 text-center">
        <div className="divider mx-auto mb-10" />
        <h2 className="text-navy max-w-2xl mx-auto">
          {language === 'en' ? 'Ready to Discuss Your Hiring Needs?' : 'Připraveni projednat vaše náborové potřeby?'}
        </h2>
        <p className="mt-6 text-gray-500 text-[18px] max-w-2xl mx-auto leading-[1.75]">
          {language === 'en'
            ? 'Contact us for a confidential discussion about how we can support your legal talent acquisition.'
            : 'Kontaktujte nás pro důvěrnou diskusi o tom, jak můžeme podpořit vaše získávání právních talentů.'
          }
        </p>
        <Link 
          href="/contact"
          className="btn-primary mt-12 bg-navy hover:bg-charcoal"
        >
          {t('clients.cta')}
          <ArrowRight className="ml-3 h-4 w-4" />
        </Link>
      </div>
    </section>
  )
}

function ClientsPage() {
  return (
    <>
      <Header />
      <main>
        <PageHeader />
        <IntroSection />
        <CorporationsSection />
        <LawFirmsSection />
        <ApproachSection />
        <WhySection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}

export default function Page() {
  return (
    <LanguageProvider>
      <ClientsPage />
    </LanguageProvider>
  )
}
