'use client';
import HomeYmm from '@/app/(home)/_components/HeroSection/components/HomeYmm/HomeYmm';
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
import WheelCard from './WheelCard';
import WheelCardList from './WheelCardList';
import WheelFilters from '../_filters/WheelFilters';
import { normalizeWheelFitment } from '@/lib/fitment';

const WheelCategory: React.FC<{
  page: number;
  topDescription?: string;
  bottomDescription?: string;
}> = ({ page = 1, topDescription, bottomDescription }) => {
  const searchParams = useSearchParams();
  const { filters } = useFilterSync();
  const vehicleInformation = useTypedSelector((state) => state.persisted.yearMakeModel.vehicleInformation);
  const activeGarageId = useTypedSelector((state) => state.persisted.yearMakeModel.activeGarageId);
  const wheelFitment = normalizeWheelFitment(vehicleInformation.vehicle_details_2)
  const { data, isLoading: loading, isFetching } = useGetProductsQuery({
    ...filters,
    category: 'wheels',
    ...(activeGarageId && vehicleInformation?.boltPattern ? {
      ...(wheelFitment ? {wheelFitment: wheelFitment} : {})
    } : {}),
  }, {refetchOnMountOrArgChange: true});
  const viewType = useSelector((state: RootState) => state.persisted.layout.viewType);
  return (
    <>
      {topDescription && (
        <div
          className="container mx-auto px-4 my-4"
          dangerouslySetInnerHTML={{ __html: topDescription }}
        />
      )}

      <HomeYmm variant="product" />
      <Container className={
        cn(
          "flex w-full flex-col gap-6 md:px-4 pb-6 pt-2 md:flex-row",
          viewType === "grid" ? "" : "max-w-[1450px]"
        )
      }>
        <div className="w-full flex flex-row gap-2 justify-between  md:hidden">
          <SidebarFilters>
            <WheelFilters />
          </SidebarFilters>
          <div className="w-full">
            <SortByFilter />
          </div>
        </div>
        <div className="hidden h-full flex-col gap-3 md:flex md:w-[400px]">
          <WheelFilters />
        </div>
        {loading || isFetching ? <ProductCategoryLoading /> : data?.products?.length === 0 ? (
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
                    <Item href={'/collections/product-category/wheels'}>
                      Wheels
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
                    ? 'grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4'
                    : 'flex w-full flex-col gap-4'
                }
              >
                {data?.products?.map((products) => {
                  const product = products[0];
                  return (
                    <div key={product.id}>
                      {viewType === 'grid' ? (
                        <WheelCard product={product} key={`grid-${product.id}`} />
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
