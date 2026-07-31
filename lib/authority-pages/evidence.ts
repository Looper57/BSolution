import type { Locale } from '@/lib/i18n/config'
import { caseStudies } from '@/lib/content/case-studies'
import {
  productionAuthorityRegistry,
} from './registry'
import type { ProductionAuthorityRecord } from './types'
import { validateProductionAuthorityRegistry } from './validation'

export const approvedHistoricalOrganisations = [
  'White & Case',
  'Clifford Chance',
  'Bird & Bird',
  'CMS Cameron McKenna',
  'IBM',
  'Johnson & Johnson',
  'Coca-Cola',
  'Zentiva',
  'J&T Bank',
  'Komerční banka',
  'LBBW Bank',
  'Orco Property Group',
  'Wolf Theiss',
  'KPMG Legal',
  'DLA Piper',
] as const

export const approvedTestimonials = [
  {
    quote:
      'Lukas is an experienced professional, customer oriented and constantly focused on business solutions providing a significant added value and professional guidance for his clients.',
    name: 'Vladimír Polách',
    role: 'Partner',
    organisation: 'Squire Patton Boggs Prague',
    language: 'en',
  },
  {
    quote:
      'Lukáš is a real expert and professional – reliable, trustworthy, task oriented. He is good advisor, perfectly understanding and supporting business.',
    name: 'Dominika Nosačková',
    role: 'Head of Legal',
    organisation: 'Coca-Cola HBC Czech Republic & Slovakia',
    language: 'en',
  },
] as const

type EvidenceType =
  | 'operating-history'
  | 'organisation-reference'
  | 'testimonial'
  | 'case-study'
  | 'methodology'

interface EvidenceRecord {
  id: string
  type: EvidenceType
  approvalStatus: 'approved'
  publicationEligible: true
  provenance: string
  localeAvailability: readonly Locale[]
  permissionStatus: 'approved'
  confidentialityStatus: 'public' | 'anonymized'
  relatedPageIds: readonly string[]
  reviewOwner: string
  lastReviewed: null
  nextReview: null
}

const allLocales: readonly Locale[] = ['en', 'cs', 'de', 'pl']
const relatedPageIds = allLocales.map(
  (locale) => `authority:legal-executive-search:${locale}`,
)

export const authorityEvidenceRegistry: readonly EvidenceRecord[] = [
  {
    id: 'evidence:bsolution-founded-2007',
    type: 'operating-history',
    approvalStatus: 'approved',
    publicationEligible: true,
    provenance: 'Owner-approved operating history',
    localeAvailability: allLocales,
    permissionStatus: 'approved',
    confidentialityStatus: 'public',
    relatedPageIds,
    reviewOwner: 'owner:bsolution:legal-executive-search',
    lastReviewed: null,
    nextReview: null,
  },
  {
    id: 'evidence:approved-executive-search-organisations',
    type: 'organisation-reference',
    approvalStatus: 'approved',
    publicationEligible: true,
    provenance: 'Owner-approved historical organisation references',
    localeAvailability: allLocales,
    permissionStatus: 'approved',
    confidentialityStatus: 'public',
    relatedPageIds,
    reviewOwner: 'owner:bsolution:legal-executive-search',
    lastReviewed: null,
    nextReview: null,
  },
  {
    id: 'evidence:approved-testimonials',
    type: 'testimonial',
    approvalStatus: 'approved',
    publicationEligible: true,
    provenance: 'Owner-approved testimonial wording and attribution',
    localeAvailability: allLocales,
    permissionStatus: 'approved',
    confidentialityStatus: 'public',
    relatedPageIds,
    reviewOwner: 'owner:bsolution:legal-executive-search',
    lastReviewed: null,
    nextReview: null,
  },
  {
    id: 'evidence:general-counsel-fintech-case-study',
    type: 'case-study',
    approvalStatus: 'approved',
    publicationEligible: true,
    provenance: 'Approved anonymized case study content',
    localeAvailability: allLocales,
    permissionStatus: 'approved',
    confidentialityStatus: 'anonymized',
    relatedPageIds,
    reviewOwner: 'owner:bsolution:legal-executive-search',
    lastReviewed: null,
    nextReview: null,
  },
  {
    id: 'evidence:legal-executive-search-methodology',
    type: 'methodology',
    approvalStatus: 'approved',
    publicationEligible: true,
    provenance: 'Approved Legal Executive Search methodology',
    localeAvailability: allLocales,
    permissionStatus: 'approved',
    confidentialityStatus: 'public',
    relatedPageIds,
    reviewOwner: 'owner:bsolution:legal-executive-search',
    lastReviewed: null,
    nextReview: null,
  },
]

