import { useDebounce } from "@/hooks/useDebounce";
import { trackEvent } from "@/lib/tracker";
import { useGetProductsQuery } from "@/redux/apis/product";
import { getProductThumbnail } from "@/utils/product";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useAppDispatch, useTypedSelector } from "@/redux/store";
import { clearSearchHistory, removeSearchHistoryItem } from "@/redux/features/layoutSlice";
import { Clock, X } from "lucide-react";

const SearchSuggestion = ({
  setOpen,
  searchInput,
  onHistorySelect,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  searchInput: string;
  onHistorySelect?: (query: string) => void;
}) => {
  const router = useRouter();

  const [debouncedSearch] = useDebounce(searchInput);

  const { isLoading, isFetching, data } = useGetProductsQuery(
    {
      q: debouncedSearch,
    },
    {
      refetchOnMountOrArgChange: true,
      skip: !debouncedSearch.length,
    }
  );

  useEffect(() => {
    if (debouncedSearch) {
      trackEvent("search", { query: debouncedSearch });
    }
  }, [debouncedSearch]);

  const dispatch = useAppDispatch();
  const searchHistory = useTypedSelector((state) => state.persisted.layout.searchHistory);

  return (
    <>
      {/* Search History Rendering - Show when no input and history exists */}
      {!searchInput && searchHistory?.length > 0 && (
        <div className="flex flex-col bg-white w-full border-b border-gray-100">
          <div className="px-5 py-3 flex items-center justify-between border-b border-gray-100 bg-gray-50/50">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Recent Searches</span>
            <button
              type="button"
              onClick={() => dispatch(clearSearchHistory())}
              className="flex items-center gap-1 text-xs text-[#3b5998] hover:text-[#2d4373]"
            >
              <X className="w-3 h-3" />
              Clear History
            </button>
          </div>
          {searchHistory.map((historyItem) => (
            <div key={historyItem} className="flex items-center justify-between border-b border-gray-50 bg-white hover:bg-gray-50 transition-colors group">
              <button
                type="button"
                className="flex-1 py-3 px-6 flex items-center gap-3 text-left"
                onClick={() => onHistorySelect?.(historyItem)}
              >
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-[13px] font-medium text-gray-700">{historyItem}</span>
              </button>
              <button
                type="button"
                className="p-3 mr-2 text-gray-300 hover:text-gray-500 transition-opacity"
                onClick={() => dispatch(removeSearchHistoryItem(historyItem))}
                aria-label="Remove from history"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {searchInput && (isLoading || isFetching) ? (
        <div className="flex flex-col bg-white w-full">
          {[...Array(10)].map((_, index) => (
            <div
              key={index}
              className="block py-2 px-6 border-b border-gray-100 bg-white animate-pulse"
            >
              <div className="flex items-center gap-4">
                {/* Image skeleton */}
                <div className="w-[40px] h-[40px] bg-gray-200 rounded shrink-0" />

                {/* Text skeletons */}
                <div className="flex w-full flex-col gap-1.5 justify-center">
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                  <div className="h-2.5 bg-gray-200 rounded w-1/4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : searchInput && data?.products ? (
        (() => {
          const validProducts = data.products.filter(
            (productArr) =>
              productArr[0]?.category?.title !== "Accessories" &&
              productArr[0]?.category?.title !== "Tire"
          );

          if (validProducts.length === 0) {
            return (
              <div className="w-full bg-white p-6 md:p-8">
                <h2 className="text-lg md:text-[22px] font-bold text-gray-900 mb-1.5">
                  0 Results Found For <span className="italic font-normal">"{searchInput}"</span>
                </h2>
                <p className="text-[#cc0000] text-[13px] md:text-sm mb-6">
                  Please try again with other keywords
                </p>

                <div className="border-t border-gray-200 pt-5 md:pt-6">
                  <h3 className="font-bold text-[14px] md:text-[15px] text-gray-900 mb-3">
                    Search Tips
                  </h3>
                  <ul className="list-disc pl-5 text-[13px] text-gray-600 space-y-2 marker:text-gray-400">
                    <li>Double check your spelling.</li>
                    <li>Try using single words.</li>
                    <li>Try searching for an item that is less specific.</li>
                    <li>You can always narrow your search results later.</li>
                  </ul>
                </div>
              </div>
            );
          }

          return (
            <div className="flex flex-col bg-white w-full">
              {validProducts.map((productArr) => {
                const product = productArr[0];
                const handleClick = () => {
                  setOpen(false);
                  router.push(`/collections/product/${product.slug}`);
                };
                return (
                  <button
                    type="button"
                    key={product.id}
                    onClick={handleClick}
                    className="block py-2.5 hover:bg-gray-50 text-left transition-colors"
                  >
                    <div className="flex items-center gap-4 px-6">
                      <div className="w-[40px] h-[40px] shrink-0 flex items-center justify-center relative bg-white border border-gray-200 rounded-sm overflow-hidden">
                        <Image
                          className="object-contain"
                          src={getProductThumbnail(product)}
                          alt={product?.title ?? ""}
                          fill
                          sizes="40px"
                        />
                      </div>
                      <div className="flex flex-col flex-1 min-w-0">
                        <div className="flex items-baseline gap-2 truncate">
                          <span className="text-[13px] text-gray-900 font-medium truncate">
                            {product?.title}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-gray-600 mt-0.5">
                          <span className="font-semibold text-gray-900">
                            ${product?.sellingPrice ? product.sellingPrice.toFixed(2) : "N/A"}
                          </span>
                          {product?.model && (
                            <span className="text-gray-500 truncate flex-1">
                              &middot; mpn: {product.model}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          );
        })()
      ) : null}
    </>
  );
};

export default SearchSuggestion;