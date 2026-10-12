import postsData from './blog-posts.json';
import tagsData from './blog-tags.json';

// Posts and tags live in JSON so the studio dashboard can edit them through the GitHub API.

export type Locale = 'th' | 'en' | 'lo' | 'zh';

/** Thai is required; other languages fall back to Thai when empty. */
export type LocalizedText = { th: string } & Partial<Record<Exclude<Locale, 'th'>, string>>;

export interface BlogTag {
  id: string;
  label: string;
  color: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: LocalizedText;
  description: LocalizedText;
  content: LocalizedText;
  date: string;
  readTime: number;
  tag: string;
  image: string;
}

export const blogPosts: BlogPost[] = [...(postsData as BlogPost[])].sort((a, b) =>
  b.date.localeCompare(a.date)
);

export const blogTags: BlogTag[] = tagsData as BlogTag[];

const FALLBACK_TAG_COLOR = '#64748B';

export function getTag(id: string, tags: BlogTag[] = blogTags): BlogTag {
  return tags.find((t) => t.id === id) ?? { id, label: id, color: FALLBACK_TAG_COLOR };
}

const dateLocales: Record<string, string> = { th: 'th-TH', en: 'en-GB', lo: 'lo-LA', zh: 'zh-CN' };

/** e.g. "11 ตุลาคม 2569" in Thai, "11 October 2026" in English. */
// Chrome ships without Lao date names and would format "lo" dates in English, which no longer
// matches the HTML Node built, so the page fails to hydrate. Spell Lao dates out instead.
const LAO_MONTHS = ['ມັງກອນ', 'ກຸມພາ', 'ມີນາ', 'ເມສາ', 'ພຶດສະພາ', 'ມິຖຸນາ', 'ກໍລະກົດ', 'ສິງຫາ', 'ກັນຍາ', 'ຕຸລາ', 'ພະຈິກ', 'ທັນວາ'];

export function formatPostDate(date: string, locale: string): string {
  // "2026-10-11" parses as UTC midnight; formatting in UTC keeps the same day everywhere
  if (locale === 'lo') {
    const d = new Date(date);
    return `${d.getUTCDate()} ${LAO_MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
  }
  return new Intl.DateTimeFormat(dateLocales[locale] ?? locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(date));
}

export function localize(text: LocalizedText, locale: string): string {
  return text[locale as Locale] || text.th;
}

const DARK_TEXT = '#0F172A';
const DARK_TEXT_LUMINANCE = 0.0091;

/** Dark or white text, whichever has the higher contrast ratio on the given hex background. */
export function readableTextColor(hex: string): string {
  const m = hex.replace('#', '').match(/^([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
  if (!m) return '#FFFFFF';
  const [r, g, b] = m.slice(1).map((v) => {
    const c = parseInt(v, 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  const onWhite = 1.05 / (luminance + 0.05);
  const onDark = (luminance + 0.05) / (DARK_TEXT_LUMINANCE + 0.05);
  return onDark > onWhite ? DARK_TEXT : '#FFFFFF';
}
