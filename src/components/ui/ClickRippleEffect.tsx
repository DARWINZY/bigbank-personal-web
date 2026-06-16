'use client';

import { useState, useEffect } from 'react';
import styles from '@/styles/ripple.module.css';

interface Ripple {
  x: number;
  y: number;
  id: number;
}

export default function ClickRippleEffect() {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const newRipple = {
        x: e.clientX,
        y: e.clientY,
        id: Date.now(),
      };
      
      setRipples((prev) => [...prev, newRipple]);

      // Remove the ripple after the animation completes (600ms)
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 600);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  if (ripples.length === 0) return null;

  return (
    <div className={styles.rippleContainer}>
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className={styles.ripple}
          style={{ left: ripple.x, top: ripple.y }}
        />
      ))}
    </div>
  );
}
