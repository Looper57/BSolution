"use client"

import Link from 'next/link'
import { useState, useEffect, useCallback } from 'react'
import { Menu, X } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { cn } from '@/lib/utils'
import { localizedPath } from '@/lib/i18n/config'

export function Header() {
  const { language, setLanguage, t } = useLanguage()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 10)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const navItems = [
    { href: '/services', label: 'nav.services' },
    { href: '/clients', label: 'nav.clients' },
    { href: '/candidates', label: 'nav.candidates' },
    { href: '/positions', label: 'nav.positions' },
    { href: '/about', label: 'nav.about' },
  ]

  return (
    <>
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-gold focus:text-navy focus:text-sm focus:font-medium"
      >
        Skip to main content
      </a>
      <header 
        role="banner"
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-colors",
          scrolled 
            ? "bg-navy/98 backdrop-blur-md" 
            : "bg-transparent"
        )}>
        {/* Thin gold accent line at very top */}
        <div className="h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" aria-hidden="true" />
      
      <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
        <div className="flex items-center justify-between min-h-[72px] lg:min-h-[88px] py-4 lg:py-5">
          {/* Home link - minimal text since logo is in hero image */}
          <Link href={localizedPath(language, '/')} className="flex items-center flex-shrink-0">
            <span className="text-[14px] lg:text-[15px] font-serif text-gold tracking-[0.06em]">B Solution</span>
          </Link>

          {/* Desktop Navigation - understated, secondary to logo */}
          <nav className="hidden lg:flex items-center gap-10 xl:gap-14" aria-label="Main navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={localizedPath(language, item.href)}
                className="relative text-[10px] font-normal text-white/40 hover:text-white/80 transition-colors uppercase tracking-[0.16em] py-2"
              >
                {t(item.label)}
              </Link>
            ))}
          </nav>

          {/* Desktop Right Side */}
          <div className="hidden lg:flex items-center gap-10">
            {/* Language Switcher - EN / CZ / DE / PL */}
            <div className="flex items-center text-[9px] font-normal tracking-[0.16em] uppercase">
              <button
                onClick={() => setLanguage('en')}
                aria-label="Switch to English"
                className={cn(
                  "px-1 py-1 transition-colors",
                  language === 'en' 
                    ? "text-gold/90" 
                    : "text-white/30 hover:text-white/50"
                )}
              >
                En
              </button>
              <span className="text-white/10 mx-1" aria-hidden="true">/</span>
              <button
                onClick={() => setLanguage('cs')}
                aria-label="Přepnout na češtinu"
                className={cn(
                  "px-1 py-1 transition-colors",
                  language === 'cs' 
                    ? "text-gold/90" 
                    : "text-white/30 hover:text-white/50"
                )}
              >
                Cz
              </button>
              <span className="text-white/10 mx-1" aria-hidden="true">/</span>
              <button
                onClick={() => setLanguage('de')}
                aria-label="Auf Deutsch umschalten"
                className={cn(
                  "px-1 py-1 transition-colors",
                  language === 'de' 
                    ? "text-gold/90" 
                    : "text-white/30 hover:text-white/50"
                )}
              >
                De
              </button>
              <span className="text-white/10 mx-1" aria-hidden="true">/</span>
              <button
                onClick={() => setLanguage('pl')}
                aria-label="Przełącz na polski"
                className={cn(
                  "px-1 py-1 transition-colors",
                  language === 'pl' 
                    ? "text-gold/90" 
                    : "text-white/30 hover:text-white/50"
                )}
              >
                Pl
              </button>
            </div>

            {/* CTA Button - refined */}
            <Link 
              href={localizedPath(language, '/contact')}
              className="text-[9px] font-medium text-navy bg-gold/90 hover:bg-gold px-6 py-3 transition-all duration-300 uppercase tracking-[0.16em]"
            >
              {t('nav.cta')}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-navy-deep border-t border-white/5">
          <div className="px-8 py-10">
            <nav className="space-y-1" aria-label="Mobile navigation">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={localizedPath(language, item.href)}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-4 text-[14px] uppercase tracking-[0.1em] text-white/70 hover:text-gold transition-colors border-b border-white/5"
                >
                  {t(item.label)}
                </Link>
              ))}
              <Link
                href={localizedPath(language, '/contact')}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-4 text-[14px] uppercase tracking-[0.1em] text-white/70 hover:text-gold transition-colors border-b border-white/5"
              >
                {t('nav.contact')}
              </Link>
            </nav>
            
            {/* Mobile Language */}
            <div className="flex flex-wrap items-center gap-6 pt-10">
              <button
                onClick={() => setLanguage('en')}
                aria-label="Switch to English"
                className={cn(
                  "text-[12px] font-medium uppercase tracking-[0.12em] transition-colors",
                  language === 'en' ? "text-gold" : "text-white/40"
                )}
              >
                English
              </button>
              <button
                onClick={() => setLanguage('cs')}
                aria-label="Přepnout na češtinu"
                className={cn(
                  "text-[12px] font-medium uppercase tracking-[0.12em] transition-colors",
                  language === 'cs' ? "text-gold" : "text-white/40"
                )}
              >
                Čeština
              </button>
              <button
                onClick={() => setLanguage('de')}
                aria-label="Auf Deutsch umschalten"
                className={cn(
                  "text-[12px] font-medium uppercase tracking-[0.12em] transition-colors",
                  language === 'de' ? "text-gold" : "text-white/40"
                )}
              >
                Deutsch
              </button>
              <button
                onClick={() => setLanguage('pl')}
                aria-label="Przełącz na polski"
                className={cn(
                  "text-[12px] font-medium uppercase tracking-[0.12em] transition-colors",
                  language === 'pl' ? "text-gold" : "text-white/40"
                )}
              >
                Polski
              </button>
            </div>

            {/* Mobile CTA */}
            <Link 
              href={localizedPath(language, '/contact')} 
              onClick={() => setMobileMenuOpen(false)}
              className="block mt-10 text-center text-[11px] font-semibold text-navy bg-gold px-6 py-4 uppercase tracking-[0.12em]"
            >
              {t('nav.cta')}
            </Link>
          </div>
        </div>
      )}
    </header>
    </>
  )
}
