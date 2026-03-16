import { useDebounce } from "@/hooks/useDebounce";
import { trackEvent } from "@/lib/tracker";
import { useGetProductsQuery } from "@/redux/apis/product";
import { getProductThumbnail } from "@/utils/product";
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

  const [debouncedSearch] = useDebounce(searchInput);

  const { isLoading, isFetching, data } = useGetProductsQuery(
    { q: debouncedSearch },
    { refetchOnMountOrArgChange: true }
  );

  useEffect(() => {
    if (debouncedSearch) {
      trackEvent("search", { query: debouncedSearch });
    }
  }, [debouncedSearch]);

  const filteredProducts =
    data?.products
      ?.map((arr: any) => arr[0])
      ?.filter(
        (product: any) =>
          product?.category?.title !== "Accessories" &&
          product?.category?.title !== "Tire"
      ) || [];

  if (isLoading || isFetching) {
    return (
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
              <div className="w-[60px] h-[60px] bg-white rounded" />
              <div className="flex w-full flex-col gap-2">
                <div className="h-4 bg-white rounded w-3/4" />
                <div className="h-3 bg-white rounded w-1/2" />
                <div className="h-4 bg-white rounded w-1/3" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (debouncedSearch && filteredProducts.length === 0) {
    return (
       <div
      className="flex flex-col items-center justify-center bg-white py-12 px-6 text-center"
      style={{ maxHeight: "calc(100dvh - 80px)" }}
    >
      <div className="text-5xl mb-4">🔍</div>

      <h3 className="text-lg font-semibold text-gray-800 mb-1">
        No products found matching your search
      </h3>
    </div>
    );
  }

  return (
    <div
      className="flex flex-col bg-white w-full overflow-y-auto"
      style={{ maxHeight: "calc(100dvh - 80px)" }}
    >
      {filteredProducts.map((product: any) => {
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
            <div className="flex items-start gap-4 px-10">
              <div className="w-[60px]">
                <Image
                  className="rounded w-full"
                  src={getProductThumbnail(product)}
                  alt={product?.title ?? ""}
                  width={60}
                  height={60}
                />
              </div>

              <div className="flex w-full flex-col gap-1">
                <h3>{product?.title}</h3>

                <div className="text-[#666666] text-sm leading-[20px]">
                  {product?.model}
                </div>

                <p>
                  Price:{" "}
                  {product?.sellingPrice
                    ? product?.sellingPrice.toFixed(2)
                    : "N/A"}
                </p>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default SearchSuggestion;