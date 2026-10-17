import type { Metadata } from 'next';
import { buildMetadata, SITE_URL } from '@/lib/seo';

// The bare domain only forwards visitors to a language. It is a real HTML page (not a
// client-side redirect) so crawlers, link previews and no-JS browsers still land on /th/.

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  ...buildMetadata({
    locale: 'th',
    title: 'ณัฐพงษ์ พงษ์นุเคราะห์ศิริ (บิ๊กแบงค์) - Software Engineer',
    description: 'พอร์ตโฟลิโอของบิ๊กแบงค์ ณัฐพงษ์ พงษ์นุเคราะห์ศิริ ผลงาน รางวัล และบทความ',
  }),
};

// People get the language their browser prefers; bots always get Thai (the x-default),
// so search engines index the same page every time.
const pickLanguage = `(function () {
  try {
    var target = '/th/';
    if (!/bot|crawl|spider|slurp|facebookexternalhit|preview/i.test(navigator.userAgent)) {
      var langs = navigator.languages || [navigator.language || ''];
      for (var i = 0; i < langs.length; i++) {
        var l = String(langs[i]).toLowerCase();
        if (l.indexOf('th') === 0) break;
        if (l.indexOf('lo') === 0) { target = '/lo/'; break; }
        if (l.indexOf('en') === 0) { target = '/en/'; break; }
      }
    }
    location.replace(target + location.search + location.hash);
  } catch (e) {}
})();`;

export default function RootRedirectLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <head>
        <script dangerouslySetInnerHTML={{ __html: pickLanguage }} />
        {/* Fallback when JavaScript is off */}
        <meta httpEquiv="refresh" content="1; url=/th/" />
      </head>
      <body>{children}</body>
    </html>
  );
}
