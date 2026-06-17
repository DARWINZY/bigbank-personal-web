import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import TechMarquee from '@/components/sections/TechMarquee';
import PortfolioSection from '@/components/sections/PortfolioSection';
import BlogPreview from '@/components/sections/BlogPreview';
import ContactSection from '@/components/sections/ContactSection';

import { setRequestLocale } from 'next-intl/server';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <AboutSection />
      <TechMarquee />
      <PortfolioSection />
      <BlogPreview />
      <ContactSection />
    </>
  );
}
