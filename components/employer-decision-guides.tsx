import Link from 'next/link'

const linkStyle = 'underline underline-offset-4 hover:text-gold'

/** Existing employer entry points help readers choose an established
 * service page; they do not become parallel role or country landing pages. */
export function CompanyHiringPaths() {
  const paths = [
    {
      heading: 'Your first in-house lawyer',
      text: 'Define the recurring work your business needs to bring inside: commercial contracts, advice to operating teams and coordination with external counsel. Agree who sets priorities and what specialist work will remain outside the business.',
      href: '/hire-in-house-counsel',
      label: 'Plan your first in-house counsel appointment',
    },
    {
      heading: 'A new leader for an existing legal team',
      text: 'Clarify the team, reporting line and decision-making authority. Succession, a confidential replacement and a newly created leadership role call for different experience. The title should follow the responsibilities you need the person to own.',
      href: '/practice-areas/general-counsel',
      label: 'Define your General Counsel or Head of Legal role',
    },
    {
      heading: 'A legal team working across borders',
      text: 'Separate the employment location from the countries the lawyer will support. Set the working languages, qualification requirements and relationship between local, regional and group teams before agreeing the candidate market.',
      href: '/legal-recruitment-europe',
      label: 'Explore cross-border legal recruitment in Europe',
    },
  ]
  return <section aria-labelledby="company-hiring-paths" className="bg-cream px-6 py-20 lg:px-12 lg:py-28">
    <div className="mx-auto max-w-[1280px]">
      <h2 id="company-hiring-paths" className="max-w-3xl font-serif text-3xl leading-tight text-navy md:text-4xl">Which legal recruitment brief fits your company?</h2>
      <p className="mt-6 max-w-3xl leading-relaxed text-gray-600">Start with the business situation and the work that needs an owner. These routes explain the relevant service and help you prepare a specific enquiry.</p>
      <div className="mt-10 grid gap-10 lg:grid-cols-3">{paths.map(path => <article key={path.href} className="border-t border-navy/20 pt-6">
        <h3 className="font-serif text-2xl text-navy">{path.heading}</h3>
        <p className="mt-4 leading-relaxed text-gray-600">{path.text}</p>
        <Link className={`${linkStyle} mt-5 inline-block text-navy`} href={path.href}>{path.label}</Link>
      </article>)}</div>
      <p className="mt-10 max-w-3xl leading-relaxed text-gray-600">Discuss the market alongside the role: <Link className={linkStyle} href="/legal-recruitment-germany">legal recruitment in Germany</Link> or <Link className={linkStyle} href="/legal-recruitment-dubai">legal recruitment in Dubai and the UAE</Link>. The work location remains specific even when the candidate search crosses borders.</p>
      <p className="mt-5 leading-relaxed text-gray-600">Recruiting for a partnership rather than a corporate legal team? See <Link className={linkStyle} href="/law-firm-recruitment">international law firm partner and lateral recruitment</Link>.</p>
    </div>
  </section>
}

export function LeadershipMandateBrief() {
  const questions = [
    { question: 'What needs to change after the appointment?', answer: 'Identify the business decisions the legal leader must support and the legal work or team they will own. Separate ongoing responsibilities from a specific transformation, transaction or expansion.' },
    { question: 'Who will the legal leader report to?', answer: 'Agree the reporting line, access to senior decision-makers and responsibility for people and external advisers. These determine the leadership brief more clearly than the job title alone.' },
    { question: 'What belongs in the assessment?', answer: 'Use examples of comparable business situations to explore legal judgement, prioritisation, stakeholder communication and team leadership. Agree the interview decision-makers and criteria before reviewing candidates.' },
    { question: 'Which international requirements are essential?', answer: 'Specify the employment location, countries supported, working languages and required qualification. Distinguish experience that is essential from experience the new leader can develop with local specialist support.' },
  ]
  return <section aria-labelledby="leadership-mandate-brief" className="bg-white px-6 py-20 lg:px-12 lg:py-28">
    <div className="mx-auto max-w-[1200px]">
      <h2 id="leadership-mandate-brief" className="max-w-3xl font-serif text-3xl leading-tight text-navy md:text-4xl">A legal leadership brief your decision-makers can agree</h2>
      <p className="mt-6 max-w-3xl leading-relaxed text-gray-600">Before a search for a Head of Legal or General Counsel, agree the mandate with the people who will select and work with the appointee. Bring these points to your first conversation with B Solution.</p>
      <dl className="mt-10 grid gap-8 md:grid-cols-2">{questions.map(item => <div key={item.question}>
        <dt className="text-lg font-medium text-navy">{item.question}</dt>
        <dd className="mt-3 leading-relaxed text-gray-600">{item.answer}</dd>
      </div>)}</dl>
      <div className="mt-10 border-t border-navy/20 pt-8">
        <p className="max-w-3xl leading-relaxed text-gray-600">Explore the <Link className={linkStyle} href="/practice-areas/general-counsel">General Counsel and Head of Legal role</Link> and our <Link className={linkStyle} href="/services/legal-executive-search">retained legal executive search process</Link>. For a hands-on first legal hire, start with <Link className={linkStyle} href="/hire-in-house-counsel">in-house counsel recruitment</Link>.</p>
        <p className="mt-5 max-w-3xl leading-relaxed text-gray-600">For context, read our <Link className={linkStyle} href="/case-studies/general-counsel-fintech">illustrative first-General-Counsel mandate for a cross-border fintech</Link>. It explains the approach without identifying a client.</p>
        <Link className="mt-8 inline-block bg-navy px-6 py-4 text-sm font-medium text-white hover:bg-navy-light" href="/contact">Discuss your legal leadership brief</Link>
      </div>
    </div>
  </section>
}
