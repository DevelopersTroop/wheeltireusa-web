import { metaDataHelper } from '@/utils/metadata';
import AboutBanner from './_components/AboutBanner/AboutBanner';
import AboutImage from './_components/AboutImage/AboutImage';
import LookingAhead from './_components/LookingAhead/LookingAhead';
import WhyChooseTirematic from './_components/WhyChooseTirematic/WhyChooseTirematic';
import OurMissionVision from './_components/OurMissionVision/OurMissionVision';
import WhatDrivesUs from './_components/WhatDrivesUs/WhatDrivesUs';
import OurStory from './_components/OurStory/OurStory';

// Metadata for the page
export const metadata = metaDataHelper({
  title: 'About Us - Tirematic',
  keywords: '',
  description: '',
  openGraph: {
    title: '',
    description: '',
  },
  alternates: {
    canonical: 'https://tirematic.com/about-us',
  },
});

// Component to render the About Us page
const AboutUs = () => {
  return (
    <>
      <AboutBanner />
      <OurMissionVision />
      <WhatDrivesUs />
      <OurStory />
      <WhyChooseTirematic />
      <AboutImage />
      <LookingAhead />
    </>
  );
};

export default AboutUs;
