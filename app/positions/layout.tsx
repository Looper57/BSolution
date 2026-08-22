import type { Metadata } from 'next'

// Only generic, segment-wide defaults belong here. This layout also wraps
// /positions/[slug] (including its not-found boundary for an unknown job
// slug) — listing-specific fields like canonical/hreflang/OpenGraph live in
// app/positions/page.tsx instead, since a layout-level `alternates` is
// inherited by every child, including a 404 (2026-08-22 Ahrefs audit).
export const metadata: Metadata = {
  title: 'Current Opportunities',
  description: 'Explore current legal executive positions and career opportunities. General Counsel, CLO, partner, and senior legal roles across Europe.',
}

export default function PositionsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
