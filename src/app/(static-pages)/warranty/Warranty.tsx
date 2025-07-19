import Breadcrumb from '@/components/ui/breadcrumb/breadcrumb';
import Item from '@/components/ui/breadcrumb/item';
import Container from '@/components/ui/container/container';
import WarrantyHero from './_components/WarrantyHero/warranty-hero';
import WarrantyContent from './_components/WarrantyContent/WarrantyContent';
// Component to render the Privacy Policy page
const Warranty = () => {
  return (
    <>
      <Container>
        {/* Breadcrumb navigation */}
        <div className="flex w-full items-start">
          <div className="w-full">
            <Breadcrumb>
              <Item href={`/`}>Home</Item>
              <Item href={`/warranty`} isEnd={true}>
                Warranty
              </Item>
            </Breadcrumb>
          </div>
        </div>
      </Container>
      {/* Hero section for the Privacy Policy page */}
      <WarrantyHero />
      <WarrantyContent />
    </>
  );
};

export default Warranty;
