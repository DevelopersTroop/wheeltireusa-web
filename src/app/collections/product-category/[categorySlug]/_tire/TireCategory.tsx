'use client';
import HomeFilter from '@/app/(home)/_components/HeroSection/components/HomeFilter/HomeFilter';
import { Paginate } from '@/components/shared/Paginate/Paginate';
import ViewToggle from '@/components/shared/ViewToggle/ViewToggle';
import Breadcrumb from '@/components/ui/breadcrumb/breadcrumb';
import Item from '@/components/ui/breadcrumb/item';
import Container from '@/components/ui/container/container';
import { useFilterSync } from '@/hooks/useFilterSync';
import { cn } from '@/lib/utils';
import { useGetProductsQuery } from '@/redux/apis/product';
import { RootState } from '@/redux/store';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import { useSelector } from 'react-redux';
import { useTypedSelector } from '@/redux/store';
import ProductCategoryLoading from '../../_components/_loading';
import SidebarFilters from '../_filters/mobile-filters/SidebarFilter';
import SortByFilter from '../_filters/SortByFilter';
import TireFilters from '../_filters/TireFilters';
import NoProductsFound from '../NoProductsFound';
import TireCard from './TireCard';
import TireCardList from './TireCardList';
import { normalizeTireFitment } from '@/lib/fitment';

const TireCategory: React.FC<{
  page: number;
  topDescription?: string;
  bottomDescription?: string;
}> = ({ page = 1, topDescription, bottomDescription }) => {
  const searchParams = useSearchParams();
  const { filters } = useFilterSync();
  const vehicleInformation = useTypedSelector((state) => state.persisted.yearMakeModel.vehicleInformation);
  const activeGarageId = useTypedSelector((state) => state.persisted.yearMakeModel.activeGarageId);
  const tireFitment = normalizeTireFitment(vehicleInformation, activeGarageId);
  const { data, isLoading: loading, isFetching } = useGetProductsQuery({
    ...filters,
    category: 'tire',
    ...(tireFitment && tireFitment.entries.length > 0 ? { ymmFilter: tireFitment.entries } : {}),
  }, {refetchOnMountOrArgChange: true});
  const viewType = useSelector((state: RootState) => state.persisted.layout.viewType);
  return (
    <>
      {topDescription && (
        <div
          className="container mx-auto px-3 sm:px-4 my-4"
          dangerouslySetInnerHTML={{ __html: topDescription }}
        />
      )}
      <HomeFilter variant="product" />
      <Container className={
        cn(
          "flex w-full flex-col gap-4 sm:gap-6 px-3 sm:px-4 pb-4 sm:pb-6 pt-2 lg:flex-row",
          viewType === "grid" ? "" : "max-w-[1450px]"
        )
      }>
        {/* Mobile Filters Header */}
        <div className="flex w-full flex-row gap-2 justify-between lg:hidden sticky top-16 z-20 bg-white py-2">
          <SidebarFilters>
            <TireFilters />
          </SidebarFilters>
          <div className="w-full max-w-[140px] sm:max-w-[180px]">
            <SortByFilter />
          </div>
        </div>

        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex lg:w-[280px] xl:w-[320px] 2xl:w-[400px] h-full flex-col gap-3 shrink-0">
          <TireFilters />
        </aside>

        {/* Products Section */}
        {loading || isFetching ? <ProductCategoryLoading /> : data?.products?.length === 0 ? (
          <div className="w-full">
            <NoProductsFound />
          </div>
        ) : (
          <div className="flex w-full flex-col">
            {/* Header with Breadcrumb, View Toggle & Sort */}
            <div className="flex flex-col sm:flex-row w-full justify-between items-start sm:items-center gap-2 sm:gap-4 mb-4 px-2">
              <div className="w-full overflow-hidden">
                <Breadcrumb>
                  <Item href={'/'}>Home</Item>
                  <Item href={'/'}>Collections</Item>
                  <Item href={'/collections/product-category/tires'}>
                    Tires
                  </Item>
                </Breadcrumb>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <div className="hidden sm:flex">
                  <ViewToggle />
                </div>
                <div className="w-[120px] sm:w-[160px] lg:w-[180px]">
                  <SortByFilter />
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div
              className={
                viewType === 'grid'
                  ? 'grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-3 sm:gap-4'
                  : 'flex w-full flex-col gap-4'
              }
            >
              {data?.products?.map((products) => {
                const product = products[0];
                return (
                  <div key={product.id} className="w-full">
                    {viewType === 'grid' ? (
                      <TireCard product={product} key={`grid-${product.id}`} />
                    ) : (
                      <TireCardList product={product} key={`list-${product.id}`} />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            <div className="mt-6 sm:mt-8 flex w-full justify-center">
              <Paginate
                searchParams={new URLSearchParams(searchParams)}
                page={page}
                totalPages={data?.pages}
                categorySlug={'tires'}
              />
            </div>
          </div>
        )}
      </Container>
      {bottomDescription && (
        <div
          className="container mx-auto px-3 sm:px-4 my-4 sm:my-6 text-center max-w-4xl text-gray-700 leading-relaxed text-xs sm:text-sm md:text-base [&>p]:mb-3 sm:[&>p]:mb-4"
          dangerouslySetInnerHTML={{ __html: bottomDescription }}
        />
      )}
    </>
  );
};

export default TireCategory;
