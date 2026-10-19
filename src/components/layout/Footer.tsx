'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { socialLinks } from '@/data/social';
import styles from '@/styles/footer.module.css';

const navItems = ['about', 'portfolio', 'resume', 'blog', 'contact'] as const;

const languages = [
  { code: 'th', label: 'ภาษาไทย' },
  { code: 'en', label: 'English' },
  { code: 'lo', label: 'ພາສາລາວ' },
] as const;

/** Apple-style footer: a small link directory, then the legal line. */
export default function Footer() {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const currentPath = pathname.replace(`/${locale}`, '');

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerInner}`}>
        <div className={styles.directory}>
          <div>
            <h2 className={styles.columnTitle}>{t('footer.pages')}</h2>
            <ul className={styles.list}>
              {navItems.map((item) => (
                <li key={item}>
                  <Link href={`/${locale}/${item}`} className={styles.link}>
                    {t(`nav.${item}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className={styles.columnTitle}>{t('footer.follow')}</h2>
            <ul className={styles.list}>
              {socialLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer" className={styles.link}>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className={styles.columnTitle}>{t('footer.language')}</h2>
            <ul className={styles.list}>
              {languages.map((lang) => (
                <li key={lang.code}>
                  <Link
                    href={`/${lang.code}${currentPath}`}
                    hrefLang={lang.code}
                    lang={lang.code}
                    className={`${styles.link} ${lang.code === locale ? styles.linkCurrent : ''}`}
                    aria-current={lang.code === locale ? 'true' : undefined}
                  >
                    {lang.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.legal}>
          <p>{t('footer.copyright')}</p>
          <p>{t('footer.built_with')}</p>
        </div>
      </div>
    </footer>
  );
}
