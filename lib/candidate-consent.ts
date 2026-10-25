/**
 * Candidate consent (shared roadmap M6/M1.8, 2026-10-24). Controller:
 * Yours Solution s.r.o. (owner, 2026-10-24). Retention 2 years or until
 * withdrawal — proposed, confirm with the owner before switching
 * applications on. The exact text shown is sent with the application and
 * stored in PCRecruiter as proof.
 */
export const CANDIDATE_CONSENT_VERSION = '2026-10-24-yours-solution-2y'

const TEXT = {
  en: 'I agree that Yours Solution s.r.o. (B Solution) processes my personal data and CV to consider me for this position and to offer me other suitable positions, for 2 years or until I withdraw my consent, which I can do at any time by writing to info@bsolution.eu.',
  cs: 'Souhlasím, aby Yours Solution s.r.o. (B Solution) zpracovávala mé osobní údaje a životopis za účelem posouzení mé kandidatury na tuto pozici a nabízení dalších vhodných pozic, a to po dobu 2 let nebo do odvolání souhlasu, které mohu kdykoli zaslat na info@bsolution.eu.',
  de: 'Ich willige ein, dass Yours Solution s.r.o. (B Solution) meine personenbezogenen Daten und meinen Lebenslauf verarbeitet, um mich für diese Stelle zu berücksichtigen und mir weitere passende Stellen anzubieten, für 2 Jahre oder bis zu meinem Widerruf, den ich jederzeit an info@bsolution.eu richten kann.',
  pl: 'Wyrażam zgodę na przetwarzanie przez Yours Solution s.r.o. (B Solution) moich danych osobowych i CV w celu rozpatrzenia mojej kandydatury na to stanowisko oraz proponowania mi innych odpowiednich stanowisk przez 2 lata lub do czasu wycofania zgody, które mogę w każdej chwili przesłać na info@bsolution.eu.',
} as const

export type ConsentLocale = keyof typeof TEXT

export function candidateConsentText(locale: string): string {
  return TEXT[(locale in TEXT ? locale : 'en') as ConsentLocale]
}

/** A CV for future opportunities, without a position (shared roadmap
 * M6.1). Same text and version as lawbridge.eu
 * (lib/recruitment/candidate-consent.ts there). */
export const REGISTRATION_CONSENT_VERSION = '2026-10-24-yours-solution-2y-future'

const REGISTRATION_TEXT = {
  en: 'I agree that Yours Solution s.r.o. (B Solution) processes my personal data and CV to offer me suitable positions, for 2 years or until I withdraw my consent, which I can do at any time by writing to info@bsolution.eu.',
  cs: 'Souhlasím, aby Yours Solution s.r.o. (B Solution) zpracovávala mé osobní údaje a životopis za účelem nabízení vhodných pozic, a to po dobu 2 let nebo do odvolání souhlasu, které mohu kdykoli zaslat na info@bsolution.eu.',
  de: 'Ich willige ein, dass Yours Solution s.r.o. (B Solution) meine personenbezogenen Daten und meinen Lebenslauf verarbeitet, um mir passende Stellen anzubieten, für 2 Jahre oder bis zu meinem Widerruf, den ich jederzeit an info@bsolution.eu richten kann.',
  pl: 'Wyrażam zgodę na przetwarzanie przez Yours Solution s.r.o. (B Solution) moich danych osobowych i CV w celu proponowania mi odpowiednich stanowisk przez 2 lata lub do czasu wycofania zgody, które mogę w każdej chwili przesłać na info@bsolution.eu.',
} as const

export function registrationConsentText(locale: string): string {
  return REGISTRATION_TEXT[(locale in REGISTRATION_TEXT ? locale : 'en') as keyof typeof REGISTRATION_TEXT]
}

/** Applications go to PCRecruiter through LawBridge; off until the owner
 * switches them on there (RECRUITMENT_APPLICATIONS_ENABLED) and here. */
export const APPLICATIONS_ENABLED = process.env.NEXT_PUBLIC_RECRUITMENT_APPLICATIONS_ENABLED === 'true'
export const APPLY_ENDPOINT = (jobId: number) => `${process.env.NEXT_PUBLIC_LAWBRIDGE_ORIGIN ?? 'https://www.lawbridge.eu'}/api/recruitment/positions/${jobId}/apply`
/** Search on the lawyer's behalf (shared roadmap M12.1). Same text and
 * version as lawbridge.eu (lib/recruitment/candidate-consent.ts there). */
export const MANDATE_CONSENT_VERSION = '2026-10-25-yours-solution-2y-mandate'

const MANDATE_TEXT = {
  en: 'I ask Yours Solution s.r.o. (B Solution) to search for suitable job opportunities for me according to my brief and agree that it processes my personal data and CV for this purpose for 2 years or until I withdraw my consent (info@bsolution.eu). B Solution will send me the opportunities it finds; it will approach a company or send it my CV with my name only after I confirm that company. AI may help with the search; a person makes the final selection. The service is free for me; the employer who hires me pays.',
  cs: 'Žádám Yours Solution s.r.o. (B Solution), aby pro mě podle mého zadání vyhledávala vhodné pracovní příležitosti, a souhlasím, aby k tomu zpracovávala mé osobní údaje a životopis po dobu 2 let nebo do odvolání souhlasu (info@bsolution.eu). B Solution mi pošle nalezené příležitosti; firmu osloví nebo jí pošle můj životopis se jménem až poté, co danou firmu potvrdím. Při vyhledávání může pomáhat AI, konečný výběr dělá člověk. Služba je pro mě zdarma; platí zaměstnavatel, který mě přijme.',
  de: 'Ich beauftrage Yours Solution s.r.o. (B Solution), nach meinen Vorgaben passende Stellen für mich zu suchen, und willige ein, dass sie dafür meine personenbezogenen Daten und meinen Lebenslauf für 2 Jahre oder bis zu meinem Widerruf (info@bsolution.eu) verarbeitet. B Solution sendet mir die gefundenen Stellen; ein Unternehmen wird erst angesprochen oder erhält meinen Lebenslauf mit Namen, nachdem ich dieses Unternehmen bestätigt habe. KI kann bei der Suche helfen; die endgültige Auswahl trifft ein Mensch. Der Service ist für mich kostenlos; es zahlt der Arbeitgeber, der mich einstellt.',
  pl: 'Zlecam Yours Solution s.r.o. (B Solution) wyszukiwanie dla mnie odpowiednich ofert pracy zgodnie z moimi wymaganiami i wyrażam zgodę na przetwarzanie w tym celu moich danych osobowych i CV przez 2 lata lub do wycofania zgody (info@bsolution.eu). B Solution prześle mi znalezione oferty; skontaktuje się z firmą lub prześle jej moje CV z nazwiskiem dopiero po potwierdzeniu przeze mnie tej firmy. W wyszukiwaniu może pomagać AI, ostatecznego wyboru dokonuje człowiek. Usługa jest dla mnie bezpłatna; płaci pracodawca, który mnie zatrudni.',
} as const

export function mandateConsentText(locale: string): string {
  return MANDATE_TEXT[(locale in MANDATE_TEXT ? locale : 'en') as keyof typeof MANDATE_TEXT]
}

export const REGISTER_ENDPOINT = `${process.env.NEXT_PUBLIC_LAWBRIDGE_ORIGIN ?? 'https://www.lawbridge.eu'}/api/recruitment/candidates`
