"use client"

import { LanguageProvider, useLanguage } from '@/lib/language-context'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

function PageHeader() {
  const { language } = useLanguage()
  
  return (
    <section className="bg-navy pt-32 pb-20 lg:pt-40 lg:pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h1 className="text-white">
            {language === 'en' ? 'Cookie Policy' : 'Zásady používání cookies'}
          </h1>
        </div>
      </div>
    </section>
  )
}

function ContentSection() {
  const { language } = useLanguage()
  
  return (
    <section className="bg-off-white py-16 lg:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="prose prose-lg prose-headings:font-serif prose-headings:text-navy prose-p:text-charcoal/80">
          {language === 'en' ? (
            <>
              <p className="text-lg text-charcoal/80 leading-relaxed">
                This Cookie Policy explains how B Solution s.r.o. uses cookies and similar tracking technologies on our website.
              </p>
              
              <h2 className="mt-10">What Are Cookies?</h2>
              <p>Cookies are small text files that are stored on your device when you visit a website. They help websites remember your preferences and improve your browsing experience.</p>
              
              <h2 className="mt-10">Types of Cookies We Use</h2>
              
              <h3 className="mt-6">Essential Cookies</h3>
              <p>These cookies are necessary for the website to function properly. They enable basic features like page navigation and access to secure areas.</p>
              
              <h3 className="mt-6">Analytics Cookies</h3>
              <p>We use analytics cookies to understand how visitors interact with our website. This helps us improve our services and user experience.</p>
              
              <h3 className="mt-6">Preference Cookies</h3>
              <p>These cookies remember your preferences, such as language settings, to provide a more personalized experience.</p>
              
              <h2 className="mt-10">Managing Cookies</h2>
              <p>You can control and manage cookies through your browser settings. Please note that disabling certain cookies may affect the functionality of our website.</p>
              
              <h2 className="mt-10">Contact Us</h2>
              <p>If you have questions about our use of cookies, please contact us at info@bsolution.eu.</p>
              
              <p className="mt-10 text-sm text-charcoal/60">Last updated: January 2026</p>
            </>
          ) : (
            <>
              <p className="text-lg text-charcoal/80 leading-relaxed">
                Tyto Zásady používání cookies vysvětlují, jak B Solution s.r.o. používá cookies a podobné sledovací technologie na našich webových stránkách.
              </p>
              
              <h2 className="mt-10">Co jsou cookies?</h2>
              <p>Cookies jsou malé textové soubory, které se ukládají na vaše zařízení při návštěvě webových stránek. Pomáhají webům zapamatovat si vaše preference a zlepšit váš zážitek z prohlížení.</p>
              
              <h2 className="mt-10">Typy cookies, které používáme</h2>
              
              <h3 className="mt-6">Nezbytné cookies</h3>
              <p>Tyto cookies jsou nezbytné pro správné fungování webových stránek. Umožňují základní funkce jako navigaci na stránce a přístup k zabezpečeným oblastem.</p>
              
              <h3 className="mt-6">Analytické cookies</h3>
              <p>Používáme analytické cookies k pochopení toho, jak návštěvníci interagují s našimi webovými stránkami. To nám pomáhá zlepšovat naše služby a uživatelský zážitek.</p>
              
              <h3 className="mt-6">Preferenční cookies</h3>
              <p>Tyto cookies si pamatují vaše preference, jako jsou jazyková nastavení, aby vám poskytly personalizovanější zážitek.</p>
              
              <h2 className="mt-10">Správa cookies</h2>
              <p>Můžete kontrolovat a spravovat cookies prostřednictvím nastavení vašeho prohlížeče. Upozorňujeme, že deaktivace některých cookies může ovlivnit funkčnost našich webových stránek.</p>
              
              <h2 className="mt-10">Kontaktujte nás</h2>
              <p>Máte-li dotazy ohledně našeho používání cookies, kontaktujte nás prosím na info@bsolution.eu.</p>
              
              <p className="mt-10 text-sm text-charcoal/60">Poslední aktualizace: leden 2026</p>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

function CookiesPage() {
  return (
    <>
      <Header />
      <main>
        <PageHeader />
        <ContentSection />
      </main>
      <Footer />
    </>
  )
}

export default function Page() {
  return (
    <LanguageProvider>
      <CookiesPage />
    </LanguageProvider>
  )
}
