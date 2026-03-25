'use client';

import Link from 'next/link';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/zoom';
import { Autoplay, Navigation, Zoom } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import SkeletonCard from './components/SkeletonCard/SkeletonCard';
import { useGetProductsQuery } from '@/redux/apis/product';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getProductThumbnail } from '@/utils/product';
import React from 'react';

const ProductGallery: React.FC<{ category: string; title: string }> = ({ category, title }) => {
  const { data, isLoading } = useGetProductsQuery({ category });

  // Unique nav class per category to avoid conflicts if multiple galleries render
  const navId = category.replace(/\s+/g, '-').toLowerCase();

  return (
    <div className="max-w-[1350px] mx-auto py-8 sm:py-10 px-4 sm:px-6 lg:px-10">
      {/* Section Title */}
      <div className="py-4 lg:py-8">
        <hr className="border-primary border-[1.5px] w-[100px] mb-2" />
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold uppercase">{title}</h3>
      </div>

      {/* Swiper + nav buttons scoped inside a relative wrapper */}
      <div className="relative">
        <Swiper
          modules={[Autoplay, Navigation, Zoom]}
          zoom={true}
          navigation={{
            nextEl: `.swiper-next-${navId}`,
            prevEl: `.swiper-prev-${navId}`,
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
                <SwiperSlide key={i}>
                  <SkeletonCard />
                </SwiperSlide>
              ))
            : data?.products.slice(0, 8).map((products, index) => {
                const product = products[0];
                return (
                  <SwiperSlide key={index}>
                    <Link href={`/collections/product/${product.slug}`} className="group block">
                      <div className="p-2 sm:p-3 md:p-4">
                        <div className="overflow-hidden rounded-sm">
                          <img
                            src={getProductThumbnail(product)}
                            alt={product?.title || ''}
                            className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                        <h4 className="text-sm sm:text-base lg:text-lg font-semibold mt-2 text-center group-hover:text-primary transition-colors duration-200 line-clamp-2">
                          {product?.title}
                        </h4>
                        <h4 className="text-xs sm:text-sm font-medium mt-1 text-center text-gray-500">
                          {product?.partNumber}
                        </h4>
                      </div>
                    </Link>
                  </SwiperSlide>
                );
              })}
        </Swiper>

        {/* Nav buttons outside Swiper children, inside relative wrapper */}
        <button className={`swiper-prev-${navId} absolute left-0 top-1/2 -translate-y-1/2 z-30 text-black hover:text-primary transition-colors duration-200 cursor-pointer`}>
          <ChevronLeft size={32} className="sm:w-9 sm:h-9" />
        </button>
        <button className={`swiper-next-${navId} absolute right-0 top-1/2 -translate-y-1/2 z-30 text-black hover:text-primary transition-colors duration-200 cursor-pointer`}>
          <ChevronRight size={32} className="sm:w-9 sm:h-9" />
        </button>
      </div>

      {/* CTA */}
      <div className="text-center mt-6 sm:mt-8">
        <Link
          href="/collections/product-category/wheels"
          className="inline-block px-5 sm:px-6 py-2.5 sm:py-3 rounded-md text-primary bg-[#d4d2d2]/50 text-base sm:text-lg md:text-xl font-semibold uppercase border border-primary transition-all duration-300 ease-in-out hover:bg-primary hover:text-white"
        >
          View Popular Wheels
        </Link>
      </div>
    </div>
  );
};

export default ProductGallery;