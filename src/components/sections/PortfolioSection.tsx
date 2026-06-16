'use client';

import { useTranslations, useLocale } from 'next-intl';
import { FiExternalLink, FiGithub, FiAward } from 'react-icons/fi';
import AnimatedSection from '@/components/ui/AnimatedSection';
import SectionTitle from '@/components/ui/SectionTitle';
import { projects } from '@/data/projects';
import styles from '@/styles/portfolio.module.css';
import uiStyles from '@/styles/ui.module.css';

export default function PortfolioSection() {
  const t = useTranslations('portfolio');
  const locale = useLocale() as 'th' | 'en' | 'lo' | 'zh';

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
              <div className={`${uiStyles.projectCard} ${project.award === 'gold' ? uiStyles.projectCardGold : project.award === 'silver' ? uiStyles.projectCardSilver : project.award === 'bronze' ? uiStyles.projectCardBronze : ''}`}>
                <div className={uiStyles.projectCardImage}>
                  {project.award && (
                    <div className={`${uiStyles.awardBadge} ${project.award === 'gold' ? uiStyles.awardBadgeGold : project.award === 'silver' ? uiStyles.awardBadgeSilver : uiStyles.awardBadgeBronze}`}>
                      <FiAward size={14} />
                      {project.award === 'gold' ? (locale === 'th' ? 'เหรียญทอง' : locale === 'lo' ? 'ຫຼຽນຄຳ' : locale === 'zh' ? '金奖' : 'Gold') : project.award === 'silver' ? (locale === 'th' ? 'เหรียญเงิน' : locale === 'lo' ? 'ຫຼຽນເງິນ' : locale === 'zh' ? '银奖' : 'Silver') : (locale === 'th' ? 'เหรียญทองแดง' : locale === 'lo' ? 'ຫຼຽນທອງແດງ' : locale === 'zh' ? '铜奖' : 'Bronze')}
                    </div>
                  )}
                  <div className={styles.portfolioPlaceholder}>
                    {project.title.en.charAt(0)}
                  </div>
                </div>
                <div className={uiStyles.projectCardContent}>
                  <h3 className={uiStyles.projectCardTitle}>
                    {project.title[locale]}
                  </h3>
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
                  <div className={uiStyles.projectCardLinks}>
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
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
