import type { Entity } from './types'

export const services: Entity[] = [
  {
    kind: 'service',
    slug: 'legal-executive-search',
    basePath: '/services/legal-executive-search',
    complete: true,
    related: {
      practices: ['general-counsel', 'compliance-officer'],
      industries: ['financial-services', 'technology'],
      insights: ['what-is-legal-executive-search'],
      caseStudies: ['general-counsel-fintech'],
    },
    content: {
      en: {
        title: 'Legal Executive Search',
        summary:
          'Retained, confidential search for General Counsel, Heads of Legal and senior in-house lawyers across Europe and the Middle East.',
        metaTitle: 'Legal Executive Search | Retained Search for Legal Leaders',
        metaDescription:
          'Boutique retained legal executive search for General Counsel, Heads of Legal and senior in-house counsel across Europe and the Middle East. Confidential, mapped, and rigorous.',
        sections: [
          {
            heading: 'A retained search built for legal leadership',
            paragraphs: [
              'Appointing a General Counsel or Head of Legal is one of the most consequential hires a business makes. The role sits at the intersection of commercial strategy, risk and governance, and the wrong appointment is expensive to unwind. Our legal executive search practice is built exclusively around these senior mandates, not adapted from generalist recruitment.',
              'We work on a retained basis because the seniority and confidentiality of these searches demand it. A retained engagement lets us map an entire market rather than forward whoever happens to be active, and it aligns our incentives with the quality of the appointment rather than the speed of a placement.',
            ],
          },
          {
            heading: 'How we run the search',
            paragraphs: [
              'Every mandate begins with a structured briefing in which we test the specification against the reality of the market: the compensation on offer, the mandate of the role, the reporting line and the cultural context the successful candidate will operate in.',
              'We then map the relevant market systematically, approach passive candidates discreetly, and present a shortlist accompanied by honest, evidence-based assessment rather than polished summaries.',
            ],
            bullets: [
              'Confidential market mapping across the relevant jurisdictions',
              'Direct, discreet approach to passive senior candidates',
              'Structured competency and motivation assessment',
              'Honest shortlist commentary, including risks and trade-offs',
              'Support through offer, negotiation and onboarding',
            ],
          },
          {
            heading: 'Where we work',
            paragraphs: [
              'We conduct searches across Central and Western Europe and the Gulf, with particular depth in the Czech Republic, Germany, Poland and the United Arab Emirates. Cross-border mandates — where a candidate must operate across several legal systems and languages — are a core part of our work rather than an exception.',
            ],
          },
        ],
      },
      cs: {
        title: 'Executive search v právním sektoru',
        summary:
          'Exkluzivní a důvěrné vyhledávání pozic General Counsel, vedoucích právních oddělení a seniorních interních právníků napříč Evropou a Blízkým východem.',
        metaTitle: 'Executive search v právním sektoru | Vyhledávání právních lídrů',
        metaDescription:
          'Butikový retained executive search pro pozice General Counsel, vedoucí právních oddělení a seniorní interní právníky napříč Evropou a Blízkým východem. Důvěrně, s mapováním trhu a důsledností.',
        sections: [
          {
            heading: 'Retained search vytvořený pro právní vedení',
            paragraphs: [
              'Obsazení pozice General Counsel nebo vedoucího právního oddělení patří k nejzávažnějším personálním rozhodnutím, jaká firma činí. Role stojí na průsečíku obchodní strategie, řízení rizik a správy společnosti a chybné jmenování se napravuje jen obtížně a nákladně. Naše praxe executive search se soustředí výhradně na tyto seniorní mandáty — nevznikla úpravou obecného náboru.',
              'Pracujeme na bázi retained, protože seniorita a důvěrnost těchto vyhledávání to vyžadují. Exkluzivní zadání nám umožňuje zmapovat celý trh namísto přeposílání právě dostupných kandidátů a spojuje naše zájmy s kvalitou jmenování, nikoli s rychlostí obsazení.',
            ],
          },
          {
            heading: 'Jak vyhledávání vedeme',
            paragraphs: [
              'Každý mandát začíná strukturovaným briefingem, v němž konfrontujeme zadání s realitou trhu: nabízenou odměnou, mandátem role, linií podřízenosti i kulturním kontextem, v němž bude úspěšný kandidát působit.',
              'Poté systematicky zmapujeme relevantní trh, diskrétně oslovíme pasivní kandidáty a předložíme užší výběr doprovázený upřímným hodnocením podloženým fakty, nikoli jen uhlazenými shrnutími.',
            ],
            bullets: [
              'Důvěrné mapování trhu napříč relevantními jurisdikcemi',
              'Přímé a diskrétní oslovení pasivních seniorních kandidátů',
              'Strukturované posouzení kompetencí a motivace',
              'Upřímný komentář k užšímu výběru včetně rizik a kompromisů',
              'Podpora ve fázi nabídky, vyjednávání i nástupu',
            ],
          },
          {
            heading: 'Kde působíme',
            paragraphs: [
              'Vyhledávání realizujeme napříč střední a západní Evropou a oblastí Perského zálivu, s mimořádnou hloubkou znalostí v České republice, Německu, Polsku a Spojených arabských emirátech. Přeshraniční mandáty — kde kandidát musí působit v několika právních systémech a jazycích — jsou jádrem naší práce, nikoli výjimkou.',
            ],
          },
        ],
      },
      de: {
        title: 'Legal Executive Search',
        summary:
          'Mandatierte, vertrauliche Suche nach General Counsel, Leitern der Rechtsabteilung und erfahrenen Inhouse-Juristen in Europa und im Nahen Osten.',
        metaTitle: 'Legal Executive Search | Mandatierte Suche nach Rechtsführungskräften',
        metaDescription:
          'Spezialisierte, mandatierte Legal Executive Search für General Counsel, Leiter der Rechtsabteilung und erfahrene Inhouse-Juristen in Europa und im Nahen Osten. Vertraulich, marktweit recherchiert und gründlich.',
        sections: [
          {
            heading: 'Eine mandatierte Suche für die juristische Führung',
            paragraphs: [
              'Die Besetzung einer Position als General Counsel oder Leiter der Rechtsabteilung gehört zu den folgenreichsten Personalentscheidungen eines Unternehmens. Die Rolle liegt an der Schnittstelle von Geschäftsstrategie, Risiko und Governance — eine Fehlbesetzung lässt sich nur schwer und kostspielig korrigieren. Unsere Legal-Executive-Search-Praxis ist ausschließlich auf diese Führungsmandate ausgerichtet und nicht aus einer generalistischen Personalvermittlung abgeleitet.',
              'Wir arbeiten mandatiert, weil Seniorität und Vertraulichkeit dieser Suchen es erfordern. Ein Exklusivmandat erlaubt es uns, einen gesamten Markt zu recherchieren, statt lediglich verfügbare Kandidaten weiterzuleiten, und richtet unsere Interessen an der Qualität der Besetzung aus — nicht an der Geschwindigkeit einer Vermittlung.',
            ],
          },
          {
            heading: 'So führen wir die Suche durch',
            paragraphs: [
              'Jedes Mandat beginnt mit einem strukturierten Briefing, in dem wir das Anforderungsprofil an der Marktrealität messen: der gebotenen Vergütung, dem Mandat der Rolle, der Berichtslinie und dem kulturellen Kontext, in dem die erfolgreiche Kandidatin oder der erfolgreiche Kandidat agieren wird.',
              'Anschließend recherchieren wir den relevanten Markt systematisch, sprechen passive Kandidaten diskret an und legen eine Shortlist vor, die von einer ehrlichen, faktenbasierten Einschätzung begleitet wird — nicht von geschönten Zusammenfassungen.',
            ],
            bullets: [
              'Vertrauliche Marktrecherche über die relevanten Rechtsordnungen hinweg',
              'Direkte, diskrete Ansprache passiver Führungskräfte',
              'Strukturierte Kompetenz- und Motivationsanalyse',
              'Ehrlicher Shortlist-Kommentar inklusive Risiken und Abwägungen',
              'Begleitung durch Angebot, Verhandlung und Onboarding',
            ],
          },
          {
            heading: 'Wo wir tätig sind',
            paragraphs: [
              'Wir führen Suchen in Mittel- und Westeuropa sowie am Golf durch, mit besonderer Tiefe in der Tschechischen Republik, Deutschland, Polen und den Vereinigten Arabischen Emiraten. Grenzüberschreitende Mandate — bei denen eine Kandidatin oder ein Kandidat über mehrere Rechtssysteme und Sprachen hinweg agieren muss — sind fester Bestandteil unserer Arbeit und nicht die Ausnahme.',
            ],
          },
        ],
      },
      pl: {
        title: 'Executive search w sektorze prawnym',
        summary:
          'Powierzone, poufne poszukiwania na stanowiska General Counsel, dyrektorów działów prawnych i doświadczonych prawników wewnętrznych w Europie i na Bliskim Wschodzie.',
        metaTitle: 'Executive search w sektorze prawnym | Poszukiwanie liderów prawnych',
        metaDescription:
          'Butikowy, powierzony executive search dla stanowisk General Counsel, dyrektorów działów prawnych i doświadczonych prawników wewnętrznych w Europie i na Bliskim Wschodzie. Poufnie, z mapowaniem rynku i rzetelnością.',
        sections: [
          {
            heading: 'Powierzone poszukiwanie stworzone dla przywództwa prawnego',
            paragraphs: [
              'Obsadzenie stanowiska General Counsel lub dyrektora działu prawnego to jedna z najważniejszych decyzji kadrowych, jakie podejmuje firma. Rola ta leży na styku strategii biznesowej, zarządzania ryzykiem i ładu korporacyjnego, a błędna nominacja jest trudna i kosztowna do odwrócenia. Nasza praktyka executive search koncentruje się wyłącznie na tych stanowiskach wyższego szczebla — nie powstała z adaptacji rekrutacji ogólnej.',
              'Pracujemy w modelu powierzonym, ponieważ ranga i poufność tych poszukiwań tego wymagają. Wyłączne zlecenie pozwala nam zmapować cały rynek, zamiast przekazywać osoby akurat dostępne, i wiąże nasze interesy z jakością nominacji, a nie z szybkością obsadzenia.',
            ],
          },
          {
            heading: 'Jak prowadzimy poszukiwania',
            paragraphs: [
              'Każde zlecenie rozpoczyna się od ustrukturyzowanego briefingu, w którym konfrontujemy specyfikację z realiami rynku: oferowanym wynagrodzeniem, zakresem roli, linią raportowania oraz kontekstem kulturowym, w którym będzie działać wybrany kandydat.',
              'Następnie systematycznie mapujemy właściwy rynek, dyskretnie docieramy do kandydatów pasywnych i przedstawiamy krótką listę wraz z uczciwą, opartą na faktach oceną, a nie jedynie dopracowanymi podsumowaniami.',
            ],
            bullets: [
              'Poufne mapowanie rynku w odpowiednich jurysdykcjach',
              'Bezpośrednie, dyskretne dotarcie do pasywnych kandydatów wyższego szczebla',
              'Ustrukturyzowana ocena kompetencji i motywacji',
              'Uczciwy komentarz do krótkiej listy, w tym ryzyka i kompromisy',
              'Wsparcie na etapie oferty, negocjacji i wdrożenia',
            ],
          },
          {
            heading: 'Gdzie działamy',
            paragraphs: [
              'Prowadzimy poszukiwania w Europie Środkowej i Zachodniej oraz w rejonie Zatoki Perskiej, ze szczególną znajomością rynków Czech, Niemiec, Polski i Zjednoczonych Emiratów Arabskich. Zlecenia transgraniczne — w których kandydat musi działać w kilku systemach prawnych i językach — stanowią trzon naszej pracy, a nie wyjątek.',
            ],
          },
        ],
      },
    },
  },
]
