'use client';

import { useEffect, useRef } from 'react';
import { FiList } from 'react-icons/fi';
import type { TocItem } from '@/lib/markdown';
import styles from '@/styles/blog-post.module.css';

/**
 * Table of contents for phones and tablets, a popover under its button. Picking a heading,
 * pressing Escape or tapping anywhere else closes it, so it never sits over the article.
 */
export default function MobileToc({ items, title }: { items: TocItem[]; title: string }) {
  const ref = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const details = ref.current;
    if (!details) return;
    const close = () => details.removeAttribute('open');
    const onPointerDown = (e: PointerEvent) => {
      if (details.open && !details.contains(e.target as Node)) close();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape' || !details.open) return;
      close();
      details.querySelector('summary')?.focus();
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  return (
    <details ref={ref} className={styles.mobileToc}>
      <summary className={styles.mobileTocButton}>
        <FiList size={16} aria-hidden="true" />
        {title}
      </summary>
      <ul className={styles.mobileTocList}>
        {items.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`} onClick={() => ref.current?.removeAttribute('open')}>
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
}
