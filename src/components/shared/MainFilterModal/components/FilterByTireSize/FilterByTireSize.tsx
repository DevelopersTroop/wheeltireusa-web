'use client';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import dynamic from 'next/dynamic';
import ListSkeleton from '../ListSkeleton/ListSkeleton';
import SelectedItem from './components/SelectedItem/SelectedItem';
import useFilterByTireSize from './useFilterByTireSize';

// Dynamic imports for step components
const SelectWidth = dynamic(
  () => import('./components/SelectWidth/SelectWidth'),
  {
    ssr: false,
    loading: () => <ListSkeleton title="Width" desktop={5} />,
  }
);

const SelectAspectRatio = dynamic(
  () => import('./components/SelectAspectRatio/SelectAspectRatio'),
  {
    ssr: false,
    loading: () => <ListSkeleton title="Aspect Ratio" desktop={5} />,
  }
);

const SelectDiameter = dynamic(
  () => import('./components/SelectDiameter/SelectDiameter'),
  {
    ssr: false,
    loading: () => <ListSkeleton title="Diameter" desktop={5} />,
  }
);

const AddZipCode = dynamic(() => import('../AddZipCode/AddZipCode'), {
  ssr: false,
  loading: () => <ListSkeleton title="Add Zip Code" />,
});

const FilterFooter = dynamic(() => import('../FilterFooter/FilterFooter'), {
  ssr: false,
});

const FilterByTireSize = () => {
  const {
    width,
    aspectRatio,
    diameter,
    rearWidth,
    rearAspectRatio,
    rearDiameter,
    isDisabled,
    submitFilter,
    ref,
    isRearTireMode,
    shouldShowRearSelections,
    isFrontTireComplete,
    isRearTireComplete,
    handleRearTireSizeLinkClick,
    exitRearTireMode,
  } = useFilterByTireSize();

  // Determine which component to show based on selection state
  const renderCurrentStep = () => {
    // If we're in rear tire mode or have rear selections
    if (shouldShowRearSelections) {
      // Show rear tire selection flow
      if (!rearWidth) {
        return <SelectWidth isRearMode={true} />;
      }
      if (!rearAspectRatio) {
        return <SelectAspectRatio isRearMode={true} />;
      }
      if (!rearDiameter) {
        return <SelectDiameter isRearMode={true} />;
      }
      // All rear selections complete, show zip code
      return (
        <>
          <div className="text-muted-dark text-[20px] px-6 order-3">
            Enter your zip code to get best shipping and installation options
          </div>
          <AddZipCode showRearTireSizeLink={false} />
        </>
      );
    }

    // Normal front tire selection flow
    if (!width) {
      return <SelectWidth isRearMode={false} />;
    }
    if (!aspectRatio) {
      return <SelectAspectRatio isRearMode={false} />;
    }
    if (!diameter) {
      return <SelectDiameter isRearMode={false} />;
    }

    // Front tire selection complete, show zip code with rear tire link
    return (
      <>
        <div className="text-muted-dark text-[20px] px-6 order-3">
          Enter your zip code to get best shipping and installation options
        </div>
        <AddZipCode
          showRearTireSizeLink={true}
          onRearTireSizeLinkClick={handleRearTireSizeLinkClick}
        />
      </>
    );
  };

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
          ((width && aspectRatio && diameter) ||
            (rearWidth && rearAspectRatio && rearDiameter)) &&
            'lg:h-[calc(70dvh-90px)] pb-0'
        )}
      >
        <div className="flex flex-col gap-4 relative">
          {(Boolean(width) || Boolean(rearWidth)) && (
            <SelectedItem onFrontUpdate={exitRearTireMode} />
          )}
          {renderCurrentStep()}
        </div>
      </ScrollArea>
      {((width && aspectRatio && diameter) ||
        (rearWidth && rearAspectRatio && rearDiameter)) && (
        <FilterFooter
          isDisabled={Boolean(isDisabled)}
          submitFilter={submitFilter}
        />
      )}
    </div>
  );
};

export default FilterByTireSize;
