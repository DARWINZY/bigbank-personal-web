'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import AnimatedSection from '@/components/ui/AnimatedSection';
import SectionTitle from '@/components/ui/SectionTitle';
import { projects } from '@/data/projects';
import styles from '@/styles/about.module.css';

// Counted from the portfolio data, so the numbers stay true as entries are added
const projectCount = projects.length;
const awardCount = projects.filter((p) => p.award).length;

export default function AboutSection() {
  const t = useTranslations('about');
  const stats = [
    { value: String(projectCount), key: 'projects' },
    { value: String(awardCount), key: 'awards' },
    { value: t('stats.coding_value'), key: 'coding' },
    { value: t('stats.competing_value'), key: 'competing' },
  ];

  return (
    <section className={`section ${styles.about}`} id="about">
      <div className="container">
        <AnimatedSection>
          <SectionTitle
            label={t('label')}
            title={t('title')}
            align="left"
          />
        </AnimatedSection>

        <div className={styles.bentoGrid}>
          {/* Main Photo Cell */}
          <AnimatedSection delay={0.1} className={`${styles.bentoCell} ${styles.bentoCellPhoto}`}>
            <Image
              src="/images/about-photo.jpg"
              alt="Bigbank — About Me"
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </AnimatedSection>

          {/* Intro Cell */}
          <AnimatedSection delay={0.2} className={`${styles.bentoCell} ${styles.bentoCellIntro}`}>
            <p className={styles.aboutText}>{t('description1')}</p>
            <p className={styles.aboutText}>{t('description2')}</p>
          </AnimatedSection>

          {/* Stats Cells */}
          {stats.map((stat, index) => (
            <AnimatedSection key={stat.key} delay={0.3 + index * 0.1} className={`${styles.bentoCell} ${styles.bentoCellStat}`}>
              <div className={styles.aboutStatNumber}>{stat.value}</div>
              <div className={styles.aboutStatLabel}>
                {t(`stats.${stat.key}`)}
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
