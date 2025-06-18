import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import AddZipCode from '../AddZipCode/AddZipCode';
import FilterFooter from '../FilterFooter/FilterFooter';
import TireSizeSelection from './components/TireSizeSelection/TireSizeSelection';
import useFilterByTireSize from './useFilterByTireSize';

const FilterByTireSize = () => {
  const { setSelectedTireSizes, isDisabled, submitFilter } =
    useFilterByTireSize();
  return (
    <div
      className={cn(
        'h-[calc(100dvh-110px)] lg:h-[70dvh] lg:block flex flex-col justify-between'
      )}
    >
      <ScrollArea className={cn('h-full lg:h-[calc(70dvh-90px)] pb-0')}>
        <div className="flex flex-col gap-4 mt-4 w-4/5 mx-auto">
          <h2 className="text-2xl font-bold">Tire Size</h2>
          <p className="text-sm text-gray-500">
            Select the tire size you want to filter by.
          </p>
        </div>
        <div className="flex flex-col gap-4  mt-8 w-4/5 mx-auto">
          <TireSizeSelection setSelectedTireSizes={setSelectedTireSizes} />
        </div>
        <div className="flex flex-col gap-4  mt-10 w-4/5 mx-auto">
          <div className="text-center text-lg">
            Enter your zip code to get best shipping and installation options
          </div>
          <AddZipCode />
        </div>
      </ScrollArea>
      {<FilterFooter isDisabled={isDisabled} submitFilter={submitFilter} />}
    </div>
  );
};

export default FilterByTireSize;
