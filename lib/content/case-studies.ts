import type { Entity } from './types'

export const caseStudies: Entity[] = [
  {
    kind: 'caseStudy',
    slug: 'general-counsel-fintech',
    basePath: '/case-studies/general-counsel-fintech',
    complete: true,
    related: {
      services: ['legal-executive-search'],
      practices: ['general-counsel', 'compliance-officer'],
      industries: ['financial-services'],
    },
    content: {
      en: {
        title: 'Appointing a General Counsel for a scaling fintech',
        summary:
          'A confidential retained search for the first General Counsel of a fast-growing, cross-border payments business.',
        metaTitle: 'Case Study: General Counsel, Fintech',
        metaDescription:
          'How a confidential retained search identified the first General Counsel for a scaling cross-border fintech operating under multiple regulators.',
        sections: [
          {
            heading: 'The mandate',
            paragraphs: [
              'A rapidly scaling payments business needed its first General Counsel — a leader who could build a legal and compliance function from the ground up while the company expanded across several regulated markets. The appointment was strategically sensitive and had to remain confidential during a live funding process.',
            ],
          },
          {
            heading: 'Our approach',
            paragraphs: [
              'We mapped legal leaders who had built functions inside regulated financial businesses rather than inherited mature teams, and assessed each against the specific demands of a multi-regulator, high-growth environment.',
            ],
          },
          {
            heading: 'The outcome',
            paragraphs: [
              'The appointed General Counsel established the company’s legal, compliance and governance framework and became a trusted adviser to the founder and board through its subsequent growth. This account is illustrative of our approach and omits identifying details to preserve client confidentiality.',
            ],
          },
        ],
      },
      cs: {
        title: 'Jmenování General Counsel pro rostoucí fintech',
        summary:
          'Důvěrné exkluzivní vyhledávání prvního General Counsel pro rychle rostoucí přeshraniční platební společnost.',
        metaTitle: 'Případová studie: General Counsel, fintech',
        metaDescription:
          'Jak důvěrné exkluzivní vyhledávání nalezlo prvního General Counsel pro rostoucí přeshraniční fintech působící pod několika regulátory.',
        sections: [
          {
            heading: 'Zadání',
            paragraphs: [
              'Rychle rostoucí platební společnost potřebovala svého prvního General Counsel — lídra, který dokáže vybudovat právní a compliance funkci od základů, zatímco firma expanduje na několik regulovaných trhů. Jmenování bylo strategicky citlivé a muselo zůstat důvěrné během probíhajícího investičního procesu.',
            ],
          },
          {
            heading: 'Náš přístup',
            paragraphs: [
              'Zmapovali jsme právní lídry, kteří funkce v regulovaných finančních firmách budovali, nikoli zdědili zavedené týmy, a každého posoudili vůči konkrétním nárokům prostředí s několika regulátory a vysokým růstem.',
            ],
          },
          {
            heading: 'Výsledek',
            paragraphs: [
              'Jmenovaný General Counsel vybudoval právní, compliance a governance rámec firmy a stal se důvěryhodným poradcem zakladatele a představenstva během dalšího růstu. Tento popis je ilustrativní, znázorňuje náš přístup a vynechává identifikující údaje kvůli zachování důvěrnosti klienta.',
            ],
          },
        ],
      },
      de: {
        title: 'Bestellung eines General Counsel für ein skalierendes Fintech',
        summary:
          'Eine vertrauliche mandatierte Suche nach dem ersten General Counsel eines schnell wachsenden, grenzüberschreitenden Zahlungsdienstleisters.',
        metaTitle: 'Fallstudie: General Counsel, Fintech',
        metaDescription:
          'Wie eine vertrauliche mandatierte Suche den ersten General Counsel für ein skalierendes, grenzüberschreitendes Fintech unter mehreren Aufsichtsbehörden fand.',
        sections: [
          {
            heading: 'Das Mandat',
            paragraphs: [
              'Ein schnell skalierender Zahlungsdienstleister brauchte seinen ersten General Counsel — eine Führungskraft, die eine Rechts- und Compliance-Funktion von Grund auf aufbauen konnte, während das Unternehmen in mehrere regulierte Märkte expandierte. Die Besetzung war strategisch heikel und musste während einer laufenden Finanzierungsrunde vertraulich bleiben.',
            ],
          },
          {
            heading: 'Unser Vorgehen',
            paragraphs: [
              'Wir recherchierten Rechtsführungskräfte, die Funktionen in regulierten Finanzunternehmen aufgebaut und nicht reife Teams übernommen hatten, und bewerteten jede anhand der spezifischen Anforderungen eines wachstumsstarken Umfelds mit mehreren Aufsichtsbehörden.',
            ],
          },
          {
            heading: 'Das Ergebnis',
            paragraphs: [
              'Der bestellte General Counsel etablierte das Rechts-, Compliance- und Governance-Rahmenwerk des Unternehmens und wurde im weiteren Wachstum zum vertrauten Berater von Gründer und Vorstand. Diese Darstellung ist beispielhaft, veranschaulicht unser Vorgehen und lässt identifizierende Details aus, um die Vertraulichkeit des Mandanten zu wahren.',
            ],
          },
        ],
      },
      pl: {
        title: 'Powołanie General Counsel dla skalującego się fintechu',
        summary:
          'Poufne, powierzone poszukiwanie pierwszego General Counsel dla szybko rosnącej, transgranicznej firmy płatniczej.',
        metaTitle: 'Studium przypadku: General Counsel, fintech',
        metaDescription:
          'Jak poufne, powierzone poszukiwanie wskazało pierwszego General Counsel dla transgranicznego fintechu działającego pod nadzorem kilku regulatorów.',
        sections: [
          {
            heading: 'Zlecenie',
            paragraphs: [
              'Szybko skalująca się firma płatnicza potrzebowała swojego pierwszego General Counsel — lidera zdolnego zbudować funkcję prawną i compliance od podstaw, podczas gdy firma wchodziła na kilka rynków regulowanych. Nominacja była strategicznie wrażliwa i musiała pozostać poufna w trakcie trwającego procesu finansowania.',
            ],
          },
          {
            heading: 'Nasze podejście',
            paragraphs: [
              'Zmapowaliśmy liderów prawnych, którzy budowali funkcje w regulowanych firmach finansowych, a nie przejmowali dojrzałe zespoły, i oceniliśmy każdego pod kątem konkretnych wymagań środowiska o wysokim wzroście i wielu regulatorach.',
            ],
          },
          {
            heading: 'Rezultat',
            paragraphs: [
              'Powołany General Counsel stworzył ramy prawne, compliance i ładu korporacyjnego firmy oraz stał się zaufanym doradcą założyciela i zarządu w trakcie dalszego wzrostu. Ten opis ma charakter poglądowy, ilustruje nasze podejście i pomija dane identyfikujące w celu zachowania poufności klienta.',
            ],
          },
        ],
      },
    },
  },
]
