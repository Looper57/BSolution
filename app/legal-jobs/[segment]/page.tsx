import { notFound } from 'next/navigation'
import { legalJobsMetadata, legalJobsPage } from '@/lib/legal-jobs-route'

export const revalidate = 3600

export async function generateMetadata({ params }: { params: Promise<{ segment: string }> }) {
  return legalJobsMetadata('en', (await params).segment)
}

/** A closed advert is gone from the feed and answers 404, never a stale advert. */
export default async function Page({ params }: { params: Promise<{ segment: string }> }) {
  const page = await legalJobsPage('en', (await params).segment)
  if (!page) notFound()
  return page
}
