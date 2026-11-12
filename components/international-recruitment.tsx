import Link from 'next/link'

/** Buyer journeys on existing canonical pages; no parallel service URLs. */
export function InternationalRecruitment() {
  return (
    <section aria-labelledby="international-recruitment-heading" className="bg-cream px-8 py-20 lg:px-20 lg:py-28">
      <div className="mx-auto max-w-[1280px]">
        <p className="text-xs font-semibold uppercase tracking-widest text-navy/70">B Solution · Legal recruitment since 2007</p>
        <h2 id="international-recruitment-heading" className="mt-4 max-w-4xl font-serif text-3xl leading-tight text-navy md:text-4xl">
          Legal recruitment for international law firms and in-house teams
        </h2>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-gray-600">
          B Solution helps law firms and companies appoint lawyers across Europe and the Middle East.
          We agree the role and target market, map relevant legal talent and approach candidates confidentially.
        </p>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <article className="border-t border-navy/20 pt-6">
            <h3 className="font-serif text-2xl text-navy">Law firm partner and lateral recruitment</h3>
            <p className="mt-4 leading-relaxed text-gray-600">
              For international and regional law firms hiring partners, counsel and senior associates,
              considering a team move or developing a practice in another market.
            </p>
            <ul className="mt-5 space-y-3 text-navy">
              <li><Link className="underline underline-offset-4 hover:text-gold" href="/law-firm-recruitment">Explore law firm recruitment</Link></li>
              <li><Link className="underline underline-offset-4 hover:text-gold" href="/services/legal-executive-search">Our retained legal executive search process</Link></li>
            </ul>
          </article>
          <article className="border-t border-navy/20 pt-6">
            <h3 className="font-serif text-2xl text-navy">In-house legal recruitment for companies</h3>
            <p className="mt-4 leading-relaxed text-gray-600">
              For businesses hiring a General Counsel, Head of Legal, Senior Legal Counsel or compliance leader,
              building a legal department or coordinating a cross-border appointment.
            </p>
            <ul className="mt-5 space-y-3 text-navy">
              <li><Link className="underline underline-offset-4 hover:text-gold" href="/hire-in-house-counsel">Hire an in-house lawyer</Link></li>
              <li><Link className="underline underline-offset-4 hover:text-gold" href="/practice-areas/general-counsel">General Counsel and Head of Legal search</Link></li>
              <li><Link className="underline underline-offset-4 hover:text-gold" href="/practice-areas/compliance-officer">Compliance leadership recruitment</Link></li>
            </ul>
          </article>
        </div>
        <div className="mt-10 border-t border-navy/20 pt-6">
          <h3 className="text-base font-semibold text-navy">Explore recruitment by market</h3>
          <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-3 text-navy">
            <li><Link className="underline underline-offset-4 hover:text-gold" href="/legal-recruitment-europe">Cross-border legal recruitment in Europe</Link></li>
            <li><Link className="underline underline-offset-4 hover:text-gold" href="/legal-recruitment-germany">Legal recruitment in Germany</Link></li>
            <li><Link className="underline underline-offset-4 hover:text-gold" href="/legal-recruitment-dubai">Legal recruitment in Dubai and the UAE</Link></li>
          </ul>
        </div>
        <Link className="mt-8 inline-flex min-h-12 items-center bg-navy px-6 py-3 text-sm font-semibold text-white hover:bg-navy/90" href="/contact">
          Discuss an international hiring mandate
        </Link>
      </div>
    </section>
  )
}
