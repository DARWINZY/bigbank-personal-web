/**
 * Years are stored in the Thai Buddhist era (e.g. "2569"). Thai readers see them as is;
 * everyone else gets the Gregorian year ("2026").
 */
export function displayYear(year: string, locale: string): string {
  const be = Number(year);
  if (locale === 'th' || !Number.isFinite(be)) return year;
  return String(be - 543);
}
