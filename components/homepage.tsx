"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, MapPin } from 'lucide-react'
import { legalPath } from '@/lib/routes'
import { AuthorityProof } from '@/components/authority-proof'

type Lang = 'en' | 'cs' | 'de' | 'pl'

// All content definitions per language
const content = {
  en: {
    hero: {
      headline: 'Legal Executive Search for Law Firms and Corporate Legal Departments',
      subheadline: 'Since 2007, B Solution has delivered confidential Executive Search assignments across Europe and the Middle East, including partner, General Counsel and legal leadership recruitment.',
      trustLine1: '',
      trustLine2: '',
      ctaPrimary: 'Discuss a Search',
      ctaSecondary: 'Explore Our Services',
    },
    trustBar: {
      items: ['Trusted since 2007', 'Europe & Middle East', 'Legal Sector Exclusive', 'Confidential Retained Search'],
    },
    socialProof: {
      headline: 'Legal Recruitment That Delivers Results',
      columns: [
        { title: 'Direct Approach', desc: 'We identify and approach top legal talent directly — not job board applicants' },
        { title: 'Confidential Search', desc: 'We handle sensitive searches for law firms and in-house teams with discretion' },
        { title: 'Pre-Qualified Candidates', desc: 'We deliver curated shortlists of exceptional candidates, not stacks of CVs' },
      ],
    },
    process: {
      headline: 'How It Works',
      steps: [
        { num: '01', title: 'Tell us your hiring needs', desc: 'Share the role, requirements, and timeline' },
        { num: '02', title: 'We identify top candidates', desc: 'We approach and assess the best legal talent' },
        { num: '03', title: 'Receive a curated shortlist', desc: 'Meet pre-qualified candidates ready to interview' },
      ],
    },
    industries: {
      headline: 'Industries We Serve',
      items: ['Law Firms', 'Banking & Finance', 'Technology', 'Pharma & Life Sciences', 'Real Estate & Development'],
    },
    clients: {
      ctaPrimary: 'Request Candidates',
      ctaSecondary: 'Explore Our Client Services',
      corporate: {
        title: 'In-House Legal Teams',
        desc: 'Hire General Counsel, Head of Legal, and senior in-house lawyers who drive business results — not just manage risk.',
      },
      lawfirm: {
        title: 'Law Firms',
        desc: 'Grow your practice with lateral partner hires, team moves, and strategic talent acquisition across practice areas.',
      },
    },
    difference: {
      headline: 'Why Choose B Solution',
      points: [
        { num: '01', title: 'Legal sector exclusive', desc: 'We focus only on legal recruitment — no generalist distractions' },
        { num: '02', title: 'Confidential retained search', desc: 'Discreet mandates handled with the highest level of trust' },
        { num: '03', title: 'Direct candidate approach', desc: 'Access to passive candidates not actively looking on job boards' },
        { num: '04', title: 'Speed without compromise', desc: 'Rigorous search tailored to each leadership mandate' },
      ],
    },
    intro: {
      eyebrow: 'About Us',
      title: 'Legal Recruitment Specialists Since 2007',
      text1: 'We exclusively serve the legal sector — no generalist distractions. For nearly two decades, we have placed General Counsel, Heads of Legal, partners, and senior lawyers at leading organizations across Europe and the Middle East.',
      text2: 'We take on fewer mandates and deliver better results. Every search is handled with discretion, urgency, and a commitment to finding candidates who will make a lasting impact.',
      cta: 'Request Candidates',
    },
    services: {
      eyebrow: 'What We Do',
      title: 'Legal Recruitment Services',
      intro: 'We handle confidential searches for law firms and in-house legal teams. No job boards, no mass applications — just direct access to exceptional legal talent.',
      cta: 'Request Candidates',
      items: [
        { num: '01', title: 'In-House Executive Search', desc: 'General Counsel, Chief Legal Officer, Head of Legal, and senior in-house leadership roles.' },
        { num: '02', title: 'Law Firm Recruitment', desc: 'Partner-level hires, team moves, and strategic lateral recruitment for leading law firms.' },
        { num: '03', title: 'Talent Mapping', desc: 'Market intelligence, compensation benchmarking, and competitor analysis to inform your hiring strategy.' },
        { num: '04', title: 'Succession Planning', desc: 'Strategic advisory on legal team structure, leadership development, and long-term talent planning.' },
      ],
    },
    geography: {
      eyebrow: 'Our Reach',
      title: 'International Presence',
      desc: 'From our core markets in Central Europe, we have built an extensive network covering key legal jurisdictions. Our established relationships enable cross-border searches with local market knowledge.',
      regions: [
        { region: 'Central Europe', countries: ['Czech Republic', 'Slovakia', 'Austria', 'Hungary', 'Poland'] },
        { region: 'Western Europe', countries: ['Germany', 'United Kingdom', 'Netherlands'] },
        { region: 'Emerging Markets', countries: ['Romania', 'Turkey', 'UAE', 'Croatia'] },
      ],
    },
    candidates: {
      eyebrow: 'For Legal Professionals',
      title: 'Confidential Career Opportunities',
      desc: 'Looking for your next move? We work with accomplished legal professionals seeking senior roles. All discussions are confidential — we only present opportunities that match your aspirations.',
      cta: 'Explore Opportunities',
    },
    finalCta: {
      headline: 'Looking to Hire Legal Talent?',
      subheadline: "Get in touch and we'll connect you with the right candidates quickly and confidentially.",
      ctaPrimary: 'Request Candidates',
      ctaSecondary: 'Discuss Your Needs',
    },
  },
  cs: {
    hero: {
      headline: 'Najděte špičkové právníky v Evropě — rychle, diskrétně, efektivně',
      subheadline: 'Pomáháme advokátním kancelářím a firmám obsazovat klíčové právní pozice v Evropě a na Blízkém východě.',
      trustLine1: '',
      trustLine2: '',
      ctaPrimary: 'Poptat kandidáty',
      ctaSecondary: 'Konzultovat potřeby náboru',
    },
    trustBar: {
      items: ['Na trhu od roku 2007', 'Evropa & Blízký východ', 'Specializace na právní sektor', 'Diskrétní spolupráce'],
    },
    risk: {
      headline: 'Špatná volba právního lídra je drahá',
      points: [
        'Zpožděná rozhodnutí zpomalují chod firmy',
        'Slabé vedení zvyšuje právní i obchodní rizika',
        'Nahrazení nevhodného kandidáta trvá 6–12 měsíců',
        'Nejlepší kandidáti aktivně práci nehledají',
      ],
    },
    solution: {
      headline: 'Dodáváme právní lídry rychle a diskrétně',
      text: 'Specializujeme se na executive search pro seniorní právní pozice, včetně General Counsel, Head of Legal a Legal Director. Každé zadání řešíme individuálně, s důrazem na důvěrnost a dlouhodobý přínos pro klienta.',
    },
    lawfirms: {
      headline: 'Spolupracujeme s předními advokátními kancelářemi',
      text: 'Spolupracujeme s největšími advokátními kancelářemi v regionu i globálně, které se pravidelně umisťují v žebříčcích Legal 500 a dalších prestižních právních directories.',
    },
    corporate: {
      headline: 'Partner pro mezinárodní společnosti',
      text: 'Pomáháme firmám napříč klíčovými odvětvími, zejména ve farmacii, bankovnictví, technologickém sektoru a real estate developmentu. Spolupracujeme jak s rychle rostoucími firmami, tak s nadnárodními korporacemi.',
    },
    outcome: {
      headline: 'Co můžete očekávat',
      points: [
        'Důsledné vyhledávání přizpůsobené každému mandátu',
        'Přístup k top kandidátům mimo otevřený trh',
        'Plně důvěrný proces',
        'Dlouhodobé řešení, ne jen rychlé obsazení pozice',
      ],
    },
    process: {
      headline: 'Jak spolupráce probíhá',
      steps: [
        { num: '01', title: 'Sdělíte nám svou potřebu', desc: 'Popíšete pozici, požadavky a časový rámec' },
        { num: '02', title: 'Identifikujeme kandidáty', desc: 'Oslovíme a posoudíme nejlepší právní talenty' },
        { num: '03', title: 'Představíme shortlist', desc: 'Seznámíte se s prověřenými kandidáty připravenými na pohovor' },
      ],
    },
    finalCta: {
      headline: 'Hledáte právníka?',
      subheadline: 'Popište nám vaši potřebu — ozveme se vám.',
      ctaPrimary: 'Poptat kandidáty',
      ctaSecondary: 'Konzultovat potřeby',
    },
    // Legacy sections kept for compatibility
    socialProof: {
      headline: 'Nábor právníků, který přináší výsledky',
      columns: [
        { title: 'Aktivní oslovování', desc: 'Aktivně oslovujeme top kandidáty — nespoléháme na pracovní portály' },
        { title: 'Diskrétní výběrová řízení', desc: 'Řešíme citlivé nábory pro advokátní kanceláře i in-house týmy' },
        { title: 'Prověření kandidáti', desc: 'Dodáváme pečlivě vybrané kandidáty, ne hromady životopisů' },
      ],
    },
    clients: {
      ctaPrimary: 'Poptat kandidáty',
      ctaSecondary: 'Prozkoumat služby pro klienty',
      corporate: {
        title: 'Firemní právní oddělení',
        desc: 'Podporujeme globální společnosti při najímání seniorních právních profesionálů včetně General Counsel, Head of Legal a strategických in-house lídrů.',
      },
      lawfirm: {
        title: 'Advokátní kanceláře',
        desc: 'Spolupracujeme s předními advokátními kancelářemi na náboru partnerů, přesunech týmů a strategických růstových mandátech.',
      },
    },
    difference: {
      headline: 'Proč si nás klienti vybírají',
      points: [
        { num: '01', title: 'Hluboká znalost trhu', desc: 'Silná přítomnost na evropských a blízkovýchodních právních trzích' },
        { num: '02', title: 'Diskrétnost a důvěrnost', desc: 'Citlivé mandáty řešíme s nejvyšší úrovní důvěry' },
        { num: '03', title: 'Kurátorovaná síť', desc: 'Přístup ke špičkovým právním profesionálům a rozhodovatelům' },
        { num: '04', title: 'Dlouhodobá partnerství', desc: 'Podporujeme klienty i po jediném náboru' },
      ],
    },
    intro: {
      eyebrow: 'O nás',
      title: 'Důvěryhodní poradci pro právní vedení',
      text1: 'B Solution je specializovaná firma pro executive search věnující se výhradně právnímu sektoru. Téměř dvě dekády budujeme trvalé vztahy s firemními právními odděleními a předními advokátními kancelářemi, čímž jsme si vybudovali reputaci díky diskrétnosti, znalosti trhu a výjimečným výsledkům náborů.',
      text2: 'Náš důraz na kvalitu před kvantitou znamená, že přijímáme méně mandátů a dosahujeme lepších výsledků. Chápeme, že nábor na seniorní pozice není jen rekrutace — je to strategické rozhodnutí, které formuje budoucnost vaší organizace.',
      cta: 'Nezávazně probrat vaše potřeby',
    },
    services: {
      eyebrow: 'Naše služby',
      title: 'Executive Search a poradenství',
      intro: 'Naše služby jsou navrženy pro organizace, které chápou hodnotu správného obsazení seniorních pozic na první pokus.',
      cta: 'Nezávazně probrat vaše potřeby',
      items: [
        { num: '01', title: 'Executive Search', desc: 'Retained search pro pozice General Counsel, Chief Legal Officer, Head of Legal a seniorní in-house pozice.' },
        { num: '02', title: 'Retained Legal Recruitment', desc: 'Vyhledávání partnerů, counsel, senior právníků a vedoucích praxí v předních advokátních kancelářích.' },
        { num: '03', title: 'Mapování trhu', desc: 'Komplexní mapování talentů, benchmarking odměňování a konkurenční zpravodajství.' },
        { num: '04', title: 'Strategické poradenství', desc: 'Konzultace ohledně strukturování týmů, plánování nástupnictví a organizačního designu právních funkcí.' },
      ],
    },
    geography: {
      eyebrow: 'Náš dosah',
      title: 'Mezinárodní přítomnost',
      desc: 'Z našich hlavních trhů ve střední Evropě jsme vybudovali rozsáhlou síť pokrývající klíčové právní jurisdikce. Naše zavedené vztahy umožňují přeshraniční vyhledávání se znalostí místního trhu.',
      regions: [
        { region: 'Střední Evropa', countries: ['Česká republika', 'Slovensko', 'Rakousko', 'Maďarsko', 'Polsko'] },
        { region: 'Západní Evropa', countries: ['Německo', 'Velká Británie', 'Nizozemsko'] },
        { region: 'Rozvíjející se trhy', countries: ['Rumunsko', 'Turecko', 'SAE', 'Chorvatsko'] },
      ],
    },
    candidates: {
      eyebrow: 'Pro právníky',
      title: 'Rozvoj vaší kariéry',
      desc: 'Spolupracujeme s úspěšnými právními profesionály, kteří zvažují svůj další kariérní krok. Náš přístup je konzultační — věnujeme čas pochopení vašich aspirací a prezentujeme pouze příležitosti, které skutečně odpovídají vaší kariérní trajektorii.',
      cta: 'Nezávazně probrat vaše potřeby',
    },
  },
  de: {
    hero: {
      headline: 'Top-Juristen in Europa finden — schnell, diskret, effizient',
      subheadline: 'Wir unterstützen Kanzleien und Unternehmen bei der Besetzung von Schlüsselpositionen im juristischen Bereich in Europa und dem Nahen Osten.',
      trustLine1: '',
      trustLine2: '',
      ctaPrimary: 'Kandidaten anfragen',
      ctaSecondary: 'Bedarf besprechen',
    },
    trustBar: {
      items: ['Seit 2007 etabliert', 'Europa & Naher Osten', 'Fokus auf juristischen Bereich', 'Diskrete Mandate'],
    },
    process: {
      headline: 'So funktioniert es',
      steps: [
        { num: '01', title: 'Sie definieren Ihren Bedarf', desc: 'Position, Anforderungen und Zeitrahmen festlegen' },
        { num: '02', title: 'Wir identifizieren passende Kandidaten', desc: 'Gezielte Ansprache und Bewertung von Top-Juristen' },
        { num: '03', title: 'Sie erhalten eine kuratierte Auswahl', desc: 'Treffen Sie vorausgewählte Kandidaten, bereit für Gespräche' },
      ],
    },
    socialProof: {
      headline: 'Juristische Personalberatung mit Ergebnissen',
      columns: [
        { title: 'Direkte Ansprache', desc: 'Wir identifizieren und kontaktieren Top-Kandidaten direkt — keine Jobbörsen' },
        { title: 'Diskrete Suchmandate', desc: 'Sensible Besetzungen für Kanzleien und Rechtsabteilungen' },
        { title: 'Vorausgewählte Kandidaten', desc: 'Kuratierte Shortlists statt Stapel von Lebensläufen' },
      ],
    },
    clients: {
      ctaPrimary: 'Kandidaten anfragen',
      ctaSecondary: 'Unsere Mandantenservices entdecken',
      corporate: {
        title: 'In-House Rechtsabteilungen',
        desc: 'General Counsel, Head of Legal und Senior-Juristen, die Ergebnisse liefern — nicht nur Risiken managen.',
      },
      lawfirm: {
        title: 'Kanzleien',
        desc: 'Wachstum durch laterale Partner, Team-Moves und strategische Talentakquise in allen Praxisbereichen.',
      },
    },
    difference: {
      headline: 'Warum B Solution',
      points: [
        { num: '01', title: 'Fokus auf Recht', desc: 'Ausschließlich juristische Personalberatung — keine Generalisten' },
        { num: '02', title: 'Diskrete Retained Search', desc: 'Sensible Mandate mit höchstem Vertrauen behandelt' },
        { num: '03', title: 'Direkte Kandidatenansprache', desc: 'Zugang zu passiven Kandidaten, die nicht aktiv suchen' },
        { num: '04', title: 'Schnell ohne Kompromisse', desc: 'Gründliche Suche, abgestimmt auf jedes Führungsmandat' },
      ],
    },
    intro: {
      eyebrow: 'Über uns',
      title: 'Juristische Personalberatung seit 2007',
      text1: 'Wir sind ausschließlich im juristischen Sektor tätig — keine Ablenkungen durch andere Branchen. Seit fast zwei Jahrzehnten besetzen wir General Counsel, Heads of Legal, Partner und Senior-Juristen bei führenden Organisationen in Europa und dem Nahen Osten.',
      text2: 'Wir übernehmen weniger Mandate und liefern bessere Ergebnisse. Jede Suche wird diskret, zügig und mit dem Ziel durchgeführt, Kandidaten zu finden, die nachhaltig wirken.',
      cta: 'Kandidaten anfragen',
    },
    services: {
      eyebrow: 'Unsere Leistungen',
      title: 'Juristische Recruiting-Services',
      intro: 'Wir führen diskrete Suchmandate für Kanzleien und Rechtsabteilungen durch. Keine Jobbörsen, keine Massenbewerbungen — nur direkter Zugang zu herausragenden juristischen Talenten.',
      cta: 'Kandidaten anfragen',
      items: [
        { num: '01', title: 'Executive Search', desc: 'Retained Search für General Counsel, Chief Legal Officer, Head of Legal und Senior-In-house-Positionen.' },
        { num: '02', title: 'Retained Legal Recruitment', desc: 'Dedizierte Suche nach Partnern, Counsel, Senior Associates und Praxisgruppenleitern bei führenden Kanzleien.' },
        { num: '03', title: 'Marktanalyse', desc: 'Umfassendes Talent Mapping, Vergütungsbenchmarking und Wettbewerbsanalyse.' },
        { num: '04', title: 'Strategische Beratung', desc: 'Beratung zu Teamstrukturierung, Nachfolgeplanung und Organisationsdesign für Rechtsfunktionen.' },
      ],
    },
    geography: {
      eyebrow: 'Unsere Reichweite',
      title: 'Internationale Präsenz',
      desc: 'Von unseren Kernmärkten in Mitteleuropa haben wir ein umfangreiches Netzwerk aufgebaut, das wichtige Rechtsjurisdiktionen abdeckt. Unsere etablierten Beziehungen ermöglichen grenzüberschreitende Suchen mit lokaler Marktkenntnis.',
      regions: [
        { region: 'Mitteleuropa', countries: ['Tschechien', 'Slowakei', 'Österreich', 'Ungarn', 'Polen'] },
        { region: 'Westeuropa', countries: ['Deutschland', 'Vereinigtes Königreich', 'Niederlande'] },
        { region: 'Emerging Markets', countries: ['Rumänien', 'Türkei', 'VAE', 'Kroatien'] },
      ],
    },
    candidates: {
      eyebrow: 'Für Juristen',
      title: 'Diskrete Karrieremöglichkeiten',
      desc: 'Sie suchen Ihren nächsten Schritt? Wir arbeiten mit erfolgreichen Juristen, die Senior-Positionen anstreben. Alle Gespräche sind vertraulich — wir präsentieren nur Chancen, die zu Ihren Ambitionen passen.',
      cta: 'Möglichkeiten erkunden',
    },
    finalCta: {
      headline: 'Sie suchen juristische Verstärkung?',
      subheadline: 'Beschreiben Sie Ihren Bedarf — wir melden uns zeitnah.',
      ctaPrimary: 'Kandidaten anfragen',
      ctaSecondary: 'Bedarf besprechen',
    },
  },
  pl: {
    hero: {
      headline: 'Znajdź najlepszych prawników w Europie — szybko i poufnie',
      subheadline: 'Pomagamy kancelariom i firmom w rekrutacji prawników i liderów działów prawnych w Europie i na Bliskim Wschodzie.',
      trustLine1: '',
      trustLine2: '',
      ctaPrimary: 'Zamów kandydatów',
      ctaSecondary: 'Omów potrzeby rekrutacyjne',
    },
    trustBar: {
      items: ['Od 2007 roku', 'Europa i Bliski Wschód', 'Specjalizacja: sektor prawny', 'Poufna współpraca'],
    },
    process: {
      headline: 'Jak to działa',
      steps: [
        { num: '01', title: 'Określasz potrzeby', desc: 'Opisujesz stanowisko, wymagania i harmonogram' },
        { num: '02', title: 'Szukamy odpowiednich kandydatów', desc: 'Identyfikujemy i oceniamy najlepszych prawników' },
        { num: '03', title: 'Otrzymujesz shortlistę', desc: 'Poznajesz wyselekcjonowanych kandydatów gotowych na rozmowę' },
      ],
    },
    socialProof: {
      headline: 'Rekrutacja prawników, która działa',
      columns: [
        { title: 'Docieramy bezpośrednio', desc: 'Aktywnie docieramy do najlepszych kandydatów — nie polegamy na portalach pracy' },
        { title: 'Poufne projekty', desc: 'Realizujemy dyskretne procesy dla kancelarii i działów prawnych' },
        { title: 'Wyselekcjonowani kandydaci', desc: 'Dostarczamy starannie wybranych kandydatów, nie stosy CV' },
      ],
    },
    clients: {
      ctaPrimary: 'Zamów kandydatów',
      ctaSecondary: 'Poznaj nasze usługi dla klientów',
      corporate: {
        title: 'Działy prawne firm',
        desc: 'General Counsel, Head of Legal i seniorzy prawnicy, którzy dostarczają wyniki — nie tylko zarządzają ryzykiem.',
      },
      lawfirm: {
        title: 'Kancelarie prawne',
        desc: 'Rozwój praktyki przez lateralne zatrudnienia partnerów, transfery zespołów i strategiczną akwizycję talentów.',
      },
    },
    difference: {
      headline: 'Dlaczego B Solution',
      points: [
        { num: '01', title: 'Fokus na sektor prawny', desc: 'Wyłącznie rekrutacja prawnicza — bez rozpraszania się innymi branżami' },
        { num: '02', title: 'Dyskretny retained search', desc: 'Wrażliwe mandaty realizowane z najwyższym zaufaniem' },
        { num: '03', title: 'Bezpośrednie dotarcie', desc: 'Dostęp do pasywnych kandydatów, którzy nie szukają aktywnie' },
        { num: '04', title: 'Szybkość bez kompromisów', desc: 'Rzetelne poszukiwanie dopasowane do każdego mandatu' },
      ],
    },
    intro: {
      eyebrow: 'O nas',
      title: 'Specjaliści od rekrutacji prawniczej od 2007',
      text1: 'Działamy wyłącznie w sektorze prawnym — bez rozpraszania się innymi branżami. Od niemal dwóch dekad obsadzamy stanowiska General Counsel, Head of Legal, partnerów i seniorskich prawników w wiodących organizacjach w Europie i na Bliskim Wschodzie.',
      text2: 'Przyjmujemy mniej mandatów i dostarczamy lepsze wyniki. Każde wyszukiwanie prowadzimy dyskretnie, szybko i z zaangażowaniem w znalezienie kandydatów, którzy zrobią trwałą różnicę.',
      cta: 'Zamów kandydatów',
    },
    services: {
      eyebrow: 'Co robimy',
      title: 'Usługi rekrutacji prawniczej',
      intro: 'Realizujemy poufne projekty rekrutacyjne dla kancelarii i działów prawnych. Bez portali pracy, bez masowych aplikacji — tylko bezpośredni dostęp do wyjątkowych talentów prawniczych.',
      cta: 'Zamów kandydatów',
      items: [
        { num: '01', title: 'Executive Search', desc: 'Retained search dla pozycji General Counsel, Chief Legal Officer, Head of Legal i seniorskich pozycji in-house.' },
        { num: '02', title: 'Retained Legal Recruitment', desc: 'Dedykowane poszukiwania partnerów, counsel, senior prawników i liderów praktyk w wiodących kancelariach.' },
        { num: '03', title: 'Mapowanie rynku', desc: 'Kompleksowe mapowanie talentów, benchmarking wynagrodzeń i analiza konkurencji.' },
        { num: '04', title: 'Doradztwo strategiczne', desc: 'Konsultacje w zakresie strukturyzacji zespołów, planowania sukcesji i projektowania organizacyjnego funkcji prawnych.' },
      ],
    },
    geography: {
      eyebrow: 'Nasz zasięg',
      title: 'Międzynarodowa obecność',
      desc: 'Z naszych głównych rynków w Europie Środkowej zbudowaliśmy rozległą sieć obejmującą kluczowe jurysdykcje prawne. Nasze ugruntowane relacje umożliwiają transgraniczne poszukiwania ze znajomością lokalnego rynku.',
      regions: [
        { region: 'Europa Środkowa', countries: ['Czechy', 'Słowacja', 'Austria', 'Węgry', 'Polska'] },
        { region: 'Europa Zachodnia', countries: ['Niemcy', 'Wielka Brytania', 'Holandia'] },
        { region: 'Rynki wschodzące', countries: ['Rumunia', 'Turcja', 'ZEA', 'Chorwacja'] },
      ],
    },
    candidates: {
      eyebrow: 'Dla prawników',
      title: 'Poufne możliwości kariery',
      desc: 'Szukasz kolejnego kroku? Współpracujemy z doświadczonymi prawnikami poszukującymi stanowisk seniorskich. Wszystkie rozmowy są poufne — przedstawiamy tylko oferty dopasowane do Twoich ambicji.',
      cta: 'Poznaj możliwości',
    },
    finalCta: {
      headline: 'Szukasz prawnika?',
      subheadline: 'Opisz swoje potrzeby — skontaktujemy się z Tobą.',
      ctaPrimary: 'Zamów kandydatów',
      ctaSecondary: 'Omów potrzeby',
    },
  },
}

