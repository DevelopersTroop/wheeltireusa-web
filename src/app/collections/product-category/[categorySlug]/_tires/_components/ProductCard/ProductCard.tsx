'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Badge from '@/components/ui/badge/badge';
import { isSale } from '@/utils/price';
import { CommonCard } from '../../../CommonCard';
import CardDescription from '../CardDescription/CardDescription';
import { TInventoryItem } from '@/types/product';

// Props: Accepts a `product` object and an optional `showOnlyPrice` flag
const ProductCard = ({
  product,
  showOnlyPrice = false,
}: {
  product: TInventoryItem;
  showOnlyPrice?: boolean;
}) => {
  const imgRef = useRef<HTMLImageElement>(null); // Ref to track image loading state
  const [imgLoaded, setImgLoaded] = useState(false);
  const isSaleProduct = isSale(product?.msrp, product?.price); // Check if the product is on sale
  const productLink = `/collections/product/${product?.slug}`; // Construct product link

  console.log('imgLoaded', imgLoaded);

  // Effect to handle image loading state
  useEffect(() => {
    if (imgRef.current) {
      imgRef.current.addEventListener('load', () => {
        setImgLoaded(true);
      });
    } else {
      setImgLoaded(false);
    }
  }, [imgRef.current]);

  return (
    <Link href={productLink}>
      <div
        className={
          'w-full h-fit overflow-hidden rounded-xl border border-[#cfcfcf] px-4 bg-white'
        }
      >
        <div className="w-full flex justify-center pt-5">
          <div className={'w-full relative text-center '}>
            <CommonCard
              product={product}
              className="inline-block max-w-[272px] text-center overflow-hidden"
            />
            {isSaleProduct && (
              <Badge className={'absolute -top-2 -right-1'}>Sale</Badge>
            )}
          </div>
        </div>

        <div className={'py-6'}>
          <CardDescription
            showOnlyPrice={showOnlyPrice}
            product={product}
            isSaleProduct={isSaleProduct}
          />
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
