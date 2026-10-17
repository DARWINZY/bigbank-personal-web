'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '@/styles/header.module.css';

const navItems = ['about', 'portfolio', 'resume', 'blog', 'contact'] as const;

const languages = [
  { code: 'th', label: 'ไทย', name: 'Thai' },
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'lo', label: 'ລາວ', name: 'Lao' },
  { code: 'zh', label: '中文', name: 'Chinese' },
] as const;

export default function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isMobileOpen) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileOpen(false);
    };
    // The menu only exists below the desktop breakpoint; close it if the screen grows past it
    const desktop = window.matchMedia('(min-width: 901px)');
    const onBreakpoint = () => {
      if (desktop.matches) setIsMobileOpen(false);
    };
    window.addEventListener('keydown', onKey);
    desktop.addEventListener('change', onBreakpoint);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      desktop.removeEventListener('change', onBreakpoint);
    };
  }, [isMobileOpen]);

  const switchLocale = (newLocale: string) => {
    const currentPath = pathname.replace(`/${locale}`, '');
    router.push(`/${newLocale}${currentPath || ''}`);
  };

  const isActive = (item: string) => pathname.startsWith(`/${locale}/${item}`);

  const renderLanguages = (className: string) => (
    <div className={className}>
      {languages.map((lang) => (
        <button
          key={lang.code}
          className={`${styles.langBtn} ${locale === lang.code ? styles.langBtnActive : ''}`}
          onClick={() => switchLocale(lang.code)}
          aria-label={`Switch to ${lang.name}`}
          aria-pressed={locale === lang.code}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );

  return (
    <>
      <header className={`${styles.header} ${isScrolled ? styles.headerScrolled : ''}`}>
        <div className={styles.headerInner}>
          <Link href={`/${locale}`} className={styles.logo}>
            Bigbank
          </Link>

          {/* Desktop Navigation */}
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

          {/* Right Controls */}
          <div className={styles.headerRight}>
            {renderLanguages(styles.langSwitcher)}

            {/* Hamburger */}
            <button
              className={`${styles.hamburger} ${isMobileOpen ? styles.hamburgerOpen : ''}`}
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMobileOpen}
              aria-controls="mobile-menu"
            >
              <span className={styles.hamburgerLine} />
              <span className={styles.hamburgerLine} />
              <span className={styles.hamburgerLine} />
            </button>
          </div>

          {/* Mobile Menu: a small card under the hamburger, which turns into its close button */}
          <AnimatePresence>
            {isMobileOpen && (
              <motion.div
                id="mobile-menu"
                className={styles.mobileMenu}
                initial={{ opacity: 0, y: -6, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.97 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
              >
                {navItems.map((item) => (
                  <Link
                    key={item}
                    href={`/${locale}/${item}`}
                    className={`${styles.mobileNavLink} ${isActive(item) ? styles.navLinkActive : ''}`}
                    aria-current={isActive(item) ? 'page' : undefined}
                    onClick={() => setIsMobileOpen(false)}
                  >
                    {t(item)}
                  </Link>
                ))}
                {renderLanguages(styles.mobileLang)}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            className={styles.mobileOverlay}
            onClick={() => setIsMobileOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
