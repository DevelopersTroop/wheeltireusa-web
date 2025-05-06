'use client';
import { useEffect, useState } from 'react';

// UI Components
// import { useSearchParams } from "next/navigation";
import FilterLoadingSkeleton from '../_loading/filter-loading-skeleton';
import { getFiltersExceptPriceFilterBy, getPriceFilter } from '@/utils/filter';
import WheelDiameter from './widgets/tire/wheel-diameter';
import Wheelsize from './widgets/tire/wheel-size';
import { SaleFilter } from './sale-filter';
import WheelBoltPattern from './widgets/tire/wheel-bolt-pattern';
import WheelDesign from './widgets/tire/wheel-design';
import WheelFinish from './widgets/tire/wheel-finish';
import WheelModel from './widgets/tire/wheel-model';
import WheelPriceRange from './widgets/tire/wheel-price-range';

//InStockWheelFilters Component
const TireFilters = () => {
  // Retrieve search parameters from the URL
  // const searchParams = useSearchParams();

  // Mock data for filters
  const mockFilters = {
    filters: {
      forging_style: ['Style A', 'Style B', 'Style C'],
      wheel_diameter: ['18', '19', '20'],
      wheel_size: ['8.5', '9.5', '10.5'],
      bolt_pattern: ['5x114.3', '5x120', '6x139.7'],
      design_type: ['Design 1', 'Design 2', 'Design 3'],
      model_group: ['Model X', 'Model Y', 'Model Z'],
      finish: ['Gloss Black', 'Matte Silver', 'Chrome'],
      price: { min: 100, max: 1000 },
    },
  };

  // Simulate fetching data
  const [data, setData] = useState<{
    filters: typeof mockFilters.filters;
  } | null>(null);

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
              size={getFiltersExceptPriceFilterBy(data?.filters, 'wheel_size')}
            />
          </div>

          {/* Wheel Model Filter */}
          <div className={'px-5 py-3 border-b'}>
            <WheelModel
              filterKey={'model_group'}
              model={getFiltersExceptPriceFilterBy(
                data?.filters,
                'model_group'
              )}
            />
          </div>

          {/* Price Range Filter */}
          <div>
            <WheelPriceRange price={getPriceFilter(data?.filters)} />
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
                data?.filters,
                'wheel_diameter'
              )}
            />
          </div>

          {/* Bolt Pattern Filter */}
          <div className={'px-5 py-3 border-b'}>
            <WheelBoltPattern
              filterKey={'bolt_pattern'}
              boltPattern={getFiltersExceptPriceFilterBy(
                data?.filters,
                'bolt_pattern'
              )}
            />
          </div>

          {/* Wheel Design Filter */}
          <div className={'px-5 py-3 border-b'}>
            <WheelDesign
              filterKey={'design_type'}
              design={getFiltersExceptPriceFilterBy(
                data?.filters,
                'design_type'
              )}
            />
          </div>

          {/* Wheel Finish Filter */}
          <div className={'px-5 py-3'}>
            <WheelFinish
              filterKey={'finish'}
              finish={getFiltersExceptPriceFilterBy(data?.filters, 'finish')}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default TireFilters;
