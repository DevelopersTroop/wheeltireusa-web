import Breadcrumb from '@/components/ui/breadcrumb/breadcrumb';
import Item from '@/components/ui/breadcrumb/item';
import Container from '@/components/ui/container/container';
import TirePressureGuideHero from './installation-tips-hero';
// Component to render the Privacy Policy page
const TirePressureGuide = () => {
  return (
    <>
      <Container>
        {/* Breadcrumb navigation */}
        <div className="flex w-full items-start">
          <div className="w-full">
            <Breadcrumb>
              <Item href={`/`}>Home</Item>
              <Item href={`/installation-tips`} isEnd={true}>
                Installation Tips
              </Item>
            </Breadcrumb>
          </div>
        </div>
      </Container>
      {/* Hero section for the Privacy Policy page */}
      <TirePressureGuideHero />
      <Container>
        {/* Main content section */}
        <div className="flex flex-col gap-[10px] items-start justify-center w-full mt-[10px] mb-10 md:mb-20">
          <div className="flex flex-col gap-[10px] items-start justify-center w-full">
            <h2 className="text-3xl font-semibold text-btext">
              Installation Tips
            </h2>
            <p>Last Updated: June 3, 2025</p>
            <p>
              Installing your Tirematic sensors and system correctly is crucial
              for accurate tire monitoring and long-term reliability. This guide
              provides step-by-step tips to ensure a smooth installation process
              and optimal performance.
            </p>
            <p>
              Before starting, review your Tirematic product manual and gather
              all necessary tools. Make sure your vehicle is parked on a flat
              surface and the tires are cool. Follow each installation step
              carefully, double-check sensor placement, and test the system
              after setup to confirm proper operation.
            </p>
          </div>
        </div>
      </Container>
    </>
  );
};

export default TirePressureGuide;