// Navigation translations per language
const navContent = {
  en: {
    services: 'Services',
    clients: 'For Clients',
    candidates: 'For Candidates',
    positions: 'Positions',
    about: 'About',
    contact: 'Contact',
    cta: 'Get in Touch',
  },
  cs: {
    services: 'Služby',
    clients: 'Pro klienty',
    candidates: 'Pro kandidáty',
    positions: 'Pozice',
    about: 'O nás',
    contact: 'Kontakt',
    cta: 'Kontaktujte nás',
  },
  de: {
    services: 'Leistungen',
    clients: 'Für Mandanten',
    candidates: 'Für Kandidaten',
    positions: 'Positionen',
    about: 'Über uns',
    contact: 'Kontakt',
    cta: 'Kontakt aufnehmen',
  },
  pl: {
    services: 'Usługi',
    clients: 'Dla klientów',
    candidates: 'Dla kandydatów',
    positions: 'Pozycje',
    about: 'O nas',
    contact: 'Kontakt',
    cta: 'Skontaktuj się',
  },
}

interface HomepageProps {
  lang: Lang
}

export function Homepage({ lang }: HomepageProps) {
  const c = content[lang]
  const nav = navContent[lang]
  const langPrefix = lang === 'en' ? '' : `/${lang}`
  
  return (
    <>
      <HeaderLocalized lang={lang} nav={nav} langPrefix={langPrefix} />
      <main id="main-content">
        <HeroSection content={c.hero} langPrefix={langPrefix} />
        {c.trustBar && <TrustBar items={c.trustBar.items} />}
        <SocialProofSection content={c.socialProof} />
        <AuthorityProof locale={lang} />
        {c.process && <ProcessSection content={c.process} />}
        <ClientsSection content={c.clients} langPrefix={langPrefix} />
        <DifferenceSection content={c.difference} />
        {lang === 'en' && 'industries' in c && <IndustriesSection content={c.industries} />}
        <IntroSection content={c.intro} langPrefix={langPrefix} />
        <ServicesSection content={c.services} langPrefix={langPrefix} />
        <GeographySection content={c.geography} />
        <CandidatesSection content={c.candidates} langPrefix={langPrefix} />
        <FinalCTA content={c.finalCta} langPrefix={langPrefix} />
      </main>
      <FooterLocalized lang={lang} langPrefix={langPrefix} />
    </>
  )
}

