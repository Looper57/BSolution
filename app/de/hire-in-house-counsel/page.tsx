import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { LanguageProvider } from '@/lib/language-context'
import { inHouseRecruitmentAlternates } from '@/lib/inhouse-recruitment'
import { serviceEnquiryHref } from '@/lib/service-enquiry'

const title = 'Unternehmensjuristen finden: Inhouse-Recruitment'
const description = 'Legal Counsel, ersten Unternehmensjuristen oder Head of Legal einstellen. B Solution unterstützt Firmen bei der vertraulichen juristischen Personalsuche in Europa.'
const enquiry = serviceEnquiryHref('executive-search', 'de')

export const metadata: Metadata = {
  title,
  description,
  alternates: inHouseRecruitmentAlternates('de'),
  openGraph: {
    title: `${title} | B Solution`, description,
    type: 'website', siteName: 'B Solution', locale: 'de_DE',
    url: 'https://www.bsolution.eu/de/hire-in-house-counsel',
    images: [{ url: 'https://www.bsolution.eu/images/og-image.jpg', width: 1200, height: 630, alt: 'B Solution – Personalberatung für Unternehmensjuristen' }],
  },
  twitter: { card: 'summary_large_image', title, description, images: ['https://www.bsolution.eu/images/og-image.jpg'] },
}

const roles = [
  { title: 'Erster Unternehmensjurist', responsibility: 'Legen Sie fest, welche wiederkehrenden Aufgaben künftig intern bearbeitet werden: etwa Vertragsverhandlungen, die Beratung von Vertrieb und Einkauf oder die Begleitung von Projekten. Benennen Sie die Berichtslinie und die weiterhin verfügbare externe Beratung.', assessment: 'Im Auswahlgespräch geht es um selbstständiges Arbeiten, Prioritäten und die verständliche Erklärung von Handlungsoptionen. Die erste interne Position ist nicht automatisch eine Juniorrolle.' },
  { title: 'Legal Counsel oder Senior Legal Counsel', responsibility: 'Definieren Sie den eigenen Verantwortungsbereich innerhalb der Rechtsabteilung. Brauchen Sie einen Generalisten für das Tagesgeschäft oder einen Spezialisten, beispielsweise für Commercial, Transaktionen oder Datenschutz?', assessment: 'Prüfen Sie passende Arbeitserfahrung, den Umgang mit den unterstützten Fachbereichen und die Grenzen der eigenen Entscheidungsbefugnis. Klären Sie die Abstimmung mit der juristischen Leitung.' },
  { title: 'General Counsel oder Head of Legal', responsibility: 'Beschreiben Sie die Verantwortung für Rechtsfunktion, Team und externe Kanzleien sowie die Zusammenarbeit mit Geschäftsführung oder Vorstand. Unterscheiden Sie lokale, regionale und konzernweite Aufgaben.', assessment: 'Erkunden Sie Führungserfahrung, Priorisierung und die Kommunikation mit Entscheidungsträgern. Maßgeblich ist eine vergleichbare Verantwortung, nicht allein der bisherige Titel.' },
] as const

const brief = [
  { title: 'Anlass und Prioritäten', text: 'Was soll die Besetzung lösen: fehlende interne Kapazität, Wachstum, eine Nachfolge oder zusätzliche Fachkompetenz? Welche Aufgaben sind in den ersten Monaten vorrangig?' },
  { title: 'Aufgaben und Entscheidungsbefugnis', text: 'Welche Themen verantwortet die Person selbst, wer setzt Prioritäten und wann werden Geschäftsleitung, juristische Leitung oder externe Berater einbezogen?' },
  { title: 'Standort und betreute Länder', text: 'Nennen Sie den Beschäftigungsort, das Arbeitsmodell und die Länder im Verantwortungsbereich getrennt. Eine internationale Aufgabe ist nicht allein durch den Sitz des Unternehmens beschrieben.' },
  { title: 'Sprachen und Qualifikation', text: 'Welche Sprachen werden bei Verhandlungen und im Arbeitsalltag benötigt? Welche Qualifikation verlangt die konkrete Rolle, und welche länderspezifische Unterstützung steht zur Verfügung?' },
  { title: 'Branche und Ressourcen', text: 'Beschreiben Sie Geschäftsmodell, Produkte und wichtige Schnittstellen, etwa zu HR, Finance, Vertrieb oder Einkauf. Benennen Sie das vorhandene Team und das Budget für externe Beratung.' },
  { title: 'Vergütung und Auswahlprozess', text: 'Bereiten Sie einen Vergütungsrahmen, den gewünschten Beginn und die beteiligten Entscheider vor. Vereinbaren Sie vor den Gesprächen, nach welchen Kriterien Kandidaten beurteilt werden.' },
] as const

