import Breadcrumb from '@/components/ui/breadcrumb/breadcrumb';
import Item from '@/components/ui/breadcrumb/item';
import Container from '@/components/ui/container/container';
import WarrantyHero from './warranty-hero';
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
              <Item href={`/warranty`} isEnd={true}>
                Warranty
              </Item>
            </Breadcrumb>
          </div>
        </div>
      </Container>
      {/* Hero section for the Privacy Policy page */}
      <WarrantyHero />
      <Container>
        {/* Main content section */}
        <div className="flex flex-col gap-[10px] items-start justify-center w-full mt-[10px] mb-10 md:mb-20">
          <div className="flex flex-col gap-[10px] items-start justify-center w-full">
            <h2 className="text-3xl font-semibold text-btext">Warranty</h2>
            <p>Last Updated: June 3, 2025</p>
            <p>
              At <span className="font-semibold text-btext">Tirematic</span>, we
              stand behind the quality of our products. All tires purchased from
              us are covered by the manufacturer’s warranty, which protects
              against defects in materials and workmanship under normal use.
            </p>
            <p>
              Warranty coverage periods and terms may vary by manufacturer and
              product. Please refer to the specific warranty documentation
              provided with your purchase for detailed information.
            </p>
            <p>
              To make a warranty claim, please contact our customer support team
              with your proof of purchase and details about the issue. We will
              assist you in processing your claim according to the
              manufacturer’s guidelines.
            </p>
            <p>
              This warranty does not cover damage caused by improper
              installation, misuse, accidents, or normal wear and tear. For any
              questions regarding warranty coverage, please reach out to us.
            </p>
          </div>
        </div>
      </Container>
    </>
  );
};

export default TermsOfUse;
