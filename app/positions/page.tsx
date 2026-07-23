"use client"

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { MapPin, Building2, ChevronRight, Filter } from 'lucide-react'
import { LanguageProvider, useLanguage } from '@/lib/language-context'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { getAllJobs, type Job } from '@/lib/jobs-data'
import { localizedPath } from '@/lib/i18n/config'

function PageHeader() {
  const { language: locale } = useLanguage()
  const language = locale === 'cs' ? 'cs' : 'en'
  
  return (
    <section className="bg-navy pt-40 pb-20 lg:pt-48 lg:pb-28">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
        <div className="max-w-3xl">
          <div className="w-16 h-px bg-gold mb-8" />
          <h1 className="text-white text-[clamp(2rem,5vw,3.5rem)] font-serif leading-[1.1]">
            {language === 'en' ? 'Current Opportunities' : 'Aktuální příležitosti'}
          </h1>
          <p className="mt-8 text-xl text-white/50 leading-relaxed">
            {language === 'en' 
              ? 'Explore our current mandates across legal leadership roles in Europe and the Middle East.'
              : 'Prozkoumejte naše aktuální mandáty v právních vedoucích rolích v Evropě a na Blízkém východě.'
            }
          </p>
        </div>
      </div>
    </section>
  )
}

function PositionCard({ job, featured = false }: { job: Job; featured?: boolean }) {
  const { language: locale } = useLanguage()
  const language = locale === 'cs' ? 'cs' : 'en'
  
  const title = language === 'en' ? job.title : job.titleCs
  const location = language === 'en' ? job.location : job.locationCs
  const industry = language === 'en' ? job.industry : job.industryCs
  const description = language === 'en' ? job.shortDescription : job.shortDescriptionCs
  
  if (featured) {
    return (
      <Link href={localizedPath(locale, `/positions/${job.slug}`)} className="block bg-navy p-8 lg:p-10 group hover:bg-navy-light transition-colors">
        <div className="flex items-center justify-between gap-4 mb-6">
          <span className="text-gold text-[10px] font-semibold tracking-[0.2em] uppercase">
            {job.type === 'inhouse' 
              ? (language === 'en' ? 'Corporate' : 'Korporát')
              : (language === 'en' ? 'Law Firm' : 'Advokátní kancelář')
            }
          </span>
          <span className="text-white/30 text-[10px] tracking-wider uppercase">{job.level}</span>
        </div>
        <h4 className="font-serif text-xl lg:text-2xl font-normal text-white group-hover:text-gold transition-colors">
          {title}
        </h4>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-white/40">
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" />
            {location}
          </span>
          <span className="text-gold/70">
            {industry}
          </span>
        </div>
        <p className="mt-6 text-white/50 text-[15px] leading-relaxed line-clamp-3">
          {description}
        </p>
        <div className="mt-8 inline-flex items-center text-gold text-[11px] font-semibold uppercase tracking-[0.12em] group-hover:text-gold-light transition-colors">
          {language === 'en' ? 'View Position Details' : 'Zobrazit detail pozice'}
          <ChevronRight className="ml-1 h-4 w-4" />
        </div>
      </Link>
    )
  }
  
  return (
    <Link 
      href={localizedPath(locale, `/positions/${job.slug}`)}
      className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-7 hover:bg-cream/50 transition-colors px-6 -mx-6 group"
    >
      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <span className={cn(
            "text-[10px] font-semibold tracking-[0.15em] uppercase",
            job.type === 'inhouse' ? "text-gold" : "text-navy"
          )}>
            {job.type === 'inhouse' 
              ? (language === 'en' ? 'Corporate' : 'Korporát')
              : (language === 'en' ? 'Law Firm' : 'Advokátní kancelář')
            }
          </span>
          <span className="text-charcoal/20">|</span>
          <span className="text-charcoal/40 text-[10px] tracking-wider uppercase">{job.level}</span>
          <span className="text-charcoal/20">|</span>
          <span className="text-charcoal/40 text-[10px] tracking-wider uppercase">{industry}</span>
        </div>
        <h4 className="font-serif text-lg font-normal text-navy group-hover:text-gold transition-colors">
          {title}
        </h4>
        <div className="mt-1.5 flex items-center gap-1.5 text-sm text-charcoal/50">
          <MapPin className="h-3.5 w-3.5" />
          {location}
        </div>
      </div>
      <div className="shrink-0 flex items-center text-gold text-[11px] font-semibold uppercase tracking-[0.12em]">
        {language === 'en' ? 'View Position Details' : 'Zobrazit detail pozice'}
        <ChevronRight className="ml-1 h-4 w-4" />
      </div>
    </Link>
  )
}

