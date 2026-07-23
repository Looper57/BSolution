"use client"

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Check } from 'lucide-react'
import { useState, useEffect } from 'react'

// Complete Czech content matching English homepage structure
const content = {
  nav: {
    services: 'Služby',
    clients: 'Pro klienty',
    candidates: 'Pro kandidáty',
    positions: 'Pozice',
    about: 'O nás',
    contact: 'Kontakt',
    cta: 'Kontaktujte nás',
  },
  hero: {
    headline: 'Executive Search pro právní lídry',
    subheadline: 'Vyhněte se nákladným chybám při náboru, které zpomalují váš byznys. Dodáváme prověřené právní lídry pro komplexní mezinárodní prostředí.',
    trustLine1: 'Důvěřují nám korporátní právní týmy a přední advokátní kanceláře napříč Evropou již od roku 2007.',
    trustLine2: 'Každé vyhledávání vedeme důsledně, diskrétně a podle konkrétního mandátu.',
    ctaPrimary: 'Nezávazně probrat vaše potřeby (důvěrně)',
  },
  trust: {
    eyebrow: 'Důvěra',
    headline: 'Důvěřují nám právní lídři napříč Evropou',
    columns: [
      { title: 'Více než 17 let zkušeností', desc: 'Působíme na právním trhu ve střední Evropě, západní Evropě i na Blízkém východě.' },
      { title: 'Mezinárodní obsazení pozic', desc: 'General Counsel, Head of Legal, Legal Director a další seniorní právní role.' },
      { title: 'Diskrétní a cílené vyhledávání', desc: 'Důvěrná zadání pro špičkové klienty a strategické pozice.' },
    ],
  },
  segments: {
    corporate: {
      title: 'Korporátní právní oddělení',
      desc: 'Pomáháme mezinárodním i regionálním společnostem obsazovat seniorní právní role, včetně General Counsel, Head of Legal a dalších klíčových interních pozic.',
      cta: 'Najít talent',
    },
    lawfirm: {
      title: 'Advokátní kanceláře',
      desc: 'Spolupracujeme s předními advokátními kancelářemi při obsazování partnerů, counselů, seniorních advokátů i strategických týmových posil.',
      cta: 'Spolupracovat s námi',
    },
  },
  whyUs: {
    eyebrow: 'Proč klienti spolupracují s námi',
    headline: 'Proč si klienti vybírají B Solution',
    points: [
      { num: '01', title: 'Hluboká znalost trhu', desc: 'Silná orientace na právní trhy v Evropě a na Blízkém východě.' },
      { num: '02', title: 'Diskrétnost a důvěrnost', desc: 'Citlivá zadání řešíme s maximální mírou důvěry a profesionality.' },
      { num: '03', title: 'Prověřená síť kontaktů', desc: 'Přístup ke špičkovým právníkům, partnerům a decision-makerům.' },
      { num: '04', title: 'Dlouhodobé partnerství', desc: 'Nepomáháme pouze s jedním hirem, ale s dlouhodobým rozvojem právních týmů.' },
    ],
  },
  about: {
    eyebrow: 'O nás',
    headline: 'Důvěryhodný partner pro vyhledávání právních lídrů',
    text1: 'B Solution je specializovaná executive search společnost zaměřená výhradně na právní sektor. Již téměř dvě desetiletí budujeme dlouhodobé vztahy s korporátními právními odděleními a předními advokátními kancelářemi.',
    text2: 'Zakládáme si na diskrétnosti, znalosti trhu a kvalitě výsledků. U seniorních právních pozic nejde pouze o nábor, ale o strategické rozhodnutí, které ovlivňuje další směřování organizace.',
    cta: 'Najít talent',
  },
  services: {
    eyebrow: 'Co děláme',
    headline: 'Executive Search a poradenství',
    intro: 'Naše služby jsou určeny organizacím, které chápou hodnotu správně obsazené seniorní pozice hned napoprvé.',
    cta: 'Najít talent',
    items: [
      { num: '01', title: 'Executive Search', desc: 'Retained search pro General Counsel, Chief Legal Officer, Head of Legal a další seniorní interní právní pozice.' },
      { num: '02', title: 'Retained Legal Recruitment', desc: 'Cílené vyhledávání partnerů, counselů, seniorních advokátů a vedoucích osobností týmů pro přední advokátní kanceláře.' },
      { num: '03', title: 'Market Intelligence', desc: 'Mapování trhu, benchmarking odměňování a analýza konkurenčního prostředí.' },
      { num: '04', title: 'Strategické poradenství', desc: 'Podpora při nastavování struktury právních týmů, succession planningu a organizačního designu právních funkcí.' },
    ],
  },
  geography: {
    eyebrow: 'Naše působnost',
    headline: 'Mezinárodní dosah',
    desc: 'Z našich klíčových trhů ve střední Evropě jsme vybudovali síť kontaktů napříč důležitými právními jurisdikcemi. Díky tomu realizujeme vyhledávání napříč státy s lokální znalostí trhu.',
    regions: [
      { region: 'Střední Evropa', countries: 'Česká republika, Slovensko, Rakousko, Maďarsko, Polsko' },
      { region: 'Západní Evropa', countries: 'Německo, Spojené království, Nizozemsko' },
      { region: 'Rozvíjející se trhy', countries: 'Rumunsko, Turecko, SAE, Chorvatsko' },
    ],
  },
  candidates: {
    eyebrow: 'Pro právní profesionály',
    headline: 'Podpora dalšího kariérního kroku',
    desc: 'Spolupracujeme se zkušenými právními profesionály, kteří zvažují další kariérní posun. Náš přístup je konzultativní — věnujeme čas pochopení vašich ambicí a představujeme pouze příležitosti, které skutečně odpovídají vašemu profilu.',
    cta: 'Kontaktujte nás',
  },
  positions: {
    headline: 'Aktuální příležitosti',
    text: 'Vybrané role sdílíme vždy diskrétně a cíleně. Pokud zvažujete další kariérní krok v advokacii nebo in-house prostředí, kontaktujte nás důvěrně.',
    subtext: 'Ne všechny pozice zveřejňujeme veřejně. Řadu mandátů řešíme napřímo a neveřejně.',
    cta: 'Kontaktujte nás ohledně příležitostí',
  },
  finalCta: {
    headline: 'Hledáte právního lídra?',
    subheadline: 'Proberme vaše potřeby důvěrně.',
    ctaPrimary: 'Najít talent',
    ctaSecondary: 'Spolupracovat s námi',
    microcopy: 'Bez závazků. Plně důvěrně.',
  },
  contactForm: {
    headline: 'Nezávazně proberme vaše potřeby',
    subheadline: 'Ozvěte se nám a stručně popište, jakou právní nebo vedoucí pozici potřebujete obsadit. Odpovíme vám důvěrně.',
    nameLabel: 'Jméno a příjmení',
    namePlaceholder: 'Vaše jméno',
    companyLabel: 'Společnost',
    companyPlaceholder: 'Název společnosti',
    emailLabel: 'E-mail',
    emailPlaceholder: 'vas@email.cz',
    phoneLabel: 'Telefon',
    phonePlaceholder: '+420',
    roleLabel: 'Jakou pozici chcete obsadit?',
    rolePlaceholder: 'např. Head of Legal, General Counsel',
    messageLabel: 'Stručně popište vaše potřeby',
    messagePlaceholder: 'Řekněte nám více o pozici, kterou hledáte...',
    submit: 'Odeslat nezávaznou poptávku',
    successMessage: 'Děkujeme. Vaši zprávu jsme přijali a brzy se vám ozveme.',
    errorMessage: 'Prosím vyplňte povinná pole.',
  },
  footer: {
    tagline: 'Legal executive search a poradenství v Evropě a na Blízkém východě.',
    company: 'Společnost',
    services: 'Služby',
    connect: 'Spojení',
    privacy: 'Soukromí',
    cookies: 'Cookies',
    copyright: '© 2007–2026 B Solution. Všechna práva vyhrazena.',
    execSearch: 'Executive Search',
    address: 'Praha, Česká republika',
    phone: '+420 272 681 206',
    email: 'info@bsolution.eu',
  },
}