const labels = {
  en: {
    heading: 'Evidence and professional experience',
    historyHeading: 'Legal Executive Search since 2007',
    history: 'B Solution has worked in legal executive search and senior legal recruitment since 2007.',
    organisationsHeading: 'Selected historical organisation references',
    organisations:
      'Selected organisations connected with completed historical search and recruitment work. Their inclusion does not imply endorsement, partnership or a current engagement.',
    testimonialsHeading: 'Professional recommendations',
    caseStudyHeading: 'Approved case study',
    caseStudyLabel: 'General Counsel fintech case study',
    caseStudyLimit:
      'This anonymized case study illustrates one completed assignment and does not promise or imply a typical outcome.',
    methodologyHeading: 'Methodology evidence',
    methodology:
      'Methods are selected for the requirements of each assignment and do not guarantee an outcome.',
  },
  cs: {
    heading: 'Důkazy a profesní zkušenosti',
    historyHeading: 'Executive Search v právním sektoru od roku 2007',
    history: 'B Solution působí v oblasti Executive Search a seniorního právního náboru od roku 2007.',
    organisationsHeading: 'Vybrané historické reference organizací',
    organisations:
      'Vybrané organizace spojené s dokončenými historickými projekty vyhledávání a náboru. Jejich uvedení neznamená doporučení, partnerství ani současnou spolupráci.',
    testimonialsHeading: 'Profesní doporučení',
    caseStudyHeading: 'Schválená případová studie',
    caseStudyLabel: 'Případová studie General Counsel pro fintech',
    caseStudyLimit:
      'Tato anonymizovaná případová studie ilustruje jedno dokončené zadání a neslibuje ani nenaznačuje typický výsledek.',
    methodologyHeading: 'Důkazy metodiky',
    methodology:
      'Metody se volí podle požadavků konkrétního zadání a nezaručují výsledek.',
  },
  de: {
    heading: 'Nachweise und berufliche Erfahrung',
    historyHeading: 'Legal Executive Search seit 2007',
    history: 'B Solution ist seit 2007 in Legal Executive Search und der Suche nach juristischen Führungskräften tätig.',
    organisationsHeading: 'Ausgewählte historische Organisationsreferenzen',
    organisations:
      'Ausgewählte Organisationen im Zusammenhang mit abgeschlossenen historischen Such- und Rekrutierungsmandaten. Ihre Nennung bedeutet weder Empfehlung noch Partnerschaft oder aktuelle Zusammenarbeit.',
    testimonialsHeading: 'Professionelle Empfehlungen',
    caseStudyHeading: 'Freigegebene Fallstudie',
    caseStudyLabel: 'General-Counsel-Fallstudie für ein Fintech',
    caseStudyLimit:
      'Diese anonymisierte Fallstudie veranschaulicht ein abgeschlossenes Mandat und verspricht oder impliziert kein typisches Ergebnis.',
    methodologyHeading: 'Methodiknachweise',
    methodology:
      'Die Methoden werden nach den Anforderungen des jeweiligen Mandats ausgewählt und garantieren kein Ergebnis.',
  },
  pl: {
    heading: 'Dowody i doświadczenie zawodowe',
    historyHeading: 'Executive Search w sektorze prawnym od 2007 roku',
    history: 'B Solution działa w obszarze Executive Search i rekrutacji kadry kierowniczej w sektorze prawnym od 2007 roku.',
    organisationsHeading: 'Wybrane historyczne referencje organizacji',
    organisations:
      'Wybrane organizacje związane z zakończonymi historycznymi projektami poszukiwań i rekrutacji. Ich wymienienie nie oznacza rekomendacji, partnerstwa ani obecnej współpracy.',
    testimonialsHeading: 'Rekomendacje zawodowe',
    caseStudyHeading: 'Zatwierdzone studium przypadku',
    caseStudyLabel: 'Studium przypadku General Counsel dla fintechu',
    caseStudyLimit:
      'To anonimowe studium przypadku ilustruje jedno zakończone zlecenie i nie obiecuje ani nie sugeruje typowego rezultatu.',
    methodologyHeading: 'Dowody metodologii',
    methodology:
      'Metody dobiera się do wymagań konkretnego zlecenia i nie gwarantują one rezultatu.',
  },
} as const

const methodologyItems: Record<Locale, readonly string[]> = {
  en: [
    'Retained engagement where appropriate.',
    'Market mapping and direct approach to passive candidates.',
    'Confidential search and non-disclosure agreements where required.',
    'Reference verification.',
    'Offer negotiation and onboarding support.',
    'Assessment methods selected according to each search assignment.',
  ],
  cs: [
    'Retained model spolupráce tam, kde je vhodný.',
    'Mapování trhu a přímé oslovení pasivních kandidátů.',
    'Důvěrné vyhledávání a dohody o mlčenlivosti tam, kde jsou vyžadovány.',
    'Ověřování referencí.',
    'Podpora při vyjednávání nabídky a nástupu.',
    'Metody posouzení volené podle každého vyhledávacího mandátu.',
  ],
  de: [
    'Mandatierte Zusammenarbeit, soweit sie angemessen ist.',
    'Markterfassung und Direktansprache passiver Kandidaten.',
    'Vertrauliche Suche und Vertraulichkeitsvereinbarungen, soweit erforderlich.',
    'Referenzprüfung.',
    'Begleitung von Angebotsverhandlung und Onboarding.',
    'Beurteilungsmethoden nach den Anforderungen des jeweiligen Suchmandats.',
  ],
  pl: [
    'Powierzony model współpracy, gdy jest odpowiedni.',
    'Mapowanie rynku i bezpośredni kontakt z kandydatami pasywnymi.',
    'Poufne poszukiwanie i umowy o zachowaniu poufności, gdy są wymagane.',
    'Weryfikacja referencji.',
    'Wsparcie w negocjowaniu oferty i rozpoczęciu współpracy.',
    'Metody oceny dobierane do wymagań każdego projektu wyszukiwania.',
  ],
}

