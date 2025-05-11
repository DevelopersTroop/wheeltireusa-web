import DealsAndRebates from './_components/DealsAndRebates';
import { HomeHero } from './_components/HomeHero';
import PerfectTireMatch from './_components/PerfectTireMatch';
import ShopByCategory from './_components/ShopByCategory';

export default function Homepage() {
  return (
    <div>
      <HomeHero />
      <DealsAndRebates />
      <PerfectTireMatch />
      <ShopByCategory />
    </div>
  );
}
