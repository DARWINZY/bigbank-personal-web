'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, Variants } from 'framer-motion';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { FiArrowLeft, FiX, FiCheck, FiTrendingUp, FiTarget, FiZap, FiUsers } from 'react-icons/fi';
import styles from '@/styles/2b-kmutt.module.css';
import { twoBData, LocaleContent } from '@/data/twobkmutt';

// Canvas Particle Background Component
const ParticleCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: { x: number; y: number; vx: number; vy: number }[] = [];
    let animationFrameId: number;

    const initCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      const numParticles = Math.floor((canvas.width * canvas.height) / 15000); // Responsive amount
      particles = Array.from({ length: Math.min(numParticles, 100) }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      }));
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(200, 200, 200, 0.8)';
      
      particles.forEach(p => {
        // Move
        p.x += p.vx;
        p.y += p.vy;
        
        // Bounce
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Draw dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw connections
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(150, 150, 150, ${1 - dist / 120})`;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(drawParticles);
    };

    initCanvas();
    drawParticles();

    window.addEventListener('resize', initCanvas);
    return () => {
      window.removeEventListener('resize', initCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvasBg} />;
};

const IntroSection = ({ content }: { content: LocaleContent }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px 0px" });

  return (
    <motion.section 
      ref={ref}
      className={styles.introSection}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8 }}
    >
      <span className={styles.sectionLabel}>{content.introLabel}</span>
      <p>
        {content.introP1}
      </p>
      <p style={{ marginTop: '1rem' }}>
        {content.introP2}
      </p>
      
      <div className={styles.researchGroupsGrid}>
        {content.researchGroups.map((group, index) => (
          <div key={index} className={styles.researchGroupItem}>{group}</div>
        ))}
      </div>

      <p style={{ marginTop: '1rem' }}>
        {content.introP3}
      </p>
    </motion.section>
  );
};

const JourneySection = ({ content }: { content: LocaleContent }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px 0px" });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section className={styles.journeySection} ref={ref}>
      <div className={styles.journeyContainer}>
        <span className={styles.sectionLabel}>{content.journeyLabel}</span>
        <h2 className={styles.sectionTitle}>{content.journeyTitle}</h2>
        <p style={{ textAlign: 'center', color: 'var(--color-text-secondary)', maxWidth: '700px', margin: '0 auto' }}>
          {content.journeyDesc}
        </p>

        <motion.div 
          className={styles.journeyGrid}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {content.journeySteps.map((step, idx) => (
            <motion.div key={idx} className={styles.journeyCard} variants={itemVariants}>
              <span className={styles.journeyStepNum}>0{idx + 1}</span>
              <h3 className={styles.journeyTitle}>{step.title}</h3>
              <p className={styles.journeyText}>{step.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const BenefitsSection = ({ content }: { content: LocaleContent }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px 0px" });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
  };

  const icons = [<FiTrendingUp key="1" />, <FiTarget key="2" />, <FiZap key="3" />, <FiUsers key="4" />];

  return (
    <section className={styles.benefitsSection} ref={ref}>
      <span className={styles.sectionLabel}>{content.benefitsLabel}</span>
      <h2 className={styles.sectionTitle}>{content.benefitsTitle}</h2>

      <motion.div 
        className={styles.benefitsGrid}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {content.benefits.map((benefit, idx) => (
          <motion.div key={idx} className={styles.benefitItem} variants={itemVariants}>
            <div className={styles.benefitIconBox}>{icons[idx % icons.length]}</div>
            <div className={styles.benefitContent}>
              <h3>{benefit.title}</h3>
              <p>{benefit.text}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

const ComparisonSection = ({ content }: { content: LocaleContent }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3 } }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section className={styles.comparisonSection} ref={ref}>
      <span className={styles.sectionLabel}>{content.comparisonLabel}</span>
      <h2 className={styles.sectionTitle}>{content.comparisonTitle}</h2>
      
      <motion.div 
        className={styles.comparisonContainer}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* ค่ายทั่วไป */}
        <motion.div className={`${styles.card} ${styles.cardLeft}`} variants={itemVariants}>
          <h3 className={styles.cardTitle}>{content.campNormal.title}</h3>
          <ul className={styles.cardList}>
            {content.campNormal.items.map((item, idx) => (
              <li key={idx} className={styles.cardListItem}>
                <FiX className={styles.iconCross} size={20} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* VS Badge */}
        <motion.div 
          className={styles.vsBadge}
          initial={{ scale: 0, rotate: -180 }}
          animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.5 }}
        >
          VS
        </motion.div>

        {/* 2B-KMUTT */}
        <motion.div className={`${styles.card} ${styles.cardRight}`} variants={itemVariants}>
          <h3 className={styles.cardTitle} style={{ color: 'var(--color-accent)' }}>{content.camp2B.title}</h3>
          <ul className={styles.cardList}>
            {content.camp2B.items.map((item, idx) => (
              <li key={idx} className={styles.cardListItem}>
                <FiCheck className={styles.iconCheck} size={20} />
                <span><strong style={{color: 'var(--color-text-primary)'}}>{item.split(' ')[0]}</strong> {item.substring(item.indexOf(' '))}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </section>
  );
};

const FitCheckSection = ({ content }: { content: LocaleContent }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });

  return (
    <section className={styles.fitCheckSection}>
      <span className={styles.sectionLabel}>{content.fitLabel}</span>
      <h2 className={styles.sectionTitle}>{content.fitTitle}</h2>
      
      <div className={styles.fitContainer} ref={ref}>
        {/* คนที่ใช่ */}
        <div className={styles.fitCard}>
          <h3 className={styles.fitCardTitleYes}>{content.fitYes.title}</h3>
          <ul className={styles.fitList}>
            {content.fitYes.items.map((item, idx) => (
              <li key={idx}>
                <FiCheck color="#15803D" size={20} style={{ flexShrink: 0 }} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* คนที่ไม่ใช่ */}
        <div className={styles.fitCard}>
          <h3 className={styles.fitCardTitleNo}>{content.fitNo.title}</h3>
          <ul className={styles.fitList}>
            {content.fitNo.items.map((item, idx) => (
              <li key={idx}>
                <FiX color="#B91C1C" size={20} style={{ flexShrink: 0 }} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default function TwoBKMUTTPost() {
  const locale = useLocale() as 'th' | 'en' | 'lo' | 'zh';
  const content = twoBData[locale] || twoBData.th;

  const { scrollY } = useScroll();
  
  // Parallax transforms
  const titleY = useTransform(scrollY, [0, 1000], [0, 300]);
  const subtitleY = useTransform(scrollY, [0, 1000], [0, 500]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <main className={styles.pageContainer}>
      <Link href={`/${locale}/#blog`} className={styles.backBtn}>
        <FiArrowLeft size={18} />
        <span>กลับหน้าหลัก</span>
      </Link>

      {/* HERO SECTION */}
      <section className={styles.heroSection}>
        <ParticleCanvas />
        <motion.div className={styles.heroContent} style={{ opacity }}>
          <motion.h1 
            className={styles.heroTitle}
            style={{ y: titleY }}
          >
            {content.heroTitle}<span style={{ color: 'var(--color-accent)' }}>{content.heroHighlight}</span>
          </motion.h1>
          <motion.p 
            className={styles.heroSubtitle}
            style={{ y: subtitleY }}
          >
            {content.heroSubtitle}
          </motion.p>
        </motion.div>

        <motion.div 
          className={styles.scrollIndicator}
          style={{ opacity }}
        >
          <span>{content.scrollDown}</span>
          <div className={styles.mouse}>
            <div className={styles.wheel} />
          </div>
        </motion.div>
      </section>

      {/* NEW: INTRO SECTION */}
      <IntroSection content={content} />

      {/* NEW: JOURNEY SECTION */}
      <JourneySection content={content} />

      {/* NEW: BENEFITS SECTION */}
      <BenefitsSection content={content} />

      {/* COMPARISON SECTION */}
      <ComparisonSection content={content} />

      {/* FIT CHECK SECTION */}
      <FitCheckSection content={content} />

      {/* CLOSING CTA */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaBanner}>
          <div className={styles.ctaShimmer} />
          <h2 className={styles.ctaText}>
            {content.ctaText1}<br/>{content.ctaText2}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', position: 'relative', zIndex: 1 }}>
            <a 
              href="https://join.kmutt.ac.th/nondegree-projects/details?id=994&typePageQuery=default" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.ctaButton}
            >
              {content.ctaButton}
            </a>
            <span style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.85)' }}>
              {content.ctaDisclaimer}
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
