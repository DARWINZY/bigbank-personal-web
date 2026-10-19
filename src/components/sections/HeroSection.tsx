import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/hero.module.css';
import uiStyles from '@/styles/ui.module.css';

/** Apple product-page hero: centered headline and actions, the photo standing on the section edge. */
export default function HeroSection() {
  const t = useTranslations('hero');
  const locale = useLocale();

  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={`container ${styles.heroText}`}>
        <p className={styles.greeting}>{t('greeting')}</p>
        <h1 id="hero-title" className={styles.heading}>
          <span className={styles.name}>{t('name')}</span>
          <span className={styles.fullName}>{t('fullName')}</span>
        </h1>
        <p className={styles.tagline}>
          {t('tagline1')} {t('tagline2')}
        </p>
        <p className={styles.description}>{t('description')}</p>
        <div className={styles.actions}>
          <Link href={`/${locale}/portfolio`} className={`${uiStyles.btn} ${uiStyles.btnPrimary}`}>
            {t('cta_primary')}
          </Link>
          <Link href={`/${locale}/contact`} className={`${uiStyles.btn} ${uiStyles.btnSecondary}`}>
            {t('cta_secondary')}
          </Link>
        </div>
      </div>

      <div className={styles.photo}>
        <Image
          src="/images/profile.png"
          alt={t('fullName')}
          width={1200}
          height={1600}
          sizes="(max-width: 480px) 256px, (max-width: 1024px) 330px, 390px"
          priority
        />
      </div>
    </section>
  );
}
