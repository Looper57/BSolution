"use client"

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Check } from 'lucide-react'
import { useState, useEffect } from 'react'
import { AuthorityProof } from '@/components/authority-proof'

// Complete German content matching English homepage structure
const content = {
  nav: {
    services: 'Leistungen',
    clients: 'Für Unternehmen',
    candidates: 'Für Kandidaten',
    positions: 'Positionen',
    about: 'Über uns',
    contact: 'Kontakt',
    cta: 'Kontakt aufnehmen',
  },
  hero: {
    headline: 'Boutique Legal Executive Search für Anwaltskanzleien und Rechtsabteilungen',
    subheadline: 'Wir identifizieren juristische Fach- und Führungskräfte sowie Compliance-Experten durch fundierte Marktkenntnis, diskrete Direktansprache und internationale Reichweite in Europa und im Nahen Osten.',
    trustLine1: 'Seit 2007 vertrauen uns Unternehmensjuristen und führende Kanzleien in ganz Europa.',
    trustLine2: 'Jede Suche führen wir gründlich, diskret und auf das jeweilige Mandat zugeschnitten durch.',
    ctaPrimary: 'Bedarf vertraulich besprechen',
  },
  trust: {
    eyebrow: 'Vertrauen',
    headline: 'Vertrauen führender juristischer Entscheidungsträger',
    columns: [
      { title: 'Seit 2007', desc: 'Erfahrung in europäischen und internationalen Rechtsmärkten' },
      { title: 'Internationale Besetzungen', desc: 'General Counsel, Head of Legal und Legal Director' },
      { title: 'Diskrete Suche', desc: 'Vertrauliche Mandate für strategische Positionen' },
    ],
  },
  segments: {
    headline: 'Unsere Mandanten',
    corporate: {
      title: 'Für Unternehmen',
      desc: 'Wir unterstützen Unternehmen bei der Besetzung seniorer juristischer Positionen wie General Counsel oder Head of Legal.',
      cta: 'Kontakt aufnehmen',
    },
    lawfirm: {
      title: 'Für Kanzleien',
      desc: 'Wir arbeiten mit führenden Kanzleien bei Partner- und Team-Mandaten.',
      cta: 'Zusammenarbeiten',
    },
  },
  whyUs: {
    eyebrow: 'Warum wir',
    headline: 'Warum sich Mandanten für uns entscheiden',
    points: [
      { num: '01', title: 'Tiefgehende Marktkenntnis', desc: 'Starke Präsenz auf europäischen und internationalen Rechtsmärkten.' },
      { num: '02', title: 'Höchste Vertraulichkeit', desc: 'Sensible Mandate behandeln wir mit absolutem Vertrauen.' },
      { num: '03', title: 'Exklusives Netzwerk', desc: 'Zugang zu erstklassigen Juristen und Entscheidungsträgern.' },
      { num: '04', title: 'Langfristige Zusammenarbeit', desc: 'Wir begleiten unsere Mandanten über einzelne Besetzungen hinaus.' },
    ],
  },
  about: {
    eyebrow: 'Über uns',
    headline: 'Ihr Partner für juristische Führungskräfte',
    text1: 'B Solution ist auf Executive Search im juristischen Bereich spezialisiert. Seit fast zwei Jahrzehnten unterstützen wir Unternehmen und Kanzleien bei der Besetzung strategischer Positionen.',
    text2: 'Wir setzen auf Qualität statt Quantität und nehmen nur Mandate an, bei denen wir echten Mehrwert schaffen können. Bei Senior-Positionen geht es nicht nur um Rekrutierung — es geht um strategische Entscheidungen für die Zukunft Ihrer Organisation.',
    cta: 'Kontakt aufnehmen',
  },
  services: {
    eyebrow: 'Leistungen',
    headline: 'Unsere Leistungen',
    intro: 'Unsere Leistungen richten sich an Organisationen, die den Wert einer erfolgreichen Besetzung auf Führungsebene gleich beim ersten Mal verstehen.',
    cta: 'Kontakt aufnehmen',
    items: [
      { num: '01', title: 'Executive Search', desc: 'Retained Search für General Counsel, Chief Legal Officer, Head of Legal und weitere leitende Inhouse-Positionen.' },
      { num: '02', title: 'Legal Recruitment', desc: 'Gezielte Suche nach Partnern, Counsels, Senior Associates und Praxisgruppenleitern.' },
      { num: '03', title: 'Marktanalysen', desc: 'Talent Mapping, Vergütungsbenchmarking und Wettbewerbsanalyse.' },
      { num: '04', title: 'Strategische Beratung', desc: 'Beratung zu Teamstruktur, Nachfolgeplanung und Organisationsdesign.' },
    ],
  },
  geography: {
    eyebrow: 'Reichweite',
    headline: 'Internationale Präsenz',
    desc: 'Wir sind in ganz Europa und darüber hinaus tätig und verfügen über ein starkes Netzwerk in relevanten Märkten.',
    regions: [
      { region: 'Mitteleuropa', countries: 'Tschechien, Slowakei, Österreich, Ungarn, Polen' },
      { region: 'Westeuropa', countries: 'Deutschland, Vereinigtes Königreich, Niederlande' },
      { region: 'Wachstumsmärkte', countries: 'Rumänien, Türkei, VAE, Kroatien' },
    ],
  },
  candidates: {
    eyebrow: 'Für Juristen',
    headline: 'Karriereentwicklung',
    desc: 'Wir begleiten erfahrene Juristen bei ihrem nächsten Karriereschritt. Unser Ansatz ist beratend — wir nehmen uns Zeit, Ihre Ziele zu verstehen und präsentieren nur Positionen, die wirklich zu Ihrem Profil passen.',
    cta: 'Kontaktieren Sie uns',
  },
  positions: {
    headline: 'Aktuelle Positionen',
    text: 'Viele Mandate werden diskret und nicht öffentlich besetzt. Kontaktieren Sie uns vertraulich.',
    subtext: 'Nicht alle Positionen werden öffentlich ausgeschrieben. Viele Mandate bearbeiten wir direkt und vertraulich.',
    cta: 'Kontaktieren Sie uns',
  },
  finalCta: {
    headline: 'Suchen Sie eine juristische Führungskraft?',
    subheadline: 'Lassen Sie uns Ihren Bedarf vertraulich besprechen.',
    ctaPrimary: 'Bedarf vertraulich besprechen',
    ctaSecondary: 'Unsere Leistungen entdecken',
    microcopy: 'Unverbindlich. Vollständig vertraulich.',
  },
  contactForm: {
    headline: 'Kontaktieren Sie uns vertraulich',
    subheadline: 'Beschreiben Sie kurz, welche juristische oder Führungsposition Sie besetzen möchten. Wir melden uns vertraulich bei Ihnen.',
    nameLabel: 'Name',
    namePlaceholder: 'Ihr Name',
    companyLabel: 'Unternehmen',
    companyPlaceholder: 'Firmenname',
    emailLabel: 'E-Mail',
    emailPlaceholder: 'ihre@email.de',
    phoneLabel: 'Telefon',
    phonePlaceholder: '+49',
    roleLabel: 'Position',
    rolePlaceholder: 'z.B. Head of Legal, General Counsel',
    messageLabel: 'Nachricht',
    messagePlaceholder: 'Erzählen Sie uns mehr über die Position, die Sie besetzen möchten...',
    submit: 'Unverbindliche Anfrage senden',
    successMessage: 'Vielen Dank. Wir melden uns zeitnah bei Ihnen.',
    errorMessage: 'Bitte füllen Sie alle Pflichtfelder aus.',
  },
  footer: {
    tagline: 'Legal Executive Search und Beratung in Europa und dem Nahen Osten.',
    company: 'Unternehmen',
    services: 'Leistungen',
    connect: 'Kontakt',
    privacy: 'Datenschutz',
    cookies: 'Cookies',
    copyright: '© 2007–2026 B Solution. Alle Rechte vorbehalten.',
    execSearch: 'Executive Search',
    address: 'Prag, Tschechien',
    phone: '+420 272 681 206',
    email: 'info@bsolution.eu',
    sisterPlatformPrefix: 'Benötigen Sie Hilfe bei einer konkreten persönlichen Rechtsangelegenheit (Scheidung, Erbschaft, Arbeitsrechtsstreit)? Unsere Schwesterplattform',
    sisterPlatformSuffix: 'verbindet Sie mit einem geprüften Anwalt in Tschechien und im Ausland.',
  },
}

