'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  /** Cards: rise out of a backward tilt instead of a flat slide. */
  tilt?: boolean;
}

const directionOffsets = {
  up: { y: 48, x: 0 },
  down: { y: -48, x: 0 },
  left: { x: 48, y: 0 },
  right: { x: -48, y: 0 },
};

export default function AnimatedSection({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  tilt = false,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const offset = directionOffsets[direction];
  const hidden = tilt
    ? { opacity: 0, x: 0, y: 90, rotateX: 18, scale: 0.92, filter: 'blur(10px)' }
    : { opacity: 0, x: offset.x, y: offset.y, scale: 0.97, filter: 'blur(8px)' };

  return (
    <motion.div
      ref={ref}
      className={className}
      // Lets CSS run follow-up effects (e.g. a card photo settling) once this is on screen
      data-revealed={isInView}
      style={tilt ? { transformPerspective: 1200, transformOrigin: '50% 100%' } : undefined}
      initial={hidden}
      animate={
        isInView
          ? { opacity: 1, x: 0, y: 0, rotateX: 0, scale: 1, filter: 'blur(0px)', transitionEnd: { filter: 'none' } }
          : {}
      }
      transition={{
        duration: tilt ? 1 : 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
