import { metaDataHelper } from '@/utils/metadata';
import DealsAndRebates from './_components/DealsAndRebates';
import { HomeHero } from './_components/HomeHero';
import PerfectTireMatch from './_components/PerfectTireMatch';
import ShopByCategory from './_components/ShopByCategory';
import TireShop from './_components/TireShop';
import TireShopMobile from './_components/TireShopMobile';

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
      <DealsAndRebates />
      <PerfectTireMatch />
      <TireShopMobile />
      <TireShop />
      <ShopByCategory />
    </div>
  );
}
