'use client';

// UI Components
// import { useSearchParams } from "next/navigation";
import { useGetFilterListQuery } from '@/redux/apis/product';
import { getFiltersExceptPriceFilterBy, getPriceFilter } from '@/utils/filter';
import FilterLoadingSkeleton from '../_loading/FilterLoadingSkeleton';
import { SaleFilter } from './widgets/shared/SaleFilter';
import TireModel from './widgets/tire/TireModel';
import TirePriceRange from './widgets/tire/TIrePriceRange';
import TireBrand from './widgets/tire/TireBrand';
import { useEffect, useState } from 'react';
import LoadIndex from './widgets/tire/SpeedIndex';
import SpeedIndex from './widgets/tire/LoadIndex';
import Category from './widgets/tire/Category';
import TireType from './widgets/tire/TireType';
import CustomerRating from './widgets/tire/CustomerRating';
import MileageWarranty from './widgets/tire/MileageWarranty';
import SpecialOffers from './widgets/tire/SpecialOffers';

//InStockWheelFilters Component
const TireFilters: React.FC = () => {
  const { data, isLoading } = useGetFilterListQuery();

  return (
    <>
      {/* Show loading skeleton while fetching filters */}
      {!data || isLoading ? (
        <FilterLoadingSkeleton />
      ) : (
        <div className={'w-[304px] filter-shadow rounded-2xl bg-[#F7F7F7]'}>
          {/* Tire Brand Filter */}
          <div className={'px-5 py-3 border-b'}>
            <TireBrand
              filterKey={'brand'}
              brand={getFiltersExceptPriceFilterBy(data.filters, 'brand')}
            />
          </div>

          {/* Tire Category Filter */}
          <div className={'px-5 py-3 border-b'}>
            <Category
              filterKey={'category'}
              category={getFiltersExceptPriceFilterBy(data.filters, 'category')}
            />
          </div>

          {/* Tire Type Filter */}
          <div className={'px-5 py-3 border-b'}>
            <TireType
              filterKey={'tire_type'}
              tire_type={getFiltersExceptPriceFilterBy(
                data.filters,
                'tire_type'
              )}
            />
          </div>
          {/* Special Offers Filter */}
          <div className={'px-5 py-3 border-b'}>
            <SpecialOffers
              filterKey={'special_offers'}
              special_offers={getFiltersExceptPriceFilterBy(
                data.filters,
                'special_offers'
              )}
            />
          </div>

          {/* Customer Rating Filter */}
          <div className={'px-5 py-3 border-b'}>
            <CustomerRating
              filterKey={'customer_rating'}
              customer_rating={getFiltersExceptPriceFilterBy(
                data.filters,
                'customer_rating'
              )}
            />
          </div>
          {/* Tire Model Filter */}
          {/* <div className={'px-5 py-3 border-b'}>
            <TireModel
              filterKey={'model'}
              model={getFiltersExceptPriceFilterBy(data.filters, 'model')}
            />
          </div> */}

          {/* Tire Speed Index Filter */}
          <div className={'px-5 py-3 border-b'}>
            <SpeedIndex
              filterKey={'speed_index'}
              speedIndex={getFiltersExceptPriceFilterBy(
                data.filters,
                'speed_index'
              )}
            />
          </div>
          {/* Tire Load Index Filter */}
          <div className={'px-5 py-3 border-b'}>
            <LoadIndex
              filterKey={'load_index'}
              loadIndex={getFiltersExceptPriceFilterBy(
                data.filters,
                'load_index'
              )}
            />
          </div>

          {/* Mileage Warranty Filter */}
          <div className={'px-5 py-3 border-b'}>
            <MileageWarranty
              filterKey={'mileage_warranty'}
              mileage_warranty={getFiltersExceptPriceFilterBy(
                data.filters,
                'mileage_warranty'
              )}
            />
          </div>

          {/* Price Range Filter */}
          {/* <div>
            <TirePriceRange price={getPriceFilter(data.filters)} />
          </div> */}

          {/* Sale Filter (Toggle for filtering products on sale) */}
          {/* <div>
            <SaleFilter />
          </div> */}
        </div>
      )}
    </>
  );
};

export default TireFilters;
