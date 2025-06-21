import Breadcrumb from '@/components/ui/breadcrumb/breadcrumb';
import Item from '@/components/ui/breadcrumb/item';
import Container from '@/components/ui/container/container';
import DealsAndRebatesHero from './deals-and-rebates-hero';
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
      <Container>
        {/* Main content section */}
        <div className="flex flex-col gap-[10px] items-start justify-center w-full mt-[10px] mb-10 md:mb-20">
          <div className="flex flex-col gap-[10px] items-start justify-center w-full">
            <h2 className="text-3xl font-semibold text-btext">
              Deals And Rebates
            </h2>
            <p>Last Updated: June 3, 2025</p>
            <p>
              At <span className="font-semibold text-btext">Tirematic</span>, we
              strive to bring you the best deals and rebates on tires, wheels,
              and related products. This page explains how we collect, use, and
              protect your information when you participate in our deals,
              rebates, or promotional offers.
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

export default DealsAndRebates;
