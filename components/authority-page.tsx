import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Entity } from '@/lib/content/types'
import { absoluteUrl, localizedPath, LOCALES, LOCALE_META, type Locale } from '@/lib/i18n/config'
import { UI } from '@/lib/i18n/ui'
import { authorityEntities } from '@/lib/content'

const sectionLabels: Record<string, keyof typeof UI.en.nav> = {
  services: 'services',
  'practice-areas': 'practiceAreas',
  industries: 'industries',
  locations: 'countries',
  'case-studies': 'caseStudies',
  insights: 'insights',
}

export function AuthorityPage({ entity, locale, section }: { entity: Entity; locale: Locale; section: string }) {
  const copy = entity.content[locale]
  const ui = UI[locale]
  const sectionLabel = ui.nav[sectionLabels[section]]
  const currentPath = entity.basePath
  const contactPath = localizedPath(locale, '/contact')
  const relatedSlugs = Object.entries(entity.related ?? {})
    .filter(([group]) => group !== 'insights')
    .flatMap(([, slugs]) => slugs ?? [])
  const relatedEntities = authorityEntities.filter((item) => item.slug !== entity.slug && relatedSlugs.includes(item.slug))
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': entity.kind === 'caseStudy' ? 'Article' : 'WebPage',
      name: copy.title,
      description: copy.metaDescription ?? copy.summary,
      url: absoluteUrl(locale, currentPath),
      inLanguage: LOCALE_META[locale].htmlLang,
      publisher: { '@type': 'Organization', name: 'B Solution', url: 'https://www.bsolution.eu' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: ui.common.home, item: absoluteUrl(locale, '/') },
        { '@type': 'ListItem', position: 2, name: sectionLabel, item: absoluteUrl(locale, `/${section}`) },
        { '@type': 'ListItem', position: 3, name: copy.title, item: absoluteUrl(locale, currentPath) },
      ],
    },
  ]

  return (
    <>
      <header className="bg-navy text-white">
        <div className="mx-auto flex min-h-20 max-w-[1440px] items-center justify-between gap-6 px-6 md:px-10 lg:px-20">
          <Link href={localizedPath(locale, '/')} className="font-serif text-lg tracking-wide text-gold">B Solution</Link>
          <nav aria-label="Primary navigation" className="hidden items-center gap-7 lg:flex">
            {(['services', 'practice-areas', 'industries', 'locations', 'case-studies'] as const).map((item) => (
              <Link key={item} href={localizedPath(locale, `/${item}`)} className="text-xs uppercase tracking-widest text-white/70 transition-colors hover:text-gold">
                {ui.nav[sectionLabels[item]]}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest">
            {LOCALES.map((item) => (
              <Link key={item} href={localizedPath(item, currentPath)} hrefLang={LOCALE_META[item].htmlLang} className={item === locale ? 'text-gold' : 'text-white/50 hover:text-white'}>
                {LOCALE_META[item].short}
              </Link>
            ))}
          </div>
        </div>
      </header>

      <main id="main-content" className="bg-background text-foreground">
        <section className="bg-navy px-6 pb-20 pt-12 text-white md:px-10 md:pb-28 md:pt-20 lg:px-20">
          <div className="mx-auto max-w-[1180px]">
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs text-white/50">
              <Link href={localizedPath(locale, '/')}>{ui.common.home}</Link><span aria-hidden="true">/</span>
              <Link href={localizedPath(locale, `/${section}`)}>{sectionLabel}</Link><span aria-hidden="true">/</span>
              <span className="text-white/80">{copy.title}</span>
            </nav>
            <p className="mt-14 text-xs font-medium uppercase tracking-[0.25em] text-gold">{sectionLabel}</p>
            <h1 className="mt-5 max-w-4xl text-balance font-serif text-4xl font-normal leading-tight md:text-6xl">{copy.title}</h1>
            <p className="mt-7 max-w-3xl text-pretty text-lg leading-relaxed text-white/70 md:text-xl">{copy.summary}</p>
          </div>
        </section>

        <div className="mx-auto grid max-w-[1180px] gap-12 px-6 py-16 md:px-10 md:py-24 lg:grid-cols-[minmax(0,1fr)_280px] lg:px-0">
          <article className="flex flex-col gap-14">
            {copy.sections.map((contentSection) => (
              <section key={contentSection.heading} className="border-t border-border pt-9 first:border-0 first:pt-0">
                <h2 className="text-balance font-serif text-3xl leading-tight text-navy">{contentSection.heading}</h2>
                <div className="mt-6 flex flex-col gap-5">
                  {contentSection.paragraphs.map((paragraph) => <p key={paragraph} className="text-base leading-relaxed text-muted-foreground md:text-lg">{paragraph}</p>)}
                  {contentSection.bullets && (
                    <ul className="flex flex-col gap-3 border-l-2 border-gold pl-6">
                      {contentSection.bullets.map((bullet) => <li key={bullet} className="leading-relaxed text-muted-foreground">{bullet}</li>)}
                    </ul>
                  )}
                </div>
              </section>
            ))}
            {relatedEntities.length > 0 && (
              <section className="border-t border-border pt-9">
                <h2 className="font-serif text-3xl text-navy">{ui.common.relatedServices}</h2>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {relatedEntities.map((item) => (
                    <Link key={item.basePath} href={localizedPath(locale, item.basePath)} className="flex items-center justify-between gap-4 border border-border p-5 text-sm font-medium text-foreground transition-colors hover:border-gold">
                      {item.content[locale].title}<ArrowRight className="size-4 shrink-0" aria-hidden="true" />
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </article>

          <aside className="lg:sticky lg:top-8 lg:self-start">
            <div className="bg-navy p-8 text-white">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-gold">B Solution</p>
              <h2 className="mt-5 font-serif text-2xl leading-snug">{ui.common.talkToUs}</h2>
              <p className="mt-4 text-sm leading-relaxed text-white/60">{ui.common.talkToUsDesc}</p>
              <Link href={contactPath} className="mt-7 inline-flex items-center gap-2 border border-gold px-5 py-3 text-xs font-semibold uppercase tracking-widest text-gold transition-colors hover:bg-gold hover:text-navy">
                {ui.common.getInTouch}<ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </aside>
        </div>
      </main>

      <footer className="bg-navy-deep px-6 py-12 text-white md:px-10 lg:px-20">
        <div className="mx-auto flex max-w-[1180px] flex-col gap-8 border-t border-white/10 pt-10 md:flex-row md:items-end md:justify-between">
          <div><p className="font-serif text-xl text-gold">B Solution</p><p className="mt-3 max-w-xl text-sm leading-relaxed text-white/50">{ui.footer.tagline}</p></div>
          <p className="text-xs text-white/40">{ui.footer.copyright}</p>
        </div>
      </footer>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  )
}
