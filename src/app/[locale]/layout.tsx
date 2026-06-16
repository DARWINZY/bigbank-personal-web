import { NextIntlClientProvider, useMessages } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Inter, Noto_Sans_Thai, Noto_Sans_Lao, Playfair_Display } from 'next/font/google';
import ClickRippleEffect from '@/components/ui/ClickRippleEffect';
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
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `https://bigbank.nightbears.co/${locale}`,
      languages: {
        th: 'https://bigbank.nightbears.co/th',
        en: 'https://bigbank.nightbears.co/en',
        lo: 'https://bigbank.nightbears.co/lo',
        zh: 'https://bigbank.nightbears.co/zh',
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `https://bigbank.nightbears.co/${locale}`,
      siteName: 'Bigbank Portfolio',
      locale: locale === 'th' ? 'th_TH' : locale === 'en' ? 'en_US' : locale === 'lo' ? 'lo_LA' : 'zh_CN',
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
  setRequestLocale(locale);

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
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ClickRippleEffect />
          <Header />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