export function HomepageDE() {
  return (
    <>
      <HeaderDE />
      <main>
        <HeroSection />
        <TrustSection />
        <SegmentsSection />
        <AuthorityProof locale="de" />
        <WhyUsSection />
        <AboutSection />
        <ServicesSection />
        <GeographySection />
        <CandidatesSection />
        <PositionsSection />
        <FinalCtaSection />
        <ContactFormSection />
      </main>
      <FooterDE />
    </>
  )
}

function HeaderDE() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: '#leistungen', label: content.nav.services },
    { href: '#fuer-unternehmen', label: content.nav.clients },
    { href: '#fuer-kandidaten', label: content.nav.candidates },
    { href: '#positionen', label: content.nav.positions },
    { href: '#ueber-uns', label: content.nav.about },
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
        Zum Hauptinhalt springen
      </a>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-navy/98 backdrop-blur-md" : "bg-transparent"}`}>
      <div className="h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      
      <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
        <div className="flex items-center justify-between min-h-[72px] lg:min-h-[88px] py-4 lg:py-5">
          <Link href="/de" aria-label="BSolution Startseite" className="flex items-center flex-shrink-0">
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
                  <Link href={l.href} className={`px-1 py-1 transition-colors ${l.code === 'de' ? "text-gold/90" : "text-white/30 hover:text-white/50"}`}>
                    {l.label}
                  </Link>
                </span>
              ))}
            </div>

            <a href="#kontakt-form" className="text-[9px] font-medium text-navy bg-gold/90 hover:bg-gold px-6 py-3 transition-colors uppercase tracking-[0.16em]">
              {content.nav.cta}
            </a>
          </div>

          <button className="lg:hidden p-2 text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Menü öffnen">
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
                <Link key={l.code} href={l.href} className={`text-[12px] font-medium uppercase tracking-[0.12em] transition-colors ${l.code === 'de' ? "text-gold" : "text-white/40"}`}>
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
    <section className="relative min-h-[100svh] pt-[73px] lg:pt-[89px] flex flex-col overflow-hidden">
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
          <div className="max-w-lg translate-y-[60px]">
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
        <span className="text-[8px] text-white/40 uppercase tracking-[0.4em]">Scrollen</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>
  )
}

