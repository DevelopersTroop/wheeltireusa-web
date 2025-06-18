'use client';
import { useScreenSize } from '@/hooks/useScreenSize';
import { useEffect, useRef, useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';

export const BrandMobileSlider = ({ images }: { images: string[] }) => {
  const swiperRef = useRef<SwiperRef>(null);
  const [screenWidth, setScreenWidth] = useState('16%');
  const { screenSize } = useScreenSize();

  useEffect(() => {
    const timeOut = setTimeout(() => {
      swiperRef.current?.swiper?.update();
    }, 100);

    return () => clearTimeout(timeOut);
  }, []);

  useEffect(() => {
    if (screenSize > 768) {
      setScreenWidth('16%');
    } else if (screenSize > 650) {
      setScreenWidth('23%');
    } else if (screenSize > 450) {
      setScreenWidth('28%');
    } else {
      setScreenWidth('34%');
    }
  }, [screenSize]);

  return (
    <div>
      <Swiper
        ref={swiperRef}
        modules={[Navigation]}
        slidesPerView={'auto'}
        spaceBetween={16}
        loop
        onSlideChange={(swiper) => {}}
        centeredSlides
      >
        {images.map((img, index) => (
          <SwiperSlide
            key={index}
            className="w-full"
            style={{ width: screenWidth }}
          >
            <div className="flex justify-center items-center w-full h-full cursor-pointer rounded-[10px] overflow-hidden hover:scale-110 duration-300 transition-transform">
              <img src={img} alt="image" className="w-full h-full" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
