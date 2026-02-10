'use client'
// Import necessary components for the page layout and skeleton loading
import FilterLoadingSkeleton from './[categorySlug]/_loading/FilterLoadingSkeleton';
import ProductCardSkeleton from './[categorySlug]/_loading/ProductCardSkeleton';

// Define the types for the props expected by the ProductCategory component
type ProductsPageProps = {
    searchParams: Promise<{ [key: string]: string | undefined }>;
    params: Promise<{ categorySlug: string }>;
    page?: number;
};

// type ProductsPageProps = {
//   searchParams: Promise<{ [key: string]: string | undefined }>;
//   params: Promise<{ categorySlug: string }>;
//   page?: number;
// };
const ProductCategoryLoading = async () => {
    return (
        <div className="mx-auto flex w-full max-w-[1450px] flex-col gap-6 md:px-4 pb-6 pt-2 md:flex-row">
            <div className={"hidden lg:block lg:w-1/4"}>
                <FilterLoadingSkeleton />
            </div>
            <div
                className={
                    "w-full lg:w-3/4 grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-min"
                }
            >
                {Array(12)
                    .fill(0)
                    .map((_, index) => (
                        <ProductCardSkeleton key={`product-card-loading-${index}`} />
                    ))}
            </div>
        </div>
    );
};

export default ProductCategoryLoading;
