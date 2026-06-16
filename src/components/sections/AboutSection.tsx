'use client';

import { useTranslations } from 'next-intl';
import AnimatedSection from '@/components/ui/AnimatedSection';
import SectionTitle from '@/components/ui/SectionTitle';
import styles from '@/styles/about.module.css';

const stats = [
  { value: '10+', key: 'projects' },
  { value: '2+', key: 'experience' },
  { value: '8+', key: 'clients' },
  { value: '100%', key: 'satisfaction' },
];

export default function AboutSection() {
  const t = useTranslations('about');

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

        <div className={styles.aboutGrid}>
          <AnimatedSection direction="left" delay={0.1}>
            <div className={styles.aboutImageWrapper}>
              <div className={styles.aboutImage}>
                <img
                  src="/images/about-photo.jpg"
                  alt="Bigbank — About Me"
                  width={400}
                  height={500}
                />
              </div>
              <div className={styles.aboutImageAccent} />
            </div>
          </AnimatedSection>

          <AnimatedSection direction="right" delay={0.2}>
            <div className={styles.aboutContent}>
              <p className={styles.aboutText}>{t('description1')}</p>
              <p className={styles.aboutText}>{t('description2')}</p>

              <div className={styles.aboutStats}>
                {stats.map((stat, index) => (
                  <AnimatedSection key={stat.key} delay={0.3 + index * 0.1}>
                    <div className={styles.aboutStat}>
                      <div className={styles.aboutStatNumber}>{stat.value}</div>
                      <div className={styles.aboutStatLabel}>
                        {t(`stats.${stat.key}`)}
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
