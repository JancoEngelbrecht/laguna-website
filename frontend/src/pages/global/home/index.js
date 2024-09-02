import React from 'react';
import {useUser} from '../../../services/UserProvider'

import HeroSection from './HeroSection';
import SteakSection from './SteakSection';
import HuntingSection from './HuntingSection';
import BBQSteakSection from './BBQSteakSection';
import ScrollToTop from './ScrollToTop';
import useScrollEffects from './useScrollEffects';
import PrivacyConsentBanner from '../../../components/common/global/PrivacyConsentBanner';

const Home = () => {
  const { user } = useUser();

  useScrollEffects();

  return (
    <div className="relative overflow-hidden">
      <HeroSection user={user} />
      <SteakSection />
      <HuntingSection />
      <BBQSteakSection />
      <ScrollToTop />
      <PrivacyConsentBanner />
    </div>
  );
};

export default Home;