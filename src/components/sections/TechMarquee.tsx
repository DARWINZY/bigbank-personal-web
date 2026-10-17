'use client';

import { useRef } from 'react';
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion';
import type { IconType } from 'react-icons';
import { FaReact, FaNodeJs, FaPython } from 'react-icons/fa';
import { SiNextdotjs, SiTypescript, SiCplusplus, SiArduino, SiBlender, SiFigma, SiTailwindcss, SiFlutter } from 'react-icons/si';
import styles from '@/styles/marquee.module.css';

type Tech = { name: string; icon: IconType };

const techStack1: Tech[] = [
  { name: 'Next.js', icon: SiNextdotjs },
  { name: 'TypeScript', icon: SiTypescript },
  { name: 'React', icon: FaReact },
  { name: 'Tailwind CSS', icon: SiTailwindcss },
  { name: 'Node.js', icon: FaNodeJs },
  { name: 'Figma', icon: SiFigma },
];

const techStack2: Tech[] = [
  { name: 'Python', icon: FaPython },
  { name: 'C++', icon: SiCplusplus },
  { name: 'Arduino', icon: SiArduino },
  { name: 'Blender', icon: SiBlender },
  { name: 'Flutter', icon: SiFlutter },
  { name: 'REST APIs', icon: FaNodeJs }, // Fallback icon
];

const COPIES = 4;

const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

/** One looping row. Scrolling speeds it up, and scrolling back up reverses it. */
function VelocityRow({ items, baseVelocity }: { items: Tech[]; baseVelocity: number }) {
  const reduceMotion = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], { clamp: false });
  const skewX = useTransform(smoothVelocity, [-2500, 2500], [10, -10]);
  // The row holds COPIES identical sets, so shifting by one set's share loops seamlessly
  const x = useTransform(baseX, (v) => `${wrap(-100 / COPIES, 0, v)}%`);
  const direction = useRef(1);
  const paused = useRef(false);

  useAnimationFrame((_, delta) => {
    if (reduceMotion || paused.current) return;
    const factor = velocityFactor.get();
    if (factor < 0) direction.current = -1;
    else if (factor > 0) direction.current = 1;
    let moveBy = direction.current * baseVelocity * (delta / 1000);
    moveBy += direction.current * moveBy * factor;
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <motion.div
      className={styles.marqueeRow}
      style={reduceMotion ? undefined : { x, skewX }}
      onPointerEnter={() => (paused.current = true)}
      onPointerLeave={() => (paused.current = false)}
    >
      {Array.from({ length: COPIES }, () => items).flat().map((tech, index) => (
        <div key={index} className={styles.techPill}>
          <span className={styles.techIcon}><tech.icon /></span>
          <span>{tech.name}</span>
        </div>
      ))}
    </motion.div>
  );
}

export default function TechMarquee() {
  return (
    <section className={styles.marqueeSection} aria-hidden="true">
      <div className={styles.marqueeContainer}>
        {/* Row 1 drifts left, row 2 right */}
        <VelocityRow items={techStack1} baseVelocity={-1.6} />
        <VelocityRow items={techStack2} baseVelocity={1.6} />
      </div>
    </section>
  );
}
