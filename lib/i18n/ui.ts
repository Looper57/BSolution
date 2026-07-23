import type { Locale } from './config'

export interface UIDictionary {
  nav: {
    services: string
    practiceAreas: string
    industries: string
    countries: string
    caseStudies: string
    insights: string
    about: string
    faq: string
    contact: string
    cta: string
  }
  common: {
    home: string
    readMore: string
    learnMore: string
    getInTouch: string
    exploreAll: string
    relatedServices: string
    relatedPractices: string
    relatedIndustries: string
    relatedInsights: string
    relatedCaseStudies: string
    inThisSection: string
    breadcrumbHome: string
    published: string
    reviewed: string
    minRead: string
    talkToUs: string
    talkToUsDesc: string
    backTo: string
  }
  footer: {
    tagline: string
    explore: string
    expertise: string
    resources: string
    legal: string
    privacy: string
    cookies: string
    copyright: string
  }
}

export const UI: Record<Locale, UIDictionary> = {
  en: {
    nav: {
      services: 'Services',
      practiceAreas: 'Practice Areas',
      industries: 'Industries',
      countries: 'Locations',
      caseStudies: 'Case Studies',
      insights: 'Insights',
      about: 'About',
      faq: 'FAQ',
      contact: 'Contact',
      cta: 'Get in Touch',
    },
    common: {
      home: 'Home',
      readMore: 'Read more',
      learnMore: 'Learn more',
      getInTouch: 'Get in touch',
      exploreAll: 'Explore all',
      relatedServices: 'Related services',
      relatedPractices: 'Related practice areas',
      relatedIndustries: 'Related industries',
      relatedInsights: 'Related insights',
      relatedCaseStudies: 'Related case studies',
      inThisSection: 'In this section',
      breadcrumbHome: 'Home',
      published: 'Published',
      reviewed: 'Reviewed',
      minRead: 'min read',
      talkToUs: 'Discuss a confidential search',
      talkToUsDesc: 'Speak with a senior consultant about your legal leadership needs across Europe and the Middle East.',
      backTo: 'Back to',
    },
    footer: {
      tagline: 'Boutique legal executive search and advisory across Europe and the Middle East since 2007.',
      explore: 'Explore',
      expertise: 'Expertise',
      resources: 'Resources',
      legal: 'Legal',
      privacy: 'Privacy',
      cookies: 'Cookies',
      copyright: '© 2007–2026 B Solution. All rights reserved.',
    },
  },
  cs: {
    nav: {
      services: 'Služby',
      practiceAreas: 'Oblasti praxe',
      industries: 'Odvětví',
      countries: 'Lokality',
      caseStudies: 'Případové studie',
      insights: 'Poznatky',
      about: 'O nás',
      faq: 'Časté dotazy',
      contact: 'Kontakt',
      cta: 'Kontaktujte nás',
    },
    common: {
      home: 'Domů',
      readMore: 'Číst více',
      learnMore: 'Zjistit více',
      getInTouch: 'Spojte se s námi',
      exploreAll: 'Zobrazit vše',
      relatedServices: 'Související služby',
      relatedPractices: 'Související oblasti praxe',
      relatedIndustries: 'Související odvětví',
      relatedInsights: 'Související poznatky',
      relatedCaseStudies: 'Související případové studie',
      inThisSection: 'V této sekci',
      breadcrumbHome: 'Domů',
      published: 'Publikováno',
      reviewed: 'Revidováno',
      minRead: 'min čtení',
      talkToUs: 'Projednat důvěrné vyhledávání',
      talkToUsDesc: 'Promluvte si se seniorním konzultantem o svých potřebách v oblasti právního vedení napříč Evropou a Blízkým východem.',
      backTo: 'Zpět na',
    },
    footer: {
      tagline: 'Butiková executive search a poradenství v právním sektoru napříč Evropou a Blízkým východem od roku 2007.',
      explore: 'Procházet',
      expertise: 'Expertíza',
      resources: 'Zdroje',
      legal: 'Právní',
      privacy: 'Ochrana soukromí',
      cookies: 'Cookies',
      copyright: '© 2007–2026 B Solution. Všechna práva vyhrazena.',
    },
  },
  de: {
    nav: {
      services: 'Leistungen',
      practiceAreas: 'Fachbereiche',
      industries: 'Branchen',
      countries: 'Standorte',
      caseStudies: 'Fallstudien',
      insights: 'Einblicke',
      about: 'Über uns',
      faq: 'FAQ',
      contact: 'Kontakt',
      cta: 'Kontakt aufnehmen',
    },
    common: {
      home: 'Startseite',
      readMore: 'Weiterlesen',
      learnMore: 'Mehr erfahren',
      getInTouch: 'Kontakt aufnehmen',
      exploreAll: 'Alle ansehen',
      relatedServices: 'Verwandte Leistungen',
      relatedPractices: 'Verwandte Fachbereiche',
      relatedIndustries: 'Verwandte Branchen',
      relatedInsights: 'Verwandte Einblicke',
      relatedCaseStudies: 'Verwandte Fallstudien',
      inThisSection: 'In diesem Bereich',
      breadcrumbHome: 'Startseite',
      published: 'Veröffentlicht',
      reviewed: 'Geprüft',
      minRead: 'Min. Lesezeit',
      talkToUs: 'Vertrauliche Suche besprechen',
      talkToUsDesc: 'Sprechen Sie mit einem erfahrenen Berater über Ihren Bedarf an juristischer Führung in Europa und im Nahen Osten.',
      backTo: 'Zurück zu',
    },
    footer: {
      tagline: 'Spezialisierte Legal Executive Search und Beratung in Europa und im Nahen Osten seit 2007.',
      explore: 'Entdecken',
      expertise: 'Expertise',
      resources: 'Ressourcen',
      legal: 'Rechtliches',
      privacy: 'Datenschutz',
      cookies: 'Cookies',
      copyright: '© 2007–2026 B Solution. Alle Rechte vorbehalten.',
    },
  },
  pl: {
    nav: {
      services: 'Usługi',
      practiceAreas: 'Obszary praktyki',
      industries: 'Branże',
      countries: 'Lokalizacje',
      caseStudies: 'Studia przypadków',
      insights: 'Analizy',
      about: 'O nas',
      faq: 'FAQ',
      contact: 'Kontakt',
      cta: 'Skontaktuj się',
    },
    common: {
      home: 'Strona główna',
      readMore: 'Czytaj więcej',
      learnMore: 'Dowiedz się więcej',
      getInTouch: 'Skontaktuj się',
      exploreAll: 'Zobacz wszystkie',
      relatedServices: 'Powiązane usługi',
      relatedPractices: 'Powiązane obszary praktyki',
      relatedIndustries: 'Powiązane branże',
      relatedInsights: 'Powiązane analizy',
      relatedCaseStudies: 'Powiązane studia przypadków',
      inThisSection: 'W tej sekcji',
      breadcrumbHome: 'Strona główna',
      published: 'Opublikowano',
      reviewed: 'Zweryfikowano',
      minRead: 'min czytania',
      talkToUs: 'Omów poufne poszukiwanie',
      talkToUsDesc: 'Porozmawiaj z doświadczonym konsultantem o swoich potrzebach w zakresie przywództwa prawnego w Europie i na Bliskim Wschodzie.',
      backTo: 'Powrót do',
    },
    footer: {
      tagline: 'Butikowy executive search i doradztwo w sektorze prawnym w Europie i na Bliskim Wschodzie od 2007 roku.',
      explore: 'Przeglądaj',
      expertise: 'Ekspertyza',
      resources: 'Zasoby',
      legal: 'Informacje prawne',
      privacy: 'Prywatność',
      cookies: 'Pliki cookie',
      copyright: '© 2007–2026 B Solution. Wszelkie prawa zastrzeżone.',
    },
  },
}
