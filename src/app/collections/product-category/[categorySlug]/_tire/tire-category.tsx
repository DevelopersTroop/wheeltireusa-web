'use client';

import Breadcrumb from '@/components/ui/breadcrumb/breadcrumb';
import Item from '@/components/ui/breadcrumb/item';
import Container from '@/components/ui/container/container';
import ProductCardSkeleton from '../_loading/product-card-skeleton';
import NoProductsFound from '../no-products-found';
import { useParams, useSearchParams } from 'next/navigation';
import TireFilters from '../_filters/tire-filters';
import SidebarWheelFilters from '../_filters/mobile-filters/sidebar-wheel-filters';
import WheelFilterAndSort from './wheel-filter-and-sort';
import ProductPagination from '../product-pagination';
import { useState } from 'react';
import { TInventoryItem } from '@/types/product';
import { useEffect } from 'react';
import ProductCard from './wheel-card';

const mockData: {
  pages: number;
  total: number;
  products: TInventoryItem[];
} = {
  pages: 1,
  total: 6,
  products: [
    {
      internal_id: '680a6da7a29afbb08bef2d4d',
      slug: 'amani-allora-26x16-et-101-fully-polished-af-all26168lpb-101fp-fc1',
      title: 'Amani Allora 26x16 ET -101 Fully Polished',
      brand: 'Amani',
      category: {
        _id: '680a6d4ea29afbb08bef1e84',
        title: 'In-stock, Factory Wheels',
        slug: 'in-stock-factory-wheels',
      },
      bolt_pattern_1: 'Blank 8x',
      finish: 'Polished',
      forging_style: 'Off-Road',
      inventory_available: 4,
      item_image: 'ns-products/jzcptvuhymza_1745522761330.png',
      lip_size: '9.88',
      msrp: 1780.17,
      price: 1483.48,
      model_group: 'Allora',
      wheel_size: '26x16',
      tire_size: '',
      tire_type: [],
    },
    {
      internal_id: '680a6da7a29afbb08bef2d4e',
      slug: 'amani-allora-26x16-et-101-fully-polished-af-all26168lpb-101fp-fc2',
      title: 'Amani Allora 26x16 ET -101 Fully Polished',
      brand: 'Amani',
      category: {
        _id: '680a6d4ea29afbb08bef1e84',
        title: 'In-stock, Factory Wheels',
        slug: 'in-stock-factory-wheels',
      },
      bolt_pattern_1: 'Blank 8x',
      finish: 'Polished',
      forging_style: 'Off-Road',
      inventory_available: 4,
      item_image: 'ns-products/jzcptvuhymza_1745522761330.png',
      lip_size: '9.88',
      msrp: 1780.17,
      price: 1483.48,
      model_group: 'Allora',
      wheel_size: '26x16',
      tire_size: '',
      tire_type: [],
    },
    {
      internal_id: '680a6da7a29afbb08bef2d4f',
      slug: 'amani-allora-26x16-et-101-fully-polished-af-all26168lpb-101fp-fc3',
      title: 'Amani Allora 26x16 ET -101 Fully Polished',
      brand: 'Amani',
      category: {
        _id: '680a6d4ea29afbb08bef1e84',
        title: 'In-stock, Factory Wheels',
        slug: 'in-stock-factory-wheels',
      },
      bolt_pattern_1: 'Blank 8x',
      finish: 'Polished',
      forging_style: 'Off-Road',
      inventory_available: 4,
      item_image: 'ns-products/jzcptvuhymza_1745522761330.png',
      lip_size: '9.88',
      msrp: 1780.17,
      price: 1483.48,
      model_group: 'Allora',
      wheel_size: '26x16',
      tire_size: '',
      tire_type: [],
    },
    {
      internal_id: '680a6da7a29afbb08bef2d4g',
      slug: 'amani-allora-26x16-et-101-fully-polished-af-all26168lpb-101fp-fc4',
      title: 'Amani Allora 26x16 ET -101 Fully Polished',
      brand: 'Amani',
      category: {
        _id: '680a6d4ea29afbb08bef1e84',
        title: 'In-stock, Factory Wheels',
        slug: 'in-stock-factory-wheels',
      },
      bolt_pattern_1: 'Blank 8x',
      finish: 'Polished',
      forging_style: 'Off-Road',
      inventory_available: 4,
      item_image: 'ns-products/jzcptvuhymza_1745522761330.png',
      lip_size: '9.88',
      msrp: 1780.17,
      price: 1483.48,
      model_group: 'Allora',
      wheel_size: '26x16',
      tire_size: '',
      tire_type: [],
    },
    {
      internal_id: '680a6da7a29afbb08bef2d4h',
      slug: 'amani-allora-26x16-et-101-fully-polished-af-all26168lpb-101fp-fc5',
      title: 'Amani Allora 26x16 ET -101 Fully Polished',
      brand: 'Amani',
      category: {
        _id: '680a6d4ea29afbb08bef1e84',
        title: 'In-stock, Factory Wheels',
        slug: 'in-stock-factory-wheels',
      },
      bolt_pattern_1: 'Blank 8x',
      finish: 'Polished',
      forging_style: 'Off-Road',
      inventory_available: 4,
      item_image: 'ns-products/jzcptvuhymza_1745522761330.png',
      lip_size: '9.88',
      msrp: 1780.17,
      price: 1483.48,
      model_group: 'Allora',
      wheel_size: '26x16',
      tire_size: '',
      tire_type: [],
    },
    {
      internal_id: '680a6da7a29afbb08bef2d4i',
      slug: 'amani-allora-26x16-et-101-fully-polished-af-all26168lpb-101fp-fc6',
      title: 'Amani Allora 26x16 ET -101 Fully Polished',
      brand: 'Amani',
      category: {
        _id: '680a6d4ea29afbb08bef1e84',
        title: 'In-stock, Factory Wheels',
        slug: 'in-stock-factory-wheels',
      },
      bolt_pattern_1: 'Blank 8x',
      finish: 'Polished',
      forging_style: 'Off-Road',
      inventory_available: 4,
      item_image: 'ns-products/jzcptvuhymza_1745522761330.png',
      lip_size: '9.88',
      msrp: 1780.17,
      price: 1483.48,
      model_group: 'Allora',
      wheel_size: '26x16',
      tire_size: '',
      tire_type: [],
    },
  ],
};

