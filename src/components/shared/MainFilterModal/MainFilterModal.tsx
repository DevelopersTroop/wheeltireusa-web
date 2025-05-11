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

const YmmForm = () => {
  const dispatch = useDispatch();
  const { isFilterModalOpen } = useMainFilterModal();

  const handleDialogChange = (isOpen: boolean) => {
    dispatch(openMainFilterModal());
    if (!isOpen) {
      dispatch(closeMainFilterModal());
    }
  };

  return (
    <>
      <Dialog open={isFilterModalOpen} onOpenChange={handleDialogChange}>
        <DialogContent className="sm:max-w-1/2 bg-muted p-0 lg:max-w-2/3">
          <Tabs defaultValue="vehicle">
            <TabsList className="p-6 bg-muted border-b-1 border-muted-dark rounded-none w-full flex justify-start pb-[30px] mt-4">
              <div className="flex items-center space-x-6">
                <DialogTitle className="text-lg">
                  Select your vehicle
                </DialogTitle>
                <TabsTriggerMainFilter value="vehicle" className="">
                  Vehicle model
                </TabsTriggerMainFilter>
                <TabsTriggerMainFilter value="tireSize" className="">
                  Tire size
                </TabsTriggerMainFilter>
                <TabsTriggerMainFilter value="tireBrand" className="">
                  Tire brand
                </TabsTriggerMainFilter>
              </div>
            </TabsList>

            <TabsContent value="vehicle">
              <FilterByVehicle />
            </TabsContent>
            <TabsContent value="tireSize">
              Change your password here.
            </TabsContent>
            <TabsContent value="tireBrand">
              <FilterByTireBrand />
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  );
};

const FilterModals = () => {
  return <YmmForm />;
};

export default FilterModals;
