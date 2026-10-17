const languages = [
  { href: '/th/', label: 'ภาษาไทย' },
  { href: '/en/', label: 'English' },
  { href: '/lo/', label: 'ພາສາລາວ' },
];

/** Shown only for the moment before the redirect, or if it never happens. */
export default function RootPage() {
  return (
    <main style={{ minHeight: '100vh', display: 'grid', placeContent: 'center', gap: 16, padding: 24, textAlign: 'center' }}>
      <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 28, fontWeight: 600 }}>Bigbank</p>
      <nav aria-label="Choose a language" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8 }}>
        {languages.map((l) => (
          <a
            key={l.href}
            href={l.href}
            style={{ padding: '8px 16px', border: '1px solid var(--color-border)', borderRadius: 999, fontSize: 14 }}
          >
            {l.label}
          </a>
        ))}
      </nav>
    </main>
  );
}
