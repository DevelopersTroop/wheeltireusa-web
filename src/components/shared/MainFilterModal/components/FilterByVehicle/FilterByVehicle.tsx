import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import ListSkeleton from '../ListSkeleton/ListSkeleton';
import SelectedItem from './components/SelectedItem/SelectedItem';
import useFilterByVehicle from './useFilterByVehicle';

// Dynamic imports
import dynamic from 'next/dynamic';
import SelectSize from './components/SelectSize/SelectSize';
const SelectMake = dynamic(() => import('./components/SelectMake/SelectMake'), {
  ssr: false,
  loading: () => <ListSkeleton title="Make" />,
});
const SelectModel = dynamic(
  () => import('./components/SelectModel/SelectModel'),
  { ssr: false, loading: () => <ListSkeleton title="Model" /> }
);
const FilterFooter = dynamic(() => import('../FilterFooter/FilterFooter'), {
  ssr: false,
});
const SelectYear = dynamic(() => import('./components/SelectYear/SelectYear'), {
  ssr: false,
  loading: () => <ListSkeleton title="Year" />,
});
const AddZipCode = dynamic(() => import('../AddZipCode/AddZipCode'), {
  ssr: false,
  loading: () => <ListSkeleton title="Add Zip Code" />,
});

const FilterByVehicle = () => {
  const {
    year,
    make,
    model,
    frontTireSize,
    rearTireSize,
    isDisabled,
    submitFilter,
  } = useFilterByVehicle();

  return (
    <div className={cn('h-[70dvh]')}>
      <ScrollArea
        className={cn(
          'h-[70dvh] pb-3',
          year && make && model && 'h-[calc(70dvh-90px)] pb-0'
        )}
      >
        <div className="flex flex-col gap-4">
          {(year || make || model) && <SelectedItem />}
          {!year && <SelectYear />}
          {year && !make && <SelectMake />}
          {year && make && !model && <SelectModel />}
          {year && make && model && !frontTireSize && !rearTireSize && (
            <SelectSize />
          )}
          {year && make && model && frontTireSize && rearTireSize && (
            <AddZipCode />
          )}
        </div>
      </ScrollArea>
      {year && make && model && (
        <FilterFooter isDisabled={isDisabled} submitFilter={submitFilter} />
      )}
    </div>
  );
};

export default FilterByVehicle;
