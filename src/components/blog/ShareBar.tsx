'use client';

import { useEffect, useRef, useState } from 'react';
import { FaFacebookF, FaLine } from 'react-icons/fa';
import { FiCheck, FiLink, FiShare2 } from 'react-icons/fi';
import { copyText } from '@/lib/clipboard';
import styles from '@/styles/blog-post.module.css';

interface Props {
  url: string;
  title: string;
  labels: { share: string; copyLink: string; copied: string; copyFailed: string; more: string };
}

export default function ShareBar({ url, title, labels }: Props) {
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>('idle');
  const [canNativeShare, setCanNativeShare] = useState(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(resetTimer.current), []);

  // navigator.share only exists in the browser (mostly phones)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCanNativeShare(typeof navigator.share === 'function');
  }, []);

  // Say so when copying fails (some in-app browsers block it) instead of failing silently
  const copy = async () => {
    setCopyState((await copyText(url)) ? 'copied' : 'failed');
    clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => setCopyState('idle'), 2500);
  };

  const nativeShare = async () => {
    try {
      await navigator.share({ title, url });
    } catch {
      // Closing the share sheet rejects; nothing to do
    }
  };

  const encoded = encodeURIComponent(url);

  return (
    <div className={styles.share}>
      <p className={styles.shareLabel}>{labels.share}</p>
      <div className={styles.shareButtons}>
        <a
          className={`${styles.shareButton} ${styles.shareLine}`}
          href={`https://social-plugins.line.me/lineit/share?url=${encoded}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLine size={16} aria-hidden="true" />
          LINE
        </a>
        <a
          className={`${styles.shareButton} ${styles.shareFacebook}`}
          href={`https://www.facebook.com/sharer/sharer.php?u=${encoded}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebookF size={14} aria-hidden="true" />
          Facebook
        </a>
        <button type="button" className={styles.shareButton} onClick={copy}>
          {copyState === 'copied' ? <FiCheck size={15} aria-hidden="true" /> : <FiLink size={15} aria-hidden="true" />}
          <span aria-live="polite">
            {copyState === 'copied' ? labels.copied : copyState === 'failed' ? labels.copyFailed : labels.copyLink}
          </span>
        </button>
        {canNativeShare && (
          <button type="button" className={styles.shareButton} onClick={nativeShare}>
            <FiShare2 size={15} aria-hidden="true" />
            {labels.more}
          </button>
        )}
      </div>
    </div>
  );
}
