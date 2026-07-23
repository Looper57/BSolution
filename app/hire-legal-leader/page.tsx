'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Check, Shield, Users, Target, AlertTriangle, Clock } from 'lucide-react'
import { LanguageProvider, useLanguage } from '@/lib/language-context'

function HireLegalLeaderContent() {
  const { language } = useLanguage()
  
  return (
    <>
      {/* Minimal Header - Logo only */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-navy/95 backdrop-blur-sm">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-5">
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="w-8 h-8 border border-gold/40 flex items-center justify-center">
              <span className="text-gold font-serif text-[14px]">B</span>
            </div>
            <span className="text-white text-[15px] font-light tracking-[0.08em]">
              B Solution
            </span>
          </Link>
        </div>
      </header>

      <main>
        {/* HERO SECTION */}
        <section className="relative min-h-[100svh] flex items-center bg-navy overflow-hidden">
          {/* Background image with overlay */}
          <Image
            src="/images/hero-background.png"
            alt=""
            fill
            className="object-cover object-center opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/60 via-navy/40 to-navy" />
          
          <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 lg:px-12 pt-32 pb-20 lg:pt-40 lg:pb-28">
            <div className="max-w-3xl">
              {/* Headline */}
              <h1 className="text-white text-[clamp(2.25rem,5.5vw,4rem)] font-serif font-normal leading-[1.08] tracking-[-0.02em]">
                {language === 'en' 
                  ? 'Hire a Head of Legal Who Can Actually Lead — Not Just Advise'
                  : 'Najměte Head of Legal, který dokáže vést — ne jen radit'}
              </h1>
              
              {/* Subheadline */}
              <p className="mt-8 lg:mt-10 text-white/75 text-[18px] lg:text-[20px] leading-[1.7] max-w-2xl">
                {language === 'en'
                  ? 'Avoid costly hiring mistakes. We deliver proven legal leaders trusted in complex international environments.'
                  : 'Vyhněte se nákladným náborovým chybám. Dodáváme ověřené právní lídry důvěryhodné v komplexních mezinárodních prostředích.'}
              </p>
              
              {/* Trust line */}
              <p className="mt-6 text-gold/80 text-[14px] tracking-[0.02em]">
                {language === 'en'
                  ? 'Trusted by corporate legal teams and leading law firms since 2007.'
                  : 'Důvěřují nám právní týmy korporací a přední advokátní kanceláře od roku 2007.'}
              </p>
              
              {/* CTAs */}
              <div className="mt-12 lg:mt-14 flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/contact"
                  className="inline-flex items-center justify-center px-10 py-5 bg-gold hover:bg-gold-light text-navy text-[12px] font-semibold uppercase tracking-[0.12em] transition-all duration-300"
                >
                  {language === 'en' ? 'Discuss Your Hiring Needs (Confidential)' : 'Projednejte vaše náborové potřeby (důvěrně)'}
                  <ArrowRight className="ml-3 h-4 w-4" />
                </Link>
                <Link 
                  href="/contact"
                  className="inline-flex items-center justify-center px-10 py-5 border border-white/25 text-white hover:border-white/40 hover:text-white text-[12px] font-semibold uppercase tracking-[0.12em] transition-all duration-300"
                >
                  {language === 'en' ? 'Speak to Us' : 'Kontaktujte nás'}
                </Link>
              </div>
            </div>
          </div>
          
          {/* Scroll indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-3 z-20">
            <div className="w-px h-12 bg-gradient-to-b from-white/30 to-transparent" />
          </div>
        </section>

        {/* RISK SECTION */}
        <section className="bg-cream py-24 md:py-32 lg:py-40">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
            <div className="max-w-3xl mx-auto text-center">
              {/* Divider */}
              <div className="flex justify-center mb-12">
                <div className="w-16 h-px bg-gold/40" />
              </div>
              
              <h2 className="text-navy text-[clamp(1.75rem,4vw,2.75rem)] font-serif leading-[1.15]">
                {language === 'en'
                  ? 'A Wrong Legal Hire Is Expensive'
                  : 'Špatný právní nábor je drahý'}
              </h2>
            </div>
            
            {/* Risk bullets */}
            <div className="mt-16 lg:mt-20 grid md:grid-cols-2 gap-8 lg:gap-10 max-w-4xl mx-auto">
              {(language === 'en' ? [
                'Delayed decisions can impact business performance',
                'Weak legal leadership slows growth and increases risk',
                'Replacing the wrong hire often takes 6–12 months',
                'The best candidates are rarely actively looking'
              ] : [
                'Opožděná rozhodnutí mohou ovlivnit výkonnost firmy',
                'Slabé právní vedení zpomaluje růst a zvyšuje riziko',
                'Nahrazení špatného náboru často trvá 6–12 měsíců',
                'Nejlepší kandidáti aktivně práci většinou nehledají'
              ]).map((point, index) => (
                <div key={index} className="flex items-start gap-5">
                  <div className="flex-shrink-0 w-2 h-2 mt-2.5 bg-gold/60 rounded-full" />
                  <p className="text-gray-600 text-[16px] lg:text-[17px] leading-[1.7]">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DELIVERY SECTION */}
        <section className="bg-white py-20 md:py-24 lg:py-28">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 border border-gold/30 bg-cream/50 mb-8">
                <Clock className="h-7 w-7 text-gold" strokeWidth={1.5} />
              </div>
              
              <h2 className="text-navy text-[clamp(1.5rem,3.5vw,2.25rem)] font-serif leading-[1.2]">
                {language === 'en' ? 'Fast and Targeted Delivery' : 'Rychlé a cílené dodání'}
              </h2>
              
              <p className="mt-6 text-gray-600 text-[17px] lg:text-[18px] leading-[1.8]">
                {language === 'en'
                  ? 'We run each mandate with a focused market map, direct candidate outreach, and rigorous assessment tailored to the role.'
                  : 'Každý mandát vedeme pomocí cíleného mapování trhu, přímého oslovení kandidátů a důsledného hodnocení přizpůsobeného dané roli.'}
              </p>
            </div>
          </div>
        </section>

        {/* LAW FIRMS CREDIBILITY SECTION */}
        <section className="bg-navy py-24 md:py-32 lg:py-36 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[50%] h-[50%]" style={{ background: 'radial-gradient(ellipse at top right, rgba(176, 141, 87, 0.06) 0%, transparent 60%)' }} />
          
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
              <div>
                <h2 className="text-white text-[clamp(1.75rem,4vw,2.5rem)] font-serif leading-[1.15]">
                  {language === 'en' ? 'Trusted by Leading Law Firms' : 'Důvěřují nám přední advokátní kanceláře'}
                </h2>
                <p className="mt-8 text-white/60 text-[17px] leading-[1.8]">
                  {language === 'en'
                    ? 'We work with some of the largest law firms in the region and globally, many of which are consistently ranked in Legal 500 and other top-tier legal directories.'
                    : 'Spolupracujeme s některými z největších advokátních kanceláří v regionu i globálně, z nichž mnohé jsou pravidelně hodnoceny v Legal 500 a dalších špičkových právních žebříčcích.'}
                </p>
              </div>
              
              <div className="bg-white/[0.04] border border-white/10 p-10 lg:p-12">
                <h2 className="text-white text-[clamp(1.5rem,3.5vw,2rem)] font-serif leading-[1.2]">
                  {language === 'en' ? 'Partnering with Global Companies' : 'Partnerství s globálními společnostmi'}
                </h2>
                <p className="mt-6 text-white/55 text-[16px] leading-[1.8]">
                  {language === 'en'
                    ? 'We partner with leading companies across pharmaceuticals, banking, technology, and real estate development, supporting both high-growth businesses and multinational corporations in building strong legal leadership teams.'
                    : 'Spolupracujeme s předními společnostmi ve farmacii, bankovnictví, technologiích a developerství, podporujeme jak rychle rostoucí firmy, tak nadnárodní korporace při budování silných právních lídrů.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SOLUTION SECTION */}
        <section className="bg-cream py-24 md:py-32 lg:py-40">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
            <div className="max-w-3xl mx-auto text-center">
              <div className="flex justify-center mb-12">
                <div className="w-16 h-px bg-gold/40" />
              </div>
              
              <h2 className="text-navy text-[clamp(1.75rem,4vw,2.75rem)] font-serif leading-[1.15]">
                {language === 'en'
                  ? 'We Deliver the Right Legal Leaders — Discreetly and Efficiently'
                  : 'Dodáváme správné právní lídry — diskrétně a efektivně'}
              </h2>
              
              <p className="mt-10 text-gray-600 text-[17px] lg:text-[18px] leading-[1.85]">
                {language === 'en'
                  ? 'We specialize in executive search for senior legal roles including General Counsel, Head of Legal, and Legal Directors. Our process is confidential, tailored, and focused on long-term success.'
                  : 'Specializujeme se na executive search pro seniorní právní role včetně General Counsel, Head of Legal a Legal Directors. Náš proces je důvěrný, přizpůsobený a zaměřený na dlouhodobý úspěch.'}
              </p>
            </div>
          </div>
        </section>

        {/* OUTCOME SECTION */}
        <section className="bg-white py-24 md:py-32 lg:py-40">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
            <div className="text-center mb-16 lg:mb-20">
              <div className="flex justify-center mb-10">
                <div className="w-16 h-px bg-gold/40" />
              </div>
              <h2 className="text-navy text-[clamp(1.75rem,4vw,2.5rem)] font-serif leading-[1.15]">
                {language === 'en' ? 'What You Can Expect' : 'Co můžete očekávat'}
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 lg:gap-10 max-w-4xl mx-auto">
              {(language === 'en' ? [
                'A focused search designed around the mandate',
                'Access to top-tier candidates not actively on the market',
                'Fully confidential and discreet process',
                'Long-term hiring success, not just placement'
              ] : [
                'Cílené vyhledávání navržené podle konkrétního mandátu',
                'Přístup ke špičkovým kandidátům, kteří aktivně nehledají',
                'Plně důvěrný a diskrétní proces',
                'Dlouhodobý náborový úspěch, ne jen umístění'
              ]).map((point, index) => (
                <div key={index} className="flex items-start gap-5 bg-cream/50 p-6 lg:p-8 border border-gray-100">
                  <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-gold/10 border border-gold/20">
                    <Check className="h-4 w-4 text-gold" strokeWidth={2.5} />
                  </div>
                  <p className="text-navy text-[16px] lg:text-[17px] leading-[1.6] font-medium">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS SECTION */}
        <section className="bg-cream py-24 md:py-32 lg:py-40">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
            <div className="text-center mb-16 lg:mb-20">
              <div className="flex justify-center mb-10">
                <div className="w-16 h-px bg-gold/40" />
              </div>
              <h2 className="text-navy text-[clamp(1.75rem,4vw,2.5rem)] font-serif leading-[1.15]">
                {language === 'en' ? 'How It Works' : 'Jak to funguje'}
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
              {(language === 'en' ? [
                { step: '01', title: 'Initial consultation', desc: 'We understand your requirements and hiring context' },
                { step: '02', title: 'Targeted search', desc: 'We identify and approach the most relevant candidates' },
                { step: '03', title: 'Curated shortlist', desc: 'You receive a carefully selected group of top candidates' },
                { step: '04', title: 'Successful placement', desc: 'We support the process through to completion' }
              ] : [
                { step: '01', title: 'Úvodní konzultace', desc: 'Porozumíme vašim požadavkům a kontextu náboru' },
                { step: '02', title: 'Cílené vyhledávání', desc: 'Identifikujeme a oslovíme nejrelevantnější kandidáty' },
                { step: '03', title: 'Kurátorovaný shortlist', desc: 'Obdržíte pečlivě vybranou skupinu špičkových kandidátů' },
                { step: '04', title: 'Úspěšné obsazení', desc: 'Podporujeme proces až do jeho dokončení' }
              ]).map((item, index) => (
                <div key={index} className="relative">
                  {/* Connector line */}
                  {index < 3 && (
                    <div className="hidden lg:block absolute top-8 left-[calc(100%+8px)] w-[calc(100%-32px)] h-px bg-gold/20" />
                  )}
                  
                  <div className="text-center lg:text-left">
                    <div className="inline-flex items-center justify-center w-16 h-16 border border-gold/30 bg-white mb-6">
                      <span className="text-gold text-[14px] font-serif">{item.step}</span>
                    </div>
                    <h3 className="text-navy text-[18px] font-serif mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 text-[15px] leading-[1.7]">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA SECTION */}
        <section className="bg-navy py-28 md:py-36 lg:py-44 relative overflow-hidden">
          {/* Subtle gold glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%]" style={{ background: 'radial-gradient(ellipse at center, rgba(176, 141, 87, 0.05) 0%, transparent 60%)' }} />
          
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative">
            <div className="flex justify-center mb-14">
              <div className="w-16 h-px bg-gold/30" />
            </div>
            
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-white text-[clamp(2rem,4.5vw,3rem)] font-serif leading-[1.15]">
                {language === 'en' ? 'Need to Hire a Legal Leader?' : 'Potřebujete najít právního lídra?'}
              </h2>
              
              <p className="mt-8 text-white/55 text-[18px] leading-[1.8]">
                {language === 'en'
                  ? "Let's discuss your hiring needs in confidence."
                  : 'Probereme vaše náborové potřeby důvěrně.'}
              </p>
              
              <Link 
                href="/contact"
                className="inline-flex items-center justify-center mt-12 px-12 py-5 bg-gold hover:bg-gold-light text-navy text-[12px] font-semibold uppercase tracking-[0.12em] transition-all duration-300"
              >
                {language === 'en' ? 'Discuss Your Hiring Needs (Confidential)' : 'Projednejte vaše náborové potřeby (důvěrně)'}
                <ArrowRight className="ml-3 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Minimal Footer */}
      <footer className="bg-navy-deep py-12">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="w-7 h-7 border border-gold/30 flex items-center justify-center">
                <span className="text-gold font-serif text-[12px]">B</span>
              </div>
              <span className="text-white/60 text-[13px] tracking-[0.06em]">
                B Solution
              </span>
            </Link>
            
            <p className="text-white/30 text-[12px]">
              © {new Date().getFullYear()} B Solution s.r.o. {language === 'en' ? 'All rights reserved.' : 'Všechna práva vyhrazena.'}
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default function Page() {
  return (
    <LanguageProvider>
      <HireLegalLeaderContent />
    </LanguageProvider>
  )
}
