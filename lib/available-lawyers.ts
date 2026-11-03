import type { Metadata } from 'next'
import { absoluteUrl, buildAlternates, SITE_URL, type Locale } from '@/lib/i18n/config'

/**
 * Available lawyers (pilot, 2026-11-03): anonymous profiles of lawyers who
 * are open to offers and asked B Solution to present them. A profile carries
 * no name, employer, award or exact dates — only what lets an employer judge
 * the fit — and is published only with the lawyer's written consent. An
 * employer asks for the full profile through the contact form with the
 * profile's reference; B Solution passes the request on and shares the CV
 * only when the lawyer agrees.
 */
export interface AvailableLawyer {
  /** Public reference, e.g. BS-L-001; the contact form carries it. */
  ref: string
  headline: Record<'en' | 'cs', string>
  summary: Record<'en' | 'cs', string>
  practiceAreas: Record<'en' | 'cs', string[]>
  /** A floor ("15+"), never the exact number. */
  yearsExperience: number
  qualification: Record<'en' | 'cs', string>
  languages: Record<'en' | 'cs', string[]>
  location: Record<'en' | 'cs', string>
  preferredLocations: Record<'en' | 'cs', string[]>
  openTo: ('in-house' | 'law-firm')[]
  publishedAt: string
}

export const availableLawyersPath = '/available-lawyers' as const

/** Consent on file before a profile is listed here (owner, 2026-11-03). */
export const AVAILABLE_LAWYERS: AvailableLawyer[] = [
  {
    ref: 'BS-L-001',
    headline: {
      en: 'Senior attorney – real estate transactions and leasing',
      cs: 'Seniorní advokát – nemovitostní transakce a nájmy',
    },
    summary: {
      en: 'Many years leading the leasing team of an international law firm, advising foreign investors on the acquisition, sale and leasing of office, retail and logistics property; now in-house legal leadership at a real estate group. Looking for a senior in-house role with an international scope, or a senior position in a law firm.',
      cs: 'Dlouholeté vedení nájemního týmu mezinárodní advokátní kanceláře, klienti zahraniční investoři při nákupu, prodeji a pronájmu kancelářských, obchodních a logistických nemovitostí; nyní vedoucí právní role in-house v realitní skupině. Hledá seniorní in-house roli s mezinárodním přesahem nebo seniorní pozici v advokátní kanceláři.',
    },
    practiceAreas: {
      en: ['Real estate transactions (acquisitions and sales)', 'Commercial leasing', 'Development and construction contracts', 'M&A (real estate)'],
      cs: ['Nemovitostní transakce (nákupy a prodeje)', 'Nájmy komerčních nemovitostí', 'Developerské smlouvy a smlouvy o dílo', 'M&A (nemovitosti)'],
    },
    yearsExperience: 15,
    qualification: {
      en: 'Czech attorney (Czech Bar Association)',
      cs: 'Advokát (Česká advokátní komora)',
    },
    languages: { en: ['Czech', 'English'], cs: ['čeština', 'angličtina'] },
    location: { en: 'Prague, Czech Republic', cs: 'Praha' },
    preferredLocations: {
      en: ['Prague', 'Europe', 'Singapore', 'Dubai'],
      cs: ['Praha', 'Evropa', 'Singapur', 'Dubaj'],
    },
    openTo: ['in-house', 'law-firm'],
    publishedAt: '2026-11-03',
  },
]

export function contentLocale(locale: Locale): 'en' | 'cs' {
  return locale === 'cs' ? 'cs' : 'en'
}

/** The contact form recognises a profile reference in #profile-<ref>. */
export function isProfileRef(value: string | null): value is string {
  return value !== null && AVAILABLE_LAWYERS.some((lawyer) => lawyer.ref === value)
}

