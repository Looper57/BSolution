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
        metaTitle: 'Executive Search für Finanzdienstleistungen',
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
        metaTitle: 'Executive search pro technologické firmy',
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
        metaTitle: 'Executive Search für Technologieunternehmen',
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
        metaTitle: 'Executive search dla firm technologicznych',
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
  {
    kind: 'industry',
    slug: 'pharma-life-sciences',
    basePath: '/industries/pharma-life-sciences',
    complete: true,
    related: {
      services: ['legal-executive-search'],
      practices: ['general-counsel', 'compliance-officer'],
    },
    content: {
      en: {
        title: 'Pharma & Life Sciences',
        summary:
          'In-house lawyers and legal leaders for pharmaceutical groups and generics manufacturers in Central Europe, Switzerland and Turkey.',
        metaTitle: 'Legal Recruitment for Pharma & Life Sciences',
        metaDescription:
          'Search for in-house lawyers in pharma: Senior Legal Counsel and Legal Director roles in Czechia, Hungary, Poland, Switzerland and Turkey.',
        faq: [
          { question: 'Does B Solution recruit in-house lawyers for pharmaceutical companies?', answer: 'Yes. B Solution searches for in-house lawyers for global pharmaceutical groups and generics manufacturers, from Senior Legal Counsel to Legal Director and other leadership roles in the legal team.' },
          { question: 'In which countries does B Solution recruit pharma lawyers?', answer: 'B Solution has recruited lawyers for pharmaceutical companies in the Czech Republic, Hungary, Poland, Switzerland and Turkey, and runs searches across Europe and beyond for regional and EMEA roles.' },
          { question: 'Which pharma legal roles does B Solution fill?', answer: 'Mainly Senior Legal Counsel and Legal Director positions, including lawyers who cover several countries or a whole region and lawyers who lead or build the local legal team.' },
          { question: 'Why use a specialised legal recruiter for a pharma role?', answer: 'Pharma legal work combines commercial contracts with regulated areas such as marketing and promotion rules, interactions with healthcare professionals, data protection and compliance. A recruiter who searches only for lawyers can test that experience before a candidate reaches the client.' },
          { question: 'Do candidates who come to B Solution pay anything?', answer: 'No. The search is paid by the company that hires; candidates never pay.' },
        ],
        sections: [
          {
            heading: 'What a pharma legal team needs',
            paragraphs: [
              'A pharmaceutical company in Central Europe needs lawyers who can close commercial agreements quickly and at the same time keep the business within strict rules on promotion, pricing and reimbursement, clinical activity, interactions with doctors and pharmacies, and personal data. In a regional or EMEA role the same lawyer often supports several countries with different regulators.',
              'B Solution looks for lawyers who have done this work inside a pharmaceutical company or for one, and who are trusted by the country manager, the regional legal team and compliance.',
            ],
          },
          {
            heading: 'Roles we fill',
            paragraphs: ['Typical mandates in pharma and life sciences:'],
            bullets: [
              'Senior Legal Counsel for a country or a group of countries',
              'Legal Director leading the local or regional legal team',
              'Lawyers combining legal and compliance responsibilities',
              'Roles that require the local language together with English',
            ],
          },
          {
            heading: 'Where we have recruited',
            paragraphs: [
              'Our pharma searches have covered the Czech Republic, Hungary, Poland, Switzerland and Turkey, for global pharmaceutical groups and for generics manufacturers. We keep client names confidential, as executive search requires.',
            ],
          },
        ],
      },
      cs: {
        title: 'Farmacie a life sciences',
        summary:
          'Interní právníci a vedoucí právních týmů pro farmaceutické skupiny a výrobce generik ve střední Evropě, ve Švýcarsku a v Turecku.',
        metaTitle: 'Nábor právníků pro farmacii a life sciences',
        metaDescription:
          'Vyhledávání interních právníků ve farmacii: pozice Senior Legal Counsel a Legal Director v Česku, Maďarsku, Polsku, Švýcarsku a Turecku.',
        faq: [
          { question: 'Hledá B Solution interní právníky pro farmaceutické firmy?', answer: 'Ano. B Solution vyhledává interní právníky pro globální farmaceutické skupiny a výrobce generik, od pozice Senior Legal Counsel po Legal Director a další vedoucí role v právním týmu.' },
          { question: 'Ve kterých zemích B Solution hledá právníky pro farmacii?', answer: 'B Solution hledala právníky pro farmaceutické firmy v Česku, Maďarsku, Polsku, Švýcarsku a Turecku a vede hledání po celé Evropě i mimo ni pro regionální a EMEA role.' },
          { question: 'Jaké právní pozice ve farmacii B Solution obsazuje?', answer: 'Hlavně pozice Senior Legal Counsel a Legal Director, včetně právníků, kteří pokrývají více zemí nebo celý region, a právníků, kteří vedou nebo budují místní právní tým.' },
          { question: 'Proč hledat právníka do farmacie přes specializovanou agenturu?', answer: 'Právní práce ve farmacii spojuje obchodní smlouvy s regulovanými oblastmi, jako jsou pravidla reklamy, spolupráce se zdravotníky, ochrana osobních údajů a compliance. Agentura, která hledá jen právníky, tuto zkušenost ověří dřív, než se kandidát dostane ke klientovi.' },
          { question: 'Platí kandidát, který se na B Solution obrátí, něco?', answer: 'Ne. Hledání platí firma, která kandidáta přijme; kandidáti nikdy neplatí.' },
        ],
        sections: [
          {
            heading: 'Co potřebuje právní tým ve farmacii',
            paragraphs: [
              'Farmaceutická firma ve střední Evropě potřebuje právníky, kteří rychle uzavřou obchodní smlouvy a zároveň udrží firmu v přísných pravidlech pro reklamu, ceny a úhrady, klinické aktivity, spolupráci s lékaři a lékárnami a pro osobní údaje. V regionální nebo EMEA roli často tentýž právník podporuje několik zemí s různými regulátory.',
              'B Solution hledá právníky, kteří tuto práci dělali uvnitř farmaceutické firmy nebo pro ni, a kterým důvěřuje vedení země, regionální právní tým i compliance.',
            ],
          },
          {
            heading: 'Pozice, které obsazujeme',
            paragraphs: ['Typické mandáty ve farmacii a life sciences:'],
            bullets: [
              'Senior Legal Counsel pro jednu zemi nebo skupinu zemí',
              'Legal Director, který vede místní nebo regionální právní tým',
              'Právníci, kteří spojují právní a compliance odpovědnost',
              'Pozice, které vyžadují místní jazyk spolu s angličtinou',
            ],
          },
          {
            heading: 'Kde jsme hledali',
            paragraphs: [
              'Naše hledání ve farmacii pokryla Česko, Maďarsko, Polsko, Švýcarsko a Turecko, pro globální farmaceutické skupiny i pro výrobce generik. Jména klientů držíme v důvěrnosti, jak executive search vyžaduje.',
            ],
          },
        ],
      },
      de: {
        title: 'Pharma & Life Sciences',
        summary:
          'Syndikusjuristen und juristische Führungskräfte für Pharmakonzerne und Generikahersteller in Mitteleuropa, der Schweiz und der Türkei.',
        metaTitle: 'Juristen-Recruiting für Pharma & Life Sciences',
        metaDescription:
          'Suche nach Inhouse-Juristen in der Pharmaindustrie: Senior Legal Counsel und Legal Director in Tschechien, Ungarn, Polen, der Schweiz und der Türkei.',
        faq: [
          { question: 'Sucht B Solution Inhouse-Juristen für Pharmaunternehmen?', answer: 'Ja. B Solution sucht Inhouse-Juristen für globale Pharmakonzerne und Generikahersteller, vom Senior Legal Counsel bis zum Legal Director und weiteren Führungsrollen im Rechtsteam.' },
          { question: 'In welchen Ländern sucht B Solution Pharmajuristen?', answer: 'B Solution hat Juristen für Pharmaunternehmen in Tschechien, Ungarn, Polen, der Schweiz und der Türkei gesucht und führt Suchen in ganz Europa und darüber hinaus für regionale und EMEA-Rollen.' },
          { question: 'Welche juristischen Pharmapositionen besetzt B Solution?', answer: 'Vor allem Senior Legal Counsel und Legal Director, darunter Juristen, die mehrere Länder oder eine ganze Region betreuen, und Juristen, die das lokale Rechtsteam leiten oder aufbauen.' },
          { question: 'Warum einen spezialisierten Juristen-Recruiter für eine Pharmaposition?', answer: 'Juristische Arbeit in der Pharmaindustrie verbindet Handelsverträge mit regulierten Bereichen wie Werberecht, Zusammenarbeit mit Fachkreisen, Datenschutz und Compliance. Ein Recruiter, der nur Juristen sucht, prüft diese Erfahrung, bevor ein Kandidat den Kunden erreicht.' },
          { question: 'Zahlen Kandidaten, die sich an B Solution wenden, etwas?', answer: 'Nein. Die Suche bezahlt das Unternehmen, das einstellt; Kandidaten zahlen nie.' },
        ],
        sections: [
          {
            heading: 'Was ein Pharma-Rechtsteam braucht',
            paragraphs: [
              'Ein Pharmaunternehmen in Mitteleuropa braucht Juristen, die Handelsverträge schnell abschließen und das Geschäft zugleich innerhalb strenger Regeln zu Werbung, Preisen und Erstattung, klinischen Aktivitäten, der Zusammenarbeit mit Ärzten und Apotheken und zum Datenschutz halten. In einer regionalen oder EMEA-Rolle betreut derselbe Jurist oft mehrere Länder mit unterschiedlichen Behörden.',
              'B Solution sucht Juristen, die diese Arbeit in einem Pharmaunternehmen oder für eines geleistet haben und denen Geschäftsleitung, regionales Rechtsteam und Compliance vertrauen.',
            ],
          },
          {
            heading: 'Positionen, die wir besetzen',
            paragraphs: ['Typische Mandate in Pharma und Life Sciences:'],
            bullets: [
              'Senior Legal Counsel für ein Land oder eine Ländergruppe',
              'Legal Director, der das lokale oder regionale Rechtsteam führt',
              'Juristen mit kombinierter Rechts- und Compliance-Verantwortung',
              'Positionen, die die Landessprache neben Englisch erfordern',
            ],
          },
          {
            heading: 'Wo wir gesucht haben',
            paragraphs: [
              'Unsere Pharmasuchen umfassten Tschechien, Ungarn, Polen, die Schweiz und die Türkei, für globale Pharmakonzerne und für Generikahersteller. Kundennamen behandeln wir vertraulich, wie es Executive Search verlangt.',
            ],
          },
        ],
      },
      pl: {
        title: 'Farmacja i life sciences',
        summary:
          'Prawnicy wewnętrzni i liderzy zespołów prawnych dla grup farmaceutycznych i producentów leków generycznych w Europie Środkowej, Szwajcarii i Turcji.',
        metaTitle: 'Rekrutacja prawników dla farmacji i life sciences',
        metaDescription:
          'Rekrutacja prawników wewnętrznych w farmacji: stanowiska Senior Legal Counsel i Legal Director w Czechach, na Węgrzech, w Polsce, Szwajcarii i Turcji.',
        faq: [
          { question: 'Czy B Solution rekrutuje prawników wewnętrznych dla firm farmaceutycznych?', answer: 'Tak. B Solution poszukuje prawników wewnętrznych dla globalnych grup farmaceutycznych i producentów leków generycznych, od Senior Legal Counsel po Legal Director i inne role kierownicze w zespole prawnym.' },
          { question: 'W jakich krajach B Solution rekrutuje prawników dla farmacji?', answer: 'B Solution rekrutowała prawników dla firm farmaceutycznych w Czechach, na Węgrzech, w Polsce, Szwajcarii i Turcji oraz prowadzi poszukiwania w całej Europie i poza nią dla ról regionalnych i EMEA.' },
          { question: 'Jakie stanowiska prawne w farmacji obsadza B Solution?', answer: 'Głównie Senior Legal Counsel i Legal Director, w tym prawników obsługujących kilka krajów lub cały region oraz prawników, którzy kierują lokalnym zespołem prawnym lub go budują.' },
          { question: 'Dlaczego warto rekrutować prawnika do farmacji przez wyspecjalizowaną firmę?', answer: 'Praca prawna w farmacji łączy umowy handlowe z obszarami regulowanymi, takimi jak zasady reklamy, współpraca z przedstawicielami zawodów medycznych, ochrona danych i compliance. Firma, która szuka wyłącznie prawników, sprawdzi to doświadczenie, zanim kandydat trafi do klienta.' },
          { question: 'Czy kandydaci, którzy zgłaszają się do B Solution, coś płacą?', answer: 'Nie. Za poszukiwania płaci firma, która zatrudnia; kandydaci nigdy nie płacą.' },
        ],
        sections: [
          {
            heading: 'Czego potrzebuje zespół prawny w farmacji',
            paragraphs: [
              'Firma farmaceutyczna w Europie Środkowej potrzebuje prawników, którzy szybko zawierają umowy handlowe i jednocześnie utrzymują biznes w ścisłych ramach dotyczących reklamy, cen i refundacji, działalności klinicznej, współpracy z lekarzami i aptekami oraz danych osobowych. W roli regionalnej lub EMEA ten sam prawnik często wspiera kilka krajów z różnymi regulatorami.',
              'B Solution szuka prawników, którzy wykonywali tę pracę w firmie farmaceutycznej lub dla niej i którym ufa zarząd, regionalny zespół prawny i compliance.',
            ],
          },
          {
            heading: 'Stanowiska, które obsadzamy',
            paragraphs: ['Typowe mandaty w farmacji i life sciences:'],
            bullets: [
              'Senior Legal Counsel na jeden kraj lub grupę krajów',
              'Legal Director kierujący lokalnym lub regionalnym zespołem prawnym',
              'Prawnicy łączący odpowiedzialność prawną i compliance',
              'Stanowiska wymagające języka lokalnego wraz z angielskim',
            ],
          },
          {
            heading: 'Gdzie prowadziliśmy poszukiwania',
            paragraphs: [
              'Nasze poszukiwania w farmacji objęły Czechy, Węgry, Polskę, Szwajcarię i Turcję, dla globalnych grup farmaceutycznych i producentów leków generycznych. Nazwy klientów pozostają poufne, jak wymaga executive search.',
            ],
          },
        ],
      },
    },
  },
]
