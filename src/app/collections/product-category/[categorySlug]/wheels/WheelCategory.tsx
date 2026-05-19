'use client';

import HomeFilter from '@/app/(home)/_components/HeroSection/components/HomeFilter/HomeFilter';
import { Paginate } from '@/components/shared/Paginate/Paginate';
import ViewToggle from '@/components/shared/ViewToggle/ViewToggle';
import Breadcrumb from '@/components/ui/breadcrumb/breadcrumb';
import Item from '@/components/ui/breadcrumb/item';
import Container from '@/components/ui/container/container';
import { useFilterSync } from '@/hooks/useFilterSync';
import { normalizeWheelFitment } from '@/lib/fitment';
import { cn } from '@/lib/utils';
import { useGetProductsQuery } from '@/redux/apis/product';
import { RootState, useTypedSelector } from '@/redux/store';
import { useSearchParams } from 'next/navigation';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import ProductCategoryLoading from '../../_components/_loading';
import SidebarFilters from '../_filters/mobile-filters/SidebarFilter';
import SortByFilter from '../_filters/SortByFilter';
import WheelFilters from '../_filters/WheelFilters';
import NoProductsFound from '../NoProductsFound';
import WheelCard from './WheelCard';
import WheelCardList from './WheelCardList';

const WheelCategory: React.FC<{
  page: number;
  topDescription?: string;
  bottomDescription?: string;
}> = ({ page = 1, topDescription, bottomDescription }) => {
  const searchParams = useSearchParams();
  const sort = searchParams.get('sort');

  const { filters } = useFilterSync();

  const vehicleInformation = useTypedSelector(
    (state) => state.persisted.yearMakeModel.vehicleInformation
  );

  const activeGarageId = useTypedSelector(
    (state) => state.persisted.yearMakeModel.activeGarageId
  );

  const wheelFitment = normalizeWheelFitment(
    vehicleInformation.VehicleDataFromDRD_NA,
    vehicleInformation.afterMarketDRSizes
  );

  const { data, isLoading: loading, isFetching } = useGetProductsQuery(
    {
      ...filters,
      category: 'wheels',
      ...(activeGarageId && vehicleInformation?.boltPattern
        ? wheelFitment
          ? { wheelFitment }
          : {}
        : {}),
    },
    { refetchOnMountOrArgChange: true }
  );

  const viewType = useSelector(
    (state: RootState) => state.persisted.layout.viewType
  );

  const flatProducts = useMemo(() => {
    return (data?.products ?? [])
      .map((p: any) => p?.[0])
      .filter(Boolean);
  }, [data]);

  const getPrice = (p: any) =>
    p?.sellingPrice ??
    p?.adjustedCost ??
    p?.buyingPrice ??
    p?.msrp ??
    0;

  const sortedProducts = useMemo(() => {
    const list = [...flatProducts];

    if (sort === 'msrp,asc') {
      return list.sort((a, b) => getPrice(a) - getPrice(b));
    }

    if (sort === 'msrp,desc') {
      return list.sort((a, b) => getPrice(b) - getPrice(a));
    }

    if (sort === 'title,asc') {
      return list.sort((a, b) =>
        (a?.title ?? '').localeCompare(b?.title ?? '')
      );
    }

    if (sort === 'title,desc') {
      return list.sort((a, b) =>
        (b?.title ?? '').localeCompare(a?.title ?? '')
      );
    }

    return list;
  }, [flatProducts, sort]);


  return (
    <>
      {topDescription && (
        <div
          className="container mx-auto px-3 sm:px-4 my-4"
          dangerouslySetInnerHTML={{ __html: topDescription }}
        />
      )}

      <HomeFilter variant="product" />

      <div className="container mx-auto px-3 sm:px-4 py-2">
        <Breadcrumb>
          <Item href="/">Home</Item>
          <Item href="/">Collections</Item>
          <Item href="/collections/product-category/wheels">
            Wheels
          </Item>
        </Breadcrumb>
      </div>

      <Container
        className={cn(
          'flex w-full flex-col gap-4 sm:gap-6 px-3 sm:px-4 pb-4 sm:pb-6 pt-2 lg:flex-row',
          viewType === 'grid' ? '' : 'max-w-[1450px]'
        )}
      >
        {/* Mobile Filters */}
        <div className="flex w-full flex-row gap-2 justify-between lg:hidden sticky top-16 z-20 bg-white py-2">
          <SidebarFilters>
            <WheelFilters />
          </SidebarFilters>

          <div className="w-full max-w-[140px] sm:max-w-[180px]">
            <SortByFilter />
          </div>
        </div>

        {/* Sidebar */}
        <aside className="hidden lg:flex lg:w-[280px] xl:w-[320px] 2xl:w-[400px] h-full flex-col gap-3 shrink-0">
          <WheelFilters />
        </aside>

        {/* Content */}
        {loading || isFetching ? (
          <ProductCategoryLoading />
        ) : sortedProducts.length === 0 ? (
          <NoProductsFound />
        ) : (
          <div className="flex w-full flex-col">
            {/* Header */}
            <div className="hidden sm:flex w-full justify-end items-center gap-4 mb-4 px-2">
              <ViewToggle />
              <div className="w-[120px] sm:w-[160px] lg:w-[180px]">
                <SortByFilter />
              </div>
            </div>

            {/* PRODUCTS */}
            <div
              className={
                viewType === 'grid'
                  ? 'grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-3 sm:gap-4'
                  : 'flex w-full flex-col gap-4'
              }
            >
              {sortedProducts.map((product) => (
                <div key={product.id} className="w-full">
                  {viewType === 'grid' ? (
                    <WheelCard product={product as any} />
                  ) : (
                    <WheelCardList product={product as any} />
                  )}
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-6 sm:mt-8 flex w-full justify-center">
              <Paginate
                searchParams={new URLSearchParams(searchParams)}
                page={page}
                totalPages={data?.pages}
                categorySlug="wheels"
              />
            </div>
          </div>
        )}
      </Container>

      {bottomDescription && (
        <div
          className="container mx-auto px-3 sm:px-4 my-4 sm:my-6 text-center max-w-4xl text-gray-700 leading-relaxed text-xs sm:text-sm md:text-base"
          dangerouslySetInnerHTML={{ __html: bottomDescription }}
        />
      )}
    </>
  );
};

export default WheelCategory;