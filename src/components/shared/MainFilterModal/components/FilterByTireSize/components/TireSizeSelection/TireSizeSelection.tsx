import React, { memo } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import SelectProperty from '../SelectProperty/SelectProperty';
import { TTireSize } from '../../useFilterByTireSize';
import useTireSizeSelection from './useTireSizeSelection';
import ListSkeleton from '../../../ListSkeleton/ListSkeleton';

const TireSizeSelection = ({
  setSelectedTireSizes,
}: {
  setSelectedTireSizes: React.Dispatch<React.SetStateAction<TTireSize | null>>;
}) => {
  const {
    form,
    differentOnRear,
    allWidths,
    allAspectRatios,
    allDiameters,
    isLoading,
  } = useTireSizeSelection(setSelectedTireSizes);
  return (
    <>
      {!isLoading ? (
        <>
          <Form {...form}>
            <form className="flex flex-col gap-12 items-center ">
              {/* Front Tire */}
              <div className="flex sm:flex-col lg:flex-row lg:justify-between w-full sm:gap-4 lg:gap-0">
                <SelectProperty
                  name="frontWidth"
                  label="Width"
                  options={allWidths ?? []}
                  control={form.control}
                />
                <SelectProperty
                  name="frontAspectRatio"
                  label="Aspect Ratio"
                  options={allAspectRatios ?? []}
                  control={form.control}
                />
                <SelectProperty
                  name="frontDiameter"
                  label="Diameter"
                  options={allDiameters ?? []}
                  control={form.control}
                />
              </div>

              {/* Checkbox */}
              <div className="flex justify-between w-full">
                <FormField
                  control={form.control}
                  name="differentOnRear"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-3">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="mb-0">
                        Add a Different Rear Tire Size
                      </FormLabel>
                    </FormItem>
                  )}
                />
              </div>
              {/* Rear Tire */}
              {differentOnRear && (
                <div className="flex sm:flex-col lg:flex-row lg:justify-between w-full sm:gap-4 lg:gap-0">
                  <SelectProperty
                    name="rearWidth"
                    label="Width"
                    options={allWidths ?? []}
                    control={form.control}
                  />
                  <SelectProperty
                    name="rearAspectRatio"
                    label="Aspect Ratio"
                    options={allAspectRatios ?? []}
                    control={form.control}
                  />
                  <SelectProperty
                    name="rearDiameter"
                    label="Diameter"
                    options={allDiameters ?? []}
                    control={form.control}
                  />
                </div>
              )}
            </form>
          </Form>
        </>
      ) : (
        <ListSkeleton onlyItem={true} />
      )}
    </>
  );
};

export default memo(TireSizeSelection);
