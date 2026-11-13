import PageClient from './page-client'
import { PublishedLandingEditorial } from '@/components/published-editorial'

export default function Page() {
  return <PageClient editorialSupplement={<PublishedLandingEditorial basePath="/legal-recruitment-europe" />} />
}