export interface AuthorityEvidenceViewModel {
  heading: string
  history: { heading: string; text: string }
  organisations: { heading: string; introduction: string; names: readonly string[] }
  testimonials: {
    heading: string
    items: typeof approvedTestimonials
  }
  caseStudy: {
    heading: string
    label: string
    title: string
    summary: string
    limitation: string
    href: string
  }
  methodology: { heading: string; introduction: string; items: readonly string[] }
}

export function validateAuthorityEvidenceRegistry(
  records: readonly EvidenceRecord[],
): { valid: boolean; errors: string[] } {
  const errors: string[] = []
  const ids = new Set<string>()
  for (const record of records) {
    if (!record.id || ids.has(record.id)) errors.push(`Invalid or duplicate evidence ID: ${record.id}.`)
    ids.add(record.id)
    if (
      record.approvalStatus !== 'approved'
      || !record.publicationEligible
      || record.permissionStatus !== 'approved'
    ) errors.push(`Evidence ${record.id} is not approved for publication.`)
    if (!record.localeAvailability.length) errors.push(`Evidence ${record.id} has no approved locale.`)
    if (!record.relatedPageIds.length) errors.push(`Evidence ${record.id} has no related page.`)
  }
  return { valid: errors.length === 0, errors }
}

export function buildAuthorityEvidenceViewModel(
  record: ProductionAuthorityRecord,
  registry: readonly ProductionAuthorityRecord[],
  evidenceRegistry: readonly EvidenceRecord[],
): AuthorityEvidenceViewModel {
  if (!registry.includes(record) || !productionAuthorityRegistry.includes(record)) {
    throw new Error('Evidence rendering requires the exact production registry record.')
  }
  const pageValidation = validateProductionAuthorityRegistry(registry)
  const evidenceValidation = validateAuthorityEvidenceRegistry(evidenceRegistry)
  if (!pageValidation.valid || !evidenceValidation.valid) {
    throw new Error('Authority evidence registries are invalid.')
  }
  const referenceIds = record.trustSignals.map((signal) => signal.evidenceId)
  if (new Set(referenceIds).size !== referenceIds.length) {
    throw new Error('Authority evidence references must be unique.')
  }
  const resolved = referenceIds.map((id) => evidenceRegistry.find((item) => item.id === id))
  if (
    resolved.some(
      (item) =>
        !item
        || item.approvalStatus !== 'approved'
        || !item.publicationEligible
        || item.permissionStatus !== 'approved'
        || !item.localeAvailability.includes(record.page.locale)
        || !item.relatedPageIds.includes(record.page.id)
        || (item.confidentialityStatus !== 'public' && item.type !== 'case-study'),
    )
  ) throw new Error('Authority evidence reference is unavailable or confidential.')

  const caseStudy = caseStudies.find((item) => item.slug === 'general-counsel-fintech')
  if (!caseStudy) throw new Error('Approved General Counsel fintech case study is missing.')
  const copy = caseStudy.content[record.page.locale]
  const localeLabels = labels[record.page.locale]
  return {
    heading: localeLabels.heading,
    history: { heading: localeLabels.historyHeading, text: localeLabels.history },
    organisations: {
      heading: localeLabels.organisationsHeading,
      introduction: localeLabels.organisations,
      names: approvedHistoricalOrganisations,
    },
    testimonials: { heading: localeLabels.testimonialsHeading, items: approvedTestimonials },
    caseStudy: {
      heading: localeLabels.caseStudyHeading,
      label: localeLabels.caseStudyLabel,
      title: copy.title,
      summary: copy.summary,
      limitation: localeLabels.caseStudyLimit,
      href:
        record.page.locale === 'en'
          ? caseStudy.basePath
          : `/${record.page.locale}${caseStudy.basePath}`,
    },
    methodology: {
      heading: localeLabels.methodologyHeading,
      introduction: localeLabels.methodology,
      items: methodologyItems[record.page.locale],
    },
  }
}

export function getAuthorityEvidenceViewModel(locale: Locale) {
  const record = productionAuthorityRegistry.find(({ page }) => page.locale === locale)
  if (!record) throw new Error(`No authority record exists for locale ${locale}.`)
  return buildAuthorityEvidenceViewModel(
    record,
    productionAuthorityRegistry,
    authorityEvidenceRegistry,
  )
}