export function HomepageCS() {
  return (
    <>
      <HeaderCS />
      <main>
        <HeroSection />
        <TrustSection />
        <SegmentsSection />
        <WhyUsSection />
        <AboutSection />
        <ServicesSection />
        <GeographySection />
        <CandidatesSection />
        <PositionsSection />
        <FinalCtaSection />
        <ContactFormSection />
      </main>
      <FooterCS />
    </>
  )
}

function HeaderCS() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: '#sluzby', label: content.nav.services },
    { href: '#pro-klienty', label: content.nav.clients },
    { href: '#pro-kandidaty', label: content.nav.candidates },
    { href: '#pozice', label: content.nav.positions },
    { href: '#o-nas', label: content.nav.about },
  ]

  const langRoutes = [
    { code: 'en', label: 'En', href: '/' },
    { code: 'cs', label: 'Cz', href: '/cs' },
    { code: 'de', label: 'De', href: '/de' },
    { code: 'pl', label: 'Pl', href: '/pl' },
  ]

  return (
    <>
      <a
        href="#main-content"
        className="pointer-events-none fixed left-4 top-4 z-[60] -translate-y-24 opacity-0 focus-visible:pointer-events-auto focus-visible:translate-y-0 focus-visible:opacity-100 focus-visible:px-4 focus-visible:py-2 focus-visible:bg-gold focus-visible:text-navy focus-visible:text-sm focus-visible:font-medium"
      >
        Přeskočit na hlavní obsah
      </a>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-navy/98 backdrop-blur-md" : "bg-transparent"}`}>
      <div className="h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      
      <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
        <div className="flex items-center justify-between min-h-[72px] lg:min-h-[88px] py-4 lg:py-5">
          <Link href="/cs" aria-label="Domovská stránka BSolution" className="flex items-center flex-shrink-0">
            <span className="text-[14px] lg:text-[15px] font-serif text-gold tracking-[0.06em]">B Solution</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-10 xl:gap-14">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="relative text-[10px] font-normal text-white/40 hover:text-white/80 transition-colors uppercase tracking-[0.16em] py-2">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-10">
            <div className="flex items-center text-[9px] font-normal tracking-[0.16em] uppercase">
              {langRoutes.map((l, i) => (
                <span key={l.code} className="flex items-center">
                  {i > 0 && <span className="text-white/10 mx-1">/</span>}
                  <Link href={l.href} className={`px-1 py-1 transition-colors ${l.code === 'cs' ? "text-gold/90" : "text-white/30 hover:text-white/50"}`}>
                    {l.label}
                  </Link>
                </span>
              ))}
            </div>

            <a href="#kontakt-form" className="text-[9px] font-medium text-navy bg-gold/90 hover:bg-gold px-6 py-3 transition-colors uppercase tracking-[0.16em]">
              {content.nav.cta}
            </a>
          </div>

          <button className="lg:hidden p-2 text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
            {mobileMenuOpen ? <span className="text-xl">✕</span> : <span className="text-xl">☰</span>}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-navy border-t border-white/5">
          <div className="px-8 py-10">
            <nav className="space-y-1">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)} className="block py-4 text-[14px] uppercase tracking-[0.1em] text-white/70 hover:text-gold transition-colors border-b border-white/5">
                  {item.label}
                </a>
              ))}
              <a href="#kontakt-form" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-[14px] uppercase tracking-[0.1em] text-white/70 hover:text-gold transition-colors border-b border-white/5">
                {content.nav.contact}
              </a>
            </nav>
            
            <div className="flex flex-wrap items-center gap-6 pt-10">
              {[
                { code: 'en', label: 'English', href: '/' },
                { code: 'cs', label: 'Čeština', href: '/cs' },
                { code: 'de', label: 'Deutsch', href: '/de' },
                { code: 'pl', label: 'Polski', href: '/pl' },
              ].map((l) => (
                <Link key={l.code} href={l.href} className={`text-[12px] font-medium uppercase tracking-[0.12em] transition-colors ${l.code === 'cs' ? "text-gold" : "text-white/40"}`}>
                  {l.label}
                </Link>
              ))}
            </div>

            <a href="#kontakt-form" onClick={() => setMobileMenuOpen(false)} className="block mt-10 text-center text-[11px] font-semibold text-navy bg-gold px-6 py-4 uppercase tracking-[0.12em]">
              {content.nav.cta}
            </a>
          </div>
        </div>
      )}
      </header>
    </>
  )
}

