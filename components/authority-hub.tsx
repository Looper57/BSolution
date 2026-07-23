'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { LanguageProvider } from '@/lib/language-context'
import { UI } from '@/lib/i18n/ui'
import { localizedPath, type Locale } from '@/lib/i18n/config'
import type { Entity, EntityKind } from '@/lib/content/types'

const hubCopy: Record<Locale, Record<EntityKind, { title: string; intro: string }>> = {
  en: {
    service: { title: 'Legal Executive Search Services', intro: 'Focused search and advisory for senior legal, compliance and law-firm appointments across Europe and the Middle East.' },
    practice: { title: 'Practice Areas', intro: 'Specialist market knowledge for leadership mandates where technical credibility and commercial judgement matter.' },
    industry: { title: 'Industries', intro: 'Sector-aware legal search informed by regulation, operating models and the realities of each market.' },
    country: { title: 'Locations', intro: 'Cross-border search capability grounded in the legal talent markets we know directly.' },
    caseStudy: { title: 'Case Studies', intro: 'Selected examples of confidential legal leadership mandates and the disciplined thinking behind them.' },
    insight: { title: 'Insights', intro: 'Perspectives on legal leadership and executive search.' },
  },
  cs: {
    service: { title: 'Služby Legal Executive Search', intro: 'Cílené vyhledávání a poradenství pro seniorní právní, compliance a advokátní pozice v Evropě a na Blízkém východě.' },
    practice: { title: 'Oblasti praxe', intro: 'Specializovaná znalost trhu pro vedoucí mandáty, kde rozhoduje odborná důvěryhodnost a obchodní úsudek.' },
    industry: { title: 'Odvětví', intro: 'Vyhledávání právních lídrů s porozuměním regulaci, provozním modelům a realitě jednotlivých trhů.' },
    country: { title: 'Lokality', intro: 'Přeshraniční vyhledávání založené na přímé znalosti právních talentových trhů.' },
    caseStudy: { title: 'Případové studie', intro: 'Vybrané příklady důvěrných mandátů a disciplinovaného přístupu, který za nimi stojí.' },
    insight: { title: 'Poznatky', intro: 'Pohledy na právní leadership a executive search.' },
  },
  de: {
    service: { title: 'Legal Executive Search Leistungen', intro: 'Gezielte Suche und Beratung für juristische Führungs-, Compliance- und Kanzleimandate in Europa und im Nahen Osten.' },
    practice: { title: 'Fachbereiche', intro: 'Spezialisierte Marktkenntnis für Führungsmandate, bei denen fachliche Glaubwürdigkeit und unternehmerisches Urteilsvermögen zählen.' },
    industry: { title: 'Branchen', intro: 'Sektororientierte juristische Suche mit Verständnis für Regulierung, Geschäftsmodelle und Marktgegebenheiten.' },
    country: { title: 'Standorte', intro: 'Grenzüberschreitende Suche auf Basis direkter Kenntnis der relevanten juristischen Talentmärkte.' },
    caseStudy: { title: 'Fallstudien', intro: 'Ausgewählte Beispiele vertraulicher juristischer Führungsmandate und der systematischen Arbeit dahinter.' },
    insight: { title: 'Einblicke', intro: 'Perspektiven zu juristischer Führung und Executive Search.' },
  },
  pl: {
    service: { title: 'Usługi Legal Executive Search', intro: 'Ukierunkowany executive search i doradztwo w zakresie stanowisk prawnych, compliance oraz ról w kancelariach w Europie i na Bliskim Wschodzie.' },
    practice: { title: 'Obszary praktyki', intro: 'Specjalistyczna wiedza rynkowa w mandatach, w których liczą się wiarygodność merytoryczna i osąd biznesowy.' },
    industry: { title: 'Branże', intro: 'Poszukiwanie liderów prawnych z uwzględnieniem regulacji, modeli operacyjnych i realiów danego sektora.' },
    country: { title: 'Lokalizacje', intro: 'Transgraniczne poszukiwania oparte na bezpośredniej znajomości rynków talentów prawniczych.' },
    caseStudy: { title: 'Studia przypadków', intro: 'Wybrane przykłady poufnych mandatów oraz metodycznego podejścia, które za nimi stoi.' },
    insight: { title: 'Analizy', intro: 'Perspektywy dotyczące przywództwa prawnego i executive search.' },
  },
}

export function AuthorityHub({ locale, kind, entities }: { locale: Locale; kind: EntityKind; path: string; entities: Entity[] }) {
  const copy = hubCopy[locale][kind]
  const ui = UI[locale]
  return (
    <LanguageProvider>
      <Header />
      <main id="main-content">
        <section className="bg-navy pt-32 pb-20 lg:pt-40 lg:pb-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <p className="eyebrow">B Solution</p>
            <h1 className="mt-6 max-w-4xl text-balance text-white">{copy.title}</h1>
            <p className="mt-8 max-w-3xl text-lg leading-relaxed text-white/60">{copy.intro}</p>
          </div>
        </section>
        <section className="bg-background py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <nav aria-label="Breadcrumb" className="mb-12 text-sm text-muted-foreground">
              <Link href={localizedPath(locale, '/')} className="hover:text-foreground">{ui.common.home}</Link>
              <span aria-hidden="true" className="px-3">/</span><span>{copy.title}</span>
            </nav>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {entities.map((entity) => {
                const content = entity.content[locale]
                return (
                  <Link key={entity.basePath} href={localizedPath(locale, entity.basePath)} className="group flex min-h-64 flex-col justify-between border border-border bg-card p-8 transition-colors hover:border-gold">
                    <div><p className="text-xs font-medium uppercase tracking-widest text-gold">{copy.title}</p><h2 className="mt-5 text-2xl text-card-foreground">{content.title}</h2><p className="mt-4 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{content.summary}</p></div>
                    <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-foreground">{ui.common.readMore}<ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></span>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </LanguageProvider>
  )
}
