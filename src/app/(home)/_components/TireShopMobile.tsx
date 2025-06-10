'use client';

import Container from '@/components/ui/container/container';
import { useGetProductsQuery } from '@/redux/apis/product';
import Link from 'next/link';
import { MobileItemsTireShop } from './TireShopMobileItems';

export default function TireShopMobile() {
  const { data } = useGetProductsQuery({
    size: 4,
    sort: 'Sort by price (high to low)',
  });
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

        <MobileItemsTireShop tires={data?.products} />

        <Link
          href={'/collections/product-category/tires'}
          className="text-xl underline font-normal"
        >
          Shop all tires
        </Link>
      </div>
    </Container>
  );
}
