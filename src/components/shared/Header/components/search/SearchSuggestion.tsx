import {
  useLazyGetProductsQuery,
  useLazySearchProductQuery,
} from '@/redux/apis/product';
import { getPrice } from '@/utils/price';
import { getProductThumbnail } from '@/utils/product';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const SearchSuggestion = ({
  setOpen,
  searchInput,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  searchInput: string;
}) => {
  const router = useRouter();

  const [trigger, { data, isLoading, isFetching }] =
    useLazySearchProductQuery();

  useEffect(() => {
    const handler = setTimeout(() => {
      trigger(searchInput);
    }, 300);

    // Cleanup timeout if searchInput changes or component unmounts
    return () => clearTimeout(handler);
  }, [searchInput]);

  return (
    <>
      {isLoading || isFetching ? (
        <div
          className="flex flex-col bg-white w-full overflow-y-auto"
          style={{ maxHeight: 'calc(100dvh - 80px)' }}
        >
          {[...Array(10)].map((_, index) => (
            <div
              key={index}
              className="block border-b py-1 border-gray-300 bg-white animate-pulse"
            >
              <div className="flex items-start gap-4 px-10">
                {/* Image skeleton */}
                <div className="w-[60px] h-[60px] bg-gray-200 rounded" />

                {/* Text skeletons */}
                <div className="flex w-full flex-col gap-2 justify-start">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />{' '}
                  {/* Title */}
                  <div className="h-3 bg-gray-200 rounded w-1/2" />{' '}
                  {/* Optional finish/series */}
                  <div className="h-4 bg-gray-200 rounded w-1/3" />{' '}
                  {/* Price */}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : data?.products ? (
        <>
          <div
            className="flex flex-col bg-white w-full overflow-y-auto"
            style={{ maxHeight: 'calc(100dvh - 80px)' }}
          >
            {data?.products?.map((product) => {
              const imageURL = getProductThumbnail(product);
              const handleClick = () => {
                setOpen(false);
                router.push(`/collections/product/${product.slug}`);
              };
              return (
                <button
                  type="button"
                  key={product.id}
                  onClick={handleClick}
                  className="block border-b py-1 border-gray-300 bg-white hover:bg-gray-100 text-left"
                >
                  <div className="flex items-start gap-4 px-10 ">
                    <div className="w-[60px]">
                      <Image
                        className="rounded w-full"
                        src={imageURL ?? ''}
                        alt={product?.model_group ?? ''}
                        width={60}
                        height={60}
                      />
                    </div>
                    <div className="flex w-full flex-col gap-1 justify-start">
                      {/* Product Title */}
                      <h3 className="text-black">
                        {product?.model_group || product?.model}
                      </h3>
                      {/* Finish */}
                      {/* {!isCustomProduct(product?.category) && product?.finish ? (
                                                    <div className="text-[#666666] text-sm leading-[20px]">
                                                        {product?.finish}
                                                    </div>
                                                ) : <></>} */}
                      {/* Forging Series */}
                      {/* {product?.forging_series?.length && product?.forging_series?.length > 0 ? (
                                                    <div className="text-[#666666] text-sm leading-[20px]">
                                                        {product?.forging_series?.join(" | ")}
                                                    </div>
                                                ) : <></>} */}
                      {/* Price */}
                      <p className="text-black">Price: ${getPrice(product)}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default SearchSuggestion;
