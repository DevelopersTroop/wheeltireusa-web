'use client';

import TireQuantity from '@/components/shared/TireQuantity/TireQuantity';
import { TInventoryItem } from '@/types/product';
import { getProductThumbnail } from '@/utils/product';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useRef } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';

export const MobileItemsTireShop: React.FC<{
  tires: TInventoryItem[][] | undefined;
}> = ({ tires }) => {
  const swiperRef = useRef<SwiperRef>(null);

  const updateBullets = () => {
    const bullets = document.querySelectorAll<HTMLSpanElement>(
      '.custom-swiper-pagination-offroad .custom-bullet-offroad'
    );
    bullets.forEach((bullet) => {
      bullet.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M7.99992 14.6666C11.6818 14.6666 14.6666 11.6818 14.6666 7.99992C14.6666 4.31802 11.6818 1.33325 7.99992 1.33325C4.31802 1.33325 1.33325 4.31802 1.33325 7.99992C1.33325 11.6818 4.31802 14.6666 7.99992 14.6666ZM11.969 8.49983H9.93693C9.84493 8.85734 9.65657 9.17617 9.40118 9.42697L10.4174 11.187C11.2538 10.5516 11.8325 9.59438 11.969 8.49983ZM9.55174 11.6878L8.53541 9.92742C8.36498 9.97467 8.1854 9.99992 7.99992 9.99992C7.81442 9.99992 7.63483 9.97467 7.46438 9.92741L6.44806 11.6877C6.92524 11.8888 7.4496 11.9999 7.99992 11.9999C8.55022 11.9999 9.07457 11.8888 9.55174 11.6878ZM5.58245 11.187L6.59863 9.42694C6.34325 9.17614 6.1549 8.85733 6.06291 8.49983H4.03085C4.16732 9.59436 4.74599 10.5516 5.58245 11.187ZM11.969 7.49983H9.93689C9.84487 7.14238 9.65651 6.8236 9.40115 6.57284L10.4173 4.81277C11.2538 5.44819 11.8325 6.40535 11.969 7.49983ZM9.5517 4.31206C9.07454 4.11104 8.55021 3.99992 7.99992 3.99992C7.44962 3.99992 6.92527 4.11104 6.4481 4.31208L7.46443 6.07241C7.63486 6.02517 7.81444 5.99992 7.99992 5.99992C8.18538 5.99992 8.36495 6.02516 8.53537 6.0724L9.5517 4.31206ZM6.59866 6.57286L5.58249 4.81279C4.74605 5.44821 4.16738 6.40536 4.03088 7.49983H6.06295C6.15496 7.14239 6.34331 6.82363 6.59866 6.57286Z" fill="#210203"/>
        </svg>
      `;
    });
  };

  return (
    <div className="relative">
      <Swiper
        ref={swiperRef}
        pagination={{
          el: '.custom-swiper-pagination-offroad',
          clickable: true,
          bulletClass: 'custom-bullet-offroad',
        }}
        modules={[Pagination, Navigation]}
        navigation={{
          nextEl: `.swiper-button-next`,
          prevEl: `.swiper-button-prev`,
        }}
        className="relative group"
        spaceBetween={16}
        slidesPerView={'auto'}
        onPaginationUpdate={updateBullets} // <-- listen to pagination updates
      >
        <button
          className="absolute left-0 top-1/2 z-50 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-[rgba(0,0,0,0.5)] text-white opacity-100 transition-opacity duration-300 ease-in-out hover:bg-[rgba(0,0,0,0.7)] group-hover:flex group-hover:opacity-100"
          onClick={() => swiperRef?.current?.swiper.slidePrev()}
        >
          <ChevronLeft size={32} />
        </button>
        {/* Slides */}
        {tires?.map((tire, i) => {
          const isSquare = tire.length === 1;
          return (
            <SwiperSlide
              className="w-full h-fit border rounded-xl overflow-hidden bg-white text-left swiper-slide-custom"
              key={i}
            >
              <div className="w-full px-4 py-6 flex flex-col ">
                <div className="w-full flex items-center justify-center">
                  <Image
                    src={getProductThumbnail(tire[0])}
                    alt={tire[0]?.title || tire[0]?.description || ''}
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
                    {tire[0]?.brand}
                  </p>
                  <h3 className="text-2xl font-bold text-[#210203]">
                    {tire[0]?.title || tire[0]?.description || ''}
                  </h3>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <div className="flex flex-row justify-between items-center w-full">
                    <div className="">
                      <TireQuantity
                        otherQuantity={0}
                        product={tire[0]}
                        setQuantity={(q) => {
                          console.log('update quantity = ', q);
                        }}
                        quantityStep={isSquare ? 2 : 1}
                        quantity={4}
                      />
                    </div>
                    <div className="flex flex-row gap-2">
                      <p className="text-[#52545B] text-xl">x</p>
                      <p className="text-xl font-semibold text-[#212227]">
                        ${tire[0]?.price?.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-row justify-between items-center w-full">
                    <p className="text-base text-[#52545B]">
                      Tire set discount
                    </p>
                    <p className="text-xl font-semibold text-[#212227]">
                      ${(0).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
        <button
          className="absolute right-0 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-[rgba(0,0,0,0.5)] text-white opacity-100 transition-opacity duration-300 ease-in-out hover:bg-[rgba(0,0,0,0.7)] group-hover:flex group-hover:opacity-100"
          onClick={() => swiperRef.current?.swiper.slideNext()}
        >
          <ChevronRight size={32} />
        </button>
      </Swiper>

      {/* Custom Pagination */}
      <div className="custom-swiper-pagination-offroad flex gap-2 justify-start mb-4 pl-4 pt-3" />
    </div>
  );
};
