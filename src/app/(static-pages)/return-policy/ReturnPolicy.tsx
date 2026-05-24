import Breadcrumb from '@/components/ui/breadcrumb/breadcrumb';
import Item from '@/components/ui/breadcrumb/item';
import Container from '@/components/ui/container/container';
import ReturnPolicyHero from './_components/ReturnPolicyHero/ReturnPolicyHero';
import ReturnPolicyContent from './_components/ReturnPolicyContent/ReturnPolicyContent';
// Component to render the Return Policy page
const ReturnPolicy = () => {
  return (
    <>
      
      {/* Hero section for the Return Policy page */}
      <ReturnPolicyHero />
      <ReturnPolicyContent />
    </>
  );
};

export default ReturnPolicy;
