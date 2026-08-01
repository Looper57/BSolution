"use client"

import Link from 'next/link'
import { ArrowRight, Shield, Users, Briefcase, Globe2, Lock, Heart, CheckCircle } from 'lucide-react'
import { LanguageProvider, useLanguage } from '@/lib/language-context'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { localizedPath } from '@/lib/i18n/config'

const candidatesLocalizedCopy = {
  de: {
    features: [
      { icon: Lock, title: 'Vertrauliche Möglichkeiten', desc: 'Viele unserer Mandate werden nicht öffentlich ausgeschrieben. Durch eine Registrierung erhalten Sie Zugang zu Möglichkeiten, die zu Ihrer Erfahrung und Ihren Zielen passen.' },
      { icon: Heart, title: 'Persönlicher Ansatz', desc: 'Wir nehmen uns Zeit, Ihre Karriereziele, Präferenzen und persönlichen Rahmenbedingungen zu verstehen. Wir stellen nur Möglichkeiten vor, die einen sinnvollen nächsten Schritt darstellen.' },
      { icon: Shield, title: 'Vollständige Diskretion', desc: 'Ihre Privatsphäre hat höchste Priorität. Wir geben Ihre Daten niemals ohne Ihre ausdrückliche Zustimmung an Mandanten weiter und behandeln jede Kommunikation vertraulich.' },
    ],
    opportunitiesTitle: 'Arten von Karrieremöglichkeiten',
    opportunitiesBody: 'Wir begleiten Mandate in Kanzleien und Rechtsabteilungen in Europa sowie in ausgewählten Märkten im Nahen Osten.',
    lawFirmTitle: 'Möglichkeiten in Kanzleien',
    lawFirmRoles: ['Positionen für Associates in verschiedenen Rechtsgebieten', 'Senior-Associate- und Counsel-Positionen', 'Partner- und Managing-Partner-Mandate', 'Leitung von Praxisgruppen', 'Internationale Wechsel und Secondments'],
    inHouseTitle: 'Möglichkeiten in Rechtsabteilungen',
    inHouseRoles: ['Positionen vom Legal Counsel bis zum Senior Legal Counsel', 'Head-of-Legal-Positionen', 'General-Counsel- und CLO-Mandate', 'Führungspositionen in Compliance und Governance', 'Regionale Legal-Director-Positionen'],
    processTitle: 'Wie wir mit Kandidaten arbeiten',
    steps: [
      { num: '01', title: 'Erstes Gespräch', desc: 'In einem vertraulichen Gespräch lernen wir Ihren Hintergrund, Ihre Karriereziele und Ihre Erwartungen an den nächsten Schritt kennen.' },
      { num: '02', title: 'Abgleich mit Mandaten', desc: 'Auf Grundlage Ihres Profils prüfen wir aktuelle Mandate und berücksichtigen Sie bei passenden zukünftigen Suchen.' },
      { num: '03', title: 'Vorstellung und Begleitung', desc: 'Bei einer passenden Möglichkeit koordinieren wir die Vorstellung und begleiten Sie durch Gespräche und Verhandlungen.' },
      { num: '04', title: 'Langfristige Beziehung', desc: 'Auch wenn sich nicht sofort eine passende Möglichkeit ergibt, bleiben wir für zukünftige Karriereschritte im Austausch.' },
    ],
    ctaTitle: 'Möchten Sie neue Möglichkeiten besprechen?',
    ctaBody: 'Kontaktieren Sie uns für ein vertrauliches Gespräch über Ihre beruflichen Ziele. Wir beantworten alle Anfragen innerhalb von 48 Stunden.',
    positionsCta: 'Aktuelle Positionen ansehen',
    sisterPlatformPrefix: 'Geht es eher um eine persönliche Rechtsangelegenheit als um Ihre Karriere? Unsere Schwesterplattform',
    sisterPlatformSuffix: 'verbindet Sie mit einem geprüften Anwalt in Tschechien und im Ausland.',
  },
  pl: {
    features: [
      { icon: Lock, title: 'Poufne możliwości', desc: 'Wiele naszych projektów nie jest publikowanych. Rejestracja umożliwia dostęp do możliwości dopasowanych do doświadczenia i planów zawodowych.' },
      { icon: Heart, title: 'Indywidualne podejście', desc: 'Poświęcamy czas na zrozumienie celów zawodowych, preferencji i sytuacji kandydata. Przedstawiamy wyłącznie możliwości stanowiące właściwy kolejny krok.' },
      { icon: Shield, title: 'Pełna dyskrecja', desc: 'Prywatność jest dla nas priorytetem. Nigdy nie przekazujemy danych klientom bez wyraźnej zgody kandydata, a całą komunikację prowadzimy poufnie.' },
    ],
    opportunitiesTitle: 'Rodzaje możliwości zawodowych',
    opportunitiesBody: 'Prowadzimy projekty dla kancelarii i działów prawnych w Europie oraz na wybranych rynkach Bliskiego Wschodu.',
    lawFirmTitle: 'Możliwości w kancelariach',
    lawFirmRoles: ['Stanowiska Associate w różnych obszarach praktyki', 'Stanowiska Senior Associate i Counsel', 'Projekty dotyczące Partnerów i Managing Partnerów', 'Stanowiska liderów praktyk', 'Międzynarodowe transfery i oddelegowania'],
    inHouseTitle: 'Możliwości w działach prawnych',
    inHouseRoles: ['Stanowiska od Legal Counsel do Senior Legal Counsel', 'Stanowiska Head of Legal', 'Projekty General Counsel i CLO', 'Stanowiska kierownicze w compliance i governance', 'Regionalne stanowiska Legal Director'],
    processTitle: 'Jak współpracujemy z kandydatami',
    steps: [
      { num: '01', title: 'Pierwsza rozmowa', desc: 'Podczas poufnej rozmowy poznajemy doświadczenie, cele zawodowe i oczekiwania dotyczące kolejnego kroku.' },
      { num: '02', title: 'Dopasowanie możliwości', desc: 'Na podstawie profilu analizujemy aktualne projekty i uwzględniamy kandydata w przyszłych wyszukiwaniach.' },
      { num: '03', title: 'Przedstawienie i wsparcie', desc: 'Gdy pojawia się odpowiednia możliwość, organizujemy przedstawienie i wspieramy podczas rozmów oraz negocjacji.' },
      { num: '04', title: 'Długoterminowa relacja', desc: 'Jeśli odpowiednia możliwość nie pojawi się od razu, pozostajemy w kontakcie w sprawie przyszłych kroków zawodowych.' },
    ],
    ctaTitle: 'Chcesz omówić nowe możliwości?',
    ctaBody: 'Skontaktuj się z nami, aby poufnie omówić swoje cele zawodowe. Odpowiadamy na wszystkie zapytania w ciągu 48 godzin.',
    positionsCta: 'Zobacz aktualne oferty',
    sisterPlatformPrefix: 'Chodzi raczej o osobistą sprawę prawną niż o karierę? Nasza siostrzana platforma',
    sisterPlatformSuffix: 'połączy Cię ze zweryfikowanym prawnikiem w Czechach i za granicą.',
  },
} as const

