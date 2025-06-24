'use client'; // Enables client-side rendering for this component

import LoadingSpinner from '@/components/shared/loading/spinner';
import useAuth from '@/hooks/useAuth';
import {
  useGetWishlistQuery,
  useRemoveWishlistMutation,
} from '@/redux/apis/wishlist';
import { getProductThumbnail } from '@/utils/product';
import Image from 'next/image';
import Link from 'next/link'; // Next.js Link for navigation
import { useRouter } from 'next/navigation';

// Demo data for wishlist
type WishlistCategory = {
  title: string;
};

type WishlistItem = {
  wishlist_id: string;
  title: string;
  slug: string;
  item_image: string;
  category: WishlistCategory;
};

type WishlistData = {
  wishlists: WishlistItem[];
};

const SaveProduct = () => {
  const router = useRouter();
  const { user } = useAuth();

  // Fetch wishlist data
  const { isLoading: loading, data } = useGetWishlistQuery();

  // Function to handle wishlist item deletion
  const [removeWishlist] = useRemoveWishlistMutation();
  console.log('Wishlist', data);

  if (loading) return <LoadingSpinner />; // Show loading spinner while fetching data

  console.log('Wishlist Data', data);

  return (
    <div>
      {/* Wishlist table view for desktop */}
      <div className="hidden md:block">
        <table className="min-w-full bg-white border-x border-b p-8">
          <thead>
            <tr className="text-start">
              <th className="py-5 px-24 border-b text-start uppercase text-bold">
                Name
              </th>
              <th className="py-5 px-4 border-b text-start uppercase text-bold">
                Category
              </th>
              <th className="py-5 px-4 border-b text-start uppercase text-bold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.wishlists?.length ? (
              data.wishlists?.map((product) => (
                <tr key={product?.wishlist_id}>
                  <td className="py-5 px-4 border-b">
                    <div className="flex flex-col md:flex-row items-center gap-4">
                      <div
                        className="w-[66px] overflow-hidden whitespace-nowrap text-ellipsis hover:cursor-pointer"
                        title={product?.title}
                      >
                        <img
                          src={getProductThumbnail(product)}
                          alt={product?.title ?? ''}
                          // width={66}
                          // height={66}
                          className="w-[66px] h-[66px] object-cover rounded-md"
                        />
                      </div>
                      <Link href={product.slug}>
                        <p className="text-black"> {product?.title} </p>
                      </Link>
                    </div>
                  </td>
                  <td className="py-5 px-4 border-b">
                    {product?.category?.title}
                  </td>
                  <td className="py-5 px-4 border-b">
                    <button onClick={() => removeWishlist(product.wishlist_id)}>
                      <p className="text-primary"> Remove </p>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <>
                <tr>
                  <td
                    colSpan={5}
                    className="py-5 px-4 border-b text-center text-gray-500"
                  >
                    <div className="text-lg font-semibold">
                      You have not Save Product.
                    </div>
                  </td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>

      {/* Product View for Mobile */}
      {!!data?.wishlists?.length && (
        <div className="block text-xs min-[390px]:text-base  md:hidden ">
          {data?.wishlists.map((product) => (
            <div
              key={product?.wishlist_id}
              className="bg-white text-sm min-[380px]:text-base border border-gray-200 rounded-lg mb-4 p-2 min-[380px]:p-4 shadow-sm"
            >
              <div className="flex justify-center mb-2">
                <img
                  className="w-[150px]"
                  src={getProductThumbnail(product)}
                  alt={product?.title ?? ''}
                  // width={150}
                  // height={150}
                />
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-500 font-semibold pr-2">Name</span>
                <span>
                  <Link href={`#`}>
                    <p className="text-primary"> {product?.title} </p>
                  </Link>
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-500 font-semibold">Category</span>
                <span>{product?.category?.title}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-500 font-semibold">Actions</span>
                <span>
                  <button>
                    <p className="text-primary"> Remove </p>
                  </button>
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SaveProduct;
