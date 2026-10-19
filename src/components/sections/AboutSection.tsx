import { useTranslations } from 'next-intl';
import Image from 'next/image';
import SectionTitle from '@/components/ui/SectionTitle';
import { projects } from '@/data/projects';
import styles from '@/styles/about.module.css';

// Counted from the portfolio data, so the numbers stay true as entries are added
const projectCount = projects.length;
const awardCount = projects.filter((p) => p.award).length;

/** Apple-style bento: gray tiles for the photo, the intro and four big numbers. */
export default function AboutSection() {
  const t = useTranslations('about');
  const stats = [
    { value: String(projectCount), key: 'projects' },
    { value: String(awardCount), key: 'awards' },
    { value: t('stats.coding_value'), key: 'coding' },
    { value: t('stats.competing_value'), key: 'competing' },
  ];

  return (
    <section className={styles.about}>
      <div className="container">
        <SectionTitle as="h1" label={t('label')} title={t('title')} />

        <div className={styles.bentoGrid}>
          <div className={`${styles.tile} ${styles.tilePhoto}`}>
            <Image
              src="/images/about-photo.jpg"
              alt={t('title')}
              fill
              sizes="(max-width: 768px) 100vw, 500px"
            />
          </div>

          <div className={`${styles.tile} ${styles.tileIntro}`}>
            <p className={styles.aboutText}>{t('description1')}</p>
            <p className={styles.aboutText}>{t('description2')}</p>
          </div>

          {stats.map((stat) => (
            <div key={stat.key} className={`${styles.tile} ${styles.tileStat}`}>
              <p className={styles.statValue}>{stat.value}</p>
              <p className={styles.statLabel}>{t(`stats.${stat.key}`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
