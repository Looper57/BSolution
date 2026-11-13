import Link from 'next/link'
import { serviceEnquiryHref } from '@/lib/service-enquiry'

const briefs = [
  {
    title: 'Unternehmensjuristen und Inhouse-Teams',
    id: 'inhouse-suchprofil',
    items: [
      { question: 'Stellen Sie den ersten Unternehmensjuristen ein?', answer: 'Beschreiben Sie die regelmäßig anfallenden Aufgaben, etwa Verträge, die Beratung der Fachbereiche oder Transaktionen. Klären Sie, welche Themen intern bearbeitet werden sollen, welche bei externen Kanzleien bleiben und wer Prioritäten setzt. Die erste interne Position ist nicht automatisch eine Juniorrolle.' },
      { question: 'Brauchen Sie einen Spezialisten oder eine juristische Führungskraft?', answer: 'Ein Senior Legal Counsel kann ein Fachgebiet verantworten; ein Head of Legal oder General Counsel übernimmt möglicherweise zusätzlich Teamführung und die Organisation der Rechtsabteilung. Halten Sie Berichtslinie, Entscheidungsbefugnisse, vorhandene Ressourcen und die Zusammenarbeit mit der Geschäftsleitung fest.' },
      { question: 'Welche Anforderungen gelten bei internationaler Verantwortung?', answer: 'Trennen Sie Beschäftigungsort und betreute Länder. Benennen Sie Arbeitssprachen, benötigte Qualifikation, Branche und verfügbare lokale Beratung. So lässt sich besprechen, welche Erfahrung für die Aufgabe erforderlich ist und wo die Suche ansetzen soll.' },
    ],
    href: '/de/practice-areas/general-counsel',
    link: 'General Counsel und Head of Legal finden',
  },
  {
    title: 'Kanzleipartner und juristische Teams',
    id: 'kanzlei-suchprofil',
    items: [
      { question: 'Geht es um Nachfolge, eine neue Praxis oder zusätzliche Kapazität?', answer: 'Beschreiben Sie den geschäftlichen Anlass und den Zielstandort. Eine Partnernachfolge, der Aufbau eines Praxisbereichs und die Verstärkung durch Counsel oder Associates brauchen unterschiedliche Suchprofile. Legen Sie Aufgaben, fachliche Schwerpunkte und die vorgesehene Rolle im Team fest.' },
      { question: 'Was sollte vor einer vertraulichen Suche geklärt sein?', answer: 'Vereinbaren Sie den Kreis der Entscheider, die Vertraulichkeit und die Kriterien für die Gespräche. Bei einem möglichen Teamwechsel sollten die einzelnen Rollen und die spätere Zusammenarbeit geklärt werden. Mögliche Mandatsbeziehungen sind gesondert zu prüfen und nicht als zugesicherter Umsatz zu behandeln.' },
      { question: 'Welche Anforderungen hat eine grenzüberschreitende Kanzleirolle?', answer: 'Halten Sie fest, in welchem Büro die Person arbeiten soll, welche Rechtsgebiete und Länder die Praxis betreut und welche Qualifikation und Arbeitssprachen die konkrete Rolle verlangt. Prüfen Sie diese Anforderungen je Zielstandort, bevor der Kandidatenmarkt für die Suche festgelegt wird.' },
    ],
    href: '/de/services/legal-executive-search',
    link: 'Unsere vertrauliche Suchmethodik',
  },
] as const

export function GermanEmployerBrief() {
  return <section className="bg-cream px-6 py-20 lg:px-16 lg:py-28" aria-labelledby="german-employer-brief">
    <div className="mx-auto max-w-[1200px]">
      <h2 id="german-employer-brief" className="max-w-3xl font-serif text-3xl leading-tight text-navy md:text-4xl">Welches Suchprofil braucht Ihr Unternehmen oder Ihre Kanzlei?</h2>
      <p className="mt-6 max-w-3xl leading-relaxed text-gray-600">Beginnen Sie mit dem Anlass der Besetzung und der tatsächlichen Verantwortung. Mit diesen Fragen bereiten Sie ein konkretes Gespräch mit B Solution vor.</p>
      <div className="mt-10 grid gap-12 lg:grid-cols-2">
        {briefs.map(brief => <article key={brief.title} id={brief.id} className="scroll-mt-28">
          <h3 className="font-serif text-2xl text-navy">{brief.title}</h3>
          <dl className="mt-7 space-y-7">{brief.items.map(item => <div key={item.question}>
            <dt className="font-medium leading-relaxed text-navy">{item.question}</dt>
            <dd className="mt-3 leading-relaxed text-gray-600">{item.answer}</dd>
          </div>)}</dl>
          <Link className="mt-7 inline-block underline underline-offset-4 hover:text-gold" href={brief.href}>{brief.link}</Link>
        </article>)}
      </div>
      <p className="mt-12 max-w-3xl leading-relaxed text-gray-600">Für die erste Anfrage genügen Rolle, Anlass, Standort, betreute Länder, Sprachen und ein grober Vergütungsrahmen. Übermitteln Sie zunächst keine vertraulichen Personal- oder Mandantendaten. Den Suchumfang stimmen wir anschließend gemeinsam ab.</p>
      <Link className="mt-7 inline-block bg-navy px-6 py-4 text-sm font-medium text-white hover:bg-navy-light" href={serviceEnquiryHref('executive-search', 'de')}>Ihr Suchprofil mit B Solution besprechen</Link>
    </div>
  </section>
}
