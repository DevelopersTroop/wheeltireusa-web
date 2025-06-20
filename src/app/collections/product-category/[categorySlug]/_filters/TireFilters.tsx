'use client';

// UI Components
// import { useSearchParams } from "next/navigation";
import { useGetFilterListQuery } from '@/redux/apis/product';
import { getFiltersExceptPriceFilterBy } from '@/utils/filter';
import { useEffect, useState } from 'react';
import FilterLoadingSkeleton from '../_loading/FilterLoadingSkeleton';
import Category from './widgets/tire/Category';
import CustomerRating from './widgets/tire/CustomerRating';
import LoadIndex from './widgets/tire/LoadIndex';
import MileageWarranty from './widgets/tire/MileageWarranty';
import SpecialOffers from './widgets/tire/SpecialOffers';
import SpeedIndex from './widgets/tire/SpeedIndex';
import TireBrand from './widgets/tire/TireBrand';
import TireSize from './widgets/tire/TireSize/TireSize';
import TireType from './widgets/tire/TireType';

//InStockWheelFilters Component
const TireFilters: React.FC = () => {
  const { data: originalData, isLoading } = useGetFilterListQuery();

  // demo filter data
  const [data, setData] = useState<typeof originalData>(originalData);
  useEffect(() => {
    if (originalData) {
      setData({
        filters: {
          ...originalData.filters,
          load_index: [
            {
              value: '84',
              count: 0,
            },
            {
              value: '91',
              count: 0,
            },
            {
              value: '94',
              count: 0,
            },
            {
              value: '98',
              count: 0,
            },
            {
              value: '100',
              count: 0,
            },
            {
              value: '104',
              count: 0,
            },
            {
              value: '110',
              count: 0,
            },
            {
              value: '115',
              count: 0,
            },
          ],
          speed_index: [
            {
              value: 'H',
              count: 0,
            },
            {
              value: 'T',
              count: 0,
            },
            {
              value: 'V',
              count: 0,
            },
            {
              value: 'W',
              count: 0,
            },
            {
              value: 'Y',
              count: 0,
            },
            {
              value: 'Z',
              count: 0,
            },
            {
              value: 'Q',
              count: 0,
            },
            {
              value: 'S',
              count: 0,
            },
          ],
          category: [
            {
              value: 'Passenger',
              count: 0,
            },
            {
              value: 'Truck/SUV',
              count: 0,
            },
            {
              value: 'Truck/SUV - Sport Truck',
              count: 0,
            },
          ],
          customer_rating: [
            {
              value: '5 Stars',
              count: 0,
            },
            {
              value: '4 Stars',
              count: 0,
            },
          ],
          special_offers: [
            {
              value: 'Free Shipping',
              count: 0,
            },
            {
              value: 'Save $100',
              count: 0,
            },
            {
              value: 'Consumer Rebate',
              count: 0,
            },
          ],
          mileage_warranty: [
            {
              value: 'None',
              count: 0,
            },
            {
              value: '30,000 miles',
              count: 0,
            },
            {
              value: '40,000 miles',
              count: 0,
            },
            {
              value: '50,000 miles',
              count: 0,
            },
            {
              value: '60,000 miles',
              count: 0,
            },
            {
              value: '70,000 miles',
              count: 0,
            },
            {
              value: '80,000 miles',
              count: 0,
            },
            {
              value: '90,000 miles',
              count: 0,
            },
          ],
        },
      });
    } else {
      setData(originalData);
    }
  }, [originalData]);

  return (
    <>
      {/* Show loading skeleton while fetching filters */}
      {!data || isLoading ? (
        <FilterLoadingSkeleton />
      ) : (
        <div
          className={'w-[20.3125rem] filter-shadow rounded-2xl bg-[#F7F7F7]'}
        >
          <div className={'px-5 py-3 border-b'}>
            <TireSize
              width={getFiltersExceptPriceFilterBy(data.filters, 'width')}
              aspectRatio={getFiltersExceptPriceFilterBy(
                data.filters,
                'aspect_ratio'
              )}
              diameter={getFiltersExceptPriceFilterBy(data.filters, 'diameter')}
            />
          </div>
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
