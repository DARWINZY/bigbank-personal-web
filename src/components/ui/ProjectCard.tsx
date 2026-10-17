'use client';

import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { FiExternalLink, FiGithub, FiAward, FiCalendar } from 'react-icons/fi';
import type { Project } from '@/data/projects';
import { awardLabel as getAwardLabel, type Award } from '@/data/awards';
import { displayYear } from '@/lib/format';
import uiStyles from '@/styles/ui.module.css';

type Locale = 'th' | 'en' | 'lo';

const awardBadgeClass: Record<Award, string> = {
  gold: uiStyles.awardBadgeGold,
  silver: uiStyles.awardBadgeSilver,
  bronze: uiStyles.awardBadgeBronze,
};

const awardCardClass: Record<Award, string> = {
  gold: uiStyles.projectCardGold,
  silver: uiStyles.projectCardSilver,
  bronze: uiStyles.projectCardBronze,
};

interface Props {
  project: Project;
  /** Image `sizes`; the default fits the two-column portfolio grid. */
  sizes?: string;
}

export default function ProjectCard({ project, sizes = '(max-width: 480px) 96px, (max-width: 768px) 720px, 600px' }: Props) {
  const t = useTranslations('portfolio');
  const locale = useLocale() as Locale;
  const awardLabel = getAwardLabel(project, locale);

  return (
    <div className={`${uiStyles.projectCard} ${project.award ? awardCardClass[project.award] : ''}`}>
      <div className={uiStyles.projectCardImage}>
        {project.award && (
          <div className={`${uiStyles.awardBadge} ${awardBadgeClass[project.award]}`}>
            <FiAward size={14} />
            {!project.badgeIconOnly && awardLabel}
          </div>
        )}
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title[locale]}
            width={640}
            height={400}
            sizes={sizes}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          />
        ) : (
          <div className={uiStyles.projectCardPlaceholder} aria-hidden="true">
            {project.title.en.charAt(0)}
          </div>
        )}
      </div>
      <div className={uiStyles.projectCardContent}>
        <h3 className={uiStyles.projectCardTitle}>
          {project.title[locale]}
        </h3>
        {/* Phones only: award and year move next to the thumbnail */}
        <div className={uiStyles.projectCardMeta}>
          {project.award && (
            <span className={`${uiStyles.awardChip} ${awardBadgeClass[project.award]}`}>
              <FiAward size={11} aria-hidden="true" />
              {project.badgeIconOnly ? null : awardLabel}
            </span>
          )}
          {project.year && (
            <span className={uiStyles.projectCardYear}>
              {displayYear(project.year, locale)} {project.grade && `(${project.grade[locale]})`}
            </span>
          )}
        </div>
        <p className={uiStyles.projectCardDesc}>
          {project.description[locale]}
        </p>
        <div className={uiStyles.projectCardTags}>
          {project.tags.map((tag) => (
            <span key={tag} className={uiStyles.projectCardTag}>
              {tag}
            </span>
          ))}
        </div>
        <div className={`${uiStyles.projectCardLinks} ${project.year ? uiStyles.projectCardLinksYear : ''}`}>
          {project.year ? (
            <div className={uiStyles.projectCardLink} style={{ cursor: 'default' }}>
              <FiCalendar size={14} />
              {displayYear(project.year, locale)} {project.grade && `(${project.grade[locale]})`}
            </div>
          ) : (
            <>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={uiStyles.projectCardLink}
                >
                  <FiExternalLink size={14} />
                  {t('view_live')}
                </a>
              )}
              {project.codeUrl && (
                <a
                  href={project.codeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={uiStyles.projectCardLink}
                >
                  <FiGithub size={14} />
                  {t('view_code')}
                </a>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
