'use client';
import { useEffect, useState } from 'react';

// UI Components
// import { useSearchParams } from "next/navigation";
import { TPriceFilter, TSingleFilter } from '@/types/filter';
import { getFiltersExceptPriceFilterBy, getPriceFilter } from '@/utils/filter';
import FilterLoadingSkeleton from '../_loading/filter-loading-skeleton';
import { SaleFilter } from './sale-filter';
import WheelBoltPattern from './widgets/tire/wheel-bolt-pattern';
import WheelDesign from './widgets/tire/wheel-design';
import WheelDiameter from './widgets/tire/wheel-diameter';
import WheelFinish from './widgets/tire/wheel-finish';
import WheelModel from './widgets/tire/wheel-model';
import WheelPriceRange from './widgets/tire/wheel-price-range';
import Wheelsize from './widgets/tire/wheel-size';
import { TFilter } from './filter-store/filter-provider';
import { useGetFilterListQuery } from '@/redux/apis/product';

//InStockWheelFilters Component
const TireFilters: React.FC = () => {
  // Retrieve search parameters from the URL
  // const searchParams = useSearchParams();
  const { data, isLoading } = useGetFilterListQuery();

  // const { data } = useGetProductFiltersQuery({ category: "in-stock-wheels", forgingProfile: searchParams.get("forging_style") });
  return (
    <>
      {/* Show loading skeleton while fetching filters */}
      {!data || isLoading ? (
        <FilterLoadingSkeleton />
      ) : (
        <div className={'w-[304px] filter-shadow rounded-2xl bg-[#F7F7F7]'}>
          {/* Forging Series Filter */}
          {/* <div className={"px-5 py-3 border-b"}>
            <InStockWheelForgingSeries
              filterKey={"forging_style"}
              series={getFiltersExceptPriceFilterBy(data?.filters, "forging_style")}
            />
          </div> */}

          {/* Wheel Size Filter */}
          <div className={'px-5 py-3 border-b'}>
            <Wheelsize
              filterKey={'wheel_size'}
              size={getFiltersExceptPriceFilterBy(data.filters, 'wheel_size')}
            />
          </div>

          {/* Wheel Model Filter */}
          <div className={'px-5 py-3 border-b'}>
            <WheelModel
              filterKey={'model_group'}
              model={getFiltersExceptPriceFilterBy(data.filters, 'model_group')}
            />
          </div>

          {/* Price Range Filter */}
          <div>
            <WheelPriceRange price={getPriceFilter(data.filters)} />
          </div>

          {/* Sale Filter (Toggle for filtering products on sale) */}
          <div>
            <SaleFilter />
          </div>
          {/* Wheel Diameter Filter */}
          <div className={'px-5 py-3 border-b'}>
            <WheelDiameter
              filterKey={'wheel_diameter'}
              diameter={getFiltersExceptPriceFilterBy(
                data.filters,
                'tire_diameter'
              )}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default TireFilters;
