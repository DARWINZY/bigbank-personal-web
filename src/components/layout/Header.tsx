'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '@/styles/header.module.css';

const navItems = ['about', 'portfolio', 'blog', 'contact'] as const;

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
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  const switchLocale = (newLocale: string) => {
    const currentPath = pathname.replace(`/${locale}`, '');
    router.push(`/${newLocale}${currentPath || ''}`);
  };

  const scrollToSection = (id: string) => {
    setIsMobileOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className={`${styles.header} ${isScrolled ? styles.headerScrolled : ''}`}>
        <div className={styles.headerInner}>
          <a href={`/${locale}`} className={styles.logo} aria-label="Home">
            Bigbank
          </a>

          {/* Desktop Navigation */}
          <nav className={styles.desktopNav}>
            {navItems.map((item) => (
              <button
                key={item}
                className={styles.navLink}
                onClick={() => scrollToSection(item)}
              >
                {t(item)}
              </button>
            ))}
          </nav>

          {/* Right Controls */}
          <div className={styles.headerRight}>
            {/* Language Switcher */}
            <div className={styles.langSwitcher}>
              <button
                className={`${styles.langBtn} ${locale === 'th' ? styles.langBtnActive : ''}`}
                onClick={() => switchLocale('th')}
                aria-label="Switch to Thai"
              >
                ไทย
              </button>
              <button
                className={`${styles.langBtn} ${locale === 'en' ? styles.langBtnActive : ''}`}
                onClick={() => switchLocale('en')}
                aria-label="Switch to English"
              >
                EN
              </button>
              <button
                className={`${styles.langBtn} ${locale === 'lo' ? styles.langBtnActive : ''}`}
                onClick={() => switchLocale('lo')}
                aria-label="Switch to Lao"
              >
                ລາວ
              </button>
              <button
                className={`${styles.langBtn} ${locale === 'zh' ? styles.langBtnActive : ''}`}
                onClick={() => switchLocale('zh')}
                aria-label="Switch to Chinese"
              >
                中文
              </button>
            </div>

            {/* Hamburger */}
            <button
              className={`${styles.hamburger} ${isMobileOpen ? styles.hamburgerOpen : ''}`}
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label="Toggle menu"
            >
              <span className={styles.hamburgerLine} />
              <span className={styles.hamburgerLine} />
              <span className={styles.hamburgerLine} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            className={`${styles.mobileOverlay} ${styles.mobileOverlayOpen}`}
            onClick={() => setIsMobileOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${isMobileOpen ? styles.mobileMenuOpen : ''}`}>
        <button
          className={styles.mobileCloseBtn}
          onClick={() => setIsMobileOpen(false)}
          aria-label="Close menu"
        >
          ✕
        </button>
        {navItems.map((item) => (
          <button
            key={item}
            className={styles.mobileNavLink}
            onClick={() => scrollToSection(item)}
          >
            {t(item)}
          </button>
        ))}
      </div>
    </>
  );
}
