import { useImageLightbox } from '@/hooks/useImageLightbox';
import { default as YetLightbox } from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
interface ILightboxProps {
  images: { src: string }[];
  index: number;
}
export const Lightbox: React.FC<ILightboxProps> = ({ images, ...props }) => {
  const { open, setOpen } = useImageLightbox();

  return (
    <YetLightbox
      slides={images}
      open={open}
      close={() => setOpen(false, 0)}
      {...props}
    />
  );
};
