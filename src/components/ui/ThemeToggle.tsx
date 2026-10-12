'use client';

import { useTheme } from '@/components/providers/ThemeProvider';
import { BsSun, BsMoon } from 'react-icons/bs';
import styles from '@/styles/header.module.css';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  // Theme is only known in the browser; keep the space so the header doesn't shift
  if (theme === undefined) {
    return <div className={styles.themeToggle} aria-hidden="true" />;
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button
      className={styles.themeToggle}
      onClick={toggleTheme}
      aria-label="Toggle Dark Mode"
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? <BsSun size={18} /> : <BsMoon size={18} />}
    </button>
  );
}
