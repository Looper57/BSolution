// Voluntary visitor report, not an inferred referrer, attribution cookie or traffic metric.
export const discoverySources = {
  google: { en: 'Google Search', de: 'Google-Suche', pl: 'Wyszukiwarka Google', cs: 'Vyhledávání Google' },
  'other-search': { en: 'Bing or another search engine', de: 'Bing oder eine andere Suchmaschine', pl: 'Bing lub inna wyszukiwarka', cs: 'Bing nebo jiný vyhledávač' },
  'ai-assistant': { en: 'An AI assistant (e.g. ChatGPT)', de: 'Ein KI-Assistent (z. B. ChatGPT)', pl: 'Asystent AI (np. ChatGPT)', cs: 'AI asistent (např. ChatGPT)' },
  linkedin: { en: 'LinkedIn', de: 'LinkedIn', pl: 'LinkedIn', cs: 'LinkedIn' },
  recommendation: { en: 'Personal recommendation', de: 'Persönliche Empfehlung', pl: 'Polecenie', cs: 'Osobní doporučení' },
  other: { en: 'Other', de: 'Sonstiges', pl: 'Inne', cs: 'Jinak' },
} as const
export type DiscoverySource = keyof typeof discoverySources
export function discoverySource(value: unknown): DiscoverySource | undefined {
  return typeof value === 'string' && Object.prototype.hasOwnProperty.call(discoverySources, value)
    ? value as DiscoverySource : undefined
}
export const discoveryCopy = {
  en: { label: 'How did you hear about us? (optional)', empty: 'Prefer not to say' },
  de: { label: 'Wie sind Sie auf uns aufmerksam geworden? (optional)', empty: 'Keine Angabe' },
  pl: { label: 'Skąd dowiedzieli się Państwo o nas? (opcjonalnie)', empty: 'Wolę nie podawać' },
  cs: { label: 'Jak jste se o nás dozvěděli? (nepovinné)', empty: 'Nechci uvádět' },
} as const