function TrustSection() {
  const c = content.trust
  return (
    <section id="fuer-unternehmen" className="bg-white py-24 md:py-32 lg:py-40 scroll-mt-20">
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
    <section id="leistungen" className="bg-cream py-24 md:py-32 lg:py-40 scroll-mt-20">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
        <div className="text-center mb-16 lg:mb-20">
          <h2 className="text-navy text-[clamp(1.75rem,3.5vw,2.5rem)] font-serif leading-[1.2]">
            {c.headline}
          </h2>
        </div>
        
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
    <section id="warum-wir" className="bg-navy py-24 md:py-32 lg:py-40 scroll-mt-20">
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
    <section id="ueber-uns" className="bg-white py-24 md:py-32 lg:py-40 scroll-mt-20">
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
    <section id="leistungen-detail" className="bg-cream py-24 md:py-32 lg:py-40 scroll-mt-20">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
        <div className="mb-16 lg:mb-20">
          <span className="text-[10px] text-gold uppercase tracking-[0.3em] font-medium">{c.eyebrow}</span>
          <h2 className="mt-6 text-navy text-[clamp(1.75rem,3.5vw,2.5rem)] font-serif leading-[1.2] mb-6">
            {c.headline}
          </h2>
          <p className="text-gray-600 text-[17px] lg:text-[18px] leading-[1.85] max-w-2xl">
            {c.intro}
          </p>
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
        
        <div className="mt-12">
          <a href="#kontakt-form" className="inline-flex items-center text-gold hover:text-gold-light text-[12px] font-semibold uppercase tracking-[0.12em] transition-colors">
            {c.cta}
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  )
}

