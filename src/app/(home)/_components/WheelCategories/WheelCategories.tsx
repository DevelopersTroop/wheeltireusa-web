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
    <div className="max-w-[1350px] p-4 mx-auto py-10">
      {/* Section Title */}
      <div className="py-4 lg:py-8">
        <hr className="border-primary border-[1.5px] w-[100px]" />
        <h3 className="text-3xl lg:text-5xl font-bold uppercase">
          WHEEL CATEGORIES
        </h3>
      </div>

      {/* Swiper Gallery */}
      <Swiper
        modules={[Autoplay, Navigation, Zoom]}
        zoom={true}
        navigation={{
          nextEl: `.swiper-button-next-wheel-categories`,
          prevEl: `.swiper-button-prev-wheel-categories`,
        }}
        breakpoints={{
          320: { slidesPerView: 1 },
          480: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
        style={{ paddingLeft: 35, paddingRight: 35 }}
        loop={true}
        spaceBetween={20}
        className="relative !w-full"
      >
        <button className="swiper-button-prev-wheel-categories w-fit text-black rounded-md absolute left-0 top-1/2 cursor-pointer z-30 -translate-y-1/2">
          <ChevronLeft size={38} />
        </button>

        {items.map((item, index) => (
          <SwiperSlide key={index}>
            <Link href={item.href}>
              <div className="p-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full p-4 h-auto object-cover"
                />
                <h4 className="text-lg font-semibold mt-2 text-center">
                  {item.title}
                </h4>
              </div>
            </Link>
          </SwiperSlide>
        ))}

        <button className="swiper-button-next-wheel-categories w-fit text-black rounded-md absolute right-0 top-1/2 flex items-center cursor-pointer z-30 -translate-y-1/2">
          <ChevronRight size={38} />
        </button>
      </Swiper>

      <div className="text-center mt-4">
        <button className="px-4 py-2 text-primary bg-white bg-opacity-50 text-2xl font-semibold uppercase outline outline-1 outline-primary hover:bg-primary hover:text-white transition-colors duration-300">
          <Link href="/collections/product-category/wheels">
            Shop All Wheels
          </Link>
        </button>
      </div>
    </div>
  );
};

export default WheelCategories;
