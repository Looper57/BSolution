import type { Locale } from '@/lib/i18n/config'

/**
 * External legal positions (M13.3, owner-approved 2026-10-28): open lawyer
 * adverts that employers publish on their own job boards, collected daily
 * by LawBridge. Only facts and our own summary are shown, always with a
 * link to the original advert and the "external position" notice. B
 * Solution is not mandated for these roles, so no JobPosting schema is
 * emitted (Google's rules and duplicate originals).
 */
export interface LegalJob {
  id: string
  title: string
  employer: string | null
  country: string | null
  city: string | null
  remote: boolean
  role: string
  seniority: string | null
  practiceAreas: string[]
  languages: string[]
  summary: string
  summaryLocale: string
  sourceUrl: string
  postedAt: string | null
  firstSeenAt: string
  status: 'open' | 'closed'
}

const FEED_URL = process.env.LAWBRIDGE_LEGAL_JOBS_FEED_URL ?? 'https://www.lawbridge.eu/api/recruitment/legal-jobs'

/** The feed is cached for an hour at LawBridge; pages revalidate hourly too. */
export async function getLegalJobs(locale: Locale, country: string | null = null): Promise<LegalJob[]> {
  try {
    const url = `${FEED_URL}?locale=${locale}${country ? `&country=${country}` : ''}`
    const response = await fetch(url, { next: { revalidate: 3600 } })
    if (!response.ok) return []
    const body = (await response.json()) as { jobs?: LegalJob[] }
    return (body.jobs ?? []).filter((job) => job.status === 'open' && job.title && job.sourceUrl)
  } catch {
    return []
  }
}

export async function getLegalJob(id: string, locale: Locale): Promise<LegalJob | null> {
  if (!isJobId(id)) return null
  try {
    const response = await fetch(`${FEED_URL}?locale=${locale}&id=${id}`, { next: { revalidate: 3600 } })
    if (!response.ok) return null
    const body = (await response.json()) as { job?: LegalJob | null }
    return body.job && body.job.status === 'open' ? body.job : null
  } catch {
    return null
  }
}

export function isJobId(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value)
}

export function isCountrySegment(value: string): boolean {
  return /^[a-z]{2}$/.test(value)
}

export const legalJobsPath = '/legal-jobs'
export const legalJobPath = (job: Pick<LegalJob, 'id'>) => `${legalJobsPath}/${job.id}`
export const legalJobsCountryPath = (country: string) => `${legalJobsPath}/${country.toLowerCase()}`

export function countryName(code: string, locale: Locale): string {
  try {
    return new Intl.DisplayNames([locale], { type: 'region' }).of(code) ?? code
  } catch {
    return code
  }
}

export function place(job: Pick<LegalJob, 'city' | 'country' | 'remote'>, locale: Locale): string {
  const parts = [job.city, job.country ? countryName(job.country, locale) : null].filter((p, i, all) => p && all.indexOf(p) === i)
  return [...parts, job.remote ? COPY[locale].remote : null].filter(Boolean).join(', ')
}

export const ROLE_LABEL: Record<string, Record<Locale, string>> = {
  attorney: { en: 'Attorney', cs: 'Advokát', de: 'Rechtsanwalt', pl: 'Adwokat / radca prawny' },
  trainee: { en: 'Trainee lawyer', cs: 'Advokátní koncipient', de: 'Rechtsreferendar / Associate', pl: 'Aplikant' },
  in_house_counsel: { en: 'In-house counsel', cs: 'Podnikový právník', de: 'Syndikus / Unternehmensjurist', pl: 'Prawnik wewnętrzny' },
  legal_director: { en: 'Head of legal / GC', cs: 'Vedoucí právního / GC', de: 'Leiter Recht / GC', pl: 'Dyrektor prawny / GC' },
  compliance: { en: 'Compliance', cs: 'Compliance', de: 'Compliance', pl: 'Compliance' },
}

