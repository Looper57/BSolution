import Link from 'next/link'
import { ArrowRight, ExternalLink, MapPin } from 'lucide-react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { LanguageProvider } from '@/lib/language-context'
import { localizedPath, type Locale } from '@/lib/i18n/config'
import { COPY, ROLE_LABEL, countryName, legalJobPath, legalJobsCountryPath, legalJobsPath, place, type LegalJob } from '@/lib/legal-jobs'
import { serializeJsonLd } from '@/lib/structured-data'

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
    </LanguageProvider>
  )
}

function faqJsonLd(question: string, answer: string) {
  return { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [{ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } }] }
}

function Ctas({ locale }: { locale: Locale }) {
  const copy = COPY[locale]
  return (
    <section className="bg-navy py-20">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 md:grid-cols-2 lg:px-8">
        <div className="border border-white/10 p-8">
          <h2 className="text-2xl text-white">{copy.hiringTitle}</h2>
          <p className="mt-4 text-white/60">{copy.hiringText}</p>
          <Link href={localizedPath(locale, '/contact')} className="mt-6 inline-flex items-center gap-2 text-gold">{copy.hiringCta}<ArrowRight className="size-4" /></Link>
        </div>
        <div className="border border-white/10 p-8">
          <h2 className="text-2xl text-white">{copy.candidateTitle}</h2>
          <p className="mt-4 text-white/60">{copy.candidateText}</p>
          <Link href={localizedPath(locale, '/candidates')} className="mt-6 inline-flex items-center gap-2 text-gold">{copy.candidateCta}<ArrowRight className="size-4" /></Link>
        </div>
      </div>
    </section>
  )
}

/** Listing for all markets, or one market when `country` is set. Opens with the question and a direct answer (Q&A first). */
export function LegalJobsListing({ locale, jobs, country }: { locale: Locale; jobs: LegalJob[]; country: string | null }) {
  const copy = COPY[locale]
  const countries = [...new Set(jobs.map((j) => j.country).filter((c): c is string => Boolean(c)))].sort((a, b) => countryName(a, locale).localeCompare(countryName(b, locale), locale))
  const shown = country ? jobs.filter((j) => j.country === country) : jobs
  const name = country ? countryName(country, locale) : null
  const question = name ? copy.countryQuestion(name) : copy.question
  const answer = name ? copy.countryAnswer(name, shown.length) : copy.answer
  return (
    <Shell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqJsonLd(question, answer)) }} />
      <section className="bg-navy pt-32 pb-16 lg:pt-40">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="eyebrow">B Solution</p>
          <h1 className="mt-6 max-w-4xl text-balance text-white">{name ? copy.countryTitle(name) : copy.title}</h1>
          <h2 className="mt-8 max-w-3xl text-xl text-white/90">{question}</h2>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-white/60">{answer}</p>
        </div>
      </section>
      <section className="bg-background py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <nav aria-label={copy.allCountries} className="mb-10 flex flex-wrap gap-3 text-sm">
            <Link href={localizedPath(locale, legalJobsPath)} className={`border px-4 py-2 ${country ? 'border-border' : 'border-gold text-gold'}`}>{copy.allCountries}</Link>
            {countries.map((c) => (
              <Link key={c} href={localizedPath(locale, legalJobsCountryPath(c))} className={`border px-4 py-2 ${c === country ? 'border-gold text-gold' : 'border-border'}`}>{countryName(c, locale)}</Link>
            ))}
            <Link href={localizedPath(locale, '/positions')} className="ml-auto px-4 py-2 text-gold">{copy.positionsLink} →</Link>
          </nav>
          {shown.length === 0 ? <p className="text-muted-foreground">{copy.noJobs}</p> : (
            <ul className="grid gap-4">
              {shown.map((job) => (
                <li key={job.id}>
                  <Link href={localizedPath(locale, legalJobPath(job))} className="group block border border-border bg-card p-6 transition-colors hover:border-gold">
                    <p className="text-xs font-medium uppercase tracking-widest text-gold">{ROLE_LABEL[job.role]?.[locale] ?? job.role}</p>
                    <h3 className="mt-3 text-xl text-card-foreground">{job.title}</h3>
                    <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                      {job.employer ? <span>{job.employer}</span> : null}
                      <span className="inline-flex items-center gap-1"><MapPin className="size-4" />{place(job, locale)}</span>
                    </p>
                    <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{job.summary}</p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <p className="mt-10 text-xs text-muted-foreground">{copy.external}</p>
        </div>
      </section>
      <Ctas locale={locale} />
    </Shell>
  )
}

/** One external advert: facts, our summary, the notice and the link to the original. No JobPosting schema. */
export function LegalJobDetail({ locale, job }: { locale: Locale; job: LegalJob }) {
  const copy = COPY[locale]
  const listed = new Date(job.postedAt ?? job.firstSeenAt).toLocaleDateString(locale === 'en' ? 'en-GB' : locale)
  return (
    <Shell>
      <section className="bg-background pt-32 pb-16 lg:pt-40">
        <div className="mx-auto max-w-[960px] px-6 lg:px-8">
          <Link href={localizedPath(locale, job.country ? legalJobsCountryPath(job.country) : legalJobsPath)} className="text-sm text-gold">← {copy.back}</Link>
          <p className="mt-8 text-xs font-medium uppercase tracking-widest text-gold">{ROLE_LABEL[job.role]?.[locale] ?? job.role}</p>
          <h1 className="mt-4 text-3xl lg:text-4xl">{job.title}</h1>
          <p className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-1 text-sm text-muted-foreground">
            {job.employer ? <span>{job.employer}</span> : null}
            <span className="inline-flex items-center gap-1"><MapPin className="size-4" />{place(job, locale)}</span>
            <span>{copy.firstSeen}: {listed}</span>
          </p>
          <p className="mt-8 border-l-2 border-gold pl-4 text-sm text-muted-foreground">{copy.external}</p>
          <p className="mt-8 text-lg leading-relaxed">{job.summary}</p>
          {job.practiceAreas.length ? <p className="mt-6 text-sm"><strong>{copy.areas}:</strong> {job.practiceAreas.join(', ')}</p> : null}
          {job.languages.length ? <p className="mt-2 text-sm"><strong>{copy.languages}:</strong> {job.languages.map((l) => l.toUpperCase()).join(', ')}</p> : null}
          <a href={job.sourceUrl} target="_blank" rel="nofollow noopener noreferrer" className="mt-10 inline-flex h-14 items-center gap-2 bg-gold px-10 font-semibold text-navy hover:bg-gold-dark">
            {copy.viewOriginal}<ExternalLink className="size-4" />
          </a>
        </div>
      </section>
      <Ctas locale={locale} />
    </Shell>
  )
}
