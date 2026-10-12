import { notFound } from 'next/navigation';
import { blogPosts, formatPostDate, getTag, localize, readableTextColor } from '@/data/blog';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';
import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import { FiArrowLeft, FiArrowRight, FiCalendar, FiClock, FiList } from 'react-icons/fi';
import TableOfContents from '@/components/blog/TableOfContents';
import CodeBlock from '@/components/blog/CodeBlock';
import ShareBar from '@/components/blog/ShareBar';
import PostCard from '@/components/blog/PostCard';
import { getToc } from '@/lib/markdown';
import { routing } from '@/i18n/routing';
import { buildMetadata, localePath, SITE_URL } from '@/lib/seo';
import styles from '@/styles/blog-post.module.css';

type Props = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return routing.locales.flatMap((locale) => blogPosts.map((post) => ({ locale, slug: post.slug })));
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: 'Post Not Found' };

  const title = localize(post.title, locale);
  return buildMetadata({
    locale,
    path: `blog/${slug}`,
    title: `${title} | Bigbank Blog`,
    description: localize(post.description, locale),
    image: { url: post.image, alt: title },
    article: { publishedTime: post.date },
  });
}

// External links open in a new tab; in-page and site links stay put
const markdownComponents: Components = {
  a: ({ href = '', children }) =>
    /^https?:\/\//.test(href) ? (
      <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>
    ) : (
      <a href={href}>{children}</a>
    ),
  // eslint-disable-next-line @next/next/no-img-element
  img: ({ src, alt }) => <img src={typeof src === 'string' ? src : undefined} alt={alt ?? ''} loading="lazy" decoding="async" />,
};

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: 'blog' });
  const tag = getTag(post.tag);
  const title = localize(post.title, locale);
  const content = localize(post.content, locale);
  const toc = getToc(content);

  const url = `${SITE_URL}${localePath(locale, `blog/${post.slug}`)}`;

  // blogPosts is newest first: the one before is newer, the one after is older
  const index = blogPosts.findIndex((p) => p.slug === post.slug);
  const newer = blogPosts[index - 1];
  const older = blogPosts[index + 1];
  // Same tag first, then the rest by date; skip what the prev/next links already show
  const related = blogPosts
    .filter((p) => p.slug !== post.slug && p !== newer && p !== older)
    .sort((a, b) => Number(b.tag === post.tag) - Number(a.tag === post.tag))
    .slice(0, 2);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        headline: title,
        description: localize(post.description, locale),
        image: new URL(post.image, SITE_URL).href,
        datePublished: post.date,
        inLanguage: locale,
        mainEntityOfPage: url,
        url,
        author: { '@id': `${SITE_URL}/#person` },
        publisher: { '@id': `${SITE_URL}/#person` },
        keywords: tag.label,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Bigbank', item: `${SITE_URL}${localePath(locale)}` },
          { '@type': 'ListItem', position: 2, name: t('label'), item: `${SITE_URL}${localePath(locale, 'blog')}` },
          { '@type': 'ListItem', position: 3, name: title, item: url },
        ],
      },
    ],
  };

  return (
    <div className={styles.postPage}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <div className={`${styles.layout} ${toc.length ? styles.layoutWithToc : ''}`}>
        <article className={styles.article}>
          <div className={styles.actions}>
            <Link href={`/${locale}/blog`} className={styles.backButton}>
              <FiArrowLeft size={16} aria-hidden="true" />
              {t('back_to_all')}
            </Link>
            {toc.length > 0 && (
              <details className={styles.mobileToc}>
                <summary className={styles.mobileTocButton}>
                  <FiList size={16} aria-hidden="true" />
                  {t('toc')}
                </summary>
                <ul className={styles.mobileTocList}>
                  {toc.map((item) => (
                    <li key={item.id}>
                      <a href={`#${item.id}`}>{item.text}</a>
                    </li>
                  ))}
                </ul>
              </details>
            )}
          </div>

          <header className={styles.header}>
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.description}>{localize(post.description, locale)}</p>
            <div className={styles.meta}>
              <span
                className={styles.tag}
                style={{ background: tag.color, color: readableTextColor(tag.color) }}
              >
                {tag.label}
              </span>
              <span className={styles.metaItem}>
                <FiCalendar size={14} aria-hidden="true" />
                <time dateTime={post.date}>{formatPostDate(post.date, locale)}</time>
              </span>
              <span className={styles.metaItem}>
                <FiClock size={14} aria-hidden="true" />
                {t('read_time', { minutes: post.readTime })}
              </span>
            </div>
          </header>

          <Image
            src={post.image}
            alt={title}
            width={1600}
            height={900}
            className={styles.cover}
            sizes="(max-width: 720px) 100vw, 640px"
            priority
          />

          <hr className={styles.divider} />

          <div className={styles.prose}>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeSlug]}
              components={{
                ...markdownComponents,
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                pre: ({ node, ...props }) => (
                  <CodeBlock {...props} copyLabel={t('copy')} copiedLabel={t('copied')} />
                ),
              }}
            >
              {content}
            </ReactMarkdown>
          </div>

          <ShareBar
            url={url}
            title={title}
            labels={{ share: t('share'), copyLink: t('copy_link'), copied: t('link_copied'), copyFailed: t('copy_failed'), more: t('share_more') }}
          />

          {(older || newer) && (
            <nav className={styles.postNav} aria-label={t('label')}>
              {older ? (
                <Link href={`/${locale}/blog/${older.slug}`} className={styles.postNavLink}>
                  <span className={styles.postNavLabel}>
                    <FiArrowLeft size={14} aria-hidden="true" />
                    {t('prev_post')}
                  </span>
                  <span className={styles.postNavTitle}>{localize(older.title, locale)}</span>
                </Link>
              ) : <span />}
              {newer && (
                <Link href={`/${locale}/blog/${newer.slug}`} className={`${styles.postNavLink} ${styles.postNavNext}`}>
                  <span className={styles.postNavLabel}>
                    {t('next_post')}
                    <FiArrowRight size={14} aria-hidden="true" />
                  </span>
                  <span className={styles.postNavTitle}>{localize(newer.title, locale)}</span>
                </Link>
              )}
            </nav>
          )}

          {related.length > 0 && (
            <section className={styles.related} aria-labelledby="related-title">
              <h2 id="related-title" className={styles.relatedTitle}>{t('related')}</h2>
              <div className={styles.relatedGrid}>
                {related.map((p) => (
                  <PostCard key={p.id} post={p} headingLevel="h3" />
                ))}
              </div>
            </section>
          )}
        </article>

        {toc.length > 0 && (
          <aside className={styles.sidebar}>
            <TableOfContents items={toc} title={t('toc')} />
          </aside>
        )}
      </div>
    </div>
  );
}
