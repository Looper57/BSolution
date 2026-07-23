import type { Locale } from './config'

type RouteMetadataCopy = { title: string; description: string }

export const staticRouteMetadata: Record<Locale, Record<string, RouteMetadataCopy>> = {
  en: {
    about: { title: 'Our Firm', description: 'Nearly two decades of dedicated service to the legal profession.' },
    clients: { title: 'For Clients', description: 'Trusted counsel to legal leadership.' },
    candidates: { title: 'For Candidates', description: 'Confidential opportunities for accomplished legal professionals.' },
    contact: { title: 'Contact', description: 'We would welcome the opportunity to discuss how we might assist.' },
    positions: { title: 'Current Opportunities', description: 'Selected mandates from our portfolio.' },
  },
  cs: {
    about: { title: 'Naše firma', description: 'Téměř dvě desetiletí služby právní profesi.' },
    clients: { title: 'Pro klienty', description: 'Důvěryhodní poradci právního vedení.' },
    candidates: { title: 'Pro kandidáty', description: 'Důvěrné příležitosti pro úspěšné právní profesionály.' },
    contact: { title: 'Kontakt', description: 'Rádi s vámi probereme, jak bychom mohli pomoci.' },
    positions: { title: 'Aktuální příležitosti', description: 'Vybrané mandáty z našeho portfolia.' },
  },
  de: {
    about: { title: 'Unsere Firma', description: 'Fast zwei Jahrzehnte im Dienst der Rechtsprofession.' },
    clients: { title: 'Für Mandanten', description: 'Vertrauenswürdige Berater für Rechtsführung.' },
    candidates: { title: 'Für Kandidaten', description: 'Vertrauliche Möglichkeiten für erfolgreiche Juristen.' },
    contact: { title: 'Kontakt', description: 'Wir freuen uns auf die Möglichkeit zu besprechen, wie wir helfen können.' },
    positions: { title: 'Aktuelle Positionen', description: 'Ausgewählte Mandate aus unserem Portfolio.' },
  },
  pl: {
    about: { title: 'Nasza Firma', description: 'Niemal dwie dekady dedykowanej służby profesji prawniczej.' },
    clients: { title: 'Dla Klientów', description: 'Zaufani doradcy liderów prawnych.' },
    candidates: { title: 'Dla Kandydatów', description: 'Poufne możliwości dla doświadczonych prawników.' },
    contact: { title: 'Kontakt', description: 'Chętnie porozmawiamy o tym, jak możemy pomóc.' },
    positions: { title: 'Aktualne Oferty', description: 'Wybrane mandaty z naszego portfolio.' },
  },
}

export const hubRouteMetadata: Record<Locale, Record<string, RouteMetadataCopy>> = {
  en: {
    services: { title: 'Legal Executive Search Services', description: 'Focused search and advisory for senior legal, compliance and law-firm appointments across Europe and the Middle East.' },
    'practice-areas': { title: 'Practice Areas', description: 'Specialist market knowledge for leadership mandates where technical credibility and commercial judgement matter.' },
    industries: { title: 'Industries', description: 'Sector-aware legal search informed by regulation, operating models and the realities of each market.' },
    locations: { title: 'Locations', description: 'Cross-border search capability grounded in the legal talent markets we know directly.' },
    'case-studies': { title: 'Case Studies', description: 'Selected examples of confidential legal leadership mandates and the disciplined thinking behind them.' },
  },
  cs: {
    services: { title: 'Služby Legal Executive Search', description: 'Cílené vyhledávání a poradenství pro seniorní právní, compliance a advokátní pozice v Evropě a na Blízkém východě.' },
    'practice-areas': { title: 'Oblasti praxe', description: 'Specializovaná znalost trhu pro vedoucí mandáty, kde rozhoduje odborná důvěryhodnost a obchodní úsudek.' },
    industries: { title: 'Odvětví', description: 'Vyhledávání právních lídrů s porozuměním regulaci, provozním modelům a realitě jednotlivých trhů.' },
    locations: { title: 'Lokality', description: 'Přeshraniční vyhledávání založené na přímé znalosti právních talentových trhů.' },
    'case-studies': { title: 'Případové studie', description: 'Vybrané příklady důvěrných mandátů a disciplinovaného přístupu, který za nimi stojí.' },
  },
  de: {
    services: { title: 'Legal Executive Search Leistungen', description: 'Gezielte Suche und Beratung für juristische Führungs-, Compliance- und Kanzleimandate in Europa und im Nahen Osten.' },
    'practice-areas': { title: 'Fachbereiche', description: 'Spezialisierte Marktkenntnis für Führungsmandate, bei denen fachliche Glaubwürdigkeit und unternehmerisches Urteilsvermögen zählen.' },
    industries: { title: 'Branchen', description: 'Sektororientierte juristische Suche mit Verständnis für Regulierung, Geschäftsmodelle und Marktgegebenheiten.' },
    locations: { title: 'Standorte', description: 'Grenzüberschreitende Suche auf Basis direkter Kenntnis der relevanten juristischen Talentmärkte.' },
    'case-studies': { title: 'Fallstudien', description: 'Ausgewählte Beispiele vertraulicher juristischer Führungsmandate und der systematischen Arbeit dahinter.' },
  },
  pl: {
    services: { title: 'Usługi Legal Executive Search', description: 'Ukierunkowany executive search i doradztwo w zakresie stanowisk prawnych, compliance oraz ról w kancelariach w Europie i na Bliskim Wschodzie.' },
    'practice-areas': { title: 'Obszary praktyki', description: 'Specjalistyczna wiedza rynkowa w mandatach, w których liczą się wiarygodność merytoryczna i osąd biznesowy.' },
    industries: { title: 'Branże', description: 'Poszukiwanie liderów prawnych z uwzględnieniem regulacji, modeli operacyjnych i realiów danego sektora.' },
    locations: { title: 'Lokalizacje', description: 'Transgraniczne poszukiwania oparte na bezpośredniej znajomości rynków talentów prawniczych.' },
    'case-studies': { title: 'Studia przypadków', description: 'Wybrane przykłady poufnych mandatów oraz metodycznego podejścia, które za nimi stoi.' },
  },
}
