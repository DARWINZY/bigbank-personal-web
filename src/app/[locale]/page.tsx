import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import PortfolioSection from '@/components/sections/PortfolioSection';
import BlogPreview from '@/components/sections/BlogPreview';
import ContactSection from '@/components/sections/ContactSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <PortfolioSection />
      <BlogPreview />
      <ContactSection />
    </>
  );
}
