import Breadcrumb from '@/components/ui/breadcrumb/breadcrumb';
import Item from '@/components/ui/breadcrumb/item';
import Container from '@/components/ui/container/container';
import TirePressureGuideHero from './_components/TirePressureGuideHero/TirePressureGuideHero';
import TirePressureGuideContent from './_components/TirePressureGuideContent/TirePressureGuideContent';
// Component to render the Tire Pressure Guide page
const TirePressureGuide = () => {
  return (
    <>
      <Container>
        {/* Breadcrumb navigation */}
        <div className="flex w-full items-start">
          <div className="w-full">
            <Breadcrumb>
              <Item href={`/`}>Home</Item>
              <Item href={`/tire-pressure-guide`} isEnd={true}>
                Tire Pressure Guide
              </Item>
            </Breadcrumb>
          </div>
        </div>
      </Container>
      {/* Hero section for the Tire Pressure Guide page */}
      <TirePressureGuideHero />
      <TirePressureGuideContent />
    </>
  );
};

export default TirePressureGuide;