function PositionsListSection() {
  const { language: locale } = useLanguage()
  const language = locale === 'cs' ? 'cs' : 'en'
  const [typeFilter, setTypeFilter] = useState<'all' | 'lawfirm' | 'inhouse'>('all')
  const [locationFilter, setLocationFilter] = useState<string>('all')
  
  const allJobs = getAllJobs()
  
  // Get unique locations for the filter
  const locations = useMemo(() => {
    const locs = new Set<string>()
    allJobs.forEach(job => {
      locs.add(job.location)
    })
    return Array.from(locs).sort()
  }, [allJobs])
  
  const filteredJobs = useMemo(() => {
    return allJobs.filter(job => {
      const matchesType = typeFilter === 'all' || job.type === typeFilter
      const matchesLocation = locationFilter === 'all' || job.location === locationFilter
      return matchesType && matchesLocation
    })
  }, [allJobs, typeFilter, locationFilter])
  
  const featuredJobs = filteredJobs.filter(j => j.featured)
  const regularJobs = filteredJobs.filter(j => !j.featured)
  
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
        {/* Filters */}
        <div className="mb-16 lg:mb-20">
          <div className="flex items-center gap-3 mb-6">
            <Filter className="h-4 w-4 text-charcoal/40" />
            <span className="text-[11px] font-semibold text-charcoal/50 uppercase tracking-[0.15em]">
              {language === 'en' ? 'Filter Opportunities' : 'Filtrovat příležitosti'}
            </span>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Type Filter */}
            <div>
              <label className="text-[10px] font-medium text-charcoal/40 uppercase tracking-[0.12em] mb-3 block">
                {language === 'en' ? 'Type' : 'Typ'}
              </label>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setTypeFilter('all')}
                  className={cn(
                    "px-5 py-2.5 text-[11px] font-medium transition-all border",
                    typeFilter === 'all'
                      ? "bg-navy text-white border-navy"
                      : "bg-white text-charcoal/60 border-gray-200 hover:border-navy hover:text-navy"
                  )}
                >
                  {language === 'en' ? 'All Types' : 'Všechny typy'}
                </button>
                <button
                  onClick={() => setTypeFilter('inhouse')}
                  className={cn(
                    "px-5 py-2.5 text-[11px] font-medium transition-all border",
                    typeFilter === 'inhouse'
                      ? "bg-navy text-white border-navy"
                      : "bg-white text-charcoal/60 border-gray-200 hover:border-navy hover:text-navy"
                  )}
                >
                  {language === 'en' ? 'Corporate / In-house' : 'Korporát / In-house'}
                </button>
                <button
                  onClick={() => setTypeFilter('lawfirm')}
                  className={cn(
                    "px-5 py-2.5 text-[11px] font-medium transition-all border",
                    typeFilter === 'lawfirm'
                      ? "bg-navy text-white border-navy"
                      : "bg-white text-charcoal/60 border-gray-200 hover:border-navy hover:text-navy"
                  )}
                >
                  {language === 'en' ? 'Law Firm' : 'Advokátní kancelář'}
                </button>
              </div>
            </div>
            
            {/* Location Filter */}
            <div>
              <label className="text-[10px] font-medium text-charcoal/40 uppercase tracking-[0.12em] mb-3 block">
                {language === 'en' ? 'Location' : 'Lokalita'}
              </label>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setLocationFilter('all')}
                  className={cn(
                    "px-5 py-2.5 text-[11px] font-medium transition-all border",
                    locationFilter === 'all'
                      ? "bg-navy text-white border-navy"
                      : "bg-white text-charcoal/60 border-gray-200 hover:border-navy hover:text-navy"
                  )}
                >
                  {language === 'en' ? 'All Locations' : 'Všechny lokality'}
                </button>
                {locations.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => setLocationFilter(loc)}
                    className={cn(
                      "px-5 py-2.5 text-[11px] font-medium transition-all border",
                      locationFilter === loc
                        ? "bg-navy text-white border-navy"
                        : "bg-white text-charcoal/60 border-gray-200 hover:border-navy hover:text-navy"
                    )}
                  >
                    {loc}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Results count */}
        <div className="mb-10 text-[12px] text-charcoal/50">
          {language === 'en' 
            ? `Showing ${filteredJobs.length} ${filteredJobs.length === 1 ? 'opportunity' : 'opportunities'}`
            : `Zobrazeno ${filteredJobs.length} ${filteredJobs.length === 1 ? 'příležitost' : 'příležitostí'}`
          }
        </div>
        
        {/* Featured Positions */}
        {featuredJobs.length > 0 && (
          <div className="mb-20">
            <h3 className="text-[10px] font-semibold text-charcoal/40 uppercase tracking-[0.2em] mb-8">
              {language === 'en' ? 'Featured Mandates' : 'Vybrané mandáty'}
            </h3>
            <div className="grid lg:grid-cols-3 gap-px bg-gray-200">
              {featuredJobs.map((job) => (
                <PositionCard key={job.id} job={job} featured />
              ))}
            </div>
          </div>
        )}
        
        {/* Regular Positions */}
        {regularJobs.length > 0 && (
          <div>
            <h3 className="text-[10px] font-semibold text-charcoal/40 uppercase tracking-[0.2em] mb-8">
              {language === 'en' ? 'Additional Opportunities' : 'Další příležitosti'}
            </h3>
            <div className="divide-y divide-gray-100 border-t border-b border-gray-100">
              {regularJobs.map((job) => (
                <PositionCard key={job.id} job={job} />
              ))}
            </div>
          </div>
        )}
        
        {/* No results */}
        {filteredJobs.length === 0 && (
          <div className="text-center py-20 bg-cream/50">
            <p className="text-charcoal/50 text-lg mb-6">
              {language === 'en' 
                ? 'No positions currently match your criteria.'
                : 'Momentálně neodpovídají žádné pozice vašim kritériím.'
              }
            </p>
            <p className="text-charcoal/40 text-sm mb-8">
              {language === 'en'
                ? 'Please adjust your filters or contact us for confidential opportunities.'
                : 'Upravte prosím filtry nebo nás kontaktujte ohledně důvěrných příležitostí.'
              }
            </p>
            <Button 
              variant="outline"
              className="border-navy text-navy hover:bg-navy hover:text-white"
              onClick={() => {
                setTypeFilter('all')
                setLocationFilter('all')
              }}
            >
              {language === 'en' ? 'Clear Filters' : 'Zrušit filtry'}
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}

function ConfidentialSection() {
  const { language: locale } = useLanguage()
  const language = locale === 'cs' ? 'cs' : 'en'
  
  return (
    <section className="bg-cream py-24 lg:py-32">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
        <div className="bg-navy p-12 lg:p-20 text-center">
          <Building2 className="h-10 w-10 text-gold mx-auto" />
          <h2 className="mt-8 text-white text-2xl lg:text-3xl font-serif">
            {language === 'en' ? 'Confidential Opportunities' : 'Důvěrné příležitosti'}
          </h2>
          <p className="mt-6 text-white/50 text-lg max-w-2xl mx-auto leading-relaxed">
            {language === 'en'
              ? 'Many of our most significant mandates remain confidential. If you are a legal executive exploring your next leadership role, we would welcome a confidential conversation.'
              : 'Řada našich nejvýznamnějších mandátů zůstává důvěrná. Pokud jste právní exekutiva zvažující svou další vedoucí roli, rádi s vámi povedeme důvěrný rozhovor.'
            }
          </p>
          <div className="mt-10">
            <Button 
              asChild 
              size="lg"
              className="bg-gold hover:bg-gold-dark text-navy font-semibold h-14 px-12"
            >
              <Link href={localizedPath(locale, '/contact')}>
                {language === 'en' ? 'Schedule a Confidential Discussion' : 'Domluvit důvěrnou konzultaci'}
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

function PositionsPage() {
  return (
    <>
      <Header />
      <main>
        <PageHeader />
        <PositionsListSection />
        <ConfidentialSection />
      </main>
      <Footer />
    </>
  )
}

export default function Page() {
  return (
    <LanguageProvider>
      <PositionsPage />
    </LanguageProvider>
  )
}