function GeographySection() {
  const c = content.geography
  return (
    <section id="internationale-praesenz" className="bg-navy py-24 md:py-32 lg:py-40 scroll-mt-20">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
        <div className="max-w-3xl mb-16 lg:mb-20">
          <span className="text-[10px] text-gold uppercase tracking-[0.3em] font-medium">{c.eyebrow}</span>
          <h2 className="mt-6 text-white text-[clamp(1.75rem,3.5vw,2.5rem)] font-serif leading-[1.2] mb-6">
            {c.headline}
          </h2>
          <p className="text-white/60 text-[17px] lg:text-[18px] leading-[1.85]">
            {c.desc}
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {c.regions.map((r, i) => (
            <div key={i} className="border-t border-white/10 pt-8">
              <h4 className="text-gold text-[14px] font-semibold uppercase tracking-[0.1em] mb-4">{r.region}</h4>
              <p className="text-white/50 text-[15px] leading-[1.75]">{r.countries}</p>
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
    <section id="fuer-kandidaten" className="bg-white py-24 md:py-32 lg:py-40 scroll-mt-20">
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
    <section id="positionen" className="bg-cream py-24 md:py-32 lg:py-40 scroll-mt-20">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
        <div className="max-w-3xl mx-auto text-center">
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
    <section className="bg-navy py-24 md:py-32 lg:py-40">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex justify-center mb-10">
            <div className="w-16 h-px bg-gold/40" />
          </div>
          
          <h2 className="text-white text-[clamp(1.75rem,3.5vw,2.5rem)] font-serif leading-[1.2] mb-6">
            {c.headline}
          </h2>
          <p className="text-white/60 text-[17px] lg:text-[18px] leading-[1.85] mb-4">
            {c.subheadline}
          </p>
          <p className="text-white/40 text-[13px] tracking-[0.05em] mb-10">
            {c.microcopy}
          </p>
          
          <a href="#kontakt-form" className="inline-flex items-center justify-center px-12 py-4 bg-gold hover:bg-gold-light text-navy text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors">
            {c.ctaPrimary}
            <ArrowRight className="ml-3 h-4 w-4" />
          </a>
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
    <section id="kontakt-form" className="bg-white py-24 md:py-32 lg:py-40 scroll-mt-20">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-center mb-10">
            <div className="w-16 h-px bg-gold/40" />
          </div>
          
          <div className="text-center mb-12">
            <h2 className="text-navy text-[clamp(1.75rem,3.5vw,2.5rem)] font-serif leading-[1.2] mb-6">
              {c.headline}
            </h2>
            <p className="text-gray-600 text-[17px] lg:text-[18px] leading-[1.75]">
              {c.subheadline}
            </p>
          </div>
          
          {status === 'success' ? (
            <div className="bg-gold/10 border border-gold/30 p-8 text-center">
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center bg-gold/20 rounded-full">
                <Check className="h-6 w-6 text-gold" />
              </div>
              <p className="text-navy text-[18px] font-medium">{c.successMessage}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {status === 'error' && (
                <div className="bg-red-50 border border-red-200 p-4 text-center">
                  <p className="text-red-600 text-[14px]">{c.errorMessage}</p>
                </div>
              )}
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-navy/70 text-[12px] uppercase tracking-[0.1em] mb-2">
                    {c.nameLabel} <span className="text-gold">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={c.namePlaceholder}
                    className={`w-full bg-cream border ${errorFields.includes('name') ? 'border-red-500' : 'border-gray-200'} text-navy px-4 py-3 text-[15px] placeholder:text-gray-400 focus:outline-none focus:border-gold/50 transition-colors`}
                  />
                </div>
                
                <div>
                  <label htmlFor="company" className="block text-navy/70 text-[12px] uppercase tracking-[0.1em] mb-2">
                    {c.companyLabel}
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder={c.companyPlaceholder}
                    className="w-full bg-cream border border-gray-200 text-navy px-4 py-3 text-[15px] placeholder:text-gray-400 focus:outline-none focus:border-gold/50 transition-colors"
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-navy/70 text-[12px] uppercase tracking-[0.1em] mb-2">
                    {c.emailLabel} <span className="text-gold">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={c.emailPlaceholder}
                    className={`w-full bg-cream border ${errorFields.includes('email') ? 'border-red-500' : 'border-gray-200'} text-navy px-4 py-3 text-[15px] placeholder:text-gray-400 focus:outline-none focus:border-gold/50 transition-colors`}
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-navy/70 text-[12px] uppercase tracking-[0.1em] mb-2">
                    {c.phoneLabel}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={c.phonePlaceholder}
                    className="w-full bg-cream border border-gray-200 text-navy px-4 py-3 text-[15px] placeholder:text-gray-400 focus:outline-none focus:border-gold/50 transition-colors"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="role" className="block text-navy/70 text-[12px] uppercase tracking-[0.1em] mb-2">
                  {c.roleLabel} <span className="text-gold">*</span>
                </label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  placeholder={c.rolePlaceholder}
                  className={`w-full bg-cream border ${errorFields.includes('role') ? 'border-red-500' : 'border-gray-200'} text-navy px-4 py-3 text-[15px] placeholder:text-gray-400 focus:outline-none focus:border-gold/50 transition-colors`}
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-navy/70 text-[12px] uppercase tracking-[0.1em] mb-2">
                  {c.messageLabel}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={c.messagePlaceholder}
                  rows={4}
                  className="w-full bg-cream border border-gray-200 text-navy px-4 py-3 text-[15px] placeholder:text-gray-400 focus:outline-none focus:border-gold/50 transition-colors resize-none"
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

function FooterDE() {
  const f = content.footer
  return (
    <footer className="bg-navy border-t border-white/5">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-20 py-20 lg:py-24">
        <div className="grid lg:grid-cols-4 gap-12 lg:gap-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/de" className="text-[18px] font-serif text-gold tracking-[0.04em]">B Solution</Link>
            <p className="mt-6 text-white/40 text-[14px] leading-[1.85]">{f.tagline}</p>

            {/* Cross-referral to LawBridge.eu (2026-08-01) — same founder's
                platform matching individuals with a verified lawyer for a
                personal legal situation, disclosed as a sister platform. */}
            <p className="mt-5 text-white/25 text-[13px] leading-[1.85]">
              {f.sisterPlatformPrefix}{' '}
              <a
                href="https://www.lawbridge.eu"
                target="_blank"
                rel="noopener"
                className="font-medium text-gold/60 hover:text-gold transition-colors"
              >
                LawBridge.eu
              </a>{' '}
              {f.sisterPlatformSuffix}
            </p>
          </div>
          
          {/* Company */}
          <div>
            <h4 className="text-white/80 text-[11px] font-semibold uppercase tracking-[0.15em] mb-6">{f.company}</h4>
            <nav className="space-y-3">
              <a href="#ueber-uns" className="block text-white/40 hover:text-white/70 text-[14px] transition-colors">{content.nav.about}</a>
              <a href="#leistungen" className="block text-white/40 hover:text-white/70 text-[14px] transition-colors">{content.nav.services}</a>
              <a href="#kontakt-form" className="block text-white/40 hover:text-white/70 text-[14px] transition-colors">{content.nav.contact}</a>
            </nav>
          </div>
          
          {/* Services */}
          <div>
            <h4 className="text-white/80 text-[11px] font-semibold uppercase tracking-[0.15em] mb-6">{f.services}</h4>
            <nav className="space-y-3">
              <a href="#leistungen-detail" className="block text-white/40 hover:text-white/70 text-[14px] transition-colors">{f.execSearch}</a>
              <a href="#fuer-unternehmen" className="block text-white/40 hover:text-white/70 text-[14px] transition-colors">{content.nav.clients}</a>
              <a href="#fuer-kandidaten" className="block text-white/40 hover:text-white/70 text-[14px] transition-colors">{content.nav.candidates}</a>
            </nav>
          </div>
          
          {/* Connect */}
          <div>
            <h4 className="text-white/80 text-[11px] font-semibold uppercase tracking-[0.15em] mb-6">{f.connect}</h4>
            <div className="space-y-3 text-white/40 text-[14px]">
              <p>{f.address}</p>
              <p>{f.phone}</p>
              <a href={`mailto:${f.email}`} className="block hover:text-white/70 transition-colors">{f.email}</a>
            </div>
          </div>
        </div>
        
        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-[12px]">{f.copyright}</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-white/30 hover:text-white/50 text-[12px] transition-colors">{f.privacy}</Link>
            <Link href="/cookies" className="text-white/30 hover:text-white/50 text-[12px] transition-colors">{f.cookies}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
