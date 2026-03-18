"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/zoom";
import { Autoplay, Navigation, Zoom } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const items = [
  {
    title: "PASSENGER CAR",
    href: "/collections/product-category/wheels?q=Passenger%20Car",
    image: "/images/home-categories/category-1.webp",
  },
  {
    title: "SUV/CROSSOVER",
    href: "/collections/product-category/wheels?q=SUV/Crossover",
    image: "/images/home-categories/category-2.webp",
  },
  {
    title: "TRUCK",
    href: "/collections/product-category/wheels?q=Truck",
    image: "/images/home-categories/category-3.webp",
  },
  {
    title: "OFF‑ROAD/JEEP",
    href: "/collections/product-category/wheels?q=Off%E2%80%91road/Jeep",
    image: "/images/home-categories/category-4.webp",
  },
  {
    title: "SPORTS/PERFORMANCE",
    href: "/collections/product-category/wheels?q=Sports/Performance",
    image: "/images/home-categories/category-5.webp",
  },
  {
    title: "LUXURY",
    href: "/collections/product-category/wheels?q=Luxury",
    image: "/images/home-categories/category-6.webp",
  },
  {
    title: "WINTER WHEELS",
    href: "/collections/product-category/wheels?q=Winter%20Wheels",
    image: "/images/home-categories/category-7.webp",
  },
];

const WheelCategories = () => {
  return (
    <div className="max-w-[1350px] mx-auto py-8 sm:py-10 px-4 sm:px-6 lg:px-10">
      {/* Section Title */}
      <div className="py-4 lg:py-8">
        <hr className="border-primary border-[1.5px] w-[100px] mb-2" />
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold uppercase">
          WHEEL CATEGORIES
        </h3>
      </div>

      {/* Swiper Gallery */}
      <div className="relative">
        <Swiper
          modules={[Autoplay, Navigation, Zoom]}
          zoom={true}
          navigation={{
            nextEl: `.swiper-button-next-wheel-categories`,
            prevEl: `.swiper-button-prev-wheel-categories`,
          }}
          breakpoints={{
            320:  { slidesPerView: 1, spaceBetween: 12 },
            480:  { slidesPerView: 2, spaceBetween: 14 },
            768:  { slidesPerView: 3, spaceBetween: 16 },
            1024: { slidesPerView: 4, spaceBetween: 20 },
          }}
          loop={true}
          className="!px-8 sm:!px-10"
        >
          {items.map((item, index) => (
            <SwiperSlide key={index}>
              <Link href={item.href} className="group block">
                <div className="p-2 sm:p-3 md:p-4">
                  <div className="overflow-hidden rounded-sm">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <h4 className="text-sm sm:text-base lg:text-lg font-semibold mt-2 text-center group-hover:text-primary transition-colors duration-200">
                    {item.title}
                  </h4>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Prev button — outside Swiper so it doesn't interfere with slide layout */}
        <button className="swiper-button-prev-wheel-categories absolute left-0 top-1/2 -translate-y-1/2 z-30 text-black hover:text-primary transition-colors duration-200 cursor-pointer">
          <ChevronLeft size={32} className="sm:w-9 sm:h-9" />
        </button>

        <button className="swiper-button-next-wheel-categories absolute right-0 top-1/2 -translate-y-1/2 z-30 text-black hover:text-primary transition-colors duration-200 cursor-pointer">
          <ChevronRight size={32} className="sm:w-9 sm:h-9" />
        </button>
      </div>

      {/* CTA */}
      <div className="text-center mt-6 sm:mt-8">
        <Link
          href="/collections/product-category/wheels"
          className="inline-block px-5 sm:px-6 py-2.5 sm:py-3 rounded-md text-primary bg-[#d4d2d2]/50 text-base sm:text-lg md:text-xl font-semibold uppercase border border-primary transition-all duration-300 ease-in-out hover:bg-primary hover:text-white"
        >
          Shop All Wheels
        </Link>
      </div>
    </div>
  );
};

export default WheelCategories;