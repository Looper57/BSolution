"use client"

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Check } from 'lucide-react'
import { useState, useEffect } from 'react'

// Complete Polish content matching homepage structure
const content = {
  nav: {
    services: 'Usługi',
    clients: 'Dla firm',
    candidates: 'Dla kandydatów',
    positions: 'Oferty',
    about: 'O nas',
    contact: 'Kontakt',
    cta: 'Kontakt',
  },
  hero: {
    headline: 'Executive Search dla liderów prawnych',
    subheadline: 'Uniknij kosztownych błędów rekrutacyjnych, które spowalniają rozwój Twojej firmy. Dostarczamy sprawdzonych liderów prawnych do wymagających środowisk międzynarodowych.',
    trustLine1: 'Od 2007 roku zaufały nam działy prawne firm oraz wiodące kancelarie w całej Europie.',
    trustLine2: 'Każde poszukiwanie prowadzimy rzetelnie, dyskretnie i zgodnie ze specyfiką mandatu.',
    ctaPrimary: 'Omów swoje potrzeby (poufnie)',
  },
  trust: {
    eyebrow: 'Zaufanie',
    headline: 'Zaufanie liderów prawnych w całej Europie',
    columns: [
      { title: 'Ponad 17 lat doświadczenia', desc: 'Doświadczenie na rynkach europejskich i międzynarodowych' },
      { title: 'Międzynarodowe rekrutacje', desc: 'General Counsel, Head of Legal i Legal Director' },
      { title: 'Dyskretne procesy', desc: 'Poufne projekty dla kluczowych stanowisk' },
    ],
  },
  segments: {
    headline: 'Z kim współpracujemy',
    corporate: {
      title: 'Dla firm',
      desc: 'Wspieramy firmy w zatrudnianiu seniornych liderów prawnych, w tym General Counsel i Head of Legal.',
      cta: 'Skontaktuj się',
    },
    lawfirm: {
      title: 'Dla kancelarii',
      desc: 'Współpracujemy z wiodącymi kancelariami przy rekrutacji partnerów i zespołów.',
      cta: 'Współpracuj z nami',
    },
  },
  whyUs: {
    eyebrow: 'Dlaczego my',
    headline: 'Dlaczego klienci wybierają B Solution',
    points: [
      { num: '01', title: 'Głęboka znajomość rynku', desc: 'Silna obecność na europejskich i międzynarodowych rynkach prawnych.' },
      { num: '02', title: 'Pełna poufność', desc: 'Wrażliwe projekty realizujemy z najwyższym poziomem zaufania.' },
      { num: '03', title: 'Dostęp do najlepszych kandydatów', desc: 'Kontakt z czołowymi prawnikami i decydentami.' },
      { num: '04', title: 'Długoterminowe partnerstwo', desc: 'Wspieramy klientów również po zakończeniu pojedynczej rekrutacji.' },
    ],
  },
  about: {
    eyebrow: 'O nas',
    headline: 'Zaufany partner w rekrutacji liderów prawnych',
    text1: 'B Solution specjalizuje się w executive search w sektorze prawnym. Od prawie dwóch dekad wspieramy firmy i kancelarie w obsadzaniu kluczowych stanowisk.',
    text2: 'Stawiamy na jakość, nie ilość i przyjmujemy tylko projekty, w których możemy przynieść realną wartość. Rekrutacja na poziomie senior to nie tylko zatrudnianie — to strategiczne decyzje kształtujące przyszłość organizacji.',
    cta: 'Skontaktuj się',
  },
  services: {
    eyebrow: 'Usługi',
    headline: 'Nasze usługi',
    intro: 'Nasze usługi kierujemy do organizacji, które rozumieją wartość trafnej rekrutacji na poziomie senior za pierwszym razem.',
    cta: 'Skontaktuj się',
    items: [
      { num: '01', title: 'Executive Search', desc: 'Retained search na pozycje General Counsel, Chief Legal Officer, Head of Legal i seniornych prawników in-house.' },
      { num: '02', title: 'Rekrutacja prawników', desc: 'Wyszukiwanie partnerów, counsel, senior prawników i liderów praktyk w wiodących kancelariach.' },
      { num: '03', title: 'Analizy rynku', desc: 'Mapowanie talentów, benchmarking wynagrodzeń i analiza konkurencji.' },
      { num: '04', title: 'Doradztwo strategiczne', desc: 'Konsultacje dotyczące struktury zespołu, planowania sukcesji i projektowania organizacji.' },
    ],
  },
  geography: {
    eyebrow: 'Zasięg',
    headline: 'Zasięg międzynarodowy',
    desc: 'Działamy w całej Europie i na rynkach międzynarodowych, posiadając silną sieć kontaktów.',
    regions: [
      { region: 'Europa Środkowa', countries: 'Czechy, Słowacja, Austria, Węgry, Polska' },
      { region: 'Europa Zachodnia', countries: 'Niemcy, Wielka Brytania, Holandia' },
      { region: 'Rynki wschodzące', countries: 'Rumunia, Turcja, ZEA, Chorwacja' },
    ],
  },
  candidates: {
    eyebrow: 'Dla prawników',
    headline: 'Rozwój kariery',
    desc: 'Wspieramy doświadczonych prawników w kolejnych krokach kariery. Nasze podejście jest doradcze — poświęcamy czas na zrozumienie Twoich celów i przedstawiamy tylko pozycje, które naprawdę pasują do Twojego profilu.',
    cta: 'Skontaktuj się z nami',
  },
  positions: {
    headline: 'Aktualne oferty',
    text: 'Wiele procesów prowadzimy dyskretnie i nie publikujemy ich publicznie. Skontaktuj się z nami poufnie.',
    subtext: 'Nie wszystkie pozycje publikujemy publicznie. Wiele projektów prowadzimy bezpośrednio i poufnie.',
    cta: 'Skontaktuj się z nami',
  },
  finalCta: {
    headline: 'Szukasz lidera prawnego?',
    subheadline: 'Porozmawiajmy o Twoich potrzebach poufnie.',
    ctaPrimary: 'Omów swoje potrzeby',
    ctaSecondary: 'Poznaj nasze usługi rekrutacyjne',
    microcopy: 'Bez zobowiązań. W pełni poufnie.',
  },
  contactForm: {
    headline: 'Skontaktuj się z nami poufnie',
    subheadline: 'Opisz krótko, jakie stanowisko prawne lub kierownicze chcesz obsadzić. Odpowiemy poufnie.',
    nameLabel: 'Imię i nazwisko',
    namePlaceholder: 'Twoje imię i nazwisko',
    companyLabel: 'Firma',
    companyPlaceholder: 'Nazwa firmy',
    emailLabel: 'E-mail',
    emailPlaceholder: 'twoj@email.pl',
    phoneLabel: 'Telefon',
    phonePlaceholder: '+48',
    roleLabel: 'Jakie stanowisko chcesz obsadzić?',
    rolePlaceholder: 'np. Head of Legal, General Counsel',
    messageLabel: 'Opisz swoje potrzeby',
    messagePlaceholder: 'Opowiedz nam więcej o stanowisku, które chcesz obsadzić...',
    submit: 'Wyślij zapytanie',
    successMessage: 'Dziękujemy. Skontaktujemy się z Tobą wkrótce.',
    errorMessage: 'Prosimy wypełnić wszystkie wymagane pola.',
  },
  footer: {
    tagline: 'Legal executive search i doradztwo w Europie i na Bliskim Wschodzie.',
    company: 'Firma',
    services: 'Usługi',
    connect: 'Kontakt',
    privacy: 'Prywatność',
    cookies: 'Cookies',
    copyright: '© 2007–2026 B Solution. Wszelkie prawa zastrzeżone.',
    execSearch: 'Executive Search',
    address: 'Praga, Czechy',
    phone: '+420 272 681 206',
    email: 'info@bsolution.eu',
  },
}

