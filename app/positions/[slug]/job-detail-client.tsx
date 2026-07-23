"use client"

import Link from 'next/link'
import { ArrowLeft, MapPin, Building2, Briefcase, ChevronRight, Mail, Phone } from 'lucide-react'
import { LanguageProvider, useLanguage } from '@/lib/language-context'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import type { Job } from '@/lib/jobs-data'
import { localizedPath } from '@/lib/i18n/config'

function JobDetailContent({ job }: { job: Job }) {
  const { language: locale } = useLanguage()
  const language = locale === 'cs' ? 'cs' : 'en'
  
  const title = language === 'en' ? job.title : job.titleCs
  const location = language === 'en' ? job.location : job.locationCs
  const industry = language === 'en' ? job.industry : job.industryCs
  const description = language === 'en' ? job.fullDescription : job.fullDescriptionCs
  const responsibilities = language === 'en' ? job.responsibilities : job.responsibilitiesCs
  const requirements = language === 'en' ? job.requirements : job.requirementsCs
  
  const typeLabel = job.type === 'inhouse' 
    ? (language === 'en' ? 'Corporate / In-house' : 'Korporát / In-house')
    : (language === 'en' ? 'Law Firm' : 'Advokátní kancelář')
  
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-navy pt-40 pb-20 lg:pt-48 lg:pb-28">
          <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
            {/* Back Link */}
            <Link 
              href={localizedPath(locale, '/positions')}
              className="inline-flex items-center text-white/40 hover:text-gold text-[12px] uppercase tracking-[0.12em] mb-14 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {language === 'en' ? 'All Opportunities' : 'Všechny příležitosti'}
            </Link>
            
            <div className="max-w-3xl">
              {/* Type Badge */}
              <span className="inline-block text-gold text-[10px] font-semibold uppercase tracking-[0.25em] mb-6">
                {typeLabel}
              </span>
              
              <h1 className="text-white text-[clamp(2rem,5vw,3.5rem)] font-serif leading-[1.1]">
                {title}
              </h1>
              
              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-8 mt-10 text-white/50 text-[14px]">
                <span className="flex items-center gap-2.5">
                  <MapPin className="h-4 w-4 text-gold/70" />
                  {location}
                </span>
                <span className="flex items-center gap-2.5">
                  <Building2 className="h-4 w-4 text-gold/70" />
                  {industry}
                </span>
                <span className="flex items-center gap-2.5">
                  <Briefcase className="h-4 w-4 text-gold/70" />
                  {job.level}
                </span>
              </div>
              
              {/* Reference Code */}
              <div className="mt-6 text-white/30 text-[12px] uppercase tracking-[0.1em]">
                {language === 'en' ? 'Reference' : 'Reference'}: {job.referenceCode}
              </div>
            </div>
          </div>
        </section>
        
        {/* Main Content */}
        <section className="bg-white py-24 lg:py-32">
          <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
            <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">
              {/* Main Content */}
              <div className="lg:col-span-7">
                {/* Description */}
                <div className="mb-16">
                  <h2 className="text-navy text-2xl font-serif mb-8">
                    {language === 'en' ? 'About the Role' : 'O pozici'}
                  </h2>
                  <p className="text-gray-600 text-[17px] leading-[1.9]">
                    {description}
                  </p>
                </div>
                
                {/* Responsibilities */}
                <div className="mb-16">
                  <h2 className="text-navy text-2xl font-serif mb-8">
                    {language === 'en' ? 'Key Responsibilities' : 'Hlavní odpovědnosti'}
                  </h2>
                  <ul className="space-y-5">
                    {responsibilities.map((item, index) => (
                      <li key={index} className="flex items-start gap-5 text-gray-600 text-[16px] leading-[1.85]">
                        <span className="w-1.5 h-1.5 bg-gold flex-shrink-0 mt-3" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Requirements */}
                <div>
                  <h2 className="text-navy text-2xl font-serif mb-8">
                    {language === 'en' ? 'Requirements' : 'Požadavky'}
                  </h2>
                  <ul className="space-y-5">
                    {requirements.map((item, index) => (
                      <li key={index} className="flex items-start gap-5 text-gray-600 text-[16px] leading-[1.85]">
                        <span className="w-1.5 h-1.5 bg-gold flex-shrink-0 mt-3" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* Sidebar */}
              <div className="lg:col-span-5">
                <div className="lg:sticky lg:top-44">
                  {/* Apply Card - Primary CTA */}
                  <div className="bg-navy p-10 lg:p-12 mb-6">
                    <h3 className="text-white text-xl font-serif mb-4">
                      {language === 'en' ? 'Interested in this role?' : 'Máte zájem o tuto pozici?'}
                    </h3>
                    <p className="text-white/45 text-[15px] leading-[1.85] mb-10">
                      {language === 'en' 
                        ? 'Contact us to discuss this opportunity in complete confidence. All enquiries are handled with strict discretion.'
                        : 'Kontaktujte nás k důvěrnému projednání této příležitosti. Všechny dotazy jsou zpracovávány s naprostou diskrétností.'
                      }
                    </p>
                    <Button 
                      asChild 
                      className="w-full bg-gold hover:bg-gold-dark text-navy font-semibold h-14 text-[12px] uppercase tracking-[0.1em]"
                    >
                      <Link href={localizedPath(locale, '/contact')}>
                        {language === 'en' ? 'Apply / Request Details' : 'Projevit zájem / Získat detaily'}
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                  
                  {/* Contact Info */}
                  <div className="bg-cream p-8 lg:p-10">
                    <h4 className="text-navy text-[11px] font-semibold uppercase tracking-[0.15em] mb-6">
                      {language === 'en' ? 'Direct Contact' : 'Přímý kontakt'}
                    </h4>
                    <div className="space-y-4">
                      <a 
                        href="tel:+420272681206" 
                        className="flex items-center gap-3 text-charcoal/70 hover:text-gold transition-colors text-[15px]"
                      >
                        <Phone className="h-4 w-4 text-gold/70" />
                        +420 272 681 206
                      </a>
                      <a 
                        href="mailto:info@bsolution.eu" 
                        className="flex items-center gap-3 text-charcoal/70 hover:text-gold transition-colors text-[15px]"
                      >
                        <Mail className="h-4 w-4 text-gold/70" />
                        info@bsolution.eu
                      </a>
                    </div>
                  </div>
                  
                  {/* Confidentiality Note */}
                  <p className="mt-6 text-charcoal/40 text-[13px] leading-relaxed text-center italic">
                    {language === 'en'
                      ? 'All conversations are treated with absolute confidentiality.'
                      : 'Všechny rozhovory jsou vedeny s naprostou důvěrností.'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Other Opportunities */}
        <section className="bg-cream py-24 lg:py-32">
          <div className="max-w-[1440px] mx-auto px-8 lg:px-20 text-center">
            <h2 className="text-navy text-2xl lg:text-3xl font-serif mb-6">
              {language === 'en' ? 'Explore More Opportunities' : 'Prozkoumat další příležitosti'}
            </h2>
            <p className="text-charcoal/60 mb-12 max-w-xl mx-auto leading-relaxed">
              {language === 'en' 
                ? 'View our full portfolio of current mandates or contact us about confidential opportunities not listed publicly.'
                : 'Prohlédněte si naše kompletní portfolio aktuálních mandátů nebo nás kontaktujte ohledně důvěrných příležitostí, které nejsou veřejně inzerovány.'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <Button 
                asChild 
                variant="outline"
                className="border-navy text-navy hover:bg-navy hover:text-white h-14 px-10 text-[11px] uppercase tracking-[0.12em]"
              >
                <Link href={localizedPath(locale, '/positions')}>
                  {language === 'en' ? 'View All Opportunities' : 'Zobrazit všechny příležitosti'}
                </Link>
              </Button>
              <Button 
                asChild 
                className="bg-gold hover:bg-gold-dark text-navy h-14 px-10 text-[11px] uppercase tracking-[0.12em]"
              >
                <Link href={localizedPath(locale, '/contact')}>
                  {language === 'en' ? 'Contact Us' : 'Kontaktujte nás'}
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export function JobDetailClient({ job }: { job: Job }) {
  return (
    <LanguageProvider>
      <JobDetailContent job={job} />
    </LanguageProvider>
  )
}
