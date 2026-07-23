import type { Locale } from '@/lib/i18n/config'

const organisations = [
  'White & Case',
  'Clifford Chance',
  'Bird & Bird',
  'CMS Cameron McKenna',
  'IBM',
  'Johnson & Johnson',
  'Coca-Cola',
  'Zentiva',
  'J&T Bank',
  'Komerční banka',
  'LBBW Bank',
  'Orco Property Group',
  'Wolf Theiss',
  'KPMG Legal',
  'DLA Piper',
] as const

const labels = {
  en: {
    eyebrow: 'Selected Experience',
    heading: 'Selected Executive Search Experience',
    introduction: 'Selected organisations we have supported through Executive Search assignments.',
    testimonials: 'Professional Recommendations',
  },
  cs: {
    eyebrow: 'Vybrané zkušenosti',
    heading: 'Vybrané zkušenosti z Executive Search',
    introduction: 'Vybrané organizace, které jsme podpořili prostřednictvím projektů Executive Search.',
    testimonials: 'Profesní doporučení',
  },
  de: {
    eyebrow: 'Ausgewählte Erfahrung',
    heading: 'Ausgewählte Executive-Search-Erfahrung',
    introduction: 'Ausgewählte Organisationen, die wir bei Executive-Search-Mandaten unterstützt haben.',
    testimonials: 'Professionelle Empfehlungen',
  },
  pl: {
    eyebrow: 'Wybrane doświadczenie',
    heading: 'Wybrane doświadczenie w Executive Search',
    introduction: 'Wybrane organizacje, które wspieraliśmy w ramach projektów Executive Search.',
    testimonials: 'Rekomendacje zawodowe',
  },
} as const

const testimonials = [
  {
    quote:
      'Lukas is an experienced professional, customer oriented and constantly focused on business solutions providing a significant added value and professional guidance for his clients.',
    name: 'Vladimír Polách',
    role: 'Partner',
    organisation: 'Squire Patton Boggs Prague',
  },
  {
    quote:
      'Lukáš is a real expert and professional – reliable, trustworthy, task oriented. He is good advisor, perfectly understanding and supporting business.',
    name: 'Dominika Nosačková',
    role: 'Head of Legal',
    organisation: 'Coca-Cola HBC Czech Republic & Slovakia',
  },
] as const

export function AuthorityProof({ locale }: { locale: Locale }) {
  const copy = labels[locale]

  return (
    <section className="bg-off-white py-24 md:py-32 lg:py-40" aria-labelledby="authority-proof-heading">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
        <div className="max-w-3xl mx-auto text-center">
          <p className="eyebrow mb-6">{copy.eyebrow}</p>
          <h2 id="authority-proof-heading" className="text-navy">
            {copy.heading}
          </h2>
          <p className="mt-6 text-gray-500 text-[17px] leading-[1.8]">
            {copy.introduction}
          </p>
        </div>

        <ul className="mt-14 flex flex-wrap justify-center gap-x-8 gap-y-5" aria-label={copy.introduction}>
          {organisations.map((organisation) => (
            <li
              key={organisation}
              className="text-navy/65 text-[13px] font-medium tracking-[0.04em]"
            >
              {organisation}
            </li>
          ))}
        </ul>

        <div className="mt-24">
          <h3 className="text-center text-navy text-[22px] font-serif">{copy.testimonials}</h3>
          <div className="mt-12 grid md:grid-cols-2 gap-8 lg:gap-12">
            {testimonials.map((testimonial) => (
              <figure key={testimonial.name} className="border-t border-gold/30 pt-8">
                <blockquote className="text-charcoal/75 text-[17px] leading-[1.8]">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-7">
                  <p className="text-navy font-medium">{testimonial.name}</p>
                  <p className="mt-1 text-gray-500 text-[14px]">
                    {testimonial.role}, {testimonial.organisation}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
