'use client';

import { useMemo, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import AnimatedSection from '@/components/ui/AnimatedSection';
import SectionTitle from '@/components/ui/SectionTitle';
import { blogPosts, getTag, localize, readableTextColor } from '@/data/blog';
import styles from '@/styles/blog.module.css';

const dateLocales: Record<string, string> = { th: 'th-TH', en: 'en-GB', lo: 'lo-LA', zh: 'zh-CN' };

export default function BlogPreview() {
  const t = useTranslations('blog');
  const locale = useLocale();
  const [activeTag, setActiveTag] = useState<string | null>(null);

  // Only offer filters for tags that actually have posts
  const usedTags = useMemo(
    () => [...new Set(blogPosts.map((p) => p.tag))].map((id) => getTag(id)),
    []
  );
  const posts = activeTag ? blogPosts.filter((p) => p.tag === activeTag) : blogPosts;

  const formatDate = (date: string) =>
    new Intl.DateTimeFormat(dateLocales[locale] ?? locale, {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(new Date(date));

  return (
    <section className={`section ${styles.blog}`} id="blog">
      <div className="container">
        <AnimatedSection>
          <SectionTitle
            label={t('label')}
            title={t('title')}
            description={t('description')}
          />
        </AnimatedSection>

        {usedTags.length > 1 && (
          <div className={styles.filters} role="group" aria-label={t('filter_label')}>
            <button
              className={`${styles.filterChip} ${activeTag === null ? styles.filterChipActive : ''}`}
              onClick={() => setActiveTag(null)}
              aria-pressed={activeTag === null}
            >
              {t('filter_all')}
            </button>
            {usedTags.map((tag) => (
              <button
                key={tag.id}
                className={`${styles.filterChip} ${activeTag === tag.id ? styles.filterChipActive : ''}`}
                onClick={() => setActiveTag(tag.id)}
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
                      alt=""
                      fill
                      sizes="(max-width: 600px) 100vw, (max-width: 1100px) 50vw, 25vw"
                      priority={index < 4}
                    />
                    <span
                      className={styles.blogCardTag}
                      style={{ background: tag.color, color: readableTextColor(tag.color) }}
                    >
                      {tag.label}
                    </span>
                  </div>
                  <h3 className={styles.blogCardTitle}>{localize(post.title, locale)}</h3>
                  <p className={styles.blogCardDesc}>{localize(post.description, locale)}</p>
                  <p className={styles.blogCardMeta}>
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                    <span aria-hidden="true">/</span>
                    <span>{post.readTime} {t('min_read')}</span>
                  </p>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
