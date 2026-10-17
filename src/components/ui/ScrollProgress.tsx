'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      style={{
        scaleX,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        background: 'linear-gradient(90deg, #0EA5E9, #67E8F9, #818CF8)',
        boxShadow: '0 0 12px rgba(14, 165, 233, 0.6)',
        transformOrigin: '0%',
        zIndex: 9999, // Above everything
      }}
    />
  );
}
