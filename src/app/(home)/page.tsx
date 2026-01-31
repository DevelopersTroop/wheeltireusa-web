import { metaDataHelper } from '@/utils/metadata';
import HeroSection from './_components/HeroSection/HeroSection';
import { Categories } from './_components/Categories/Categories';
import WheelCategories from './_components/HeroSection/components/WheelCategories/WheelCategories';

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
    </div>
  );
}
