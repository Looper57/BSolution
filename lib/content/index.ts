import { caseStudies } from './case-studies'
import { countries } from './countries'
import { industries } from './industries'
import { practices } from './practices'
import { services } from './services'
import type { Entity, EntityKind } from './types'

export const authorityEntities: Entity[] = [
  ...services,
  ...practices,
  ...industries,
  ...countries,
  ...caseStudies,
]

const sectionKind: Record<string, EntityKind> = {
  services: 'service',
  'practice-areas': 'practice',
  industries: 'industry',
  locations: 'country',
  'case-studies': 'caseStudy',
  insights: 'insight',
}

export function getEntity(section: string, slug: string) {
  const kind = sectionKind[section]
  return authorityEntities.find((entity) => entity.kind === kind && entity.slug === slug)
}

export function getEntitiesForSection(section: string) {
  const kind = sectionKind[section]
  return authorityEntities.filter((entity) => entity.kind === kind)
}

export const authoritySections = Object.keys(sectionKind)