const questions = [
  { question: 'Wann sollte ein Unternehmen den ersten eigenen Juristen einstellen?', answer: 'Prüfen Sie zunächst Umfang und Wiederholung der Arbeit: Verträge, interne Beratung, Projekte und Abstimmung mit externen Kanzleien. Wenn eine dauerhafte interne Verantwortung benötigt wird, lässt sich daraus ein Suchprofil entwickeln. Legen Sie zugleich fest, welche Spezialthemen weiterhin extern betreut werden sollen. Eine pauschale Umsatz- oder Mitarbeitergrenze ersetzt diese Prüfung nicht.' },
  { question: 'Brauchen wir einen Generalisten, einen Spezialisten oder eine Führungskraft?', answer: 'Beginnen Sie mit den Aufgaben und vorhandenen Ressourcen. Eine allein arbeitende interne Person braucht andere Unterstützung als ein Spezialist in einem bestehenden Team. Verantwortung für Mitarbeiter, Organisation und die Beratung der Geschäftsleitung sollte im Profil ausdrücklich beschrieben werden. B Solution bespricht mit Ihnen diese Abgrenzung vor der Suche.' },
  { question: 'Wie bereiten wir eine grenzüberschreitende Inhouse-Suche vor?', answer: 'Trennen Sie Beschäftigungsort, betreute Länder und die tatsächlichen Arbeitssprachen. Beschreiben Sie die erforderliche fachliche Erfahrung und Qualifikation sowie die Zusammenarbeit mit lokalen Beratern. So kann das Suchgebiet an der konkreten Aufgabe ausgerichtet werden, statt von einem allgemeinen internationalen Titel auszugehen.' },
  { question: 'Welche Angaben benötigt B Solution für die erste Anfrage?', answer: 'Für den Einstieg genügen Rolle, Anlass der Besetzung, Standort, Länder, Sprachen und ein grober Vergütungsrahmen. Übermitteln Sie zunächst keine vertraulichen Personal- oder Unternehmensunterlagen. Den Suchumfang, die Vertraulichkeit und die weiteren Schritte stimmen wir im Gespräch ab.' },
] as const

