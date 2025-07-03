import Breadcrumb from '@/components/ui/breadcrumb/breadcrumb';
import Item from '@/components/ui/breadcrumb/item';
import Container from '@/components/ui/container/container';
import TireAdviceHero from './_components/TireAdviceHero/TireAdviceHero';
import TireAdviceContent from './_components/TireAdviceContent/TireAdviceContent';
// Component to render the Tire Advic page
const TireAdvice = () => {
  return (
    <>
      <Container>
        {/* Breadcrumb navigation */}
        <div className="flex w-full items-start">
          <div className="w-full">
            <Breadcrumb>
              <Item href={`/`}>Home</Item>
              <Item href={`/tire-advice`} isEnd={true}>
                Tire Advice
              </Item>
            </Breadcrumb>
          </div>
        </div>
      </Container>
      {/* Hero section for the Tire Advic page */}
      <TireAdviceHero />
      <TireAdviceContent />
    </>
  );
};

export default TireAdvice;
