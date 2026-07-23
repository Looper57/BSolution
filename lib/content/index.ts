import { caseStudies } from './case-studies'
import { countries } from './countries'
import { industries } from './industries'
import { practices } from './practices'
import { services } from './services'
import type { Entity } from './types'
import { authorityDetailKinds } from '@/lib/routes'

export const authorityEntities: Entity[] = [
  ...services,
  ...practices,
  ...industries,
  ...countries,
  ...caseStudies,
]

export function getEntity(section: string, slug: string) {
  const kind = authorityDetailKinds[section as keyof typeof authorityDetailKinds]
  return authorityEntities.find((entity) => entity.kind === kind && entity.slug === slug)
}

export function getEntitiesForSection(section: string) {
  const kind = authorityDetailKinds[section as keyof typeof authorityDetailKinds]
  return authorityEntities.filter((entity) => entity.kind === kind)
}

export const authoritySections = Object.keys(authorityDetailKinds)