// Localized Header with language routes
function HeaderLocalized({ lang, nav, langPrefix }: { lang: Lang, nav: typeof navContent.en, langPrefix: string }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 10)
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: `${langPrefix}/services`, label: nav.services },
    { href: `${langPrefix}/clients`, label: nav.clients },
    { href: `${langPrefix}/candidates`, label: nav.candidates },
    { href: `${langPrefix}/positions`, label: nav.positions },
    { href: `${langPrefix}/about`, label: nav.about },
  ]

  const langRoutes = [
    { code: 'en', label: 'En', href: '/' },
    { code: 'cs', label: 'Cz', href: '/cs' },
    { code: 'de', label: 'De', href: '/de' },
    { code: 'pl', label: 'Pl', href: '/pl' },
  ]

  const langRoutesFull = [
    { code: 'en', label: 'English', href: '/' },
    { code: 'cs', label: 'Čeština', href: '/cs' },
    { code: 'de', label: 'Deutsch', href: '/de' },
    { code: 'pl', label: 'Polski', href: '/pl' },
  ]

  return (
    <>
      <a
        href="#main-content"
        className="pointer-events-none fixed left-4 top-4 z-[60] -translate-y-24 opacity-0 focus-visible:pointer-events-auto focus-visible:translate-y-0 focus-visible:opacity-100 focus-visible:px-4 focus-visible:py-2 focus-visible:bg-gold focus-visible:text-navy focus-visible:text-sm focus-visible:font-medium"
      >
        Skip to main content
      </a>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-navy/98 backdrop-blur-md" : "bg-transparent"}`}>
      <div className="h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      
      <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
        <div className="flex items-center justify-between min-h-[72px] lg:min-h-[88px] py-4 lg:py-5">
          <Link href={langPrefix || '/'} aria-label={lang === 'en' ? 'BSolution homepage' : lang === 'cs' ? 'Domovská stránka BSolution' : lang === 'de' ? 'BSolution Startseite' : 'Strona główna BSolution'} className="flex items-center flex-shrink-0">
            <span className="text-[14px] lg:text-[15px] font-serif text-gold tracking-[0.06em]">B Solution</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-10 xl:gap-14" aria-label="Main navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href || '/'}
                className="relative text-[10px] font-normal text-white/40 hover:text-white/80 transition-colors uppercase tracking-[0.16em] py-2"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-10">
            <div className="flex items-center text-[9px] font-normal tracking-[0.16em] uppercase">
              {langRoutes.map((l, i) => (
                <span key={l.code} className="flex items-center">
                  {i > 0 && <span className="text-white/10 mx-1" aria-hidden="true">/</span>}
                  <Link
                    href={l.href}
                    aria-label={`Switch to ${l.label}`}
                    className={`px-1 py-1 transition-colors ${lang === l.code ? "text-gold/90" : "text-white/30 hover:text-white/50"}`}
                  >
                    {l.label}
                  </Link>
                </span>
              ))}
            </div>

            <Link 
              href={`${langPrefix}/contact`}
              className="text-[9px] font-medium text-navy bg-gold/90 hover:bg-gold px-6 py-3 transition-colors uppercase tracking-[0.16em]"
            >
              {nav.cta}
            </Link>
          </div>

          <button
            className="lg:hidden p-2 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <span className="text-xl">✕</span> : <span className="text-xl">☰</span>}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-navy border-t border-white/5">
          <div className="px-8 py-10">
            <nav className="space-y-1" aria-label="Mobile navigation">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href || '/'}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-4 text-[14px] uppercase tracking-[0.1em] text-white/70 hover:text-gold transition-colors border-b border-white/5"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href={`${langPrefix}/contact`}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-4 text-[14px] uppercase tracking-[0.1em] text-white/70 hover:text-gold transition-colors border-b border-white/5"
              >
                {nav.contact}
              </Link>
            </nav>
            
            <div className="flex flex-wrap items-center gap-6 pt-10">
              {langRoutesFull.map((l) => (
                <Link
                  key={l.code}
                  href={l.href}
                  className={`text-[12px] font-medium uppercase tracking-[0.12em] transition-colors ${lang === l.code ? "text-gold" : "text-white/40"}`}
                >
                  {l.label}
                </Link>
              ))}
            </div>

            <Link 
              href={`${langPrefix}/contact`}
              onClick={() => setMobileMenuOpen(false)}
              className="block mt-10 text-center text-[11px] font-semibold text-navy bg-gold px-6 py-4 uppercase tracking-[0.12em]"
            >
              {nav.cta}
            </Link>
          </div>
        </div>
      )}
      </header>
    </>
  )
}

