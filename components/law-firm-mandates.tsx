import Link from 'next/link'

const scenarios = [
  {
    title: 'Recruit a lateral partner',
    purpose: 'Strengthen an established practice or plan succession in a leadership role.',
    brief: 'Agree the partner’s responsibilities, specialist work, target office and place in the partnership. Distinguish practice leadership from an individual fee-earning role.',
    assessment: 'Explore business development, leadership and the support the partner would need from your firm. Assess proposed client opportunities separately from confirmed commitments.',
  },
  {
    title: 'Bring in a partner and team',
    purpose: 'Add a connected group with the skills to deliver work together.',
    brief: 'Define each role, reporting line and the capacity your current team will provide. Discuss whether the proposed group fits the practice you intend to build.',
    assessment: 'Assess the people individually as well as the group. Agree the sequence of discussions and who will own integration, resourcing and internal communication.',
  },
  {
    title: 'Build or expand a practice',
    purpose: 'Develop a specialism or support an office entering a new market.',
    brief: 'Identify the client need, work you expect the practice to handle and the existing referral or delivery support. Decide whether an anchor partner or specialist counsel is the first appointment.',
    assessment: 'Define the employment location, qualifications and working languages. Test the brief against the candidate market before committing to follow-on hiring.',
  },
]

export function LawFirmMandateGuide() {
  return <section className="bg-white px-8 py-20 lg:px-16 lg:py-28" aria-labelledby="law-firm-mandates">
    <div className="mx-auto max-w-[1280px]">
      <h2 id="law-firm-mandates" className="max-w-3xl font-serif text-3xl leading-tight text-navy md:text-4xl">Which partner or team search does your firm need?</h2>
      <p className="mt-6 max-w-3xl leading-relaxed text-gray-600">Start with the practice you want to strengthen. A lateral partner appointment, a team move and a new practice need different briefs and assessment criteria.</p>
      <div className="mt-10 grid gap-10 lg:grid-cols-3">{scenarios.map(scenario => <article className="border-t border-gold/40 pt-6" key={scenario.title}>
        <h3 className="font-serif text-2xl text-navy">{scenario.title}</h3>
        <p className="mt-4 font-medium leading-relaxed text-navy">{scenario.purpose}</p>
        <p className="mt-4 leading-relaxed text-gray-600">{scenario.brief}</p>
        <p className="mt-4 leading-relaxed text-gray-600">{scenario.assessment}</p>
      </article>)}</div>
      <div className="mt-12 border-t border-navy/20 pt-8">
        <h3 className="font-serif text-2xl text-navy">Prepare the first conversation</h3>
        <p className="mt-4 max-w-3xl leading-relaxed text-gray-600">Outline the practice area, office, role, reason for hiring, decision-makers and intended timing. An initial enquiry can describe the mandate without naming individual candidates or clients. Agree the scope and confidential information-sharing process before detailed candidate discussions.</p>
        <Link className="mt-6 inline-block bg-navy px-6 py-4 text-sm font-medium text-white hover:bg-navy-light" href="#contact-form">Discuss your partner or team recruitment brief</Link>
      </div>
    </div>
  </section>
}

export function LawFirmSearchProcess() {
  const steps = [
    { title: 'Agree the mandate', text: 'Clarify the business purpose, office, role, partnership expectations and people who will make the decision. Set the scope and confidentiality of the search together.' },
    { title: 'Define the candidate market', text: 'Discuss the relevant practice, seniority, locations and languages. Agree how candidates will be assessed and which information is appropriate at each stage.' },
    { title: 'Assess the fit', text: 'Compare technical work, leadership and commercial expectations with the agreed brief. Explore what depends on the individual, a proposed team and the support of your existing firm.' },
    { title: 'Prepare the appointment', text: 'Align the decision-makers on the role and proposed terms. Discuss responsibilities for transition and integration, including how the new hire will work with existing partners and teams.' },
  ]
  return <section className="bg-cream px-8 py-20 lg:px-16 lg:py-28" aria-labelledby="law-firm-process">
    <div className="mx-auto max-w-[1280px]">
      <h2 id="law-firm-process" className="font-serif text-3xl leading-tight text-navy md:text-4xl">From a growth priority to a defined search</h2>
      <ol className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-4">{steps.map((step, index) => <li className="border-t border-navy/20 pt-6" key={step.title}>
        <span className="text-sm font-medium text-gold">0{index + 1}</span>
        <h3 className="mt-3 font-serif text-xl text-navy">{step.title}</h3>
        <p className="mt-4 leading-relaxed text-gray-600">{step.text}</p>
      </li>)}</ol>
      <p className="mt-10 max-w-3xl leading-relaxed text-gray-600">Review <Link className="underline underline-offset-4 hover:text-gold" href="/services/legal-executive-search">B Solution’s executive search methodology, published experience and professional recommendations</Link>, or explore the location of your brief: <Link className="underline underline-offset-4 hover:text-gold" href="/legal-recruitment-europe">Europe</Link>, <Link className="underline underline-offset-4 hover:text-gold" href="/legal-recruitment-germany">Germany</Link> or <Link className="underline underline-offset-4 hover:text-gold" href="/legal-recruitment-dubai">Dubai and the UAE</Link>.</p>
    </div>
  </section>
}
