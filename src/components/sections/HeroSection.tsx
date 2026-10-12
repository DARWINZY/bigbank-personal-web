'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import FloatingParticles from '@/components/ui/FloatingParticles';
import RotatingText from '@/components/ui/RotatingText';
import TextReveal from '@/components/ui/TextReveal';
import styles from '@/styles/hero.module.css';
import uiStyles from '@/styles/ui.module.css';

export default function HeroSection() {
  const t = useTranslations('hero');

  const locale = useLocale();

  return (
    <section className={styles.hero} id="hero">
      {/* Background Glows */}
      <div className={styles.heroBg}>
        <div className={styles.heroBgGlow1} />
        <div className={styles.heroBgGlow2} />
        <FloatingParticles />
      </div>

      <div className={`container ${styles.heroContent}`}>
        {/* Text Content */}
        <div className={styles.heroText}>
          <motion.div
            className={styles.heroBadge}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className={styles.heroBadgeDot} />
            <span className={styles.heroBadgeText}>{t('badge')}</span>
          </motion.div>

          <motion.p
            className={styles.heroGreeting}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {t('greeting')}
          </motion.p>

          <motion.h1
            className={styles.heroName}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <span className={styles.heroNameAccent}>
              <TextReveal text={t('name')} delay={0.4} />
            </span>
            <div className={styles.heroFullName}>{t('fullName')}</div>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h2 className={styles.heroTagline}>
              {t('tagline1')}
              <br />
              <span className={styles.heroTaglineLight}>
                <RotatingText words={[t('tagline2'), 'Web Developer', 'Researcher', 'Problem Solver']} />
              </span>
            </h2>
          </motion.div>

          <motion.p
            className={styles.heroDesc}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            {t('description')}
          </motion.p>

          <motion.div
            className={styles.heroButtons}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <Link
              href={`/${locale}/portfolio`}
              className={`${uiStyles.btn} ${uiStyles.btnPrimary}`}
            >
              {t('cta_primary')}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className={`${uiStyles.btn} ${uiStyles.btnSecondary}`}
            >
              {t('cta_secondary')}
            </Link>
          </motion.div>
        </div>

        {/* Hero Image */}
        <motion.div
          className={styles.heroImageWrapper}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <motion.div 
            className={styles.heroImageContainer}
            animate={{
              y: [0, -10, 0],
              rotate: [-1.5, 1.5, -1.5],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ originY: 1 }}
          >
            <Image
              src="/images/profile.png"
              alt="Bigbank — Freelance Web Developer"
              width={440}
              height={587}
              sizes="(max-width: 480px) 168px, (max-width: 900px) 300px, 440px"
              priority
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className={styles.heroScroll}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        <span className={styles.heroScrollText}>{t('scroll_hint')}</span>
        <div className={styles.heroScrollLine} />
      </motion.div>
    </section>
  );
}
