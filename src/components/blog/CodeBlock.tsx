'use client';

import { useRef, useState, type ComponentProps } from 'react';
import { FiCheck, FiCopy } from 'react-icons/fi';
import styles from '@/styles/blog-post.module.css';

/** Markdown code block with a copy button. */
export default function CodeBlock({ children, copyLabel, copiedLabel, ...props }: ComponentProps<'pre'> & {
  copyLabel: string;
  copiedLabel: string;
}) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(preRef.current?.innerText.replace(/\n$/, '') ?? '');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div className={styles.codeBlock}>
      <button
        type="button"
        className={`${styles.copyButton} ${copied ? styles.copyButtonDone : ''}`}
        onClick={copy}
        aria-label={copied ? copiedLabel : copyLabel}
      >
        {copied ? <FiCheck size={14} aria-hidden="true" /> : <FiCopy size={14} aria-hidden="true" />}
        <span aria-live="polite">{copied ? copiedLabel : copyLabel}</span>
      </button>
      <pre ref={preRef} {...props}>{children}</pre>
    </div>
  );
}
