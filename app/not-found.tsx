import Link from 'next/link'
import { headers } from 'next/headers'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { LanguageProvider } from '@/lib/language-context'
import { localizedPath, type Locale } from '@/lib/i18n/config'

const copy: Record<Locale, { title: string; description: string; action: string }> = {
  en: {
    title: 'Page not found',
    description: 'The page you are looking for does not exist or may have been moved.',
    action: 'Return to homepage',
  },
  cs: {
    title: 'Stránka nebyla nalezena',
    description: 'Stránka, kterou hledáte, neexistuje nebo mohla být přesunuta.',
    action: 'Zpět na hlavní stránku',
  },
  de: {
    title: 'Seite nicht gefunden',
    description: 'Die gesuchte Seite existiert nicht oder wurde möglicherweise verschoben.',
    action: 'Zur Startseite',
  },
  pl: {
    title: 'Nie znaleziono strony',
    description: 'Strona, której szukasz, nie istnieje lub mogła zostać przeniesiona.',
    action: 'Wróć na stronę główną',
  },
}

export default async function NotFound() {
  const pathname = (await headers()).get('x-bsolution-pathname') ?? '/'
  const segment = pathname.split('/')[1]
  const locale: Locale = segment === 'cs' || segment === 'de' || segment === 'pl' ? segment : 'en'
  const content = copy[locale]

  return (
    <LanguageProvider>
      <Header />
      <main id="main-content" className="flex min-h-[70vh] items-center bg-navy px-6 pb-24 pt-36 text-white">
        <div className="mx-auto w-full max-w-3xl text-center">
          <p className="eyebrow">404</p>
          <h1 className="mt-6 text-white">{content.title}</h1>
          <p className="mx-auto mt-6 max-w-2xl text-white/60">{content.description}</p>
          <Link href={localizedPath(locale, '/')} className="btn-primary mt-10">
            {content.action}
          </Link>
        </div>
      </main>
      <Footer />
    </LanguageProvider>
  )
}
