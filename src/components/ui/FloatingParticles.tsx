'use client';

import { useEffect, useState } from 'react';
import styles from '@/styles/particles.module.css';

interface Particle {
  id: number;
  left: string;
  top: string;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export default function FloatingParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate particles only on the client side to prevent hydration mismatches
    const particleCount = 20;
    const newParticles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: Math.random() * 6 + 2, // 2px to 8px
        duration: Math.random() * 10 + 10, // 10s to 20s
        delay: Math.random() * 5, // 0s to 5s
        opacity: Math.random() * 0.4 + 0.1, // 0.1 to 0.5
      });
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setParticles(newParticles);
  }, []);

  return (
    <div className={styles.particlesContainer} aria-hidden="true">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={styles.particle}
          style={{
            left: particle.left,
            top: particle.top,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
            opacity: particle.opacity,
          }}
        />
      ))}
    </div>
  );
}
