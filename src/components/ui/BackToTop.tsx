'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { FiArrowUp } from 'react-icons/fi';
import styles from '@/styles/backtotop.module.css';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      setProgress(latest);
      setIsVisible(latest > 0.1); // Show after scrolling 10%
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          className={styles.backToTopBtn}
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ duration: 0.3 }}
          aria-label="Back to top"
        >
          <svg className={styles.progressRing} width="48" height="48">
            <circle
              className={styles.progressRingCircle}
              strokeDasharray={`${circumference} ${circumference}`}
              style={{ strokeDashoffset }}
              r={radius}
              cx="24"
              cy="24"
            />
          </svg>
          <FiArrowUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
