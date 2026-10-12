import AboutSection from '@/components/sections/AboutSection';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return buildMetadata({
    locale,
    path: 'about',
    title: `${t('nav.about')} | Bigbank`,
    description: t('metadata.about_description'),
  });
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <AboutSection />;
}
