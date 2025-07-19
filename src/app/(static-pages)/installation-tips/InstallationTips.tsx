import Breadcrumb from '@/components/ui/breadcrumb/breadcrumb';
import Item from '@/components/ui/breadcrumb/item';
import Container from '@/components/ui/container/container';
import InstallationTipsHero from './_components/InstallationTipsHero/InstallationTipsHero';
import InstallationTipsContent from './_components/InstallationTipsContent/InstallationTipsContent';
// Component to render the Installation tips page
const InstallationTips = () => {
  return (
    <>
      <Container>
        {/* Breadcrumb navigation */}
        <div className="flex w-full items-start">
          <div className="w-full">
            <Breadcrumb>
              <Item href={`/`}>Home</Item>
              <Item href={`/installation-tips`} isEnd={true}>
                Installation Tips
              </Item>
            </Breadcrumb>
          </div>
        </div>
      </Container>
      {/* Hero section for the Installation tips page */}
      <InstallationTipsHero />
      <InstallationTipsContent />
    </>
  );
};

export default InstallationTips;
