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
    <div className="max-w-[1350px] mx-auto py-8 sm:py-10 px-0 sm:px-6 lg:px-10 bg-gray-50">

      {/* Section Title */}
      <div className="py-4 lg:py-8 px-4 sm:px-0">
        <hr className="border-primary border-[1.5px] w-[80px] mb-3" />
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-wide text-gray-800">
          Top Brands
        </h3>
      </div>

      {/* Swiper + nav in relative wrapper */}
      <div className="relative">
        <Swiper
          modules={[Autoplay, Navigation, Zoom]}
          zoom={true}
          navigation={{
            nextEl: ".swiper-next-suspension",
            prevEl: ".swiper-prev-suspension",
          }}
          breakpoints={{
            320:  { slidesPerView: 2, spaceBetween: 16 },
            480:  { slidesPerView: 3, spaceBetween: 20 },
            768:  { slidesPerView: 4, spaceBetween: 28 },
            1024: { slidesPerView: 5, spaceBetween: 36 },
            1366: { slidesPerView: 6, spaceBetween: 40 },
          }}
          loop={true}
          className="!px-8 sm:!px-10"
        >
          {Array.from({ length: 8 }).map((_, index) => (
            <SwiperSlide
              key={index}
              className="!h-auto flex items-center justify-center"
            >
              <Link href="#" className="block">
                <img
                  src={`/images/brands/${index + 1}.webp`}
                  className="w-full h-20 sm:h-24 lg:h-32 object-contain p-2 transition-transform duration-300 hover:scale-105"
                  alt={`Brand ${index + 1}`}
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Nav buttons */}
        <button className="swiper-prev-suspension absolute left-0 top-1/2 -translate-y-1/2 z-30 p-1.5 sm:p-2 bg-white rounded-full shadow-md hover:bg-primary hover:text-white transition-colors cursor-pointer">
          <ChevronLeft size={22} className="sm:w-7 sm:h-7" />
        </button>
        <button className="swiper-next-suspension absolute right-0 top-1/2 -translate-y-1/2 z-30 p-1.5 sm:p-2 bg-white rounded-full shadow-md hover:bg-primary hover:text-white transition-colors cursor-pointer">
          <ChevronRight size={22} className="sm:w-7 sm:h-7" />
        </button>
      </div>

      {/* CTA */}
      <div className="text-center mt-6 sm:mt-8 pb-4 sm:pb-6 px-4 sm:px-0">
        <Link
          href="/collections/product-category/wheels"
          className="inline-block px-5 sm:px-6 py-2.5 sm:py-3 rounded-md text-primary bg-[#d4d2d2]/50 text-base sm:text-lg md:text-xl font-semibold uppercase border border-primary transition-all duration-300 ease-in-out hover:bg-primary hover:text-white"
        >
          Shop Suspensions
        </Link>
      </div>
    </div>
  );
};

export default SuspensionBrands;