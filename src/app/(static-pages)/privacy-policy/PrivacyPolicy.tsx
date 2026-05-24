import Container from '@/components/ui/container/container';
import PrivacyPolicyHero from './_components/PrivacyPolicyHero/PrivacyPolicyHero';
import Breadcrumb from '@/components/ui/breadcrumb/breadcrumb';
import Item from '@/components/ui/breadcrumb/item';
import PrivacyPolicyContent from './_components/PrivacyPolicyContent/PrivacyPolicyContent';
// Component to render the Privacy Policy page
const PrivacyPolicy = () => {
  return (
    <>
      
      {/* Hero section for the Privacy Policy page */}
      <PrivacyPolicyHero />
      <PrivacyPolicyContent />
    </>
  );
};

export default PrivacyPolicy;
