'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import AnimatedSection from '@/components/ui/AnimatedSection';
import ProjectCard from '@/components/ui/ProjectCard';
import { projects } from '@/data/projects';
import styles from '@/styles/home.module.css';

const highlights = projects.filter((p) => p.highlight);

export default function FeaturedWork() {
  const t = useTranslations('home.featured');
  const locale = useLocale();

  if (highlights.length === 0) return null;

  return (
    <section className={`section ${styles.featured}`} aria-labelledby="featured-title">
      <div className="container">
        <div className={styles.sectionHead}>
          <h2 id="featured-title" className={styles.sectionTitle}>{t('title')}</h2>
          <Link href={`/${locale}/portfolio`} className={styles.viewAll}>{t('view_all')}</Link>
        </div>
        <div className={styles.featuredGrid}>
          {highlights.map((project, index) => (
            <AnimatedSection key={project.id} delay={index * 0.08}>
              <ProjectCard project={project} sizes="(max-width: 480px) 96px, (max-width: 900px) 720px, 400px" />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
