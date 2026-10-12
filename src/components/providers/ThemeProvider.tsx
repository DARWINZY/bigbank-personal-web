'use client';

import { createContext, useContext, useSyncExternalStore } from 'react';

type ThemeContextType = {
  theme: string | undefined;
  setTheme: (theme: string) => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: undefined,
  setTheme: () => null,
});

export const useTheme = () => useContext(ThemeContext);

const THEME_EVENT = 'themechange';

// The inline script in the layout sets data-theme before React loads, so the DOM is the
// source of truth. A theme picked in another tab arrives as a storage event; apply it here too.
function subscribe(onChange: () => void) {
  const onStorage = (e: StorageEvent) => {
    if (e.key !== 'theme') return;
    document.documentElement.setAttribute('data-theme', e.newValue === 'dark' ? 'dark' : 'light');
    onChange();
  };
  window.addEventListener(THEME_EVENT, onChange);
  window.addEventListener('storage', onStorage);
  return () => {
    window.removeEventListener(THEME_EVENT, onChange);
    window.removeEventListener('storage', onStorage);
  };
}

const getTheme = () => document.documentElement.getAttribute('data-theme') ?? 'light';
// Unknown while rendering on the server; the toggle shows a placeholder until hydration
const getServerTheme = () => undefined;

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getTheme, getServerTheme);

  const setTheme = (newTheme: string) => {
    try {
      localStorage.setItem('theme', newTheme);
    } catch {}
    document.documentElement.setAttribute('data-theme', newTheme === 'dark' ? 'dark' : 'light');
    window.dispatchEvent(new Event(THEME_EVENT));
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
