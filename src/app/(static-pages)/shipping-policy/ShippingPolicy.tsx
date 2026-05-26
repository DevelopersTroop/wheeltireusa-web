import Breadcrumb from '@/components/ui/breadcrumb/breadcrumb';
import Item from '@/components/ui/breadcrumb/item';
import Container from '@/components/ui/container/container';
import ShippingPolicyHero from './_components/ShippingPolicyHero/ShippingPolicyHero';
import ShippingPolicyContent from './_components/ShippingPolicyContent/ShippingPolicyContent';

// Component to render the Shipping Policy page
const ShippingPolicy = () => {
  return (
    <>
      
      {/* Hero section for the Shipping Policy page */}
      <ShippingPolicyHero />
      <ShippingPolicyContent />
    </>
  );
};

export default ShippingPolicy;
