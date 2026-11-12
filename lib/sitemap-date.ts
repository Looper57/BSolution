/** A feed's wall-clock timestamp need not include its timezone. Use the
 * supplied calendar date, which the sitemap protocol accepts on its own,
 * rather than inventing a timezone or the current date. Invalid values omit
 * this optional field without breaking the sitemap. */
export function sitemapDate(value: string | null | undefined): string | undefined {
  if (!value) return undefined
  const match = /^(\d{4}-\d{2}-\d{2})(?:[T ](?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|[+-](?:[01]\d|2[0-3]):[0-5]\d)?)?$/.exec(value)
  if (!match) return undefined
  const date = new Date(`${match[1]}T00:00:00Z`)
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === match[1] ? match[1] : undefined
}
