import Breadcrumb from '@/components/ui/breadcrumb/breadcrumb';
import Item from '@/components/ui/breadcrumb/item';
import Container from '@/components/ui/container/container';
import TermsOfUseHero from './_components/TermsOfUseHero/TermsOfUseHero';
import { TermsOfUseContent } from './_components/TermsOfUseContent/TermsOfUseContent';
// Component to render the Terms Of Use page
const TermsOfUse = () => {
  return (
    <>
      
      {/* Hero section for the Terms Of Use page */}
      <TermsOfUseHero />
      <TermsOfUseContent />
    </>
  );
};

export default TermsOfUse;
