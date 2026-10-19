import styles from '@/styles/ui.module.css';

interface SectionTitleProps {
  label: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  /** h1 when the title heads its own page. */
  as?: 'h1' | 'h2';
}

/** Eyebrow, headline and an optional intro line, Apple style. */
export default function SectionTitle({ label, title, description, align = 'left', as: Heading = 'h2' }: SectionTitleProps) {
  return (
    <div className={`${styles.sectionTitle} ${align === 'center' ? styles.sectionTitleCenter : ''}`}>
      <p className={styles.sectionLabel}>{label}</p>
      <Heading className={styles.sectionHeading}>{title}</Heading>
      {description && <p className={styles.sectionDescription}>{description}</p>}
    </div>
  );
}
