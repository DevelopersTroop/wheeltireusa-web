import Container from '@/components/ui/container/container';
import BrandSlider from './BrandSlider';
import Link from 'next/link';
import { BrandMobileSlider } from './BrandMobileSlider';

const brandList = [
  '/images/home/tireBrand/Frame1.png',
  '/images/home/tireBrand/Frame2.png',
  '/images/home/tireBrand/Frame3.png',
  '/images/home/tireBrand/Frame4.png',
  '/images/home/tireBrand/Frame5.png',
  '/images/home/tireBrand/Frame5.png',
  '/images/home/tireBrand/Frame5.png',
  '/images/home/tireBrand/Frame5.png',
  '/images/home/tireBrand/Frame5.png',
  '/images/home/tireBrand/Frame5.png',
  '/images/home/tireBrand/Frame5.png',
];

const TheBestBrand = () => {
  return (
    <div>
      <div className=" grid-cols-3 gap-6 items-center w-full bg-[#212227] text-white hidden lg:grid">
        <div className="space-y-4 overflow-hidden flex-col relative flex items-start">
          <div className="w-full h-full min-h-[100px] -ml-20">
            <BrandSlider images={brandList} />
          </div>
          <div className="w-full h-full min-h-[100px] -ml-56">
            <BrandSlider images={brandList} />
          </div>
          <div className="w-full h-full min-h-[100px] -ml-36">
            <BrandSlider images={brandList} />
          </div>
        </div>

        <div className="flex flex-col gap-5 text-center">
          <div className="flex flex-col gap-4 justify-center">
            <h1 className="text-[40px] font-bold">The Best of The Best</h1>
            <p className="text-xl font-normal">
              Top quality, lowest prices from the Best Brands
            </p>
          </div>

          <Link
            href={'/collections/product-category/tires'}
            className="underline text-xl font-normal"
          >
            View All Brands
          </Link>
        </div>

        <div className="space-y-4 overflow-hidden flex-col relative flex items-end">
          <div className="w-full h-full min-h-[100px] -mr-20">
            <BrandSlider images={brandList} />
          </div>
          <div className="w-full h-full min-h-[100px] -mr-56">
            <BrandSlider images={brandList} />
          </div>
          <div className="w-full h-full min-h-[100px] -mr-36">
            <BrandSlider images={brandList} />
          </div>
        </div>
      </div>

      <div className="lg:hidden bg-[#212227] text-white space-y-10">
        <div className="min-h-[100px] h-full w-full">
          <BrandMobileSlider images={brandList} />
        </div>
        <div className="flex flex-col gap-5 text-center">
          <div className="flex flex-col gap-4 justify-center">
            <h1 className="text-[24px] md:text-[34px] font-bold">
              The Best of The Best
            </h1>
            <p className="text-base md:text-xl font-normal">
              Top quality, lowest prices from <br /> the Best Brands
            </p>
          </div>

          <Link
            href={'/collections/product-category/tires'}
            className="underline text-xl font-normal"
          >
            View All Brands
          </Link>
        </div>

        <div className="min-h-[100px] h-full w-full">
          <BrandMobileSlider images={brandList} />
        </div>
      </div>
    </div>
  );
};

export default TheBestBrand;
