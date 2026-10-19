'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from '@/styles/header.module.css';

const navItems = ['about', 'portfolio', 'resume', 'blog', 'contact'] as const;

// Each language is named in itself, so a screen reader says "English", not "EN"
const languages = [
  { code: 'th', label: 'ไทย', name: 'ภาษาไทย' },
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'lo', label: 'ລາວ', name: 'ພາສາລາວ' },
] as const;

/** Apple-style global nav: one translucent bar that never changes as the page scrolls. */
export default function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isMenuOpen) return;
    document.body.style.overflow = 'hidden';
    // Escape closes the menu and puts focus back on the button that opened it
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setIsMenuOpen(false);
      menuButtonRef.current?.focus();
    };
    // The menu only exists below the desktop breakpoint; close it if the screen grows past it
    const desktop = window.matchMedia('(min-width: 834px)');
    const onBreakpoint = () => {
      if (desktop.matches) setIsMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    desktop.addEventListener('change', onBreakpoint);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      desktop.removeEventListener('change', onBreakpoint);
    };
  }, [isMenuOpen]);

  const switchLocale = (newLocale: string) => {
    const currentPath = pathname.replace(`/${locale}`, '');
    setIsMenuOpen(false);
    router.push(`/${newLocale}${currentPath || ''}`);
  };

  const isActive = (item: string) => pathname.startsWith(`/${locale}/${item}`);

  const renderLanguages = (className: string) => (
    <div className={className} role="group" aria-label={t('language')}>
      {languages.map((lang) => (
        <button
          key={lang.code}
          type="button"
          lang={lang.code}
          className={`${styles.langBtn} ${locale === lang.code ? styles.langBtnActive : ''}`}
          onClick={() => switchLocale(lang.code)}
          aria-label={lang.name}
          aria-pressed={locale === lang.code}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link href={`/${locale}`} className={styles.logo} onClick={() => setIsMenuOpen(false)}>
            Bigbank
          </Link>

          <nav className={styles.desktopNav}>
            {navItems.map((item) => (
              <Link
                key={item}
                href={`/${locale}/${item}`}
                className={`${styles.navLink} ${isActive(item) ? styles.navLinkActive : ''}`}
                aria-current={isActive(item) ? 'page' : undefined}
              >
                {t(item)}
              </Link>
            ))}
          </nav>

          <div className={styles.headerRight}>
            {renderLanguages(styles.langSwitcher)}

            <button
              ref={menuButtonRef}
              type="button"
              className={`${styles.menuButton} ${isMenuOpen ? styles.menuButtonOpen : ''}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={t('menu')}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              <span className={styles.menuLine} />
              <span className={styles.menuLine} />
            </button>
          </div>

          {/* Phones: a small card under the menu button, which turns into its close button */}
          <nav id="mobile-menu" className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuOpen : ''}`}>
            {navItems.map((item) => (
              <Link
                key={item}
                href={`/${locale}/${item}`}
                className={`${styles.mobileNavLink} ${isActive(item) ? styles.mobileNavLinkActive : ''}`}
                aria-current={isActive(item) ? 'page' : undefined}
                onClick={() => setIsMenuOpen(false)}
              >
                {t(item)}
              </Link>
            ))}
            {renderLanguages(styles.mobileLang)}
          </nav>
        </div>
      </header>

      <div
        className={`${styles.mobileOverlay} ${isMenuOpen ? styles.mobileOverlayOpen : ''}`}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden="true"
      />
    </>
  );
}
