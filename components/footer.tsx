"use client"

import Link from 'next/link'
import { Linkedin } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { cn } from '@/lib/utils'
import { Logo } from '@/components/logo'
import { localizedPath } from '@/lib/i18n/config'
import { legalPath } from '@/lib/routes'

export function Footer() {
  const { language, setLanguage, t } = useLanguage()

  const navigation = {
    company: [
      { href: '/about', label: 'nav.about' },
      { href: '/services', label: 'nav.services' },
      { href: '/positions', label: 'nav.positions' },
      { href: '/contact', label: 'nav.contact' },
    ],
    services: [
      { href: '/clients', label: 'nav.clients' },
      { href: '/candidates', label: 'nav.candidates' },
    ]
  }

  return (
    <footer className="bg-navy-deep relative" role="contentinfo">
      {/* Top gold accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      
      {/* Main Footer */}
      <div className="max-w-[1440px] mx-auto px-8 lg:px-20 py-20 lg:py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-10">
          {/* Brand */}
          <div className="lg:col-span-5">
            <Link href={localizedPath(language, '/')} className="inline-block">
              <Logo />
            </Link>
            <p className="mt-8 text-[15px] text-white/35 leading-[1.8] max-w-sm">
              {t('footer.tagline')}
            </p>
            
            {/* Language */}
            <div className="flex items-center gap-1 mt-12 text-[11px] font-medium tracking-[0.12em] uppercase">
              <button
                onClick={() => setLanguage('en')}
                aria-label="Switch to English"
                className={cn(
                  "px-2 py-1.5 transition-colors",
                  language === 'en' 
                    ? "text-gold" 
                    : "text-white/30 hover:text-white/55"
                )}
              >
                English
              </button>
              <span className="text-white/10 mx-1" aria-hidden="true">/</span>
              <button
                onClick={() => setLanguage('cs')}
                aria-label="Přepnout na češtinu"
                className={cn(
                  "px-2 py-1.5 transition-colors",
                  language === 'cs' 
                    ? "text-gold" 
                    : "text-white/30 hover:text-white/55"
                )}
              >
                Čeština
              </button>
              <span className="text-white/10 mx-1" aria-hidden="true">/</span>
              <button onClick={() => setLanguage('de')} aria-label="Auf Deutsch umschalten" className={cn("px-2 py-1.5 transition-colors", language === 'de' ? "text-gold" : "text-white/30 hover:text-white/55")}>Deutsch</button>
              <span className="text-white/10 mx-1" aria-hidden="true">/</span>
              <button onClick={() => setLanguage('pl')} aria-label="Przełącz na polski" className={cn("px-2 py-1.5 transition-colors", language === 'pl' ? "text-gold" : "text-white/30 hover:text-white/55")}>Polski</button>
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2">
            <h4 className="text-[11px] font-semibold text-white/50 uppercase tracking-[0.2em] mb-8">
              {t('footer.company')}
            </h4>
            <ul className="space-y-5">
              {navigation.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={localizedPath(language, link.href)}
                    className="text-[14px] text-white/35 hover:text-gold transition-colors"
                  >
                    {t(link.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-2">
            <h4 className="text-[11px] font-semibold text-white/50 uppercase tracking-[0.2em] mb-8">
              {t('footer.services')}
            </h4>
            <ul className="space-y-5">
              {navigation.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={localizedPath(language, link.href)}
                    className="text-[14px] text-white/35 hover:text-gold transition-colors"
                  >
                    {t(link.label)}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={localizedPath(language, '/services')}
                  className="text-[14px] text-white/35 hover:text-gold transition-colors"
                >
                  Executive Search
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h4 className="text-[11px] font-semibold text-white/50 uppercase tracking-[0.2em] mb-8">
              {t('footer.connect')}
            </h4>
            <div className="space-y-4 text-[14px] text-white/35">
              <p>B Solution s.r.o.</p>
              <p>Prague, Czech Republic</p>
              <p className="pt-4">
                <a 
                  href="tel:+420272681206" 
                  className="hover:text-gold transition-colors"
                >
                  +420 272 681 206
                </a>
              </p>
              <p>
                <a 
                  href="mailto:info@bsolution.eu" 
                  className="hover:text-gold transition-colors"
                >
                  info@bsolution.eu
                </a>
              </p>
            </div>
            
            <a
              href="https://www.linkedin.com/company/bsolution"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 mt-10 text-[13px] text-white/35 hover:text-gold transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={16} strokeWidth={1.5} />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/5">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-20 py-7 flex flex-col sm:flex-row items-center justify-between gap-5">
          <p className="text-[12px] text-white/20 tracking-[0.02em]">
            {t('footer.copyright')}
          </p>
          <div className="flex items-center gap-10 text-[12px] text-white/20 tracking-[0.02em]">
            <Link href={legalPath(language, '/privacy')} className="hover:text-white/45 transition-colors">
              {t('footer.privacy')}
            </Link>
            <Link href={legalPath(language, '/cookies')} className="hover:text-white/45 transition-colors">
              {t('footer.cookies')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
