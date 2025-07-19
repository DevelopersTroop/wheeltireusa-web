import Breadcrumb from '@/components/ui/breadcrumb/breadcrumb';
import Item from '@/components/ui/breadcrumb/item';
import Container from '@/components/ui/container/container';
import StoreLocatorHero from './_components/StoreLocatorHero/StoreLocatorHero';
import StoreLocatorContent from './_components/StoreLocatorContent/StoreLocatorContent';
// Component to render the Store Location page
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
      {/* Hero section for the Store Location page */}
      <StoreLocatorHero />
      <StoreLocatorContent />
    </>
  );
};

export default StoreLocator;
