'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import PostCard from '@/components/blog/PostCard';
import AnimatedSection from '@/components/ui/AnimatedSection';
import TextReveal from '@/components/ui/TextReveal';
import { blogPosts } from '@/data/blog';
import styles from '@/styles/home.module.css';

const latest = blogPosts.slice(0, 3);

export default function LatestPosts() {
  const t = useTranslations('home.latest');
  const locale = useLocale();

  if (latest.length === 0) return null;

  return (
    <section className={`section ${styles.latest}`} aria-labelledby="latest-title">
      <div className="container">
        <div className={styles.sectionHead}>
          <h2 id="latest-title" className={styles.sectionTitle}>
            <TextReveal text={t('title')} />
          </h2>
          <Link href={`/${locale}/blog`} className={styles.viewAll}>{t('view_all')}</Link>
        </div>
        {/* Phones: a swipeable row instead of three tall cards */}
        <div className={styles.postRow}>
          {latest.map((post, index) => (
            <AnimatedSection key={post.id} delay={index * 0.12} tilt className={styles.postItem}>
              <PostCard post={post} headingLevel="h3" />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
