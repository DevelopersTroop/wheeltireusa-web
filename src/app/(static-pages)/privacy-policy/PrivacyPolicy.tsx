import Container from '@/components/ui/container/container';
import PrivacyPolicyHero from './_components/PrivacyPolicyHero/PrivacyPolicyHero';
import Breadcrumb from '@/components/ui/breadcrumb/breadcrumb';
import Item from '@/components/ui/breadcrumb/item';
import PrivacyPolicyContent from './_components/PrivacyPolicyContent/PrivacyPolicyContent';
// Component to render the Privacy Policy page
const PrivacyPolicy = () => {
  return (
    <>
      <Container>
        {/* Breadcrumb navigation */}
        <div className="flex w-full items-start">
          <div className="w-full">
            <Breadcrumb>
              <Item href={`/`}>Home</Item>
              <Item href={`/privacy-policy`} isEnd={true}>
                Privacy Policy
              </Item>
            </Breadcrumb>
          </div>
        </div>
      </Container>
      {/* Hero section for the Privacy Policy page */}
      <PrivacyPolicyHero />
      <PrivacyPolicyContent />
    </>
  );
};

export default PrivacyPolicy;
