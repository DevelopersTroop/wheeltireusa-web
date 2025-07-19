import { metaDataHelper } from '@/utils/metadata';
import DealsAndRebates from './_components/DealsAndRebates/DealsAndRebates';
import { HomeHero } from './_components/Hero/HomeHero';
import PerfectTireMatch from './_components/PerfectTireMatch/PerfectTireMatch';
import ShopByCategory from './_components/ShopByCategory/ShopByCategory';
import TireShop from './_components/TireShop/TireShop';
import BrandSection from './_components/BrandSection/BrandSection';
import TireSupport from './_components/TireSupport/TireSupport';
import TheBestBrand from './_components/TheBestBrand/TheBestBrand';
import TireShopMobile from './_components/TireShop/TireShopMobile';

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
