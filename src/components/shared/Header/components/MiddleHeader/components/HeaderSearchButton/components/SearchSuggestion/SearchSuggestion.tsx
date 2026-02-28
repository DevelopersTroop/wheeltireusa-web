import { useDebounce } from "@/hooks/useDebounce";
import { trackEvent } from "@/lib/tracker";
import { useGetProductsQuery } from "@/redux/apis/product";
import { getProductThumbnail } from "@/utils/product";
// import { getProductThumbnail, isCustomProduct, isCustomWheel } from "@/app/utils/product";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const SearchSuggestion = ({
  setOpen,
  searchInput,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  searchInput: string;
}) => {
  const router = useRouter();
  // const { getProducts } = useProductFetch(); // Using the custom hook to fetch products

  const [debouncedSearch] = useDebounce(searchInput);

  const { isLoading, isFetching, data } = useGetProductsQuery(
    {
      q: debouncedSearch,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  useEffect(() => {
    trackEvent("search", {
      query: debouncedSearch,
    });
  }, [debouncedSearch]);

  return (
    <>
      {isLoading || isFetching ? (
        <div
          className="flex flex-col bg-white w-full overflow-y-auto"
          style={{ maxHeight: "calc(100dvh - 80px)" }}
        >
          {[...Array(10)].map((_, index) => (
            <div
              key={index}
              className="block border-b py-1 border-white bg-white animate-color-pulse"
            >
              <div className="flex items-start gap-4 px-10">
                {/* Image skeleton */}
                <div className="w-[60px] h-[60px] bg-white rounded" />

                {/* Text skeletons */}
                <div className="flex w-full flex-col gap-2 justify-start">
                  <div className="h-4 bg-white rounded w-3/4" /> {/* Title */}
                  <div className="h-3 bg-white rounded w-1/2" />{" "}
                  {/* Optional finish/series */}
                  <div className="h-4 bg-white rounded w-1/3" /> {/* Price */}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : data?.products ? (
        <>
          <div
            className="flex flex-col bg-white w-full overflow-y-auto"
            style={{ maxHeight: "calc(100dvh - 80px)" }}
          >
            {data?.products?.map((productArr) => {
              const product = productArr[0];
              if (
                product?.category?.title === "Accessories" ||
                product?.category?.title === "Tire"
              ) {
                return <React.Fragment key={product.id} />;
              }
            

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
                        src={getProductThumbnail(product)}
                        alt={product?.title ?? ""}
                        width={60}
                        height={60}
                      />
                    </div>
                    <div className="flex w-full flex-col gap-1 justify-start">
                      {/* Product Title */}
                      <h3>{product?.title}</h3>
                      {/* model */}
                      <div className="text-[#666666] text-sm leading-[20px]">
                        {product?.model}
                      </div>
                      {/* Forging Series */}
                      {/* {product?.forging_series?.length && product?.forging_series?.length > 0 ? (
                                                            <div className="text-[#666666] text-sm leading-[20px]">
                                                                {product?.forging_series?.join(" | ")}
                                                            </div>
                                                        ) : <></>} */}
                      {/* Price */}
                      <p>Price: {(product?.sellingPrice) ? product?.sellingPrice.toFixed(2) : "N/A"}</p>
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
