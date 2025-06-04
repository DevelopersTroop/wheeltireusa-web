import Breadcrumb from '@/components/ui/breadcrumb/breadcrumb';
import Item from '@/components/ui/breadcrumb/item';
import Container from '@/components/ui/container/container';
import BecomeAnInstallerHero from './become-an-installer-hero';
// Component to render the Privacy Policy page
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
      {/* Hero section for the Privacy Policy page */}
      <BecomeAnInstallerHero />
      <Container>
        {/* Main content section */}
        <div className="flex flex-col gap-[10px] items-start justify-center w-full mt-[10px] mb-10 md:mb-20">
          <div className="flex flex-col gap-[10px] items-start justify-center w-full">
            <h2 className="text-3xl font-semibold text-btext">
              Become an Installer
            </h2>
            <p>
              Interested in partnering with{' '}
              <span className="font-semibold text-btext">Tirematic</span>? We’re
              looking for skilled and motivated installers to join our trusted
              network. As a Tirematic installer, you’ll gain access to new
              customers, flexible job opportunities, and dedicated support from
              our team.
            </p>
            <p>
              Grow your business and reputation by delivering top-quality tire
              and wheel installation services. If you’re ready to expand your
              reach and work with a forward-thinking company, apply to become a
              Tirematic installer today!
            </p>
          </div>
        </div>
      </Container>
    </>
  );
};

export default BecomeAnInstaller;