function HeroSection() {
  const c = content.hero
  return (
    <section className="relative min-h-[100svh] flex flex-col overflow-hidden">
      {/* Mobile hero - simplified */}
      <div className="absolute inset-0 bg-navy md:hidden">
        {/* Logo hidden on mobile as per requirements */}
      </div>
      
      {/* Desktop hero */}
      <Image src="/images/hero-background.png" alt="" fill className="object-cover hidden md:block" style={{ objectPosition: 'center calc(50% + 40px)' }} priority sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent z-10 hidden md:block" />
      
      <div className="flex-1" />
      
      <div className="relative w-full z-20 pb-16 lg:pb-24">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
          <div className="max-w-lg">
            <h1 className="text-white font-serif text-[clamp(1.25rem,2.5vw,1.5rem)] font-normal leading-[1.3] tracking-[-0.01em]">
              {c.headline}
            </h1>
            
            <p className="mt-6 text-[16px] lg:text-[18px] text-white/80 leading-[1.75] font-light">
              {c.subheadline}
            </p>
            
            <div className="mt-5 space-y-1.5">
              <p className="text-[12px] lg:text-[13px] text-white/50 tracking-[0.02em]">{c.trustLine1}</p>
              <p className="text-[12px] lg:text-[13px] text-white/50 tracking-[0.02em]">{c.trustLine2}</p>
            </div>
            
            <div className="mt-10 lg:mt-12">
              <a href="#kontakt-form" className="inline-flex items-center justify-center px-10 py-4 bg-gold hover:bg-gold-light text-navy text-[10px] font-semibold uppercase tracking-[0.12em] transition-colors">
                {c.ctaPrimary}
                <ArrowRight className="ml-3 h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 right-8 lg:right-20 hidden lg:flex flex-col items-center gap-3 z-20">
        <span className="text-[8px] text-white/40 uppercase tracking-[0.4em]">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>
  )
}

