import PageClient from './page-client'
import { PublishedLandingEditorial } from '@/components/published-editorial'

export default function Page() {
  return <PageClient editorialSupplement={<PublishedLandingEditorial basePath="/hire-in-house-counsel" />} />
}

// Calendar-approved text is evaluated again after this bounded cache interval.
export const revalidate = 60
