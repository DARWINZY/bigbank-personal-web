import { notFound } from 'next/navigation';
import { blogPosts, formatPostDate, getTag, localize, readableTextColor } from '@/data/blog';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';
import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import { FiArrowLeft, FiCalendar, FiClock, FiList } from 'react-icons/fi';
import TableOfContents from '@/components/blog/TableOfContents';
import { getToc } from '@/lib/markdown';
import { routing } from '@/i18n/routing';
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

  return {
    title: `${localize(post.title, locale)} | Bigbank Blog`,
    description: localize(post.description, locale),
    alternates: { canonical: `https://bigbank.nightbears.co/${locale}/blog/${slug}` },
    openGraph: { images: [post.image] },
  };
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

  return (
    <div className={styles.postPage}>
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
              components={markdownComponents}
            >
              {content}
            </ReactMarkdown>
          </div>
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
