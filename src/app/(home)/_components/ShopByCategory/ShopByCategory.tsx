import Container from '@/components/ui/container/container';
import Image from 'next/image';
import Link from 'next/link';

const tireData = [
  {
    id: 1,
    title: 'DEFENDER T+H',
    brand: 'Michelin',
    image: '/images/shopCategoty/image1.png', // Replace with actual path
    label: 'View Off-Road tires',
  },
  {
    id: 2,
    title: 'DEFENDER T+H',
    brand: 'Michelin',
    image: '/images/shopCategoty/image2.png',
    label: 'View Off-Road tires',
  },
  {
    id: 3,
    title: 'DEFENDER T+H',
    brand: 'Michelin',
    image: '/images/shopCategoty/image3.png',
    label: 'View Off-Road tires',
  },
];

const ShopByCategory = () => {
  return (
    <div className="bg-[#131316]">
      <Container>
        <div className="w-full h-full flex flex-col md:flex-row gap-18 md:gap-8 items-center justify-center py-16 md:py-28 text-white">
          <div className="w-full md:w-1/2 flex flex-col gap-6 sm:gap-8">
            <div className="flex flex-col gap-3 sm:gap-4">
              <p className="text-base sm:text-xl text-[#AFB0B6] font-normal uppercase tracking-wide">
                Shop by Category
              </p>
              <h2 className="text-[24px] md:text-[40px] text-[#FFFFFF] font-bold">
                Tires for Every Road, Every Journey
              </h2>
              <p className="text-base sm:text-xl text-[#AFB0B6] font-normal">
                Whether its city streets or off-road adventures, find your
                perfect match here.
              </p>
            </div>
            <Link href={"/collections/product-category/tires'"}>
              <button className="w-full max-w-[384px] bg-[#F6511D] hover:bg-[#e0551b] text-white font-semibold text-lg px-6 py-3 rounded text-center flex items-center justify-center gap-2">
                <img alt="" src="/images/shopCategoty/Vector.svg" /> Select
                category
              </button>
            </Link>
          </div>

          <div className="w-full md:w-1/2 flex flex-col gap-12">
            {tireData.map((tire) => (
              <div
                key={tire.id}
                className="w-full h-[160px] flex items-center rounded"
              >
                <div className="w-1/2 lg:w-3/5 h-[160px] relative">
                  <img
                    src="/images/shopCategoty/tire.png"
                    alt="Tire"
                    // width={110}
                    // height={110}
                    className="absolute h-[120%] -top-9 left-0 z-10"
                  />
                  <Image
                    src={tire.image}
                    alt={tire.title}
                    width={200}
                    height={160}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="w-1/2 lg:w-2/5 h-full px-5 py-4 flex flex-col justify-between bg-[#212227] rounded-r-md">
                  <div className="flex flex-col gap-2">
                    <span className="text-[12px] sm:text-base font-normal text-[#FFFFFF]">
                      {tire.brand}
                    </span>
                    <h4 className="text-[#FFFFFF] font-bold text-lg sm:text-2xl">
                      {tire.title}
                    </h4>
                  </div>
                  <a
                    href="#"
                    className="text-[##FFFFFF] text-[13px] sm:text-base font-normal underline"
                  >
                    {tire.label}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ShopByCategory;
