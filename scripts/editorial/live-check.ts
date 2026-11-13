import { sitemapDate } from '../../lib/sitemap-date'
import type { PublishedEditorialEntry } from '../../lib/editorial/publication'

function escapeRegex(text: string) { return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') }
function plainText(text: string) {
  if (/<[^>]*>/.test(text)) throw new Error('Unexpected markup in a plain-text editorial field')
  return text.replace(/&(#x[0-9a-f]+|#\d+|amp|lt|gt|quot|apos);/gi, (original, code: string) => {
    const names: Record<string, string> = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'" }
    if (!code.startsWith('#')) return names[code.toLowerCase()] ?? original
    const point = code.toLowerCase().startsWith('#x') ? parseInt(code.slice(2), 16) : parseInt(code.slice(1), 10)
    return point >= 0 && point <= 0x10ffff ? String.fromCodePoint(point) : original
  }).replace(/\s+/g, ' ').trim()
}

export function verifyEditorialHtml(html: string, entry: PublishedEditorialEntry) {
  const errors: string[] = []
  // React transport data and comments do not count as rendered page content.
  const document = html.replace(/<!--[\s\S]*?-->/g, '').replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, '')
  const canonical = [...document.matchAll(/<link\b[^>]*rel="canonical"[^>]*href="([^"]+)"[^>]*>/gi)].map(match => match[1])
  if (canonical.length !== 1 || canonical[0] !== `https://www.bsolution.eu${entry.targetPath}`) errors.push('canonical-mismatch')
  if (document.match(/<html\b[^>]*lang="([^"]+)"/i)?.[1] !== entry.locale) errors.push('language-mismatch')
  if (/<meta\b[^>]*name="robots"[^>]*content="[^"]*noindex/i.test(document)) errors.push('unexpected-noindex')
  const sections = [...document.matchAll(new RegExp(`<section\\b[^>]*data-editorial-id="${escapeRegex(entry.id)}"[^>]*>([\\s\\S]*?)<\\/section>`, 'g'))]
  if (sections.length !== 1) return [...errors, 'editorial-section-count']
  try {
    const headings = [...sections[0][1].matchAll(/<h2\b[^>]*>([\s\S]*?)<\/h2>/g)].map(match => plainText(match[1]))
    if (headings.length !== 1 || headings[0] !== entry.heading.replace(/\s+/g, ' ').trim()) errors.push('heading-mismatch')
    const paragraphs = [...sections[0][1].matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/g)].map(match => plainText(match[1]))
    if (JSON.stringify(paragraphs) !== JSON.stringify(entry.paragraphs.map(value => value.replace(/\s+/g, ' ').trim()))) errors.push('paragraph-mismatch')
  } catch { errors.push('unexpected-editorial-markup') }
  return errors
}

export function verifyEditorialSitemap(xml: string, entry: PublishedEditorialEntry) {
  const documents = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].filter(match => match[1].match(/<loc>([^<]+)<\/loc>/)?.[1] === `https://www.bsolution.eu${entry.targetPath}`)
  if (documents.length !== 1) return ['sitemap-document-count']
  const modified = documents[0][1].match(/<lastmod>(\d{4}-\d{2}-\d{2})(?:T[^<]*)?<\/lastmod>/)?.[1]
  return modified && sitemapDate(modified) === modified && modified >= entry.contentUpdatedAt ? [] : ['sitemap-modification-date']
}
