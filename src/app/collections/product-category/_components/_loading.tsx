'use client'
// Import necessary components for the page layout and skeleton loading
import Container from '@/components/ui/container/container';
import ProductCardSkeleton from '../[categorySlug]/_loading/ProductCardSkeleton';

const ProductCategoryLoading = () => {
  return (
    <Container>
      <div className="flex w-full gap-6 pt-12">
        {/* <div className={"hidden lg:block lg:w-1/4 mt-2"}>
          <FilterLoadingSkeleton />
        </div> */}
        <div
          className={
            "w-full lg:w-3/4 grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 auto-rows-min"
          }
        >
          {Array(12)
            .fill(0)
            .map((_, index) => (
              <ProductCardSkeleton key={`collection-loading-${index}`} />
            ))}
        </div>
      </div>
    </Container>
  );
};

export default ProductCategoryLoading;
