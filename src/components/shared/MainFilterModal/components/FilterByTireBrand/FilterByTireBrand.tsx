import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import React from 'react';
import useFilterByTireBrand from './useFilterByTireBrand';
import SelectedItem from './components/SelectedItem/SelectedItem';
// import SelectBrand from './components/SelectBrand/SelectBrand';
import FilterFooter from '../FilterFooter/FilterFooter';
import dynamic from 'next/dynamic';
import ListSkeleton from '../ListSkeleton/ListSkeleton';
const SelectBrand = dynamic(
  () => import('./components/SelectBrand/SelectBrand'),
  {
    ssr: false,
    loading: () => <ListSkeleton title="Brand" />,
  }
);

const FilterByTireBrand = () => {
  const { brand, isDisabled, submitFilter } = useFilterByTireBrand();
  return (
    <div className={cn('h-[70dvh]')}>
      <ScrollArea
        className={cn('h-[70dvh] pb-3', brand && 'h-[calc(70dvh-90px)] pb-0')}
      >
        <div className="flex flex-col gap-4">
          {brand && <SelectedItem />}
          <SelectBrand />
        </div>
      </ScrollArea>
      {brand && (
        <FilterFooter isDisabled={isDisabled} submitFilter={submitFilter} />
      )}
    </div>
  );
};

export default FilterByTireBrand;
