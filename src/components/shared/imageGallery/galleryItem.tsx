import { useImageLightbox } from '@/hooks/useImageLightbox';
import { ZoomInIcon } from 'lucide-react';
import Image from 'next/image';

export const GalleryItem: React.FC<{ src: string; index: number }> = ({
  src,
  index,
}) => {
  const { setOpen } = useImageLightbox();
  return (
    <div className="relative h-[300px] w-[300px] min-[678px]:h-[400px] min-[678px]:w-[400px] md:w-[500px] md:h-[500px]">
      <Image
        priority={index < 1 ? true : false}
        fill
        src={src}
        objectFit="cover"
        alt=""
      />
      <div
        onClick={() => {
          setOpen(true, index);
        }}
        className="absolute right-0 bottom-5 cursor-pointer"
      >
        <ZoomInIcon />
      </div>
    </div>
  );
};
