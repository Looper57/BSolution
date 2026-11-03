"use client"

import Link from 'next/link'
import { PROFILE_INQUIRY_KEY } from '@/lib/available-lawyers'

/** A plain link to the contact page that also hands over the profile reference (see PROFILE_INQUIRY_KEY). */
export function ProfileInquiryLink({ href, profileRef, className, children }: { href: string; profileRef: string; className?: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() => {
        try {
          sessionStorage.setItem(PROFILE_INQUIRY_KEY, profileRef)
        } catch {
          // Storage blocked: the contact form simply opens empty.
        }
      }}
    >
      {children}
    </Link>
  )
}
