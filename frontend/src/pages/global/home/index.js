import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import HeroSection from './HeroSection';
import SteakSection from './SteakSection';
import HuntingSection from './HuntingSection';
import BBQSteakSection from './BBQSteakSection';
import ScrollToTop from './ScrollToTop';
import useScrollEffects from './useScrollEffects';

const Home = () => {
  const { user } = useAuth0();

  useScrollEffects();

  return (
    <div className="relative overflow-hidden">
      <HeroSection user={user} />
      <SteakSection />
      <HuntingSection />
      <BBQSteakSection />
      <ScrollToTop />
    </div>
  );
};

export default Home;