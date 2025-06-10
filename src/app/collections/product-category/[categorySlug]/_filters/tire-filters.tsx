'use client';

// UI Components
// import { useSearchParams } from "next/navigation";
import { useGetFilterListQuery } from '@/redux/apis/product';
import { getFiltersExceptPriceFilterBy, getPriceFilter } from '@/utils/filter';
import FilterLoadingSkeleton from '../_loading/filter-loading-skeleton';
import { SaleFilter } from './sale-filter';
import WheelDiameter from './widgets/tire/wheel-diameter';
import WheelModel from './widgets/tire/wheel-model';
import WheelPriceRange from './widgets/tire/wheel-price-range';
import Wheelsize from './widgets/tire/wheel-size';

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
          {/* Wheel Size Filter */}
          <div className={'px-5 py-3 border-b'}>
            <Wheelsize
              filterKey={'tire_size'}
              size={getFiltersExceptPriceFilterBy(data.filters, 'tire_size')}
            />
          </div>

          {/* Wheel Model Filter */}
          <div className={'px-5 py-3 border-b'}>
            <WheelModel
              filterKey={'model'}
              model={getFiltersExceptPriceFilterBy(data.filters, 'model')}
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
              filterKey={'diameter'}
              diameter={getFiltersExceptPriceFilterBy(data.filters, 'diameter')}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default TireFilters;
