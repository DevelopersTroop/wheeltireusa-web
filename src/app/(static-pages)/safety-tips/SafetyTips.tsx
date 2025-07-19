import Breadcrumb from '@/components/ui/breadcrumb/breadcrumb';
import Item from '@/components/ui/breadcrumb/item';
import Container from '@/components/ui/container/container';
import SafetyTipsHero from './_components/SafetyTipsHero/SafetyTipsHero';
import SafetyTipsContent from './_components/SafetyTipsContent/SafetyTipsContent';
// Component to render the Safety Tips page
const SafetyTips = () => {
  return (
    <>
      <Container>
        {/* Breadcrumb navigation */}
        <div className="flex w-full items-start">
          <div className="w-full">
            <Breadcrumb>
              <Item href={`/`}>Home</Item>
              <Item href={`/safety-tips`} isEnd={true}>
                Safety Tips
              </Item>
            </Breadcrumb>
          </div>
        </div>
      </Container>
      {/* Hero section for the Safety Tips page */}
      <SafetyTipsHero />
      <SafetyTipsContent />
    </>
  );
};

export default SafetyTips;
