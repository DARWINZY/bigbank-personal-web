import { blogPosts, getTag } from '@/data/blog';
import { localePath, SITE_URL } from '@/lib/seo';

// RSS feed of the Thai posts, written to out/feed.xml at build time.
export const dynamic = 'force-static';

const escape = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function GET() {
  const items = blogPosts
    .map((post) => {
      const url = `${SITE_URL}${localePath('th', `blog/${post.slug}`)}`;
      return `    <item>
      <title>${escape(post.title.th)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escape(post.description.th)}</description>
      <category>${escape(getTag(post.tag).label)}</category>
      <pubDate>${new Date(`${post.date}T00:00:00+07:00`).toUTCString()}</pubDate>
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>บทความของบิ๊กแบงค์</title>
    <link>${SITE_URL}${localePath('th', 'blog')}</link>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <description>บทความ ประสบการณ์ และความรู้จากบิ๊กแบงค์ ณัฐพงษ์ พงษ์นุเคราะห์ศิริ</description>
    <language>th</language>
${items}
  </channel>
</rss>
`;

  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
