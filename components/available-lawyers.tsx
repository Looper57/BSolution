import Link from 'next/link'
import { ArrowRight, Briefcase, Languages, MapPin, Navigation, Scale } from 'lucide-react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { LanguageProvider } from '@/lib/language-context'
import { localizedPath, type Locale } from '@/lib/i18n/config'
import { AVAILABLE_LAWYERS, COPY, contentLocale, profileInquiryHash, type AvailableLawyer } from '@/lib/available-lawyers'
import { serializeJsonLd } from '@/lib/structured-data'

function faqJsonLd(question: string, answer: string) {
  return { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [{ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } }] }
}

function Row({ icon: Icon, label, value }: { icon: typeof MapPin; label: string; value: string }) {
  return (
    <div className="flex gap-3">
      <Icon className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
      <div className="min-w-0">
        <dt className="text-xs uppercase tracking-wider text-navy/50">{label}</dt>
        <dd className="text-navy">{value}</dd>
      </div>
    </div>
  )
}

function ProfileCard({ locale, lawyer }: { locale: Locale; lawyer: AvailableLawyer }) {
  const copy = COPY[locale]
  const c = contentLocale(locale)
  const openTo = lawyer.openTo.map((kind) => (kind === 'in-house' ? copy.inHouse : copy.lawFirm)).join(' · ')
  return (
    <article className="flex flex-col border border-navy/10 bg-white p-8" aria-labelledby={`profile-${lawyer.ref}`}>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">{lawyer.ref}</p>
      <h3 id={`profile-${lawyer.ref}`} className="mt-3 text-2xl text-navy">{lawyer.headline[c]}</h3>
      <p className="mt-2 text-sm font-semibold text-navy/70">{copy.years(lawyer.yearsExperience)}</p>
      <p className="mt-5 leading-relaxed text-navy/75">{lawyer.summary[c]}</p>
      <dl className="mt-8 grid gap-5 sm:grid-cols-2">
        <Row icon={Scale} label={copy.practice} value={lawyer.practiceAreas[c].join(', ')} />
        <Row icon={Briefcase} label={copy.qualification} value={lawyer.qualification[c]} />
        <Row icon={Languages} label={copy.languages} value={lawyer.languages[c].join(', ')} />
        <Row icon={MapPin} label={copy.location} value={lawyer.location[c]} />
        <Row icon={Navigation} label={copy.preferred} value={lawyer.preferredLocations[c].join(', ')} />
        <Row icon={Briefcase} label={copy.openTo} value={openTo} />
      </dl>
      <Link
        href={`${localizedPath(locale, '/contact')}${profileInquiryHash(lawyer.ref)}`}
        className="mt-8 inline-flex items-center gap-2 self-start bg-gold px-6 py-3 font-semibold text-navy hover:bg-gold-dark"
      >
        {copy.cta}
        <ArrowRight className="size-4" aria-hidden="true" />
      </Link>
    </article>
  )
}

/** Opens with the question and a direct answer (Q&A first), then the profiles. */
export function AvailableLawyersListing({ locale }: { locale: Locale }) {
  const copy = COPY[locale]
  return (
    <LanguageProvider>
      <Header />
      <main id="main-content">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqJsonLd(copy.question, copy.answer)) }} />
        <section className="bg-navy pt-32 pb-16 lg:pt-40">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <p className="eyebrow">B Solution</p>
            <h1 className="mt-6 max-w-4xl text-balance text-white">{copy.title}</h1>
            <h2 className="mt-8 max-w-3xl text-xl text-white/90">{copy.question}</h2>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-white/60">{copy.answer}</p>
          </div>
        </section>
        <section className="bg-cream py-16 lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-2 lg:px-8">
            {AVAILABLE_LAWYERS.length === 0 ? <p className="text-navy/70">{copy.empty}</p> : AVAILABLE_LAWYERS.map((lawyer) => <ProfileCard key={lawyer.ref} locale={locale} lawyer={lawyer} />)}
          </div>
        </section>
        <section className="bg-navy py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl border border-white/10 p-8">
              <h2 className="text-2xl text-white">{copy.candidateTitle}</h2>
              <p className="mt-4 text-white/60">{copy.candidateText}</p>
              <Link href={localizedPath(locale, '/candidates')} className="mt-6 inline-flex items-center gap-2 text-gold">{copy.candidateCta}<ArrowRight className="size-4" aria-hidden="true" /></Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </LanguageProvider>
  )
}
