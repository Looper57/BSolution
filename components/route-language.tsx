'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { localeFromPathname } from '@/lib/i18n/config'

// The shared root layout survives client navigation. Keep its language in
// sync when a link crosses locales; the server still sets initial HTML.
export function RouteLanguage() {
  const pathname = usePathname()
  useEffect(() => {
    document.documentElement.lang = localeFromPathname(pathname)
  }, [pathname])
  return null
}
