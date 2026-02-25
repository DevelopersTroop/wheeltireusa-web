'use client';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import TireCard from './WheelCard';
import { useGetProductsQuery } from '@/redux/apis/product';
import { useFilterSync } from '@/hooks/useFilterSync';
import SidebarFilters from '../_filters/mobile-filters/SidebarFilter';
import TireFilters from '../_filters/TireFilters';
import MobileYmmFilter from '../_filters/mobile-ymm/MobileYmmFilter';
import TireYMMFilters from '../_filters/widgets/tire/TireYmmFilter';
import SortByFilter from '../_filters/SortByFilter';
import ProductCardSkeleton from '../_loading/ProductCardSkeleton';
import NoProductsFound from '../NoProductsFound';
import Item from '@/components/ui/breadcrumb/item';
import Breadcrumb from '@/components/ui/breadcrumb/breadcrumb';
import { Paginate } from '@/components/shared/Paginate/Paginate';
import ProductCategoryLoading from '../../_components/_loading';
import WheelCardList from './WheelCardList';
import ViewToggle from '@/components/shared/ViewToggle/ViewToggle';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import Container from '@/components/ui/container/container';
import { cn } from '@/lib/utils';

const WheelCategory: React.FC<{
  page: number;
  topDescription?: string;
  bottomDescription?: string;
}> = ({ page = 1, topDescription, bottomDescription }) => {
  const searchParams = useSearchParams();
  const { filters } = useFilterSync();
  const { data, isLoading: loading } = useGetProductsQuery({
    ...filters,
    category: 'wheels',
  });
  const viewType = useSelector((state: RootState) => state.persisted.layout.viewType);
  console.log('TCL: data', data);
  return (
    <>
      {topDescription && (
        <div
          className="container mx-auto px-4 my-4"
          dangerouslySetInnerHTML={{ __html: topDescription }}
        />
      )}
      <Container className={
        cn(
          "flex w-full flex-col gap-6 md:px-4 pb-6 pt-2 md:flex-row",
          viewType === "grid" ? "" : "max-w-[1450px]"
        )
      }>
        <div className="w-full flex flex-row gap-2 justify-between  md:hidden">
          <SidebarFilters>
            <TireFilters />
          </SidebarFilters>

          <MobileYmmFilter>
            <TireYMMFilters />
          </MobileYmmFilter>

          <div className="w-full">
            <SortByFilter />
          </div>
        </div>
        <div className="hidden h-full flex-col gap-3 md:flex md:w-[400px]">
          <TireYMMFilters />
          <TireFilters />
        </div>
        {loading ? <ProductCategoryLoading /> : data?.products?.length === 0 ? (
          <>
            <NoProductsFound />
          </>
        ) : (
          <>
            <div className="flex w-full flex-col">
              <div className="flex w-full flex-row justify-between items-center mb-4">
                <div className="p-2">
                  <Breadcrumb>
                    <Item href={'/'}>Home</Item>
                    <Item href={'/'}>Collections</Item>
                    <Item href={'/collections/product-category/tires'}>
                      Tires
                    </Item>
                  </Breadcrumb>
                </div>
                {/* Mobile View Toggle */}
                <div className="md:hidden pr-2">
                  <ViewToggle />
                </div>
                {/* Desktop View Toggle & Sort */}
                <div className="hidden md:flex w-full max-w-[240px] gap-2 items-center justify-end">
                  <ViewToggle />
                  <div className="w-[180px]">
                    <SortByFilter />
                  </div>
                </div>
              </div>
              <div
                className={
                  viewType === 'grid'
                    ? 'grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'
                    : 'flex w-full flex-col gap-4'
                }
              >
                {data?.products?.map((products) => {
                  const product = products[0];
                  return (
                    <div key={product.id}>
                      {viewType === 'grid' ? (
                        <TireCard product={product} key={`grid-${product.id}`} />
                      ) : (
                        <WheelCardList product={product} key={`list-${product.id}`} />
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 flex w-full flex-row justify-center">
                <Paginate
                  searchParams={new URLSearchParams(searchParams)}
                  page={page}
                  totalPages={data?.pages}
                  categorySlug={'wheels'}
                />
              </div>
            </div>
          </>
        )}
      </Container>
      {bottomDescription && (
        <div
          className="container mx-auto px-4 my-6 text-center max-w-4xl text-gray-700 leading-relaxed text-sm md:text-base [&>p]:mb-4"
          dangerouslySetInnerHTML={{ __html: bottomDescription }}
        />
      )}
    </>
  );
};

export default WheelCategory;
