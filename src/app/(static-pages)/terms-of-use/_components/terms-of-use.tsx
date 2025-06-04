import Breadcrumb from '@/components/ui/breadcrumb/breadcrumb';
import Item from '@/components/ui/breadcrumb/item';
import Container from '@/components/ui/container/container';
import TermsOfUseHero from './terms-of-use-hero';
// Component to render the Privacy Policy page
const TermsOfUse = () => {
  return (
    <>
      <Container>
        {/* Breadcrumb navigation */}
        <div className="flex w-full items-start">
          <div className="w-full">
            <Breadcrumb>
              <Item href={`/`}>Home</Item>
              <Item href={`/terms-of-use`} isEnd={true}>
                Terms Of Use
              </Item>
            </Breadcrumb>
          </div>
        </div>
      </Container>
      {/* Hero section for the Privacy Policy page */}
      <TermsOfUseHero />
      <Container>
        {/* Main content section */}
        <div className="flex flex-col gap-[10px] items-start justify-center w-full mt-[10px] mb-10 md:mb-20">
          <div className="flex flex-col gap-[10px] items-start justify-center w-full">
            <h2 className="text-3xl font-semibold text-btext">Terms Of Use</h2>
            <p>Last Updated: June 3, 2025</p>
            <p>
              Welcome to{' '}
              <span className="font-semibold text-btext">Tirematic</span>. By
              accessing or using our website and services, you agree to comply
              with and be bound by these Terms of Use. Please read them
              carefully.
            </p>
            <p>
              If you do not agree with any part of these terms, you must not use
              our website or services. Your continued use constitutes acceptance
              of these Terms of Use.
            </p>
          </div>
        </div>
      </Container>
    </>
  );
};

export default TermsOfUse;
