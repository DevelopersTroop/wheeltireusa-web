import Breadcrumb from '@/components/ui/breadcrumb/breadcrumb';
import Item from '@/components/ui/breadcrumb/item';
import Container from '@/components/ui/container/container';
import CustomerSupportHero from './_components/CustomerSupportHero/CustomerSupportHero';
import CustomerSupportContent from './_components/CustomerSupportContent/CustomerSupportContent';
// Component to render the Customer support page
const CustomerSupport = () => {
  return (
    <>
      <Container>
        {/* Breadcrumb navigation */}
        <div className="flex w-full items-start">
          <div className="w-full">
            <Breadcrumb>
              <Item href={`/`}>Home</Item>
              <Item href={`/customer-support`} isEnd={true}>
                Customer Support
              </Item>
            </Breadcrumb>
          </div>
        </div>
      </Container>
      {/* Hero section for the Customer support page */}
      <CustomerSupportHero />
      <CustomerSupportContent />
    </>
  );
};

export default CustomerSupport;
