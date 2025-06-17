'use client';
import useMainFilterModal from '@/components/shared/MainFilterModal/useMainFilterModal.';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTriggerMainFilter,
} from '@/components/ui/tabs';
import {
  closeMainFilterModal,
  openMainFilterModal,
} from '@/redux/features/mainFilterSlice';
import { useDispatch } from 'react-redux';
import FilterByTireBrand from './components/FilterByTireBrand/FilterByTireBrand';
import FilterByVehicle from './components/FilterByVehicle/FilterByVehicle';
import FilterByTireSize from './components/FilterByTireSize/FilterByTireSize';
import { useTypedSelector } from '@/redux/store';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { isMdScreenOrBigger } from '@/lib/utils';

const YmmForm = () => {
  const dispatch = useDispatch();
  const { isFilterModalOpen } = useMainFilterModal();

  const activeTab = useTypedSelector((state) => state.mainFilter.activeTab);

  const handleDialogChange = (isOpen: boolean) => {
    dispatch(openMainFilterModal({ tab: 'Vehicle' }));
    if (!isOpen) {
      dispatch(closeMainFilterModal());
    }
  };

  return (
    <>
      {isMdScreenOrBigger() ? (
        <>
          <Dialog open={isFilterModalOpen} onOpenChange={handleDialogChange}>
            <DialogContent className="sm:max-w-1/2 bg-muted p-0 lg:max-w-2/3">
              <Tabs value={activeTab ?? 'Vehicle'}>
                <TabsList className="p-6 bg-muted border-b-1 border-muted-dark rounded-none w-full flex justify-start pb-[30px] mt-4">
                  <div className="flex items-center space-x-6">
                    <DialogTitle className="text-lg">
                      Select your vehicle
                    </DialogTitle>
                    <TabsTriggerMainFilter
                      onClick={() =>
                        dispatch(openMainFilterModal({ tab: 'Vehicle' }))
                      }
                      value="Vehicle"
                      className=""
                    >
                      Vehicle model
                    </TabsTriggerMainFilter>
                    <TabsTriggerMainFilter
                      onClick={() =>
                        dispatch(openMainFilterModal({ tab: 'TireSize' }))
                      }
                      value="TireSize"
                      className=""
                    >
                      Tire size
                    </TabsTriggerMainFilter>
                    <TabsTriggerMainFilter
                      onClick={() =>
                        dispatch(openMainFilterModal({ tab: 'TireBrand' }))
                      }
                      value="TireBrand"
                      className=""
                    >
                      Tire brand
                    </TabsTriggerMainFilter>
                  </div>
                </TabsList>

                <TabsContent value="Vehicle">
                  <FilterByVehicle />
                </TabsContent>
                <TabsContent value="TireSize">
                  <FilterByTireSize />
                </TabsContent>
                <TabsContent value="TireBrand">
                  <FilterByTireBrand />
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>
        </>
      ) : (
        <>
          <Sheet open={isFilterModalOpen} onOpenChange={handleDialogChange}>
            <SheetContent className="sm:max-w-[90%] sm:min-w-[90%] max-w-[90%] min-w-[90%] bg-muted">
              <SheetTitle className="text-lg pt-5 px-4">
                Select your vehicle
              </SheetTitle>
              <Tabs value={activeTab ?? 'Vehicle'}>
                <TabsList className="pt-3 bg-muted border-b-1 border-muted-dark rounded-none w-full flex justify-start pb-[30px]">
                  <div className="flex items-center space-x-2 pl-1.5">
                    <TabsTriggerMainFilter
                      onClick={() =>
                        dispatch(openMainFilterModal({ tab: 'Vehicle' }))
                      }
                      value="Vehicle"
                    >
                      Vehicle model
                    </TabsTriggerMainFilter>
                    <TabsTriggerMainFilter
                      onClick={() =>
                        dispatch(openMainFilterModal({ tab: 'TireSize' }))
                      }
                      value="TireSize"
                      className=""
                    >
                      Tire size
                    </TabsTriggerMainFilter>
                    <TabsTriggerMainFilter
                      onClick={() =>
                        dispatch(openMainFilterModal({ tab: 'TireBrand' }))
                      }
                      value="TireBrand"
                      className=""
                    >
                      Tire brand
                    </TabsTriggerMainFilter>
                  </div>
                </TabsList>

                <TabsContent value="Vehicle">
                  <FilterByVehicle />
                </TabsContent>
                <TabsContent value="TireSize">
                  <FilterByTireSize />
                </TabsContent>
                <TabsContent value="TireBrand">
                  <FilterByTireBrand />
                </TabsContent>
              </Tabs>
            </SheetContent>
          </Sheet>
        </>
      )}
    </>
  );
};

const FilterModals = () => {
  return <YmmForm />;
};

export default FilterModals;
