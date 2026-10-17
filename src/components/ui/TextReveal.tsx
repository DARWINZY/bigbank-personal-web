'use client';

import { motion, useInView, Variants } from 'framer-motion';
import { useRef } from 'react';

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

const parentVariant = (delay: number): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay,
      staggerChildren: 0.045,
    },
  },
});

const childVariant: Variants = {
  hidden: { opacity: 0, y: '0.6em', rotate: 6, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    filter: 'blur(0px)',
    transition: {
      type: 'spring',
      damping: 14,
      stiffness: 110,
    },
    transitionEnd: { filter: 'none' },
  },
};

export default function TextReveal({ text, className = '', delay = 0 }: TextRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  // Split text into words, then words into characters for more natural wrapping
  const words = text.split(' ');

  return (
    <motion.span
      ref={ref}
      className={className}
      variants={parentVariant(delay)}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      style={{ display: 'inline-block' }}
    >
      {words.map((word, index) => {
        // Use Intl.Segmenter to correctly split graphemes (prevents floating vowels in Thai)
        const graphemes = typeof Intl !== 'undefined' && Intl.Segmenter
          ? Array.from(new Intl.Segmenter(undefined, { granularity: 'grapheme' }).segment(word)).map(s => s.segment)
          : word.split('');
          
        return (
          <span key={index} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
            {graphemes.map((char, charIndex) => (
              <motion.span
                key={`${index}-${charIndex}`}
                variants={childVariant}
                style={{ display: 'inline-block' }}
              >
                {char}
              </motion.span>
            ))}
            <span style={{ display: 'inline-block' }}>&nbsp;</span>
          </span>
        );
      })}
    </motion.span>
  );
}