// Localized Footer
function FooterLocalized({ lang, langPrefix }: { lang: Lang, langPrefix: string }) {
  const footerContent = {
    en: {
      tagline: 'Legal executive search and advisory across Europe and the Middle East.',
      company: 'Company',
      services: 'Services',
      connect: 'Connect',
      privacy: 'Privacy',
      cookies: 'Cookies',
      copyright: '© 2007–2026 B Solution. All rights reserved.',
    },
    cs: {
      tagline: 'Legal executive search a poradenství v Evropě a na Blízkém východě.',
      company: 'Společnost',
      services: 'Služby',
      connect: 'Kontakt',
      privacy: 'Soukromí',
      cookies: 'Cookies',
      copyright: '© 2007–2026 B Solution. Všechna práva vyhrazena.',
    },
    de: {
      tagline: 'Legal Executive Search und Beratung in Europa und dem Nahen Osten.',
      company: 'Unternehmen',
      services: 'Leistungen',
      connect: 'Kontakt',
      privacy: 'Datenschutz',
      cookies: 'Cookies',
      copyright: '© 2007–2026 B Solution. Alle Rechte vorbehalten.',
    },
    pl: {
      tagline: 'Legal executive search i doradztwo w Europie i na Bliskim Wschodzie.',
      company: 'Firma',
      services: 'Usługi',
      connect: 'Kontakt',
      privacy: 'Prywatność',
      cookies: 'Cookies',
      copyright: '© 2007–2026 B Solution. Wszelkie prawa zastrzeżone.',
    },
  }

  const f = footerContent[lang]

  return (
    <footer className="bg-navy-deep pt-20 pb-10">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
        <div className="flex justify-center mb-16">
          <div className="w-12 h-px bg-gold/20" />
        </div>
        
        <div className="grid md:grid-cols-4 gap-12 lg:gap-16 mb-16">
          <div className="md:col-span-2">
            <Link href={langPrefix || '/'} className="inline-block mb-6">
              <span className="text-[18px] font-serif text-gold tracking-[0.04em]">B Solution</span>
            </Link>
            <p className="text-white/30 text-[14px] leading-[1.8] max-w-sm">
              {f.tagline}
            </p>
          </div>
          
          <div>
            <p className="text-white/50 text-[10px] font-semibold uppercase tracking-[0.2em] mb-6">{f.company}</p>
            <nav className="space-y-4">
              <Link href={`${langPrefix}/about`} className="block text-white/40 hover:text-white/70 text-[14px] transition-colors">About</Link>
              <Link href={`${langPrefix}/clients`} className="block text-white/40 hover:text-white/70 text-[14px] transition-colors">Clients</Link>
              <Link href={`${langPrefix}/candidates`} className="block text-white/40 hover:text-white/70 text-[14px] transition-colors">Candidates</Link>
            </nav>
          </div>
          
          <div>
            <p className="text-white/50 text-[10px] font-semibold uppercase tracking-[0.2em] mb-6">{f.connect}</p>
            <nav className="space-y-4">
              <Link href={`${langPrefix}/contact`} className="block text-white/40 hover:text-white/70 text-[14px] transition-colors">Contact</Link>
              <a href="https://linkedin.com/company/bsolution" target="_blank" rel="noopener noreferrer" className="block text-white/40 hover:text-white/70 text-[14px] transition-colors">LinkedIn</a>
            </nav>
          </div>
        </div>
        
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/20 text-[12px]">{f.copyright}</p>
          <div className="flex items-center gap-8">
            <Link href={legalPath(lang, '/privacy')} className="text-white/20 hover:text-white/40 text-[12px] transition-colors">{f.privacy}</Link>
            <Link href={legalPath(lang, '/cookies')} className="text-white/20 hover:text-white/40 text-[12px] transition-colors">{f.cookies}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Individual section components
function HeroSection({ content: c, langPrefix }: { content: typeof content.en.hero, langPrefix: string }) {
  return (
    <section className="relative min-h-[100svh] pt-[73px] lg:pt-[89px] flex flex-col overflow-hidden">
      {/* Mobile hero - simplified solid background */}
      <div className="absolute inset-0 bg-navy md:hidden">
        {/* Logo hidden on mobile as per requirements */}
      </div>
      
      {/* Desktop hero */}
      <Image 
        src="/images/hero-background.png" 
        alt="" 
        fill 
        className="object-cover hidden md:block" 
        style={{ objectPosition: 'center calc(50% + 40px)', willChange: 'auto' }} 
        priority 
        sizes="(max-width: 768px) 1px, 100vw"
        loading="eager"
        fetchPriority="high"
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent z-10 hidden md:block" />
      
      <div className="flex-1" />
      
      <div className="relative w-full z-20 pb-16 lg:pb-24">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
          <div className="max-w-lg translate-y-[60px]">
            <h1 className="text-white font-serif text-[clamp(1.25rem,2.5vw,1.5rem)] font-normal leading-[1.3] tracking-[-0.01em]">
              {c.headline}
            </h1>
            
            <p className="mt-6 text-[16px] lg:text-[18px] text-white/80 leading-[1.75] font-light">
              {c.subheadline}
            </p>
            
            <div className="mt-10 lg:mt-12 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <Link href={`${langPrefix}/contact`} className="inline-flex items-center justify-center px-10 py-4 bg-gold hover:bg-gold-light text-navy text-[10px] font-semibold uppercase tracking-[0.12em] transition-colors">
                {c.ctaPrimary}
                <ArrowRight className="ml-3 h-4 w-4" />
              </Link>
              <Link href={`${langPrefix}/services`} className="inline-flex items-center text-white/60 hover:text-white/80 text-[11px] font-medium tracking-[0.08em] transition-colors">
                {c.ctaSecondary}
                <ArrowRight className="ml-2 h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 right-8 lg:right-20 hidden lg:flex flex-col items-center gap-3 z-20">
        <span className="text-[8px] text-white/40 uppercase tracking-[0.4em]">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>
  )
}

function TrustBar({ items }: { items: string[] }) {
  return (
    <section className="bg-navy border-t border-white/5">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-20 py-6">
        <div className="flex flex-wrap justify-center gap-6 md:gap-12 lg:gap-16">
          {items.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 bg-gold/60 rounded-full" />
              <span className="text-white/50 text-[11px] lg:text-[12px] uppercase tracking-[0.12em] font-medium">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function SocialProofSection({ content: c }: { content: typeof content.en.socialProof }) {
  return (
    <section className="bg-white py-24 md:py-32 lg:py-40" aria-labelledby="social-proof-heading">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
        <div className="text-center mb-16 lg:mb-20">
          <div className="flex justify-center mb-10" aria-hidden="true">
            <div className="w-16 h-px bg-gold/40" />
          </div>
          <h2 id="social-proof-heading" className="text-navy text-[clamp(1.75rem,3.5vw,2.5rem)] font-serif leading-[1.2]">{c.headline}</h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
          {c.columns.map((col, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-6">
                <div className="w-10 h-10 flex items-center justify-center border border-gold/30">
                  <span className="text-gold text-[14px] font-serif">{String(index + 1).padStart(2, '0')}</span>
                </div>
              </div>
              <h3 className="text-navy text-[18px] lg:text-[20px] font-serif mb-4">{col.title}</h3>
              <p className="text-gray-500 text-[15px] leading-[1.7]">{col.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProcessSection({ content: c }: { content: typeof content.en.process }) {
  return (
    <section className="bg-cream py-24 md:py-32 lg:py-40" aria-labelledby="process-heading">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
        <div className="text-center mb-16 lg:mb-20">
          <div className="flex justify-center mb-10" aria-hidden="true">
            <div className="w-16 h-px bg-gold/40" />
          </div>
          <h2 id="process-heading" className="text-navy text-[clamp(1.75rem,3.5vw,2.5rem)] font-serif leading-[1.2]">{c.headline}</h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-10 lg:gap-16">
          {c.steps.map((step, index) => (
            <div key={index} className="text-center relative">
              <div className="flex justify-center mb-6">
                <div className="w-14 h-14 flex items-center justify-center bg-navy">
                  <span className="text-gold text-[16px] font-serif">{step.num}</span>
                </div>
              </div>
              <h3 className="text-navy text-[18px] lg:text-[20px] font-serif mb-4">{step.title}</h3>
              <p className="text-gray-500 text-[15px] leading-[1.7]">{step.desc}</p>
              {index < c.steps.length - 1 && (
                <div className="hidden md:block absolute top-7 left-[60%] w-[80%] h-px bg-gold/20" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function IndustriesSection({ content: c }: { content: typeof content.en.industries }) {
  return (
    <section className="bg-white py-20 md:py-24 border-t border-gray-100">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <h2 className="text-navy text-[18px] lg:text-[20px] font-serif">{c.headline}</h2>
          <div className="flex flex-wrap gap-4 md:gap-6">
            {c.items.map((item, index) => (
              <span key={index} className="text-gray-500 text-[13px] lg:text-[14px] border border-gray-200 px-4 py-2">{item}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ClientsSection({ content: c, langPrefix }: { content: typeof content.en.clients, langPrefix: string }) {
  return (
    <section className="bg-navy py-28 md:py-36 lg:py-48 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[50%] h-[50%]" style={{ background: 'radial-gradient(ellipse at top right, rgba(176, 141, 87, 0.06) 0%, transparent 60%)' }} />
      
      <div className="max-w-[1440px] mx-auto px-8 lg:px-20 relative">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          <div className="bg-navy-light p-10 lg:p-14 border border-white/5">
            <h3 className="text-white text-[24px] lg:text-[28px] font-serif mb-6">{c.corporate.title}</h3>
            <p className="text-white/50 text-[16px] leading-[1.8] mb-10">{c.corporate.desc}</p>
            <Link href={`${langPrefix}/contact`} className="inline-flex items-center justify-center px-8 py-3.5 bg-gold hover:bg-gold-light text-navy text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors">
              {c.ctaPrimary}
              <ArrowRight className="ml-2.5 h-3.5 w-3.5" />
            </Link>
          </div>
          
          <div className="bg-white/[0.03] p-10 lg:p-14 border border-white/5">
            <h3 className="text-white text-[24px] lg:text-[28px] font-serif mb-6">{c.lawfirm.title}</h3>
            <p className="text-white/50 text-[16px] leading-[1.8] mb-10">{c.lawfirm.desc}</p>
            <Link href={`${langPrefix}/contact`} className="inline-flex items-center justify-center px-8 py-3.5 border border-white/20 text-white/80 hover:border-white/40 hover:text-white text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors">
              {c.ctaSecondary}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function DifferenceSection({ content: c }: { content: typeof content.en.difference }) {
  return (
    <section className="bg-cream py-28 md:py-36 lg:py-48" aria-labelledby="difference-heading">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
        <div className="text-center mb-20 lg:mb-28">
          <div className="flex justify-center mb-10" aria-hidden="true">
            <div className="w-16 h-px bg-gold/40" />
          </div>
          <h2 id="difference-heading" className="text-navy text-[clamp(2rem,4vw,3rem)] font-serif leading-[1.15] max-w-2xl mx-auto">{c.headline}</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-10 lg:gap-12">
          {c.points.map((point, index) => (
            <div key={index} className="bg-white p-10 lg:p-14 border border-gray-100 group hover:border-gold/20 transition-colors">
              <div className="flex items-start gap-8">
                <span className="text-gold/40 text-[11px] font-semibold tracking-[0.2em] pt-1">{point.num}</span>
                <div>
                  <h4 className="text-navy text-[20px] lg:text-[22px] font-serif mb-5 group-hover:text-gold transition-colors">{point.title}</h4>
                  <p className="text-gray-500 text-[15px] leading-[1.8]">{point.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function IntroSection({ content: c, langPrefix }: { content: typeof content.en.intro, langPrefix: string }) {
  return (
    <section className="bg-cream py-28 md:py-36 lg:py-44" aria-labelledby="intro-heading">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
        <div className="flex items-center justify-center mb-20 lg:mb-28" aria-hidden="true">
          <div className="w-16 h-px bg-gold/40" />
        </div>
        
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-20">
          <div className="lg:col-span-5">
            <p className="text-[11px] font-semibold text-gold uppercase tracking-[0.25em] mb-8">{c.eyebrow}</p>
            <h2 id="intro-heading" className="text-navy text-[clamp(2rem,4vw,3rem)] font-serif leading-[1.15]">{c.title}</h2>
          </div>
          
          <div className="lg:col-span-7">
            <p className="text-gray-600 text-[18px] lg:text-[19px] leading-[1.9]">{c.text1}</p>
            <p className="mt-10 text-gray-600 text-[18px] lg:text-[19px] leading-[1.9]">{c.text2}</p>
            <Link href={`${langPrefix}/contact`} className="inline-flex items-center justify-center px-10 py-4 bg-gold hover:bg-gold-light text-navy text-[12px] font-semibold uppercase tracking-[0.12em] transition-colors mt-14">
              {c.cta}
              <ArrowRight className="ml-3 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function ServicesSection({ content: c, langPrefix }: { content: typeof content.en.services, langPrefix: string }) {
  return (
    <section className="bg-white py-28 md:py-36 lg:py-48" aria-labelledby="services-heading">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
        <div className="flex items-center justify-center mb-20 lg:mb-28" aria-hidden="true">
          <div className="w-16 h-px bg-gold/40" />
        </div>
        
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-20">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-40">
              <p className="text-[11px] font-semibold text-gold uppercase tracking-[0.25em] mb-8">{c.eyebrow}</p>
              <h2 id="services-heading" className="text-navy text-[clamp(2rem,4vw,3rem)] font-serif leading-[1.15]">{c.title}</h2>
              <p className="mt-10 text-gray-500 text-[17px] leading-[1.85]">{c.intro}</p>
              <Link href={`${langPrefix}/contact`} className="inline-flex items-center justify-center px-10 py-4 bg-gold hover:bg-gold-light text-navy text-[12px] font-semibold uppercase tracking-[0.12em] transition-colors mt-14">
                {c.cta}
                <ArrowRight className="ml-3 h-4 w-4" />
              </Link>
            </div>
          </div>
          
          <div className="lg:col-span-7">
            <div className="border-t border-gray-200">
              {c.items.map((service, index) => (
                <div key={index} className="py-14 lg:py-16 border-b border-gray-200 group cursor-pointer">
                  <div className="flex gap-6 lg:gap-10">
                    <span className="text-gold/50 text-[12px] font-semibold tracking-[0.15em] pt-2 w-8 flex-shrink-0">{service.num}</span>
                    <div className="flex-1">
                      <h3 className="text-navy text-[22px] lg:text-[28px] font-serif group-hover:text-gold transition-colors">{service.title}</h3>
                      <p className="mt-6 text-gray-500 text-[16px] leading-[1.85]">{service.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function GeographySection({ content: c }: { content: typeof content.en.geography }) {
  return (
    <section className="bg-navy py-28 md:py-36 lg:py-48 relative overflow-hidden" aria-labelledby="geography-heading">
      <div className="absolute bottom-0 left-0 w-[40%] h-[40%]" style={{ background: 'radial-gradient(ellipse at bottom left, rgba(176, 141, 87, 0.05) 0%, transparent 60%)' }} aria-hidden="true" />
      
      <div className="max-w-[1440px] mx-auto px-8 lg:px-20 relative">
        <div className="flex items-center justify-center mb-20 lg:mb-28" aria-hidden="true">
          <div className="w-16 h-px bg-gold/30" />
        </div>
        
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-start">
          <div>
            <p className="text-[11px] font-semibold text-gold/80 uppercase tracking-[0.25em] mb-8">{c.eyebrow}</p>
            <h2 id="geography-heading" className="text-white text-[clamp(2rem,4vw,3rem)] font-serif leading-[1.15]">{c.title}</h2>
            <p className="mt-10 text-white/40 text-[18px] leading-[1.85]">{c.desc}</p>
          </div>
          
          <div className="space-y-14">
            {c.regions.map((region, index) => (
              <div key={index}>
                <p className="text-white/50 text-[11px] font-semibold uppercase tracking-[0.2em] mb-6">{region.region}</p>
                <div className="flex flex-wrap gap-3">
                  {region.countries.map((country) => (
                    <span key={country} className="flex items-center gap-2.5 px-5 py-3 bg-white/[0.03] text-white/60 text-[14px] border border-white/5 hover:border-gold/30 hover:text-white/80 transition-colors">
                      <MapPin className="h-3.5 w-3.5 text-gold/60" strokeWidth={1.25} />
                      {country}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function CandidatesSection({ content: c, langPrefix }: { content: typeof content.en.candidates, langPrefix: string }) {
  return (
    <section className="bg-cream py-28 md:py-36 lg:py-48" aria-labelledby="candidates-heading">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[11px] font-semibold text-gold uppercase tracking-[0.25em] mb-8">{c.eyebrow}</p>
          <h2 id="candidates-heading" className="text-navy text-[clamp(2rem,4vw,3rem)] font-serif leading-[1.15]">{c.title}</h2>
          <p className="mt-10 text-gray-600 text-[18px] lg:text-[19px] leading-[1.85]">{c.desc}</p>
          <Link href={`${langPrefix}/contact`} className="inline-flex items-center justify-center px-10 py-4 bg-gold hover:bg-gold-light text-navy text-[12px] font-semibold uppercase tracking-[0.12em] transition-colors mt-14">
            {c.cta}
            <ArrowRight className="ml-3 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

function FinalCTA({ content: c, langPrefix }: { content: typeof content.en.finalCta, langPrefix: string }) {
  return (
    <section className="bg-navy py-28 md:py-36 lg:py-44 relative overflow-hidden" aria-labelledby="cta-heading">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%]" style={{ background: 'radial-gradient(ellipse at center, rgba(176, 141, 87, 0.04) 0%, transparent 60%)' }} aria-hidden="true" />
      
      <div className="max-w-[1440px] mx-auto px-8 lg:px-20 relative">
        <div className="flex items-center justify-center mb-16 lg:mb-20" aria-hidden="true">
          <div className="w-16 h-px bg-gold/30" />
        </div>
        
        <div className="max-w-2xl mx-auto text-center">
          <h2 id="cta-heading" className="text-white text-[clamp(2rem,4vw,3rem)] font-serif leading-[1.15]">{c.headline}</h2>
          <p className="mt-8 text-white/50 text-[18px] leading-[1.85]">{c.subheadline}</p>
          <div className="mt-12 flex flex-col sm:flex-row gap-5 justify-center">
            <Link href={`${langPrefix}/contact`} className="inline-flex items-center justify-center px-10 py-4 bg-gold hover:bg-gold-light text-navy text-[12px] font-semibold uppercase tracking-[0.12em] transition-colors">
              {c.ctaPrimary}
              <ArrowRight className="ml-3 h-4 w-4" />
            </Link>
            <Link href={`${langPrefix}/contact`} className="inline-flex items-center justify-center px-10 py-4 border border-white/20 text-white/85 hover:border-white/40 hover:text-white text-[12px] font-semibold uppercase tracking-[0.12em] transition-colors">
              {c.ctaSecondary}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
