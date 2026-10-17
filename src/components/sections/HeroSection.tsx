'use client';

import { useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import FloatingParticles from '@/components/ui/FloatingParticles';
import RotatingText from '@/components/ui/RotatingText';
import TextReveal from '@/components/ui/TextReveal';
import styles from '@/styles/hero.module.css';
import uiStyles from '@/styles/ui.module.css';

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export default function HeroSection() {
  const t = useTranslations('hero');

  const locale = useLocale();

  // Scroll parallax: background, photo and text sink at different speeds as the hero leaves
  const heroRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  return (
    <section className={styles.hero} id="hero" ref={heroRef}>
      {/* Background: drifting aurora glows */}
      <motion.div className={styles.heroBg} style={reduceMotion ? undefined : { y: bgY }}>
        <div className={styles.heroBgGlow1} />
        <div className={styles.heroBgGlow2} />
        <div className={styles.heroBgGlow3} />
        <FloatingParticles />
      </motion.div>

      <div className={`container ${styles.heroContent}`}>
        {/* Text Content */}
        <motion.div
          className={styles.heroText}
          style={reduceMotion ? undefined : { y: textY, opacity: textOpacity }}
        >
          <motion.div
            className={styles.heroBadge}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE_OUT }}
          >
            <span className={styles.heroBadgeDot} />
            <span className={styles.heroBadgeText}>{t('badge')}</span>
          </motion.div>

          <motion.p
            className={styles.heroGreeting}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: EASE_OUT }}
          >
            {t('greeting')}
          </motion.p>

          <motion.h1
            className={styles.heroName}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: EASE_OUT }}
          >
            <span className={styles.heroNameAccent}>
              <TextReveal text={t('name')} delay={0.45} />
            </span>
            <motion.div
              className={styles.heroFullName}
              initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)', transitionEnd: { filter: 'none' } }}
              transition={{ duration: 0.7, delay: 0.85, ease: EASE_OUT }}
            >
              {t('fullName')}
            </motion.div>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.95, ease: EASE_OUT }}
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
            transition={{ duration: 0.6, delay: 1.05, ease: EASE_OUT }}
          >
            {t('description')}
          </motion.p>

          <motion.div
            className={styles.heroButtons}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.15, ease: EASE_OUT }}
          >
            <Link
              href={`/${locale}/portfolio`}
              className={`${uiStyles.btn} ${uiStyles.btnPrimary} ${uiStyles.btnShine}`}
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
        </motion.div>

        {/* Hero Image */}
        <motion.div
          className={styles.heroImageWrapper}
          style={reduceMotion ? undefined : { y: imageY, scale: imageScale }}
        >
          {/* Rotating halo and orbit behind the photo */}
          <motion.div
            className={styles.heroHalo}
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, delay: 0.2, ease: EASE_OUT }}
          >
            <div className={styles.heroHaloGlow} />
            <div className={styles.heroOrbit}>
              <span className={styles.heroOrbitDot} />
            </div>
            <div className={`${styles.heroOrbit} ${styles.heroOrbitOuter}`}>
              <span className={styles.heroOrbitDot} />
            </div>
          </motion.div>

          <motion.div
            className={styles.heroImageEntrance}
            initial={{ opacity: 0, y: 60, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.15, ease: EASE_OUT }}
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
                ease: 'easeInOut',
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
              <div className={styles.heroImageSheen} aria-hidden="true" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className={styles.heroScroll}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.5 }}
      >
        <span className={styles.heroScrollText}>{t('scroll_hint')}</span>
        <div className={styles.heroScrollLine} />
      </motion.div>
    </section>
  );
}
