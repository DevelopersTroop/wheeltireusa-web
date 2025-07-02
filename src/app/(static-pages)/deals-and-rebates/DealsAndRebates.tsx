import Breadcrumb from '@/components/ui/breadcrumb/breadcrumb';
import Item from '@/components/ui/breadcrumb/item';
import Container from '@/components/ui/container/container';
import DealsAndRebatesHero from './_components/DealsAndRebatesHero/DealsAndRebatesHero';
import DealsAndRebatesContent from './_components/DealsAndRebatesContent/DealsAndRebatesContent';
// Component to render the Deals and rebates page
const DealsAndRebates = () => {
  return (
    <>
      <Container>
        {/* Breadcrumb navigation */}
        <div className="flex w-full items-start">
          <div className="w-full">
            <Breadcrumb>
              <Item href={`/`}>Home</Item>
              <Item href={`/deals-and-rebates`} isEnd={true}>
                Deals and Rebates
              </Item>
            </Breadcrumb>
          </div>
        </div>
      </Container>
      {/* Hero section for the Deals and rebatespage */}
      <DealsAndRebatesHero />
      <DealsAndRebatesContent />
    </>
  );
};

export default DealsAndRebates;
