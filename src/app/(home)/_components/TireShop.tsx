'use client';

import QuantityInput from '@/app/collections/product/[singleProduct]/_tires/quantity-input';
import Container from '@/components/ui/container/container';
import { s3BucketUrl } from '@/utils/api';
import Image from 'next/image';

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

export default function TireShop() {
  return (
    <Container>
      <div className="hidden sm:flex flex-col gap-6 sm:gap-8 py-16 sm:py-28 bg-white text-center">
        <div className="flex flex-col gap-3 sm:gap-4 items-center justify-center">
          <h2 className="text-2xl md:text-[40px] font-semibold">
            Your next set of tires awaits
          </h2>
          <p className="text-[#464853] text-lg">
            Discover quality tires for every season and budget
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
          {tires.map((tire, index) => (
            <div
              key={index}
              className="border rounded-xl overflow-hidden bg-white text-left"
            >
              <div className="w-full px-4 py-6 flex flex-col ">
                <div className="w-full flex items-center justify-center">
                  <Image
                    src={
                      tire?.image !== ''
                        ? `${s3BucketUrl}/${tire.image}`
                        : '/not-available.webp'
                    }
                    alt={tire.name}
                    width={304}
                    height={300}
                    className="w-[304px] h-full object-cover"
                  />
                </div>
                {/* Stock Status */}
                <div className="flex gap-1 items-start relative">
                  <svg
                    width="16"
                    height="17"
                    viewBox="0 0 16 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect x="4" y="4.5" width="8" height="8" fill="white" />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M14.6668 8.49998C14.6668 12.1819 11.6821 15.1666 8.00016 15.1666C4.31826 15.1666 1.3335 12.1819 1.3335 8.49998C1.3335 4.81808 4.31826 1.83331 8.00016 1.83331C11.6821 1.83331 14.6668 4.81808 14.6668 8.49998ZM10.687 6.47976C10.8823 6.67502 10.8823 6.9916 10.687 7.18687L7.35372 10.5202C7.15845 10.7155 6.84187 10.7155 6.64661 10.5202L5.31328 9.18687C5.11801 8.9916 5.11801 8.67502 5.31328 8.47976C5.50854 8.2845 5.82512 8.2845 6.02038 8.47976L7.00016 9.45954L8.49005 7.96965L9.97994 6.47976C10.1752 6.2845 10.4918 6.2845 10.687 6.47976Z"
                      fill={'#04A777'}
                    />
                  </svg>

                  <p className="text-base leading-[19px] text-[#210203]">
                    <span className="text-[#210203] text-base font-normal">
                      {'In Stock'}
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-6 bg-[#F5F4F6] py-6 px-4">
                <div className="flex flex-col items-start gap-2">
                  <p className="text-base text-[#464853] font-normal">
                    {tire.brand}
                  </p>
                  <h3 className="text-2xl font-bold text-[#210203]">
                    {tire.name}
                  </h3>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <div className="flex flex-row justify-between items-center w-full">
                    <div className="">
                      <QuantityInput
                        product={tire}
                        inventoryAvailable={tire.inventory_available ? 4 : 0}
                        name={`quantity-${index}`}
                        id={`quantity-${index}`}
                        isDually={false} // Assuming not dually for simplicity
                      />
                    </div>
                    <div className="flex flex-row gap-2">
                      <p className="text-[#52545B] text-xl">x</p>
                      <p className="text-xl font-semibold text-[#212227]">
                        ${tire.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-row justify-between items-center w-full">
                    <p className="text-base text-[#52545B]">
                      Tire set discount
                    </p>
                    <p className="text-xl font-semibold text-[#212227]">
                      ${tire.discount.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="">
          <a href="#" className="text-xl underline font-normal">
            Shop all tires
          </a>
        </div>
      </div>
    </Container>
  );
}
