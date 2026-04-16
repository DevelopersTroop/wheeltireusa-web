'use client';
import { TInventoryItem, TTireProduct } from '@/types/product';
import { getProductThumbnail } from '@/utils/product';
import ProductImage from '@/components/shared/ProductImage/ProductImage';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import TireCardDescription from './TireCardDescription';
import CompareButton from '@/components/shared/CompareButton/CompareButton';
import { useTypedSelector } from '@/redux/store';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Sparkles } from 'lucide-react';

const TireCard = ({ product }: { product: TInventoryItem }) => {
  const searchparams = useSearchParams();
  const cartPackage = searchparams.get('cartPackage');
  const productLink = `/collections/product/${product.id}?cartPackage=${cartPackage}`;
  const [imageErr, setImageErr] = useState(false);
  const { viewType } = useTypedSelector((state) => state.persisted.layout);
  return (
    <div
      className={cn(
        'flex flex-col bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 relative group h-full',
        viewType === 'grid' ? 'w-full' : 'flex-row'
      )}
    >
      <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
        <CompareButton product={product} variant="icon" />
      </div>

      {/* New Badge */}
      <div className="absolute top-3 left-3 z-10">
        <Badge className="bg-amber-500 hover:bg-amber-600 text-white px-2.5 py-1 text-xs font-semibold rounded-full flex items-center gap-1">
          <Sparkles className="w-3 h-3" />
          NEW
        </Badge>
      </div>

      {/* Product Image */}
      <div className="relative bg-linear-to-br from-gray-50 to-gray-100 p-4 sm:p-6 flex items-center justify-center aspect-square mt-4">
        <Link href={productLink} className="w-full h-full flex items-center justify-center">
          <ProductImage
            className="max-h-full max-w-full object-contain mix-blend-multiply hover:scale-105 transition-transform duration-300"
            height={280}
            width={280}
            alt="product image"
            src={getProductThumbnail(product)}
            onError={() => setImageErr(true)}
          />
        </Link>
      </div>

      {/* Product Info */}
      <div className="p-4 sm:p-5 flex flex-col gap-3 flex-1">
        <TireCardDescription product={product as TTireProduct} />
      </div>
    </div>
  );
};

export default TireCard;