export function HomepagePL() {
  return (
    <>
      <HeaderPL />
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
      <FooterPL />
    </>
  )
}

function HeaderPL() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: '#uslugi', label: content.nav.services },
    { href: '#dla-firm', label: content.nav.clients },
    { href: '#dla-kandydatow', label: content.nav.candidates },
    { href: '#oferty', label: content.nav.positions },
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
        Przejdź do głównej treści
      </a>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-navy/98 backdrop-blur-md" : "bg-transparent"}`}>
      <div className="h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      
      <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
        <div className="flex items-center justify-between min-h-[72px] lg:min-h-[88px] py-4 lg:py-5">
          <Link href="/pl" aria-label="Strona główna BSolution" className="flex items-center flex-shrink-0">
            <span className="text-[14px] lg:text-[15px] font-serif text-gold tracking-[0.06em]">B Solution</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-10 xl:gap-14">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="relative text-[10px] font-normal text-white/40 hover:text-white/80 transition-colors uppercase tracking-[0.16em] py-2">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-8">
            <div className="flex items-center text-[9px] font-normal tracking-[0.16em] uppercase">
              {langRoutes.map((lang, i) => (
                <span key={lang.code} className="flex items-center">
                  <Link href={lang.href} className={`px-1 py-1 transition-colors ${lang.code === 'pl' ? "text-gold/90" : "text-white/30 hover:text-white/50"}`}>
                    {lang.label}
                  </Link>
                  {i < langRoutes.length - 1 && <span className="text-white/10 mx-1">/</span>}
                </span>
              ))}
            </div>
            <a href="#kontakt-form" className="text-[9px] font-medium text-navy bg-gold/90 hover:bg-gold px-6 py-3 transition-colors uppercase tracking-[0.16em]">
              {content.nav.cta}
            </a>
          </div>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden flex flex-col gap-1.5 p-2">
            <span className={`w-6 h-px bg-white/70 transition-colors ${mobileMenuOpen ? 'rotate-45 translate-y-[3px]' : ''}`} />
            <span className={`w-6 h-px bg-white/70 transition-colors ${mobileMenuOpen ? '-rotate-45 -translate-y-[3px]' : ''}`} />
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[73px] bg-navy/98 backdrop-blur-md z-40">
          <nav className="p-8 flex flex-col">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)} className="block py-4 text-[14px] uppercase tracking-[0.1em] text-white/70 hover:text-gold transition-colors border-b border-white/5">
                {item.label}
              </a>
            ))}
            <a href="#kontakt-form" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-[14px] uppercase tracking-[0.1em] text-white/70 hover:text-gold transition-colors border-b border-white/5">
              {content.nav.contact}
            </a>
            
            <div className="flex flex-wrap items-center gap-6 pt-8">
              {langRoutes.map((lang) => (
                <Link key={lang.code} href={lang.href} onClick={() => setMobileMenuOpen(false)} className={`text-[12px] font-medium uppercase tracking-[0.12em] transition-colors ${lang.code === 'pl' ? 'text-gold' : 'text-white/40'}`}>
                  {lang.code === 'en' ? 'English' : lang.code === 'cs' ? 'Čeština' : lang.code === 'de' ? 'Deutsch' : 'Polski'}
                </Link>
              ))}
            </div>
            
            <a href="#kontakt-form" onClick={() => setMobileMenuOpen(false)} className="block mt-10 text-center text-[11px] font-semibold text-navy bg-gold px-6 py-4 uppercase tracking-[0.12em]">
              {content.nav.cta}
            </a>
          </nav>
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
          <div className="max-w-lg">
            <h1 className="text-white font-serif text-[clamp(1.5rem,3vw,2rem)] font-normal leading-[1.25] tracking-[-0.01em]">
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
    <section id="dla-firm" className="bg-cream py-16 md:py-20 scroll-mt-20">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
        <p className="text-[10px] uppercase tracking-[0.25em] text-gold/80 mb-8">{c.eyebrow}</p>
        <h2 className="text-navy text-[clamp(1.5rem,3vw,2rem)] font-serif leading-[1.2] mb-12">{c.headline}</h2>
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {c.columns.map((col, i) => (
            <div key={i} className="border-l border-gold/30 pl-6">
              <h3 className="text-navy text-[16px] font-semibold mb-2">{col.title}</h3>
              <p className="text-gray-600 text-[14px] leading-[1.7]">{col.desc}</p>
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
    <section className="bg-white py-20 md:py-28 scroll-mt-20">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
        <h2 className="text-navy text-[clamp(1.75rem,3.5vw,2.5rem)] font-serif leading-[1.15] mb-16 text-center">{c.headline}</h2>
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <div className="bg-cream p-10 lg:p-14">
            <h3 className="text-navy text-[22px] font-serif mb-4">{c.corporate.title}</h3>
            <p className="text-gray-600 text-[15px] leading-[1.8] mb-8">{c.corporate.desc}</p>
            <a href="#kontakt-form" className="inline-flex items-center text-gold hover:text-gold-dark text-[12px] font-semibold uppercase tracking-[0.1em] transition-colors">
              {c.corporate.cta}
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
          <div className="bg-navy p-10 lg:p-14">
            <h3 className="text-white text-[22px] font-serif mb-4">{c.lawfirm.title}</h3>
            <p className="text-white/70 text-[15px] leading-[1.8] mb-8">{c.lawfirm.desc}</p>
            <a href="#kontakt-form" className="inline-flex items-center text-gold hover:text-gold-light text-[12px] font-semibold uppercase tracking-[0.1em] transition-colors">
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
    <section className="bg-navy py-24 md:py-32 scroll-mt-20">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
        <p className="text-[10px] uppercase tracking-[0.25em] text-gold/80 mb-6">{c.eyebrow}</p>
        <h2 className="text-white text-[clamp(1.75rem,3.5vw,2.5rem)] font-serif leading-[1.15] mb-16">{c.headline}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {c.points.map((point) => (
            <div key={point.num} className="border-t border-white/10 pt-6">
              <span className="text-gold/60 text-[12px] font-mono">{point.num}</span>
              <h3 className="text-white text-[17px] font-semibold mt-3 mb-2">{point.title}</h3>
              <p className="text-white/50 text-[14px] leading-[1.7]">{point.desc}</p>
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
    <section id="o-nas" className="bg-cream py-24 md:py-32 scroll-mt-20">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
        <div className="max-w-3xl">
          <p className="text-[10px] uppercase tracking-[0.25em] text-gold/80 mb-6">{c.eyebrow}</p>
          <h2 className="text-navy text-[clamp(1.75rem,3.5vw,2.5rem)] font-serif leading-[1.15] mb-8">{c.headline}</h2>
          <p className="text-gray-600 text-[17px] leading-[1.85] mb-6">{c.text1}</p>
          <p className="text-gray-600 text-[17px] leading-[1.85] mb-10">{c.text2}</p>
          <a href="#kontakt-form" className="inline-flex items-center text-gold hover:text-gold-dark text-[12px] font-semibold uppercase tracking-[0.1em] transition-colors">
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
    <section id="uslugi" className="bg-white py-24 md:py-32 scroll-mt-20">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
        <p className="text-[10px] uppercase tracking-[0.25em] text-gold/80 mb-6">{c.eyebrow}</p>
        <h2 className="text-navy text-[clamp(1.75rem,3.5vw,2.5rem)] font-serif leading-[1.15] mb-6">{c.headline}</h2>
        <p className="text-gray-600 text-[17px] leading-[1.85] max-w-2xl mb-16">{c.intro}</p>
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
          {c.items.map((item) => (
            <div key={item.num} className="flex gap-6">
              <span className="text-gold/40 text-[14px] font-mono flex-shrink-0">{item.num}</span>
              <div>
                <h3 className="text-navy text-[18px] font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 text-[15px] leading-[1.75]">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-14">
          <a href="#kontakt-form" className="inline-flex items-center justify-center px-10 py-4 bg-gold hover:bg-gold-light text-navy text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors">
            {c.cta}
            <ArrowRight className="ml-3 h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  )
}

function GeographySection() {
  const c = content.geography
  return (
    <section className="bg-navy py-24 md:py-32 scroll-mt-20">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
        <p className="text-[10px] uppercase tracking-[0.25em] text-gold/80 mb-6">{c.eyebrow}</p>
        <h2 className="text-white text-[clamp(1.75rem,3.5vw,2.5rem)] font-serif leading-[1.15] mb-6">{c.headline}</h2>
        <p className="text-white/60 text-[17px] leading-[1.85] max-w-2xl mb-14">{c.desc}</p>
        <div className="grid md:grid-cols-3 gap-8">
          {c.regions.map((r, i) => (
            <div key={i} className="border-l border-white/10 pl-6">
              <h3 className="text-gold text-[14px] font-semibold uppercase tracking-[0.08em] mb-3">{r.region}</h3>
              <p className="text-white/50 text-[14px] leading-[1.8]">{r.countries}</p>
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
    <section id="dla-kandydatow" className="bg-cream py-24 md:py-32 scroll-mt-20">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
        <div className="max-w-3xl">
          <p className="text-[10px] uppercase tracking-[0.25em] text-gold/80 mb-6">{c.eyebrow}</p>
          <h2 className="text-navy text-[clamp(1.75rem,3.5vw,2.5rem)] font-serif leading-[1.15] mb-8">{c.headline}</h2>
          <p className="text-gray-600 text-[17px] leading-[1.85] mb-10">{c.desc}</p>
          <a href="#kontakt-form" className="inline-flex items-center justify-center px-10 py-4 bg-gold hover:bg-gold-light text-navy text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors">
            {c.cta}
            <ArrowRight className="ml-3 h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  )
}

function PositionsSection() {
  const c = content.positions
  return (
    <section id="oferty" className="bg-white py-24 md:py-32 scroll-mt-20">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-navy text-[clamp(1.75rem,3.5vw,2.5rem)] font-serif leading-[1.15] mb-6">{c.headline}</h2>
          <p className="text-gray-600 text-[17px] leading-[1.85] mb-4">{c.text}</p>
          <p className="text-gray-500 text-[15px] leading-[1.75] mb-10">{c.subtext}</p>
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
    <section className="bg-cream py-24 md:py-32">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex justify-center mb-10">
            <div className="w-16 h-px bg-gold/40" />
          </div>
          <h2 className="text-navy text-[clamp(1.75rem,3.5vw,2.5rem)] font-serif leading-[1.15] mb-6">{c.headline}</h2>
          <p className="text-gray-600 text-[17px] leading-[1.85] mb-10">{c.subheadline}</p>
          <a href="#kontakt-form" className="inline-flex items-center justify-center px-12 py-4 bg-gold hover:bg-gold-light text-navy text-[12px] font-semibold uppercase tracking-[0.12em] transition-colors">
            {c.ctaPrimary}
            <ArrowRight className="ml-3 h-4 w-4" />
          </a>
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
    <section id="kontakt-form" className="bg-navy py-24 md:py-32 scroll-mt-20">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-center mb-10">
            <div className="w-16 h-px bg-gold/40" />
          </div>
          
          <div className="text-center mb-12">
            <h2 className="text-white text-[clamp(1.75rem,3.5vw,2.5rem)] font-serif leading-[1.2] mb-6">{c.headline}</h2>
            <p className="text-white/60 text-[17px] lg:text-[18px] leading-[1.75]">{c.subheadline}</p>
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

function FooterPL() {
  const f = content.footer
  const nav = content.nav
  
  return (
    <footer className="bg-navy border-t border-white/5">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-20 py-16 lg:py-20">
        <div className="grid lg:grid-cols-4 gap-12 lg:gap-16">
          <div className="lg:col-span-1">
            <Link href="/pl" className="inline-block">
              <span className="text-[18px] font-serif text-gold tracking-[0.04em]">B Solution</span>
            </Link>
            <p className="mt-6 text-white/40 text-[14px] leading-[1.8]">{f.tagline}</p>
          </div>
          
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-white/30 mb-6">{f.company}</h4>
            <nav className="space-y-3">
              <a href="#o-nas" className="block text-white/40 hover:text-white/70 text-[14px] transition-colors">{nav.about}</a>
              <a href="#uslugi" className="block text-white/40 hover:text-white/70 text-[14px] transition-colors">{nav.services}</a>
              <a href="#oferty" className="block text-white/40 hover:text-white/70 text-[14px] transition-colors">{nav.positions}</a>
              <a href="#kontakt-form" className="block text-white/40 hover:text-white/70 text-[14px] transition-colors">{nav.contact}</a>
            </nav>
          </div>
          
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-white/30 mb-6">{f.services}</h4>
            <nav className="space-y-3">
              <a href="#uslugi" className="block text-white/40 hover:text-white/70 text-[14px] transition-colors">{f.execSearch}</a>
              <a href="#dla-firm" className="block text-white/40 hover:text-white/70 text-[14px] transition-colors">{nav.clients}</a>
              <a href="#dla-kandydatow" className="block text-white/40 hover:text-white/70 text-[14px] transition-colors">{nav.candidates}</a>
            </nav>
          </div>
          
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-white/30 mb-6">{f.connect}</h4>
            <div className="space-y-3 text-white/40 text-[14px]">
              <p>{f.address}</p>
              <p>{f.phone}</p>
              <p>{f.email}</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/5 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/25 text-[12px]">{f.copyright}</p>
          <div className="flex gap-8">
            <Link href="/privacy" className="text-white/25 hover:text-white/40 text-[12px] transition-colors">{f.privacy}</Link>
            <Link href="/cookies" className="text-white/25 hover:text-white/40 text-[12px] transition-colors">{f.cookies}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
