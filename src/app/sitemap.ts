import { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { blogPosts } from '@/data/blog';
import { localePath, SITE_URL } from '@/lib/seo';

export const dynamic = 'force-static';

const PAGES = ['', 'about', 'portfolio', 'resume', 'blog', 'contact'];

/** Every language version of a path, listed on each entry as hreflang alternates. */
function languages(path: string) {
  return Object.fromEntries(routing.locales.map((l) => [l, `${SITE_URL}${localePath(l, path)}`]));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const latestPost = blogPosts[0]?.date;
  const entries: MetadataRoute.Sitemap = [];

  for (const path of PAGES) {
    for (const locale of routing.locales) {
      entries.push({
        url: `${SITE_URL}${localePath(locale, path)}`,
        // Only the blog index has a meaningful date; build time would be a false signal
        ...(path === 'blog' && latestPost ? { lastModified: latestPost } : {}),
        changeFrequency: path === 'blog' ? 'weekly' : 'monthly',
        priority: path === '' ? 1 : 0.8,
        alternates: { languages: languages(path) },
      });
    }
  }

  for (const post of blogPosts) {
    const path = `blog/${post.slug}`;
    for (const locale of routing.locales) {
      entries.push({
        url: `${SITE_URL}${localePath(locale, path)}`,
        lastModified: post.date,
        changeFrequency: 'yearly',
        priority: locale === routing.defaultLocale ? 0.7 : 0.5,
        alternates: { languages: languages(path) },
      });
    }
  }

  return entries;
}
