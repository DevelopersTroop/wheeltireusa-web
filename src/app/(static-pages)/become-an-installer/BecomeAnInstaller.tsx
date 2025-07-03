import Breadcrumb from '@/components/ui/breadcrumb/breadcrumb';
import Item from '@/components/ui/breadcrumb/item';
import Container from '@/components/ui/container/container';
import BecomeAnInstallerHero from './_components/BecomeAnInstallerHero/BecomeAnInstallerHero';
import BecomeAnInstallerContent from './_components/BecomeAnInstallerContent/BecomeAnInstallerContent';
// Component to render the  Become and installer page
const BecomeAnInstaller = () => {
  return (
    <>
      <Container>
        {/* Breadcrumb navigation */}
        <div className="flex w-full items-start">
          <div className="w-full">
            <Breadcrumb>
              <Item href={`/`}>Home</Item>
              <Item href={`/become-an-installer`} isEnd={true}>
                Become an Installer
              </Item>
            </Breadcrumb>
          </div>
        </div>
      </Container>
      {/* Hero section for the Become and installer page */}
      <BecomeAnInstallerHero />
      <BecomeAnInstallerContent />
    </>
  );
};

export default BecomeAnInstaller;
