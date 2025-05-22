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

//InStockWheelFilters Component
const TireFilters = () => {
  // Retrieve search parameters from the URL
  // const searchParams = useSearchParams();

  // Mock data for filters
  const mockFilters: Record<string, TSingleFilter[] | TPriceFilter> = {
    forging_style: [{ value: 'Style A', count: 2 }],
    wheel_diameter: [{ value: 18, count: 18 }],
    wheel_size: [{ value: 8.5, count: 8.5 }],
    bolt_pattern: [{ value: '5x114.3', count: 1 }],
    design_type: [{ value: 'Design 1', count: 2 }],
    model_group: [{ value: 'Model X', count: 2 }],
    finish: [{ value: 'Finish X', count: 2 }],
    price: { min: 100, max: 1000 },
  };

  // Simulate fetching data
  const [data, setData] = useState<typeof mockFilters | null>(null);

  useEffect(() => {
    // Simulate an API call delay
    setTimeout(() => {
      setData(mockFilters);
    }, 1000);
  }, []);

  // const { data } = useGetProductFiltersQuery({ category: "in-stock-wheels", forgingProfile: searchParams.get("forging_style") });

  return (
    <>
      {/* Show loading skeleton while fetching filters */}
      {!data?.filters ? (
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
              size={getFiltersExceptPriceFilterBy(data, 'wheel_size')}
            />
          </div>

          {/* Wheel Model Filter */}
          <div className={'px-5 py-3 border-b'}>
            <WheelModel
              filterKey={'model_group'}
              model={getFiltersExceptPriceFilterBy(data, 'model_group')}
            />
          </div>

          {/* Price Range Filter */}
          <div>
            <WheelPriceRange price={getPriceFilter(data)} />
          </div>

          {/* Sale Filter (Toggle for filtering products on sale) */}
          <div>
            <SaleFilter />
          </div>
          {/* Wheel Diameter Filter */}
          <div className={'px-5 py-3 border-b'}>
            <WheelDiameter
              filterKey={'wheel_diameter'}
              diameter={getFiltersExceptPriceFilterBy(data, 'wheel_diameter')}
            />
          </div>

          {/* Bolt Pattern Filter */}
          <div className={'px-5 py-3 border-b'}>
            <WheelBoltPattern
              filterKey={'bolt_pattern'}
              boltPattern={getFiltersExceptPriceFilterBy(data, 'bolt_pattern')}
            />
          </div>

          {/* Wheel Design Filter */}
          <div className={'px-5 py-3 border-b'}>
            <WheelDesign
              filterKey={'design_type'}
              design={getFiltersExceptPriceFilterBy(data, 'design_type')}
            />
          </div>

          {/* Wheel Finish Filter */}
          <div className={'px-5 py-3'}>
            <WheelFinish
              filterKey={'finish'}
              finish={getFiltersExceptPriceFilterBy(data, 'finish')}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default TireFilters;
