import type { Entity } from './types'

export const practices: Entity[] = [
  {
    kind: 'practice',
    slug: 'general-counsel',
    basePath: '/practice-areas/general-counsel',
    complete: true,
    related: {
      services: ['legal-executive-search'],
      industries: ['financial-services', 'technology'],
      caseStudies: ['general-counsel-fintech'],
      insights: ['what-is-legal-executive-search'],
    },
    content: {
      en: {
        title: 'General Counsel Search',
        summary:
          'Retained search for General Counsel and Chief Legal Officers who combine legal authority with commercial judgement at board level.',
        metaTitle: 'General Counsel Search | Retained Executive Search',
        metaDescription:
          'Confidential retained search for General Counsel and Chief Legal Officers across Europe and the Middle East. Board-level legal leadership, rigorously assessed.',
        sections: [
          {
            heading: 'The modern General Counsel',
            paragraphs: [
              'The General Counsel is no longer solely the guardian of legal risk; the role has become a trusted commercial adviser to the CEO and board, expected to translate regulatory complexity into decisions the business can act on. Identifying leaders who hold that balance — technical authority alongside commercial fluency — is the core of this practice.',
              'We assess candidates not only on legal depth but on how they build teams, manage external counsel spend, and influence a board that may not share their instinct for caution.',
            ],
          },
          {
            heading: 'What we evaluate',
            paragraphs: [
              'A rigorous General Counsel search tests for the specific pressures of your business — its sector, its stage, and its risk profile — rather than a generic ideal.',
            ],
            bullets: [
              'Board-level communication and commercial judgement',
              'Track record across the relevant regulatory environment',
              'Leadership of in-house teams and external counsel',
              'Integrity and independence under pressure',
            ],
          },
        ],
      },
      cs: {
        title: 'Vyhledávání General Counsel',
        summary:
          'Exkluzivní vyhledávání pozic General Counsel a Chief Legal Officer, kteří spojují právní autoritu s obchodním úsudkem na úrovni představenstva.',
        metaTitle: 'Vyhledávání General Counsel | Retained executive search',
        metaDescription:
          'Důvěrné exkluzivní vyhledávání pozic General Counsel a Chief Legal Officer napříč Evropou a Blízkým východem. Právní vedení na úrovni představenstva, důkladně posouzené.',
        sections: [
          {
            heading: 'Moderní General Counsel',
            paragraphs: [
              'General Counsel již není pouze strážcem právního rizika; role se stala důvěryhodným obchodním poradcem generálního ředitele a představenstva, od něhož se očekává, že převede regulatorní složitost do rozhodnutí, podle nichž může firma jednat. Jádrem této praxe je nalézt lídry, kteří tuto rovnováhu udrží — odbornou autoritu spolu s obchodní pohotovostí.',
              'Kandidáty posuzujeme nejen podle právní hloubky, ale i podle toho, jak budují týmy, řídí náklady na externí právní poradce a ovlivňují představenstvo, které nemusí sdílet jejich instinktivní opatrnost.',
            ],
          },
          {
            heading: 'Co hodnotíme',
            paragraphs: [
              'Důkladné vyhledávání General Counsel prověřuje konkrétní tlaky vaší firmy — její odvětví, fázi rozvoje a rizikový profil — nikoli obecný ideál.',
            ],
            bullets: [
              'Komunikace na úrovni představenstva a obchodní úsudek',
              'Zkušenosti v příslušném regulatorním prostředí',
              'Vedení interních týmů i externích poradců',
              'Integrita a nezávislost pod tlakem',
            ],
          },
        ],
      },
      de: {
        title: 'General-Counsel-Suche',
        summary:
          'Mandatierte Suche nach General Counsel und Chief Legal Officers, die juristische Autorität mit unternehmerischem Urteilsvermögen auf Vorstandsebene verbinden.',
        metaTitle: 'General-Counsel-Suche | Mandatierte Executive Search',
        metaDescription:
          'Vertrauliche mandatierte Suche nach General Counsel und Chief Legal Officers in Europa und im Nahen Osten. Juristische Führung auf Vorstandsebene, gründlich beurteilt.',
        sections: [
          {
            heading: 'Der moderne General Counsel',
            paragraphs: [
              'Der General Counsel ist längst nicht mehr allein Hüter des Rechtsrisikos; die Rolle ist zum vertrauten kommerziellen Berater von CEO und Vorstand geworden, von dem erwartet wird, regulatorische Komplexität in umsetzbare unternehmerische Entscheidungen zu übersetzen. Führungskräfte zu identifizieren, die diese Balance halten — fachliche Autorität und unternehmerisches Gespür —, bildet den Kern dieser Praxis.',
              'Wir beurteilen Kandidaten nicht nur nach juristischer Tiefe, sondern auch danach, wie sie Teams aufbauen, die Ausgaben für externe Kanzleien steuern und einen Vorstand beeinflussen, der ihr Vorsichtsinstinkt womöglich nicht teilt.',
            ],
          },
          {
            heading: 'Was wir beurteilen',
            paragraphs: [
              'Eine gründliche General-Counsel-Suche prüft die spezifischen Anforderungen Ihres Unternehmens — Branche, Entwicklungsphase und Risikoprofil — statt eines generischen Idealbilds.',
            ],
            bullets: [
              'Kommunikation auf Vorstandsebene und unternehmerisches Urteilsvermögen',
              'Erfolgsbilanz im relevanten regulatorischen Umfeld',
              'Führung von Inhouse-Teams und externen Kanzleien',
              'Integrität und Unabhängigkeit unter Druck',
            ],
          },
        ],
      },
      pl: {
        title: 'Poszukiwanie General Counsel',
        summary:
          'Powierzone poszukiwanie na stanowiska General Counsel i Chief Legal Officer, którzy łączą autorytet prawny z osądem biznesowym na poziomie zarządu.',
        metaTitle: 'Poszukiwanie General Counsel | Powierzony executive search',
        metaDescription:
          'Poufne, powierzone poszukiwanie na stanowiska General Counsel i Chief Legal Officer w Europie i na Bliskim Wschodzie. Przywództwo prawne na poziomie zarządu, rzetelnie ocenione.',
        sections: [
          {
            heading: 'Nowoczesny General Counsel',
            paragraphs: [
              'General Counsel nie jest już wyłącznie strażnikiem ryzyka prawnego; rola ta stała się zaufanym doradcą biznesowym prezesa i zarządu, od którego oczekuje się przełożenia złożoności regulacyjnej na decyzje, według których firma może działać. Sednem tej praktyki jest znalezienie liderów, którzy utrzymują tę równowagę — autorytet merytoryczny wraz z biegłością biznesową.',
              'Kandydatów oceniamy nie tylko pod kątem głębi prawnej, lecz także tego, jak budują zespoły, zarządzają wydatkami na zewnętrznych doradców i wpływają na zarząd, który może nie podzielać ich instynktu ostrożności.',
            ],
          },
          {
            heading: 'Co oceniamy',
            paragraphs: [
              'Rzetelne poszukiwanie General Counsel bada konkretne wyzwania Twojej firmy — jej branżę, etap rozwoju i profil ryzyka — a nie ogólny ideał.',
            ],
            bullets: [
              'Komunikacja na poziomie zarządu i osąd biznesowy',
              'Doświadczenie w odpowiednim otoczeniu regulacyjnym',
              'Kierowanie zespołami wewnętrznymi i doradcami zewnętrznymi',
              'Uczciwość i niezależność pod presją',
            ],
          },
        ],
      },
    },
  },
  {
    kind: 'practice',
    slug: 'compliance-officer',
    basePath: '/practice-areas/compliance-officer',
    complete: true,
    related: {
      services: ['legal-executive-search'],
      industries: ['financial-services'],
    },
    content: {
      en: {
        title: 'Compliance & Regulatory Leadership',
        summary:
          'Search for Chief Compliance Officers and Heads of Regulatory Affairs who protect the licence to operate in regulated markets.',
        metaTitle: 'Compliance Officer Search | Regulatory Leadership',
        metaDescription:
          'Retained search for Chief Compliance Officers and Heads of Regulatory Affairs across regulated industries in Europe and the Middle East.',
        sections: [
          {
            heading: 'Leadership that protects the licence to operate',
            paragraphs: [
              'In regulated industries, the compliance function is no longer a back-office control but a strategic capability that determines whether a business can enter markets, launch products and retain the confidence of regulators. We search for compliance leaders who combine technical command of the rulebook with the credibility to shape decisions before risks crystallise.',
            ],
          },
          {
            heading: 'What we evaluate',
            paragraphs: [
              'We assess how candidates have built compliance frameworks that scale, managed regulator relationships, and held their ground when commercial pressure and regulatory duty pull in different directions.',
            ],
            bullets: [
              'Command of the relevant regulatory regime',
              'Constructive relationships with supervisory authorities',
              'Ability to embed a culture of compliance across the business',
              'Judgement under commercial and regulatory tension',
            ],
          },
        ],
      },
      cs: {
        title: 'Vedení compliance a regulatoriky',
        summary:
          'Vyhledávání pozic Chief Compliance Officer a vedoucích regulatorních záležitostí, kteří chrání oprávnění působit na regulovaných trzích.',
        metaTitle: 'Vyhledávání Compliance Officer | Vedení regulatoriky',
        metaDescription:
          'Exkluzivní vyhledávání pozic Chief Compliance Officer a vedoucích regulatorních záležitostí napříč regulovanými odvětvími v Evropě a na Blízkém východě.',
        sections: [
          {
            heading: 'Vedení, které chrání oprávnění působit',
            paragraphs: [
              'V regulovaných odvětvích už compliance není kontrolní funkcí v zázemí, ale strategickou schopností, která rozhoduje o tom, zda firma může vstupovat na trhy, uvádět produkty a udržet si důvěru regulátorů. Hledáme lídry compliance, kteří spojují odborné zvládnutí předpisů s důvěryhodností potřebnou k ovlivnění rozhodnutí dříve, než se rizika naplní.',
            ],
          },
          {
            heading: 'Co hodnotíme',
            paragraphs: [
              'Posuzujeme, jak kandidáti budovali škálovatelné rámce compliance, řídili vztahy s regulátory a obstáli ve chvílích, kdy obchodní tlak a regulatorní povinnost míří proti sobě.',
            ],
            bullets: [
              'Zvládnutí příslušného regulatorního režimu',
              'Konstruktivní vztahy s dohledovými orgány',
              'Schopnost zakotvit kulturu compliance napříč firmou',
              'Úsudek v napětí mezi obchodem a regulací',
            ],
          },
        ],
      },
      de: {
        title: 'Compliance- und Regulatory-Führung',
        summary:
          'Suche nach Chief Compliance Officers und Leitern Regulatory Affairs, die die Betriebserlaubnis in regulierten Märkten sichern.',
        metaTitle: 'Compliance-Officer-Suche | Regulatory-Führung',
        metaDescription:
          'Mandatierte Suche nach Chief Compliance Officers und Leitern Regulatory Affairs in regulierten Branchen in Europa und im Nahen Osten.',
        sections: [
          {
            heading: 'Führung, die die Betriebserlaubnis sichert',
            paragraphs: [
              'In regulierten Branchen ist die Compliance-Funktion keine nachgelagerte Kontrolle mehr, sondern eine strategische Fähigkeit, die darüber entscheidet, ob ein Unternehmen Märkte erschließen, Produkte einführen und das Vertrauen der Aufsichtsbehörden bewahren kann. Wir suchen Compliance-Führungskräfte, die die fachliche Beherrschung des Regelwerks mit der Glaubwürdigkeit verbinden, Entscheidungen zu prägen, bevor Risiken eintreten.',
            ],
          },
          {
            heading: 'Was wir beurteilen',
            paragraphs: [
              'Wir beurteilen, wie Kandidaten skalierbare Compliance-Rahmenwerke aufgebaut, Beziehungen zu Aufsichtsbehörden gepflegt und Haltung bewahrt haben, wenn kommerzieller Druck und regulatorische Pflicht in unterschiedliche Richtungen ziehen.',
            ],
            bullets: [
              'Beherrschung des relevanten Regulierungsregimes',
              'Konstruktive Beziehungen zu Aufsichtsbehörden',
              'Fähigkeit, eine Compliance-Kultur im Unternehmen zu verankern',
              'Urteilsvermögen im Spannungsfeld von Geschäft und Regulierung',
            ],
          },
        ],
      },
      pl: {
        title: 'Przywództwo w compliance i regulacjach',
        summary:
          'Poszukiwanie na stanowiska Chief Compliance Officer i dyrektorów ds. regulacyjnych, którzy chronią prawo do działania na rynkach regulowanych.',
        metaTitle: 'Poszukiwanie Compliance Officer | Przywództwo regulacyjne',
        metaDescription:
          'Powierzone poszukiwanie na stanowiska Chief Compliance Officer i dyrektorów ds. regulacyjnych w branżach regulowanych w Europie i na Bliskim Wschodzie.',
        sections: [
          {
            heading: 'Przywództwo chroniące prawo do działania',
            paragraphs: [
              'W branżach regulowanych funkcja compliance nie jest już kontrolą zaplecza, lecz strategiczną kompetencją, która decyduje o tym, czy firma może wchodzić na rynki, wprowadzać produkty i utrzymać zaufanie regulatorów. Poszukujemy liderów compliance, którzy łączą merytoryczne opanowanie przepisów z wiarygodnością pozwalającą kształtować decyzje, zanim ryzyka się zmaterializują.',
            ],
          },
          {
            heading: 'Co oceniamy',
            paragraphs: [
              'Oceniamy, jak kandydaci budowali skalowalne ramy compliance, zarządzali relacjami z regulatorami i utrzymywali stanowisko, gdy presja biznesowa i obowiązek regulacyjny prowadzą w różnych kierunkach.',
            ],
            bullets: [
              'Opanowanie właściwego reżimu regulacyjnego',
              'Konstruktywne relacje z organami nadzoru',
              'Umiejętność zakorzenienia kultury compliance w firmie',
              'Osąd w napięciu między biznesem a regulacją',
            ],
          },
        ],
      },
    },
  },
]
