import { useCreateWishlistMutation } from '@/redux/apis/wishlist';
import { TInventoryItem } from '@/types/product';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import {
  generateProductLink,
  prepareWishlistData,
} from './utils/comparisonWithFavorite';

const ComparisonWithFavorite = ({ product }: { product: TInventoryItem[] }) => {
  // Local state for managing success and error messages
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Function to save the product to the wishlist
  const [saveToLater] = useCreateWishlistMutation();

  const singleTirePageLink = generateProductLink(product);

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

  const handleSaveToFavorites = () => {
    const payload = prepareWishlistData(product, singleTirePageLink);
    saveToLater(payload);
    setMessage('Product has been saved to your wishlist');
  };

  return (
    <div className="w-full flex flex-1 flex-row gap-4   ">
      <div className="text-base text-[#212227] underline whitespace-nowrap">
        <Link href="/collections/product-category/tires">
          Add to comparison
        </Link>
      </div>
      <div className="text-base text-[#212227] underline whitespace-nowrap">
        <button onClick={handleSaveToFavorites} className="underline">
          Save to favorites
        </button>
      </div>
    </div>
  );
};

export default ComparisonWithFavorite;
