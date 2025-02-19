import { Hero } from '../components/home/Hero';
import { About } from '../components/home/About';
import { PlatformOverview } from '../components/home/PlatformOverview';
import { Testimonials } from '../components/home/Testimonials';
import { CTASection } from '../components/home/CTASection';
import { Footer } from '@/components/shared/Footer';
import { useEffect } from 'react';
import { isClientUser, isNGOUser, useAuth } from '@/context/UserContext';

export const Home = () => {
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      console.log('Current User:', user);

      if (isClientUser(user)) {
        console.log('Client User Details:', {
          name: user.fullName,
          interests: user.fieldsOfInterest,
          goals: user.careerGoals,
        });
      } else if (isNGOUser(user)) {
        console.log('NGO User Details:', {
          organization: user.orgName,
          expertise: user.expertise,
          mission: user.missionStatement,
        });
      }
    } else {
      console.log('No user is currently logged in');
    }
  }, [user]);

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
