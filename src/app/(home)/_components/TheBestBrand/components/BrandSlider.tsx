'use client';
import { useEffect, useRef } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';

const BrandSlider = ({ images }: { images: string[] }) => {
  const swiperRef = useRef<SwiperRef>(null);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      swiperRef.current?.swiper?.update();
    }, 100);

    return () => clearTimeout(timeOut);
  }, []);

  return (
    <div>
      <Swiper
        ref={swiperRef}
        modules={[Navigation]}
        slidesPerView={3}
        spaceBetween={16}
        loop
        onSlideChange={(swiper) => {}}
        // onScroll={(swiper) => {
        //   swiper.slideNext()
        // }}
      >
        {images.map((img, index) => (
          <SwiperSlide key={index} className="w-full">
            <div className="flex justify-center items-center w-full h-full cursor-pointer rounded-[10px] overflow-hidden hover:scale-110 duration-300 transition-transform">
              <img src={img} alt="image" className="w-full h-full" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BrandSlider;
