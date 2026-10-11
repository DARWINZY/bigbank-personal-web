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

/** Posts whose page is a hand-built component instead of `content`. */
export const CUSTOM_POST_SLUGS = ['2b-kmutt'];

export const blogPosts: BlogPost[] = [...(postsData as BlogPost[])].sort((a, b) =>
  b.date.localeCompare(a.date)
);

export const blogTags: BlogTag[] = tagsData as BlogTag[];

const FALLBACK_TAG_COLOR = '#64748B';

export function getTag(id: string, tags: BlogTag[] = blogTags): BlogTag {
  return tags.find((t) => t.id === id) ?? { id, label: id, color: FALLBACK_TAG_COLOR };
}

export function localize(text: LocalizedText, locale: string): string {
  return text[locale as Locale] || text.th;
}

/** Black or white, whichever reads better on the given hex background. */
export function readableTextColor(hex: string): string {
  const m = hex.replace('#', '').match(/^([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
  if (!m) return '#FFFFFF';
  const [r, g, b] = m.slice(1).map((v) => {
    const c = parseInt(v, 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance > 0.4 ? '#0F172A' : '#FFFFFF';
}
