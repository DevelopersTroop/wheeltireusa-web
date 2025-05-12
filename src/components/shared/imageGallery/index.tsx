import { useCallback, useRef, useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { GalleryItem } from './galleryItem';
import { Lightbox } from './lightbox';
import { Thumbnail } from './thumbnails';
import { Swiper as SwiperType } from 'swiper/types';
interface IImageGalleryProps {
  images: { src: string }[];
}
export const ImageGallery: React.FC<IImageGalleryProps> = ({ images }) => {
  const thumbnailRef = useRef<SwiperRef>(null);
  const galleryItemRef = useRef<SwiperRef>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [setByClick, setSetByClick] = useState(false);
  const changeSlide = useCallback(
    (swiper: SwiperType) => {
      setActiveIndex(swiper.activeIndex);
      galleryItemRef?.current?.swiper.slideTo(swiper.activeIndex);
    },
    [setByClick]
  );
  return (
    <div className="w-full max-w-4xl mx-auto grid grid-cols-12 px-4 pb-12 pt-6 gap-y-4">
      <div className="col-span-12 md:col-span-10">
        <Swiper
          ref={galleryItemRef}
          modules={[Navigation]}
          slidesPerView={1}
          onSlideChange={(swiper) => {
            changeSlide(swiper);
            thumbnailRef.current?.swiper.slideTo(swiper.activeIndex);
          }}
        >
          {images.map((img, index) => (
            <SwiperSlide key={index} className="w-full">
              <div className="flex justify-center items-center w-full h-full">
                <GalleryItem index={index} src={img.src} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="col-span-12 md:col-span-2 md:h-[500px] md:w-[100px] md:ml-auto">
        <Swiper
          ref={thumbnailRef}
          modules={[Navigation]}
          direction="vertical"
          spaceBetween={24}
          slidesPerView={4}
          className="w-full h-full"
          onSlideChange={changeSlide}
          breakpoints={{
            0: {
              direction: 'horizontal',
            },
            678: {
              direction: 'vertical',
            },
          }}
        >
          {images.map((img, index) => {
            return (
              <SwiperSlide
                key={index}
                onClick={() => {
                  galleryItemRef.current?.swiper?.slideTo(index);
                  thumbnailRef.current?.swiper.slideTo(index);
                  setActiveIndex(index);
                  setSetByClick(true);
                }}
                className="w-fit h-[100px] cursor-pointer"
              >
                <Thumbnail active={activeIndex === index} src={img.src} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <Lightbox images={images} index={0} />
    </div>
  );
};
