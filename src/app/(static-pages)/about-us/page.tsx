import AboutBanner from './_components/about-banner';
import AboutContent from './_components/about-content';
import AboutImage from './_components/about-image';
import LookingAhead from './_components/looking-ahead';
import WhyChooseTirematic from './_components/why-chooseTIrematic';

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
