import HeroSection from '@/components/sections/HeroSection';
import TechMarquee from '@/components/sections/TechMarquee';
import FeaturedWork from '@/components/home/FeaturedWork';
import LatestPosts from '@/components/home/LatestPosts';
import ContactCta from '@/components/home/ContactCta';

import { setRequestLocale } from 'next-intl/server';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <TechMarquee />
      <FeaturedWork />
      <LatestPosts />
      <ContactCta />
    </>
  );
}
