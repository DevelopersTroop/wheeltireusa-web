import Container from '@/components/ui/container/container';
import BrandSlider from './BrandSlider';
import Link from 'next/link';

const brandList = [
  '/images/home/tireBrand/Frame1.png',
  '/images/home/tireBrand/Frame2.png',
  '/images/home/tireBrand/Frame3.png',
  '/images/home/tireBrand/Frame4.png',
  '/images/home/tireBrand/Frame5.png',
];

const TheBestBrand = () => {
  return (
    <div>
      <div>
        <div>
          <BrandSlider images={brandList} />
        </div>
        <div>
          <BrandSlider images={brandList} />
        </div>
        <div>
          <BrandSlider images={brandList} />
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-4">
          <h1 className="text-[40px] font-bold">The Best of The Best</h1>
          <p className="text-xl font-normal">
            Top quality, lowest prices from the Best Brands
          </p>
        </div>

        <Link href={'#'} className="underline text-xl font-normal">
          View All Brands
        </Link>
      </div>

      <div>
        <div>
          <BrandSlider images={brandList} />
        </div>
        <div>
          <BrandSlider images={brandList} />
        </div>
        <div>
          <BrandSlider images={brandList} />
        </div>
      </div>
    </div>
  );
};

export default TheBestBrand;
