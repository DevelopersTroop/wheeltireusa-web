import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import ListSkeleton from '../ListSkeleton/ListSkeleton';
import SelectedItem from './components/SelectedItem/SelectedItem';
import useFilterByVehicle from './useFilterByVehicle';

// Dynamic imports
import dynamic from 'next/dynamic';
const SelectTireSize = dynamic(
  () => import('./components/SelectTireSize/SelectTireSize'),
  {
    ssr: false,
    loading: () => <ListSkeleton title="Size" />,
  }
);
const SelectMake = dynamic(() => import('./components/SelectMake/SelectMake'), {
  ssr: false,
  loading: () => <ListSkeleton title="Make" desktop={5} />,
});
const SelectModel = dynamic(
  () => import('./components/SelectModel/SelectModel'),
  { ssr: false, loading: () => <ListSkeleton title="Model" /> }
);
const SelectBodyTypeWithSubmodel = dynamic(
  () =>
    import(
      './components/SelectBodyTypeWithSubmodel/SelectBodyTypeWithSubmodel'
    ),
  {
    ssr: false,
    loading: () => <ListSkeleton title="Submodel with Body Type" desktop={3} />,
  }
);
const FilterFooter = dynamic(() => import('../FilterFooter/FilterFooter'), {
  ssr: false,
});
const SelectYear = dynamic(() => import('./components/SelectYear/SelectYear'), {
  ssr: false,
  loading: () => <ListSkeleton title="Year" mobile={2} desktop={5} />,
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
    bodyType,
    subModel,
    frontTireSize,
    rearTireSize,
    isDisabled,
    submitFilter,
    ref,
  } = useFilterByVehicle();
  return (
    <div
      className={cn(
        'h-[calc(100dvh-110px)] lg:h-[70dvh] lg:block flex flex-col justify-between'
      )}
    >
      <ScrollArea
        ref={ref}
        className={cn(
          'h-full lg:h-[70dvh] pb-3 block',
          year &&
            make &&
            model &&
            frontTireSize &&
            rearTireSize &&
            'lg:h-[calc(70dvh-90px)] pb-0'
        )}
      >
        <div className="flex flex-col gap-4 relative">
          {Boolean(year) && <SelectedItem />}
          {!year && <SelectYear />}
          {year && !make && <SelectMake />}
          {year && make && !model && <SelectModel />}
          {year && make && model && !bodyType && !subModel.SubModel && (
            <SelectBodyTypeWithSubmodel />
          )}
          {/* {year &&
            make &&
            model &&
            bodyType &&
            subModel.SubModel &&
            !frontTireSize &&
            !rearTireSize && <SelectTireSize direction="front" />}
          {year &&
            make &&
            model &&
            bodyType &&
            subModel.SubModel &&
            frontTireSize &&
            !rearTireSize && <SelectTireSize direction="rear" />} */}
          {year &&
            make &&
            model &&
            bodyType &&
            subModel.SubModel &&
            frontTireSize &&
            rearTireSize && (
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
      {year &&
        make &&
        model &&
        bodyType &&
        subModel.SubModel &&
        frontTireSize &&
        rearTireSize && (
          <FilterFooter isDisabled={isDisabled} submitFilter={submitFilter} />
        )}
    </div>
  );
};

export default FilterByVehicle;
