import Breadcrumb from '@/components/ui/breadcrumb/breadcrumb';
import Item from '@/components/ui/breadcrumb/item';
import Container from '@/components/ui/container/container';
import SafetyTipsHero from './safety-tips-hero';
// Component to render the Privacy Policy page
const SafetyTips = () => {
  return (
    <>
      <Container>
        {/* Breadcrumb navigation */}
        <div className="flex w-full items-start">
          <div className="w-full">
            <Breadcrumb>
              <Item href={`/`}>Home</Item>
              <Item href={`/safety-tips`} isEnd={true}>
                Safety Tips
              </Item>
            </Breadcrumb>
          </div>
        </div>
      </Container>
      {/* Hero section for the Privacy Policy page */}
      <SafetyTipsHero />
      <Container>
        {/* Main content section */}
        <div className="flex flex-col gap-[10px] items-start justify-center w-full mt-[10px] mb-10 md:mb-20">
          <div className="flex flex-col gap-[10px] items-start justify-center w-full">
            <h2 className="text-3xl font-semibold text-btext">Safety Tips</h2>
            <p>Last Updated: June 3, 2025</p>
            <p>
              At <span className="font-semibold text-btext">Tirematic</span>,
              your safety is our top priority. We are committed to providing you
              with the information and resources you need to stay safe when
              purchasing, installing, and using tires and wheels.
            </p>
            <p>
              Please review these safety tips carefully to help protect
              yourself, your passengers, and your vehicle. By following these
              guidelines, you can reduce risks and ensure a safer driving
              experience.
            </p>
          </div>
        </div>
      </Container>
    </>
  );
};

export default SafetyTips;
