import Container from '@/components/ui/container/container';
import Image from 'next/image';

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
        <div className="w-full h-full flex flex-col md:flex-row gap-8 items-center justify-center py-8 md:py-28 text-white">
          <div className="w-full md:w-1/2 flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <p className="text-xl text-[#AFB0B6] font-normal uppercase tracking-wide">
                Shop by Category
              </p>
              <h2 className="text-3xl md:text-[40px] text-[#FFFFFF] font-bold">
                Tires for Every Road, Every Journey
              </h2>
              <p className="text-xl text-[#AFB0B6] font-normal">
                Whether its city streets or off-road adventures, find your
                perfect match here.
              </p>
            </div>
            <button className="w-full max-w-[384px] bg-[#F6511D] hover:bg-[#e0551b] text-white font-semibold text-lg px-6 py-3 rounded text-center flex items-center justify-center gap-2">
              <img src="/images/shopCategoty/Vector.svg" /> Select category
            </button>
          </div>

          <div className="w-full md:w-1/2 flex flex-col gap-12">
            {tireData.map((tire) => (
              <div key={tire.id} className="flex items-center rounded ">
                <div className="w-3/5 relative">
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
                    height={100}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="w-2/5 h-full px-5 py-4 flex flex-col justify-between gap-3 sm:gap-10">
                  <div className="flex flex-col gap-2">
                    <span className="text-base font-normal text-[#FFFFFF]">
                      {tire.brand}
                    </span>
                    <h4 className="text-[#FFFFFF] font-bold text-lg sm:text-2xl">
                      {tire.title}
                    </h4>
                  </div>
                  <a
                    href="#"
                    className="text-[##FFFFFF] text-base font-normal underline"
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
