import { getEmployerSitemapEntries } from '../../lib/sitemap-entries'
import { authorityEvidenceRegistry } from '../../lib/authority-pages/evidence'
import { productionAuthorityPages } from '../../lib/authority-pages/registry'
import { localizedPath } from '../../lib/i18n/config'
import type { WorkflowContext } from './workflow'

export function editorialContext(asOf: string): WorkflowContext {
  return {
    asOf,
    allowedPaths: new Set(getEmployerSitemapEntries().map(entry => new URL(entry.url).pathname)),
    pageIds: new Map(productionAuthorityPages.map(page => [localizedPath(page.locale, page.basePath), page.id])),
    evidence: authorityEvidenceRegistry,
  }
}
