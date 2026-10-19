'use client';

import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import type { Project } from '@/data/projects';
import { awardLabel as getAwardLabel, type Award } from '@/data/awards';
import { displayYear } from '@/lib/format';
import uiStyles from '@/styles/ui.module.css';

type Locale = 'th' | 'en' | 'lo';

const awardClass: Record<Award, string> = {
  gold: uiStyles.awardGold,
  silver: uiStyles.awardSilver,
  bronze: uiStyles.awardBronze,
};

interface Props {
  project: Project;
  /** Image `sizes`; the default fits the two-column portfolio grid. */
  sizes?: string;
  /** Home page: three lines of description, the portfolio shows it all. */
  clampDescription?: boolean;
  /** h2 on the portfolio page; h3 where the cards sit under a section heading. */
  headingLevel?: 'h2' | 'h3';
}

export default function ProjectCard({
  project,
  sizes = '(max-width: 480px) 84px, (max-width: 768px) 720px, 500px',
  clampDescription = false,
  headingLevel = 'h3',
}: Props) {
  const t = useTranslations('portfolio');
  const locale = useLocale() as Locale;
  const awardLabel = getAwardLabel(project, locale);
  const Heading = headingLevel;

  return (
    <article className={uiStyles.projectCard}>
      <div className={uiStyles.projectCardImage}>
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title[locale]}
            width={640}
            height={400}
            sizes={sizes}
          />
        ) : (
          <div className={uiStyles.projectCardPlaceholder} aria-hidden="true">
            {project.title.en.charAt(0)}
          </div>
        )}
      </div>

      <div className={uiStyles.projectCardBody}>
        <div className={uiStyles.projectCardHead}>
          {project.award && awardLabel && (
            <p className={`${uiStyles.projectCardAward} ${awardClass[project.award]}`}>{awardLabel}</p>
          )}
          <Heading className={uiStyles.projectCardTitle}>{project.title[locale]}</Heading>
          {project.year && (
            <p className={uiStyles.projectCardYear}>
              {displayYear(project.year, locale)}
              {project.grade && ` · ${project.grade[locale]}`}
            </p>
          )}
        </div>

        <p className={`${uiStyles.projectCardDesc} ${clampDescription ? uiStyles.projectCardDescClamp : ''}`}>
          {project.description[locale]}
        </p>

        {project.tags.length > 0 && (
          <p className={uiStyles.projectCardTags}>{project.tags.join(' · ')}</p>
        )}

        {(project.liveUrl || project.codeUrl) && (
          <div className={uiStyles.projectCardLinks}>
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={uiStyles.chevronLink}>
                {t('view_live')}
              </a>
            )}
            {project.codeUrl && (
              <a href={project.codeUrl} target="_blank" rel="noopener noreferrer" className={uiStyles.chevronLink}>
                {t('view_code')}
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
