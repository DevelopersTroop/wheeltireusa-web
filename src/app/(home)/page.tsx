import DealsAndRebates from './_components/DealsAndRebates';
import { HomeHero } from './_components/HomeHero';
import PerfectTireMatch from './_components/PerfectTireMatch';
import ShopByCategory from './_components/ShopByCategory';
import TireShop from './_components/TireShop';
import TireShopMobile from './_components/TireShopMobile';

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
