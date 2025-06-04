import Breadcrumb from '@/components/ui/breadcrumb/breadcrumb';
import Item from '@/components/ui/breadcrumb/item';
import Container from '@/components/ui/container/container';
import ReturnPolicyHero from './return-policy-hero';
// Component to render the Privacy Policy page
const ReturnPolicy = () => {
  return (
    <>
      <Container>
        {/* Breadcrumb navigation */}
        <div className="flex w-full items-start">
          <div className="w-full">
            <Breadcrumb>
              <Item href={`/`}>Home</Item>
              <Item href={`/return-policy`} isEnd={true}>
                Return Policy
              </Item>
            </Breadcrumb>
          </div>
        </div>
      </Container>
      {/* Hero section for the Privacy Policy page */}
      <ReturnPolicyHero />
      <Container>
        {/* Main content section */}
        <div className="flex flex-col gap-[10px] items-start justify-center w-full mt-[10px] mb-10 md:mb-20">
          <div className="flex flex-col gap-[10px] items-start justify-center w-full">
            <h2 className="text-3xl font-semibold text-btext">Return policy</h2>
            <p>Last Updated: June 3, 2025</p>
            <p>
              At <span className="font-semibold text-btext">Tirematic</span>, we
              want you to be completely satisfied with your purchase. If you are
              not satisfied, you may be eligible to return products under the
              terms outlined below. Please review our return policy carefully to
              understand your rights and responsibilities regarding returns,
              exchanges, and refunds.
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

export default ReturnPolicy;
