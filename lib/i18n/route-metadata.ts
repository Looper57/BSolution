import type { Locale } from './config'

type RouteMetadataCopy = { title: string; description: string }

export const staticRouteMetadata: Record<Locale, Record<string, RouteMetadataCopy>> = {
  en: {
    about: { title: 'About B Solution', description: 'Meet the specialist legal executive search firm trusted with senior appointments across Europe and the Middle East since 2007.' },
    clients: { title: 'Legal Executive Search for Clients', description: 'Retained legal executive search for corporations and law firms appointing General Counsel, legal leaders, partners and senior lawyers.' },
    candidates: { title: 'Legal Career Opportunities', description: 'Explore confidential opportunities for accomplished lawyers, legal leaders and law-firm partners across Europe and the Middle East.' },
    contact: { title: 'Contact B Solution', description: 'Arrange a confidential conversation about a legal executive search mandate, senior legal hire or career opportunity.' },
    positions: { title: 'Current Legal Opportunities', description: 'View selected confidential mandates for General Counsel, senior in-house lawyers, law-firm partners and legal specialists.' },
  },
  cs: {
    about: { title: 'O B Solution', description: 'Poznejte specialistu na executive search v právním sektoru, kterému jsou od roku 2007 svěřována seniorní obsazení v Evropě a na Blízkém východě.' },
    clients: { title: 'Legal Executive Search pro klienty', description: 'Retained executive search pro korporace a advokátní kanceláře obsazující General Counsel, právní lídry, partnery a seniorní právníky.' },
    candidates: { title: 'Kariérní příležitosti v právním sektoru', description: 'Objevte důvěrné příležitosti pro zkušené právníky, právní lídry a partnery advokátních kanceláří v Evropě a na Blízkém východě.' },
    contact: { title: 'Kontaktujte B Solution', description: 'Domluvte si důvěrný rozhovor o mandátu executive search, seniorním právním náboru nebo kariérní příležitosti.' },
    positions: { title: 'Aktuální právní příležitosti', description: 'Prohlédněte si vybrané důvěrné mandáty pro General Counsel, seniorní interní právníky, partnery advokátních kanceláří a právní specialisty.' },
  },
  de: {
    about: { title: 'Über B Solution', description: 'Lernen Sie die auf Legal Executive Search spezialisierte Beratung kennen, der seit 2007 Führungsbesetzungen in Europa und im Nahen Osten anvertraut werden.' },
    clients: { title: 'Legal Executive Search für Mandanten', description: 'Mandatierte Legal Executive Search für Unternehmen und Kanzleien bei der Besetzung von General Counsel, Rechtsführungskräften, Partnern und erfahrenen Juristen.' },
    candidates: { title: 'Karrieremöglichkeiten im Rechtsmarkt', description: 'Entdecken Sie vertrauliche Möglichkeiten für erfahrene Juristen, Rechtsführungskräfte und Kanzleipartner in Europa und im Nahen Osten.' },
    contact: { title: 'B Solution kontaktieren', description: 'Vereinbaren Sie ein vertrauliches Gespräch über ein Executive-Search-Mandat, eine juristische Führungsposition oder Ihre nächste berufliche Herausforderung.' },
    positions: { title: 'Aktuelle juristische Positionen', description: 'Entdecken Sie ausgewählte vertrauliche Mandate für General Counsel, erfahrene Inhouse-Juristen, Kanzleipartner und Rechtsexperten.' },
  },
  pl: {
    about: { title: 'O B Solution', description: 'Poznaj wyspecjalizowaną firmę legal executive search, której od 2007 roku powierzane są kluczowe nominacje w Europie i na Bliskim Wschodzie.' },
    clients: { title: 'Legal Executive Search dla klientów', description: 'Powierzony executive search dla firm i kancelarii zatrudniających General Counsel, liderów prawnych, partnerów i doświadczonych prawników.' },
    candidates: { title: 'Możliwości kariery w sektorze prawnym', description: 'Poznaj poufne możliwości dla doświadczonych prawników, liderów prawnych i partnerów kancelarii w Europie i na Bliskim Wschodzie.' },
    contact: { title: 'Skontaktuj się z B Solution', description: 'Umów poufną rozmowę o zleceniu executive search, rekrutacji na stanowisko prawne wyższego szczebla lub kolejnej możliwości zawodowej.' },
    positions: { title: 'Aktualne stanowiska prawnicze', description: 'Zobacz wybrane poufne zlecenia na stanowiska General Counsel, doświadczonych prawników wewnętrznych, partnerów kancelarii i specjalistów prawnych.' },
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
