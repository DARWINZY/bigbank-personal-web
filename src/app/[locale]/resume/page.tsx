import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { FiGlobe, FiInstagram } from 'react-icons/fi';
import PrintButton from '@/components/resume/PrintButton';
import { projects, type Project } from '@/data/projects';
import { awardLabel } from '@/data/awards';
import { socialLinks } from '@/data/social';
import { displayYear } from '@/lib/format';
import { buildMetadata, SITE_URL } from '@/lib/seo';
import styles from '@/styles/resume.module.css';

type Props = { params: Promise<{ locale: string }> };
type Locale = 'th' | 'en' | 'lo' | 'zh';
type Item = { title: string; text: string };
type Skill = { label: string; items: string };

const dateLocales: Record<string, string> = { th: 'th-TH', en: 'en-GB', lo: 'lo-LA', zh: 'zh-CN' };
const instagram = socialLinks.find((l) => l.name === 'Instagram');
const instagramHandle = instagram ? `@${instagram.url.replace(/\/+$/, '').split('/').pop()}` : null;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return buildMetadata({
    locale,
    path: 'resume',
    title: `${t('nav.resume')} | Bigbank`,
    description: t('metadata.resume_description'),
  });
}

function Entry({ project, locale, withNote = false }: { project: Project; locale: Locale; withNote?: boolean }) {
  const award = awardLabel(project, locale);
  return (
    <li className={styles.entry}>
      <div className={styles.entryMain}>
        <span className={styles.entryTitle}>{project.title[locale]}</span>
        {withNote && <span className={styles.entryNote}>{project.description[locale]}</span>}
      </div>
      <span className={styles.entryMeta}>
        {award && <span className={styles.award}>{award}</span>}
        {project.year && <span>{displayYear(project.year, locale)}</span>}
      </span>
    </li>
  );
}

export default async function ResumePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const loc = locale as Locale;
  const t = await getTranslations({ locale, namespace: 'resume' });
  const hero = await getTranslations({ locale, namespace: 'hero' });

  // Awards, competitions, camps and training come from the portfolio data. The projects list
  // is written per language in messages (resume.projects): it covers work that isn't a
  // portfolio entry and must not name the school.
  const awards = projects.filter((p) => p.category === 'competition' && p.award);
  const competitions = projects.filter((p) => p.category === 'competition' && !p.award);
  const camps = projects.filter((p) => p.category === 'camp');
  const training = projects.filter((p) => p.category === 'training');
  const ownProjects = t.raw('projects') as Item[];
  const skills = t.raw('skills') as Skill[];

  // Static export: this is the date of the build that published the page
  const updated = new Intl.DateTimeFormat(dateLocales[locale] ?? locale, { month: 'long', year: 'numeric' }).format(new Date());

  const sections: { key: string; content: React.ReactNode }[] = [
    { key: 'awards', content: <ul className={styles.list}>{awards.map((p) => <Entry key={p.id} project={p} locale={loc} />)}</ul> },
    { key: 'competitions', content: <ul className={styles.list}>{competitions.map((p) => <Entry key={p.id} project={p} locale={loc} withNote />)}</ul> },
    {
      key: 'projects',
      content: (
        <ul className={styles.list}>
          {ownProjects.map((item) => (
            <li key={item.title} className={styles.entry}>
              <div className={styles.entryMain}>
                <span className={styles.entryTitle}>{item.title}</span>
                <span className={styles.entryNote}>{item.text}</span>
              </div>
            </li>
          ))}
        </ul>
      ),
    },
    { key: 'camps', content: <ul className={styles.list}>{camps.map((p) => <Entry key={p.id} project={p} locale={loc} />)}</ul> },
    { key: 'training', content: <ul className={styles.list}>{training.map((p) => <Entry key={p.id} project={p} locale={loc} />)}</ul> },
    {
      key: 'skills',
      content: (
        <dl className={styles.skills}>
          {skills.map((s) => (
            <div key={s.label} className={styles.skillRow}>
              <dt>{s.label}</dt>
              <dd>{s.items}</dd>
            </div>
          ))}
        </dl>
      ),
    },
  ];

  return (
    <div className={styles.page}>
      <article className={styles.sheet}>
        <header className={styles.head}>
          <div>
            <h1 className={styles.name}>
              {hero('fullName')}
              <span className={styles.nickname}> ({hero('name')})</span>
            </h1>
            <p className={styles.role}>{t('role')}</p>
            <ul className={styles.contact}>
              <li>
                <FiGlobe size={14} aria-hidden="true" />
                <a href={`${SITE_URL}/${locale}/`}>{SITE_URL.replace('https://', '')}</a>
              </li>
              {instagram && instagramHandle && (
                <li>
                  <FiInstagram size={14} aria-hidden="true" />
                  <a href={instagram.url} target="_blank" rel="noopener noreferrer">{instagramHandle}</a>
                </li>
              )}
            </ul>
          </div>
          <PrintButton label={t('download')} />
        </header>

        <p className={styles.summary}>{t('summary')}</p>

        {sections.map((section) => (
          <section key={section.key} className={styles.section} aria-labelledby={`resume-${section.key}`}>
            <h2 id={`resume-${section.key}`} className={styles.sectionLabel}>{t(`sections.${section.key}`)}</h2>
            {section.content}
          </section>
        ))}

        <p className={styles.updated}>{t('updated', { date: updated })}</p>
      </article>
    </div>
  );
}
