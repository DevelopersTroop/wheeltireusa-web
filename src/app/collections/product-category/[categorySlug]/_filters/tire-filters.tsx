'use client';

// UI Components
// import { useSearchParams } from "next/navigation";
import { useGetFilterListQuery } from '@/redux/apis/product';
import { getFiltersExceptPriceFilterBy, getPriceFilter } from '@/utils/filter';
import FilterLoadingSkeleton from '../_loading/filter-loading-skeleton';
import { SaleFilter } from './widgets/shared/sale-filter';
import TireModel from './widgets/tire/TireModel';
import TirePriceRange from './widgets/tire/TIrePriceRange';

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
          {/* Tire Model Filter */}
          <div className={'px-5 py-3 border-b'}>
            <TireModel
              filterKey={'model'}
              model={getFiltersExceptPriceFilterBy(data.filters, 'model')}
            />
          </div>

          {/* Price Range Filter */}
          <div>
            <TirePriceRange price={getPriceFilter(data.filters)} />
          </div>

          {/* Sale Filter (Toggle for filtering products on sale) */}
          <div>
            <SaleFilter />
          </div>
        </div>
      )}
    </>
  );
};

export default TireFilters;
