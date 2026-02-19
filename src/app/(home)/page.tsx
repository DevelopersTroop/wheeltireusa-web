import { metaDataHelper } from '@/utils/metadata';
import HeroSection from './_components/HeroSection/HeroSection';
import { Categories } from './_components/Categories/Categories';
import WheelCategories from './_components/WheelCategories/WheelCategories';
import WheelsGallery from './_components/WheelsGallery/WheelsGallery';
import TodaysDeals from './_components/TodaysDeals/TodaysDeals';
import HomeBlogList from './_components/HomeBlogList/HomeBlogList';
import BannerAndPoster from './_components/BannerAndPoster/BannerAndPoster';
import WheelsSection from './_components/WheelsSection/WheelsSection';
import ViewGallery from './_components/ViewGallery/ViewGallery';
import SuspensionBrands from './_components/SuspensionBrands/SuspensionBrands';
import SuspensionSection from './_components/SuspensionSection/SuspensionSection';
import BannerGrid from './_components/BannerGrid/BannerGrid';

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
      <WheelCategories />
      <WheelsGallery />
      <TodaysDeals/>
      <BannerGrid />
      <HomeBlogList/>
      <BannerAndPoster/>
      <WheelsSection/>
      <ViewGallery/>
      <SuspensionBrands/>
      <SuspensionSection/>
    </div>
  );
}
