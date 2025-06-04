import Breadcrumb from '@/components/ui/breadcrumb/breadcrumb';
import Item from '@/components/ui/breadcrumb/item';
import Container from '@/components/ui/container/container';
import TirePressureGuideHero from './tire-pressure-guide-hero';
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
              <Item href={`/tire-pressure-guide`} isEnd={true}>
                Tire Pressure Guide
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
              Tire Pressure Guide
            </h2>
            <p>Last Updated: June 3, 2025</p>
            <p>
              Proper tire pressure is essential for your safety, vehicle
              performance, and tire longevity. This guide will help you
              understand the importance of maintaining correct tire pressure and
              how to check and adjust it for your vehicle.
            </p>
            <p>
              Always follow your vehicle manufacturer’s recommended tire
              pressure, which can be found in your owner’s manual or on the
              driver’s side door jamb. Regularly checking your tire pressure
              helps prevent uneven wear, improves fuel efficiency, and ensures
              optimal handling.
            </p>
          </div>
        </div>
      </Container>
    </>
  );
};

export default TirePressureGuide;
