'use client';

import Container from '@/components/ui/container/container';
import { MobileItemsTireShop } from './TireShopMobileItems';

type Tire = {
  id: number;
  brand: string;
  name: string;
  price: number;
  discount: number;
  image: string;
  inventory_available: boolean;
};

const tires: Tire[] = Array(4).fill({
  id: 1,
  brand: 'Michelin',
  name: 'DEFENDER T+H',
  price: 197.0,
  discount: -1170.0,
  image: 'ns-products/tire.webp', // replace with actual image path
});

export default function TireShopMobile() {
  return (
    <Container>
      <div className=" flex flex-col sm:hidden gap-6 sm:gap-8 py-16 sm:py-28 bg-white text-center">
        <div className="flex flex-col gap-3 sm:gap-4 items-center justify-center">
          <h2 className="text-2xl md:text-[40px] font-semibold">
            Your next set of tires awaits
          </h2>
          <p className="text-[#464853] text-lg">
            Discover quality tires for every season and budget
          </p>
        </div>

        <MobileItemsTireShop tires={tires} />

        <div className="">
          <a href="#" className="text-xl underline font-normal">
            Shop all tires
          </a>
        </div>
      </div>
    </Container>
  );
}
