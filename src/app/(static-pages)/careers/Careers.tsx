import Breadcrumb from '@/components/ui/breadcrumb/breadcrumb';
import Item from '@/components/ui/breadcrumb/item';
import Container from '@/components/ui/container/container';
import CareersHero from './_components/CareersHero/CareersHero';
import CareersContent from './_components/CareersContent/CareersContent';
// Component to render the Careers page
const Careers = () => {
  return (
    <>
      <Container>
        {/* Breadcrumb navigation */}
        <div className="flex w-full items-start">
          <div className="w-full">
            <Breadcrumb>
              <Item href={`/`}>Home</Item>
              <Item href={`/careers`} isEnd={true}>
                Careers
              </Item>
            </Breadcrumb>
          </div>
        </div>
      </Container>
      {/* Hero section for the Careers page */}
      <CareersHero />
      <CareersContent />
    </>
  );
};

export default Careers;
