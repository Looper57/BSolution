import { legalJobsMetadata, legalJobsPage } from '@/lib/legal-jobs-route'

export const revalidate = 3600

export function generateMetadata() {
  return legalJobsMetadata('en', null)
}

export default async function Page() {
  return legalJobsPage('en', null)
}
