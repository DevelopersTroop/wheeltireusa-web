import { metaDataHelper } from '@/utils/metadata';
import DealsAndRebates from './_components/DealsAndRebates';
import { HomeHero } from './_components/HomeHero';
import PerfectTireMatch from './_components/PerfectTireMatch';
import ShopByCategory from './_components/ShopByCategory';
import TireShop from './_components/TireShop';
import TireShopMobile from './_components/TireShopMobile';
import BrandSection from './_components/BrandSection';
import TireSupport from './_components/TireSupport';
import TheBestBrand from './_components/TheBestBrand';

// Metadata for the page
export const metadata = metaDataHelper({
  title: 'Home - Tirematic',
  keywords: '',
  description: '',
  openGraph: {
    title: '',
    description: '',
  },
  alternates: {
    canonical: 'https://tirematic.com',
  },
});

export default function Homepage() {
  return (
    <div>
      <HomeHero />
      <BrandSection />
      <DealsAndRebates />
      <PerfectTireMatch />
      <TireShopMobile />
      <TireShop />
      <ShopByCategory />
      <TheBestBrand />
      <TireSupport />
    </div>
  );
}
