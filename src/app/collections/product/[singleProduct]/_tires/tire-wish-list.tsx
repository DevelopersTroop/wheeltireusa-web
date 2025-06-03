'use client';
import { useCreateWishlistMutation } from '@/redux/apis/wishlist';
import { TInventoryItem } from '@/types/product';
// import { getPrice } from '@/utils/price';
// Import necessary dependencies
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

// Component to handle saving a center cap to the wishlist
const TireWishlist = ({ product }: { product: TInventoryItem }) => {
  // Hook for displaying toast notifications

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

  //   const isActionButtonDisabled =
  //     getPrice(product?.msrp, product?.price) < (product?.min_price ?? 0);

  return (
    // Button to save the product to the wishlist
    <button
      onClick={() => {
        saveToLater({
          slug: product?.slug,
          data: {
            title: product?.title,
            category: product?.category,
            item_image: product?.item_image,
            sku: product?.sku,
          },
        });
      }}
      //   disabled={isActionButtonDisabled}
      className="group relative flex min-h-14 w-full flex-1 items-center justify-center gap-2 rounded-xl border bg-white transition duration-300 ease-in-out hover:bg-primary hover:text-white disabled:bg-[#e1e1e1] disabled:cursor-not-allowed"
    >
      <img src="/Bookmark-Circle.png" alt="Save for later" />
      {/* Button text */}
      <p className="text-lg leading-[22px] text-[#210203] group-hover:text-white">
        <span className="text-lg font-semibold text-[#210203] group-hover:text-white">
          Save for later
        </span>
      </p>
    </button>
  );
};

export default TireWishlist;
