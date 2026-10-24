import type { Metadata } from 'next'

// Only generic, segment-wide defaults belong here. This layout also wraps
// /positions/[slug] (including its not-found boundary for an unknown job
// slug) — listing-specific fields like canonical/hreflang/OpenGraph live in
// app/positions/page.tsx instead, since a layout-level `alternates` is
// inherited by every child, including a 404 (2026-08-22 Ahrefs audit).
export const metadata: Metadata = {
  title: 'Legal Jobs and Mandates',
  description: 'Open legal positions and examples of the General Counsel, CLO, partner and senior legal mandates B Solution fills across Europe and the Middle East.',
}

export default function PositionsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
