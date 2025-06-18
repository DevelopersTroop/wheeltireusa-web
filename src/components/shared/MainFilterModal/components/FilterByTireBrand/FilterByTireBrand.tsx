import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import React from 'react';
import useFilterByTireBrand from './useFilterByTireBrand';
import SelectedItem from './components/SelectedItem/SelectedItem';
// import SelectBrand from './components/SelectBrand/SelectBrand';
import FilterFooter from '../FilterFooter/FilterFooter';
import dynamic from 'next/dynamic';
import ListSkeleton from '../ListSkeleton/ListSkeleton';
import AddZipCode from '../AddZipCode/AddZipCode';
const SelectBrand = dynamic(
  () => import('./components/SelectBrand/SelectBrand'),
  {
    ssr: false,
    loading: () => <ListSkeleton title="Brand" mobile={2} />,
  }
);

const FilterByTireBrand = () => {
  const { brand, isDisabled, submitFilter } = useFilterByTireBrand();
  return (
    <div
      className={cn(
        'h-[calc(100dvh-110px)] lg:h-[70dvh] lg:block flex flex-col justify-between'
      )}
    >
      <ScrollArea
        className={cn(
          'h-[calc(100dvh-110px)] lg:h-[70dvh] pb-3',
          brand && 'lg:h-[calc(70dvh-90px)] pb-0'
        )}
      >
        <div className="flex flex-col gap-4">
          {brand && <SelectedItem />}
          {!brand && <SelectBrand />}
          {brand && (
            <>
              <div className="text-muted-dark text-[20px] px-6 order-3">
                Enter your zip code to get best shipping and installation
                options
              </div>
              <AddZipCode />
            </>
          )}
        </div>
      </ScrollArea>
      {brand && (
        <FilterFooter isDisabled={isDisabled} submitFilter={submitFilter} />
      )}
    </div>
  );
};

export default FilterByTireBrand;
