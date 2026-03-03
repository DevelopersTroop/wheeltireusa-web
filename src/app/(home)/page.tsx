import { metaDataHelper } from '@/utils/metadata';
import HeroSection from './_components/HeroSection/HeroSection';
import { Categories } from './_components/Categories/Categories';
import WheelCategories from './_components/WheelCategories/WheelCategories';
import ProductGallery from './_components/ProductGallery/ProductGallery';
import TodaysDeals from './_components/TodaysDeals/TodaysDeals';
import HomeBlogList from './_components/HomeBlogList/HomeBlogList';
import WheelsSection from './_components/WheelsSection/WheelsSection';
import ViewGallery from './_components/ViewGallery/ViewGallery';
import SuspensionBrands from './_components/SuspensionBrands/SuspensionBrands';
import SuspensionSection from './_components/SuspensionSection/SuspensionSection';
import BannerGrid from './_components/BannerGrid/BannerGrid';
import BannerAndPoster from './_components/BannerAndPoster/BannerAndPoster';

// Metadata for the page
export const metadata = metaDataHelper({
  title: 'Home - Wheel Tire USA',
  keywords: '',
  description: '',
  openGraph: {
    title: '',
    description: '',
  },
  alternates: {
    canonical: 'https://wheeltireusa.com/',
  },
});

export default function Homepage() {
  return (
    <div>
      <HeroSection />
      <Categories />
      {/* <BannerGrid /> */}
      <WheelCategories />
      <ProductGallery
        category="tire"
        title="
            Popular Tires Available & in-stock"
      />
      <ProductGallery
        category="wheels"
        title="
            Popular Wheels Available & in-stock"
      />
      <TodaysDeals />
      <HomeBlogList />
      <BannerAndPoster />
      <WheelsSection />
      <ViewGallery />
      <SuspensionBrands />
      {/* <SuspensionSection /> */}
    </div>
  );
}
