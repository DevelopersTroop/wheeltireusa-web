import Breadcrumb from '@/components/ui/breadcrumb/breadcrumb';
import Item from '@/components/ui/breadcrumb/item';
import Container from '@/components/ui/container/container';
import DeliveryAndInstallationHero from './_components/DeliveryAndInstallationHero/DeliveryAndInstallationHero';
import DeliveryAndInstallationContent from './_components/DeliveryAndInstallationContent/DeliveryAndInstallationContent';
// Component to render the Delivery and Installation page
const DeliveryAndInstallation = () => {
  return (
    <>
      <Container>
        {/* Breadcrumb navigation */}
        <div className="flex w-full items-start">
          <div className="w-full">
            <Breadcrumb>
              <Item href={`/`}>Home</Item>
              <Item href={`/delivery-and-installation`} isEnd={true}>
                Delivery and Installation
              </Item>
            </Breadcrumb>
          </div>
        </div>
      </Container>
      {/* Hero section for the Delivery and Installation page */}
      <DeliveryAndInstallationHero />
      <DeliveryAndInstallationContent />
    </>
  );
};

export default DeliveryAndInstallation;
