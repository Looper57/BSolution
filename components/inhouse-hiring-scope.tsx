import Link from 'next/link'

const roles = [
  {
    name: 'First in-house lawyer',
    ownership: 'The recurring work to bring inside, who sets priorities and the specialist support available from external advisers. A first hire does not automatically mean a junior role.',
    assessment: 'Independent judgement, handling competing requests and explaining when the business needs specialist advice.',
  },
  {
    name: 'Senior Legal Counsel or specialist',
    ownership: 'A defined workload or specialism within the team: commercial contracts, transactions, disputes, privacy or another agreed area. Clarify escalation to the legal leader.',
    assessment: 'Relevant work examples, business judgement and the ability to collaborate with the teams this lawyer will support.',
  },
  {
    name: 'General Counsel or Head of Legal',
    ownership: 'The legal function, reporting line, team, external advisers and interaction with leadership. Define whether the remit is local, regional or group-wide.',
    assessment: 'Leadership, prioritisation, communication with decision-makers and experience working with a comparable level of responsibility.',
  },
]

export function InHouseHiringScope() {
  return <section className="bg-white px-6 py-20 lg:px-16 lg:py-28" aria-labelledby="inhouse-role-scope">
    <div className="mx-auto max-w-[1200px]">
      <h2 id="inhouse-role-scope" className="scroll-mt-28 max-w-3xl font-serif text-3xl leading-tight text-navy md:text-4xl">Which in-house legal role fits the work?</h2>
      <p className="mt-6 max-w-3xl leading-relaxed text-gray-600">Define the responsibilities before choosing a title. Compare what your business needs the lawyer to own and the evidence you want to explore during selection.</p>
      <div className="mt-10 overflow-x-auto rounded-sm border border-navy/15 focus-visible:outline-2 focus-visible:outline-gold" role="region" aria-label="Compare in-house legal hiring responsibilities" tabIndex={0}>
        <table className="w-full min-w-[680px] border-collapse text-left">
          <caption className="sr-only">Recruitment scope for a first lawyer, a specialist and a legal leader</caption>
          <thead className="bg-cream text-navy"><tr>
            <th scope="col" className="w-1/5 p-5 font-medium">Hiring need</th>
            <th scope="col" className="w-2/5 p-5 font-medium">Agree the responsibilities</th>
            <th scope="col" className="w-2/5 p-5 font-medium">Explore during assessment</th>
          </tr></thead>
          <tbody>{roles.map(role => <tr key={role.name} className="border-t border-navy/15 align-top">
            <th scope="row" className="p-5 font-medium leading-relaxed text-navy">{role.name}</th>
            <td className="p-5 leading-relaxed text-gray-600">{role.ownership}</td>
            <td className="p-5 leading-relaxed text-gray-600">{role.assessment}</td>
          </tr>)}</tbody>
        </table>
      </div>
      <p className="mt-8 max-w-3xl leading-relaxed text-gray-600">For leadership responsibilities, explore <Link className="underline underline-offset-4 hover:text-gold" href="/practice-areas/general-counsel">General Counsel and Head of Legal recruitment</Link>. For a dedicated compliance remit, define it through our <Link className="underline underline-offset-4 hover:text-gold" href="/practice-areas/compliance-officer">compliance leadership service</Link>.</p>
    </div>
  </section>
}

export function InHouseAssessmentBrief() {
  const questions = [
    { title: 'Priorities and workload', text: 'Describe a realistic week: competing business requests, planned projects and work that can wait. Ask how the candidate would set priorities and communicate trade-offs.' },
    { title: 'Business communication', text: 'Use a hypothetical decision relevant to the role. Explore how the candidate explains options to a non-legal colleague and identifies who needs to make the decision.' },
    { title: 'International responsibilities', text: 'Specify the employment location, countries supported and working languages. Clarify the qualifications required and where local specialist support will be available.' },
    { title: 'Resources and leadership', text: 'Agree the reporting line, available team and external advisers. For a leadership appointment, explore how the candidate would organise the function and work with senior stakeholders.' },
  ]
  return <section className="bg-cream px-6 py-20 lg:px-16 lg:py-28" aria-labelledby="inhouse-assessment-brief">
    <div className="mx-auto max-w-[1200px]">
      <h2 id="inhouse-assessment-brief" className="scroll-mt-28 max-w-3xl font-serif text-3xl leading-tight text-navy md:text-4xl">Prepare a brief your business and legal stakeholders can assess</h2>
      <p className="mt-6 max-w-3xl leading-relaxed text-gray-600">A useful brief makes the work, support and decision-making responsibilities clear. Bring these points to your first discussion with B Solution so the search can be scoped around your business.</p>
      <dl className="mt-10 grid gap-8 md:grid-cols-2">{questions.map(question => <div key={question.title}>
        <dt className="text-lg font-medium text-navy">{question.title}</dt>
        <dd className="mt-3 leading-relaxed text-gray-600">{question.text}</dd>
      </div>)}</dl>
      <p className="mt-10 max-w-3xl leading-relaxed text-gray-600">Read <Link className="underline underline-offset-4 hover:text-gold" href="/services/legal-executive-search">our executive search methodology and published experience</Link>. For an example of how a first legal-leadership brief can be developed, see the <Link className="underline underline-offset-4 hover:text-gold" href="/case-studies/general-counsel-fintech">illustrative General Counsel mandate for a cross-border fintech</Link>.</p>
      <Link href="#contact-form" className="mt-8 inline-block bg-navy px-6 py-4 text-sm font-medium text-white hover:bg-navy-light">Discuss the scope of your in-house legal hire</Link>
    </div>
  </section>
}
