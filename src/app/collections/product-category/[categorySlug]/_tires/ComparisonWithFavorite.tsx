import { useCreateWishlistMutation } from '@/redux/apis/wishlist';
import { TInventoryItem } from '@/types/product';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const ComparisonWithFavorite = ({ product }: { product: TInventoryItem[] }) => {
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
  let singleTirePageLink = `/collections/product/${product[0]?.slug}`; // Link to the tire's product page
  if (product.length > 1) {
    singleTirePageLink += `?slug=${product[1]?.slug}`; // Add front tire slug to the link
  }

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
              slug: singleTirePageLink,
              data: {
                title:
                  product.length > 1
                    ? `${product[0].brand} ${product[1].brand}`
                    : `${product[0].brand}`,
                category: product[0]?.category,
                image_url: product[0].item_image,
                part_number: product[0]?.partnumber,
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