function PageHeader() {
  const { t } = useLanguage()
  
  return (
    <section className="bg-navy pt-32 pb-20 lg:pt-40 lg:pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h1 className="text-white">{t('candidates.page.title')}</h1>
          <p className="mt-6 text-xl text-white/70 leading-relaxed">
            {t('candidates.page.subtitle')}
          </p>
        </div>
      </div>
    </section>
  )
}

function IntroSection() {
  const { t } = useLanguage()
  
  return (
    <section className="bg-off-white py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg text-charcoal/80 leading-relaxed">
            {t('candidates.page.intro')}
          </p>
        </div>
      </div>
    </section>
  )
}

function ValuePropositionSection() {
  const { language } = useLanguage()
  const nativeCopy = language === 'de' || language === 'pl' ? candidatesLocalizedCopy[language] : null
  
  const features = nativeCopy?.features ?? (language === 'en' ? [
    {
      icon: Lock,
      title: 'Confidential Opportunities',
      desc: 'Many of our mandates are not publicly advertised. By registering with us, you gain access to exclusive opportunities that match your experience and aspirations.'
    },
    {
      icon: Heart,
      title: 'Personalized Approach',
      desc: 'We take time to understand your career goals, preferences, and circumstances. Our role is to connect you with opportunities that genuinely advance your career.'
    },
    {
      icon: Shield,
      title: 'Complete Discretion',
      desc: 'Your privacy is paramount. We never share your details with clients without your explicit consent, and all communications are handled with the utmost confidentiality.'
    }
  ] : [
    {
      icon: Lock,
      title: 'Důvěrné příležitosti',
      desc: 'Mnoho našich mandátů není veřejně inzerováno. Registrací u nás získáte přístup k exkluzivním příležitostem, které odpovídají vašim zkušenostem a ambicím.'
    },
    {
      icon: Heart,
      title: 'Personalizovaný přístup',
      desc: 'Věnujeme čas pochopení vašich kariérních cílů, preferencí a okolností. Naší rolí je spojit vás s příležitostmi, které skutečně posunou vaši kariéru.'
    },
    {
      icon: Shield,
      title: 'Naprostá diskrétnost',
      desc: 'Vaše soukromí je prvořadé. Nikdy nesdílíme vaše údaje s klienty bez vašeho výslovného souhlasu a veškerá komunikace probíhá s nejvyšší důvěrností.'
    }
  ])
  
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border border-gray-light hover:border-gold/50 hover:shadow-lg transition-all">
              <CardContent className="p-8">
                <feature.icon className="h-10 w-10 text-gold" />
                <h2 className="mt-6 font-serif text-xl font-medium text-navy">{feature.title}</h2>
                <p className="mt-4 text-charcoal/70 leading-relaxed">{feature.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

function OpportunitiesSection() {
  const { language } = useLanguage()
  const nativeCopy = language === 'de' || language === 'pl' ? candidatesLocalizedCopy[language] : null
  
  const lawFirmRoles = nativeCopy?.lawFirmRoles ?? (language === 'en'
    ? ['Associate positions across practice areas', 'Senior associate and counsel roles', 'Partner and managing partner opportunities', 'Practice group leadership positions', 'International secondments and transfers']
    : ['Advokátní pozice napříč oblastmi praxe', 'Senior advokát a counsel pozice', 'Partnerské a managing partner příležitosti', 'Vedoucí pozice praxí', 'Mezinárodní stáže a transfery'])
  
  const inHouseRoles = nativeCopy?.inHouseRoles ?? (language === 'en'
    ? ['Junior to senior legal counsel roles', 'Head of legal positions', 'General counsel and CLO appointments', 'Compliance and governance leadership', 'Regional legal director roles']
    : ['Junior až senior legal counsel pozice', 'Head of legal pozice', 'General counsel a CLO jmenování', 'Compliance a governance vedení', 'Regionální právní ředitelské pozice'])
  
  return (
    <section className="bg-off-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-navy text-center">
          {nativeCopy?.opportunitiesTitle ?? (language === 'en' ? 'Types of Opportunities' : 'Typy příležitostí')}
        </h2>
        <p className="mt-4 text-center text-charcoal/60 max-w-2xl mx-auto">
          {nativeCopy?.opportunitiesBody ?? (language === 'en'
            ? 'We work on mandates across private practice and in-house environments throughout Europe and Dubai.'
            : 'Pracujeme na mandátech v advokacii i in-house prostředí po celé Evropě a v Dubaji.')}
        </p>
        
        <div className="mt-16 grid md:grid-cols-2 gap-8">
          {/* Law Firms */}
          <Card className="border-0 shadow-lg bg-navy">
            <CardContent className="p-8 lg:p-10">
              <Briefcase className="h-10 w-10 text-gold" />
              <h2 className="mt-6 text-white font-serif text-xl font-medium">
                {nativeCopy?.lawFirmTitle ?? (language === 'en' ? 'Law Firm Opportunities' : 'Příležitosti v advokátních kancelářích')}
              </h2>
              <div className="mt-6 space-y-3">
                {lawFirmRoles.map((role, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-gold mt-0.5 shrink-0" />
                    <span className="text-white/80">{role}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* In-House */}
          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-8 lg:p-10">
              <Globe2 className="h-10 w-10 text-gold" />
              <h2 className="mt-6 text-navy font-serif text-xl font-medium">
                {nativeCopy?.inHouseTitle ?? (language === 'en' ? 'In-House Opportunities' : 'In-house příležitosti')}
              </h2>
              <div className="mt-6 space-y-3">
                {inHouseRoles.map((role, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-gold mt-0.5 shrink-0" />
                    <span className="text-charcoal/80">{role}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

function ProcessSection() {
  const { language } = useLanguage()
  const nativeCopy = language === 'de' || language === 'pl' ? candidatesLocalizedCopy[language] : null
  
  const steps = nativeCopy?.steps ?? (language === 'en' ? [
    { num: '01', title: 'Initial Conversation', desc: 'We start with a confidential discussion to understand your background, career aspirations, and what you\'re looking for in your next role.' },
    { num: '02', title: 'Opportunity Matching', desc: 'Based on your profile, we identify relevant opportunities from our current mandates or keep you in mind for future searches.' },
    { num: '03', title: 'Introduction & Support', desc: 'When a suitable opportunity arises, we facilitate introductions and support you throughout the interview and negotiation process.' },
    { num: '04', title: 'Long-term Relationship', desc: 'Whether or not an immediate opportunity materializes, we maintain the relationship for future career moves.' },
  ] : [
    { num: '01', title: 'Úvodní rozhovor', desc: 'Začínáme důvěrnou diskusí k pochopení vašeho zázemí, kariérních aspirací a toho, co hledáte ve své další roli.' },
    { num: '02', title: 'Párování příležitostí', desc: 'Na základě vašeho profilu identifikujeme relevantní příležitosti z našich aktuálních mandátů nebo vás máme v paměti pro budoucí vyhledávání.' },
    { num: '03', title: 'Představení & podpora', desc: 'Když se objeví vhodná příležitost, zprostředkujeme představení a podporujeme vás během celého pohovorového a vyjednávacího procesu.' },
    { num: '04', title: 'Dlouhodobý vztah', desc: 'Bez ohledu na to, zda se okamžitá příležitost naplní, udržujeme vztah pro budoucí kariérní kroky.' },
  ])
  
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-navy text-center">
          {nativeCopy?.processTitle ?? (language === 'en' ? 'How We Work With Candidates' : 'Jak pracujeme s kandidáty')}
        </h2>
        
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index}>
              <span className="text-5xl font-serif font-semibold text-gold/30">{step.num}</span>
              <h3 className="mt-4 font-serif text-lg font-medium text-navy">{step.title}</h3>
              <p className="mt-3 text-charcoal/60 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTASection() {
  const { language, t } = useLanguage()
  const nativeCopy = language === 'de' || language === 'pl' ? candidatesLocalizedCopy[language] : null
  
  return (
    <section className="bg-off-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <Users className="h-12 w-12 text-gold mx-auto" />
          <h2 className="mt-6 text-navy">
            {nativeCopy?.ctaTitle ?? (language === 'en' ? 'Ready to Explore New Opportunities?' : 'Připraveni prozkoumat nové příležitosti?')}
          </h2>
          <p className="mt-4 text-charcoal/70 text-lg">
            {nativeCopy?.ctaBody ?? (language === 'en'
              ? 'Contact us confidentially to discuss your career aspirations. We respond to all inquiries within 48 hours.'
              : 'Kontaktujte nás důvěrně k projednání vašich kariérních aspirací. Na všechny dotazy odpovídáme do 48 hodin.')}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild 
              size="lg"
              className="bg-gold hover:bg-gold-hover text-white"
            >
              <Link href={localizedPath(language, '/contact')}>
                {t('candidates.cta')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-navy text-navy hover:bg-navy hover:text-white"
            >
              <Link href={localizedPath(language, '/positions')}>
                {nativeCopy?.positionsCta ?? (language === 'en' ? 'View Open Positions' : 'Zobrazit volné pozice')}
              </Link>
            </Button>
          </div>

          {/* Cross-referral to LawBridge.eu (2026-08-01) — this page's
              audience (individuals navigating a career move) is a genuine
              fit for LawBridge's personal-legal-situation matching, unlike
              the corporate-facing /clients page. Same founder, disclosed
              as a sister platform. */}
          <p className="mt-8 text-sm text-charcoal/50 leading-relaxed">
            {nativeCopy?.sisterPlatformPrefix ?? (language === 'en'
              ? 'Is this about a personal legal matter rather than your career? Our sister platform'
              : 'Jde spíš o osobní právní záležitost než o kariéru? Naše sesterská platforma')}{' '}
            <a
              href="https://www.lawbridge.eu"
              target="_blank"
              rel="noopener"
              className="font-medium text-gold hover:text-gold-hover transition-colors"
            >
              LawBridge.eu
            </a>{' '}
            {nativeCopy?.sisterPlatformSuffix ?? (language === 'en'
              ? 'connects you with a verified lawyer in the Czech Republic and abroad.'
              : 'vás propojí s ověřeným advokátem v ČR i zahraničí.')}
          </p>
        </div>
      </div>
    </section>
  )
}

function CandidatesPage() {
  return (
    <>
      <Header />
      <main>
        <PageHeader />
        <IntroSection />
        <ValuePropositionSection />
        <OpportunitiesSection />
        <ProcessSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}

export default function Page() {
  return (
    <LanguageProvider>
      <CandidatesPage />
    </LanguageProvider>
  )
}
