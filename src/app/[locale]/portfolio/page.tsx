import PortfolioSection from '@/components/sections/PortfolioSection';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'nav' });
  return {
    title: `${t('portfolio')} | Bigbank`,
    alternates: { canonical: `https://bigbank.nightbears.co/${locale}/portfolio` },
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <PortfolioSection />;
}
