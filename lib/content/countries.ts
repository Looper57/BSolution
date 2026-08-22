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
