'use client';

import { FiDownload } from 'react-icons/fi';
import styles from '@/styles/resume.module.css';
import uiStyles from '@/styles/ui.module.css';

/** "Download PDF" opens the print dialog; the page has A4 print styles. */
export default function PrintButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      className={`${uiStyles.btn} ${uiStyles.btnPrimary} ${uiStyles.btnSmall} ${styles.printButton}`}
      onClick={() => window.print()}
    >
      <FiDownload size={15} aria-hidden="true" />
      {label}
    </button>
  );
}
