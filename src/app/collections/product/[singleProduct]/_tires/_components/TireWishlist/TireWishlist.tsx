'use client';
import { useCreateWishlistMutation } from '@/redux/apis/wishlist';
import { TInventoryItem } from '@/types/product';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import {
  generateWishlistSlug,
  generateWishlistTitle,
} from './utils/tireWishlist';

// Component to handle saving a center cap to the wishlist
const TireWishlist = ({ product }: { product: TInventoryItem[] }) => {
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

  const singleTirePageLink = generateWishlistSlug(product);
  const title = generateWishlistTitle(product);

  return (
    // Button to save the product to the wishlist
    <button
      onClick={() => {
        saveToLater({
          slug: singleTirePageLink,
          data: {
            title: title,
            category: product[0]?.category,
            imageUrl: product[0].itemImage,
            partNumber: product[0]?.partnumber,
          },
        });
      }}
      //   disabled={isActionButtonDisabled}
      className="group relative flex min-h-14 w-full flex-1 items-center justify-center gap-2 rounded-md border border-[#212227] hover:border-transparent bg-white transition duration-300 ease-in-out hover:bg-primary disabled:bg-[#e1e1e1] disabled:cursor-not-allowed"
    >
      <img src="/Vector.svg" alt="Save for later" />
      {/* Button text */}
      <p className="text-lg leading-[22px] text-[#464853]">
        <span className="text-lg font-semibold text-[#464853]">
          Save for later
        </span>
      </p>
    </button>
  );
};

export default TireWishlist;
