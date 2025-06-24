'use client';
import { useCreateWishlistMutation } from '@/redux/apis/wishlist';
import { TInventoryItem } from '@/types/product';
// import { getPrice } from '@/utils/price';
// Import necessary dependencies
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

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

  //   const isActionButtonDisabled =
  //     getPrice(product?.msrp, product?.price) < (product?.min_price ?? 0);

  let singleTirePageLink = `/collections/product/${product[0]?.slug}`; // Link to the tire's product page
  if (product[1] !== null) {
    singleTirePageLink += `?slug=${product[1]?.slug}`; // Add front tire slug to the link
  }

  return (
    // Button to save the product to the wishlist
    <button
      onClick={() => {
        saveToLater({
          slug: singleTirePageLink,
          data: {
            title:
              product[1] !== null
                ? `${product[0].brand} ${product[1].brand}`
                : `${product[0].brand}`,
            category: product[0]?.category,
            image_url: product[0].item_image,
            part_number: product[0]?.partnumber,
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
