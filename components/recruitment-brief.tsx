import Link from 'next/link'

const briefs = {
  'in-house': {
    heading: 'Planning an in-house legal hire across borders',
    introduction: 'Hiring your first corporate lawyer, replacing a senior counsel or adding regional responsibility calls for a different brief. Use these questions to define the work and level of responsibility before discussing your recruitment mandate.',
    enquiry: 'Discuss an in-house legal recruitment brief',
    items: [
      { question: 'Are you hiring your first in-house lawyer or strengthening an existing team?', answer: 'Start with the work the lawyer will own: commercial contracts, business advice, transactions, disputes or regulatory matters. Define which work stays with external counsel and who the new hire will report to. This helps distinguish a hands-on Legal Counsel brief from a team leadership appointment.' },
      { question: 'Do you need a General Counsel, Head of Legal or regional legal leader?', answer: 'Define the reporting line, board interaction, team responsibility and geographic remit before selecting the title. A Group General Counsel, a regional Head of Legal and a Senior Legal Counsel can require different leadership experience and decision-making authority.' },
      { question: 'What belongs in an international recruitment brief?', answer: 'Specify the employment location, countries supported, required qualification, working languages and business sector. Add the reporting line, compensation range and confidentiality requirements. Discuss these with B Solution before agreeing the target market and search scope.' },
    ],
    links: [
      { href: '/practice-areas/general-counsel', label: 'General Counsel and Head of Legal recruitment' },
      { href: '/practice-areas/compliance-officer', label: 'Compliance leadership search' },
      { href: '/services/legal-executive-search', label: 'How our retained search works' },
    ],
  },
  'law-firm': {
    heading: 'Planning a partner, lateral hire or team move',
    introduction: 'An international law firm may need a practice builder, a succession appointment or specialist delivery capacity. Define the business purpose and target office first, then the experience and responsibilities the hire requires.',
    enquiry: 'Discuss a law firm recruitment brief',
    items: [
      { question: 'Are you hiring a partner, counsel or senior associate?', answer: 'Define the practice area, target jurisdiction, qualification and role within the partnership or team. A partner hire may focus on practice development and leadership; a counsel or senior associate brief may prioritise specialist delivery and progression. Agree the requirements before approaching the market.' },
      { question: 'How should a cross-border law firm search be scoped?', answer: 'Identify the office where the lawyer will work, the clients and jurisdictions the practice serves, and the languages needed for the role. B Solution can then discuss the relevant candidate market and a coordinated search brief without assuming that legal qualifications transfer between jurisdictions.' },
      { question: 'What should be agreed before a confidential approach?', answer: 'Discuss the strategic purpose of the hire, assessment criteria, confidentiality, potential conflicts and decision-makers. For a team move, clarify the intended structure and individual roles. Candidate information and a move under discussion should be handled through an agreed confidential process.' },
    ],
    links: [
      { href: '/services/legal-executive-search', label: 'Our confidential executive search process' },
      { href: '/legal-recruitment-europe', label: 'Cross-border legal recruitment in Europe' },
    ],
  },
} as const

export function RecruitmentBrief({ audience }: { audience: keyof typeof briefs }) {
  const brief = briefs[audience]
  return <section className="bg-white px-8 py-16 lg:px-16 lg:py-20" aria-labelledby={`${audience}-hiring-brief`}>
    <div className="mx-auto max-w-[1200px]">
      <h2 id={`${audience}-hiring-brief`} className="max-w-3xl font-serif text-3xl leading-tight text-navy md:text-4xl">{brief.heading}</h2>
      <p className="mt-5 max-w-3xl leading-relaxed text-gray-600">{brief.introduction}</p>
      <dl className="mt-8 grid gap-8 lg:grid-cols-3">{brief.items.map(item => <div key={item.question}>
        <dt className="text-lg font-medium text-navy">{item.question}</dt>
        <dd className="mt-3 leading-relaxed text-gray-600">{item.answer}</dd>
      </div>)}</dl>
      <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-4 text-navy">{brief.links.map(link => <li key={link.href}>
        <Link className="underline underline-offset-4 hover:text-gold" href={link.href}>{link.label}</Link>
      </li>)}</ul>
      <Link className="mt-8 inline-block bg-navy px-6 py-4 text-sm font-medium text-white hover:bg-navy-light" href="/contact">{brief.enquiry}</Link>
    </div>
  </section>
}
