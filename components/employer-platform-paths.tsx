'use client'

import Link from 'next/link'
import { useLanguage } from '@/lib/language-context'
import { localizedPath } from '@/lib/i18n/config'
import { serviceEnquiryHref } from '@/lib/service-enquiry'

// Public canonical destinations verified on LawBridge's own directory. No
// authenticated partner URL, employer identifier, profile or CV is transferred.
export const lawBridgeDirectoryUrls = {
  en: 'https://www.lawbridge.eu/en/lawyers',
  cs: 'https://www.lawbridge.eu/cs/advokati',
  de: 'https://www.lawbridge.eu/de/anwaelte',
  pl: 'https://www.lawbridge.eu/pl/prawnicy',
} as const

const copy = {
  en: {
    heading: 'Choose the next step for your legal hire',
    intro: 'For a company building its legal department or a law firm adding a lawyer, start with a search brief or explore the profiles already published by B Solution.',
    search: 'Discuss a dedicated search',
    searchBody: 'Describe the role, location, responsibilities and languages. We can discuss a search for your specific requirements.',
    searchCta: 'Discuss Legal Executive Search',
    profiles: 'Explore published candidate profiles',
    profilesBody: 'Review anonymous summaries of experience, practice areas, languages and preferred locations. Ask about a relevant profile through B Solution; an introduction is arranged separately.',
    profilesCta: 'View candidate profiles',
    adviser: 'Need an external lawyer for a specific matter?',
    adviserBody: 'Our sister platform LawBridge helps you find independent lawyers and law firms for legal services. Agree the engagement and fees directly with the lawyer.',
    adviserCta: 'Find a legal adviser on LawBridge',
  },
  cs: {
    heading: 'Vyberte další krok pro váš právní tým',
    intro: 'Firma budující právní oddělení i kancelář hledající právníka může začít zadáním hledání nebo prohlédnutím profilů zveřejněných B Solution.',
    search: 'Projednat cílené vyhledávání',
    searchBody: 'Popište roli, místo výkonu práce, odpovědnosti a jazyky. Projednáme hledání podle vašich konkrétních požadavků.',
    searchCta: 'Projednat Legal Executive Search',
    profiles: 'Prohlédnout zveřejněné profily kandidátů',
    profilesBody: 'Prohlédněte anonymní přehled praxe, specializace, jazyků a preferovaných lokalit. Na relevantní profil se zeptejte prostřednictvím B Solution; představení se sjednává samostatně.',
    profilesCta: 'Zobrazit profily kandidátů',
    adviser: 'Potřebujete externího advokáta pro konkrétní věc?',
    adviserBody: 'Naše sesterská platforma LawBridge pomáhá vyhledat nezávislé advokáty a kanceláře pro právní služby. Podmínky zastoupení a odměnu sjednáváte přímo s advokátem.',
    adviserCta: 'Najít právního poradce na LawBridge',
  },
  de: {
    heading: 'Wählen Sie den nächsten Schritt für Ihr Rechtsteam',
    intro: 'Ob Unternehmen mit eigener Rechtsabteilung oder Kanzlei auf Personalsuche: Beginnen Sie mit einem Suchauftrag oder sehen Sie sich die von B Solution veröffentlichten Profile an.',
    search: 'Eine gezielte Suche besprechen',
    searchBody: 'Beschreiben Sie Rolle, Arbeitsort, Verantwortlichkeiten und Sprachen. Wir besprechen eine Suche nach Ihren konkreten Anforderungen.',
    searchCta: 'Legal Executive Search besprechen',
    profiles: 'Veröffentlichte Kandidatenprofile ansehen',
    profilesBody: 'Prüfen Sie anonyme Angaben zu Erfahrung, Fachgebieten, Sprachen und bevorzugten Standorten. Fragen Sie B Solution nach einem passenden Profil; eine Vorstellung wird separat vereinbart.',
    profilesCta: 'Kandidatenprofile ansehen',
    adviser: 'Benötigen Sie einen externen Anwalt für eine konkrete Angelegenheit?',
    adviserBody: 'Unsere Schwesterplattform LawBridge hilft bei der Suche nach unabhängigen Anwälten und Kanzleien für Rechtsdienstleistungen. Mandat und Honorar vereinbaren Sie direkt mit dem Anwalt.',
    adviserCta: 'Rechtsberater auf LawBridge finden',
  },
  pl: {
    heading: 'Wybierz kolejny krok dla swojego zespołu prawnego',
    intro: 'Firma budująca dział prawny lub kancelaria szukająca prawnika może zacząć od omówienia rekrutacji albo przejrzeć profile opublikowane przez B Solution.',
    search: 'Omów wyszukiwanie kandydatów',
    searchBody: 'Opisz rolę, miejsce pracy, odpowiedzialność i języki. Omówimy wyszukiwanie zgodne z konkretnymi wymaganiami.',
    searchCta: 'Omów Legal Executive Search',
    profiles: 'Przejrzyj opublikowane profile kandydatów',
    profilesBody: 'Sprawdź anonimowe informacje o doświadczeniu, specjalizacji, językach i preferowanych lokalizacjach. Zapytaj B Solution o odpowiedni profil; przedstawienie kandydata jest uzgadniane osobno.',
    profilesCta: 'Zobacz profile kandydatów',
    adviser: 'Potrzebujesz zewnętrznego prawnika do konkretnej sprawy?',
    adviserBody: 'Nasza siostrzana platforma LawBridge pomaga znaleźć niezależnych prawników i kancelarie świadczące usługi prawne. Warunki współpracy i wynagrodzenie uzgadniasz bezpośrednio z prawnikiem.',
    adviserCta: 'Znajdź doradcę prawnego na LawBridge',
  },
} as const

export function EmployerPlatformPaths() {
  const { language } = useLanguage()
  const text = copy[language]
  return <section aria-labelledby="employer-next-step" className="bg-cream px-6 py-20 lg:px-16 lg:py-28">
    <div className="mx-auto max-w-[1200px]">
      <h2 id="employer-next-step" className="max-w-3xl font-serif text-3xl leading-tight text-navy md:text-4xl">{text.heading}</h2>
      <p className="mt-6 max-w-3xl leading-relaxed text-gray-600">{text.intro}</p>
      <div className="mt-10 grid gap-8 md:grid-cols-2">
        <article className="border border-navy/10 bg-white p-7"><h3 className="font-serif text-2xl text-navy">{text.search}</h3><p className="mt-4 leading-relaxed text-gray-600">{text.searchBody}</p><Link className="mt-6 inline-block underline underline-offset-4 hover:text-gold" href={serviceEnquiryHref('executive-search', language)}>{text.searchCta}</Link></article>
        <article className="border border-navy/10 bg-white p-7"><h3 className="font-serif text-2xl text-navy">{text.profiles}</h3><p className="mt-4 leading-relaxed text-gray-600">{text.profilesBody}</p><Link className="mt-6 inline-block underline underline-offset-4 hover:text-gold" href={localizedPath(language, '/available-lawyers')}>{text.profilesCta}</Link></article>
      </div>
      <aside className="mt-10 max-w-3xl border-t border-navy/10 pt-8"><h3 className="font-serif text-xl text-navy">{text.adviser}</h3><p className="mt-3 leading-relaxed text-gray-600">{text.adviserBody}</p><a className="mt-4 inline-block underline underline-offset-4 hover:text-gold" href={lawBridgeDirectoryUrls[language]}>{text.adviserCta}</a></aside>
    </div>
  </section>
}
