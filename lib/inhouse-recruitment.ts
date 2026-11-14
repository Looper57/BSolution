import { absoluteUrl } from '@/lib/i18n/config'
import { inHouseRecruitmentLocales, inHouseRecruitmentPath } from '@/lib/routes'

export function inHouseRecruitmentAlternates(locale: typeof inHouseRecruitmentLocales[number]): { canonical: string; languages: Record<string, string> } {
  return {
    canonical: absoluteUrl(locale, inHouseRecruitmentPath),
    languages: {
      ...Object.fromEntries(inHouseRecruitmentLocales.map(language => [language, absoluteUrl(language, inHouseRecruitmentPath)])),
      'x-default': absoluteUrl('en', inHouseRecruitmentPath),
    },
  }
}
