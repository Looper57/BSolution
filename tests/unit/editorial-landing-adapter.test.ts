import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import InHouse from '../../app/hire-in-house-counsel/page'
import Leader from '../../app/hire-legal-leader/page'
import Firm from '../../app/law-firm-recruitment/page'
import Europe from '../../app/legal-recruitment-europe/page'
import { publishedEditorialSections } from '../../lib/editorial/registry'
import { EDITORIAL_LANDING_PATHS, getEditorialTargets } from '../../lib/editorial/targets'
import { stageEditorialRelease } from '../../scripts/editorial/release'
import { contentRevision, type EditorialTask, type WorkflowContext } from '../../scripts/editorial/workflow'

vi.mock('next/navigation', () => ({ usePathname: () => '/', useRouter: () => ({ push: vi.fn() }) }))
vi.mock('@/lib/editorial/registry', async importOriginal => ({ ...await importOriginal<typeof import('../../lib/editorial/registry')>(), publishedEditorialSections: vi.fn() }))

const pages = [
  { Page: InHouse, path: '/hire-in-house-counsel', cta: 'Build Your In-House Legal Team' },
  { Page: Leader, path: '/hire-legal-leader', cta: 'Need to Hire a Legal Leader?' },
  { Page: Firm, path: '/law-firm-recruitment', cta: 'Strengthen Your Practice' },
  { Page: Europe, path: '/legal-recruitment-europe', cta: 'Start Your European Legal Search' },
]
beforeEach(() => vi.mocked(publishedEditorialSections).mockReset())

describe('server editorial slots in existing client landing pages', () => {
  it.each(pages)('renders a real server-provided supplement inside main before the enquiry on $path', ({ Page, path, cta }) => {
    vi.mocked(publishedEditorialSections).mockReturnValue([{ id: 'synthetic-slot', targetPath: path, locale: 'en', heading: 'Synthetic employer brief', paragraphs: ['Synthetic public paragraph.'], contentUpdatedAt: '2026-11-13', reviewedRevision: 'a'.repeat(64), entryHash: 'b'.repeat(64) }])
    const html = renderToStaticMarkup(createElement(Page))
    expect(publishedEditorialSections).toHaveBeenCalledWith(path, 'en')
    const section = html.indexOf('data-editorial-id="synthetic-slot"')
    expect(section).toBeGreaterThan(html.indexOf('<main'))
    expect(section).toBeLessThan(html.indexOf('</main>'))
    expect(html.indexOf(cta)).toBeGreaterThan(section)
    expect(html.match(/data-editorial-id="synthetic-slot"/g)).toHaveLength(1)
    expect(html).toContain('<p class="text-base leading-relaxed text-muted-foreground md:text-lg">Synthetic public paragraph.</p>')
  })
  it.each(pages)('does not invent an empty or unreviewed supplement on $path', ({ Page }) => {
    vi.mocked(publishedEditorialSections).mockReturnValue([])
    const html = renderToStaticMarkup(createElement(Page))
    expect(html).not.toContain('data-editorial-id=')
    expect(html).not.toContain('Synthetic employer brief')
  })
  it('stages only explicitly wired English landing targets and blocks existing headings', () => {
    const targets = getEditorialTargets()
    const context: WorkflowContext = { asOf: '2026-11-13', allowedPaths: new Set(targets.keys()), pageIds: new Map(), evidence: [] }
    for (const path of EDITORIAL_LANDING_PATHS) {
      const task: EditorialTask = { id: 'synthetic-landing', status: 'approved', audience: 'in-house', locale: 'en', situation: 'Synthetic requirement', targetPath: path, rationale: 'Fixture', nextAction: 'Discuss scope', nextReview: '2026-12-13', content: { title: 'Synthetic distinct editorial addition', body: 'Synthetic plain text.', sources: [], claims: [] } }
      task.review = { reviewer: 'synthetic-test-reviewer', reviewedAt: '2026-11-13', revision: contentRevision(task), factsChecked: true, noConfidentialData: true, noInventedExperience: true, usefulForEmployer: true, languageChecked: true, linksChecked: true }
      expect(stageEditorialRelease({ version: 1, tasks: [task] }, task.id, { version: 1, entries: [] }, context, targets).entries[0].targetPath).toBe(path)
      task.content!.title = targets.get(path)!.headings[0]; task.review.revision = contentRevision(task)
      expect(() => stageEditorialRelease({ version: 1, tasks: [task] }, task.id, { version: 1, entries: [] }, context, targets)).toThrow('duplicates an existing section')
      expect(targets.has('/de' + path)).toBe(false)
    }
    expect(targets.has('/for-companies')).toBe(false)
    expect(targets.has('/services/legal-executive-search')).toBe(false)
  })
})
