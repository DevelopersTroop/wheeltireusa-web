import Breadcrumb from '@/components/ui/breadcrumb/breadcrumb';
import Item from '@/components/ui/breadcrumb/item';
import Container from '@/components/ui/container/container';
import MilitaryDiscountHero from './_components/MilitaryDiscountHero/MilitaryDiscountHero';
import MilitaryDiscountContent from './_components/MilitaryDiscountContent/MilitaryDiscountContent';
// Component to render the Military Discount page
const MilitaryDiscount = () => {
  return (
    <>
      <Container>
        {/* Breadcrumb navigation */}
        <div className="flex w-full items-start">
          <div className="w-full">
            <Breadcrumb>
              <Item href={`/`}>Home</Item>
              <Item href={`/military-discount`} isEnd={true}>
                Military Discount
              </Item>
            </Breadcrumb>
          </div>
        </div>
      </Container>
      {/* Hero section for the Military Discount page */}
      <MilitaryDiscountHero />
      <MilitaryDiscountContent />
    </>
  );
};

export default MilitaryDiscount;
