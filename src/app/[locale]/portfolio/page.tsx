import PortfolioSection from '@/components/sections/PortfolioSection';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return buildMetadata({
    locale,
    path: 'portfolio',
    title: `${t('nav.portfolio')} | Bigbank`,
    description: t('metadata.portfolio_description'),
  });
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <PortfolioSection />;
}
