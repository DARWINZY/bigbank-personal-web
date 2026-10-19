import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import PostCard from '@/components/blog/PostCard';
import { blogPosts } from '@/data/blog';
import styles from '@/styles/home.module.css';
import uiStyles from '@/styles/ui.module.css';

const latest = blogPosts.slice(0, 3);

export default function LatestPosts() {
  const t = useTranslations('home.latest');
  const locale = useLocale();

  if (latest.length === 0) return null;

  return (
    <section className="section" aria-labelledby="latest-title">
      <div className="container">
        <div className={styles.sectionHead}>
          <h2 id="latest-title" className={styles.sectionTitle}>{t('title')}</h2>
          <Link href={`/${locale}/blog`} className={`${uiStyles.chevronLink} ${styles.viewAll}`}>
            {t('view_all')}
          </Link>
        </div>
        {/* Phones: a row to swipe through instead of three tall cards */}
        <div className={styles.postRow}>
          {latest.map((post) => (
            <PostCard key={post.id} post={post} headingLevel="h3" className={styles.postItem} />
          ))}
        </div>
      </div>
    </section>
  );
}