// Type definition for page props, optional page parameter
type ProductsPageProps = {
  page?: number;
};

const TireCategory = ({ page = 1 }: ProductsPageProps) => {
  const searchParams = useSearchParams(); // Accessing search parameters from the URL
  const { categorySlug } = useParams(); // Getting the category slug from the URL parameters
  //   const { getProducts } = useProductFetch();
  // Update loading status when product data is fetched
  //   const isLoading = false;
  //   const { isLoading, data } = useGetProductQuery(getProducts(categorySlug as string, page).raw, {
  //     refetchOnMountOrArgChange: true
  //   })

  const useGetProductQuery = (data: typeof mockData) => {
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState<TInventoryItem[]>([]);
    const [pages, setPages] = useState<number>(1);

    useEffect(() => {
      setIsLoading(true);
      const fetchData = async () => {
        // Simulate fetching data
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate a 2-second loading time
        setProducts(data.products || []);
        setPages(data.pages || 1);
        setIsLoading(false);
      };

      fetchData();

      return () => {
        setProducts([]);
        setPages(1);
        setIsLoading(false);
      }; // Cleanup on unmount
    }, [data]);

    return {
      isLoading,
      data: {
        products,
        pages,
      },
    };
  };

  const { isLoading, data } = useGetProductQuery(mockData);

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
                Tire
              </Item>
            </Breadcrumb>
          </div>
        </div>
      </Container>
      <div className="max-w-[1450px] mx-auto w-full px-5 lg:px-16 pb-20 lg:pb-30 pt-3">
        {/* Mobile filter sidebar */}
        <div className="w-full lg:hidden pb-3 pt-1 lg:pt-3">
          <SidebarWheelFilters>
            <TireFilters />
          </SidebarWheelFilters>
        </div>
        {/* Main content layout */}
        <div className="flex w-full gap-8 pt-2 lg:pt-0">
          {/* Filters section (visible on large screens) */}
          <div className={'hidden lg:block lg:w-[304px]'}>
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
                'w-full lg:w-3/4 grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 auto-rows-min pt-16'
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
                <div className="hidden lg:block py-3">
                  <WheelFilterAndSort />
                </div>
                <NoProductsFound />{' '}
                {/* Component to show when no products are found */}
              </div>
            </>
          ) : (
            <>
              <div className="w-full">
                {/* Display products if available */}
                <div className="hidden lg:block py-3">
                  <WheelFilterAndSort />
                </div>
                <div
                  className={
                    'w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-8'
                  }
                >
                  {data?.products.map((product) => (
                    <ProductCard product={product} key={product.slug} />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
        {/* Pagination */}
        {data?.products && (
          <div className={'flex flex-row-reverse w-full pt-8'}>
            <div className={'w-full lg:w-3/4 text-center'}>
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
