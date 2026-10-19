'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import PostCard from '@/components/blog/PostCard';
import { blogPosts, getTag } from '@/data/blog';
import styles from '@/styles/blog.module.css';

const PAGE_SIZE = 12;

export default function BlogPreview() {
  const t = useTranslations('blog');
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
    window.scrollTo({ top: 0 });
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
            {posts.map((post, index) => (
              <PostCard key={post.id} post={post} priority={index < 3} />
            ))}
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
