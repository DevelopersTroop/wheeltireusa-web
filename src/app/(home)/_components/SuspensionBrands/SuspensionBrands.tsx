"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/zoom";
import { Autoplay, Navigation, Zoom } from "swiper/modules"; // Correct ES modules import
import { Swiper, SwiperSlide } from "swiper/react";

const SuspensionBrands = () => {
  return (
    <div className="py-10">
      {/* {galleryData.map((gallery, galleryIndex) => ( */}
      <div className="max-w-[1350px] p-4 mx-auto">
        {/* Section Title */}
        <div className="py-4 lg:py-8">
          <hr className="border-primary border-[1.5px] w-[100px]" />
          <h3 className="text-3xl lg:text-5xl font-bold uppercase">
            TOP SUSPENSION BRANDS
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
            1366: { slidesPerView: 5 },
          }}
          style={{
            paddingLeft: 35,
            paddingRight: 35,
          }}
          loop={true}
          spaceBetween={20}
          className="relative !w-full"
        >
          <button
            className={`swiper-button-next-123 w-fit text-black rounded-md absolute left-0 top-1/2 cursor-pointer z-30`}
          >
            <ChevronLeft size={38} />
          </button>
          {Array.from({ length: 8 }).map((_, index) => (
            <SwiperSlide className="h-[150px] flex items-center" key={index}>
              <Link className=" w-full" href={`#`}>
                <img
                  src={`/images/brands/${index + 1}.webp`}
                  // alt={product.title}
                  className="w-full p-4 h-auto object-cover"
                />
              </Link>
            </SwiperSlide>
          ))}

          <button
            className={`swiper-button-prev-123 w-fit text-black rounded-md absolute right-0 top-1/2 flex items-center cursor-pointer z-30`}
          >
            <ChevronRight size={38} />
          </button>
        </Swiper>
      </div>

      <div className="text-center mt-4">
        <button className="px-4 py-2 text-primary bg-white bg-opacity-50 text-2xl font-semibold uppercase outline outline-1 outline-primary hover:bg-primary hover:text-white">
          <Link href="/collections/product-category/accessories">
            Shop suspenssion
          </Link>
        </button>
      </div>
      {/* ))} */}
    </div>
  );
};

export default SuspensionBrands;
