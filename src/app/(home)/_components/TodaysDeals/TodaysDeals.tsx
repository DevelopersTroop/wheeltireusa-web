"use client";

import { useGetProductsQuery } from "@/redux/apis/product";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/zoom"; // 👈 Import skeleton
import { Autoplay, Navigation, Zoom } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import SkeletonCard from "./components/SkeletonCard/SkeletonCard";
import { getProductThumbnail } from "@/utils/product";

const TodaysDeals = () => {
  const { data, isLoading } = useGetProductsQuery({});

  return (
    <div className="max-w-[1350px] p-4 mx-auto py-10">
      {/* Section Title */}
      <div className="py-4 lg:py-8">
        <hr className="border-primary border-[1.5px] w-[100px]" />
        <h3 className="text-3xl lg:text-5xl font-bold uppercase">
          Todays deals
        </h3>
      </div>

      {/* Swiper Gallery */}
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
        }}
        style={{ paddingLeft: 35, paddingRight: 35 }}
        loop={true}
        spaceBetween={20}
        className="relative !w-full"
      >
        <button className="swiper-button-next-123 w-fit text-black rounded-md absolute left-0 top-1/2 cursor-pointer z-30">
          <ChevronLeft size={38} />
        </button>

        {isLoading
          ? // 👇 Skeleton placeholder when loading
            Array.from({ length: 8 }).map((_, index) => (
              <SwiperSlide key={index}>
                <SkeletonCard />
              </SwiperSlide>
            ))
          : // 👇 Actual product cards
            data?.products.slice(0, 8).map((products, index) => {
                const product = products[0];
                return <>
                <SwiperSlide key={index}>
                <Link href={`/collections/product/${product.slug}`}>
                  <div className="p-4">
                    <img
                      src={getProductThumbnail(product)}
                      alt={product.title}
                      className="w-full p-4 h-auto object-cover"
                    />
                    <h4 className="text-lg font-semibold mt-2 text-center">
                      {product?.title}
                    </h4>
                    <h4 className="text-lg font-semibold mt-2 text-center">
                      {product?.partNumber}
                    </h4>
                  </div>
                </Link>
              </SwiperSlide>
              </>
            })}

        <button className="swiper-button-prev-123 w-fit text-black rounded-md absolute right-0 top-1/2 flex items-center cursor-pointer z-30">
          <ChevronRight size={38} />
        </button>
      </Swiper>

      <div className="text-center mt-4">
        <button className="px-4 py-2 text-primary bg-white bg-opacity-50 text-2xl font-semibold uppercase outline outline-1 outline-primary hover:bg-primary hover:text-white">
          <Link href="/collections/product-category/wheels">
            View todays deals
          </Link>
        </button>
      </div>
    </div>
  );
};

export default TodaysDeals;
