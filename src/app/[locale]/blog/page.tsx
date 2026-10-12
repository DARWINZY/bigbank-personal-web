import BlogPreview from '@/components/sections/BlogPreview';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return buildMetadata({
    locale,
    path: 'blog',
    title: `${t('nav.blog')} | Bigbank`,
    description: t('blog.description'),
  });
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <BlogPreview />;
}
