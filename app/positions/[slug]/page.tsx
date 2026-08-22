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
    // This path calls notFound() below and renders the 404 boundary. Two
    // gaps here (2026-08-22 Ahrefs audit): an empty/title-only metadata
    // object doesn't override the root layout's global
    // `robots: { index: true }`; and, more seriously, app/positions/layout.tsx
    // sets a hardcoded canonical + hreflang cluster pointing at the real
    // /positions listing — without an explicit override here, an unknown
    // slug's 404 page rendered that listing's canonical and full hreflang
    // cluster as if the 404 URL were a genuine member of it.
    return {
      title: 'Position Not Found',
      robots: { index: false, follow: true },
      alternates: {},
    }
  }
  
  return {
    title: `${job.title} - ${job.location}`,
    description: job.shortDescription,
    alternates: {
      canonical: `https://www.bsolution.eu/positions/${resolvedParams.slug}`,
      languages: {
        en: `https://www.bsolution.eu/positions/${resolvedParams.slug}`,
        cs: `https://www.bsolution.eu/cs/positions/${resolvedParams.slug}`,
        'x-default': `https://www.bsolution.eu/positions/${resolvedParams.slug}`,
      },
    },
    openGraph: {
      title: `${job.title} - ${job.location} | B Solution`,
      description: job.shortDescription,
      type: 'website',
      locale: 'en_GB',
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
