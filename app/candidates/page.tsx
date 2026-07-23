"use client"

import Link from 'next/link'
import { ArrowRight, Shield, Users, Briefcase, Globe2, Lock, Heart, Star, CheckCircle } from 'lucide-react'
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
  
  const features = language === 'en' ? [
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
  ]
  
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
  
  const lawFirmRoles = language === 'en'
    ? ['Associate positions across practice areas', 'Senior associate and counsel roles', 'Partner and managing partner opportunities', 'Practice group leadership positions', 'International secondments and transfers']
    : ['Advokátní pozice napříč oblastmi praxe', 'Senior advokát a counsel pozice', 'Partnerské a managing partner příležitosti', 'Vedoucí pozice praxí', 'Mezinárodní stáže a transfery']
  
  const inHouseRoles = language === 'en'
    ? ['Junior to senior legal counsel roles', 'Head of legal positions', 'General counsel and CLO appointments', 'Compliance and governance leadership', 'Regional legal director roles']
    : ['Junior až senior legal counsel pozice', 'Head of legal pozice', 'General counsel a CLO jmenování', 'Compliance a governance vedení', 'Regionální právní ředitelské pozice']
  
  return (
    <section className="bg-off-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-navy text-center">
          {language === 'en' ? 'Types of Opportunities' : 'Typy příležitostí'}
        </h2>
        <p className="mt-4 text-center text-charcoal/60 max-w-2xl mx-auto">
          {language === 'en'
            ? 'We work on mandates across private practice and in-house environments throughout Europe and Dubai.'
            : 'Pracujeme na mandátech v advokacii i in-house prostředí po celé Evropě a v Dubaji.'
          }
        </p>
        
        <div className="mt-16 grid md:grid-cols-2 gap-8">
          {/* Law Firms */}
          <Card className="border-0 shadow-lg bg-navy">
            <CardContent className="p-8 lg:p-10">
              <Briefcase className="h-10 w-10 text-gold" />
              <h2 className="mt-6 text-white font-serif text-xl font-medium">
                {language === 'en' ? 'Law Firm Opportunities' : 'Příležitosti v advokátních kancelářích'}
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
                {language === 'en' ? 'In-House Opportunities' : 'In-house příležitosti'}
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
  
  const steps = language === 'en' ? [
    { num: '01', title: 'Initial Conversation', desc: 'We start with a confidential discussion to understand your background, career aspirations, and what you\'re looking for in your next role.' },
    { num: '02', title: 'Opportunity Matching', desc: 'Based on your profile, we identify relevant opportunities from our current mandates or keep you in mind for future searches.' },
    { num: '03', title: 'Introduction & Support', desc: 'When a suitable opportunity arises, we facilitate introductions and support you throughout the interview and negotiation process.' },
    { num: '04', title: 'Long-term Relationship', desc: 'Whether or not an immediate opportunity materializes, we maintain the relationship for future career moves.' },
  ] : [
    { num: '01', title: 'Úvodní rozhovor', desc: 'Začínáme důvěrnou diskusí k pochopení vašeho zázemí, kariérních aspirací a toho, co hledáte ve své další roli.' },
    { num: '02', title: 'Párování příležitostí', desc: 'Na základě vašeho profilu identifikujeme relevantní příležitosti z našich aktuálních mandátů nebo vás máme v paměti pro budoucí vyhledávání.' },
    { num: '03', title: 'Představení & podpora', desc: 'Když se objeví vhodná příležitost, zprostředkujeme představení a podporujeme vás během celého pohovorového a vyjednávacího procesu.' },
    { num: '04', title: 'Dlouhodobý vztah', desc: 'Bez ohledu na to, zda se okamžitá příležitost naplní, udržujeme vztah pro budoucí kariérní kroky.' },
  ]
  
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-navy text-center">
          {language === 'en' ? 'How We Work With Candidates' : 'Jak pracujeme s kandidáty'}
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

function TestimonialsSection() {
  const { language } = useLanguage()
  
  const testimonials = language === 'en' ? [
    { quote: 'B Solution understood exactly what I was looking for and connected me with an opportunity I would never have found on my own.', role: 'Senior Associate, relocated to London' },
    { quote: 'The discretion and professionalism throughout the process gave me confidence to explore a significant career change.', role: 'Now General Counsel, formerly Partner' },
    { quote: 'They took time to understand my long-term goals, not just my immediate needs. That made all the difference.', role: 'Head of Legal, Technology sector' },
  ] : [
    { quote: 'B Solution přesně pochopili, co hledám, a spojili mě s příležitostí, kterou bych nikdy sám nenašel.', role: 'Senior Advokát, přestěhoval se do Londýna' },
    { quote: 'Diskrétnost a profesionalita během celého procesu mi daly jistotu prozkoumat významnou kariérní změnu.', role: 'Nyní General Counsel, dříve Partner' },
    { quote: 'Věnovali čas pochopení mých dlouhodobých cílů, nejen okamžitých potřeb. To udělalo velký rozdíl.', role: 'Head of Legal, Technologický sektor' },
  ]
  
  return (
    <section className="bg-navy py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-white text-center">
          {language === 'en' ? 'What Candidates Say' : 'Co říkají kandidáti'}
        </h2>
        
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 bg-white/5 backdrop-blur">
              <CardContent className="p-8">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-gold fill-gold" />
                  ))}
                </div>
                <p className="mt-6 text-white/80 italic leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <p className="mt-6 text-gold text-sm font-medium">{testimonial.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTASection() {
  const { language, t } = useLanguage()
  
  return (
    <section className="bg-off-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <Users className="h-12 w-12 text-gold mx-auto" />
          <h2 className="mt-6 text-navy">
            {language === 'en' ? 'Ready to Explore New Opportunities?' : 'Připraveni prozkoumat nové příležitosti?'}
          </h2>
          <p className="mt-4 text-charcoal/70 text-lg">
            {language === 'en'
              ? 'Contact us confidentially to discuss your career aspirations. We respond to all inquiries within 48 hours.'
              : 'Kontaktujte nás důvěrně k projednání vašich kariérních aspirací. Na všechny dotazy odpovídáme do 48 hodin.'
            }
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild 
              size="lg"
              className="bg-gold hover:bg-gold-hover text-white"
            >
              <Link href="/contact">
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
              <Link href="/positions">
                {language === 'en' ? 'View Open Positions' : 'Zobrazit volné pozice'}
              </Link>
            </Button>
          </div>
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
        <TestimonialsSection />
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
