'use client';

import { useEffect, useState } from 'react';
import styles from '@/styles/not-found.module.css';

export type Locale = 'th' | 'en' | 'lo' | 'zh';

export interface NotFoundCopy {
  title: string;
  description: string;
  didYouMean: string;
  home: string;
  nav: Record<(typeof PAGES)[number], string>;
}

const LOCALES: Locale[] = ['th', 'en', 'lo', 'zh'];
const PAGES = ['about', 'portfolio', 'resume', 'blog', 'contact'] as const;

interface Props {
  copy: Record<Locale, NotFoundCopy>;
  posts: { slug: string; title: Partial<Record<Locale, string>> & { th: string } }[];
}

type Suggestion = { href: string; label: string };

/** Edit distance, for "did you mean" on mistyped URLs. */
function distance(a: string, b: string): number {
  const row = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let prev = row[0];
    row[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const temp = row[j];
      row[j] = Math.min(row[j] + 1, row[j - 1] + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1));
      prev = temp;
    }
  }
  return row[b.length];
}

function closest(input: string, candidates: string[]): string | null {
  let best: string | null = null;
  let bestScore = Infinity;
  for (const c of candidates) {
    const d = distance(input, c);
    if (d < bestScore) {
      bestScore = d;
      best = c;
    }
  }
  // Allow roughly one typo per three characters
  return best !== null && bestScore <= Math.max(2, Math.floor(best.length / 3)) ? best : null;
}

function browserLocale(): Locale {
  for (const lang of navigator.languages ?? [navigator.language]) {
    const code = lang.toLowerCase().slice(0, 2);
    if (LOCALES.includes(code as Locale)) return code as Locale;
  }
  return 'th';
}

/**
 * GitHub Pages serves the same 404.html for every missing URL, so the language and
 * the suggestion are worked out in the browser from the path that was requested.
 */
export default function NotFoundContent({ copy, posts }: Props) {
  const [locale, setLocale] = useState<Locale>('th');
  const [path, setPath] = useState('');
  const [suggestion, setSuggestion] = useState<Suggestion | null>(null);

  useEffect(() => {
    let requested = window.location.pathname;
    try {
      requested = decodeURIComponent(requested);
    } catch {
      // Malformed %-escapes: show the path as it came
    }
    const [first, ...rest] = requested.split('/').filter(Boolean);
    const loc = LOCALES.includes(first as Locale) ? (first as Locale) : browserLocale();
    // A first segment that looks like some other language code (/fr/about/) is skipped too
    const hasLocalePrefix = LOCALES.includes(first as Locale) || /^[a-z]{2}$/i.test(first ?? '');
    const segments = hasLocalePrefix ? rest : [first, ...rest].filter(Boolean);

    let found: Suggestion | null = null;
    if (segments[0] === 'blog' && segments[1]) {
      const slug = closest(segments[1].toLowerCase(), posts.map((p) => p.slug));
      const post = posts.find((p) => p.slug === slug);
      if (post) found = { href: `/${loc}/blog/${post.slug}/`, label: post.title[loc] || post.title.th };
    } else if (segments[0]) {
      const page = closest(segments[0].toLowerCase(), [...PAGES]) as (typeof PAGES)[number] | null;
      if (page) found = { href: `/${loc}/${page}/`, label: copy[loc].nav[page] };
    }

    document.documentElement.lang = loc;
    // Reading the URL is only possible after mount; one render later is fine for a 404
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLocale(loc);
    setPath(requested);
    setSuggestion(found);
  }, [copy, posts]);

  const t = copy[locale];

  return (
    <main className={styles.page}>
      <div className={styles.inner}>
        <a href={`/${locale}/`} className={styles.wordmark}>Bigbank</a>

        <h1 className={styles.title}>{t.title}</h1>
        <p className={styles.description}>{t.description}</p>
        {path && (
          <p className={styles.path}>
            <span className={styles.code}>404</span>
            <del>{path}</del>
          </p>
        )}

        {suggestion && (
          <a href={suggestion.href} className={styles.suggestion}>
            <span className={styles.suggestionLabel}>{t.didYouMean}</span>
            <span className={styles.suggestionTarget}>{suggestion.label}</span>
          </a>
        )}

        <nav className={styles.links} aria-label={t.home}>
          <a href={`/${locale}/`} className={styles.link}>{t.home}</a>
          {PAGES.map((page) => (
            <a key={page} href={`/${locale}/${page}/`} className={styles.link}>{t.nav[page]}</a>
          ))}
        </nav>
      </div>
    </main>
  );
}
