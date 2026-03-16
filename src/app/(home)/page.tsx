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
  title: "Wheel Tire USA | Premium Wheels, Tires & Automotive Accessories",
  description:
    "Shop premium wheels, tires, and automotive accessories at Wheel Tire USA. Discover high-performance rims, forged wheels, and custom wheel solutions with fast shipping across the USA.",
  keywords:
    "wheels, tires, forged wheels, custom wheels, performance rims, car wheels USA, aftermarket wheels, alloy wheels, wheel tire USA",
  openGraph: {
    title: "Wheel Tire USA | Premium Wheels & Tires for Performance Vehicles",
    description:
      "Explore premium wheels, tires, and performance automotive accessories. Upgrade your ride with high-quality forged and custom wheels from Wheel Tire USA.",
    url: "https://wheeltireusa.com/",
    siteName: "Wheel Tire USA",
    type: "website",
  },
  alternates: {
    canonical: "https://wheeltireusa.com/",
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
