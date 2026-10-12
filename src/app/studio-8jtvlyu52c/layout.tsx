import { Inter, Noto_Sans_Thai } from 'next/font/google';
import type { Metadata } from 'next';

// Private post dashboard. Not linked anywhere and kept out of search engines;
// what actually protects it is the GitHub token, which only the owner has.

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });
const notoSansThai = Noto_Sans_Thai({ subsets: ['thai'], display: 'swap', variable: '--font-noto-thai' });

export const metadata: Metadata = {
  title: 'Studio',
  robots: { index: false, follow: false, nocache: true },
};

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th" data-theme="light" className={`${inter.variable} ${notoSansThai.variable}`}>
      <head>
        <meta name="referrer" content="no-referrer" />
      </head>
      <body>{children}</body>
    </html>
  );
}
