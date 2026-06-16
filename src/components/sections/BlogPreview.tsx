'use client';

import { useTranslations, useLocale } from 'next-intl';
import { FiArrowRight, FiBookOpen } from 'react-icons/fi';
import AnimatedSection from '@/components/ui/AnimatedSection';
import SectionTitle from '@/components/ui/SectionTitle';
import { blogPosts } from '@/data/blog';
import styles from '@/styles/blog.module.css';
import uiStyles from '@/styles/ui.module.css';

export default function BlogPreview() {
  const t = useTranslations('blog');
  const locale = useLocale() as 'th' | 'en' | 'lo' | 'zh';

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

        <div className={styles.blogGrid}>
          {blogPosts.map((post, index) => (
            <AnimatedSection key={post.id} delay={index * 0.1}>
              <article className={uiStyles.blogCard}>
                <div className={uiStyles.blogCardImage}>
                  <div className={styles.blogPlaceholder}>
                    <FiBookOpen />
                  </div>
                </div>
                <div className={uiStyles.blogCardContent}>
                  <div className={uiStyles.blogCardMeta}>
                    <span className={uiStyles.blogCardCategory}>{post.category}</span>
                    <span>•</span>
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime} {t('min_read')}</span>
                  </div>
                  <h3 className={uiStyles.blogCardTitle}>{post.title[locale]}</h3>
                  <p className={uiStyles.blogCardDesc}>{post.description[locale]}</p>
                  <span className={uiStyles.blogCardLink}>
                    {t('read_more')} <FiArrowRight size={14} />
                  </span>
                </div>
              </article>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
