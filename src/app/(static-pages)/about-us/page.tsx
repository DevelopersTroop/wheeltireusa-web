import { metaDataHelper } from '@/utils/metadata';
import AboutBanner from './_components/about-banner';
import AboutContent from './_components/about-content';
import AboutImage from './_components/about-image';
import LookingAhead from './_components/looking-ahead';
import WhyChooseTirematic from './_components/why-chooseTIrematic';

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
      <AboutContent />
      <WhyChooseTirematic />
      <AboutImage />
      <LookingAhead />
    </>
  );
};

export default AboutUs;