export const COPY: Record<Locale, {
  title: string
  metaDescription: string
  question: string
  answer: string
  years: (n: number) => string
  practice: string
  qualification: string
  languages: string
  location: string
  preferred: string
  openTo: string
  inHouse: string
  lawFirm: string
  cta: string
  empty: string
  candidateTitle: string
  candidateText: string
  candidateCta: string
  inquiry: (ref: string) => string
}> = {
  en: {
    title: 'Available lawyers open to offers',
    metaDescription: 'Anonymous profiles of senior lawyers open to new roles: practice, experience, languages and preferred locations. Ask B Solution for the full profile.',
    question: 'Which lawyers are open to a new role right now?',
    answer: 'Anonymous profiles of lawyers who asked B Solution to present them. Ask for a profile and we pass your interest on; the CV is shared only with the lawyer’s consent.',
    years: (n) => `${n}+ years of practice`,
    practice: 'Practice',
    qualification: 'Qualification',
    languages: 'Languages',
    location: 'Based in',
    preferred: 'Preferred location',
    openTo: 'Open to',
    inHouse: 'In-house',
    lawFirm: 'Law firm',
    cta: 'Ask for the full profile',
    empty: 'No profile is listed at the moment.',
    candidateTitle: 'Are you a lawyer open to offers?',
    candidateText: 'B Solution can list you here anonymously — practice, experience, languages and where you want to work, never your name or employer.',
    candidateCta: 'Get listed anonymously',
    inquiry: (ref) => `We are interested in the anonymous profile ${ref}. Please send us more details.`,
  },
  cs: {
    title: 'Dostupní právníci otevření nabídkám',
    metaDescription: 'Anonymní profily seniorních právníků a advokátů otevřených nové roli: obor, praxe, jazyky a preferovaná lokalita. Vyžádejte si celý profil u B Solution.',
    question: 'Kteří právníci jsou teď otevření nové roli?',
    answer: 'Anonymní profily právníků, kteří B Solution požádali, aby je představila. Vyžádejte si profil a my zájem předáme; životopis sdílíme jen se souhlasem právníka.',
    years: (n) => `${n}+ let praxe`,
    practice: 'Obor',
    qualification: 'Kvalifikace',
    languages: 'Jazyky',
    location: 'Současná lokalita',
    preferred: 'Preferovaná lokalita',
    openTo: 'Otevřen/a',
    inHouse: 'In-house',
    lawFirm: 'Advokátní kancelář',
    cta: 'Vyžádat celý profil',
    empty: 'Momentálně tu není žádný profil.',
    candidateTitle: 'Jste právník otevřený nabídkám?',
    candidateText: 'B Solution vás tu může uvést anonymně – obor, praxe, jazyky a kde chcete pracovat, nikdy jméno ani zaměstnavatel.',
    candidateCta: 'Chci být uveden/a anonymně',
    inquiry: (ref) => `Máme zájem o anonymní profil ${ref}. Pošlete nám prosím více informací.`,
  },
  de: {
    title: 'Verfügbare Juristen, offen für Angebote',
    metaDescription: 'Anonyme Profile erfahrener Juristen, offen für eine neue Rolle: Fachgebiet, Erfahrung, Sprachen und bevorzugter Standort. Vollständiges Profil bei B Solution anfragen.',
    question: 'Welche Juristen sind derzeit offen für eine neue Rolle?',
    answer: 'Anonyme Profile von Juristen, die B Solution gebeten haben, sie vorzustellen. Fragen Sie ein Profil an; den Lebenslauf teilen wir nur mit Zustimmung des Juristen.',
    years: (n) => `${n}+ Jahre Praxis`,
    practice: 'Fachgebiet',
    qualification: 'Qualifikation',
    languages: 'Sprachen',
    location: 'Standort',
    preferred: 'Bevorzugter Standort',
    openTo: 'Offen für',
    inHouse: 'Inhouse',
    lawFirm: 'Kanzlei',
    cta: 'Vollständiges Profil anfragen',
    empty: 'Derzeit ist kein Profil gelistet.',
    candidateTitle: 'Sind Sie Jurist und offen für Angebote?',
    candidateText: 'B Solution kann Sie hier anonym listen – Fachgebiet, Erfahrung, Sprachen und Wunschort, nie Name oder Arbeitgeber.',
    candidateCta: 'Anonym gelistet werden',
    inquiry: (ref) => `Wir interessieren uns für das anonyme Profil ${ref}. Bitte senden Sie uns weitere Informationen.`,
  },
  pl: {
    title: 'Dostępni prawnicy otwarci na oferty',
    metaDescription: 'Anonimowe profile doświadczonych prawników otwartych na nową rolę: specjalizacja, doświadczenie, języki i preferowana lokalizacja. Poproś B Solution o pełny profil.',
    question: 'Którzy prawnicy są teraz otwarci na nową rolę?',
    answer: 'Anonimowe profile prawników, którzy poprosili B Solution o ich przedstawienie. Poproś o profil; CV udostępniamy wyłącznie za zgodą prawnika.',
    years: (n) => `${n}+ lat praktyki`,
    practice: 'Specjalizacja',
    qualification: 'Kwalifikacje',
    languages: 'Języki',
    location: 'Lokalizacja',
    preferred: 'Preferowana lokalizacja',
    openTo: 'Otwarty/a na',
    inHouse: 'In-house',
    lawFirm: 'Kancelaria',
    cta: 'Poproś o pełny profil',
    empty: 'Obecnie nie ma żadnego profilu.',
    candidateTitle: 'Jesteś prawnikiem otwartym na oferty?',
    candidateText: 'B Solution może umieścić Cię tu anonimowo – specjalizacja, doświadczenie, języki i miejsce pracy, nigdy imię ani pracodawca.',
    candidateCta: 'Chcę być na liście anonimowo',
    inquiry: (ref) => `Jesteśmy zainteresowani anonimowym profilem ${ref}. Prosimy o więcej informacji.`,
  },
}

/** Indexed in every site locale: labels are translated, the profile text
 * is Czech on /cs and English elsewhere. */
export function availableLawyersMetadata(locale: Locale): Metadata {
  const copy = COPY[locale]
  const url = absoluteUrl(locale, availableLawyersPath)
  return {
    title: copy.title,
    description: copy.metaDescription,
    alternates: buildAlternates(locale, availableLawyersPath),
    openGraph: { title: copy.title, description: copy.metaDescription, url, siteName: 'B Solution', type: 'website', images: [{ url: `${SITE_URL}/images/og-image.jpg`, width: 1200, height: 630, alt: `${copy.title} — B Solution` }] },
  }
}

/** The contact page reads the profile from the fragment (#profile-BS-L-001):
 * a query string would make the link a non-canonical URL for crawlers. */
export function profileInquiryHash(ref: string): string {
  return `#profile-${ref}`
}
