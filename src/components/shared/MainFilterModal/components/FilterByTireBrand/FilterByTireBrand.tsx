import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import React from 'react';
import useFilterByTireBrand from './useFilterByTireBrand';
import SelectedItem from './components/SelectedItem/SelectedItem';
import SelectBrand from './components/SelectBrand/SelectBrand';
import FilterFooter from '../FilterFooter/FilterFooter';

const FilterByTireBrand = () => {
  const { brand } = useFilterByTireBrand();
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
      {brand && <FilterFooter />}
    </div>
  );
};

export default FilterByTireBrand;
