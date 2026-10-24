import type { Entity } from './types'

export const countries: Entity[] = [
  {
    kind: 'country',
    slug: 'czech-republic',
    basePath: '/locations/czech-republic',
    complete: true,
    areaServed: 'CZ',
    related: {
      services: ['legal-executive-search'],
      practices: ['general-counsel', 'compliance-officer'],
    },
    content: {
      en: {
        title: 'Legal Executive Search in the Czech Republic',
        summary:
          'Retained search for General Counsel and senior in-house lawyers across Prague and the Czech market.',
        metaTitle: 'Legal Executive Search Czech Republic | Prague',
        metaDescription:
          'Boutique legal executive search in the Czech Republic. Confidential search for General Counsel and senior in-house counsel in Prague and beyond.',
        faq: [
          { question: 'Does B Solution recruit General Counsel in the Czech Republic?', answer: 'Yes. B Solution runs retained, confidential searches for General Counsel, senior in-house counsel and law-firm partners in Prague and across the Czech market, and has worked in this market since its foundation in 2007.' },
          { question: 'How does a legal executive search in Prague work?', answer: 'After agreeing the brief, B Solution maps the relevant market systematically, approaches passive candidates discreetly and presents a shortlist with an honest, evidence-based assessment of each candidate.' },
          { question: 'In which languages are Czech searches conducted?', answer: 'In Czech and English, reflecting the bilingual reality of senior legal roles in international law firms, Czech subsidiaries of global groups and the local corporate sector.' },
          { question: 'How quickly can B Solution present candidates in the Czech Republic?', answer: 'The first candidates are typically presented within three to four weeks of agreeing the brief.' },
          { question: 'Is there a guarantee if a placed candidate leaves?', answer: 'Yes. B Solution replaces the candidate free of charge if they leave within 9 months for junior and non-lawyer roles, or within 12 months for senior roles (8+ years of experience).' },
          { question: 'Does B Solution work outside this market?', answer: 'Yes. B Solution works across Europe, the Gulf and beyond, without geographic limits, so cross-border mandates are run by the same team.' },
        ],
        sections: [
          {
            heading: 'Depth in the Czech market',
            paragraphs: [
              'The Czech Republic combines a mature domestic legal market with the demands of multinational employers headquartered or heavily invested in Prague. We have worked in this market since our foundation in 2007 and understand where senior legal talent sits — in international law firms, in the Czech subsidiaries of global groups, and in the growing local corporate sector.',
              'Our searches here are conducted in Czech and English, reflecting the bilingual reality of senior legal roles in the market.',
            ],
          },
        ],
      },
      cs: {
        title: 'Executive search v právním sektoru v České republice',
        summary:
          'Exkluzivní vyhledávání pozic General Counsel a seniorních interních právníků v Praze a na českém trhu.',
        metaTitle: 'Legal executive search Česká republika | Praha',
        metaDescription:
          'Butikový executive search v právním sektoru v České republice. Důvěrné vyhledávání pozic General Counsel a seniorních interních právníků v Praze i mimo ni.',
        faq: [
          { question: 'Hledá B Solution General Counsel v České republice?', answer: 'Ano. B Solution vede exkluzivní a důvěrná vyhledávání pozic General Counsel, seniorních interních právníků a partnerů advokátních kanceláří v Praze i na celém českém trhu, kde působí od svého založení v roce 2007.' },
          { question: 'Jak probíhá executive search v právním sektoru v Praze?', answer: 'Po upřesnění zadání B Solution systematicky zmapuje relevantní trh, diskrétně osloví pasivní kandidáty a předloží užší výběr s poctivým hodnocením každého kandidáta podloženým fakty.' },
          { question: 'V jakém jazyce vyhledávání v Česku probíhá?', answer: 'V češtině i angličtině, což odpovídá dvojjazyčné realitě seniorních právních rolí v mezinárodních kancelářích, českých pobočkách globálních skupin i v lokálních firmách.' },
          { question: 'Jak rychle B Solution předloží kandidáty v Česku?', answer: 'První kandidáty B Solution obvykle předloží do tří až čtyř týdnů od upřesnění zadání.' },
          { question: 'Je obsazení garantované, když kandidát odejde?', answer: 'Ano. Pokud kandidát odejde do 9 měsíců u juniorních a neprávnických pozic, nebo do 12 měsíců u seniorních pozic (8 a více let praxe), B Solution najde náhradu zdarma.' },
          { question: 'Působí B Solution i mimo tento trh?', answer: 'Ano. B Solution působí v celé Evropě, v Perském zálivu i jinde, bez geografického omezení, takže přeshraniční mandáty vede stejný tým.' },
        ],
        sections: [
          {
            heading: 'Hloubka znalosti českého trhu',
            paragraphs: [
              'Česká republika spojuje vyspělý domácí právní trh s nároky nadnárodních zaměstnavatelů se sídlem nebo významnými investicemi v Praze. Na tomto trhu působíme od svého založení v roce 2007 a víme, kde se seniorní právní talent nachází — v mezinárodních advokátních kancelářích, v českých pobočkách globálních skupin i v rostoucím lokálním korporátním sektoru.',
              'Naše vyhledávání zde vedeme v češtině i angličtině, což odráží dvojjazyčnou realitu seniorních právních rolí na trhu.',
            ],
          },
        ],
      },
      de: {
        title: 'Legal Executive Search in der Tschechischen Republik',
        summary:
          'Mandatierte Suche nach General Counsel und erfahrenen Inhouse-Juristen in Prag und im tschechischen Markt.',
        metaTitle: 'Legal Executive Search Tschechische Republik',
        metaDescription:
          'Spezialisierte Legal Executive Search in der Tschechischen Republik. Vertrauliche Suche nach General Counsel und erfahrenen Inhouse-Juristen in Prag.',
        faq: [
          { question: 'Sucht B Solution General Counsel in der Tschechischen Republik?', answer: 'Ja. B Solution führt mandatierte, vertrauliche Suchen nach General Counsel, erfahrenen Inhouse-Juristen und Kanzleipartnern in Prag und im gesamten tschechischen Markt durch – seit der Gründung 2007.' },
          { question: 'Wie läuft eine Legal Executive Search in Prag ab?', answer: 'Nach Abstimmung des Profils analysiert B Solution den relevanten Markt systematisch, spricht passive Kandidaten diskret an und legt eine Shortlist mit einer ehrlichen, faktenbasierten Einschätzung jedes Kandidaten vor.' },
          { question: 'In welchen Sprachen werden Suchen in Tschechien geführt?', answer: 'Auf Tschechisch und Englisch – entsprechend der zweisprachigen Realität leitender Rechtsfunktionen in internationalen Kanzleien, tschechischen Tochtergesellschaften und im lokalen Unternehmenssektor.' },
          { question: 'Wie schnell stellt B Solution Kandidaten in Tschechien vor?', answer: 'Die ersten Kandidaten stellt B Solution in der Regel innerhalb von drei bis vier Wochen nach Abstimmung des Profils vor.' },
          { question: 'Gibt es eine Garantie, wenn ein vermittelter Kandidat geht?', answer: 'Ja. Verlässt der Kandidat das Unternehmen innerhalb von 9 Monaten (Junior- und nichtjuristische Positionen) oder 12 Monaten (Senior-Positionen ab 8 Jahren Erfahrung), findet B Solution kostenlos Ersatz.' },
          { question: 'Ist B Solution auch außerhalb dieses Marktes tätig?', answer: 'Ja. B Solution arbeitet in ganz Europa, am Golf und darüber hinaus ohne geografische Grenzen, sodass grenzüberschreitende Mandate vom selben Team geführt werden.' },
        ],
        sections: [
          {
            heading: 'Tiefe im tschechischen Markt',
            paragraphs: [
              'Die Tschechische Republik verbindet einen reifen inländischen Rechtsmarkt mit den Anforderungen multinationaler Arbeitgeber, die in Prag ansässig oder stark investiert sind. Wir sind seit unserer Gründung 2007 in diesem Markt tätig und wissen, wo erfahrene Juristen zu finden sind — in internationalen Kanzleien, in den tschechischen Tochtergesellschaften globaler Konzerne und im wachsenden lokalen Unternehmenssektor.',
              'Unsere Suchen führen wir hier auf Tschechisch und Englisch durch — entsprechend der zweisprachigen Realität leitender Rechtsfunktionen im Markt.',
            ],
          },
        ],
      },
      pl: {
        title: 'Executive search prawny w Czechach',
        summary:
          'Powierzone poszukiwanie na stanowiska General Counsel i doświadczonych prawników wewnętrznych w Pradze i na rynku czeskim.',
        metaTitle: 'Executive search prawny Czechy | Praga',
        metaDescription:
          'Butikowy executive search prawny w Czechach. Poufne poszukiwanie na stanowiska General Counsel i doświadczonych prawników wewnętrznych w Pradze i poza nią.',
        faq: [
          { question: 'Czy B Solution rekrutuje General Counsel w Czechach?', answer: 'Tak. B Solution prowadzi powierzone, poufne poszukiwania na stanowiska General Counsel, doświadczonych prawników wewnętrznych i partnerów kancelarii w Pradze i na całym rynku czeskim – od założenia firmy w 2007 roku.' },
          { question: 'Jak przebiega executive search prawny w Pradze?', answer: 'Po uzgodnieniu profilu B Solution systematycznie mapuje odpowiedni rynek, dyskretnie kontaktuje się z pasywnymi kandydatami i przedstawia krótką listę z rzetelną, opartą na faktach oceną każdego kandydata.' },
          { question: 'W jakich językach prowadzone są poszukiwania w Czechach?', answer: 'Po czesku i angielsku, co odzwierciedla dwujęzyczną rzeczywistość wyższych stanowisk prawnych w międzynarodowych kancelariach, czeskich spółkach globalnych grup i lokalnych firmach.' },
          { question: 'Jak szybko B Solution przedstawia kandydatów w Czechach?', answer: 'Pierwszych kandydatów B Solution przedstawia zwykle w ciągu trzech do czterech tygodni od uzgodnienia profilu.' },
          { question: 'Czy jest gwarancja, jeśli zatrudniony kandydat odejdzie?', answer: 'Tak. Jeśli kandydat odejdzie w ciągu 9 miesięcy na stanowiskach juniorskich i nieprawniczych lub w ciągu 12 miesięcy na stanowiskach seniorskich (od 8 lat doświadczenia), B Solution bezpłatnie znajdzie zastępstwo.' },
          { question: 'Czy B Solution działa także poza tym rynkiem?', answer: 'Tak. B Solution działa w całej Europie, w regionie Zatoki i poza nimi, bez ograniczeń geograficznych, więc mandaty transgraniczne prowadzi ten sam zespół.' },
        ],
        sections: [
          {
            heading: 'Znajomość rynku czeskiego',
            paragraphs: [
              'Czechy łączą dojrzały krajowy rynek prawny z wymaganiami międzynarodowych pracodawców z siedzibą lub znaczącymi inwestycjami w Pradze. Działamy na tym rynku od założenia firmy w 2007 roku i wiemy, gdzie znajduje się doświadczony talent prawniczy — w międzynarodowych kancelariach, w czeskich spółkach zależnych globalnych grup oraz w rosnącym lokalnym sektorze korporacyjnym.',
              'Nasze poszukiwania prowadzimy tu po czesku i angielsku, co odzwierciedla dwujęzyczną rzeczywistość wyższych stanowisk prawnych na rynku.',
            ],
          },
        ],
      },
    },
  },
  {
    kind: 'country',
    slug: 'germany',
    basePath: '/locations/germany',
    complete: true,
    areaServed: 'DE',
    related: { services: ['legal-executive-search'], practices: ['general-counsel'] },
    content: {
      en: {
        title: 'Legal Executive Search in Germany',
        summary:
          'Retained search for General Counsel and Heads of Legal across Germany’s industrial, financial and technology sectors.',
        metaTitle: 'Legal Executive Search Germany',
        metaDescription:
          'Boutique legal executive search in Germany. Confidential retained search for General Counsel and Heads of Legal across the DACH region.',
        faq: [
          { question: 'Does B Solution recruit General Counsel and Heads of Legal in Germany?', answer: 'Yes. B Solution runs confidential, retained searches for General Counsel and Heads of Legal across Germany\'s industrial, financial and technology sectors and the wider DACH region.' },
          { question: 'What do German legal leadership searches require?', answer: 'Candidates who can operate in a demanding compliance environment and a distinct governance culture — from founder-led Mittelstand businesses to the supervisory-board governance of larger corporates.' },
          { question: 'In which languages are German searches conducted?', answer: 'In German and English.' },
          { question: 'How quickly can B Solution present candidates in Germany?', answer: 'The first candidates are typically presented within three to four weeks of agreeing the brief.' },
          { question: 'Is there a guarantee if a placed candidate leaves?', answer: 'Yes. B Solution replaces the candidate free of charge if they leave within 9 months for junior and non-lawyer roles, or within 12 months for senior roles (8+ years of experience).' },
          { question: 'Does B Solution work outside this market?', answer: 'Yes. B Solution works across Europe, the Gulf and beyond, without geographic limits, so cross-border mandates are run by the same team.' },
        ],
        sections: [
          {
            heading: 'The German legal leadership market',
            paragraphs: [
              'Germany’s economy — anchored by industrial Mittelstand, listed corporates and a strong financial centre in Frankfurt — creates sustained demand for senior legal leaders who can operate in a demanding compliance environment and a distinct corporate governance culture.',
              'We conduct searches in German and English and understand the expectations of both founder-led Mittelstand businesses and the supervisory-board governance of larger corporates.',
            ],
          },
        ],
      },
      cs: {
        title: 'Executive search v právním sektoru v Německu',
        summary:
          'Exkluzivní vyhledávání pozic General Counsel a vedoucích právních oddělení napříč německým průmyslem, financemi a technologiemi.',
        metaTitle: 'Legal executive search Německo',
        metaDescription:
          'Butikový executive search v právním sektoru v Německu. Důvěrné exkluzivní vyhledávání pozic General Counsel a vedoucích právních oddělení v regionu DACH.',
        faq: [
          { question: 'Hledá B Solution General Counsel a vedoucí právních oddělení v Německu?', answer: 'Ano. B Solution vede důvěrná exkluzivní vyhledávání pozic General Counsel a Head of Legal v německém průmyslu, finančnictví a technologiích i v celém regionu DACH.' },
          { question: 'Co vyžadují vedoucí právní pozice v Německu?', answer: 'Kandidáty, kteří zvládnou náročné prostředí compliance a specifickou kulturu řízení — od rodinných firem Mittelstand po řízení s dozorčí radou u velkých korporací.' },
          { question: 'V jakém jazyce vyhledávání v Německu probíhá?', answer: 'V němčině a angličtině.' },
          { question: 'Jak rychle B Solution předloží kandidáty v Německu?', answer: 'První kandidáty B Solution obvykle předloží do tří až čtyř týdnů od upřesnění zadání.' },
          { question: 'Je obsazení garantované, když kandidát odejde?', answer: 'Ano. Pokud kandidát odejde do 9 měsíců u juniorních a neprávnických pozic, nebo do 12 měsíců u seniorních pozic (8 a více let praxe), B Solution najde náhradu zdarma.' },
          { question: 'Působí B Solution i mimo tento trh?', answer: 'Ano. B Solution působí v celé Evropě, v Perském zálivu i jinde, bez geografického omezení, takže přeshraniční mandáty vede stejný tým.' },
        ],
        sections: [
          {
            heading: 'Německý trh právního vedení',
            paragraphs: [
              'Německá ekonomika — opřená o průmyslový Mittelstand, kotované korporace a silné finanční centrum ve Frankfurtu — vytváří trvalou poptávku po seniorních právních lídrech, kteří dokážou působit v náročném prostředí compliance a specifické kultuře správy společností.',
              'Vyhledávání vedeme v němčině i angličtině a rozumíme očekáváním jak rodinných firem Mittelstandu, tak správy velkých korporací s dozorčí radou.',
            ],
          },
        ],
      },
      de: {
        title: 'Legal Executive Search in Deutschland',
        summary:
          'Mandatierte Suche nach General Counsel und Leitern der Rechtsabteilung in Industrie, Finanzwesen und Technologie in Deutschland.',
        metaTitle: 'Legal Executive Search Deutschland',
        metaDescription:
          'Spezialisierte Legal Executive Search in Deutschland. Vertrauliche mandatierte Suche nach General Counsel und Leitern der Rechtsabteilung in der DACH-Region.',
        faq: [
          { question: 'Sucht B Solution General Counsel und Heads of Legal in Deutschland?', answer: 'Ja. B Solution führt vertrauliche, mandatierte Suchen nach General Counsel und Heads of Legal in Industrie, Finanzsektor und Technologie in Deutschland und der DACH-Region durch.' },
          { question: 'Was verlangen juristische Führungspositionen in Deutschland?', answer: 'Kandidaten, die in einem anspruchsvollen Compliance-Umfeld und einer eigenen Governance-Kultur bestehen – vom inhabergeführten Mittelstand bis zur Aufsichtsratsstruktur großer Konzerne.' },
          { question: 'In welchen Sprachen werden Suchen in Deutschland geführt?', answer: 'Auf Deutsch und Englisch.' },
          { question: 'Wie schnell stellt B Solution Kandidaten in Deutschland vor?', answer: 'Die ersten Kandidaten stellt B Solution in der Regel innerhalb von drei bis vier Wochen nach Abstimmung des Profils vor.' },
          { question: 'Gibt es eine Garantie, wenn ein vermittelter Kandidat geht?', answer: 'Ja. Verlässt der Kandidat das Unternehmen innerhalb von 9 Monaten (Junior- und nichtjuristische Positionen) oder 12 Monaten (Senior-Positionen ab 8 Jahren Erfahrung), findet B Solution kostenlos Ersatz.' },
          { question: 'Ist B Solution auch außerhalb dieses Marktes tätig?', answer: 'Ja. B Solution arbeitet in ganz Europa, am Golf und darüber hinaus ohne geografische Grenzen, sodass grenzüberschreitende Mandate vom selben Team geführt werden.' },
        ],
        sections: [
          {
            heading: 'Der deutsche Markt für juristische Führung',
            paragraphs: [
              'Die deutsche Wirtschaft — getragen von industriellem Mittelstand, börsennotierten Konzernen und einem starken Finanzplatz Frankfurt — schafft anhaltende Nachfrage nach erfahrenen Rechtsführungskräften, die in einem anspruchsvollen Compliance-Umfeld und einer eigenen Corporate-Governance-Kultur agieren können.',
              'Wir führen Suchen auf Deutsch und Englisch durch und kennen die Erwartungen sowohl inhabergeführter Mittelstandsunternehmen als auch der aufsichtsratsgeprägten Governance größerer Konzerne.',
            ],
          },
        ],
      },
      pl: {
        title: 'Executive search prawny w Niemczech',
        summary:
          'Powierzone poszukiwanie na stanowiska General Counsel i dyrektorów działów prawnych w niemieckim przemyśle, finansach i technologii.',
        metaTitle: 'Executive search prawny Niemcy',
        metaDescription:
          'Butikowy executive search prawny w Niemczech. Poufne, powierzone poszukiwanie na stanowiska General Counsel i dyrektorów działów prawnych w regionie DACH.',
        faq: [
          { question: 'Czy B Solution rekrutuje General Counsel i Heads of Legal w Niemczech?', answer: 'Tak. B Solution prowadzi poufne, powierzone poszukiwania na stanowiska General Counsel i Head of Legal w niemieckim przemyśle, finansach i technologiach oraz w całym regionie DACH.' },
          { question: 'Czego wymagają kierownicze stanowiska prawne w Niemczech?', answer: 'Kandydatów, którzy poradzą sobie w wymagającym środowisku compliance i specyficznej kulturze ładu korporacyjnego – od firm rodzinnych Mittelstand po spółki z radą nadzorczą.' },
          { question: 'W jakich językach prowadzone są poszukiwania w Niemczech?', answer: 'Po niemiecku i angielsku.' },
          { question: 'Jak szybko B Solution przedstawia kandydatów w Niemczech?', answer: 'Pierwszych kandydatów B Solution przedstawia zwykle w ciągu trzech do czterech tygodni od uzgodnienia profilu.' },
          { question: 'Czy jest gwarancja, jeśli zatrudniony kandydat odejdzie?', answer: 'Tak. Jeśli kandydat odejdzie w ciągu 9 miesięcy na stanowiskach juniorskich i nieprawniczych lub w ciągu 12 miesięcy na stanowiskach seniorskich (od 8 lat doświadczenia), B Solution bezpłatnie znajdzie zastępstwo.' },
          { question: 'Czy B Solution działa także poza tym rynkiem?', answer: 'Tak. B Solution działa w całej Europie, w regionie Zatoki i poza nimi, bez ograniczeń geograficznych, więc mandaty transgraniczne prowadzi ten sam zespół.' },
        ],
        sections: [
          {
            heading: 'Niemiecki rynek przywództwa prawnego',
            paragraphs: [
              'Niemiecka gospodarka — oparta na przemysłowym Mittelstandzie, spółkach giełdowych i silnym centrum finansowym we Frankfurcie — generuje stały popyt na doświadczonych liderów prawnych, którzy potrafią działać w wymagającym otoczeniu compliance i odrębnej kulturze ładu korporacyjnego.',
              'Poszukiwania prowadzimy po niemiecku i angielsku oraz rozumiemy oczekiwania zarówno rodzinnych firm Mittelstandu, jak i nadzorowanego przez radę większego biznesu korporacyjnego.',
            ],
          },
        ],
      },
    },
  },
  {
    kind: 'country',
    slug: 'united-arab-emirates',
    basePath: '/locations/united-arab-emirates',
    complete: true,
    areaServed: 'AE',
    related: { services: ['legal-executive-search'], practices: ['general-counsel'] },
    content: {
      en: {
        title: 'Legal Executive Search in the UAE',
        summary:
          'Retained search for legal leaders across Dubai, Abu Dhabi and the wider Gulf, spanning free-zone and onshore mandates.',
        metaTitle: 'Legal Executive Search UAE | Dubai & Abu Dhabi',
        metaDescription:
          'Boutique legal executive search in the United Arab Emirates. Confidential search for General Counsel and senior counsel in Dubai, Abu Dhabi and the Gulf.',
        faq: [
          { question: 'Does B Solution recruit General Counsel in Dubai and Abu Dhabi?', answer: 'Yes. B Solution runs discreet, retained searches for General Counsel and senior counsel across Dubai, Abu Dhabi and the wider Gulf, for both free-zone and onshore mandates.' },
          { question: 'What is specific about legal leadership roles in the UAE?', answer: 'Roles often span common-law free zones such as the DIFC and ADGM alongside onshore civil-law structures, in a fast-moving regulatory landscape.' },
          { question: 'Can B Solution find candidates relocating from Europe to the Gulf?', answer: 'Yes. B Solution searches for internationally mobile legal leaders and connects its European network with mandates in the Gulf.' },
          { question: 'How quickly can B Solution present candidates in the UAE?', answer: 'The first candidates are typically presented within three to four weeks of agreeing the brief.' },
          { question: 'Is there a guarantee if a placed candidate leaves?', answer: 'Yes. B Solution replaces the candidate free of charge if they leave within 9 months for junior and non-lawyer roles, or within 12 months for senior roles (8+ years of experience).' },
          { question: 'Does B Solution work outside this market?', answer: 'Yes. B Solution works across Europe, the Gulf and beyond, without geographic limits, so cross-border mandates are run by the same team.' },
        ],
        sections: [
          {
            heading: 'Legal leadership in the Gulf',
            paragraphs: [
              'The UAE has become a hub for regional and global businesses, with legal leadership roles that span common-law free zones such as the DIFC and ADGM alongside onshore civil-law structures. Senior lawyers here must navigate that duality as well as a fast-moving regulatory landscape.',
              'We conduct discreet searches for internationally mobile legal leaders, drawing on relationships across the region built over many years.',
            ],
          },
        ],
      },
      cs: {
        title: 'Executive search v právním sektoru ve SAE',
        summary:
          'Exkluzivní vyhledávání právních lídrů v Dubaji, Abú Zabí a širším regionu Zálivu, zahrnující mandáty ve free zones i onshore.',
        metaTitle: 'Legal executive search SAE | Dubaj a Abú Zabí',
        metaDescription:
          'Butikový executive search v právním sektoru ve Spojených arabských emirátech. Důvěrné vyhledávání pozic General Counsel v Dubaji, Abú Zabí a Zálivu.',
        faq: [
          { question: 'Hledá B Solution General Counsel v Dubaji a Abú Zabí?', answer: 'Ano. B Solution vede diskrétní exkluzivní vyhledávání pozic General Counsel a seniorních právníků v Dubaji, Abú Zabí i v celém Perském zálivu, pro free-zone i onshore mandáty.' },
          { question: 'Čím jsou specifické vedoucí právní pozice v SAE?', answer: 'Často propojují free zóny s common law, jako DIFC a ADGM, s onshore strukturami kontinentálního práva, a to v rychle se měnícím regulačním prostředí.' },
          { question: 'Najde B Solution kandidáty ochotné přestěhovat se z Evropy do Perského zálivu?', answer: 'Ano. B Solution vyhledává mezinárodně mobilní právní lídry a propojuje svou evropskou síť s mandáty v Perském zálivu.' },
          { question: 'Jak rychle B Solution předloží kandidáty v SAE?', answer: 'První kandidáty B Solution obvykle předloží do tří až čtyř týdnů od upřesnění zadání.' },
          { question: 'Je obsazení garantované, když kandidát odejde?', answer: 'Ano. Pokud kandidát odejde do 9 měsíců u juniorních a neprávnických pozic, nebo do 12 měsíců u seniorních pozic (8 a více let praxe), B Solution najde náhradu zdarma.' },
          { question: 'Působí B Solution i mimo tento trh?', answer: 'Ano. B Solution působí v celé Evropě, v Perském zálivu i jinde, bez geografického omezení, takže přeshraniční mandáty vede stejný tým.' },
        ],
        sections: [
          {
            heading: 'Právní vedení v Zálivu',
            paragraphs: [
              'SAE se staly centrem regionálních i globálních firem s rolemi právního vedení, které zahrnují free zones s common law jako DIFC a ADGM vedle onshore struktur civilního práva. Seniorní právníci zde musí zvládat tuto dvojkolejnost i rychle se měnící regulatorní prostředí.',
              'Vedeme diskrétní vyhledávání mezinárodně mobilních právních lídrů a opíráme se o vztahy budované v regionu po mnoho let.',
            ],
          },
        ],
      },
      de: {
        title: 'Legal Executive Search in den VAE',
        summary:
          'Mandatierte Suche nach Rechtsführungskräften in Dubai, Abu Dhabi und der weiteren Golfregion — von Freizonen- bis Onshore-Mandaten.',
        metaTitle: 'Legal Executive Search VAE | Dubai & Abu Dhabi',
        metaDescription:
          'Spezialisierte Legal Executive Search in den Vereinigten Arabischen Emiraten. Vertrauliche Suche nach General Counsel in Dubai, Abu Dhabi und am Golf.',
        faq: [
          { question: 'Sucht B Solution General Counsel in Dubai und Abu Dhabi?', answer: 'Ja. B Solution führt diskrete, mandatierte Suchen nach General Counsel und Senior Counsel in Dubai, Abu Dhabi und der gesamten Golfregion durch – für Freezone- und Onshore-Mandate.' },
          { question: 'Was ist an juristischen Führungsrollen in den VAE besonders?', answer: 'Sie verbinden oft Common-Law-Freezones wie DIFC und ADGM mit Onshore-Strukturen des Civil Law – in einem sich schnell wandelnden regulatorischen Umfeld.' },
          { question: 'Findet B Solution Kandidaten, die aus Europa an den Golf wechseln?', answer: 'Ja. B Solution sucht international mobile juristische Führungskräfte und verbindet sein europäisches Netzwerk mit Mandaten am Golf.' },
          { question: 'Wie schnell stellt B Solution Kandidaten in den VAE vor?', answer: 'Die ersten Kandidaten stellt B Solution in der Regel innerhalb von drei bis vier Wochen nach Abstimmung des Profils vor.' },
          { question: 'Gibt es eine Garantie, wenn ein vermittelter Kandidat geht?', answer: 'Ja. Verlässt der Kandidat das Unternehmen innerhalb von 9 Monaten (Junior- und nichtjuristische Positionen) oder 12 Monaten (Senior-Positionen ab 8 Jahren Erfahrung), findet B Solution kostenlos Ersatz.' },
          { question: 'Ist B Solution auch außerhalb dieses Marktes tätig?', answer: 'Ja. B Solution arbeitet in ganz Europa, am Golf und darüber hinaus ohne geografische Grenzen, sodass grenzüberschreitende Mandate vom selben Team geführt werden.' },
        ],
        sections: [
          {
            heading: 'Juristische Führung am Golf',
            paragraphs: [
              'Die VAE sind zu einem Zentrum für regionale und globale Unternehmen geworden, mit Rechtsführungsrollen, die Common-Law-Freizonen wie DIFC und ADGM ebenso umfassen wie zivilrechtliche Onshore-Strukturen. Erfahrene Juristen müssen hier diese Dualität und ein schnelllebiges regulatorisches Umfeld beherrschen.',
              'Wir führen diskrete Suchen nach international mobilen Rechtsführungskräften durch und stützen uns auf über viele Jahre gewachsene Beziehungen in der Region.',
            ],
          },
        ],
      },
      pl: {
        title: 'Executive search prawny w ZEA',
        summary:
          'Powierzone poszukiwanie liderów prawnych w Dubaju, Abu Zabi i szerszym regionie Zatoki, obejmujące zlecenia w strefach wolnocłowych i onshore.',
        metaTitle: 'Executive search prawny ZEA | Dubaj i Abu Zabi',
        metaDescription:
          'Butikowy executive search prawny w Zjednoczonych Emiratach Arabskich. Poufne poszukiwanie na stanowiska General Counsel w Dubaju, Abu Zabi i regionie Zatoki.',
        faq: [
          { question: 'Czy B Solution rekrutuje General Counsel w Dubaju i Abu Zabi?', answer: 'Tak. B Solution prowadzi dyskretne, powierzone poszukiwania na stanowiska General Counsel i starszych prawników w Dubaju, Abu Zabi i całym regionie Zatoki, zarówno w strefach wolnych, jak i onshore.' },
          { question: 'Co wyróżnia kierownicze stanowiska prawne w ZEA?', answer: 'Często łączą strefy wolne oparte na common law, takie jak DIFC i ADGM, ze strukturami prawa cywilnego onshore, w szybko zmieniającym się otoczeniu regulacyjnym.' },
          { question: 'Czy B Solution znajduje kandydatów przenoszących się z Europy do Zatoki?', answer: 'Tak. B Solution poszukuje mobilnych międzynarodowo liderów prawnych i łączy swoją europejską sieć z mandatami w regionie Zatoki.' },
          { question: 'Jak szybko B Solution przedstawia kandydatów w ZEA?', answer: 'Pierwszych kandydatów B Solution przedstawia zwykle w ciągu trzech do czterech tygodni od uzgodnienia profilu.' },
          { question: 'Czy jest gwarancja, jeśli zatrudniony kandydat odejdzie?', answer: 'Tak. Jeśli kandydat odejdzie w ciągu 9 miesięcy na stanowiskach juniorskich i nieprawniczych lub w ciągu 12 miesięcy na stanowiskach seniorskich (od 8 lat doświadczenia), B Solution bezpłatnie znajdzie zastępstwo.' },
          { question: 'Czy B Solution działa także poza tym rynkiem?', answer: 'Tak. B Solution działa w całej Europie, w regionie Zatoki i poza nimi, bez ograniczeń geograficznych, więc mandaty transgraniczne prowadzi ten sam zespół.' },
        ],
        sections: [
          {
            heading: 'Przywództwo prawne w regionie Zatoki',
            paragraphs: [
              'ZEA stały się centrum dla firm regionalnych i globalnych, ze stanowiskami przywództwa prawnego obejmującymi strefy wolnocłowe oparte na common law, takie jak DIFC i ADGM, obok onshore’owych struktur prawa cywilnego. Doświadczeni prawnicy muszą tu poruszać się w tej dwoistości oraz w szybko zmieniającym się otoczeniu regulacyjnym.',
              'Prowadzimy dyskretne poszukiwania mobilnych międzynarodowo liderów prawnych, opierając się na relacjach budowanych w regionie przez wiele lat.',
            ],
          },
        ],
      },
    },
  },
]
