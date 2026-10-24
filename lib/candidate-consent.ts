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

/** Applications go to PCRecruiter through LawBridge; off until the owner
 * switches them on there (RECRUITMENT_APPLICATIONS_ENABLED) and here. */
export const APPLICATIONS_ENABLED = process.env.NEXT_PUBLIC_RECRUITMENT_APPLICATIONS_ENABLED === 'true'
export const APPLY_ENDPOINT = (jobId: number) => `${process.env.NEXT_PUBLIC_LAWBRIDGE_ORIGIN ?? 'https://www.lawbridge.eu'}/api/recruitment/positions/${jobId}/apply`
