import { useTranslations } from 'next-intl';
import SectionTitle from '@/components/ui/SectionTitle';
import ProjectCard from '@/components/ui/ProjectCard';
import { projects } from '@/data/projects';
import styles from '@/styles/portfolio.module.css';

const shown = projects.filter((p) => p.featured);

export default function PortfolioSection() {
  const t = useTranslations('portfolio');

  return (
    <section className={styles.portfolio}>
      <div className="container">
        <SectionTitle as="h1" label={t('label')} title={t('title')} description={t('description')} />

        <div className={styles.portfolioGrid}>
          {shown.map((project) => (
            <ProjectCard key={project.id} project={project} headingLevel="h2" />
          ))}
        </div>
      </div>
    </section>
  );
}
