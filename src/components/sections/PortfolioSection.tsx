'use client';

import { useTranslations } from 'next-intl';
import AnimatedSection from '@/components/ui/AnimatedSection';
import SectionTitle from '@/components/ui/SectionTitle';
import ProjectCard from '@/components/ui/ProjectCard';
import { projects } from '@/data/projects';
import styles from '@/styles/portfolio.module.css';

export default function PortfolioSection() {
  const t = useTranslations('portfolio');

  return (
    <section className={`section ${styles.portfolio}`} id="portfolio">
      <div className="container">
        <AnimatedSection>
          <SectionTitle
            label={t('label')}
            title={t('title')}
            description={t('description')}
          />
        </AnimatedSection>

        <div className={styles.portfolioGrid}>
          {projects.filter(p => p.featured).map((project, index) => (
            <AnimatedSection key={project.id} delay={index * 0.1}>
              <ProjectCard project={project} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