export default function GermanInHouseRecruitmentPage() {
  return <LanguageProvider>
    <Header />
    <main id="main-content">
      <section className="bg-navy px-6 pb-20 pt-32 lg:px-16 lg:pb-28 lg:pt-40">
        <div className="mx-auto max-w-[1200px]">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold">Personalberatung für Unternehmen und Rechtsabteilungen</p>
          <h1 className="mt-6 max-w-4xl hyphens-auto font-serif text-4xl leading-tight text-white [overflow-wrap:anywhere] md:text-5xl">Unternehmensjuristen und Inhouse Legal Counsel finden</h1>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-white/75">Sie besetzen den ersten internen Juristen, verstärken Ihre Rechtsabteilung mit einem Senior Legal Counsel oder suchen eine juristische Führungskraft? B Solution unterstützt Unternehmen bei der vertraulichen Suche nach passenden juristischen Fach- und Führungskräften in Europa.</p>
          <Link href={enquiry} className="mt-8 inline-flex min-h-12 items-center bg-gold px-6 py-4 font-medium text-navy hover:bg-gold/90">Inhouse-Besetzung vertraulich besprechen</Link>
        </div>
      </section>
      <section aria-labelledby="inhouse-rollen" className="bg-white px-6 py-20 lg:px-16 lg:py-28">
        <div className="mx-auto max-w-[1200px]">
          <h2 id="inhouse-rollen" className="max-w-3xl font-serif text-3xl leading-tight text-navy md:text-4xl">Welche juristische Rolle braucht Ihr Unternehmen?</h2>
          <p className="mt-6 max-w-3xl leading-relaxed text-gray-600">Der Titel folgt der tatsächlichen Verantwortung. Vergleichen Sie Aufgaben, Unterstützung und Entscheidungsspielraum, bevor Sie die Suche beginnen.</p>
          <div className="mt-10 grid gap-8 lg:grid-cols-3">{roles.map(role => <article key={role.title} className="border-t border-navy/20 pt-6">
            <h3 className="hyphens-auto font-serif text-2xl leading-snug text-navy">{role.title}</h3>
            <p className="mt-5 leading-relaxed text-gray-600">{role.responsibility}</p>
            <p className="mt-4 leading-relaxed text-gray-600">{role.assessment}</p>
          </article>)}</div>
          <p className="mt-10 leading-relaxed text-gray-600">Für Führungsmandate lesen Sie mehr zur <Link href="/de/practice-areas/general-counsel" className="underline underline-offset-4 hover:text-gold">Suche nach General Counsel und Head of Legal</Link>. Einen eigenständigen Compliance-Auftrag klären Sie über unsere <Link href="/de/practice-areas/compliance-officer" className="underline underline-offset-4 hover:text-gold">Personalberatung für Compliance-Führungskräfte</Link>.</p>
        </div>
      </section>
      <section aria-labelledby="inhouse-briefing" className="bg-cream px-6 py-20 lg:px-16 lg:py-28">
        <div className="mx-auto max-w-[1200px]">
          <h2 id="inhouse-briefing" className="max-w-3xl font-serif text-3xl leading-tight text-navy md:text-4xl">Suchprofil zwischen Geschäftsleitung, HR und Rechtsabteilung abstimmen</h2>
          <p className="mt-6 max-w-3xl leading-relaxed text-gray-600">Ein gemeinsames Briefing macht die Erwartungen vor der Kandidatenauswahl sichtbar. Nutzen Sie diese Punkte als Grundlage für das Gespräch mit B Solution.</p>
          <dl className="mt-10 grid gap-8 md:grid-cols-2">{brief.map(item => <div key={item.title}><dt className="text-lg font-medium text-navy">{item.title}</dt><dd className="mt-3 leading-relaxed text-gray-600">{item.text}</dd></div>)}</dl>
          <p className="mt-10 max-w-3xl leading-relaxed text-gray-600">Im Auswahlgespräch helfen konkrete, anonymisierte Arbeitssituationen: Wie priorisiert die Person parallele Anfragen? Wie erklärt sie Optionen einem nichtjuristischen Fachbereich? Wann bindet sie spezialisierte Beratung ein? Stimmen Sie diese Fragen mit den Verantwortlichen für die Besetzung ab.</p>
        </div>
      </section>
      <section aria-labelledby="inhouse-fragen" className="bg-white px-6 py-20 lg:px-16 lg:py-28">
        <div className="mx-auto max-w-[1200px]">
          <h2 id="inhouse-fragen" className="max-w-3xl font-serif text-3xl leading-tight text-navy md:text-4xl">Fragen zur Einstellung eines Unternehmensjuristen</h2>
          <dl className="mt-10 max-w-4xl space-y-8">{questions.map(item => <div key={item.question}><dt className="text-xl font-medium leading-relaxed text-navy">{item.question}</dt><dd className="mt-3 leading-relaxed text-gray-600">{item.answer}</dd></div>)}</dl>
        </div>
      </section>
      <section aria-labelledby="inhouse-anfrage" className="bg-cream px-6 py-20 lg:px-16 lg:py-28">
        <div className="mx-auto max-w-[1200px]">
          <h2 id="inhouse-anfrage" className="max-w-3xl font-serif text-3xl leading-tight text-navy md:text-4xl">Besprechen Sie Ihren Bedarf mit B Solution</h2>
          <p className="mt-6 max-w-3xl leading-relaxed text-gray-600">Beschreiben Sie die geplante Rolle und den Anlass der Besetzung. Gemeinsam klären wir Verantwortung, Suchmarkt und Auswahlkriterien. Informationen zum Vorgehen und zur veröffentlichten Erfahrung finden Sie unter <Link href="/de/services/legal-executive-search" className="underline underline-offset-4 hover:text-gold">Legal Executive Search</Link>.</p>
          <Link href={enquiry} className="mt-8 inline-flex min-h-12 items-center bg-navy px-6 py-4 font-medium text-white hover:bg-navy/90">Suche nach einem Unternehmensjuristen anfragen</Link>
          <p className="mt-8"><Link href="/hire-in-house-counsel" hrefLang="en" className="text-navy underline underline-offset-4 hover:text-gold">In-house legal recruitment for companies (English)</Link></p>
        </div>
      </section>
    </main>
    <Footer />
  </LanguageProvider>
}
