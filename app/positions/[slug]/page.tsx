import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getJobBySlug, getAllJobs } from '@/lib/jobs-data'
import { JobDetailClient } from './job-detail-client'

// Generate static params for all jobs (server-side)
export function generateStaticParams() {
  const jobs = getAllJobs()
  return jobs.map((job) => ({
    slug: job.slug,
  }))
}

// Generate metadata for each job
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params
  const job = getJobBySlug(resolvedParams.slug)
  
  if (!job) {
    return {
      title: 'Position Not Found',
    }
  }
  
  return {
    title: `${job.title} - ${job.location}`,
    description: job.shortDescription,
    alternates: {
      canonical: `https://www.bsolution.eu/positions/${resolvedParams.slug}`,
    },
    openGraph: {
      title: `${job.title} - ${job.location} | B Solution`,
      description: job.shortDescription,
      type: 'website',
      url: `https://www.bsolution.eu/positions/${resolvedParams.slug}`,
      images: [
        {
          url: 'https://www.bsolution.eu/images/og-image.jpg',
          width: 1200,
          height: 630,
          alt: `${job.title} - Legal Position at B Solution`,
        },
      ],
    },
  }
}

export default async function JobDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const job = getJobBySlug(resolvedParams.slug)
  
  if (!job) {
    notFound()
  }
  
  return <JobDetailClient job={job} />
}
