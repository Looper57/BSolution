import { publishedEditorialSections } from '@/lib/editorial/registry'
import type { PublishedEditorialEntry } from '@/lib/editorial/publication'
import type { EditorialLandingPath } from '@/lib/editorial/targets'

export function EditorialSections({ entries }: { entries: readonly PublishedEditorialEntry[] }) {
  return <>{entries.map(entry => (
    <section key={entry.id} data-editorial-id={entry.id} className="border-t border-border pt-9">
      <h2 className="text-balance font-serif text-3xl leading-tight text-navy">{entry.heading}</h2>
      <div className="mt-6 flex flex-col gap-5">
        {entry.paragraphs.map((paragraph, index) => <p key={index} className="text-base leading-relaxed text-muted-foreground md:text-lg">{paragraph}</p>)}
      </div>
    </section>
  ))}</>
}

// Server component passed into the client shell as a ReactNode. Only this
// route's rendered text is sent; the manifest/research never enter its JS.
export function PublishedLandingEditorial({ basePath }: { basePath: EditorialLandingPath }) {
  const entries = publishedEditorialSections(basePath, 'en')
  if (!entries.length) return null
  return <div className="bg-white px-6 py-20 lg:px-16 lg:py-28"><div className="mx-auto flex max-w-[1200px] flex-col gap-14"><EditorialSections entries={entries} /></div></div>
}
