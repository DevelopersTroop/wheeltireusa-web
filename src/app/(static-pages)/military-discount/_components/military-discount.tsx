import Breadcrumb from '@/components/ui/breadcrumb/breadcrumb';
import Item from '@/components/ui/breadcrumb/item';
import Container from '@/components/ui/container/container';
import MilitaryDiscountHero from './military-discount-hero';
// Component to render the Privacy Policy page
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
      {/* Hero section for the Privacy Policy page */}
      <MilitaryDiscountHero />
      <Container>
        {/* Main content section */}
        <div className="flex flex-col gap-[10px] items-start justify-center w-full mt-[10px] mb-10 md:mb-20">
          <div className="flex flex-col gap-[10px] items-start justify-center w-full">
            <h2 className="text-3xl font-semibold text-btext">
              Military Discount
            </h2>
            <p>Last Updated: June 3, 2025</p>
            <p>
              At <span className="font-semibold text-btext">Tirematic</span>, we
              honor and appreciate the service of military members and their
              families. This Military Discount Policy explains how we collect,
              use, and protect your personal information when you apply for or
              use our military discount, whether through our website, in-store,
              or via customer support.
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

export default MilitaryDiscount;
