import { useTranslations } from 'next-intl';
import type { IconType } from 'react-icons';
import { FaReact, FaNodeJs, FaPython } from 'react-icons/fa';
import { SiNextdotjs, SiTypescript, SiCplusplus, SiArduino, SiBlender, SiFigma, SiTailwindcss, SiFlutter } from 'react-icons/si';
import { TbApi } from 'react-icons/tb';
import styles from '@/styles/home.module.css';

const tools: { name: string; icon: IconType }[] = [
  { name: 'Next.js', icon: SiNextdotjs },
  { name: 'TypeScript', icon: SiTypescript },
  { name: 'React', icon: FaReact },
  { name: 'Tailwind CSS', icon: SiTailwindcss },
  { name: 'Node.js', icon: FaNodeJs },
  { name: 'REST APIs', icon: TbApi },
  { name: 'Python', icon: FaPython },
  { name: 'C++', icon: SiCplusplus },
  { name: 'Arduino', icon: SiArduino },
  { name: 'Flutter', icon: SiFlutter },
  { name: 'Figma', icon: SiFigma },
  { name: 'Blender', icon: SiBlender },
];

/** The tools I use, as a still row of gray marks. */
export default function TechStack() {
  const t = useTranslations('home.tools');

  return (
    <section className={styles.tools} aria-labelledby="tools-title">
      <div className="container">
        <h2 id="tools-title" className={styles.toolsTitle}>{t('title')}</h2>
        <ul className={styles.toolsList}>
          {tools.map((tool) => (
            <li key={tool.name} className={styles.tool}>
              <tool.icon aria-hidden="true" />
              {tool.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
