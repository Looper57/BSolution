"use client"

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { LanguageProvider, useLanguage } from '@/lib/language-context'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { localizedPath } from '@/lib/i18n/config'

const clientsLocalizedCopy = {
  de: {
    corporationBody: 'Wir haben multinationale Unternehmen, regionale Zentralen und Portfoliounternehmen beim Aufbau ihrer Rechtsabteilungen unterstützt. Von der ersten juristischen Position bis zur Besetzung eines General Counsel verstehen wir die besonderen Anforderungen der Suche für Unternehmensrechtsabteilungen.',
    corporationCta: 'Suche für Rechtsabteilungen besprechen',
    forCompaniesCta: 'Mehr für Unternehmen',
    hireLegalLeaderCta: 'Eine Führungskraft im Rechtsbereich einstellen',
    corporationRolesTitle: 'Führungspositionen, die wir besetzen',
    corporationRoles: ['General Counsel', 'Chief Legal Officer', 'Head of Legal', 'Legal Director', 'Senior Legal Counsel', 'Legal Counsel', 'Compliance Director', 'Chief Compliance Officer'],
    lawFirmBody: 'Ob Sie einen Praxisbereich stärken, laterale Persönlichkeiten gewinnen oder die Partnernachfolge planen möchten: Wir verbinden Marktkenntnis mit gezielter Direktansprache. Unsere Erfahrung umfasst internationale Kanzleien, nationale Sozietäten und spezialisierte Boutiquen in Mitteleuropa und darüber hinaus.',
    lawFirmCta: 'Kanzleisuche besprechen',
    lawFirmRolesTitle: 'Positionen für Kanzleien',
    lawFirmRoles: ['Managing Partner', 'Equity Partner', 'Partner', 'Of Counsel', 'Praxisgruppenleitung', 'Senior Associate', 'Associate', 'Counsel'],
    methodology: 'Unsere Methodik',
    steps: [
      { num: '01', title: 'Verstehen', desc: 'Ein ausführliches Briefing zu Anforderungen, Kultur, Teamdynamik und strategischen Zielen.' },
      { num: '02', title: 'Marktanalyse', desc: 'Nutzung unseres Netzwerks und unserer Marktkenntnis zur Identifikation und Kartierung potenzieller Kandidaten.' },
      { num: '03', title: 'Direktansprache', desc: 'Vertrauliche Ansprache geeigneter Persönlichkeiten unter Wahrung Ihrer Wettbewerbsposition.' },
      { num: '04', title: 'Beurteilung', desc: 'Strukturierte Auswahl, Interviews und Referenzprüfung zur Beurteilung der fachlichen und persönlichen Eignung.' },
    ],
    distinction: 'Was uns unterscheidet',
    distinctionTitle: 'Warum Mandanten B Solution wählen',
    reasons: [
      { title: 'Fokus auf den Rechtsmarkt', desc: 'Wir sind auf juristische und Compliance-Positionen für Kanzleien und Rechtsabteilungen spezialisiert.' },
      { title: 'Qualität vor Quantität', desc: 'Wir präsentieren eine gezielte Auswahl sorgfältig geprüfter Kandidaten.' },
      { title: 'Marktzugang', desc: 'Unser Netzwerk erreicht Persönlichkeiten, die nicht aktiv suchen, aber für die richtige Gelegenheit offen sind.' },
      { title: 'Diskretion', desc: 'Jede Suche wird vollständig vertraulich und unter Schutz aller Beteiligten durchgeführt.' },
      { title: 'International', desc: 'Wir arbeiten in Europa und im Nahen Osten und berücksichtigen die Besonderheiten der jeweiligen lokalen Märkte.' },
      { title: 'Partnerschaft', desc: 'Wir investieren in langfristige Beziehungen und ein fundiertes Verständnis der Organisation.' },
    ],
    ctaTitle: 'Möchten Sie Ihren Personalbedarf besprechen?',
    ctaBody: 'Kontaktieren Sie uns für ein vertrauliches Gespräch über Ihre Anforderungen im juristischen Bereich.',
  },
  pl: {
    corporationBody: 'Wspieraliśmy międzynarodowe firmy, regionalne centrale i spółki portfelowe w budowaniu działów prawnych. Od pierwszego stanowiska prawniczego po rekrutację General Counsel rozumiemy specyfikę wyszukiwania dla korporacyjnych działów prawnych.',
    corporationCta: 'Omów wyszukiwanie dla działu prawnego',
    forCompaniesCta: 'Więcej dla firm',
    hireLegalLeaderCta: 'Zatrudnij lidera działu prawnego',
    corporationRolesTitle: 'Stanowiska kierownicze, które obsadzamy',
    corporationRoles: ['General Counsel', 'Chief Legal Officer', 'Head of Legal', 'Legal Director', 'Senior Legal Counsel', 'Legal Counsel', 'Compliance Director', 'Chief Compliance Officer'],
    lawFirmBody: 'Niezależnie od tego, czy kancelaria rozwija praktykę, poszukuje partnera lateralnego czy planuje sukcesję, łączymy znajomość rynku z bezpośrednim dotarciem do odpowiednich osób. Nasze doświadczenie obejmuje kancelarie międzynarodowe, krajowe i wyspecjalizowane butiki w Europie Środkowej i poza nią.',
    lawFirmCta: 'Omów wyszukiwanie dla kancelarii',
    lawFirmRolesTitle: 'Stanowiska w kancelariach',
    lawFirmRoles: ['Managing Partner', 'Equity Partner', 'Partner', 'Of Counsel', 'Lider praktyki', 'Senior Associate', 'Associate', 'Counsel'],
    methodology: 'Nasza metodologia',
    steps: [
      { num: '01', title: 'Zrozumienie', desc: 'Szczegółowy briefing dotyczący wymagań, kultury, dynamiki zespołu i celów strategicznych.' },
      { num: '02', title: 'Analiza rynku', desc: 'Wykorzystanie naszej sieci i znajomości rynku do identyfikacji oraz mapowania potencjalnych kandydatów.' },
      { num: '03', title: 'Kontakt bezpośredni', desc: 'Poufny kontakt z odpowiednimi osobami z poszanowaniem pozycji konkurencyjnej klienta.' },
      { num: '04', title: 'Ocena', desc: 'Ustrukturyzowana selekcja, rozmowy i weryfikacja referencji służące ocenie doświadczenia i dopasowania.' },
    ],
    distinction: 'Co nas wyróżnia',
    distinctionTitle: 'Dlaczego klienci wybierają B Solution',
    reasons: [
      { title: 'Specjalizacja prawna', desc: 'Specjalizujemy się w stanowiskach prawnych i compliance dla kancelarii oraz korporacyjnych działów prawnych.' },
      { title: 'Jakość przed ilością', desc: 'Przedstawiamy wybraną grupę starannie ocenionych kandydatów.' },
      { title: 'Dostęp do rynku', desc: 'Nasza sieć pozwala dotrzeć do osób, które nie szukają aktywnie, ale są otwarte na odpowiednią możliwość.' },
      { title: 'Dyskrecja', desc: 'Każdy projekt prowadzimy poufnie, chroniąc wszystkie zaangażowane strony.' },
      { title: 'Międzynarodowy zasięg', desc: 'Działamy w Europie i na Bliskim Wschodzie, uwzględniając specyfikę lokalnych rynków.' },
      { title: 'Partnerstwo', desc: 'Inwestujemy w długoterminowe relacje i dokładne zrozumienie organizacji.' },
    ],
    ctaTitle: 'Chcesz omówić potrzeby rekrutacyjne?',
    ctaBody: 'Skontaktuj się z nami, aby poufnie omówić potrzeby dotyczące zespołu prawnego.',
  },
} as const

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
  const nativeCopy = language === 'de' || language === 'pl' ? clientsLocalizedCopy[language] : null
  
  const roles = nativeCopy?.corporationRoles ?? (language === 'en'
    ? ['General Counsel', 'Chief Legal Officer', 'Head of Legal', 'Legal Director', 'Senior Legal Counsel', 'Legal Counsel', 'Compliance Director', 'Chief Compliance Officer']
    : ['General Counsel', 'Chief Legal Officer', 'Head of Legal', 'Legal Director', 'Senior Legal Counsel', 'Legal Counsel', 'Compliance Director', 'Chief Compliance Officer'])
  
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
              {nativeCopy?.corporationBody ?? (language === 'en'
                ? 'We have helped multinationals, regional headquarters, private equity portfolio companies, and market-leading enterprises build legal teams that deliver. From first legal hires to General Counsel appointments, we understand the unique dynamics of corporate legal recruitment.'
                : 'Pomohli jsme nadnárodním společnostem, regionálním centrálám, portfoliovým společnostem private equity a předním podnikům budovat právní týmy, které přinášejí výsledky. Od prvního obsazení právní pozice po jmenování General Counsel chápeme specifika náboru do korporátních právních oddělení.')}
            </p>
            <Link
              href={localizedPath(language, '/contact')}
              className="inline-flex items-center mt-10 text-gold hover:text-gold-dark text-[13px] font-semibold uppercase tracking-[0.1em] transition-colors"
            >
              {nativeCopy?.corporationCta ?? (language === 'en' ? 'Discuss Corporate Search' : 'Projednat korporátní search')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
              <Link
                href="/for-companies"
                className="inline-flex items-center text-gray-500 hover:text-gold text-[12px] font-medium uppercase tracking-[0.08em] transition-colors"
              >
                {nativeCopy?.forCompaniesCta ?? (language === 'en' ? 'More for Companies' : 'Více pro firmy')}
                <ArrowRight className="ml-2 h-3.5 w-3.5" />
              </Link>
              <Link
                href="/hire-legal-leader"
                className="inline-flex items-center text-gray-500 hover:text-gold text-[12px] font-medium uppercase tracking-[0.08em] transition-colors"
              >
                {nativeCopy?.hireLegalLeaderCta ?? (language === 'en' ? 'Hire a Legal Leader' : 'Najmout právního lídra')}
                <ArrowRight className="ml-2 h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
          <div className="bg-navy p-10 lg:p-12">
            <p className="eyebrow mb-6">
              {nativeCopy?.corporationRolesTitle ?? (language === 'en' ? 'Executive Roles We Cover' : 'Exekutivní pozice, které obsazujeme')}
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
  const nativeCopy = language === 'de' || language === 'pl' ? clientsLocalizedCopy[language] : null
  
  const roles = nativeCopy?.lawFirmRoles ?? (language === 'en'
    ? ['Managing Partner', 'Equity Partner', 'Partner', 'Of Counsel', 'Practice Group Head', 'Senior Associate', 'Associate', 'Counsel']
    : ['Managing Partner', 'Equity Partner', 'Partner', 'Of Counsel', 'Vedoucí praxe', 'Senior Advokát', 'Advokát', 'Counsel'])
  
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
              {nativeCopy?.lawFirmBody ?? (language === 'en'
                ? 'Whether you need to strengthen a practice area, bring in lateral talent, or plan partner succession, we provide the market knowledge and candidate access to make it happen. Our track record spans top-tier international firms, leading domestic practices, and boutique specialists across Central Europe and beyond.'
                : 'Ať už potřebujete posílit oblast praxe, přivést laterální talent nebo plánovat nástupnictví partnerů, poskytujeme znalost trhu a přístup ke kandidátům, aby se to podařilo. Naše historie zahrnuje přední mezinárodní firmy, vedoucí domácí kanceláře a boutique specialisty napříč střední Evropou a dále.')}
            </p>
            <Link 
              href={localizedPath(language, '/contact')}
              className="inline-flex items-center mt-10 text-gold hover:text-gold-dark text-[13px] font-semibold uppercase tracking-[0.1em] transition-colors"
            >
              {nativeCopy?.lawFirmCta ?? (language === 'en' ? 'Discuss Law Firm Search' : 'Projednat search pro kanceláře')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          <div className="lg:order-1 bg-white p-10 lg:p-12 border border-gray-200">
            <p className="text-charcoal text-[12px] font-semibold uppercase tracking-[0.15em] mb-6">
              {nativeCopy?.lawFirmRolesTitle ?? (language === 'en' ? 'Roles We Fill for Law Firms' : 'Pozice pro advokátní kanceláře')}
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
  const nativeCopy = language === 'de' || language === 'pl' ? clientsLocalizedCopy[language] : null
  
  const steps = nativeCopy?.steps ?? (language === 'en' ? [
    { num: '01', title: 'Understanding', desc: 'In-depth briefing to understand your requirements, culture, team dynamics, and strategic objectives.' },
    { num: '02', title: 'Intelligence', desc: 'Leveraging our network and market knowledge to identify and map potential candidates.' },
    { num: '03', title: 'Approach', desc: 'Confidential outreach to suitable candidates, protecting your competitive position.' },
    { num: '04', title: 'Assessment', desc: 'Rigorous screening, interviews, and reference checks to ensure quality matches.' },
  ] : [
    { num: '01', title: 'Pochopení', desc: 'Hloubkový briefing k pochopení vašich požadavků, kultury, dynamiky týmu a strategických cílů.' },
    { num: '02', title: 'Inteligence', desc: 'Využití naší sítě a znalosti trhu k identifikaci a mapování potenciálních kandidátů.' },
    { num: '03', title: 'Přístup', desc: 'Důvěrné oslovení vhodných kandidátů s ochranou vaší konkurenční pozice.' },
    { num: '04', title: 'Hodnocení', desc: 'Důsledný screening, pohovory a kontrola referencí k zajištění kvalitních shod.' },
  ])
  
  return (
    <section className="bg-white section-padding">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-16">
        <div className="max-w-3xl mb-20">
          <p className="eyebrow mb-6">
            {nativeCopy?.methodology ?? (language === 'en' ? 'Our Methodology' : 'Naše metodologie')}
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
  const nativeCopy = language === 'de' || language === 'pl' ? clientsLocalizedCopy[language] : null
  
  const reasons = nativeCopy?.reasons ?? (language === 'en' ? [
    { title: 'Legal Focus', desc: 'We specialise in legal and compliance appointments for law firms and corporate legal departments.' },
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
  ])
  
  return (
    <section className="bg-navy section-padding">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-16">
        <div className="text-center mb-20">
          <p className="eyebrow mb-6">
            {nativeCopy?.distinction ?? (language === 'en' ? 'Our Distinction' : 'Čím se odlišujeme')}
          </p>
          <h2 className="text-white max-w-2xl mx-auto">
            {nativeCopy?.distinctionTitle ?? (language === 'en' ? 'Why Clients Choose B Solution' : 'Proč si klienti vybírají B Solution')}
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
  const nativeCopy = language === 'de' || language === 'pl' ? clientsLocalizedCopy[language] : null
  
  return (
    <section className="bg-cream section-padding">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-16 text-center">
        <div className="divider mx-auto mb-10" />
        <h2 className="text-navy max-w-2xl mx-auto">
          {nativeCopy?.ctaTitle ?? (language === 'en' ? 'Ready to Discuss Your Hiring Needs?' : 'Připraveni projednat vaše náborové potřeby?')}
        </h2>
        <p className="mt-6 text-gray-500 text-[18px] max-w-2xl mx-auto leading-[1.75]">
          {nativeCopy?.ctaBody ?? (language === 'en'
            ? 'Contact us for a confidential discussion about how we can support your legal talent acquisition.'
            : 'Kontaktujte nás pro důvěrnou diskusi o tom, jak můžeme podpořit vaše získávání právních talentů.')}
        </p>
        <Link 
          href={localizedPath(language, '/contact')}
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
