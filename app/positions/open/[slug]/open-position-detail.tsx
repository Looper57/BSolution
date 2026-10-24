"use client"

import Link from 'next/link'
import { MapPin, CalendarClock, ChevronRight } from 'lucide-react'
import { LanguageProvider, useLanguage } from '@/lib/language-context'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { localizedPath } from '@/lib/i18n/config'
import type { LivePosition } from '@/lib/live-positions'

function Detail({ position }: { position: LivePosition }) {
  const { language: locale } = useLanguage()
  const cs = locale === 'cs'
  const place = [position.city, position.country].filter(Boolean).join(', ')
  const until = new Date(position.validThrough).toLocaleDateString(cs ? 'cs-CZ' : 'en-GB')
  return (
    <>
      <Header />
      <main className="bg-cream">
        <section className="max-w-[960px] mx-auto px-8 py-24 lg:py-32">
          <Link href={localizedPath(locale, '/positions')} className="text-sm text-gold">← {cs ? 'Všechny pozice' : 'All positions'}</Link>
          <h1 className="mt-6 text-3xl lg:text-4xl font-serif text-navy">{position.title}</h1>
          <div className="mt-4 flex flex-wrap gap-6 text-navy/60 text-sm">
            <span className="flex items-center gap-2"><MapPin className="h-4 w-4" />{place}</span>
            <span className="flex items-center gap-2"><CalendarClock className="h-4 w-4" />{cs ? `Inzerát platí do ${until}` : `Open until ${until}`}</span>
          </div>
          <p className="mt-2 text-navy/50 text-sm">{position.employer || (cs ? 'Zaměstnavatel zůstává důvěrný' : 'The employer remains confidential')}</p>
          <div className="mt-10 space-y-4 text-navy/80 leading-relaxed">
            {position.description.split('\n').filter(Boolean).map((paragraph, i) => <p key={i}>{paragraph}</p>)}
          </div>
          <div className="mt-12">
            <Button asChild size="lg" className="bg-gold hover:bg-gold-dark text-navy font-semibold h-14 px-10">
              <Link href={`${localizedPath(locale, '/contact')}?position=${position.id}`}>
                {cs ? 'Mám zájem o tuto pozici' : 'I am interested in this position'}
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export function OpenPositionDetail({ position }: { position: LivePosition }) {
  return (
    <LanguageProvider>
      <Detail position={position} />
    </LanguageProvider>
  )
}
