import { NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Inter, Noto_Sans_Thai, Noto_Sans_Lao, Noto_Serif_Lao, Trirong, Playfair_Display } from 'next/font/google';
import type { Metadata } from 'next';
import { buildMetadata, SITE_URL } from '@/lib/seo';
import { CLOUDFLARE_ANALYTICS_TOKEN } from '@/lib/analytics';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const notoSansThai = Noto_Sans_Thai({
  subsets: ['thai'],
  display: 'swap',
  variable: '--font-noto-thai',
});

const notoSansLao = Noto_Sans_Lao({
  subsets: ['lao'],
  display: 'swap',
  variable: '--font-noto-lao',
});

const notoSerifLao = Noto_Serif_Lao({
  subsets: ['lao'],
  weight: ['600'],
  display: 'swap',
  variable: '--font-noto-serif-lao',
});

const trirong = Trirong({
  subsets: ['thai'],
  weight: ['600'],
  display: 'swap',
  variable: '--font-trirong',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
});
type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    metadataBase: new URL(SITE_URL),
    ...buildMetadata({ locale, title: t('title'), description: t('description') }),
    keywords: ['Bigbank', 'Nattapong Pongnukrohsiri', 'Software Engineer', 'Portfolio', 'Nightbears Technology', 'Web Developer', 'React', 'Next.js', 'รับทำเว็บไซต์', 'รับเขียนโปรแกรม', 'ณัฐพงษ์ พงษ์นุเคราะห์ศิริ', 'บิ๊กแบงค์'],
    authors: [{ name: 'Nattapong Pongnukrohsiri', url: SITE_URL }],
    creator: 'Nattapong Pongnukrohsiri',
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  if (!routing.locales.includes(locale as "th" | "en" | "lo")) {
    notFound();
  }

  const common = await getTranslations({ locale, namespace: 'common' });

  let messages;
  try {
    messages = (await import(`@/messages/${locale}.json`)).default;
  } catch {
    notFound();
  }

  return (
    <html lang={locale} className={`${inter.variable} ${notoSansThai.variable} ${notoSansLao.variable} ${notoSerifLao.variable} ${trirong.variable} ${playfair.variable}`} suppressHydrationWarning>
      <head>
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://static.cloudflareinsights.com; style-src 'self' 'unsafe-inline' fonts.googleapis.com; font-src 'self' fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://formsubmit.co https://cloudflareinsights.com;"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'Person',
                  '@id': 'https://bigbank.nightbears.co/#person',
                  name: 'Nattapong Pongnukrohsiri',
                  alternateName: ['Bigbank', 'บิ๊กแบงค์', 'ณัฐพงษ์ พงษ์นุเคราะห์ศิริ', 'นัดทะพง พงนุเคาะสิริ', '纳塔蓬·蓬努克罗西里'],
                  url: 'https://bigbank.nightbears.co',
                  jobTitle: 'Software Engineer',
                  description:
                    'High School Software Engineer @ Nightbears Technology specializing in modern web and app development.',
                  sameAs: [
                    'https://github.com/DARWINZY',
                  ],
                },
                {
                  '@type': 'WebSite',
                  '@id': 'https://bigbank.nightbears.co/#website',
                  url: 'https://bigbank.nightbears.co',
                  name: 'Nattapong Pongnukrohsiri (Bigbank)',
                  publisher: { '@id': 'https://bigbank.nightbears.co/#person' },
                  inLanguage: locale,
                },
              ],
            }),
          }}
        />
      </head>
      <body>
        <a href="#main" className="skip-link">{common('skip_to_content')}</a>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header />
          <main id="main" tabIndex={-1}>{children}</main>
          <Footer />
          {CLOUDFLARE_ANALYTICS_TOKEN && (
            // Cloudflare's snippet as is. next/script would add a non-CORS preload that a
            // module script can't reuse, so the beacon downloaded twice.
            <script
              type="module"
              defer
              src="https://static.cloudflareinsights.com/beacon.min.js"
              data-cf-beacon={JSON.stringify({ token: CLOUDFLARE_ANALYTICS_TOKEN })}
            />
          )}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
