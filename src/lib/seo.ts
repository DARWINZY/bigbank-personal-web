import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';

export const SITE_URL = 'https://bigbank.nightbears.co';
export const SITE_NAME = 'Bigbank';

const ogLocales: Record<string, string> = { th: 'th_TH', en: 'en_US', lo: 'lo_LA', zh: 'zh_CN' };

/** `('th', 'blog/x')` → `/th/blog/x/` (the site is exported with trailing slashes). */
export function localePath(locale: string, path = ''): string {
  const clean = path.replace(/^\/+|\/+$/g, '');
  return `/${locale}/${clean ? `${clean}/` : ''}`;
}

interface PageMetadataInput {
  locale: string;
  /** Path after the locale, e.g. `about` or `blog/2b-kmutt`; empty for the home page. */
  path?: string;
  title: string;
  description: string;
  /** Defaults to the locale's share card in `public/og/`. */
  image?: { url: string; width?: number; height?: number; alt?: string };
  article?: { publishedTime: string };
}

/**
 * Full metadata for one page. Next merges metadata shallowly, so every page sets its own
 * canonical, hreflang, Open Graph and Twitter fields instead of inheriting the home page's.
 */
export function buildMetadata({ locale, path = '', title, description, image, article }: PageMetadataInput): Metadata {
  const url = localePath(locale, path);
  const ogImage = image ?? { url: `/og/${locale}.png`, width: 1200, height: 630, alt: title };
  const languages: Record<string, string> = Object.fromEntries(
    routing.locales.map((l) => [l, localePath(l, path)])
  );
  languages['x-default'] = localePath(routing.defaultLocale, path);

  const common = {
    url,
    title,
    description,
    siteName: SITE_NAME,
    locale: ogLocales[locale] ?? locale,
    alternateLocale: routing.locales.filter((l) => l !== locale).map((l) => ogLocales[l]),
    images: [ogImage],
  };

  return {
    title,
    description,
    alternates: { canonical: url, languages, types: { 'application/rss+xml': '/feed.xml' } },
    openGraph: article
      ? { ...common, type: 'article', publishedTime: article.publishedTime, authors: ['Nattapong Pongnukrohsiri'] }
      : { ...common, type: 'website' },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage.url],
    },
  };
}
