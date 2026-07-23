"use client"

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { AuthorityHub } from '@/components/authority-hub'
import { getEntitiesForSection } from '@/lib/content'

function IntroSection() {
  const { t } = useLanguage()
  
  return (
    <section className="bg-cream section-padding-sm border-b border-gray-200">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-16">
        <div className="max-w-3xl mx-auto text-center">
          <p className="mb-5 text-[15px] font-medium text-navy">
            {t('services.page.subtitle')}
          </p>
          <p className="text-[18px] text-gray-600 leading-[1.8]">
            {t('services.page.intro')}
          </p>
        </div>
      </div>
    </section>
  )
}

function ServicesContent() {
  const { language } = useLanguage()
  
  const services = language === 'en' ? [
    {
      id: 'executive-search',
      num: '01',
      title: 'Legal Executive Search',
      description: 'Our retained executive search service is designed for senior-level legal appointments where discretion, thoroughness, and market expertise are paramount. We work on a consultative basis to identify and secure exceptional legal leaders.',
      features: [
        'General Counsel and Chief Legal Officer appointments',
        'Head of Legal and Regional Legal Director roles',
        'Board-level legal appointments',
        'Partner and Managing Partner recruitment',
        'Comprehensive market mapping and candidate assessment'
      ],
      idealFor: 'Corporations recruiting C-level or senior legal leadership, and law firms seeking lateral partners or practice group leaders. Ideal when the role is critical, confidential, and requires a thorough market approach.'
    },
    {
      id: 'retained-recruitment',
      num: '02',
      title: 'Retained Legal Recruitment',
      description: 'Dedicated search for experienced legal professionals where quality and discretion matter. We combine deep market knowledge with a personalized approach to identify candidates who match both technical requirements and cultural fit.',
      features: [
        'Senior Legal Counsel and Legal Counsel positions',
        'Senior Associates and Counsel for law firms',
        'Specialist lawyers across practice areas',
        'Compliance and governance leadership',
        'Comprehensive screening and interview process'
      ],
      idealFor: 'Law firms expanding at associate and counsel level, and corporations strengthening their in-house legal departments. Suitable for roles requiring thorough market coverage and discretion.'
    },
    {
      id: 'market-intelligence',
      num: '03',
      title: 'Market Intelligence',
      description: 'Strategic intelligence providing detailed insights into talent landscapes, competitor structures, and market dynamics. Ideal for informing hiring strategies or preparing for future recruitment needs.',
      features: [
        'Talent pool identification and analysis',
        'Competitor team structure mapping',
        'Salary and benefit benchmarking',
        'Market entry feasibility studies',
        'Succession planning support'
      ],
      idealFor: 'Organizations planning strategic hires, entering new markets, or seeking to understand the competitive talent landscape before making recruitment decisions.'
    },
    {
      id: 'strategic-advisory',
      num: '04',
      title: 'Strategic Advisory',
      description: 'Advisory services to help organizations optimize their legal talent strategy. From team structuring to compensation planning, we provide insights grounded in market data and sector expertise.',
      features: [
        'Team structure and design advisory',
        'Compensation and benefits benchmarking',
        'Talent acquisition strategy development',
        'Interview and assessment process design',
        'Legal function organizational design'
      ],
      idealFor: 'Legal departments and law firms seeking expert guidance on building effective teams, competitive compensation packages, and sustainable talent acquisition processes.'
    }
  ] : [
    {
      id: 'executive-search',
      num: '01',
      title: 'Legal Executive Search',
      description: 'Naše retainerová služba executive search je navržena pro seniorní právní pozice, kde je prvořadá diskrétnost, důkladnost a znalost trhu. Pracujeme konzultativně na identifikaci a získání výjimečných právních lídrů.',
      features: [
        'Pozice General Counsel a Chief Legal Officer',
        'Pozice Head of Legal a regionálních právních ředitelů',
        'Právní pozice na úrovni představenstva',
        'Nábor partnerů a Managing partnerů',
        'Komplexní mapování trhu a hodnocení kandidátů'
      ],
      idealFor: 'Korporace nabírající C-level nebo seniorní právní vedení a advokátní kanceláře hledající laterální partnery nebo vedoucí praxí. Ideální když je pozice kritická, důvěrná a vyžaduje důkladný přístup k trhu.'
    },
    {
      id: 'retained-recruitment',
      num: '02',
      title: 'Retained Legal Recruitment',
      description: 'Dedikované vyhledávání zkušených právních profesionálů, kde záleží na kvalitě a diskrétnosti. Kombinujeme hlubokou znalost trhu s personalizovaným přístupem k identifikaci kandidátů odpovídajících technickým požadavkům i firemní kultuře.',
      features: [
        'Pozice Senior Legal Counsel a Legal Counsel',
        'Senior advokáti a Counsel pro advokátní kanceláře',
        'Specializovaní právníci napříč oblastmi praxe',
        'Vedení compliance a governance',
        'Komplexní screening a pohovorový proces'
      ],
      idealFor: 'Advokátní kanceláře rozšiřující se na úrovni advokátů a counsel a korporace posilující in-house právní oddělení. Vhodné pro pozice vyžadující důkladné pokrytí trhu a diskrétnost.'
    },
    {
      id: 'market-intelligence',
      num: '03',
      title: 'Analýza trhu',
      description: 'Strategická inteligence poskytující detailní vhled do talentového prostředí, struktur konkurence a dynamiky trhu. Ideální pro informování náborových strategií nebo přípravu na budoucí potřeby recruitmentu.',
      features: [
        'Identifikace a analýza talentového poolu',
        'Mapování týmových struktur konkurence',
        'Benchmarking platů a benefitů',
        'Studie proveditelnosti vstupu na trh',
        'Podpora plánování nástupnictví'
      ],
      idealFor: 'Organizace plánující strategické nábory, vstupující na nové trhy nebo usilující o pochopení konkurenčního talentového prostředí před rozhodnutím o recruitmentu.'
    },
    {
      id: 'strategic-advisory',
      num: '04',
      title: 'Strategické poradenství',
      description: 'Poradenské služby pomáhající organizacím optimalizovat jejich právní talentovou strategii. Od strukturování týmů po plánování odměňování poskytujeme poznatky založené na tržních datech a sektorové expertíze.',
      features: [
        'Poradenství v oblasti struktury a designu týmu',
        'Benchmarking odměňování a benefitů',
        'Vývoj strategie získávání talentů',
        'Design pohovorového a hodnotícího procesu',
        'Organizační design právní funkce'
      ],
      idealFor: 'Právní oddělení a advokátní kanceláře hledající odborné vedení při budování efektivních týmů, konkurenceschopných kompenzačních balíčků a udržitelných procesů získávání talentů.'
    }
  ]
  
  return (
    <section className="bg-white">
      {services.map((service, index) => (
        <div 
          key={service.id}
          id={service.id}
          className={`section-padding border-b border-gray-200 ${index % 2 === 1 ? 'bg-gray-100' : 'bg-white'}`}
        >
          <div className="max-w-[1440px] mx-auto px-8 lg:px-16">
            <div className="grid lg:grid-cols-12 gap-16 lg:gap-20">
              {/* Left column */}
              <div className="lg:col-span-5">
                <span className="text-gold text-[13px] font-semibold tracking-[0.15em]">{service.num}</span>
                <div className="w-full h-px bg-gray-200 my-6" />
                <h2 className="text-navy">{service.title}</h2>
                <p className="mt-6 text-gray-500 text-[17px] leading-[1.8]">
                  {service.description}
                </p>
              </div>
              
              {/* Right column */}
              <div className="lg:col-span-7">
                <div className="bg-navy p-10 lg:p-12">
                  <p className="eyebrow mb-6">
                    {language === 'en' ? 'What We Cover' : 'Co pokrýváme'}
                  </p>
                  <div className="space-y-4 mb-10">
                    {service.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-4">
                        <span className="w-1.5 h-1.5 bg-gold mt-2 flex-shrink-0" />
                        <span className="text-white/80 text-[15px] leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="pt-8 border-t border-white/10">
                    <p className="text-gold text-[12px] font-semibold uppercase tracking-[0.15em] mb-3">
                      {language === 'en' ? 'Ideal For' : 'Ideální pro'}
                    </p>
                    <p className="text-white/60 text-[15px] leading-[1.7]">
                      {service.idealFor}
                    </p>
                  </div>
                </div>
                
                <Link 
                  href="/contact"
                  className="inline-flex items-center mt-8 text-gold hover:text-gold-dark text-[13px] font-semibold uppercase tracking-[0.1em] transition-colors"
                >
                  {language === 'en' ? 'Discuss This Service' : 'Projednat tuto službu'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}

function CTASection() {
  const { language } = useLanguage()
  
  return (
    <section className="bg-navy section-padding">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-16 text-center">
        <div className="divider mx-auto mb-10" />
        <h2 className="text-white max-w-2xl mx-auto">
          {language === 'en' ? 'Ready to Discuss Your Requirements?' : 'Připraveni projednat vaše požadavky?'}
        </h2>
        <p className="mt-6 text-white/50 text-[18px] max-w-2xl mx-auto leading-[1.75]">
          {language === 'en' 
            ? 'Contact us to explore how our services can support your legal recruitment and talent strategy needs.'
            : 'Kontaktujte nás a prozkoumejte, jak naše služby mohou podpořit vaše potřeby v oblasti právního recruitmentu a talentové strategie.'
          }
        </p>
        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/contact"
            className="btn-primary"
          >
            {language === 'en' ? 'Schedule a Consultation' : 'Domluvit konzultaci'}
            <ArrowRight className="ml-3 h-4 w-4" />
          </Link>
          <Link 
            href="/clients"
            className="btn-outline border-white/25 text-white hover:bg-white hover:text-navy"
          >
            {language === 'en' ? 'Learn About Our Approach' : 'Zjistit více o našem přístupu'}
          </Link>
        </div>
      </div>
    </section>
  )
}

export function ServicesOverview() {
  return (
    <>
      <IntroSection />
      <ServicesContent />
      <CTASection />
    </>
  )
}

export default function Page() {
  return (
    <AuthorityHub
      locale="en"
      kind="service"
      path="/services"
      entities={getEntitiesForSection('services')}
      supplement={<ServicesOverview />}
    />
  )
}
