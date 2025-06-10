import { useLazyGetProductsQuery } from '@/redux/apis/product';
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

  const [trigger, result] = useLazyGetProductsQuery();

  useEffect(() => {
    const handler = setTimeout(() => {
      trigger({ category: 'tire', q: searchInput, page: 1 });
    }, 300);

    // Cleanup timeout if searchInput changes or component unmounts
    return () => clearTimeout(handler);
  }, [searchInput]);

  useEffect(() => {
    console.log('search result', result);
  }, [result]);
  return (
    <>
      {result?.data?.products ? (
        <>
          <div
            className="flex flex-col bg-white w-full overflow-y-auto"
            style={{ maxHeight: 'calc(100dvh - 80px)' }}
          >
            {result?.data?.products?.map((product) => {
              const imageURL = getProductThumbnail(product);
              const handleClick = () => {
                setOpen(false);
                router.push(`/collections/product/${product.slug}`);
              };
              return (
                <button
                  type="button"
                  key={product._id}
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
                      <h3 className="text-black">{product?.model_group}</h3>
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
