'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import styles from '@/styles/cursor.module.css';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const outlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if it's a touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsTouchDevice(true);
      return;
    }

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Elements that should trigger the hover state
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('hover-target')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <div className={isHovering ? styles.hovered : ''}>
      <motion.div
        className={styles.cursorOutline}
        ref={outlineRef}
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
        }}
        transition={{
          type: 'spring',
          stiffness: 150,
          damping: 15,
          mass: 0.5,
        }}
      />
      <motion.div
        className={styles.cursorGlow}
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
        }}
        transition={{
          type: 'tween',
          ease: 'linear',
          duration: 0,
        }}
      />
      <motion.div
        className={styles.cursorDot}
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
        }}
        transition={{
          type: 'tween',
          ease: 'linear',
          duration: 0,
        }}
      />
    </div>
  );
}