function TrustSection() {
  const c = content.trust
  return (
    <section id="pro-klienty" className="bg-white py-24 md:py-32 lg:py-40 scroll-mt-20">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
        <div className="text-center mb-16 lg:mb-20">
          <span className="text-[10px] text-gold uppercase tracking-[0.3em] font-medium">{c.eyebrow}</span>
          <h2 className="mt-6 text-navy text-[clamp(1.75rem,3.5vw,2.5rem)] font-serif leading-[1.2]">
            {c.headline}
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {c.columns.map((col, i) => (
            <div key={i} className="text-center p-8 lg:p-10 bg-cream border border-gray-100">
              <span className="text-gold text-[12px] font-semibold tracking-[0.1em]">0{i + 1}</span>
              <h3 className="mt-4 text-navy text-[20px] lg:text-[22px] font-serif mb-4">{col.title}</h3>
              <p className="text-gray-600 text-[15px] leading-[1.75]">{col.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function SegmentsSection() {
  const c = content.segments
  return (
    <section id="sluzby" className="bg-cream py-24 md:py-32 lg:py-40 scroll-mt-20">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          {/* Corporate */}
          <div className="bg-white p-10 lg:p-14 border border-gray-100">
            <h3 className="text-navy text-[22px] lg:text-[26px] font-serif mb-6">
              {c.corporate.title}
            </h3>
            <p className="text-gray-600 text-[16px] leading-[1.8] mb-8">
              {c.corporate.desc}
            </p>
            <a href="#kontakt-form" className="inline-flex items-center text-gold hover:text-gold-light text-[12px] font-semibold uppercase tracking-[0.12em] transition-colors">
              {c.corporate.cta}
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
          
          {/* Law Firms */}
          <div className="bg-white p-10 lg:p-14 border border-gray-100">
            <h3 className="text-navy text-[22px] lg:text-[26px] font-serif mb-6">
              {c.lawfirm.title}
            </h3>
            <p className="text-gray-600 text-[16px] leading-[1.8] mb-8">
              {c.lawfirm.desc}
            </p>
            <a href="#kontakt-form" className="inline-flex items-center text-gold hover:text-gold-light text-[12px] font-semibold uppercase tracking-[0.12em] transition-colors">
              {c.lawfirm.cta}
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function WhyUsSection() {
  const c = content.whyUs
  return (
    <section id="proc-my" className="bg-navy py-24 md:py-32 lg:py-40 scroll-mt-20">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
        <div className="text-center mb-16 lg:mb-20">
          <span className="text-[10px] text-gold uppercase tracking-[0.3em] font-medium">{c.eyebrow}</span>
          <h2 className="mt-6 text-white text-[clamp(1.75rem,3.5vw,2.5rem)] font-serif leading-[1.2]">
            {c.headline}
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {c.points.map((point) => (
            <div key={point.num} className="text-center lg:text-left">
              <span className="text-gold text-[12px] font-semibold tracking-[0.1em]">{point.num}</span>
              <h4 className="mt-4 text-white text-[18px] font-serif mb-3">{point.title}</h4>
              <p className="text-white/50 text-[14px] leading-[1.75]">{point.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function AboutSection() {
  const c = content.about
  return (
    <section id="o-nas" className="bg-white py-24 md:py-32 lg:py-40 scroll-mt-20">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
        <div className="max-w-3xl">
          <span className="text-[10px] text-gold uppercase tracking-[0.3em] font-medium">{c.eyebrow}</span>
          <h2 className="mt-6 text-navy text-[clamp(1.75rem,3.5vw,2.5rem)] font-serif leading-[1.2] mb-10">
            {c.headline}
          </h2>
          
          <p className="text-gray-600 text-[17px] lg:text-[18px] leading-[1.85] mb-6">
            {c.text1}
          </p>
          <p className="text-gray-600 text-[17px] lg:text-[18px] leading-[1.85] mb-10">
            {c.text2}
          </p>
          
          <a href="#kontakt-form" className="inline-flex items-center text-gold hover:text-gold-light text-[12px] font-semibold uppercase tracking-[0.12em] transition-colors">
            {c.cta}
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  )
}

function ServicesSection() {
  const c = content.services
  return (
    <section id="sluzby-detail" className="bg-cream py-24 md:py-32 lg:py-40 scroll-mt-20">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
        <div className="mb-16 lg:mb-20">
          <span className="text-[10px] text-gold uppercase tracking-[0.3em] font-medium">{c.eyebrow}</span>
          <h2 className="mt-6 text-navy text-[clamp(1.75rem,3.5vw,2.5rem)] font-serif leading-[1.2] mb-6">
            {c.headline}
          </h2>
          <p className="text-gray-600 text-[17px] lg:text-[18px] leading-[1.85] max-w-2xl mb-8">
            {c.intro}
          </p>
          <a href="#kontakt-form" className="inline-flex items-center text-gold hover:text-gold-light text-[12px] font-semibold uppercase tracking-[0.12em] transition-colors">
            {c.cta}
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
          {c.items.map((item) => (
            <div key={item.num} className="bg-white p-8 lg:p-10 border border-gray-100">
              <span className="text-gold text-[12px] font-semibold tracking-[0.1em]">{item.num}</span>
              <h4 className="mt-4 text-navy text-[20px] font-serif mb-4">{item.title}</h4>
              <p className="text-gray-600 text-[15px] leading-[1.75]">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function GeographySection() {
  const c = content.geography
  return (
    <section id="mezinarodni-presah" className="bg-navy py-24 md:py-32 lg:py-40 scroll-mt-20">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
        <div className="mb-16 lg:mb-20">
          <span className="text-[10px] text-gold uppercase tracking-[0.3em] font-medium">{c.eyebrow}</span>
          <h2 className="mt-6 text-white text-[clamp(1.75rem,3.5vw,2.5rem)] font-serif leading-[1.2] mb-6">
            {c.headline}
          </h2>
          <p className="text-white/60 text-[17px] lg:text-[18px] leading-[1.85] max-w-2xl">
            {c.desc}
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {c.regions.map((r, i) => (
            <div key={i} className="border-t border-gold/20 pt-8">
              <h4 className="text-gold text-[14px] font-semibold uppercase tracking-[0.1em] mb-4">{r.region}</h4>
              <p className="text-white/70 text-[15px] leading-[1.75]">{r.countries}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CandidatesSection() {
  const c = content.candidates
  return (
    <section id="pro-kandidaty" className="bg-white py-24 md:py-32 lg:py-40 scroll-mt-20">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
        <div className="max-w-3xl">
          <span className="text-[10px] text-gold uppercase tracking-[0.3em] font-medium">{c.eyebrow}</span>
          <h2 className="mt-6 text-navy text-[clamp(1.75rem,3.5vw,2.5rem)] font-serif leading-[1.2] mb-10">
            {c.headline}
          </h2>
          
          <p className="text-gray-600 text-[17px] lg:text-[18px] leading-[1.85] mb-10">
            {c.desc}
          </p>
          
          <a href="#kontakt-form" className="inline-flex items-center text-gold hover:text-gold-light text-[12px] font-semibold uppercase tracking-[0.12em] transition-colors">
            {c.cta}
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  )
}

function PositionsSection() {
  const c = content.positions
  return (
    <section id="pozice" className="bg-cream py-24 md:py-32 lg:py-40 scroll-mt-20">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-10">
            <div className="w-16 h-px bg-gold/40" />
          </div>
          
          <h2 className="text-navy text-[clamp(1.75rem,3.5vw,2.5rem)] font-serif leading-[1.2] mb-6">
            {c.headline}
          </h2>
          
          <p className="text-gray-600 text-[17px] lg:text-[18px] leading-[1.85] mb-4">
            {c.text}
          </p>
          <p className="text-gray-500 text-[15px] leading-[1.75] mb-10">
            {c.subtext}
          </p>
          
          <a href="#kontakt-form" className="inline-flex items-center justify-center px-10 py-4 bg-gold hover:bg-gold-light text-navy text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors">
            {c.cta}
            <ArrowRight className="ml-3 h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  )
}

function FinalCtaSection() {
  const c = content.finalCta
  return (
    <section className="bg-white py-24 md:py-32 lg:py-40">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex justify-center mb-10">
            <div className="w-16 h-px bg-gold/40" />
          </div>
          
          <h2 className="text-navy text-[clamp(2rem,4vw,3rem)] font-serif leading-[1.15]">
            {c.headline}
          </h2>
          <p className="mt-6 text-gray-600 text-[18px] leading-[1.85]">
            {c.subheadline}
          </p>
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#kontakt-form" className="inline-flex items-center justify-center px-12 py-4 bg-gold hover:bg-gold-light text-navy text-[12px] font-semibold uppercase tracking-[0.12em] transition-colors">
              {c.ctaPrimary}
              <ArrowRight className="ml-3 h-4 w-4" />
            </a>
            <a href="#kontakt-form" className="inline-flex items-center justify-center px-12 py-4 border border-navy/20 text-navy hover:border-navy/40 text-[12px] font-semibold uppercase tracking-[0.12em] transition-colors">
              {c.ctaSecondary}
            </a>
          </div>
          <p className="mt-6 text-gray-400 text-[13px]">{c.microcopy}</p>
        </div>
      </div>
    </section>
  )
}

function ContactFormSection() {
  const c = content.contactForm
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    role: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorFields, setErrorFields] = useState<string[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const required = ['name', 'email', 'role']
    const missing = required.filter(field => !formData[field as keyof typeof formData].trim())
    
    if (missing.length > 0) {
      setErrorFields(missing)
      setStatus('error')
      return
    }
    
    setStatus('success')
    setErrorFields([])
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errorFields.includes(name)) {
      setErrorFields(prev => prev.filter(f => f !== name))
    }
    if (status === 'error' && errorFields.length <= 1) {
      setStatus('idle')
    }
  }

  return (
    <section id="kontakt-form" className="bg-navy py-24 md:py-32 lg:py-40 scroll-mt-20">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-center mb-10">
            <div className="w-16 h-px bg-gold/40" />
          </div>
          
          <div className="text-center mb-12">
            <h2 className="text-white text-[clamp(1.75rem,3.5vw,2.5rem)] font-serif leading-[1.2] mb-6">
              {c.headline}
            </h2>
            <p className="text-white/60 text-[17px] lg:text-[18px] leading-[1.75]">
              {c.subheadline}
            </p>
          </div>
          
          {status === 'success' ? (
            <div className="bg-gold/10 border border-gold/30 p-8 text-center">
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center bg-gold/20 rounded-full">
                <Check className="h-6 w-6 text-gold" />
              </div>
              <p className="text-white text-[18px] font-medium">{c.successMessage}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {status === 'error' && (
                <div className="bg-red-500/10 border border-red-500/30 p-4 text-center">
                  <p className="text-red-400 text-[14px]">{c.errorMessage}</p>
                </div>
              )}
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-white/70 text-[12px] uppercase tracking-[0.1em] mb-2">
                    {c.nameLabel} <span className="text-gold">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={c.namePlaceholder}
                    className={`w-full bg-white/5 border ${errorFields.includes('name') ? 'border-red-500' : 'border-white/10'} text-white px-4 py-3 text-[15px] placeholder:text-white/30 focus:outline-none focus:border-gold/50 transition-colors`}
                  />
                </div>
                
                <div>
                  <label htmlFor="company" className="block text-white/70 text-[12px] uppercase tracking-[0.1em] mb-2">
                    {c.companyLabel}
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder={c.companyPlaceholder}
                    className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 text-[15px] placeholder:text-white/30 focus:outline-none focus:border-gold/50 transition-colors"
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-white/70 text-[12px] uppercase tracking-[0.1em] mb-2">
                    {c.emailLabel} <span className="text-gold">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={c.emailPlaceholder}
                    className={`w-full bg-white/5 border ${errorFields.includes('email') ? 'border-red-500' : 'border-white/10'} text-white px-4 py-3 text-[15px] placeholder:text-white/30 focus:outline-none focus:border-gold/50 transition-colors`}
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-white/70 text-[12px] uppercase tracking-[0.1em] mb-2">
                    {c.phoneLabel}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={c.phonePlaceholder}
                    className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 text-[15px] placeholder:text-white/30 focus:outline-none focus:border-gold/50 transition-colors"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="role" className="block text-white/70 text-[12px] uppercase tracking-[0.1em] mb-2">
                  {c.roleLabel} <span className="text-gold">*</span>
                </label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  placeholder={c.rolePlaceholder}
                  className={`w-full bg-white/5 border ${errorFields.includes('role') ? 'border-red-500' : 'border-white/10'} text-white px-4 py-3 text-[15px] placeholder:text-white/30 focus:outline-none focus:border-gold/50 transition-colors`}
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-white/70 text-[12px] uppercase tracking-[0.1em] mb-2">
                  {c.messageLabel}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={c.messagePlaceholder}
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 text-[15px] placeholder:text-white/30 focus:outline-none focus:border-gold/50 transition-colors resize-none"
                />
              </div>
              
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full md:w-auto inline-flex items-center justify-center px-12 py-4 bg-gold hover:bg-gold-light text-navy text-[12px] font-semibold uppercase tracking-[0.12em] transition-colors"
                >
                  {c.submit}
                  <ArrowRight className="ml-3 h-4 w-4" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

function FooterCS() {
  const f = content.footer
  const n = content.nav
  
  return (
    <footer className="bg-navy-dark pt-20 pb-10">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
        {/* Language switcher */}
        <div className="flex items-center gap-4 mb-16">
          <Link href="/" className="text-[12px] text-white/40 hover:text-white/70 transition-colors">English</Link>
          <span className="text-white/20">/</span>
          <span className="text-[12px] text-gold">Čeština</span>
        </div>
        
        <div className="grid md:grid-cols-4 gap-12 lg:gap-16 mb-16">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/cs" className="text-[18px] font-serif text-gold tracking-[0.04em]">B Solution</Link>
            <p className="mt-6 text-white/40 text-[14px] leading-[1.8]">{f.tagline}</p>
          </div>
          
          {/* Company */}
          <div>
            <h4 className="text-[11px] text-white/60 uppercase tracking-[0.16em] font-medium mb-6">{f.company}</h4>
            <nav className="space-y-3">
              <a href="#o-nas" className="block text-white/40 hover:text-white/70 text-[14px] transition-colors">{n.about}</a>
              <a href="#sluzby-detail" className="block text-white/40 hover:text-white/70 text-[14px] transition-colors">{n.services}</a>
              <a href="#pozice" className="block text-white/40 hover:text-white/70 text-[14px] transition-colors">{n.positions}</a>
              <a href="#kontakt-form" className="block text-white/40 hover:text-white/70 text-[14px] transition-colors">{n.contact}</a>
            </nav>
          </div>
          
          {/* Services */}
          <div>
            <h4 className="text-[11px] text-white/60 uppercase tracking-[0.16em] font-medium mb-6">{f.services}</h4>
            <nav className="space-y-3">
              <a href="#pro-klienty" className="block text-white/40 hover:text-white/70 text-[14px] transition-colors">{n.clients}</a>
              <a href="#pro-kandidaty" className="block text-white/40 hover:text-white/70 text-[14px] transition-colors">{n.candidates}</a>
              <a href="#sluzby-detail" className="block text-white/40 hover:text-white/70 text-[14px] transition-colors">{f.execSearch}</a>
            </nav>
          </div>
          
          {/* Connect */}
          <div>
            <h4 className="text-[11px] text-white/60 uppercase tracking-[0.16em] font-medium mb-6">{f.connect}</h4>
            <address className="not-italic space-y-3 text-white/40 text-[14px]">
              <p>B Solution s.r.o.</p>
              <p>{f.address}</p>
              <p>{f.phone}</p>
              <a href={`mailto:${f.email}`} className="block hover:text-white/70 transition-colors">{f.email}</a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="block hover:text-white/70 transition-colors">LinkedIn</a>
            </address>
          </div>
        </div>
        
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-[12px]">{f.copyright}</p>
          <div className="flex items-center gap-8">
            <Link href="/cs/privacy" className="text-white/30 hover:text-white/50 text-[12px] transition-colors">{f.privacy}</Link>
            <Link href="/cs/cookies" className="text-white/30 hover:text-white/50 text-[12px] transition-colors">{f.cookies}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
