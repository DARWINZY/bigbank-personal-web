'use client';

import { FaReact, FaNodeJs, FaPython } from 'react-icons/fa';
import { SiNextdotjs, SiTypescript, SiCplusplus, SiArduino, SiBlender, SiFigma, SiTailwindcss, SiFlutter } from 'react-icons/si';
import styles from '@/styles/marquee.module.css';

const techStack1 = [
  { name: 'Next.js', icon: SiNextdotjs },
  { name: 'TypeScript', icon: SiTypescript },
  { name: 'React', icon: FaReact },
  { name: 'Tailwind CSS', icon: SiTailwindcss },
  { name: 'Node.js', icon: FaNodeJs },
  { name: 'Figma', icon: SiFigma },
];

const techStack2 = [
  { name: 'Python', icon: FaPython },
  { name: 'C++', icon: SiCplusplus },
  { name: 'Arduino', icon: SiArduino },
  { name: 'Blender', icon: SiBlender },
  { name: 'Flutter', icon: SiFlutter },
  { name: 'REST APIs', icon: FaNodeJs }, // Fallback icon
];

export default function TechMarquee() {
  return (
    <section className={styles.marqueeSection} aria-hidden="true">
      <div className={styles.marqueeContainer}>
        {/* Row 1: Left to Right */}
        <div className={styles.marqueeRow}>
          {/* Duplicate items to create seamless loop */}
          {[...techStack1, ...techStack1, ...techStack1, ...techStack1].map((tech, index) => (
            <div key={`row1-${index}`} className={styles.techPill}>
              <span className={styles.techIcon}><tech.icon /></span>
              <span>{tech.name}</span>
            </div>
          ))}
        </div>

        {/* Row 2: Right to Left */}
        <div className={styles.marqueeRowReverse}>
          {[...techStack2, ...techStack2, ...techStack2, ...techStack2].map((tech, index) => (
            <div key={`row2-${index}`} className={styles.techPill}>
              <span className={styles.techIcon}><tech.icon /></span>
              <span>{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
