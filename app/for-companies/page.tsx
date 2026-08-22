'use client'

import Link from 'next/link'
import { ArrowRight, Briefcase, Building2, Globe, Users, Shield, Target, CheckCircle } from 'lucide-react'
import { LanguageProvider, useLanguage } from '@/lib/language-context'
import { HeroBackgroundImage } from '@/components/hero-background-image'

function ForCompaniesContent() {
  const { language } = useLanguage()
  
  const ctaPrimary = language === 'en' ? 'Find Talent' : 'Najít talent'
  const ctaSecondary = language === 'en' ? 'Hire Us' : 'Najmout nás'
  
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
          <HeroBackgroundImage
            fill
            className="object-cover object-center opacity-35"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/70 via-navy/50 to-navy" />
          
          <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 lg:px-12 pt-32 pb-20 lg:pt-40 lg:pb-28">
            <div className="max-w-3xl">
              {/* Headline */}
              <h1 className="text-white text-[clamp(2.5rem,6vw,4.25rem)] font-serif font-normal leading-[1.08] tracking-[-0.02em]">
                {language === 'en' 
                  ? 'Legal Executive Search for Corporate Legal Departments'
                  : 'Najměte špičkové právní talenty pro vaši firmu'}
              </h1>
              
              {/* Subheadline */}
              <p className="mt-8 lg:mt-10 text-white/70 text-[18px] lg:text-[20px] leading-[1.7] max-w-2xl">
                {language === 'en'
                  ? 'We support corporate legal departments and financial institutions with confidential searches from Senior Counsel to General Counsel.'
                  : 'Pomáháme firmám v Evropě a na Blízkém východě najímat výjimečné právní profesionály — od Senior Counsel po General Counsel.'}
              </p>
              
              {/* Trust line */}
              <p className="mt-6 text-gold/80 text-[14px] tracking-[0.02em]">
                {language === 'en'
                  ? 'Trusted by corporate clients since 2007.'
                  : 'Důvěřují nám firemní klienti od roku 2007.'}
              </p>
              
              {/* CTAs */}
              <div className="mt-12 lg:mt-14 flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/contact"
                  className="inline-flex items-center justify-center px-10 py-5 bg-gold hover:bg-gold-light text-navy text-[12px] font-semibold uppercase tracking-[0.14em] transition-all duration-300"
                >
                  {ctaPrimary}
                  <ArrowRight className="ml-3 h-4 w-4" />
                </Link>
                <Link 
                  href="/contact"
                  className="inline-flex items-center justify-center px-10 py-5 border border-white/25 text-white hover:border-white/40 hover:text-white text-[12px] font-semibold uppercase tracking-[0.14em] transition-all duration-300"
                >
                  {ctaSecondary}
                </Link>
              </div>
            </div>
          </div>
          
          {/* Scroll indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-3 z-20">
            <div className="w-px h-12 bg-gradient-to-b from-white/30 to-transparent" />
          </div>
        </section>

        {/* CLIENT TYPES SECTION */}
        <section className="bg-white py-24 md:py-32 lg:py-40">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
            <div className="text-center mb-16 lg:mb-20">
              <div className="flex justify-center mb-10">
                <div className="w-16 h-px bg-gold/40" />
              </div>
              <h2 className="text-navy text-[clamp(1.75rem,4vw,2.75rem)] font-serif leading-[1.15]">
                {language === 'en' ? 'Who We Work With' : 'S kým spolupracujeme'}
              </h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
              {(language === 'en' ? [
                { 
                  icon: Building2, 
                  title: 'Corporate Legal Departments', 
                  desc: 'We support in-house legal teams in hiring senior legal professionals aligned with business strategy.' 
                },
                { 
                  icon: Briefcase, 
                  title: 'Fast-growing Companies', 
                  desc: 'We help scaling businesses build strong legal foundations with the right hires.' 
                },
                { 
                  icon: Globe, 
                  title: 'Multinational Corporations', 
                  desc: 'We deliver cross-border legal talent across multiple jurisdictions.' 
                }
              ] : [
                { 
                  icon: Building2, 
                  title: 'Firemní právní oddělení', 
                  desc: 'Podporujeme in-house právní týmy při najímání seniorních právních profesionálů v souladu s obchodní strategií.' 
                },
                { 
                  icon: Briefcase, 
                  title: 'Rychle rostoucí firmy', 
                  desc: 'Pomáháme expandujícím firmám budovat pevné právní základy správným náborem.' 
                },
                { 
                  icon: Globe, 
                  title: 'Nadnárodní korporace', 
                  desc: 'Dodáváme přeshraniční právní talenty v mnoha jurisdikcích.' 
                }
              ]).map((item, index) => (
                <div key={index} className="bg-cream/50 p-10 lg:p-12 border border-gray-100">
                  <div className="flex justify-start mb-6">
                    <div className="w-14 h-14 flex items-center justify-center border border-gold/20 bg-white">
                      <item.icon className="h-6 w-6 text-gold" strokeWidth={1.5} />
                    </div>
                  </div>
                  <h3 className="text-navy text-[20px] lg:text-[22px] font-serif mb-4">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-[15px] leading-[1.75]">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ROLES WE PLACE SECTION */}
        <section className="bg-navy py-24 md:py-32 lg:py-40 relative overflow-hidden">
          {/* Subtle gold glow */}
          <div className="absolute top-0 right-0 w-[50%] h-[50%]" style={{ background: 'radial-gradient(ellipse at top right, rgba(176, 141, 87, 0.06) 0%, transparent 60%)' }} />
          
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
              <div>
                <div className="flex justify-start mb-10">
                  <div className="w-16 h-px bg-gold/40" />
                </div>
                <h2 className="text-white text-[clamp(1.75rem,4vw,2.75rem)] font-serif leading-[1.15]">
                  {language === 'en' ? 'Key Roles We Cover' : 'Klíčové role, které pokrýváme'}
                </h2>
                <p className="mt-8 text-white/50 text-[17px] leading-[1.8]">
                  {language === 'en'
                    ? 'We specialize in executive search for senior legal positions that drive business success.'
                    : 'Specializujeme se na executive search pro seniorní právní pozice, které pohánějí obchodní úspěch.'}
                </p>
                
                <Link 
                  href="/contact"
                  className="inline-flex items-center justify-center mt-10 px-10 py-4 bg-gold hover:bg-gold-light text-navy text-[11px] font-semibold uppercase tracking-[0.14em] transition-all duration-300"
                >
                  {ctaPrimary}
                  <ArrowRight className="ml-3 h-4 w-4" />
                </Link>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                {(language === 'en' ? [
                  'General Counsel',
                  'Head of Legal',
                  'Legal Director',
                  'Senior Legal Counsel',
                  'Compliance Leaders',
                  'Specialized Legal Experts'
                ] : [
                  'General Counsel',
                  'Head of Legal',
                  'Legal Director',
                  'Senior Legal Counsel',
                  'Compliance Leaders',
                  'Specializovaní právní experti'
                ]).map((role, index) => (
                  <div key={index} className="flex items-center gap-4 p-5 bg-white/[0.03] border border-white/5">
                    <CheckCircle className="h-5 w-5 text-gold flex-shrink-0" strokeWidth={1.5} />
                    <span className="text-white/80 text-[15px]">{role}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* VALUE PROPOSITION SECTION */}
        <section className="bg-cream py-24 md:py-32 lg:py-40">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
            <div className="text-center mb-16 lg:mb-20">
              <div className="flex justify-center mb-10">
                <div className="w-16 h-px bg-gold/40" />
              </div>
              <h2 className="text-navy text-[clamp(1.75rem,4vw,2.75rem)] font-serif leading-[1.15]">
                {language === 'en' ? 'Why Companies Choose Us' : 'Proč si nás firmy vybírají'}
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {(language === 'en' ? [
                'Legal Executive Search since 2007',
                'Strong network across Europe and the Middle East',
                'Access to passive, high-quality candidates',
                'Discreet and confidential search process',
                'Tailored approach for each client'
              ] : [
                'Legal Executive Search od roku 2007',
                'Silná síť v Evropě a na Blízkém východě',
                'Přístup k pasivním, vysoce kvalitním kandidátům',
                'Diskrétní a důvěrný vyhledávací proces',
                'Přizpůsobený přístup pro každého klienta'
              ]).map((point, index) => (
                <div key={index} className="flex items-start gap-5 bg-white p-8 border border-gray-100">
                  <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center border border-gold/30">
                    <span className="text-gold text-[11px] font-medium">{String(index + 1).padStart(2, '0')}</span>
                  </div>
                  <p className="text-navy text-[16px] lg:text-[17px] leading-[1.6] font-medium">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS SECTION */}
        <section className="bg-white py-24 md:py-32 lg:py-40">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
            <div className="text-center mb-16 lg:mb-20">
              <div className="flex justify-center mb-10">
                <div className="w-16 h-px bg-gold/40" />
              </div>
              <h2 className="text-navy text-[clamp(1.75rem,4vw,2.75rem)] font-serif leading-[1.15]">
                {language === 'en' ? 'Our Process' : 'Náš proces'}
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6">
              {(language === 'en' ? [
                { step: '01', title: 'Understanding your needs', desc: 'We define the role, requirements, and expectations' },
                { step: '02', title: 'Targeted search', desc: 'We identify and approach relevant candidates' },
                { step: '03', title: 'Candidate selection', desc: 'We present a curated shortlist' },
                { step: '04', title: 'Successful placement', desc: 'We support the hiring process end-to-end' }
              ] : [
                { step: '01', title: 'Pochopení vašich potřeb', desc: 'Definujeme roli, požadavky a očekávání' },
                { step: '02', title: 'Cílené vyhledávání', desc: 'Identifikujeme a oslovíme relevantní kandidáty' },
                { step: '03', title: 'Výběr kandidátů', desc: 'Představíme kurátorovaný shortlist' },
                { step: '04', title: 'Úspěšné obsazení', desc: 'Podporujeme náborový proces od začátku do konce' }
              ]).map((item, index) => (
                <div key={index} className="relative">
                  {/* Connector line */}
                  {index < 3 && (
                    <div className="hidden lg:block absolute top-10 left-[calc(100%+8px)] w-[calc(100%-40px)] h-px bg-gold/20" />
                  )}
                  
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 border border-gold/30 bg-cream/50 mb-8">
                      <span className="text-gold text-[18px] font-serif">{item.step}</span>
                    </div>
                    <h3 className="text-navy text-[18px] lg:text-[20px] font-serif mb-4">
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

        {/* SOCIAL PROOF SECTION */}
        <section className="bg-cream py-24 md:py-32 lg:py-40">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
            <div className="max-w-3xl mx-auto text-center">
              <div className="flex justify-center mb-10">
                <div className="w-16 h-px bg-gold/40" />
              </div>
              <h2 className="text-navy text-[clamp(1.75rem,4vw,2.5rem)] font-serif leading-[1.15]">
                {language === 'en' ? 'Proven Track Record' : 'Prokázané výsledky'}
              </h2>
              <p className="mt-10 text-gray-600 text-[17px] lg:text-[18px] leading-[1.85]">
                {language === 'en'
                  ? 'We have successfully supported companies across industries in hiring top-tier legal professionals, including leadership roles in international environments.'
                  : 'Úspěšně jsme podpořili firmy napříč odvětvími při najímání špičkových právních profesionálů, včetně vedoucích rolí v mezinárodním prostředí.'}
              </p>
              
              <div className="mt-14 flex flex-wrap justify-center gap-12 lg:gap-20">
                {(language === 'en' ? [
                  { icon: Shield, label: 'Since 2007' },
                  { icon: Users, label: 'International Placements' },
                  { icon: Target, label: 'Discreet & Confidential' }
                ] : [
                  { icon: Shield, label: 'Od roku 2007' },
                  { icon: Users, label: 'Mezinárodní umístění' },
                  { icon: Target, label: 'Diskrétní a důvěrné' }
                ]).map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <item.icon className="h-5 w-5 text-gold" strokeWidth={1.5} />
                    <span className="text-navy text-[14px] font-medium tracking-[0.02em]">{item.label}</span>
                  </div>
                ))}
              </div>
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
                {language === 'en' ? 'Looking to Hire Legal Talent?' : 'Hledáte právní talenty?'}
              </h2>
              
              <p className="mt-8 text-white/50 text-[18px] leading-[1.8]">
                {language === 'en'
                  ? "Let's discuss your hiring needs."
                  : 'Probereme vaše náborové potřeby.'}
              </p>
              
              <div className="mt-12 flex flex-col sm:flex-row gap-5 justify-center">
                <Link 
                  href="/contact"
                  className="inline-flex items-center justify-center px-12 py-5 bg-gold hover:bg-gold-light text-navy text-[12px] font-semibold uppercase tracking-[0.14em] transition-all duration-300"
                >
                  {ctaPrimary}
                  <ArrowRight className="ml-3 h-4 w-4" />
                </Link>
                <Link 
                  href="/contact"
                  className="inline-flex items-center justify-center px-12 py-5 border border-white/20 text-white/85 hover:border-white/40 hover:text-white text-[12px] font-semibold uppercase tracking-[0.14em] transition-all duration-300"
                >
                  {ctaSecondary}
                </Link>
              </div>
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
      <ForCompaniesContent />
    </LanguageProvider>
  )
}
