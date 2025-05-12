import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import dynamic from 'next/dynamic';
import FilterFooter from '../FilterFooter/FilterFooter';
import SelectedItem from './components/SelectedItem/SelectedItem';
import useFilterByTireSize from './useFilterByTireSize';
import SelectDiameter from './components/SelectDiameter/SelectDiameter';

const SelectWidth = dynamic(
  () => import('./components/SelectWidth/SelectWidth'),
  { ssr: false, loading: () => <div>Loading...</div> }
);
const SelectAspectRatio = dynamic(
  () => import('./components/SelectAspectRatio/SelectAspectRatio'),
  { ssr: false, loading: () => <div>Loading...</div> }
);

const FilterByTireSize = () => {
  const {
    shouldShowFooter,
    frontTireDiameter,
    frontTireWidth,
    frontTireAspectRatio,
  } = useFilterByTireSize();
  return (
    <div className={cn('h-[70dvh]')}>
      <ScrollArea
        className={cn(
          'h-[70dvh] pb-3',
          shouldShowFooter && 'h-[calc(70dvh-90px)] pb-0'
        )}
      >
        <div className="flex flex-col gap-4">
          <SelectedItem />
          {!frontTireWidth && !frontTireAspectRatio && !frontTireDiameter && (
            <SelectWidth />
          )}
          {frontTireWidth && !frontTireAspectRatio && !frontTireDiameter && (
            <SelectAspectRatio />
          )}
          {frontTireWidth && frontTireAspectRatio && <SelectDiameter />}
        </div>
      </ScrollArea>
      {shouldShowFooter && <FilterFooter />}
    </div>
  );
};

export default FilterByTireSize;
