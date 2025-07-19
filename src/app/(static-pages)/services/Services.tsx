import Breadcrumb from '@/components/ui/breadcrumb/breadcrumb';
import Item from '@/components/ui/breadcrumb/item';
import Container from '@/components/ui/container/container';
import ServicesHero from './_components/ServicesHero/ServicesHero';
import ServicesContent from './_components/ServicesContent/ServicesContent';
// Component to render the Services page
const Services = () => {
  return (
    <>
      <Container>
        {/* Breadcrumb navigation */}
        <div className="flex w-full items-start">
          <div className="w-full">
            <Breadcrumb>
              <Item href={`/`}>Home</Item>
              <Item href={`/services`} isEnd={true}>
                Services
              </Item>
            </Breadcrumb>
          </div>
        </div>
      </Container>
      {/* Hero section for the Services page */}
      <ServicesHero />
      <ServicesContent />
    </>
  );
};

export default Services;
