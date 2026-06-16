'use client';

import { useTranslations } from 'next-intl';
import { socialLinks } from '@/data/social';
import styles from '@/styles/footer.module.css';

const navItems = ['about', 'portfolio', 'blog', 'contact'] as const;

export default function Footer() {
  const t = useTranslations();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerInner}`}>
        <span className={styles.footerLogo}>Bigbank</span>

        <nav className={styles.footerLinks}>
          {navItems.map((item) => (
            <button
              key={item}
              className={styles.footerLink}
              onClick={() => scrollToSection(item)}
            >
              {t(`nav.${item}`)}
            </button>
          ))}
        </nav>

        <div className={styles.footerSocial}>
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.footerSocialLink}
              aria-label={link.label}
            >
              <link.icon size={18} />
            </a>
          ))}
        </div>

        <div className={styles.footerDivider} />

        <div className={styles.footerBottom}>
          <p className={styles.footerCopyright}>{t('footer.copyright')}</p>
          <p className={styles.footerBuiltWith}>{t('footer.built_with')}</p>
        </div>
      </div>
    </footer>
  );
}
