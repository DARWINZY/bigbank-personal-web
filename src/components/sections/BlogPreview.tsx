'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import AnimatedSection from '@/components/ui/AnimatedSection';
import SectionTitle from '@/components/ui/SectionTitle';
import { blogPosts } from '@/data/blog';
import HoverImageReveal from '@/components/ui/HoverImageReveal';
import styles from '@/styles/blog.module.css';

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

        <div className={styles.blogList}>
          {blogPosts.map((post, index) => (
            <AnimatedSection key={post.id} delay={index * 0.1}>
              <Link href={`/${locale}/blog/${post.slug}`} className={styles.blogLinkWrapper} style={{ textDecoration: 'none', color: 'inherit' }}>
                <HoverImageReveal imageSrc={post.image} imageAlt={post.title[locale]}>
                  <div className={styles.blogListItem}>
                    <div className={styles.blogListMeta}>
                      <span className={styles.blogListCategory}>{post.category}</span>
                      <span>{post.date}</span>
                    </div>
                    <h3 className={styles.blogListTitle}>{post.title[locale]}</h3>
                    <div className={styles.blogListArrow}>
                      <FiArrowRight size={24} />
                    </div>
                  </div>
                </HoverImageReveal>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
