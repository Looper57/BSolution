import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type {
  AuthorityEvidenceViewModel,
  ProductionAuthorityViewModel,
} from '@/lib/authority-pages'
import { absoluteUrl, localizedPath, LOCALES, LOCALE_META } from '@/lib/i18n/config'
import { UI } from '@/lib/i18n/ui'
import {
  buildBreadcrumbSchema,
  buildServiceSchema,
  buildWebPageSchema,
  serializeJsonLd,
} from '@/lib/structured-data'

const navigationLabels = {
  en: 'Primary navigation',
  cs: 'Hlavní navigace',
  de: 'Hauptnavigation',
  pl: 'Główna nawigacja',
} as const

const sectionLabels = {
  services: 'services',
  'practice-areas': 'practiceAreas',
  industries: 'industries',
  locations: 'countries',
  'case-studies': 'caseStudies',
} as const

export function ProductionAuthorityPage({
  viewModel,
  evidence,
}: {
  viewModel: ProductionAuthorityViewModel
  evidence: AuthorityEvidenceViewModel
}) {
  const ui = UI[viewModel.locale]
  const schemaInput = {
    name: viewModel.hero.h1,
    description: viewModel.metaDescription,
    url: viewModel.canonical,
    locale: viewModel.locale,
  }
  const schemaGraph = [
    ...(viewModel.structuredData.requested.includes('WebPage')
      ? [buildWebPageSchema(schemaInput)]
      : []),
    ...(viewModel.structuredData.requested.includes('Service')
      && viewModel.structuredData.describesVisibleService
      ? [buildServiceSchema(schemaInput)]
      : []),
    ...(viewModel.structuredData.requested.includes('BreadcrumbList')
      ? [
          buildBreadcrumbSchema(viewModel.canonical, [
            {
              name: viewModel.breadcrumb.homeLabel,
              item: absoluteUrl(viewModel.locale, '/'),
            },
            {
              name: viewModel.breadcrumb.parentLabel,
              item: absoluteUrl(viewModel.locale, '/services'),
            },
            {
              name: viewModel.breadcrumb.currentLabel,
              item: viewModel.canonical,
            },
          ]),
        ]
      : []),
  ]

  return (
    <>
      <header className="bg-navy text-white">
        <div className="mx-auto flex min-h-20 max-w-[1440px] items-center justify-between gap-6 px-6 md:px-10 lg:px-20">
          <Link
            href={localizedPath(viewModel.locale, '/')}
            className="font-serif text-lg tracking-wide text-gold"
          >
            B Solution
          </Link>
          <nav
            aria-label={navigationLabels[viewModel.locale]}
            className="hidden items-center gap-7 lg:flex"
          >
            {Object.entries(sectionLabels).map(([path, label]) => (
              <Link
                key={path}
                href={localizedPath(viewModel.locale, `/${path}`)}
                className="text-xs uppercase tracking-widest text-white/70 transition-colors hover:text-gold"
              >
                {ui.nav[label]}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest">
            {LOCALES.map((locale) => (
              <Link
                key={locale}
                href={localizedPath(locale, viewModel.basePath)}
                hrefLang={LOCALE_META[locale].htmlLang}
                className={
                  locale === viewModel.locale
                    ? 'text-gold'
                    : 'text-white/50 hover:text-white'
                }
              >
                {LOCALE_META[locale].short}
              </Link>
            ))}
          </div>
        </div>
      </header>

      <main id="main-content" className="bg-background text-foreground">
        <section className="bg-navy px-6 pb-20 pt-12 text-white md:px-10 md:pb-28 md:pt-20 lg:px-20">
          <div className="mx-auto max-w-[1180px]">
            <nav
              aria-label={viewModel.breadcrumb.navigationLabel}
              className="flex flex-wrap items-center gap-2 text-xs text-white/50"
            >
              <Link href={viewModel.breadcrumb.homeHref}>
                {viewModel.breadcrumb.homeLabel}
              </Link>
              <span aria-hidden="true">/</span>
              <Link href={viewModel.breadcrumb.parentHref}>
                {viewModel.breadcrumb.parentLabel}
              </Link>
              <span aria-hidden="true">/</span>
              <span className="text-white/80">
                {viewModel.breadcrumb.currentLabel}
              </span>
            </nav>
            <p className="mt-14 text-xs font-medium uppercase tracking-[0.25em] text-gold">
              {viewModel.hero.parentLabel}
            </p>
            <h1 className="mt-5 max-w-4xl text-balance font-serif text-4xl font-normal leading-tight md:text-6xl">
              {viewModel.hero.h1}
            </h1>
            <p className="mt-7 max-w-3xl text-pretty text-lg leading-relaxed text-white/70 md:text-xl">
              {viewModel.hero.proposition}
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-[1180px] px-6 py-16 md:px-10 md:py-24 lg:px-0">
          <section
            aria-labelledby={`${viewModel.id}-executive-summary`}
            className="max-w-4xl"
          >
            <h2
              id={`${viewModel.id}-executive-summary`}
              className="font-serif text-3xl text-navy"
            >
              {viewModel.executiveSummary.heading}
            </h2>
            <div className="mt-6 flex flex-col gap-5">
              {viewModel.executiveSummary.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-base leading-relaxed text-muted-foreground md:text-lg"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </section>

          <div className="mt-14 flex flex-col gap-14">
            <section className="border-t border-border pt-9">
              <h2 className="text-balance font-serif text-3xl leading-tight text-navy">
                {viewModel.definition.heading}
              </h2>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
                {viewModel.definition.text}
              </p>
            </section>

            {viewModel.sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                data-authority-section={section.kind}
                className="border-t border-border pt-9"
              >
                <h2 className="text-balance font-serif text-3xl leading-tight text-navy">
                  {section.heading}
                </h2>
                <div className="mt-6 flex flex-col gap-5">
                  {section.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="text-base leading-relaxed text-muted-foreground md:text-lg"
                    >
                      {paragraph}
                    </p>
                  ))}
                  {section.items && (
                    <ul className="flex flex-col gap-3 border-l-2 border-gold pl-6">
                      {section.items.map((item) => (
                        <li
                          key={item}
                          className="leading-relaxed text-muted-foreground"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>
            ))}

            <section
              aria-labelledby={`${viewModel.id}-evidence`}
              data-authority-evidence="root"
              className="border-t border-border pt-9"
            >
              <h2
                id={`${viewModel.id}-evidence`}
                className="font-serif text-3xl text-navy"
              >
                {evidence.heading}
              </h2>

              <div className="mt-9 flex flex-col gap-12">
                <section data-evidence-kind="operating-history">
                  <h3 className="font-serif text-2xl text-navy">
                    {evidence.history.heading}
                  </h3>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    {evidence.history.text}
                  </p>
                </section>

                <section data-evidence-kind="organisation-reference">
                  <h3 className="font-serif text-2xl text-navy">
                    {evidence.organisations.heading}
                  </h3>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    {evidence.organisations.introduction}
                  </p>
                  <ul className="mt-6 flex flex-wrap gap-x-7 gap-y-4">
                    {evidence.organisations.names.map((name) => (
                      <li key={name} className="text-sm font-medium text-navy/70">
                        {name}
                      </li>
                    ))}
                  </ul>
                </section>

                <section data-evidence-kind="testimonial">
                  <h3 className="font-serif text-2xl text-navy">
                    {evidence.testimonials.heading}
                  </h3>
                  <div className="mt-6 grid gap-8 md:grid-cols-2">
                    {evidence.testimonials.items.map((testimonial) => (
                      <figure
                        key={testimonial.name}
                        className="border-t border-gold/30 pt-6"
                      >
                        <blockquote
                          lang={testimonial.language}
                          className="leading-relaxed text-muted-foreground"
                        >
                          &ldquo;{testimonial.quote}&rdquo;
                        </blockquote>
                        <figcaption className="mt-5">
                          <cite className="not-italic">
                            <span className="block font-medium text-navy">
                              {testimonial.name}
                            </span>
                            <span className="mt-1 block text-sm text-muted-foreground">
                              {testimonial.role}, {testimonial.organisation}
                            </span>
                          </cite>
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                </section>

                <section data-evidence-kind="case-study">
                  <h3 className="font-serif text-2xl text-navy">
                    {evidence.caseStudy.heading}
                  </h3>
                  <p className="mt-4 text-xs font-medium uppercase tracking-widest text-gold">
                    {evidence.caseStudy.label}
                  </p>
                  <h4 className="mt-3 font-serif text-xl text-navy">
                    {evidence.caseStudy.title}
                  </h4>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    {evidence.caseStudy.summary}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {evidence.caseStudy.limitation}
                  </p>
                  <Link
                    href={evidence.caseStudy.href}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-navy"
                  >
                    {evidence.caseStudy.label}
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </section>

                <section data-evidence-kind="methodology">
                  <h3 className="font-serif text-2xl text-navy">
                    {evidence.methodology.heading}
                  </h3>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    {evidence.methodology.introduction}
                  </p>
                  <ul className="mt-5 flex flex-col gap-3 border-l-2 border-gold pl-6">
                    {evidence.methodology.items.map((item) => (
                      <li key={item} className="leading-relaxed text-muted-foreground">
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </section>

            <section
              aria-labelledby={`${viewModel.id}-faq`}
              className="border-t border-border pt-9"
            >
              <h2
                id={`${viewModel.id}-faq`}
                className="font-serif text-3xl text-navy"
              >
                {viewModel.faq.heading}
              </h2>
              <dl className="mt-6 divide-y divide-border">
                {viewModel.faq.items.map((item) => (
                  <div key={item.id} className="py-6 first:pt-0">
                    <dt className="font-serif text-xl text-navy">
                      {item.question}
                    </dt>
                    <dd className="mt-3 leading-relaxed text-muted-foreground">
                      {item.answer}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>

            {viewModel.related.links.length > 0 && (
              <section
                aria-labelledby={`${viewModel.id}-related`}
                className="border-t border-border pt-9"
              >
                <h2
                  id={`${viewModel.id}-related`}
                  className="font-serif text-3xl text-navy"
                >
                  {viewModel.related.heading}
                </h2>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {viewModel.related.links.map((link) => (
                    <Link
                      key={link.id}
                      href={link.href}
                      className="flex items-center justify-between border border-border p-5"
                    >
                      {link.label}
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </Link>
                  ))}
                </div>
              </section>
            )}

            <section
              aria-label={viewModel.additionalActionsLabel}
              className="flex flex-col items-start gap-4 border-t border-border pt-9 sm:flex-row"
            >
              <Link
                href={viewModel.primaryCta.href}
                data-authority-cta="primary"
                className="inline-flex items-center gap-2 bg-navy px-6 py-3 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-gold hover:text-navy"
              >
                {viewModel.primaryCta.label}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              {viewModel.secondaryCta && (
                <Link
                  href={viewModel.secondaryCta.href}
                  data-authority-cta="secondary"
                  className="inline-flex items-center gap-2 border border-navy px-5 py-3 text-sm text-navy"
                >
                  {viewModel.secondaryCta.label}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              )}
            </section>
          </div>
        </div>
      </main>

      <footer className="bg-navy-deep px-6 py-12 text-white md:px-10 lg:px-20">
        <div className="mx-auto flex max-w-[1180px] flex-col gap-8 border-t border-white/10 pt-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-serif text-xl text-gold">B Solution</p>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/50">
              {ui.footer.tagline}
            </p>
          </div>
          <p className="text-xs text-white/40">{ui.footer.copyright}</p>
        </div>
      </footer>

      <script
        type="application/ld+json"
        data-production-authority-schema={viewModel.canonical}
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd({
            '@context': 'https://schema.org',
            '@graph': schemaGraph,
          }),
        }}
      />
    </>
  )
}
