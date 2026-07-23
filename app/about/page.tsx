"use client"

import Link from 'next/link'
import { ArrowRight, Target, Users, Shield, Globe2, Award, Clock } from 'lucide-react'
import { LanguageProvider, useLanguage } from '@/lib/language-context'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

function PageHeader() {
  const { t } = useLanguage()
  
  return (
    <section className="bg-navy pt-32 pb-20 lg:pt-40 lg:pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h1 className="text-white">{t('about.page.title')}</h1>
          <p className="mt-6 text-xl text-white/70 leading-relaxed">
            {t('about.page.subtitle')}
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
            {t('about.page.intro')}
          </p>
        </div>
      </div>
    </section>
  )
}

function StorySection() {
  const { t } = useLanguage()
  
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <h2 className="text-navy">{t('about.story.title')}</h2>
            <p className="mt-8 text-charcoal/70 text-lg leading-relaxed">
              {t('about.story.p1')}
            </p>
            <p className="mt-6 text-charcoal/70 leading-relaxed">
              {t('about.story.p2')}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <Card className="border-0 bg-navy">
              <CardContent className="p-8 text-center">
                <span className="text-5xl font-serif font-bold text-gold">17+</span>
                <p className="mt-2 text-white/70 text-sm">
                  {t('credibility.since').replace('Since ', '').replace('Od roku ', '')} years
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 bg-off-white">
              <CardContent className="p-8 text-center">
                <span className="text-5xl font-serif font-bold text-navy">11</span>
                <p className="mt-2 text-charcoal/60 text-sm">Countries</p>
              </CardContent>
            </Card>
            <Card className="border-0 bg-off-white">
              <CardContent className="p-8 text-center">
                <span className="text-5xl font-serif font-bold text-navy">100%</span>
                <p className="mt-2 text-charcoal/60 text-sm">Legal Focus</p>
              </CardContent>
            </Card>
            <Card className="border-0 bg-navy">
              <CardContent className="p-8 text-center">
                <Globe2 className="h-10 w-10 text-gold mx-auto" />
                <p className="mt-2 text-white/70 text-sm">Europe & Dubai</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

function DifferenceSection() {
  const { language, t } = useLanguage()
  
  const differences = language === 'en' ? [
    {
      icon: Target,
      title: 'Boutique Approach',
      desc: 'As a specialist firm, we provide personalized attention that larger generalist recruiters cannot match. Every mandate receives senior-level engagement from start to finish.'
    },
    {
      icon: Award,
      title: 'Legal Market Expertise',
      desc: 'Our team brings direct experience and deep knowledge of legal markets across multiple jurisdictions. We understand law firm structures, in-house dynamics, and career progression patterns.'
    },
    {
      icon: Users,
      title: 'Selective Client Portfolio',
      desc: 'We work with a curated group of clients, ensuring we can dedicate proper attention to each mandate. Quality of service, not volume of placements, defines our success.'
    },
    {
      icon: Shield,
      title: 'Trust & Discretion',
      desc: 'Confidentiality is not just a policy—it is fundamental to how we operate. Clients and candidates trust us with sensitive career and hiring decisions.'
    },
    {
      icon: Globe2,
      title: 'International Perspective',
      desc: 'With active presence across Europe and the Middle East, we bring a genuinely international perspective to local and cross-border mandates alike.'
    },
    {
      icon: Clock,
      title: 'Long-term Relationships',
      desc: 'Many of our client relationships span over a decade. We build partnerships, not transactions, investing in understanding your evolving needs over time.'
    }
  ] : [
    {
      icon: Target,
      title: 'Boutique přístup',
      desc: 'Jako specializovaná firma poskytujeme personalizovanou pozornost, kterou větší generalistické agentury nemohou nabídnout. Každý mandát dostává seniorní zapojení od začátku do konce.'
    },
    {
      icon: Award,
      title: 'Expertíza právního trhu',
      desc: 'Náš tým přináší přímé zkušenosti a hluboké znalosti právních trhů napříč jurisdikcemi. Chápeme struktury advokátních kanceláří, in-house dynamiku a kariérní postupy.'
    },
    {
      icon: Users,
      title: 'Selektivní portfolio klientů',
      desc: 'Spolupracujeme s kurátorovanou skupinou klientů, což zajišťuje náležitou pozornost každému mandátu. Kvalita služeb, nikoli objem placementů, definuje náš úspěch.'
    },
    {
      icon: Shield,
      title: 'Důvěra & diskrétnost',
      desc: 'Důvěrnost není jen politika—je základem toho, jak fungujeme. Klienti a kandidáti nám důvěřují s citlivými kariérními a náborovými rozhodnutími.'
    },
    {
      icon: Globe2,
      title: 'Mezinárodní perspektiva',
      desc: 'S aktivní přítomností po celé Evropě a na Blízkém východě přinášíme skutečně mezinárodní perspektivu jak k lokálním, tak k přeshraničním mandátům.'
    },
    {
      icon: Clock,
      title: 'Dlouhodobé vztahy',
      desc: 'Mnoho našich klientských vztahů trvá více než deset let. Budujeme partnerství, ne transakce, investujeme do pochopení vašich vyvíjejících se potřeb v čase.'
    }
  ]
  
  return (
    <section className="bg-off-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-navy text-center">{t('about.difference.title')}</h2>
        
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {differences.map((item, index) => (
            <Card key={index} className="border border-gray-light bg-white">
              <CardContent className="p-8">
                <item.icon className="h-10 w-10 text-gold" />
                <h3 className="mt-5 font-serif text-xl font-medium text-navy">{item.title}</h3>
                <p className="mt-3 text-charcoal/70 leading-relaxed">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

function TeamSection() {
  const { language, t } = useLanguage()
  
  return (
    <section className="bg-navy py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-white">{t('about.team.title')}</h2>
          <p className="mt-6 text-white/70 text-lg leading-relaxed">
            {t('about.team.desc')}
          </p>
          <p className="mt-6 text-white/70 leading-relaxed">
            {language === 'en'
              ? 'Led by experienced professionals with backgrounds in legal practice, HR leadership, and executive search, our team combines the market knowledge and business acumen needed to deliver exceptional results. We maintain a network of trusted advisors and associates across our key markets, ensuring local expertise wherever you need it.'
              : 'Vedeni zkušenými profesionály se zázemím v právní praxi, HR vedení a executive search, náš tým kombinuje tržní znalosti a obchodní prozíravost potřebnou k dosažení výjimečných výsledků. Udržujeme síť důvěryhodných poradců a spolupracovníků na našich klíčových trzích, což zajišťuje místní expertízu kdekoli ji potřebujete.'
            }
          </p>
        </div>
      </div>
    </section>
  )
}

function ValuesSection() {
  const { language } = useLanguage()
  
  const values = language === 'en' ? [
    { title: 'Excellence', desc: 'We set high standards for ourselves and strive to exceed expectations in every engagement.' },
    { title: 'Integrity', desc: 'Honest, transparent communication is the foundation of lasting professional relationships.' },
    { title: 'Discretion', desc: 'We handle sensitive information with the utmost care and confidentiality.' },
    { title: 'Partnership', desc: 'We work alongside clients and candidates as trusted advisors, not transactional service providers.' },
  ] : [
    { title: 'Excelence', desc: 'Nastavujeme si vysoké standardy a snažíme se překonat očekávání v každé spolupráci.' },
    { title: 'Integrita', desc: 'Upřímná, transparentní komunikace je základem trvalých profesionálních vztahů.' },
    { title: 'Diskrétnost', desc: 'S citlivými informacemi nakládáme s maximální péčí a důvěrností.' },
    { title: 'Partnerství', desc: 'Pracujeme po boku klientů a kandidátů jako důvěryhodní poradci, ne transakční poskytovatelé služeb.' },
  ]
  
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-navy text-center">
          {language === 'en' ? 'Our Values' : 'Naše hodnoty'}
        </h2>
        
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-1 bg-gold mx-auto" />
              <h3 className="mt-6 font-serif text-xl font-medium text-navy">{value.title}</h3>
              <p className="mt-4 text-charcoal/60 leading-relaxed">{value.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTASection() {
  const { language } = useLanguage()
  
  return (
    <section className="bg-off-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-navy">
          {language === 'en' ? 'Ready to Start a Conversation?' : 'Připraveni zahájit rozhovor?'}
        </h2>
        <p className="mt-4 text-charcoal/70 text-lg max-w-2xl mx-auto">
          {language === 'en'
            ? 'Whether you\'re a potential client or candidate, we\'d be delighted to discuss how we might work together.'
            : 'Ať už jste potenciální klient nebo kandidát, rádi s vámi projednáme, jak bychom mohli spolupracovat.'
          }
        </p>
        <Button 
          asChild 
          size="lg"
          className="mt-10 bg-gold hover:bg-gold-hover text-white"
        >
          <Link href="/contact">
            {language === 'en' ? 'Get in Touch' : 'Kontaktujte nás'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  )
}

function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <PageHeader />
        <IntroSection />
        <StorySection />
        <DifferenceSection />
        <TeamSection />
        <ValuesSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}

export default function Page() {
  return (
    <LanguageProvider>
      <AboutPage />
    </LanguageProvider>
  )
}
