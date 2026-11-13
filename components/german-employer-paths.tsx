import Link from 'next/link'
import { serviceEnquiryHref } from '@/lib/service-enquiry'

export function GermanEmployerPaths() {
  return <section aria-labelledby="employer-help-heading" className="bg-cream px-8 py-20 lg:px-20 lg:py-28">
    <div className="mx-auto max-w-[1280px]">
      <p className="text-xs font-semibold uppercase tracking-widest text-navy/70">B Solution · Juristische Personalberatung seit 2007</p>
      <h2 id="employer-help-heading" className="mt-4 max-w-4xl font-serif text-3xl leading-tight text-navy md:text-4xl">Sie suchen juristische Verstärkung für Ihr Unternehmen oder Ihre Kanzlei?</h2>
      <p className="mt-6 max-w-3xl text-lg leading-relaxed text-gray-600">Finden Sie die passende Unterstützung für Ihre Besetzung. B Solution begleitet Unternehmen und Anwaltskanzleien bei vertraulichen Suchmandaten in Europa und im Nahen Osten.</p>
      <div className="mt-10 grid gap-8 md:grid-cols-2">
        <article className="border-t border-navy/20 pt-6">
          <h3 className="font-serif text-2xl text-navy">Für Unternehmen und Rechtsabteilungen</h3>
          <p className="mt-4 leading-relaxed text-gray-600">Sie suchen einen Legal Counsel für das Tagesgeschäft, einen Senior Legal Counsel für ein Fachgebiet oder den ersten Unternehmensjuristen? Auch bei der Besetzung eines Head of Legal oder General Counsel beginnt die Suche mit den tatsächlichen Aufgaben: Verträge, Beratung der Fachbereiche, betreute Länder und Verantwortung im Unternehmen.</p>
          <ul className="mt-5 space-y-3 text-navy">
            <li><Link className="underline underline-offset-4 hover:text-gold" href="/de/clients#inhouse-suchprofil">Suchprofil für Ihren Unternehmensjuristen vorbereiten</Link></li>
            <li><Link className="underline underline-offset-4 hover:text-gold" href="/hire-in-house-counsel">Legal Counsel oder ersten Inhouse-Juristen einstellen (Englisch)</Link></li>
            <li><Link className="underline underline-offset-4 hover:text-gold" href="/legal-recruitment-germany">Personalbedarf in Deutschland konkretisieren (Englisch)</Link></li>
            <li><Link className="underline underline-offset-4 hover:text-gold" href="/de/practice-areas/general-counsel">General Counsel oder Head of Legal finden</Link></li>
            <li><Link className="underline underline-offset-4 hover:text-gold" href="/de/practice-areas/compliance-officer">Compliance-Führungskraft finden</Link></li>
          </ul>
          <Link className="mt-7 inline-flex min-h-12 items-center bg-navy px-6 py-3 text-sm font-semibold text-white hover:bg-navy/90" href={serviceEnquiryHref('executive-search', 'de')}>Suche nach einem Unternehmensjuristen anfragen</Link>
        </article>
        <article className="border-t border-navy/20 pt-6">
          <h3 className="font-serif text-2xl text-navy">Für Anwaltskanzleien</h3>
          <p className="mt-4 leading-relaxed text-gray-600">Sie suchen einen Partner, Counsel oder Senior Associate, möchten ein Team verstärken oder eine Praxis aufbauen? Besprechen Sie Fachgebiet, Standort und die Anforderungen Ihrer Kanzlei.</p>
          <ul className="mt-5 space-y-3 text-navy">
            <li><Link className="underline underline-offset-4 hover:text-gold" href="/de/clients">Zusammenarbeit mit B Solution</Link></li>
            <li><Link className="underline underline-offset-4 hover:text-gold" href="/de/services/legal-executive-search">Ablauf einer vertraulichen Executive Search</Link></li>
          </ul>
        </article>
      </div>
      <Link className="mt-8 inline-flex min-h-12 items-center bg-navy px-6 py-3 text-sm font-semibold text-white hover:bg-navy/90" href="/de/contact">Eigenen Personalbedarf vertraulich anfragen</Link>
    </div>
  </section>
}
