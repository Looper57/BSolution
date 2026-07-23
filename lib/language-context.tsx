"use client"

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { isEnglishOnlyStaticPage, legalPath } from '@/lib/routes'

type Language = 'en' | 'cs' | 'de' | 'pl'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.clients': 'For Clients',
    'nav.candidates': 'For Candidates',
    'nav.about': 'About',
    'nav.positions': 'Opportunities',
    'nav.contact': 'Contact',
    'nav.cta': 'Get in Touch',
    
    // Hero
    'hero.eyebrow': 'Legal Executive Search',
    'hero.headline': 'Strategic Counsel for Building Exceptional Legal Teams',
    'hero.subheadline': 'We partner with leading corporations and law firms to identify, assess, and secure transformational legal leadership across Europe and the Middle East.',
    'hero.cta.hire': 'Discuss a Search',
    'hero.cta.candidates': 'Explore Opportunities',
    
    // Credibility
    'credibility.since': 'Since 2007',
    'credibility.reach': 'Europe & Middle East',
    'credibility.specialist': 'Legal Executive Search',
    'credibility.approach': 'Discreet & Confidential',
    
    // Intro
    'intro.eyebrow': 'About Us',
    'intro.title': 'Trusted Advisors to Legal Leadership',
    'intro.text1': 'B Solution is a specialist executive search firm dedicated exclusively to the legal sector. For nearly two decades, we have built lasting relationships with corporate legal departments and leading law firms, earning a reputation for discretion, market insight, and exceptional placement outcomes.',
    'intro.text2': 'Our focus on quality over volume means we take fewer mandates and deliver superior results. We understand that hiring at the senior level is not merely recruitment — it is a strategic decision that shapes the future of your organization.',
    'intro.cta': 'Learn About Our Approach',
    
    // Clients
    'clients.eyebrow': 'Who We Serve',
    'clients.title': 'Corporate Legal & Law Firm Partners',
    'clients.corporate.eyebrow': 'Corporate Legal Departments',
    'clients.corporate.title': 'Building In-House Leadership',
    'clients.corporate.desc': 'We advise multinational corporations, private equity firms, and growing enterprises on securing the legal leadership that drives business success.',
    'clients.lawfirm.eyebrow': 'Law Firms',
    'clients.lawfirm.title': 'Strengthening Your Partnership',
    'clients.lawfirm.desc': 'We support international and domestic law firms in lateral partner recruitment, associate hiring, and strategic team development.',
    'home.clients.cta': 'Explore Our Client Services',
    
    // Services
    'services.eyebrow': 'What We Do',
    'services.title': 'Executive Search & Advisory',
    'services.intro': 'Our services are designed for organizations that understand the value of getting senior hiring right the first time.',
    'services.executive.title': 'Executive Search',
    'services.executive.desc': 'Retained search for General Counsel, Chief Legal Officers, Heads of Legal, and senior in-house leadership positions.',
    'services.retained.title': 'Retained Legal Recruitment',
    'services.retained.desc': 'Dedicated search for partners, counsel, senior associates, and practice group leadership at leading law firms.',
    'services.mapping.title': 'Market Intelligence',
    'services.mapping.desc': 'Comprehensive talent mapping, compensation benchmarking, and competitive landscape analysis.',
    'services.advisory.title': 'Strategic Advisory',
    'services.advisory.desc': 'Counsel on team structuring, succession planning, and organizational design for legal functions.',
    'services.cta': 'View All Services',
    
    // Difference
    'difference.eyebrow': 'Our Distinction',
    'difference.title': 'Why Clients Choose B Solution',
    'difference.expertise.title': 'Sector Expertise',
    'difference.expertise.desc': 'Exclusive focus on legal markets with deep understanding of practice dynamics and career trajectories.',
    'difference.discretion.title': 'Absolute Discretion',
    'difference.discretion.desc': 'Every engagement is handled with the confidentiality that senior professionals expect and deserve.',
    'difference.network.title': 'Cultivated Network',
    'difference.network.desc': 'Nearly two decades of relationships across Europe and the Middle East legal community.',
    'difference.partnership.title': 'True Partnership',
    'difference.partnership.desc': 'We invest in understanding your organization, culture, and long-term objectives.',
    
    // Geography
    'geography.eyebrow': 'Our Reach',
    'geography.title': 'International Presence',
    'geography.desc': 'From our core markets in Central Europe, we have built an extensive network spanning major legal jurisdictions. Our established relationships enable us to execute searches across borders with local market insight.',
    
    // Positions
    'positions.eyebrow': 'Current Mandates',
    'positions.title': 'Selected Opportunities',
    'positions.viewall': 'View All Opportunities',
    'positions.details': 'View Position Details',
    
    // Candidates
    'candidate.eyebrow': 'For Legal Professionals',
    'candidate.title': 'Advancing Your Career',
    'candidate.desc': 'We work with accomplished legal professionals exploring their next chapter. Our approach is consultative — we take time to understand your aspirations and present only opportunities that genuinely align with your career trajectory.',
    'candidate.cta': 'Confidential Discussion',
    
    // Final CTA
    'final.title': 'Begin a Conversation',
    'final.desc': 'Whether you are building a legal team or exploring your next leadership role, we would welcome the opportunity to understand how we might assist.',
    'final.cta.contact': 'Schedule a Consultation',
    'final.cta.positions': 'View Current Opportunities',
    
    // Footer
    'footer.tagline': 'Legal executive search and advisory across Europe and the Middle East.',
    'footer.company': 'Company',
    'footer.services': 'Services',
    'footer.connect': 'Connect',
    'footer.privacy': 'Privacy',
    'footer.cookies': 'Cookies',
    'footer.copyright': '© 2007–2026 B Solution. All rights reserved.',
    
    // Services Page
    'services.page.title': 'Our Services',
    'services.page.subtitle': 'Comprehensive legal search and advisory solutions for discerning clients',
    'services.page.intro': 'We offer a focused suite of services designed for organizations that recognize senior legal hiring as a strategic imperative.',
    
    // For Clients Page
    'clients.page.title': 'For Clients',
    'clients.page.subtitle': 'Trusted counsel to legal leadership',
    'clients.page.intro': 'We understand that securing the right legal talent at the senior level requires more than recruitment — it demands insight, discretion, and genuine understanding of your organization.',
    'clients.lawfirms.title': 'For Law Firms',
    'clients.lawfirms.intro': 'From lateral partner recruitment to strategic team building, we help firms strengthen their practice.',
    'clients.corporations.title': 'For Corporations',
    'clients.corporations.intro': 'We advise corporate legal departments on building leadership teams that drive business outcomes.',
    'clients.roles.title': 'Positions We Cover',
    'clients.approach.title': 'Our Methodology',
    'clients.approach.desc': 'Every engagement begins with a thorough understanding of your organization, culture, and strategic objectives. We then leverage our network and market insight to identify and approach candidates with the discretion that senior professionals expect.',
    'clients.cta': 'Discuss Your Requirements',
    
    // For Candidates Page
    'candidates.page.title': 'For Candidates',
    'candidates.page.subtitle': 'Confidential opportunities for accomplished legal professionals',
    'candidates.page.intro': 'We represent a select portfolio of mandates from leading organizations seeking exceptional legal talent. Many opportunities are not publicly advertised.',
    'candidates.opportunities.title': 'Exclusive Access',
    'candidates.opportunities.desc': 'Many of our mandates are confidential and never publicly advertised. By establishing a relationship with us, you gain access to opportunities matched specifically to your profile and aspirations.',
    'candidates.approach.title': 'Our Commitment',
    'candidates.approach.desc': 'We take time to understand your career objectives, circumstances, and preferences. Our role is to connect you with opportunities that genuinely advance your career.',
    'candidates.discretion.title': 'Complete Confidentiality',
    'candidates.discretion.desc': 'Your privacy is paramount. We never share your details without explicit consent, and all communications are handled with absolute discretion.',
    'candidates.cta': 'Begin a Conversation',
    
    // About Page
    'about.page.title': 'Our Firm',
    'about.page.subtitle': 'Nearly two decades of dedicated service to the legal profession',
    'about.page.intro': 'B Solution was founded on a simple premise: the legal sector deserves a search partner who understands its unique demands and operates with the professionalism that senior professionals expect.',
    'about.story.title': 'Our Story',
    'about.story.p1': 'Since 2007, B Solution has established itself as a trusted advisor to law firms and corporations across Europe and the Middle East. Our exclusive focus on the legal sector allows us to maintain the depth of expertise and caliber of network that generalist firms cannot match.',
    'about.story.p2': 'We believe in quality over volume. Rather than pursuing every mandate, we take on assignments where we can deliver genuine value. This selective approach has earned us enduring relationships with leading organizations.',
    'about.difference.title': 'What Sets Us Apart',
    'about.boutique.title': 'Focused Expertise',
    'about.boutique.desc': 'As a specialist firm, we offer the personalized attention and sector knowledge that larger generalist firms cannot provide.',
    'about.expertise.title': 'Market Insight',
    'about.expertise.desc': 'Our team brings direct experience and deep knowledge of legal markets across multiple jurisdictions.',
    'about.selective.title': 'Selective Approach',
    'about.selective.desc': 'We work with a curated group of clients, ensuring each mandate receives the attention it deserves.',
    'about.team.title': 'Our Team',
    'about.team.desc': 'Our consultants combine backgrounds in legal recruitment, executive search, and professional services — united by a commitment to excellence and discretion.',
    
    // Contact Page
    'contact.page.title': 'Contact',
    'contact.page.subtitle': 'We would welcome the opportunity to discuss how we might assist.',
    'contact.form.title': 'Send a message',
    'contact.form.name': 'Name',
    'contact.form.email': 'Email',
    'contact.form.company': 'Organization',
    'contact.form.phone': 'Phone',
    'contact.form.type': 'I am...',
    'contact.form.type.hiring': 'Seeking to hire',
    'contact.form.type.candidate': 'A legal professional',
    'contact.form.type.other': 'Other inquiry',
    'contact.form.message': 'Message',
    'contact.form.submit': 'Send Message',
    'contact.info.title': 'Get in Touch',
    'contact.info.address': 'Address',
    'contact.info.phone': 'Phone',
    'contact.info.email': 'Email',
    'contact.info.linkedin': 'LinkedIn',
    
    // Open Positions Page
    'positions.page.title': 'Current Opportunities',
    'positions.page.subtitle': 'Selected mandates from our portfolio',
    'positions.page.intro': 'Below is a selection of current assignments. Many of our mandates are confidential — we invite you to contact us to discuss opportunities aligned with your profile.',
    'positions.filter.all': 'All',
    'positions.filter.lawfirm': 'Law Firm',
    'positions.filter.inhouse': 'Corporate',
    'positions.apply': 'Express Interest',
    'positions.contact': 'Inquire About This Role',
  },
  cs: {
    // Navigation
    'nav.home': 'Domů',
    'nav.services': 'Služby',
    'nav.clients': 'Pro klienty',
    'nav.candidates': 'Pro kandidáty',
    'nav.about': 'O nás',
    'nav.positions': 'Příležitosti',
    'nav.contact': 'Kontakt',
    'nav.cta': 'Kontaktujte nás',
    
    // Hero
    'hero.eyebrow': 'Legal Executive Search',
    'hero.headline': 'Strategický partner pro budování výjimečných právních týmů',
    'hero.subheadline': 'Spolupracujeme s předními korporacemi a advokátními kancelářemi při identifikaci a získávání právního vedení napříč Evropou a Blízkým východem.',
    'hero.cta.hire': 'Konzultovat obsazení pozice',
    'hero.cta.candidates': 'Prozkoumat příležitosti',
    
    // Credibility
    'credibility.since': 'Od roku 2007',
    'credibility.reach': 'Evropa a Blízký východ',
    'credibility.specialist': 'Legal Executive Search',
    'credibility.approach': 'Diskrétně a důvěrně',
    
    // Intro
    'intro.eyebrow': 'O nás',
    'intro.title': 'Důvěryhodní poradci právního vedení',
    'intro.text1': 'B Solution je specializovaná executive search firma zaměřená výhradně na právní sektor. Téměř dvě desetiletí budujeme dlouhodobé vztahy s firemními právními odděleními a předními advokátními kancelářemi. Naše reputace stojí na diskrétnosti, znalosti trhu a výjimečných výsledcích.',
    'intro.text2': 'Upřednostňujeme kvalitu před kvantitou — přijímáme méně mandátů a dosahujeme lepších výsledků. Chápeme, že obsazování seniorních pozic není pouhý nábor — je to strategické rozhodnutí formující budoucnost organizace.',
    'intro.cta': 'Poznat náš přístup',
    
    // Clients
    'clients.eyebrow': 'Komu pomáháme',
    'clients.title': 'Firemní právní oddělení a advokátní kanceláře',
    'clients.corporate.eyebrow': 'Firemní právní oddělení',
    'clients.corporate.title': 'Budování právního vedení',
    'clients.corporate.desc': 'Poradíme nadnárodním korporacím, private equity firmám i rostoucím podnikům při získávání právního vedení, které pohání obchodní úspěch.',
    'clients.lawfirm.eyebrow': 'Advokátní kanceláře',
    'clients.lawfirm.title': 'Posilování partnerství',
    'clients.lawfirm.desc': 'Podporujeme mezinárodní i tuzemské kanceláře při laterálním náboru partnerů, získávání advokátů a strategickém rozvoji týmů.',
    'home.clients.cta': 'Prozkoumat služby pro klienty',
    
    // Services
    'services.eyebrow': 'Naše služby',
    'services.title': 'Executive Search a poradenství',
    'services.intro': 'Naše služby jsou určeny organizacím, které chápou hodnotu správného obsazení seniorních pozic napoprvé.',
    'services.executive.title': 'Executive Search',
    'services.executive.desc': 'Retained search pro pozice General Counsel, Chief Legal Officer, Head of Legal a seniorního in-house vedení.',
    'services.retained.title': 'Retained Legal Recruitment',
    'services.retained.desc': 'Dedikované vyhledávání partnerů, counsel, senior advokátů a vedoucích praxí v předních kancelářích.',
    'services.mapping.title': 'Analýza trhu',
    'services.mapping.desc': 'Komplexní mapování talentů, benchmarking odměňování a analýza konkurenčního prostředí.',
    'services.advisory.title': 'Strategické poradenství',
    'services.advisory.desc': 'Konzultace ke strukturování týmů, plánování nástupnictví a organizačnímu nastavení právních funkcí.',
    'services.cta': 'Zobrazit všechny služby',
    
    // Difference
    'difference.eyebrow': 'Čím se odlišujeme',
    'difference.title': 'Proč si klienti vybírají B Solution',
    'difference.expertise.title': 'Sektorová expertíza',
    'difference.expertise.desc': 'Výhradní zaměření na právní trh s hlubokým porozuměním dynamice praxe a kariérním trajektoriím.',
    'difference.discretion.title': 'Absolutní diskrétnost',
    'difference.discretion.desc': 'Každý mandát vedeme s důvěrností, kterou seniorní profesionálové očekávají a zasluhují.',
    'difference.network.title': 'Vybudovaná síť',
    'difference.network.desc': 'Téměř dvě dekády vztahů napříč právní komunitou v Evropě a na Blízkém východě.',
    'difference.partnership.title': 'Skutečné partnerství',
    'difference.partnership.desc': 'Investujeme do porozumění vaší organizaci, kultuře a dlouhodobým cílům.',
    
    // Geography
    'geography.eyebrow': 'Náš dosah',
    'geography.title': 'Mezinárodní působnost',
    'geography.desc': 'Z našich klíčových trhů ve střední Evropě jsme vybudovali rozsáhlou síť pokrývající hlavní právní jurisdikce. Zavedené vztahy nám umožňují realizovat vyhledávání přes hranice s lokální znalostí trhu.',
    
    // Positions
    'positions.eyebrow': 'Aktuální mandáty',
    'positions.title': 'Vybrané příležitosti',
    'positions.viewall': 'Zobrazit všechny příležitosti',
    'positions.details': 'Zobrazit detail pozice',
    
    // Candidates
    'candidate.eyebrow': 'Pro právní profesionály',
    'candidate.title': 'Rozvoj vaší kariéry',
    'candidate.desc': 'Spolupracujeme s úspěšnými právními profesionály, kteří zvažují další kariérní krok. Náš přístup je konzultativní — věnujeme čas pochopení vašich ambicí a představujeme pouze příležitosti skutečně odpovídající vaší kariérní trajektorii.',
    'candidate.cta': 'Důvěrná konzultace',
    
    // Final CTA
    'final.title': 'Zahájit rozhovor',
    'final.desc': 'Ať už budujete právní tým nebo zvažujete svou další vedoucí roli, rádi s vámi probereme, jak bychom mohli pomoci.',
    'final.cta.contact': 'Domluvit konzultaci',
    'final.cta.positions': 'Zobrazit aktuální příležitosti',
    
    // Footer
    'footer.tagline': 'Legal executive search a poradenství v Evropě a na Blízkém východě.',
    'footer.company': 'Společnost',
    'footer.services': 'Služby',
    'footer.connect': 'Kontakt',
    'footer.privacy': 'Ochrana údajů',
    'footer.cookies': 'Cookies',
    'footer.copyright': '© 2007–2026 B Solution. Všechna práva vyhrazena.',
    
    // Services Page
    'services.page.title': 'Naše služby',
    'services.page.subtitle': 'Komplexní řešení právního vyhledávání a poradenství pro náročné klienty',
    'services.page.intro': 'Nabízíme cílené služby určené organizacím, které chápou obsazování seniorních právních pozic jako strategickou prioritu.',
    
    // For Clients Page
    'clients.page.title': 'Pro klienty',
    'clients.page.subtitle': 'Důvěryhodní poradci právního vedení',
    'clients.page.intro': 'Chápeme, že získání správného právního talentu na seniorní úrovni vyžaduje více než nábor — vyžaduje vhled, diskrétnost a skutečné porozumění vaší organizaci.',
    'clients.lawfirms.title': 'Pro advokátní kanceláře',
    'clients.lawfirms.intro': 'Od laterálního náboru partnerů po strategický rozvoj týmů — pomáháme kancelářím posilovat jejich praxi.',
    'clients.corporations.title': 'Pro korporace',
    'clients.corporations.intro': 'Poradíme firemním právním oddělením při budování vedoucích týmů, které přinášejí obchodní výsledky.',
    'clients.roles.title': 'Pozice, které obsazujeme',
    'clients.approach.title': 'Naše metodologie',
    'clients.approach.desc': 'Každá spolupráce začíná důkladným pochopením vaší organizace, kultury a strategických cílů. Následně využíváme naši síť a znalost trhu k identifikaci a oslovení kandidátů s diskrétností, kterou seniorní profesionálové očekávají.',
    'clients.cta': 'Projednat vaše požadavky',
    
    // For Candidates Page
    'candidates.page.title': 'Pro kandidáty',
    'candidates.page.subtitle': 'Důvěrné příležitosti pro úspěšné právní profesionály',
    'candidates.page.intro': 'Zastupujeme vybrané portfolio mandátů od předních organizací hledajících výjimečné právní talenty. Mnoho příležitostí není veřejně inzerováno.',
    'candidates.opportunities.title': 'Exkluzivní přístup',
    'candidates.opportunities.desc': 'Mnoho našich mandátů je důvěrných a nikdy veřejně neinzerovaných. Navázáním vztahu s námi získáte přístup k příležitostem přesně odpovídajícím vašemu profilu a ambicím.',
    'candidates.approach.title': 'Náš závazek',
    'candidates.approach.desc': 'Věnujeme čas pochopení vašich kariérních cílů, okolností a preferencí. Naší rolí je propojit vás s příležitostmi, které skutečně posunou vaši kariéru.',
    'candidates.discretion.title': 'Naprostá důvěrnost',
    'candidates.discretion.desc': 'Vaše soukromí je prvořadé. Vaše údaje nikdy nesdílíme bez výslovného souhlasu a veškerá komunikace probíhá s absolutní diskrétností.',
    'candidates.cta': 'Zahájit rozhovor',
    
    // About Page
    'about.page.title': 'Naše firma',
    'about.page.subtitle': 'Téměř dvě desetiletí služby právní profesi',
    'about.page.intro': 'B Solution vznikla na jednoduchém principu: právní sektor si zaslouží partnera pro vyhledávání, který rozumí jeho jedinečným požadavkům a pracuje s profesionalitou, kterou seniorní profesionálové očekávají.',
    'about.story.title': 'Náš příběh',
    'about.story.p1': 'Od roku 2007 se B Solution etablovala jako důvěryhodný poradce advokátních kanceláří a korporací v Evropě a na Blízkém východě. Naše výhradní zaměření na právní sektor nám umožňuje udržovat hloubku expertízy a úroveň sítě, kterou generalistické firmy nemohou nabídnout.',
    'about.story.p2': 'Věříme v kvalitu před kvantitou. Místo honby za každým mandátem přijímáme zakázky, kde můžeme přinést skutečnou hodnotu. Tento selektivní přístup nám vybudoval trvalé vztahy s předními organizacemi.',
    'about.difference.title': 'Čím se odlišujeme',
    'about.boutique.title': 'Cílená expertíza',
    'about.boutique.desc': 'Jako specializovaná firma nabízíme personalizovanou pozornost a sektorové znalosti, které větší generalistické firmy nemohou poskytnout.',
    'about.expertise.title': 'Znalost trhu',
    'about.expertise.desc': 'Náš tým přináší přímé zkušenosti a hluboké znalosti právních trhů napříč jurisdikcemi.',
    'about.selective.title': 'Selektivní přístup',
    'about.selective.desc': 'Spolupracujeme s vybranou skupinou klientů a zajišťujeme, že každý mandát dostane pozornost, kterou si zaslouží.',
    'about.team.title': 'Náš tým',
    'about.team.desc': 'Naši konzultanti kombinují zkušenosti z právního recruitmentu, executive search a profesionálních služeb — spojeni závazkem k excelenci a diskrétnosti.',
    
    // Contact Page
    'contact.page.title': 'Kontakt',
    'contact.page.subtitle': 'Rádi s vámi probereme, jak bychom mohli pomoci.',
    'contact.form.title': 'Napište nám',
    'contact.form.name': 'Jméno',
    'contact.form.email': 'E-mail',
    'contact.form.company': 'Organizace',
    'contact.form.phone': 'Telefon',
    'contact.form.type': 'Jsem...',
    'contact.form.type.hiring': 'Hledám kandidáty',
    'contact.form.type.candidate': 'Právní profesionál',
    'contact.form.type.other': 'Jiný dotaz',
    'contact.form.message': 'Zpráva',
    'contact.form.submit': 'Odeslat zprávu',
    'contact.info.title': 'Kontaktujte nás',
    'contact.info.address': 'Adresa',
    'contact.info.phone': 'Telefon',
    'contact.info.email': 'E-mail',
    'contact.info.linkedin': 'LinkedIn',
    
    // Open Positions Page
    'positions.page.title': 'Aktuální příležitosti',
    'positions.page.subtitle': 'Vybrané mandáty z našeho portfolia',
    'positions.page.intro': 'Níže je výběr aktuálních zakázek. Mnoho našich mandátů je důvěrných — kontaktujte nás pro projednání příležitostí odpovídajících vašemu profilu.',
    'positions.filter.all': 'Vše',
    'positions.filter.lawfirm': 'Advokátní kanceláře',
    'positions.filter.inhouse': 'Korporace',
    'positions.apply': 'Projevit zájem',
    'positions.contact': 'Dotaz k této pozici',
  },
  de: {
    // Navigation
    'nav.home': 'Startseite',
    'nav.services': 'Leistungen',
    'nav.clients': 'Für Mandanten',
    'nav.candidates': 'Für Kandidaten',
    'nav.about': 'Über uns',
    'nav.positions': 'Stellenangebote',
    'nav.contact': 'Kontakt',
    'nav.cta': 'Kontakt aufnehmen',
    
    // Hero
    'hero.eyebrow': 'Legal Executive Search',
    'hero.headline': 'Strategische Beratung für den Aufbau herausragender Rechtsteams',
    'hero.subheadline': 'Wir unterstützen führende Unternehmen und Kanzleien bei der Identifikation und Gewinnung von Führungspersönlichkeiten im Rechtsbereich in Europa und dem Nahen Osten.',
    'hero.cta.hire': 'Suche besprechen',
    'hero.cta.candidates': 'Karrieremöglichkeiten',
    
    // Credibility
    'credibility.since': 'Seit 2007',
    'credibility.reach': 'Europa & Naher Osten',
    'credibility.specialist': 'Legal Executive Search',
    'credibility.approach': 'Diskret & Vertraulich',
    
    // Intro
    'intro.eyebrow': 'Über uns',
    'intro.title': 'Vertrauenswürdige Berater für Rechtsführung',
    'intro.text1': 'B Solution ist eine spezialisierte Executive-Search-Firma, die sich ausschließlich dem Rechtssektor widmet. Seit fast zwei Jahrzehnten pflegen wir dauerhafte Beziehungen zu Rechtsabteilungen und führenden Kanzleien und haben uns einen Ruf für Diskretion, Marktkenntnis und hervorragende Besetzungsergebnisse erarbeitet.',
    'intro.text2': 'Unser Fokus auf Qualität statt Quantität bedeutet, dass wir weniger Mandate annehmen und bessere Ergebnisse liefern. Wir verstehen, dass Einstellungen auf Führungsebene nicht nur Rekrutierung sind — es sind strategische Entscheidungen, die die Zukunft Ihrer Organisation prägen.',
    'intro.cta': 'Unseren Ansatz kennenlernen',
    
    // Clients
    'clients.eyebrow': 'Unsere Mandanten',
    'clients.title': 'Rechtsabteilungen & Kanzleipartner',
    'clients.corporate.eyebrow': 'Rechtsabteilungen',
    'clients.corporate.title': 'Aufbau interner Rechtsführung',
    'clients.corporate.desc': 'Wir beraten multinationale Unternehmen, Private-Equity-Firmen und wachsende Unternehmen bei der Gewinnung der Rechtsführung, die den Geschäftserfolg vorantreibt.',
    'clients.lawfirm.eyebrow': 'Kanzleien',
    'clients.lawfirm.title': 'Stärkung Ihrer Partnerschaft',
    'clients.lawfirm.desc': 'Wir unterstützen internationale und nationale Kanzleien bei der lateralen Partnerrekrutierung, der Einstellung von Associates und der strategischen Teamentwicklung.',
    'home.clients.cta': 'Unsere Mandantenservices entdecken',
    
    // Services
    'services.eyebrow': 'Unsere Leistungen',
    'services.title': 'Executive Search & Beratung',
    'services.intro': 'Unsere Dienstleistungen sind für Organisationen konzipiert, die den Wert einer erfolgreichen Führungskräftebesetzung beim ersten Mal verstehen.',
    'services.executive.title': 'Executive Search',
    'services.executive.desc': 'Retained Search für General Counsel, Chief Legal Officer, Head of Legal und Führungspositionen im Rechtsbereich.',
    'services.retained.title': 'Retained Legal Recruitment',
    'services.retained.desc': 'Dedizierte Suche nach Partnern, Counsel, Senior Associates und Praxisgruppenleitung bei führenden Kanzleien.',
    'services.mapping.title': 'Marktanalyse',
    'services.mapping.desc': 'Umfassendes Talent Mapping, Vergütungsbenchmarking und Wettbewerbsanalyse.',
    'services.advisory.title': 'Strategische Beratung',
    'services.advisory.desc': 'Beratung zu Teamstrukturierung, Nachfolgeplanung und Organisationsdesign für Rechtsfunktionen.',
    'services.cta': 'Alle Leistungen ansehen',
    
    // Difference
    'difference.eyebrow': 'Unser Unterschied',
    'difference.title': 'Warum Mandanten B Solution wählen',
    'difference.expertise.title': 'Branchenexpertise',
    'difference.expertise.desc': 'Exklusiver Fokus auf Rechtsmärkte mit tiefem Verständnis der Praxisdynamik und Karrierewege.',
    'difference.discretion.title': 'Absolute Diskretion',
    'difference.discretion.desc': 'Jedes Mandat wird mit der Vertraulichkeit behandelt, die Führungskräfte erwarten und verdienen.',
    'difference.network.title': 'Gepflegtes Netzwerk',
    'difference.network.desc': 'Fast zwei Jahrzehnte Beziehungen in der Rechtsgemeinschaft Europas und des Nahen Ostens.',
    'difference.partnership.title': 'Echte Partnerschaft',
    'difference.partnership.desc': 'Wir investieren in das Verständnis Ihrer Organisation, Kultur und langfristigen Ziele.',
    
    // Geography
    'geography.eyebrow': 'Unsere Reichweite',
    'geography.title': 'Internationale Präsenz',
    'geography.desc': 'Von unseren Kernmärkten in Mitteleuropa haben wir ein umfangreiches Netzwerk aufgebaut, das wichtige Rechtsjurisdiktionen abdeckt. Unsere etablierten Beziehungen ermöglichen grenzüberschreitende Suchen mit lokaler Marktkenntnis.',
    
    // Positions
    'positions.eyebrow': 'Aktuelle Mandate',
    'positions.title': 'Ausgewählte Positionen',
    'positions.viewall': 'Alle Positionen ansehen',
    'positions.details': 'Positionsdetails ansehen',
    
    // Candidates
    'candidate.eyebrow': 'Für Juristen',
    'candidate.title': 'Ihre Karriere fördern',
    'candidate.desc': 'Wir arbeiten mit erfolgreichen Juristen, die ihr nächstes Kapitel erkunden. Unser Ansatz ist beratend — wir nehmen uns Zeit, Ihre Ambitionen zu verstehen und präsentieren nur Möglichkeiten, die wirklich zu Ihrer Karrieretrajektorie passen.',
    'candidate.cta': 'Vertrauliches Gespräch',
    
    // Final CTA
    'final.title': 'Ein Gespräch beginnen',
    'final.desc': 'Ob Sie ein Rechtsteam aufbauen oder Ihre nächste Führungsrolle erkunden — wir freuen uns auf die Möglichkeit zu verstehen, wie wir helfen können.',
    'final.cta.contact': 'Beratungstermin vereinbaren',
    'final.cta.positions': 'Aktuelle Positionen ansehen',
    
    // Footer
    'footer.tagline': 'Legal Executive Search und Beratung in Europa und dem Nahen Osten.',
    'footer.company': 'Unternehmen',
    'footer.services': 'Leistungen',
    'footer.connect': 'Kontakt',
    'footer.privacy': 'Datenschutz',
    'footer.cookies': 'Cookies',
    'footer.copyright': '© 2007–2026 B Solution. Alle Rechte vorbehalten.',
    
    // Services Page
    'services.page.title': 'Unsere Leistungen',
    'services.page.subtitle': 'Umfassende Legal-Search- und Beratungslösungen für anspruchsvolle Mandanten',
    'services.page.intro': 'Wir bieten fokussierte Dienstleistungen für Organisationen, die Führungskräftebesetzung im Rechtsbereich als strategische Priorität verstehen.',
    
    // For Clients Page
    'clients.page.title': 'Für Mandanten',
    'clients.page.subtitle': 'Vertrauenswürdige Berater für Rechtsführung',
    'clients.page.intro': 'Wir verstehen, dass die Gewinnung des richtigen Rechtstalensts auf Führungsebene mehr als Rekrutierung erfordert — es erfordert Einblick, Diskretion und echtes Verständnis Ihrer Organisation.',
    'clients.lawfirms.title': 'Für Kanzleien',
    'clients.lawfirms.intro': 'Von der lateralen Partnerrekrutierung bis zum strategischen Teamaufbau helfen wir Kanzleien, ihre Praxis zu stärken.',
    'clients.corporations.title': 'Für Unternehmen',
    'clients.corporations.intro': 'Wir beraten Rechtsabteilungen beim Aufbau von Führungsteams, die Geschäftsergebnisse liefern.',
    'clients.roles.title': 'Positionen, die wir besetzen',
    'clients.approach.title': 'Unsere Methodik',
    'clients.approach.desc': 'Jedes Mandat beginnt mit einem gründlichen Verständnis Ihrer Organisation, Kultur und strategischen Ziele. Dann nutzen wir unser Netzwerk und Marktkenntnis, um Kandidaten mit der Diskretion zu identifizieren und anzusprechen, die Führungskräfte erwarten.',
    'clients.cta': 'Ihre Anforderungen besprechen',
    
    // For Candidates Page
    'candidates.page.title': 'Für Kandidaten',
    'candidates.page.subtitle': 'Vertrauliche Möglichkeiten für erfolgreiche Juristen',
    'candidates.page.intro': 'Wir vertreten ein ausgewähltes Portfolio von Mandaten führender Organisationen, die außergewöhnliche Rechtstalente suchen. Viele Positionen werden nicht öffentlich ausgeschrieben.',
    'candidates.opportunities.title': 'Exklusiver Zugang',
    'candidates.opportunities.desc': 'Viele unserer Mandate sind vertraulich und werden nie öffentlich ausgeschrieben. Durch den Aufbau einer Beziehung mit uns erhalten Sie Zugang zu Möglichkeiten, die speziell auf Ihr Profil und Ihre Ambitionen abgestimmt sind.',
    'candidates.approach.title': 'Unser Engagement',
    'candidates.approach.desc': 'Wir nehmen uns Zeit, Ihre Karriereziele, Umstände und Präferenzen zu verstehen. Unsere Rolle ist es, Sie mit Möglichkeiten zu verbinden, die Ihre Karriere wirklich voranbringen.',
    'candidates.discretion.title': 'Vollständige Vertraulichkeit',
    'candidates.discretion.desc': 'Ihre Privatsphäre ist oberstes Gebot. Wir teilen Ihre Daten nie ohne ausdrückliche Zustimmung und alle Kommunikation erfolgt mit absoluter Diskretion.',
    'candidates.cta': 'Ein Gespräch beginnen',
    
    // About Page
    'about.page.title': 'Unsere Firma',
    'about.page.subtitle': 'Fast zwei Jahrzehnte im Dienst der Rechtsprofession',
    'about.page.intro': 'B Solution wurde auf einer einfachen Prämisse gegründet: Der Rechtssektor verdient einen Suchpartner, der seine einzigartigen Anforderungen versteht und mit der Professionalität arbeitet, die Führungskräfte erwarten.',
    'about.story.title': 'Unsere Geschichte',
    'about.story.p1': 'Seit 2007 hat sich B Solution als vertrauenswürdiger Berater für Kanzleien und Unternehmen in Europa und dem Nahen Osten etabliert. Unser exklusiver Fokus auf den Rechtssektor ermöglicht uns die Tiefe der Expertise und Qualität des Netzwerks, die Generalisten-Firmen nicht bieten können.',
    'about.story.p2': 'Wir glauben an Qualität statt Quantität. Anstatt jedes Mandat zu verfolgen, nehmen wir Aufträge an, bei denen wir echten Wert liefern können. Dieser selektive Ansatz hat uns dauerhafte Beziehungen mit führenden Organisationen eingebracht.',
    'about.difference.title': 'Was uns unterscheidet',
    'about.boutique.title': 'Fokussierte Expertise',
    'about.boutique.desc': 'Als Spezialist-Firma bieten wir die persönliche Betreuung und Branchenkenntnisse, die größere Generalisten-Firmen nicht bieten können.',
    'about.expertise.title': 'Marktkenntnis',
    'about.expertise.desc': 'Unser Team bringt direkte Erfahrung und tiefe Kenntnis der Rechtsmärkte über mehrere Jurisdiktionen.',
    'about.selective.title': 'Selektiver Ansatz',
    'about.selective.desc': 'Wir arbeiten mit einer ausgewählten Gruppe von Mandanten und stellen sicher, dass jedes Mandat die Aufmerksamkeit erhält, die es verdient.',
    'about.team.title': 'Unser Team',
    'about.team.desc': 'Unsere Berater kombinieren Hintergründe in Legal Recruitment, Executive Search und Professional Services — vereint durch ein Engagement für Exzellenz und Diskretion.',
    
    // Contact Page
    'contact.page.title': 'Kontakt',
    'contact.page.subtitle': 'Wir freuen uns auf die Möglichkeit zu besprechen, wie wir helfen können.',
    'contact.form.title': 'Nachricht senden',
    'contact.form.name': 'Name',
    'contact.form.email': 'E-Mail',
    'contact.form.company': 'Organisation',
    'contact.form.phone': 'Telefon',
    'contact.form.type': 'Ich bin...',
    'contact.form.type.hiring': 'Auf der Suche nach Kandidaten',
    'contact.form.type.candidate': 'Ein Jurist',
    'contact.form.type.other': 'Andere Anfrage',
    'contact.form.message': 'Nachricht',
    'contact.form.submit': 'Nachricht senden',
    'contact.info.title': 'Kontakt aufnehmen',
    'contact.info.address': 'Adresse',
    'contact.info.phone': 'Telefon',
    'contact.info.email': 'E-Mail',
    'contact.info.linkedin': 'LinkedIn',
    
    // Open Positions Page
    'positions.page.title': 'Aktuelle Positionen',
    'positions.page.subtitle': 'Ausgewählte Mandate aus unserem Portfolio',
    'positions.page.intro': 'Unten finden Sie eine Auswahl aktueller Aufträge. Viele unserer Mandate sind vertraulich — kontaktieren Sie uns, um Möglichkeiten zu besprechen, die zu Ihrem Profil passen.',
    'positions.filter.all': 'Alle',
    'positions.filter.lawfirm': 'Kanzlei',
    'positions.filter.inhouse': 'Unternehmen',
    'positions.apply': 'Interesse bekunden',
    'positions.contact': 'Zu dieser Position anfragen',
  },
  pl: {
    // Navigation
    'nav.home': 'Strona główna',
    'nav.services': 'Usługi',
    'nav.clients': 'Dla Klientów',
    'nav.candidates': 'Dla Kandydatów',
    'nav.about': 'O nas',
    'nav.positions': 'Oferty pracy',
    'nav.contact': 'Kontakt',
    'nav.cta': 'Skontaktuj się',
    
    // Hero
    'hero.eyebrow': 'Legal Executive Search',
    'hero.headline': 'Strategiczne doradztwo w budowaniu wyjątkowych zespołów prawnych',
    'hero.subheadline': 'Współpracujemy z wiodącymi korporacjami i kancelariami prawnymi w identyfikacji i pozyskiwaniu liderów prawnych w Europie i na Bliskim Wschodzie.',
    'hero.cta.hire': 'Omów rekrutację',
    'hero.cta.candidates': 'Zobacz możliwości',
    
    // Credibility
    'credibility.since': 'Od 2007 roku',
    'credibility.reach': 'Europa i Bliski Wschód',
    'credibility.specialist': 'Legal Executive Search',
    'credibility.approach': 'Dyskretnie i Poufnie',
    
    // Intro
    'intro.eyebrow': 'O nas',
    'intro.title': 'Zaufani Doradcy Liderów Prawnych',
    'intro.text1': 'B Solution to wyspecjalizowana firma executive search dedykowana wyłącznie sektorowi prawnemu. Od niemal dwóch dekad budujemy trwałe relacje z działami prawnymi korporacji i wiodącymi kancelariami, zdobywając reputację dzięki dyskrecji, znajomości rynku i wyjątkowym wynikom rekrutacji.',
    'intro.text2': 'Nasz nacisk na jakość, a nie ilość oznacza, że przyjmujemy mniej mandatów i osiągamy lepsze wyniki. Rozumiemy, że rekrutacja na poziomie senior to nie tylko zatrudnianie — to strategiczna decyzja kształtująca przyszłość organizacji.',
    'intro.cta': 'Poznaj nasze podejście',
    
    // Clients
    'clients.eyebrow': 'Nasi Klienci',
    'clients.title': 'Działy Prawne i Kancelarie Partnerskie',
    'clients.corporate.eyebrow': 'Działy Prawne Korporacji',
    'clients.corporate.title': 'Budowanie Wewnętrznego Przywództwa',
    'clients.corporate.desc': 'Doradzamy międzynarodowym korporacjom, firmom private equity i rozwijającym się przedsiębiorstwom w pozyskiwaniu liderów prawnych, którzy napędzają sukces biznesowy.',
    'clients.lawfirm.eyebrow': 'Kancelarie Prawne',
    'clients.lawfirm.title': 'Wzmacnianie Partnerstwa',
    'clients.lawfirm.desc': 'Wspieramy międzynarodowe i krajowe kancelarie w lateralnej rekrutacji partnerów, zatrudnianiu prawników i strategicznym rozwoju zespołów.',
    'home.clients.cta': 'Poznaj nasze usługi dla klientów',
    
    // Services
    'services.eyebrow': 'Nasze Usługi',
    'services.title': 'Executive Search i Doradztwo',
    'services.intro': 'Nasze usługi są przeznaczone dla organizacji, które rozumieją wartość prawidłowego zatrudnienia na poziomie senior za pierwszym razem.',
    'services.executive.title': 'Executive Search',
    'services.executive.desc': 'Retained search dla pozycji General Counsel, Chief Legal Officer, Head of Legal i seniornych stanowisk in-house.',
    'services.retained.title': 'Retained Legal Recruitment',
    'services.retained.desc': 'Dedykowane poszukiwania partnerów, counsel, senior prawników i liderów praktyk w wiodących kancelariach.',
    'services.mapping.title': 'Analiza Rynku',
    'services.mapping.desc': 'Kompleksowe mapowanie talentów, benchmarking wynagrodzeń i analiza konkurencji.',
    'services.advisory.title': 'Doradztwo Strategiczne',
    'services.advisory.desc': 'Konsultacje w zakresie strukturyzacji zespołów, planowania sukcesji i projektowania organizacyjnego funkcji prawnych.',
    'services.cta': 'Zobacz wszystkie usługi',
    
    // Difference
    'difference.eyebrow': 'Nasza Różnica',
    'difference.title': 'Dlaczego Klienci Wybierają B Solution',
    'difference.expertise.title': 'Ekspertyza Sektorowa',
    'difference.expertise.desc': 'Wyłączny fokus na rynkach prawnych z głębokim zrozumieniem dynamiki praktyki i ścieżek kariery.',
    'difference.discretion.title': 'Absolutna Dyskrecja',
    'difference.discretion.desc': 'Każdy mandat jest realizowany z poufnością, której oczekują i zasługują seniorni profesjonaliści.',
    'difference.network.title': 'Zbudowana Sieć',
    'difference.network.desc': 'Niemal dwie dekady relacji w społeczności prawnej Europy i Bliskiego Wschodu.',
    'difference.partnership.title': 'Prawdziwe Partnerstwo',
    'difference.partnership.desc': 'Inwestujemy w zrozumienie Twojej organizacji, kultury i długoterminowych celów.',
    
    // Geography
    'geography.eyebrow': 'Nasz Zasięg',
    'geography.title': 'Międzynarodowa Obecność',
    'geography.desc': 'Z naszych głównych rynków w Europie Środkowej zbudowaliśmy rozległą sieć obejmującą kluczowe jurysdykcje prawne. Nasze ugruntowane relacje umożliwiają realizację poszukiwań transgranicznych ze znajomością lokalnego rynku.',
    
    // Positions
    'positions.eyebrow': 'Aktualne Mandaty',
    'positions.title': 'Wybrane Oferty',
    'positions.viewall': 'Zobacz wszystkie oferty',
    'positions.details': 'Więcej informacji',
    
    // Candidates
    'candidate.eyebrow': 'Dla Prawników',
    'candidate.title': 'Rozwój Twojej Kariery',
    'candidate.desc': 'Współpracujemy z doświadczonymi prawnikami rozważającymi kolejny etap kariery. Nasze podejście jest doradcze — poświęcamy czas na zrozumienie Twoich aspiracji i przedstawiamy tylko możliwości, które naprawdę odpowiadają Twojej ścieżce kariery.',
    'candidate.cta': 'Poufna Rozmowa',
    
    // Final CTA
    'final.title': 'Rozpocznij Rozmowę',
    'final.desc': 'Niezależnie od tego, czy budujesz zespół prawny, czy szukasz kolejnej roli przywódczej — chętnie porozmawiamy o tym, jak możemy pomóc.',
    'final.cta.contact': 'Umów konsultację',
    'final.cta.positions': 'Zobacz aktualne oferty',
    
    // Footer
    'footer.tagline': 'Legal executive search i doradztwo w Europie i na Bliskim Wschodzie.',
    'footer.company': 'Firma',
    'footer.services': 'Usługi',
    'footer.connect': 'Kontakt',
    'footer.privacy': 'Prywatność',
    'footer.cookies': 'Cookies',
    'footer.copyright': '© 2007–2026 B Solution. Wszelkie prawa zastrzeżone.',
    
    // Services Page
    'services.page.title': 'Nasze Usługi',
    'services.page.subtitle': 'Kompleksowe rozwiązania legal search i doradztwa dla wymagających klientów',
    'services.page.intro': 'Oferujemy skoncentrowane usługi dla organizacji, które rozumieją rekrutację seniornych prawników jako strategiczny priorytet.',
    
    // For Clients Page
    'clients.page.title': 'Dla Klientów',
    'clients.page.subtitle': 'Zaufani doradcy liderów prawnych',
    'clients.page.intro': 'Rozumiemy, że pozyskanie właściwego talentu prawnego na poziomie senior wymaga więcej niż rekrutacji — wymaga wglądu, dyskrecji i prawdziwego zrozumienia Twojej organizacji.',
    'clients.lawfirms.title': 'Dla Kancelarii',
    'clients.lawfirms.intro': 'Od lateralnej rekrutacji partnerów po strategiczny rozwój zespołów — pomagamy kancelariom wzmacniać ich praktykę.',
    'clients.corporations.title': 'Dla Korporacji',
    'clients.corporations.intro': 'Doradzamy działom prawnym korporacji w budowaniu zespołów liderów, które przynoszą wyniki biznesowe.',
    'clients.roles.title': 'Pozycje, które obsadzamy',
    'clients.approach.title': 'Nasza Metodologia',
    'clients.approach.desc': 'Każdy mandat zaczyna się od dogłębnego zrozumienia Twojej organizacji, kultury i celów strategicznych. Następnie wykorzystujemy naszą sieć i znajomość rynku do identyfikacji i kontaktu z kandydatami z dyskrecją, której oczekują seniorni profesjonaliści.',
    'clients.cta': 'Omów swoje wymagania',
    
    // For Candidates Page
    'candidates.page.title': 'Dla Kandydatów',
    'candidates.page.subtitle': 'Poufne możliwości dla doświadczonych prawników',
    'candidates.page.intro': 'Reprezentujemy wyselekcjonowane portfolio mandatów od wiodących organizacji poszukujących wyjątkowych talentów prawnych. Wiele ofert nie jest publicznie ogłaszanych.',
    'candidates.opportunities.title': 'Ekskluzywny Dostęp',
    'candidates.opportunities.desc': 'Wiele naszych mandatów jest poufnych i nigdy publicznie nie ogłaszanych. Nawiązując z nami relację, zyskujesz dostęp do możliwości dopasowanych specjalnie do Twojego profilu i aspiracji.',
    'candidates.approach.title': 'Nasze Zobowiązanie',
    'candidates.approach.desc': 'Poświęcamy czas na zrozumienie Twoich celów kariery, okoliczności i preferencji. Naszą rolą jest łączenie Cię z możliwościami, które naprawdę rozwijają Twoją karierę.',
    'candidates.discretion.title': 'Pełna Poufność',
    'candidates.discretion.desc': 'Twoja prywatność jest najważniejsza. Nigdy nie udostępniamy Twoich danych bez wyraźnej zgody, a cała komunikacja odbywa się z absolutną dyskrecją.',
    'candidates.cta': 'Rozpocznij rozmowę',
    
    // About Page
    'about.page.title': 'Nasza Firma',
    'about.page.subtitle': 'Niemal dwie dekady dedykowanej służby profesji prawniczej',
    'about.page.intro': 'B Solution powstała na prostej zasadzie: sektor prawny zasługuje na partnera rekrutacyjnego, który rozumie jego unikalne wymagania i działa z profesjonalizmem, którego oczekują seniorni profesjonaliści.',
    'about.story.title': 'Nasza Historia',
    'about.story.p1': 'Od 2007 roku B Solution ugruntowała swoją pozycję jako zaufany doradca kancelarii prawnych i korporacji w Europie i na Bliskim Wschodzie. Nasz wyłączny fokus na sektorze prawnym pozwala nam utrzymywać głębię ekspertyzy i jakość sieci, której firmy generalistyczne nie są w stanie dorównać.',
    'about.story.p2': 'Wierzymy w jakość, nie ilość. Zamiast gonić za każdym mandatem, przyjmujemy zlecenia, gdzie możemy dostarczyć prawdziwą wartość. To selektywne podejście przyniosło nam trwałe relacje z wiodącymi organizacjami.',
    'about.difference.title': 'Co nas wyróżnia',
    'about.boutique.title': 'Skoncentrowana Ekspertyza',
    'about.boutique.desc': 'Jako wyspecjalizowana firma oferujemy spersonalizowaną uwagę i wiedzę sektorową, której większe firmy generalistyczne nie są w stanie zapewnić.',
    'about.expertise.title': 'Znajomość Rynku',
    'about.expertise.desc': 'Nasz zespół wnosi bezpośrednie doświadczenie i głęboką znajomość rynków prawnych w wielu jurysdykcjach.',
    'about.selective.title': 'Selektywne Podejście',
    'about.selective.desc': 'Współpracujemy z wyselekcjonowaną grupą klientów, zapewniając, że każdy mandat otrzymuje uwagę, na którą zasługuje.',
    'about.team.title': 'Nasz Zespół',
    'about.team.desc': 'Nasi konsultanci łączą doświadczenie w rekrutacji prawnej, executive search i usługach profesjonalnych — zjednoczeni zaangażowaniem w doskonałość i dyskrecję.',
    
    // Contact Page
    'contact.page.title': 'Kontakt',
    'contact.page.subtitle': 'Chętnie porozmawiamy o tym, jak możemy pomóc.',
    'contact.form.title': 'Wyślij wiadomość',
    'contact.form.name': 'Imię i nazwisko',
    'contact.form.email': 'E-mail',
    'contact.form.company': 'Organizacja',
    'contact.form.phone': 'Telefon',
    'contact.form.type': 'Jestem...',
    'contact.form.type.hiring': 'Szukam kandydatów',
    'contact.form.type.candidate': 'Prawnikiem',
    'contact.form.type.other': 'Inne zapytanie',
    'contact.form.message': 'Wiadomość',
    'contact.form.submit': 'Wyślij wiadomość',
    'contact.info.title': 'Skontaktuj się',
    'contact.info.address': 'Adres',
    'contact.info.phone': 'Telefon',
    'contact.info.email': 'E-mail',
    'contact.info.linkedin': 'LinkedIn',
    
    // Open Positions Page
    'positions.page.title': 'Aktualne Oferty',
    'positions.page.subtitle': 'Wybrane mandaty z naszego portfolio',
    'positions.page.intro': 'Poniżej znajduje się wybór aktualnych zleceń. Wiele naszych mandatów jest poufnych — skontaktuj się z nami, aby omówić możliwości dopasowane do Twojego profilu.',
    'positions.filter.all': 'Wszystkie',
    'positions.filter.lawfirm': 'Kancelaria',
    'positions.filter.inhouse': 'Korporacja',
    'positions.apply': 'Wyraź zainteresowanie',
    'positions.contact': 'Zapytaj o tę pozycję',
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
const pathname = usePathname()
const router = useRouter()
const localeFromPath = (pathname.split('/')[1] as Language)
const initialLanguage: Language = ['cs', 'de', 'pl'].includes(localeFromPath) ? localeFromPath : 'en'
const [language, setLanguageState] = useState<Language>(initialLanguage)

useEffect(() => {
// Synchronize context after client-side navigation changes the locale segment.
// eslint-disable-next-line react-hooks/set-state-in-effect
setLanguageState(initialLanguage)
}, [initialLanguage])

const setLanguage = useCallback((nextLanguage: Language) => {
const segments = pathname.split('/').filter(Boolean)
if (['cs', 'de', 'pl'].includes(segments[0])) segments.shift()
const basePath = segments.length ? `/${segments.join('/')}` : '/'
const nextPath = basePath === '/privacy' || basePath === '/cookies'
  ? legalPath(nextLanguage, basePath)
  : isEnglishOnlyStaticPage(basePath) ? basePath
  : nextLanguage === 'en' ? basePath : `/${nextLanguage}${basePath === '/' ? '' : basePath}`
setLanguageState(nextLanguage)
router.push(nextPath)
}, [pathname, router])

const t = useCallback((key: string): string => {
return translations[language][key] || translations.en[key] || key
}, [language])

return (
<LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
