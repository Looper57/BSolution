import {
  AUTHORITY_RELATIONSHIP_TYPES,
  type AuthorityRelationship,
  type ProductionAuthorityRecord,
} from './types'
import {
  productionAuthorityCanonicalRoutes,
  productionAuthorityRegistry,
  productionAuthorityRelationships,
} from './registry'
import { authorityEvidenceRegistry } from './evidence'
import { validateProductionAuthorityRegistry } from './validation'

export function validateAuthorityRelationships(
  relationships: readonly AuthorityRelationship[],
  registry: readonly ProductionAuthorityRecord[],
): { valid: boolean; errors: string[] } {
  const errors: string[] = []
  if (!validateProductionAuthorityRegistry(registry).valid) {
    errors.push('Production authority registry is invalid.')
  }
  const ids = new Set<string>()
  const edges = new Set<string>()
  const routes = new Map(productionAuthorityCanonicalRoutes.map((route) => [route.id, route]))
  const evidence = new Set(authorityEvidenceRegistry.map((item) => item.id))

  for (const relationship of relationships) {
    if (!relationship.id || ids.has(relationship.id)) errors.push(`Duplicate relationship ID ${relationship.id}.`)
    ids.add(relationship.id)
    const source = registry.find((record) => record.page.id === relationship.sourcePageId)
    if (!source || !registry.includes(source)) errors.push(`Orphan source ${relationship.sourcePageId}.`)
    if (!AUTHORITY_RELATIONSHIP_TYPES.includes(relationship.relationship)) {
      errors.push(`Unsupported relationship type ${relationship.relationship}.`)
    }
    if (!relationship.anchor.trim() || !relationship.publicationEligible) {
      errors.push(`Relationship ${relationship.id} is not publication eligible.`)
    }
    if (source && source.page.locale !== relationship.locale) {
      errors.push(`Relationship ${relationship.id} has a locale mismatch.`)
    }
    const targetKey = relationship.target.kind === 'route'
      ? relationship.target.routeId
      : relationship.target.kind === 'faq'
        ? relationship.target.faqId
        : relationship.target.evidenceId
    const edge = `${relationship.sourcePageId}:${targetKey}`
    if (edges.has(edge)) errors.push(`Duplicate relationship edge ${edge}.`)
    edges.add(edge)

    if (relationship.target.kind === 'route') {
      const route = routes.get(relationship.target.routeId)
      if (!route || route.locale !== relationship.locale) {
        errors.push(`Unresolved canonical route ${relationship.target.routeId}.`)
      }
      if (route?.basePath === '/legal-executive-search') {
        errors.push(`Relationship ${relationship.id} targets a redirect.`)
      }
    } else if (relationship.target.kind === 'faq') {
      const faqId = relationship.target.faqId
      if (!source?.editorial.faqs.some((faq) => faq.id === faqId)) {
        errors.push(`FAQ relationship ${relationship.id} is not visible on its source page.`)
      }
    } else if (!evidence.has(relationship.target.evidenceId)) {
      errors.push(`Unresolved evidence ${relationship.target.evidenceId}.`)
    }
    if (
      relationship.evidenceRequirement
      && !evidence.has(relationship.evidenceRequirement)
    ) errors.push(`Unresolved evidence requirement ${relationship.evidenceRequirement}.`)
  }

  for (const record of registry) {
    const pageRelationships = relationships.filter(
      (item) => item.sourcePageId === record.page.id,
    )
    const required = ['parent', 'breadcrumb', 'case-study', 'methodology', 'contact', 'candidate-path']
    for (const type of required) {
      if (!pageRelationships.some((item) => item.relationship === type)) {
        errors.push(`Page ${record.page.id} is missing ${type}.`)
      }
    }
    if (
      pageRelationships.filter((item) => item.relationship === 'faq').length
      !== record.editorial.faqs.length
    ) errors.push(`Page ${record.page.id} has an incomplete FAQ graph.`)
  }
  return { valid: errors.length === 0, errors }
}

export function validateProductionAuthorityRelationships() {
  return validateAuthorityRelationships(
    productionAuthorityRelationships,
    productionAuthorityRegistry,
  )
}
