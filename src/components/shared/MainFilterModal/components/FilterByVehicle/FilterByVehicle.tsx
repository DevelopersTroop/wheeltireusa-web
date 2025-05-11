import { ScrollArea } from '@/components/ui/scroll-area';
import SelectedItem from './components/SelectedItem/SelectedItem';
import ListSkeleton from '../ListSkeleton/ListSkeleton';
import useFilterByVehicle from './useFilterByVehicle';
import { cn } from '@/lib/utils';

// Dynamic imports
import dynamic from 'next/dynamic';
const SelectMake = dynamic(() => import('./components/SelectMake/SelectMake'), {
  ssr: false,
  loading: () => <ListSkeleton title="Make" />,
});
const SelectModel = dynamic(
  () => import('./components/SelectModel/SelectModel'),
  { ssr: false, loading: () => <ListSkeleton title="Model" /> }
);
const FilterFooter = dynamic(
  () => import('./components/FilterFooter/FilterFooter'),
  { ssr: false }
);
const SelectYear = dynamic(() => import('./components/SelectYear/SelectYear'), {
  ssr: false,
  loading: () => <ListSkeleton title="Year" />,
});

const FilterByVehicle = () => {
  const { year, make, model } = useFilterByVehicle();

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
          {year && make && <SelectModel />}
        </div>
      </ScrollArea>
      <FilterFooter />
    </div>
  );
};

export default FilterByVehicle;
