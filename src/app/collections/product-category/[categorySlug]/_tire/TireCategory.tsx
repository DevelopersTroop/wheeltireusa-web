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
import { RootState, useTypedSelector } from '@/redux/store';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import ProductCategoryLoading from '../../_components/_loading';
import SidebarFilters from '../_filters/mobile-filters/SidebarFilter';
import SortByFilter from '../_filters/SortByFilter';
import TireFilters from '../_filters/TireFilters';
import NoProductsFound from '../NoProductsFound';
import TireCard from './TireCard';
import TireCardList from './TireCardList';

const TireCategory: React.FC<{
  page?: number;
  topDescription?: string;
  bottomDescription?: string;
}> = ({ page = 1, topDescription, bottomDescription }) => {
  const searchParams = useSearchParams();
  const sort = searchParams.get('sort');

  const { filters } = useFilterSync();
  const safePage = Number.isFinite(page) && page > 0 ? page : 1;

  const vehicleInformation = useTypedSelector(
    (state) => state.persisted.yearMakeModel.vehicleInformation
  );
  const activeGarageId = useTypedSelector(
    (state) => state.persisted.yearMakeModel.activeGarageId
  );

  const [ymmFilters, setYmmFilters] = useState<
    { tireSize: string; loadIndex: string; maxSpeedMPH: string }[]
  >([]);

  useEffect(() => {
    if (vehicleInformation?.boltPattern && activeGarageId) {
      const recommendations = vehicleInformation.tire_fitment?.recommendations ?? {};
      const ymmFilterData: any[] = [];
      const seen = new Set<string>();

      const addItems = (node: any) => {
        if (!Array.isArray(node)) return;
        for (const item of node) {
          const tireSize = item?.tireSize?.trim();
          const loadIndex = item?.tireMaxLoadRating?.toString();
          const maxSpeedMPH = item?.maxTireSpeedMPH?.toString();

          if (!tireSize || !loadIndex || !maxSpeedMPH) continue;

          const key = `${tireSize}|${loadIndex}|${maxSpeedMPH}`;
          if (seen.has(key)) continue;

          seen.add(key);
          ymmFilterData.push({ tireSize, loadIndex, maxSpeedMPH });
        }
      };

      const visit = (node: any) => {
        if (!node || typeof node !== 'object') return;
        Object.entries(node).forEach(([k, v]) => {
          if (k === 'Guaranteed') addItems(v);
          else visit(v);
        });
      };

      visit(recommendations);
      setYmmFilters(ymmFilterData);
    } else {
      setYmmFilters([]);
    }
  }, [vehicleInformation, activeGarageId]);

  const stableFilters = useMemo(() => filters, [JSON.stringify(filters)]);

  const { data, isLoading, isFetching } = useGetProductsQuery(
    {
      ...stableFilters,
      category: 'tire',
      page: safePage,
      ...(ymmFilters.length > 0 ? { ymmFilter: ymmFilters } : {}),
    },
    { refetchOnMountOrArgChange: true }
  );

  const viewType = useSelector(
    (state: RootState) => state.persisted.layout.viewType
  );

  // ✅ Flatten like WheelCategory
  const flatProducts = useMemo(() => {
    return (data?.products ?? [])
      .map((p: any) => p?.[0])
      .filter(Boolean);
  }, [data]);

  // ✅ Same sorting system
  const getPrice = (p: any) =>
    p?.sellingPrice ?? p?.adjustedCost ?? p?.buyingPrice ?? p?.msrp ?? 0;

  const sortedProducts = useMemo(() => {
    const list = [...flatProducts];

    if (sort === 'msrp,asc') return list.sort((a, b) => getPrice(a) - getPrice(b));
    if (sort === 'msrp,desc') return list.sort((a, b) => getPrice(b) - getPrice(a));
    if (sort === 'title,asc')
      return list.sort((a, b) => (a?.title ?? '').localeCompare(b?.title ?? ''));
    if (sort === 'title,desc')
      return list.sort((a, b) => (b?.title ?? '').localeCompare(a?.title ?? ''));

    return list;
  }, [flatProducts, sort]);

  const isLoadingState = isLoading && !data;

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
          <Item href="/collections/product-category/tires">Tires</Item>
        </Breadcrumb>
      </div>

      <Container
        className={cn(
          'flex w-full flex-col gap-4 sm:gap-6 px-3 sm:px-4 pb-4 sm:pb-6 pt-2 lg:flex-row',
          viewType === 'grid' ? '' : 'max-w-[1450px]'
        )}
      >
        {/* Mobile Filters */}
        <div className="flex w-full justify-between lg:hidden sticky top-16 z-20 bg-white py-2">
          <SidebarFilters>
            <TireFilters />
          </SidebarFilters>

          <div className="w-full max-w-[140px] sm:max-w-[180px]">
            <SortByFilter />
          </div>
        </div>

        {/* Sidebar */}
        <aside className="hidden lg:flex lg:w-[280px] xl:w-[320px] 2xl:w-[400px] flex-col gap-3">
          <TireFilters />
        </aside>

        {/* Content */}
        {isLoadingState ? (
          <ProductCategoryLoading />
        ) : sortedProducts.length === 0 ? (
          <NoProductsFound />
        ) : (
          <div className="flex w-full flex-col">
            {/* Header */}
            <div className="hidden sm:flex justify-end items-center gap-4 mb-4 px-2">
              <ViewToggle />
              <div className="w-[120px] sm:w-[160px] lg:w-[180px]">
                <SortByFilter />
              </div>
            </div>

            {/* Products */}
            <div
              className={
                viewType === 'grid'
                  ? 'grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-3 sm:gap-4'
                  : 'flex flex-col gap-4'
              }
            >
              {sortedProducts.map((product) => (
                <div key={product.id} className="w-full">
                  {viewType === 'grid' ? (
                    <TireCard product={product} />
                  ) : (
                    <TireCardList product={product} />
                  )}
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-6 flex justify-center">
              <Paginate
                searchParams={new URLSearchParams(searchParams)}
                page={safePage}
                totalPages={data?.pages}
                categorySlug="tires"
              />
            </div>
          </div>
        )}
      </Container>

      {bottomDescription && (
        <div
          className="container mx-auto px-3 sm:px-4 my-4 text-center max-w-4xl text-gray-700"
          dangerouslySetInnerHTML={{ __html: bottomDescription }}
        />
      )}
    </>
  );
};

export default TireCategory;