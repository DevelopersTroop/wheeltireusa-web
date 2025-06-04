import Breadcrumb from '@/components/ui/breadcrumb/breadcrumb';
import Item from '@/components/ui/breadcrumb/item';
import Container from '@/components/ui/container/container';
import StoreLocatorHero from './store-locator-hero';
// Component to render the Privacy Policy page
const StoreLocator = () => {
  return (
    <>
      <Container>
        {/* Breadcrumb navigation */}
        <div className="flex w-full items-start">
          <div className="w-full">
            <Breadcrumb>
              <Item href={`/`}>Home</Item>
              <Item href={`/store-locator`} isEnd={true}>
                Store Locator
              </Item>
            </Breadcrumb>
          </div>
        </div>
      </Container>
      {/* Hero section for the Privacy Policy page */}
      <StoreLocatorHero />
      <Container>
        {/* Main content section */}
        <div className="flex flex-col gap-[10px] items-start justify-center w-full mt-[10px] mb-10 md:mb-20">
          <div className="flex flex-col gap-[10px] items-start justify-center w-full">
            <h2 className="text-3xl font-semibold text-btext">Store Locator</h2>
            <p>Last Updated: June 3, 2025</p>
            <p>
              At <span className="font-semibold text-btext">Tirematic</span>,
              our Store Locator helps you find authorized dealers and retail
              locations near you. Use this page to search for stores, view
              contact details, and get directions. We may collect your location
              information (with your permission) to provide accurate results and
              enhance your experience.
            </p>
            <p>
              By using our services, you agree to the collection and use of
              information in accordance with this policy. If you do not agree
              with the terms of this policy, please do not use our services.
            </p>
          </div>
        </div>
      </Container>
    </>
  );
};

export default StoreLocator;
