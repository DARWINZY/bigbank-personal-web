'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '@/styles/rotating-text.module.css';

interface RotatingTextProps {
  words: string[];
  interval?: number;
}

export default function RotatingText({ words, interval = 3000 }: RotatingTextProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, interval);
    return () => clearInterval(timer);
  }, [words.length, interval]);

  return (
    <span className={styles.container}>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          className={styles.text}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
