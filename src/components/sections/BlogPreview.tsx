'use client';

import { useMemo, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { FiClock, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { blogPosts, formatPostDate, getTag, localize, readableTextColor } from '@/data/blog';
import styles from '@/styles/blog.module.css';

const PAGE_SIZE = 12;

export default function BlogPreview() {
  const t = useTranslations('blog');
  const locale = useLocale();
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  // Only offer filters for tags that actually have posts
  const usedTags = useMemo(
    () => [...new Set(blogPosts.map((p) => p.tag))].map((id) => getTag(id)),
    []
  );
  const filtered = activeTag ? blogPosts.filter((p) => p.tag === activeTag) : blogPosts;
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const posts = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const selectTag = (id: string | null) => {
    setActiveTag(id);
    setPage(1);
  };

  const goTo = (n: number) => {
    setPage(n);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className={styles.blog} id="blog">
      <div className="container">
        <h1 className={styles.pageTitle}>{t('label')}</h1>

        {usedTags.length > 1 && (
          <div className={styles.filters} role="group" aria-label={t('filter_label')}>
            <button
              className={`${styles.filterChip} ${activeTag === null ? styles.filterChipActive : ''}`}
              onClick={() => selectTag(null)}
              aria-pressed={activeTag === null}
            >
              {t('filter_all')}
            </button>
            {usedTags.map((tag) => (
              <button
                key={tag.id}
                className={`${styles.filterChip} ${activeTag === tag.id ? styles.filterChipActive : ''}`}
                onClick={() => selectTag(tag.id)}
                aria-pressed={activeTag === tag.id}
              >
                <span className={styles.filterDot} style={{ background: tag.color }} />
                {tag.label}
              </button>
            ))}
          </div>
        )}

        {posts.length === 0 ? (
          <p className={styles.empty}>{t('empty')}</p>
        ) : (
          <div className={styles.blogGrid}>
            {posts.map((post, index) => {
              const tag = getTag(post.tag);
              return (
                <Link key={post.id} href={`/${locale}/blog/${post.slug}`} className={styles.blogCard}>
                  <div className={styles.blogCardImage}>
                    <Image
                      src={post.image}
                      alt={localize(post.title, locale)}
                      fill
                      sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
                      priority={index < 3}
                    />
                    <span
                      className={styles.blogCardTag}
                      style={{ background: tag.color, color: readableTextColor(tag.color) }}
                    >
                      {tag.label}
                    </span>
                  </div>
                  <div className={styles.blogCardBody}>
                    <h2 className={styles.blogCardTitle}>{localize(post.title, locale)}</h2>
                    <p className={styles.blogCardDesc}>{localize(post.description, locale)}</p>
                    <div className={styles.blogCardMeta}>
                      <time dateTime={post.date}>{formatPostDate(post.date, locale)}</time>
                      <span className={styles.readTime}>
                        <FiClock size={14} aria-hidden="true" />
                        {t('read_time', { minutes: post.readTime })}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {pageCount > 1 && (
          <nav className={styles.pagination} aria-label={t('pagination')}>
            <button
              className={styles.pageBtn}
              onClick={() => goTo(page - 1)}
              disabled={page === 1}
              aria-label={t('prev_page')}
            >
              <FiChevronLeft size={18} />
            </button>
            {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                className={`${styles.pageBtn} ${n === page ? styles.pageBtnActive : ''}`}
                onClick={() => goTo(n)}
                aria-current={n === page ? 'page' : undefined}
              >
                {n}
              </button>
            ))}
            <button
              className={styles.pageBtn}
              onClick={() => goTo(page + 1)}
              disabled={page === pageCount}
              aria-label={t('next_page')}
            >
              <FiChevronRight size={18} />
            </button>
          </nav>
        )}
      </div>
    </section>
  );
}
