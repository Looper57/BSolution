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
            {language === 'en' ? 'Privacy Policy' : 'Ochrana osobních údajů'}
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
                B Solution s.r.o. (&quot;B Solution&quot;, &quot;we&quot;, &quot;us&quot;) is committed to protecting your privacy and personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you use our services or visit our website.
              </p>
              
              <h2 className="mt-10">Information We Collect</h2>
              <p>We may collect the following types of personal information:</p>
              <ul className="list-disc pl-6 space-y-2 text-charcoal/80">
                <li>Contact information (name, email address, phone number)</li>
                <li>Professional information (CV, work history, qualifications)</li>
                <li>Company and role information for client contacts</li>
                <li>Communication preferences</li>
              </ul>
              
              <h2 className="mt-10">How We Use Your Information</h2>
              <p>We use your personal data to:</p>
              <ul className="list-disc pl-6 space-y-2 text-charcoal/80">
                <li>Provide recruitment and executive search services</li>
                <li>Match candidates with relevant opportunities</li>
                <li>Communicate with you about our services</li>
                <li>Improve our services and website</li>
                <li>Comply with legal obligations</li>
              </ul>
              
              <h2 className="mt-10">Data Security</h2>
              <p>We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.</p>
              
              <h2 className="mt-10">Your Rights</h2>
              <p>Under applicable data protection laws, you have the right to access, rectify, erase, restrict processing, port, and object to the processing of your personal data. To exercise these rights, please contact us at info@bsolution.eu.</p>
              
              <h2 className="mt-10">Contact Us</h2>
              <p>If you have questions about this Privacy Policy or our data practices, please contact us at:</p>
              <p>B Solution s.r.o.<br />Prague, Czech Republic<br />Email: info@bsolution.eu</p>
              
              <p className="mt-10 text-sm text-charcoal/60">Last updated: January 2026</p>
            </>
          ) : (
            <>
              <p className="text-lg text-charcoal/80 leading-relaxed">
                B Solution s.r.o. (&quot;B Solution&quot;, &quot;my&quot;, &quot;nás&quot;) se zavazuje chránit vaše soukromí a osobní údaje. Tyto Zásady ochrany osobních údajů vysvětlují, jak shromažďujeme, používáme a chráníme vaše informace při využívání našich služeb nebo návštěvě našich webových stránek.
              </p>
              
              <h2 className="mt-10">Informace, které shromažďujeme</h2>
              <p>Můžeme shromažďovat následující typy osobních údajů:</p>
              <ul className="list-disc pl-6 space-y-2 text-charcoal/80">
                <li>Kontaktní údaje (jméno, e-mailová adresa, telefonní číslo)</li>
                <li>Profesní informace (životopis, pracovní historie, kvalifikace)</li>
                <li>Informace o společnosti a pozici pro kontakty klientů</li>
                <li>Komunikační preference</li>
              </ul>
              
              <h2 className="mt-10">Jak používáme vaše informace</h2>
              <p>Vaše osobní údaje používáme k:</p>
              <ul className="list-disc pl-6 space-y-2 text-charcoal/80">
                <li>Poskytování služeb recruitmentu a executive search</li>
                <li>Párování kandidátů s relevantními příležitostmi</li>
                <li>Komunikaci s vámi o našich službách</li>
                <li>Zlepšování našich služeb a webových stránek</li>
                <li>Plnění právních povinností</li>
              </ul>
              
              <h2 className="mt-10">Zabezpečení údajů</h2>
              <p>Implementujeme vhodná technická a organizační opatření k ochraně vašich osobních údajů před neoprávněným přístupem, změnou, zveřejněním nebo zničením.</p>
              
              <h2 className="mt-10">Vaše práva</h2>
              <p>Podle platných zákonů o ochraně osobních údajů máte právo na přístup, opravu, výmaz, omezení zpracování, přenos a námitku proti zpracování vašich osobních údajů. Pro uplatnění těchto práv nás prosím kontaktujte na info@bsolution.eu.</p>
              
              <h2 className="mt-10">Kontaktujte nás</h2>
              <p>Máte-li dotazy ohledně těchto Zásad ochrany osobních údajů nebo našich datových postupů, kontaktujte nás prosím na:</p>
              <p>B Solution s.r.o.<br />Praha, Česká republika<br />E-mail: info@bsolution.eu</p>
              
              <p className="mt-10 text-sm text-charcoal/60">Poslední aktualizace: leden 2026</p>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

function PrivacyPage() {
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
      <PrivacyPage />
    </LanguageProvider>
  )
}
