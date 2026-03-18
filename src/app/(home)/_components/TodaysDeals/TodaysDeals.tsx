"use client";

import { useGetProductsQuery } from "@/redux/apis/product";
import { getProductThumbnail } from "@/utils/product";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/zoom";
import { Autoplay, Navigation, Zoom } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import SkeletonCard from "./components/SkeletonCard/SkeletonCard";

const TodaysDeals = () => {
  const { data, isLoading } = useGetProductsQuery({});

  return (
    <div className="max-w-[1350px] mx-auto py-8 sm:py-10 px-0 sm:px-6 lg:px-10">
      {/* Section Title */}
      <div className="py-4 lg:py-8 px-4 sm:px-0">
        <hr className="border-primary border-[1.5px] w-[100px] mb-2" />
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold uppercase">
          Today&apos;s Deals
        </h3>
      </div>

      {/* Swiper + nav buttons scoped inside relative wrapper */}
      <div className="relative">
        <Swiper
          modules={[Autoplay, Navigation, Zoom]}
          zoom={true}
          navigation={{
            nextEl: ".swiper-next-todays-deals",
            prevEl: ".swiper-prev-todays-deals",
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
          {isLoading
            ? Array.from({ length: 8 }).map((_, i) => (
                <SwiperSlide key={i} className="!h-auto">
                  <SkeletonCard />
                </SwiperSlide>
              ))
            : data?.products.slice(0, 8).map((products, index) => {
                const product = products[0];
                return (
                  <SwiperSlide key={index} className="!h-auto">
                    <Link
                      href={`/collections/product/${product.slug}`}
                      className="group block"
                    >
                      <div className="p-2 sm:p-3 md:p-4">
                        <div className="w-full aspect-square overflow-hidden rounded-sm bg-gray-50">
                          <img
                            src={getProductThumbnail(product)}
                            alt={product?.title || ""}
                            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                        <h4 className="text-sm sm:text-base lg:text-lg font-semibold mt-2 text-center group-hover:text-primary transition-colors duration-200 line-clamp-2">
                          {product?.title}
                        </h4>
                        <p className="text-xs sm:text-sm font-medium mt-1 text-center text-gray-500">
                          {product?.partNumber}
                        </p>
                      </div>
                    </Link>
                  </SwiperSlide>
                );
              })}
        </Swiper>

        <button className="swiper-prev-todays-deals absolute left-0 top-1/2 -translate-y-1/2 z-30 text-black hover:text-primary transition-colors duration-200 cursor-pointer">
          <ChevronLeft size={32} className="sm:w-9 sm:h-9" />
        </button>
        <button className="swiper-next-todays-deals absolute right-0 top-1/2 -translate-y-1/2 z-30 text-black hover:text-primary transition-colors duration-200 cursor-pointer">
          <ChevronRight size={32} className="sm:w-9 sm:h-9" />
        </button>
      </div>

      {/* CTA */}
      <div className="text-center mt-6 sm:mt-8 px-4 sm:px-0">
        <Link
          href="/collections/product-category/wheels"
          className="inline-block px-5 sm:px-6 py-2.5 sm:py-3 rounded-md text-primary bg-[#d4d2d2]/50 text-base sm:text-lg md:text-xl font-semibold uppercase border border-primary transition-all duration-300 ease-in-out hover:bg-primary hover:text-white"
        >
          View Today&apos;s Deals
        </Link>
      </div>
    </div>
  );
};

export default TodaysDeals;