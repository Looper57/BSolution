import Link from 'next/link'

const markets = {
  germany: {
    heading: 'Define your legal recruitment brief for Germany',
    introduction: 'A lawyer based in Germany may support a local business, report to international headquarters or lead a wider regional remit. Agree those responsibilities before choosing the candidate market.',
    corporate: 'Define whether you need a hands-on Legal Counsel, a Head of Legal for the German business or a General Counsel with a wider group remit. Clarify who sets priorities and which work stays with external advisers.',
    firm: 'Set the target office, practice and seniority. A lateral partner, specialist counsel and a partner with a team require different commercial, leadership and delivery criteria.',
    points: [
      { heading: 'Office and geographic remit', text: 'Specify the employment location, working arrangements and countries supported. A Germany-based position and a DACH or group-wide remit should not be treated as the same assignment.' },
      { heading: 'Working languages and qualification', text: 'Identify the languages used with colleagues, clients and headquarters, alongside the qualification the actual work requires. Agree the essential requirements with the hiring decision-makers.' },
      { heading: 'Reporting line and authority', text: 'Distinguish responsibility for the German business from regional leadership. Specify the relationship with management, the group legal function, existing lawyers and external advisers.' },
      { heading: 'Candidate assessment', text: 'Use examples of the work and stakeholder situations the appointee will handle. Agree evidence of judgement, communication and leadership alongside the technical requirements.' },
    ],
    cta: 'Discuss a legal hire in Germany',
  },
  uae: {
    heading: 'Define your legal recruitment brief for Dubai and the UAE',
    introduction: 'Separate the UAE employment location from the markets the lawyer will support. A Dubai-based regional leader, a local in-house specialist and a law firm partner need different search briefs.',
    corporate: 'Agree whether the position supports a UAE business or coordinates legal work across several countries. Specify reporting to regional management or global headquarters, team resources and external adviser support.',
    firm: 'Describe the office, practice and clients the role is intended to support. Clarify whether the appointment adds specialist delivery, a practice leader or a connected team.',
    points: [
      { heading: 'Employment city and regional coverage', text: 'Name the place of work and countries supported. Separate a Dubai or Abu Dhabi appointment from a wider MENA remit, including travel and working arrangements.' },
      { heading: 'Work, language and qualification', text: 'Define the legal work, working languages and qualifications needed for this specific position. Agree which matters the new hire will own and which will use local specialist support.' },
      { heading: 'Local and international candidates', text: 'Discuss whether candidates already in the UAE, candidates considering relocation or both fit the brief. Establish realistic availability and the practical arrangements the employer can support.' },
      { heading: 'Leadership and decision-making', text: 'Agree the reporting line, relationship with headquarters, decision-makers and available team. Assess regional coordination and stakeholder communication when the role requires them.' },
    ],
    cta: 'Discuss a legal hire in Dubai or the UAE',
  },
} as const

export function InternationalEmployerBrief({ market }: { market: keyof typeof markets }) {
  const copy = markets[market]
  return <>
    <section className="bg-white px-6 py-20 lg:px-16 lg:py-28" aria-labelledby="market-employer-brief">
      <div className="mx-auto max-w-[1200px]">
        <h2 id="market-employer-brief" className="scroll-mt-28 max-w-3xl font-serif text-3xl leading-tight text-navy md:text-4xl">{copy.heading}</h2>
        <p className="mt-6 max-w-3xl leading-relaxed text-gray-600">{copy.introduction}</p>
        <div className="mt-10 grid gap-10 md:grid-cols-2">
          <article className="border-t border-gold/40 pt-6"><h3 className="font-serif text-2xl text-navy">For companies and legal departments</h3><p className="mt-4 leading-relaxed text-gray-600">{copy.corporate}</p><Link href="/hire-in-house-counsel" className="mt-5 inline-block underline underline-offset-4 hover:text-gold">Define your in-house recruitment scope</Link></article>
          <article className="border-t border-gold/40 pt-6"><h3 className="font-serif text-2xl text-navy">For law firms</h3><p className="mt-4 leading-relaxed text-gray-600">{copy.firm}</p><Link href="/law-firm-recruitment" className="mt-5 inline-block underline underline-offset-4 hover:text-gold">Plan a partner or team search</Link></article>
        </div>
        <Link href="#contact-form" className="mt-10 inline-block bg-navy px-6 py-4 text-sm font-medium text-white hover:bg-navy-light">{copy.cta}</Link>
      </div>
    </section>
    <section className="bg-cream px-6 py-20 lg:px-16 lg:py-28" aria-labelledby="market-search-scope">
      <div className="mx-auto max-w-[1200px]">
        <h2 id="market-search-scope" className="font-serif text-3xl leading-tight text-navy md:text-4xl">Agree the location, responsibilities and assessment</h2>
        <dl className="mt-10 grid gap-8 md:grid-cols-2">{copy.points.map(point => <div key={point.heading}><dt className="text-lg font-medium text-navy">{point.heading}</dt><dd className="mt-3 leading-relaxed text-gray-600">{point.text}</dd></div>)}</dl>
        <p className="mt-10 max-w-3xl leading-relaxed text-gray-600">Explore the <Link className="underline underline-offset-4 hover:text-gold" href="/practice-areas/general-counsel">General Counsel and Head of Legal role</Link>, <Link className="underline underline-offset-4 hover:text-gold" href="/practice-areas/compliance-officer">compliance leadership</Link> and <Link className="underline underline-offset-4 hover:text-gold" href="/services/legal-executive-search">B Solution’s search methodology and published experience</Link>.</p>
      </div>
    </section>
  </>
}
