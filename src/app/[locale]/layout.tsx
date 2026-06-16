import { NextIntlClientProvider, useMessages } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Inter, Noto_Sans_Thai, Noto_Sans_Lao, Playfair_Display } from 'next/font/google';
import type { Metadata } from 'next';

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
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `https://bigbank.dev/${locale}`,
      languages: {
        th: 'https://bigbank.dev/th',
        en: 'https://bigbank.dev/en',
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `https://bigbank.dev/${locale}`,
      siteName: 'Bigbank Portfolio',
      locale: locale === 'th' ? 'th_TH' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
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

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  let messages;
  try {
    messages = (await import(`@/messages/${locale}.json`)).default;
  } catch {
    notFound();
  }

  return (
    <html lang={locale} className={`${inter.variable} ${notoSansThai.variable} ${notoSansLao.variable} ${playfair.variable}`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'Person',
                  '@id': 'https://bigbank.dev/#person',
                  name: 'Nattapong Pongnukrohsiri',
                  alternateName: ['Bigbank', 'บิ๊กแบงค์', 'ณัฐพงษ์ พงษ์นุเคราะห์ศิริ'],
                  url: 'https://bigbank.dev',
                  jobTitle: 'Freelance Web Developer',
                  description:
                    'Freelance Web Developer specializing in modern, high-performance websites.',
                  sameAs: [
                    'https://github.com/bigbank',
                    'https://linkedin.com/in/bigbank',
                  ],
                },
                {
                  '@type': 'WebSite',
                  '@id': 'https://bigbank.dev/#website',
                  url: 'https://bigbank.dev',
                  name: 'Bigbank Portfolio',
                  publisher: { '@id': 'https://bigbank.dev/#person' },
                  inLanguage: locale,
                },
              ],
            }),
          }}
        />
      </head>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
