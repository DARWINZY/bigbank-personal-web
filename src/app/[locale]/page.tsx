import HeroSection from '@/components/sections/HeroSection';
import TechMarquee from '@/components/sections/TechMarquee';

import { setRequestLocale } from 'next-intl/server';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <TechMarquee />
    </>
  );
}
