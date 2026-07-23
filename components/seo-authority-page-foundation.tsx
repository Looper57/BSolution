import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { absoluteUrl, localizedPath } from '@/lib/i18n/config'
import {
  buildSeoPageStructuredData,
  getEligibleInternalLinks,
  isPagePublishable,
  resolveValidatedParent,
  resolveValidatedTarget,
  validateSeoPageRegistry,
  type SeoCanonicalRoute,
  type SeoPageDefinition,
} from '@/lib/seo-pages'
import { serializeJsonLd } from '@/lib/structured-data'

interface SeoAuthorityPageFoundationProps {
  page: SeoPageDefinition
  registry: readonly SeoPageDefinition[]
  canonicalRoutes: readonly SeoCanonicalRoute[]
}

export function SeoAuthorityPageFoundation({
  page,
  registry,
  canonicalRoutes,
}: SeoAuthorityPageFoundationProps) {
  const registryValidation = validateSeoPageRegistry(registry, canonicalRoutes)
  if (!registryValidation.valid) {
    throw new Error(`Invalid SEO page registry: ${registryValidation.errors.map((error) => error.message).join(' ')}`)
  }
  if (!isPagePublishable(page, registry, canonicalRoutes)) {
    throw new Error(`SEO page ${page.id} is not approved for public rendering.`)
  }

  const parent = resolveValidatedParent(page, registry, canonicalRoutes)
  const primaryCtaHref = resolveValidatedTarget(page, page.primaryCta.target, registry, canonicalRoutes)
  if (!parent || !primaryCtaHref) throw new Error(`SEO page ${page.id} has an unresolved required destination.`)

  const relatedLinks = getEligibleInternalLinks(page, registry, canonicalRoutes)
  const secondaryCtas = page.secondaryCtas.map((cta) => ({
    cta,
    href: resolveValidatedTarget(page, cta.target, registry, canonicalRoutes),
  }))
  if (secondaryCtas.some(({ href }) => !href)) {
    throw new Error(`SEO page ${page.id} has an unresolved secondary CTA.`)
  }
  const schema = buildSeoPageStructuredData(page, registry, canonicalRoutes)

  return (
    <main id="main-content" className="bg-background text-foreground">
      <section className="bg-navy px-6 pb-20 pt-32 text-white md:px-10 md:pb-28 lg:px-20">
        <div className="mx-auto max-w-[1180px]">
          <nav aria-label={page.rendererLabels.breadcrumbNavigation} className="flex flex-wrap items-center gap-2 text-xs text-white/50">
            <Link href={localizedPath(page.locale, '/')}>{page.rendererLabels.home}</Link>
            <span aria-hidden="true">/</span>
            <Link href={parent.href}>{parent.label}</Link>
            <span aria-hidden="true">/</span>
            <span className="text-white/80">{page.h1}</span>
          </nav>
          <p className="mt-14 text-xs font-medium uppercase tracking-[0.25em] text-gold">{parent.label}</p>
          <h1 className="mt-5 max-w-4xl text-balance font-serif text-4xl font-normal leading-tight md:text-6xl">
            {page.h1}
          </h1>
          <p className="mt-7 max-w-3xl text-pretty text-lg leading-relaxed text-white/70 md:text-xl">
            {page.proposition}
          </p>
          <Link
            href={primaryCtaHref}
            className="mt-9 inline-flex items-center gap-2 border border-gold px-5 py-3 text-xs font-semibold uppercase tracking-widest text-gold transition-colors hover:bg-gold hover:text-navy"
          >
            {page.primaryCta.label}<ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <div className="mx-auto max-w-[1180px] px-6 py-16 md:px-10 md:py-24 lg:px-0">
        <section aria-labelledby={`${page.id}-audience`} className="max-w-3xl">
          <h2 id={`${page.id}-audience`} className="font-serif text-3xl text-navy">{page.audience}</h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">{page.searchIntent}</p>
        </section>

        <div className="mt-14 flex flex-col gap-14">
          {page.sections.map((section) => (
            <section key={section.id} data-section-type={section.type} className="border-t border-border pt-9">
              <h2 className="text-balance font-serif text-3xl leading-tight text-navy">{section.heading}</h2>
              <div className="mt-6 flex flex-col gap-5">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-base leading-relaxed text-muted-foreground md:text-lg">{paragraph}</p>
                ))}
                {section.items && section.items.length > 0 && (
                  <ul className="flex flex-col gap-3 border-l-2 border-gold pl-6">
                    {section.items.map((item) => <li key={item} className="leading-relaxed text-muted-foreground">{item}</li>)}
                  </ul>
                )}
              </div>
            </section>
          ))}
        </div>

        {relatedLinks.length > 0 && (
          <section aria-labelledby={`${page.id}-related`} className="mt-14 border-t border-border pt-9">
            <h2 id={`${page.id}-related`} className="font-serif text-3xl text-navy">{page.rendererLabels.related}</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {relatedLinks.map((link) => (
                <Link key={link.id} href={link.href} className="flex items-center justify-between border border-border p-5">
                  {link.anchorText}<ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </section>
        )}

        {secondaryCtas.length > 0 && (
          <section aria-label={page.rendererLabels.additionalActions} className="mt-14 flex flex-wrap gap-4 border-t border-border pt-9">
            {secondaryCtas.map(({ cta, href }) => (
              <Link key={cta.id} href={href!} className="inline-flex items-center gap-2 border border-navy px-5 py-3 text-sm text-navy">
                {cta.label}<ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            ))}
          </section>
        )}
      </div>

      {schema && (
        <script
          type="application/ld+json"
          data-seo-foundation-schema={absoluteUrl(page.locale, page.basePath)}
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }}
        />
      )}
    </main>
  )
}
