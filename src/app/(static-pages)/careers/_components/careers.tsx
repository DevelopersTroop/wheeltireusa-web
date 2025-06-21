import Breadcrumb from '@/components/ui/breadcrumb/breadcrumb';
import Item from '@/components/ui/breadcrumb/item';
import Container from '@/components/ui/container/container';
import CareersHero from './careers-hero';
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
      <Container>
        {/* Main content section */}
        <div className="flex flex-col gap-[10px] items-start justify-center w-full mt-[10px] mb-10 md:mb-20">
          <div className="flex flex-col gap-[10px] items-start justify-center w-full">
            <h2 className="text-3xl font-semibold text-btext">Careers</h2>
            <p>
              At <span className="font-semibold text-btext">Tirematic</span>, we
              believe our people are our greatest asset. We are always looking
              for passionate, talented, and driven individuals to join our
              growing team and help us shape the future of the tire and wheel
              industry.
            </p>
            <p>
              Explore exciting career opportunities with us and become part of a
              collaborative, innovative, and customer-focused environment. If
              you’re ready to make an impact and grow your career, we’d love to
              hear from you!
            </p>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Careers;
