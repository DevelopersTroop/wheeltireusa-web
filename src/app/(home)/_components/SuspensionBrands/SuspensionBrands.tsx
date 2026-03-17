"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/zoom";
import { Autoplay, Navigation, Zoom } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const SuspensionBrands = () => {
  return (
    <div className="py-10 px-25 max-w-[1350px] mx-auto bg-gray-50">
      <div className=" px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="py-4 lg:py-8 ">
          <hr className="border-primary border-[1.5px] w-[80px] mb-3" />
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold uppercase tracking-wide text-gray-800">
            Top Suspension Brands
          </h3>
        </div>

        {/* Swiper Gallery */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button className="absolute left-[-80px] top-1/2 -translate-y-1/2 z-30 p-2 bg-white rounded-full shadow-md hover:bg-primary hover:text-white transition-colors">
            <ChevronLeft size={28} className="swiper-button-prev-123" />
          </button>
          <button className="absolute right-[-80px] top-1/2 -translate-y-1/2 z-30 p-2 bg-white rounded-full shadow-md hover:bg-primary hover:text-white transition-colors">
            <ChevronRight size={28} className="swiper-button-next-123" />
          </button>

          <Swiper
            modules={[Autoplay, Navigation, Zoom]}
            zoom={true}
            navigation={{
              nextEl: `.swiper-button-next-123`,
              prevEl: `.swiper-button-prev-123`,
            }}
            breakpoints={{
              320: { slidesPerView: 1 },
              480: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
              1366: { slidesPerView: 5 },
            }}
            loop={true}
            spaceBetween={60}
            slidesOffsetBefore={50} 
            slidesOffsetAfter={50} 
            className="!w-full"
          >
            {Array.from({ length: 8 }).map((_, index) => (
              <SwiperSlide
                key={index}
                className="h-[150px] flex items-center justify-center"
              >
                <Link href="#">
                  <img
                    src={`/images/brands/${index + 1}.webp`}
                    className="w-full h-32 object-contain p-2 transition-transform duration-300 hover:scale-105 shadow-sm"
                    alt={`Brand ${index + 1}`}
                  />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Shop Button */}
        <div className="text-center mt-8 pb-6">
        <button className="px-6 py-3 rounded-md text-primary bg-[#d4d2d2]/50 text-lg md:text-xl font-semibold uppercase border border-primary transition-all duration-300 ease-in-out hover:bg-primary hover:text-white">
          <Link href="/collections/product-category/wheels">
            Shop Suspensions
          </Link>
        </button>
      </div>
      </div>
    </div>
  );
};

export default SuspensionBrands;