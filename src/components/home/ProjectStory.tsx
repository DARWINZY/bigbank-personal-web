'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import styles from '@/styles/home.module.css';

type Step = { title: string; text: string };

/** The photo-culling AI project from 2B-KMUTT, told as its pipeline. */
export default function ProjectStory() {
  const t = useTranslations('home.project');
  const locale = useLocale();
  const steps = t.raw('steps') as Step[];

  return (
    <section className={styles.story} aria-labelledby="story-title">
      <div className={`container ${styles.storyInner}`}>
        <div className={styles.storyIntro}>
          <p className={styles.storyLabel}>{t('label')}</p>
          <h2 id="story-title" className={styles.storyTitle}>{t('title')}</h2>
          <p className={styles.storySummary}>{t('summary')}</p>

          <p className={styles.storyContext}>{t('context')}</p>
          <dl className={styles.storyCompare}>
            <div className={styles.storyFigure}>
              <dt>{t('before_label')}</dt>
              <dd>{t('before_value')}</dd>
            </div>
            <div className={`${styles.storyFigure} ${styles.storyGoal}`}>
              <dt>{t('after_label')}</dt>
              <dd>{t('after_value')}</dd>
            </div>
          </dl>

          <p className={styles.storyCredit}>{t('credit')}</p>
          <Link href={`/${locale}/blog/2b-kmutt`} className={styles.storyLink}>{t('link')}</Link>
        </div>

        <ol className={styles.storySteps}>
          {steps.map((step, index) => (
            <li key={step.title} className={styles.storyStep}>
              <span className={styles.storyStepNumber} aria-hidden="true">{index + 1}</span>
              <div>
                <h3 className={styles.storyStepTitle}>{step.title}</h3>
                <p className={styles.storyStepText}>{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