export const COPY: Record<Locale, {
  title: string; countryTitle: (c: string) => string; metaDescription: string; countryMeta: (c: string) => string
  question: string; answer: string; countryQuestion: (c: string) => string; countryAnswer: (c: string, n: number) => string
  external: string; viewOriginal: string; firstSeen: string; noJobs: string; allCountries: string; remote: string
  hiringTitle: string; hiringText: string; hiringCta: string; candidateTitle: string; candidateText: string; candidateCta: string
  areas: string; languages: string; back: string; positionsLink: string
}> = {
  en: {
    title: 'Open legal jobs in Europe and the UAE',
    countryTitle: (c) => `Open legal jobs in ${c}`,
    metaDescription: 'Open positions for lawyers, in-house counsel, general counsel and compliance in Europe and the UAE, updated daily from employers’ own job boards.',
    countryMeta: (c) => `Open positions for lawyers and in-house counsel in ${c}, updated daily from employers’ own job boards, with a link to every original advert.`,
    question: 'Where can I find open positions for lawyers and in-house counsel?',
    answer: 'Here: every day we collect open legal positions that employers publish on their own job boards in Europe and the UAE, summarise each one and link to the original advert, where you apply directly.',
    countryQuestion: (c) => `Which legal positions are open in ${c} right now?`,
    countryAnswer: (c, n) => `${n} open ${n === 1 ? 'position' : 'positions'} for lawyers and in-house counsel in ${c}, collected from employers’ own job boards and updated daily.`,
    external: 'External position — B Solution is not mandated for this role. Apply directly with the employer.',
    viewOriginal: 'View the original advert',
    firstSeen: 'Listed',
    noJobs: 'No open positions right now. The list is updated every day.',
    allCountries: 'All countries',
    remote: 'remote',
    hiringTitle: 'Hiring a lawyer?',
    hiringText: 'B Solution runs confidential executive search for general counsel, in-house counsel and partners.',
    hiringCta: 'Talk to us',
    candidateTitle: 'Looking for your next role?',
    candidateText: 'Register with B Solution for confidential mandates that are never advertised.',
    candidateCta: 'For candidates',
    areas: 'Practice areas',
    languages: 'Languages',
    back: 'All open legal jobs',
    positionsLink: 'Our own mandates',
  },
  cs: {
    title: 'Volné právnické pozice v Evropě a SAE',
    countryTitle: (c) => `Volné právnické pozice – ${c}`,
    metaDescription: 'Volné pozice pro advokáty, podnikové právníky, general counsel a compliance v Evropě a SAE, denně aktualizované z kariérních stránek zaměstnavatelů.',
    countryMeta: (c) => `Volné pozice pro advokáty a podnikové právníky – ${c}. Denně aktualizováno z kariérních stránek zaměstnavatelů, s odkazem na každý původní inzerát.`,
    question: 'Kde najdu volné pozice pro advokáty a podnikové právníky?',
    answer: 'Tady: každý den sbíráme volné právnické pozice, které zaměstnavatelé zveřejňují na svých kariérních stránkách v Evropě a SAE, ke každé přidáme krátké shrnutí a odkaz na původní inzerát, kde se hlásíte přímo.',
    countryQuestion: (c) => `Jaké právnické pozice jsou teď volné – ${c}?`,
    countryAnswer: (c, n) => `${c}: ${n} ${n === 1 ? 'volná pozice' : n < 5 ? 'volné pozice' : 'volných pozic'} pro advokáty a podnikové právníky z kariérních stránek zaměstnavatelů, aktualizováno denně.`,
    external: 'Externí pozice – B Solution není pověřena náborem. Hlaste se přímo u zaměstnavatele.',
    viewOriginal: 'Zobrazit původní inzerát',
    firstSeen: 'Zveřejněno',
    noJobs: 'Teď tu nejsou žádné volné pozice. Seznam se aktualizuje každý den.',
    allCountries: 'Všechny země',
    remote: 'na dálku',
    hiringTitle: 'Hledáte právníka?',
    hiringText: 'B Solution vede diskrétní executive search pro general counsel, podnikové právníky a partnery.',
    hiringCta: 'Ozvěte se nám',
    candidateTitle: 'Hledáte novou pozici?',
    candidateText: 'Zaregistrujte se u B Solution pro důvěrné mandáty, které se nikde neinzerují.',
    candidateCta: 'Pro kandidáty',
    areas: 'Obory',
    languages: 'Jazyky',
    back: 'Všechny volné právnické pozice',
    positionsLink: 'Naše vlastní mandáty',
  },
  de: {
    title: 'Offene Stellen für Juristen in Europa und den VAE',
    countryTitle: (c) => `Offene Stellen für Juristen – ${c}`,
    metaDescription: 'Offene Stellen für Rechtsanwälte, Syndikusanwälte, General Counsel und Compliance in Europa und den VAE, täglich aus den Karriereseiten der Arbeitgeber.',
    countryMeta: (c) => `Offene Stellen für Rechtsanwälte und Unternehmensjuristen – ${c}. Täglich aus den Karriereseiten der Arbeitgeber, mit Link zur Originalanzeige.`,
    question: 'Wo finde ich offene Stellen für Rechtsanwälte und Unternehmensjuristen?',
    answer: 'Hier: Täglich sammeln wir offene Stellen für Juristen, die Arbeitgeber auf ihren eigenen Karriereseiten in Europa und den VAE veröffentlichen, fassen jede zusammen und verlinken die Originalanzeige, bei der Sie sich direkt bewerben.',
    countryQuestion: (c) => `Welche Stellen für Juristen sind derzeit offen – ${c}?`,
    countryAnswer: (c, n) => `${c}: ${n} offene ${n === 1 ? 'Stelle' : 'Stellen'} für Rechtsanwälte und Unternehmensjuristen aus den Karriereseiten der Arbeitgeber, täglich aktualisiert.`,
    external: 'Externe Stelle – B Solution ist mit dieser Besetzung nicht beauftragt. Bewerben Sie sich direkt beim Arbeitgeber.',
    viewOriginal: 'Originalanzeige ansehen',
    firstSeen: 'Gelistet',
    noJobs: 'Derzeit keine offenen Stellen. Die Liste wird täglich aktualisiert.',
    allCountries: 'Alle Länder',
    remote: 'remote',
    hiringTitle: 'Sie suchen einen Juristen?',
    hiringText: 'B Solution führt diskrete Executive Search für General Counsel, Syndikusanwälte und Partner durch.',
    hiringCta: 'Kontakt aufnehmen',
    candidateTitle: 'Auf der Suche nach einer neuen Position?',
    candidateText: 'Registrieren Sie sich bei B Solution für vertrauliche Mandate, die nirgends ausgeschrieben sind.',
    candidateCta: 'Für Kandidaten',
    areas: 'Rechtsgebiete',
    languages: 'Sprachen',
    back: 'Alle offenen Stellen für Juristen',
    positionsLink: 'Unsere eigenen Mandate',
  },
  pl: {
    title: 'Oferty pracy dla prawników w Europie i ZEA',
    countryTitle: (c) => `Oferty pracy dla prawników – ${c}`,
    metaDescription: 'Oferty dla adwokatów, radców prawnych, prawników wewnętrznych, general counsel i compliance w Europie i ZEA, codziennie z firmowych stron kariery.',
    countryMeta: (c) => `Oferty pracy dla adwokatów i prawników wewnętrznych – ${c}. Codziennie aktualizowane ze stron kariery pracodawców, z linkiem do oryginału.`,
    question: 'Gdzie znajdę oferty pracy dla adwokatów i prawników wewnętrznych?',
    answer: 'Tutaj: codziennie zbieramy otwarte stanowiska prawnicze, które pracodawcy publikują na własnych stronach kariery w Europie i ZEA, streszczamy każde z nich i podajemy link do oryginalnej oferty, gdzie aplikujesz bezpośrednio.',
    countryQuestion: (c) => `Jakie stanowiska prawnicze są teraz otwarte – ${c}?`,
    countryAnswer: (c, n) => `${c}: ${n} ${n === 1 ? 'otwarte stanowisko' : 'otwartych stanowisk'} dla adwokatów i prawników wewnętrznych ze stron kariery pracodawców, aktualizowane codziennie.`,
    external: 'Oferta zewnętrzna – B Solution nie prowadzi tej rekrutacji. Aplikuj bezpośrednio u pracodawcy.',
    viewOriginal: 'Zobacz oryginalną ofertę',
    firstSeen: 'Dodano',
    noJobs: 'Obecnie brak otwartych ofert. Lista jest aktualizowana codziennie.',
    allCountries: 'Wszystkie kraje',
    remote: 'zdalnie',
    hiringTitle: 'Szukasz prawnika?',
    hiringText: 'B Solution prowadzi poufny executive search dla general counsel, prawników wewnętrznych i partnerów.',
    hiringCta: 'Skontaktuj się',
    candidateTitle: 'Szukasz nowego stanowiska?',
    candidateText: 'Zarejestruj się w B Solution, aby otrzymywać poufne mandaty, które nigdzie nie są ogłaszane.',
    candidateCta: 'Dla kandydatów',
    areas: 'Specjalizacje',
    languages: 'Języki',
    back: 'Wszystkie oferty dla prawników',
    positionsLink: 'Nasze własne mandaty',
  },
}
