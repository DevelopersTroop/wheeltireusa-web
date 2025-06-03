'use client';

import Breadcrumb from '@/components/ui/breadcrumb/breadcrumb';
import Item from '@/components/ui/breadcrumb/item';
import Container from '@/components/ui/container/container';
import { useGetProductsQuery } from '@/redux/apis/product';
import { useParams, useSearchParams } from 'next/navigation';
import SidebarTireFilters from '../_filters/mobile-filters/sidebar-tire-filters';
import TireFilters from '../_filters/tire-filters';
import ProductCardSkeleton from '../_loading/product-card-skeleton';
import NoProductsFound from '../no-products-found';
import ProductPagination from '../product-pagination';
import TireCard from './tire-card';
import TireFilterAndSort from './tire-filter-and-sort';
import useFilter from '../_filters/filter-store/use-filter';

// Type definition for page props, optional page parameter
type ProductsPageProps = {
  page?: number;
};

const TireCategory = ({ page = 1 }: ProductsPageProps) => {
  const searchParams = useSearchParams(); // Accessing search parameters from the URL
  const { categorySlug } = useParams(); // Getting the category slug from the URL parameters
  const { filters } = useFilter();
  const { data, isLoading } = useGetProductsQuery(
    { page, category: 'tire', ...filters },
    { refetchOnMountOrArgChange: true }
  );

  return (
    <>
      <Container>
        {/* Breadcrumb navigation */}
        <div className="flex w-full items-start">
          <div className="w-full">
            <Breadcrumb>
              <Item href={`/`}>Home</Item>
              <Item href={`/collections/product-category/${categorySlug}`}>
                Collection
              </Item>
              <Item
                href={`/collections/product-category/${categorySlug}`}
                isEnd={true}
              >
                Tires
              </Item>
            </Breadcrumb>
          </div>
        </div>
      </Container>
      <div className="max-w-[1450px] mx-auto w-full px-5 lg:px-16 pb-20 lg:pb-30 pt-3">
        {/* Mobile filter sidebar */}
        <div className="w-full min-[1300px]:hidden pb-3 pt-1 lg:pt-3">
          <SidebarTireFilters>
            <TireFilters />
          </SidebarTireFilters>
        </div>
        {/* Main content layout */}
        <div className="flex w-full gap-8 pt-2 lg:pt-0">
          {/* Filters section (visible on large screens) */}
          <div className={'hidden min-[1300px]:block min-[1300px]:w-[304px]'}>
            <div className="pt-[22px] pb-5">
              <p className="text-base leading-[19px] text-[#504949]">
                <span className="text-[#504949] text-base font-normal">
                  Filters
                </span>
              </p>
            </div>
            <TireFilters />
          </div>
          {/* Product loading state or product data */}
          {isLoading ? (
            <div
              className={
                'w-full min-[1300px]:w-3/4 grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 auto-rows-min pt-16'
              }
            >
              {Array(12)
                .fill(0)
                .map((_, index) => (
                  <ProductCardSkeleton key={`product-card-loading-${index}`} />
                ))}
            </div>
          ) : data?.products?.length === 0 ? (
            <>
              {/* Display message when no products are found */}
              <div className="w-full flex flex-col">
                <div className="hidden min-[1300px]:block py-3">
                  <TireFilterAndSort />
                </div>
                <NoProductsFound />{' '}
                {/* Component to show when no products are found */}
              </div>
            </>
          ) : (
            <>
              <div className="w-full">
                {/* Display products if available */}
                <div className="hidden min-[1300px]:block py-3">
                  <TireFilterAndSort />
                </div>
                <div className={'w-full flex flex-col gap-y-4'}>
                  {/* {data?.products.map((product) => (
                    <ProductCard product={products} key={product.slug} />
                  ))} */}
                  {data?.products?.map((product) => {
                    return (
                      <TireCard
                        key={product._id}
                        products={[{ ...product }, { ...product }]}
                        wheelInfo={{
                          frontForging: '',
                          rearForging: '',
                          hasDually: false,
                          hasOffRoad: false,
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>
        {/* Pagination */}
        {data?.products && (
          <div className={'flex flex-row-reverse w-full pt-8'}>
            <div className={'w-full min-[1300px]:w-3/4 text-center'}>
              <ProductPagination
                searchParams={new URLSearchParams(searchParams)}
                categorySlug={categorySlug}
                totalPages={data?.pages}
                page={page}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TireCategory;
