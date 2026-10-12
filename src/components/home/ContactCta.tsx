'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { socialLinks } from '@/data/social';
import styles from '@/styles/home.module.css';
import uiStyles from '@/styles/ui.module.css';

const instagram = socialLinks.find((link) => link.name === 'Instagram');

export default function ContactCta() {
  const t = useTranslations('home.cta');
  const locale = useLocale();

  return (
    <section className={styles.cta} aria-labelledby="cta-title">
      <div className="container">
        <div className={styles.ctaBox}>
        <div>
          <h2 id="cta-title" className={styles.ctaTitle}>{t('title')}</h2>
          <p className={styles.ctaText}>{t('text')}</p>
        </div>
        <div className={styles.ctaActions}>
          <Link href={`/${locale}/contact`} className={`${uiStyles.btn} ${uiStyles.btnPrimary}`}>
            {t('button')}
          </Link>
          {instagram && (
            <a
              href={instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${uiStyles.btn} ${uiStyles.btnSecondary}`}
            >
              <instagram.icon size={16} />
              {instagram.name}
            </a>
          )}
        </div>
        </div>
      </div>
    </section>
  );
}
