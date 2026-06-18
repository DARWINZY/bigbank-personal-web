'use client';

import { useTheme } from '@/components/providers/ThemeProvider';
import { useEffect, useState } from 'react';
import { BsSun, BsMoon } from 'react-icons/bs';
import styles from '@/styles/header.module.css';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className={styles.themeToggle} style={{ width: 36, height: 36 }} />;
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
