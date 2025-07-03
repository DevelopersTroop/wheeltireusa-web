import Breadcrumb from '@/components/ui/breadcrumb/breadcrumb';
import Item from '@/components/ui/breadcrumb/item';
import Container from '@/components/ui/container/container';
import ReturnPolicyHero from './_components/ReturnPolicyHero/ReturnPolicyHero';
import ReturnPolicyContent from './_components/ReturnPolicyContent/ReturnPolicyContent';
// Component to render the Return Policy page
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
      {/* Hero section for the Return Policy page */}
      <ReturnPolicyHero />
      <ReturnPolicyContent />
    </>
  );
};

export default ReturnPolicy;
