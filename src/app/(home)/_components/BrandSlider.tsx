'use client';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';

const BrandSlider = ({ images }: { images: string[] }) => {
  return (
    <div>
      <Swiper
        modules={[Navigation]}
        slidesPerView={3}
        loop
        onSlideChange={(swiper) => {}}
      >
        {images.map((img, index) => (
          <SwiperSlide key={index} className="w-full">
            <div className="flex justify-center items-center w-full h-full">
              <img src={img} alt="image" className="w-full h-full" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BrandSlider;
