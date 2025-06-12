// Import necessary libraries and types for the component
'use client'; // Indicate that this component should be rendered on the client side
// import { s3BucketUrl } from "@/app/utils/api"
import { cn } from '@/lib/utils'; // Utility function to handle className merging
import { TInventoryItem } from '@/types/product';
import { s3BucketUrl } from '@/utils/api';
import { getProductThumbnail } from '@/utils/product';
import Image from 'next/image'; // Next.js Image component for optimized image loading
import { useEffect, useRef, useState } from 'react'; // React hooks for component logic

// Define the props for the CommonCard component
interface CommonCardProps {
  product: TInventoryItem;
  className?: string;
}

// CommonCard component that displays product image and handles dynamic loading
export const CommonCard: React.FC<CommonCardProps> = ({
  product,
  className,
}) => {
  // Use refs and state to manage image loading
  const imgRef = useRef<HTMLImageElement>(null);
  const [imgLoaded, setImgLoaded] = useState(false);

  // Effect to set imgLoaded to true once the image has fully loaded
  useEffect(() => {
    if (imgRef.current) {
      imgRef.current.onload = () => {
        setImgLoaded(true);
      };
    } else {
      setImgLoaded(false);
    }
  }, [imgRef.current]);

  // Determine the category title, handling both string and object categories
  const categoryTitle =
    typeof product.category === 'object' && product.category !== null
      ? product.category.title
      : product.category;

  return (
    <>
      {/* Container for the image, dynamically adjusting height based on load state */}
      <span
        className={cn(
          className,
          'overflow-hidden h-full',
          imgLoaded ? 'max-h-fit' : 'h-[218px]'
        )}
      >
        {/* Display image based on category */}
        {categoryTitle === 'Custom Wheels' ? (
          <>
            <Image
              ref={imgRef}
              className={
                'mx-auto d-block rounded-xl w-full object-contain h-full'
              }
              height={272}
              width={272}
              alt={product?.description ?? ''}
              src={getProductThumbnail(product)}
            ></Image>
          </>
        ) : (
          <>
            {/* Render the same image for non-custom wheels category */}
            <Image
              ref={imgRef}
              className={
                'mx-auto d-block rounded-xl w-full object-contain h-full'
              }
              height={272}
              width={272}
              alt={product?.description ?? ''}
              src={
                product?.image_url !== ''
                  ? `${s3BucketUrl}/${product.image_url}`
                  : '/not-available.webp'
              }
            ></Image>
          </>
        )}
      </span>
    </>
  );
};
