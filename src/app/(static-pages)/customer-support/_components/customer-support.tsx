import Breadcrumb from '@/components/ui/breadcrumb/breadcrumb';
import Item from '@/components/ui/breadcrumb/item';
import Container from '@/components/ui/container/container';
import CustomerSupportHero from './customer-support-hero';
// Component to render the Privacy Policy page
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
      {/* Hero section for the Privacy Policy page */}
      <CustomerSupportHero />
      <Container>
        {/* Main content section */}
        <div className="flex flex-col gap-[10px] items-start justify-center w-full mt-[10px] mb-10 md:mb-20">
          <div className="flex flex-col gap-[10px] items-start justify-center w-full">
            <h2 className="text-3xl font-semibold text-btext">
              Customer Support
            </h2>
            <p>Last Updated: June 3, 2025</p>
            <p>
              At <span className="font-semibold text-btext">Tirematic</span>,
              our Customer Support team is dedicated to assisting you with any
              questions, concerns, or issues you may encounter. This page
              explains how you can reach us, what information we may collect
              during support interactions, and how we use that information to
              provide you with the best possible service.
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

export default CustomerSupport;
