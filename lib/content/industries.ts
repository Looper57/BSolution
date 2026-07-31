import type { Entity } from './types'

export const industries: Entity[] = [
  {
    kind: 'industry',
    slug: 'financial-services',
    basePath: '/industries/financial-services',
    complete: true,
    related: {
      services: ['legal-executive-search'],
      practices: ['general-counsel', 'compliance-officer'],
      caseStudies: ['general-counsel-fintech'],
    },
    content: {
      en: {
        title: 'Financial Services',
        summary:
          'Legal and compliance leadership for banks, asset managers, insurers and fintechs operating under intense regulatory scrutiny.',
        metaTitle: 'Legal Executive Search for Financial Services',
        metaDescription:
          'Retained legal and compliance executive search for banks, asset managers, insurers and fintechs across Europe and the Middle East.',
        sections: [
          {
            heading: 'Legal leadership under regulatory scrutiny',
            paragraphs: [
              'Financial services firms carry a legal and compliance burden unlike any other sector: prudential regulation, conduct rules, financial crime obligations and cross-border supervision all bear down on the same leadership team. The lawyers who thrive here read regulation as a strategic variable, not simply a constraint.',
              'We search for General Counsel, compliance and financial crime leaders who have operated inside this pressure and can hold the confidence of both the board and the regulator.',
            ],
          },
        ],
      },
      cs: {
        title: 'Finanční služby',
        summary:
          'Vedení právního oddělení a compliance pro banky, správce aktiv, pojišťovny a fintech firmy působící pod intenzivním regulatorním dohledem.',
        metaTitle: 'Legal executive search pro finanční služby',
        metaDescription:
          'Exkluzivní vyhledávání právních a compliance lídrů pro banky, správce aktiv, pojišťovny a fintech firmy napříč Evropou a Blízkým východem.',
        sections: [
          {
            heading: 'Právní vedení pod regulatorním dohledem',
            paragraphs: [
              'Firmy finančních služeb nesou právní a compliance zátěž, jaká nemá v jiných odvětvích obdoby: obezřetnostní regulace, pravidla chování, povinnosti v oblasti finanční kriminality i přeshraniční dohled doléhají na tentýž vedoucí tým. Právníci, kteří zde uspějí, čtou regulaci jako strategickou proměnnou, nikoli pouze jako omezení.',
              'Vyhledáváme General Counsel a lídry compliance a boje proti finanční kriminalitě, kteří se v tomto prostředí osvědčili a dokážou si získat důvěru představenstva i regulátora.',
            ],
          },
        ],
      },
      de: {
        title: 'Finanzdienstleistungen',
        summary:
          'Rechts- und Compliance-Führung für Banken, Asset Manager, Versicherer und Fintechs unter intensiver regulatorischer Aufsicht.',
        metaTitle: 'Legal Executive Search für Finanzdienstleistungen',
        metaDescription:
          'Mandatierte Rechts- und Compliance-Executive-Search für Banken, Asset Manager, Versicherer und Fintechs in Europa und im Nahen Osten.',
        sections: [
          {
            heading: 'Juristische Führung unter regulatorischer Aufsicht',
            paragraphs: [
              'Finanzdienstleister tragen eine rechtliche und regulatorische Last wie kaum eine andere Branche: aufsichtsrechtliche Anforderungen, Verhaltensregeln, Geldwäschepflichten und grenzüberschreitende Aufsicht lasten auf demselben Führungsteam. Die Juristen, die hier bestehen, lesen Regulierung als strategische Variable und nicht bloß als Einschränkung.',
              'Wir suchen General Counsel sowie Compliance- und Financial-Crime-Führungskräfte, die in diesem Druck agiert haben und das Vertrauen von Vorstand und Aufsicht gleichermaßen halten.',
            ],
          },
        ],
      },
      pl: {
        title: 'Usługi finansowe',
        summary:
          'Przywództwo prawne i compliance dla banków, zarządzających aktywami, ubezpieczycieli i fintechów działających pod intensywnym nadzorem regulacyjnym.',
        metaTitle: 'Executive search prawny dla usług finansowych',
        metaDescription:
          'Powierzony executive search prawny i compliance dla banków, zarządzających aktywami, ubezpieczycieli i fintechów w Europie i na Bliskim Wschodzie.',
        sections: [
          {
            heading: 'Przywództwo prawne pod nadzorem regulacyjnym',
            paragraphs: [
              'Firmy usług finansowych dźwigają obciążenie prawne i compliance jak żadna inna branża: regulacje ostrożnościowe, zasady postępowania, obowiązki w zakresie przeciwdziałania przestępczości finansowej oraz nadzór transgraniczny spoczywają na tym samym zespole kierowniczym. Prawnicy, którzy odnoszą tu sukces, odczytują regulacje jako zmienną strategiczną, a nie jedynie ograniczenie.',
              'Poszukujemy General Counsel oraz liderów compliance i przeciwdziałania przestępczości finansowej, którzy działali pod tą presją i potrafią utrzymać zaufanie zarówno zarządu, jak i regulatora.',
            ],
          },
        ],
      },
    },
  },
  {
    kind: 'industry',
    slug: 'technology',
    basePath: '/industries/technology',
    complete: true,
    related: {
      services: ['legal-executive-search'],
      practices: ['general-counsel'],
    },
    content: {
      en: {
        title: 'Technology',
        summary:
          'General Counsel and legal leadership for software, platform and deep-tech companies scaling across borders.',
        metaTitle: 'Legal Executive Search for Technology Companies',
        metaDescription:
          'Retained legal executive search for technology companies — from scale-ups to established platforms — across Europe and the Middle East.',
        sections: [
          {
            heading: 'Legal leadership for companies that move fast',
            paragraphs: [
              'Technology companies need legal leaders who can keep pace with rapid product cycles while building the governance that investors, regulators and enterprise customers now demand. Data protection, intellectual property, platform liability and international expansion converge on a single legal function.',
              'We identify General Counsel who have scaled legal teams through growth, funding rounds and cross-border expansion without becoming a brake on the business.',
            ],
          },
        ],
      },
      cs: {
        title: 'Technologie',
        summary:
          'Pozice General Counsel a právní vedení pro softwarové, platformové a deep-tech společnosti expandující přes hranice.',
        metaTitle: 'Legal executive search pro technologické společnosti',
        metaDescription:
          'Exkluzivní vyhledávání právních lídrů pro technologické společnosti — od scale-upů po zavedené platformy — napříč Evropou a Blízkým východem.',
        sections: [
          {
            heading: 'Právní vedení pro firmy, které se pohybují rychle',
            paragraphs: [
              'Technologické společnosti potřebují právní lídry, kteří udrží tempo s rychlými produktovými cykly a zároveň vybudují správu vyžadovanou dnes investory, regulátory i korporátními zákazníky. Ochrana dat, duševní vlastnictví, odpovědnost platforem a mezinárodní expanze se sbíhají v jediné právní funkci.',
              'Vyhledáváme General Counsel se zkušeností se škálováním právních týmů během růstu, investičních kol a přeshraniční expanze, aniž by se právní funkce stala brzdou podnikání.',
            ],
          },
        ],
      },
      de: {
        title: 'Technologie',
        summary:
          'General Counsel und juristische Führung für Software-, Plattform- und Deep-Tech-Unternehmen, die grenzüberschreitend skalieren.',
        metaTitle: 'Legal Executive Search für Technologieunternehmen',
        metaDescription:
          'Mandatierte Legal Executive Search für Technologieunternehmen — vom Scale-up bis zur etablierten Plattform — in Europa und im Nahen Osten.',
        sections: [
          {
            heading: 'Juristische Führung für schnell agierende Unternehmen',
            paragraphs: [
              'Technologieunternehmen brauchen juristische Führungskräfte, die mit schnellen Produktzyklen Schritt halten und zugleich die Governance aufbauen, die Investoren, Aufsichtsbehörden und Unternehmenskunden heute erwarten. Datenschutz, geistiges Eigentum, Plattformhaftung und internationale Expansion laufen in einer einzigen Rechtsfunktion zusammen.',
              'Wir identifizieren General Counsel, die Rechtsteams durch Wachstum, Finanzierungsrunden und grenzüberschreitende Expansion skaliert haben, ohne zur Bremse des Geschäfts zu werden.',
            ],
          },
        ],
      },
      pl: {
        title: 'Technologie',
        summary:
          'General Counsel i przywództwo prawne dla firm software’owych, platformowych i deep-tech skalujących się ponad granicami.',
        metaTitle: 'Executive search prawny dla firm technologicznych',
        metaDescription:
          'Powierzony executive search prawny dla firm technologicznych — od scale-upów po ugruntowane platformy — w Europie i na Bliskim Wschodzie.',
        sections: [
          {
            heading: 'Przywództwo prawne dla firm działających szybko',
            paragraphs: [
              'Firmy technologiczne potrzebują liderów prawnych, którzy nadążają za szybkimi cyklami produktowymi, a jednocześnie budują ład korporacyjny wymagany dziś przez inwestorów, regulatorów i klientów korporacyjnych. Ochrona danych, własność intelektualna, odpowiedzialność platform i ekspansja międzynarodowa zbiegają się w jednej funkcji prawnej.',
              'Wskazujemy General Counsel, którzy skalowali zespoły prawne w trakcie wzrostu, rund finansowania i ekspansji transgranicznej, nie stając się hamulcem dla biznesu.',
            ],
          },
        ],
      },
    },
  },
]
