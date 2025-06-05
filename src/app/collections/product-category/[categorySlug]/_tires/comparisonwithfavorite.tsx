import { useCreateWishlistMutation } from '@/redux/apis/wishlist';
import { TInventoryItem } from '@/types/product';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

const ComparisonWithFavorite = ({ product }: { product: TInventoryItem }) => {
  // Local state for managing success and error messages
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Function to save the product to the wishlist
  const [saveToLater] = useCreateWishlistMutation();

  // Effect to display a success toast when a message is set
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 5000);
      toast('Saved to wishlist', {
        description: message,
      });
      return () => clearTimeout(timer);
    }
  }, [message]);

  // Effect to display an error toast when an error is set
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 5000);
      toast('Login required', {
        description: 'Please login first',
      });
      return () => clearTimeout(timer);
    }
  }, [error]);

  // console.log('Product', product);

  return (
    <div className="w-full flex flex-1 flex-row gap-4   ">
      <div className="text-base text-[#212227] underline whitespace-nowrap">
        <Link href="/collections/product-category/tires">
          Add to comparison
        </Link>
      </div>
      <div className="text-base text-[#212227] underline whitespace-nowrap">
        <button
          onClick={() => {
            saveToLater({
              slug: product?.slug,
              data: {
                title: product?.description,
                category: product?.category,
                image_url: product.image_url,
                part_number: product?.partnumber,
              },
            });
          }}
          className="underline"
        >
          Save to favorites
        </button>
      </div>
    </div>
  );
};

export default ComparisonWithFavorite;
