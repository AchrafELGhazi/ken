import { Hero } from '../components/home/Hero';
import { About } from '../components/home/About';
import { PlatformOverview } from '../components/home/PlatformOverview';
import { Testimonials } from '../components/home/Testimonials';
import { CTASection } from '../components/home/CTASection';
import { Footer } from '@/components/shared/Footer';

export const Home = () => {
  return (
    <div>
      <Hero />
      <About />
      <PlatformOverview />
      <Testimonials />
      <CTASection />
      <Footer />
    </div>
  );
};
