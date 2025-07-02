import Breadcrumb from '@/components/ui/breadcrumb/breadcrumb';
import Item from '@/components/ui/breadcrumb/item';
import Container from '@/components/ui/container/container';
import FinancingHero from './_components/FinancingHero/FinancingHero';
import { metaDataHelper } from '@/utils/metadata';
import FinancingContent from './_components/FinancingContent/FinancingContent';

// Metadata for the page
export const metadata = metaDataHelper({
  title: 'Financing - Tirematic',
  keywords: '',
  description: '',
  openGraph: {
    title: '',
    description: '',
  },
  alternates: {
    canonical: 'https://tirematic.com/financing',
  },
});

// Component to render the Financing page
const Financing = () => {
  return (
    <Container>
      {/* Breadcrumb navigation */}
      <div className="flex w-full items-start pt-2 pb-4">
        <div className="w-full">
          <Breadcrumb>
            <Item href={`/`}>Home</Item>
            <Item href={`/financing`} isEnd={true}>
              Financing
            </Item>
          </Breadcrumb>
        </div>
      </div>
      {/* <FinancingHero1 /> */}
      <FinancingHero />
      {/* Main Content Section */}
      <FinancingContent />
    </Container>
  );
};

export default Financing;
