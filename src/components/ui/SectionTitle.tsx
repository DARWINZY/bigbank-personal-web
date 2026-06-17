import styles from '@/styles/ui.module.css';
import TextReveal from '@/components/ui/TextReveal';

interface SectionTitleProps {
  label: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
}

export default function SectionTitle({ label, title, description, align = 'center' }: SectionTitleProps) {
  return (
    <div className={`${styles.sectionTitle} ${align === 'center' ? styles.sectionTitleCenter : ''}`}>
      <span className={styles.sectionLabel}>{label}</span>
      <h2 className={styles.sectionHeading}>
        <TextReveal text={title} />
      </h2>
      {description && <p className={styles.sectionDescription}>{description}</p>}
    </div>
  );
}
