'use client';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Form } from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TSingleFilter } from '@/types/filter';
import { Controller } from 'react-hook-form';
import FilterHeading from '../../../template/FilterHeading';
import useTireSize from './useTireSize';
import { Fragment } from 'react';
import { removeDuplicateDataWithRemovingFloatingPoint } from '@/lib/utils';

export type TireSizeProps = {
  width: TSingleFilter[];
  aspectRatio: TSingleFilter[];
  diameter: TSingleFilter[];
};

const TireSize = (props: TireSizeProps) => {
  const {
    showFilter,
    toggleFilter,
    form,
    control,
    handleSubmit,
    onSubmit,
    onClear,
    diffRearSize,
    formState,
  } = useTireSize(props);

  return (
    <>
      <FilterHeading
        showFilter={showFilter}
        toggleFilter={toggleFilter}
        title="Size"
        disabled={false}
      />

      {showFilter && (
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            {/* Front selects */}
            <div className="flex gap-2">
              <Controller
                name="frontWidth"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    onValueChange={field.onChange}
                    value={field.value || ''}
                  >
                    <SelectTrigger className="w-full text-[0.75rem] font-semibold">
                      <SelectValue placeholder="Width" />
                    </SelectTrigger>
                    <SelectContent className="z-2000">
                      {/* <SelectItem value="">Width</SelectItem> */}
                      {(() => {
                        const values = props.width.map((item) => item.value.toString());
                        const uniqueValues = removeDuplicateDataWithRemovingFloatingPoint(values);
                        return <>
                          {uniqueValues.map((item) => (
                            <SelectItem 
                              key={item}
                              value={item.toString()}
                            >
                              {item}
                            </SelectItem>
                          ))}
                        </>
                      })()}
                    </SelectContent>
                  </Select>
                )}
              />
              <Controller
                name="frontRatio"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    onValueChange={field.onChange}
                    value={field.value || ''}
                  >
                    <SelectTrigger className="w-full text-[0.75rem] font-semibold">
                      <SelectValue placeholder="Ratio" />
                    </SelectTrigger>
                    <SelectContent className="z-2000">
                      {/* <SelectItem value="">Ratio</SelectItem> */}
                      {(() => {
                        const values = props.aspectRatio.map((item) => item.value.toString());
                        const uniqueValues = removeDuplicateDataWithRemovingFloatingPoint(values);
                        return <>
                          {uniqueValues.map((item) => (
                            <SelectItem 
                              key={item}
                              value={item.toString()}
                            >
                              {item}
                            </SelectItem>
                          ))}
                        </>
                      })()}
                    </SelectContent>
                  </Select>
                )}
              />
              <Controller
                name="frontDiameter"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    onValueChange={field.onChange}
                    value={field.value || ''}
                  >
                    <SelectTrigger className="w-full text-[0.75rem] font-semibold">
                      <SelectValue placeholder="Diameter" />
                    </SelectTrigger>
                    <SelectContent className="z-2000">
                      {/* <SelectItem value="">Diameter</SelectItem> */}
                      {(() => {
                        const values = props.diameter.map((item) => item.value.toString());
                        const uniqueValues = removeDuplicateDataWithRemovingFloatingPoint(values);
                        return <>
                          {uniqueValues.map((item) => (
                            <SelectItem
                              key={item}
                              value={item.toString()}
                            >
                              {item}
                            </SelectItem>
                          ))}
                        </>
                      })()}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            {/* Rear selects, only if diffRearSize is checked */}
            {diffRearSize && (
              <div className="flex gap-2">
                <Controller
                  name="rearWidth"
                  control={control}
                  rules={{ required: diffRearSize }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      onValueChange={field.onChange}
                      value={field.value || ''}
                    >
                      <SelectTrigger className="w-full text-[0.75rem] font-semibold">
                        <SelectValue placeholder="Width" />
                      </SelectTrigger>
                      <SelectContent className="z-2000">
                        {/* <SelectItem value="">Width</SelectItem> */}
                        {(() => {
                          const values = props.width.map((item) => item.value.toString());
                          const uniqueValues = removeDuplicateDataWithRemovingFloatingPoint(values);
                          return <>
                            {uniqueValues.map((item) => (
                              <SelectItem
                                key={item}
                                value={item.toString()}
                              >
                                {item}
                              </SelectItem>
                            ))}
                          </>
                        })()}
                      </SelectContent>
                    </Select>
                  )}
                />
                <Controller
                  name="rearRatio"
                  control={control}
                  rules={{ required: diffRearSize }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      onValueChange={field.onChange}
                      value={field.value || ''}
                    >
                      <SelectTrigger className="w-full text-[0.75rem] font-semibold">
                        <SelectValue placeholder="Ratio" />
                      </SelectTrigger>
                      <SelectContent className="z-2000">
                        {/* <SelectItem value="">Ratio</SelectItem> */}
                        {(() => {
                          const values = props.aspectRatio.map((item) => item.value.toString());
                          const uniqueValues = removeDuplicateDataWithRemovingFloatingPoint(values);
                          return <>
                            {uniqueValues.map((item) => (
                              <SelectItem
                                key={item}
                                value={item.toString()}
                              >
                                {item}
                              </SelectItem>
                            ))}
                          </>
                        })()}
                      </SelectContent>
                    </Select>
                  )}
                />
                <Controller
                  name="rearDiameter"
                  control={control}
                  rules={{ required: diffRearSize }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      onValueChange={field.onChange}
                      value={field.value || ''}
                    >
                      <SelectTrigger className="w-full text-[0.75rem] font-semibold">
                        <SelectValue placeholder="Diameter" />
                      </SelectTrigger>
                      <SelectContent className="z-2000">
                        {/* <SelectItem value="">Diameter</SelectItem> */}
                        {(() => {
                          const values = props.diameter.map((item) => item.value.toString());
                          const uniqueValues = removeDuplicateDataWithRemovingFloatingPoint(values);
                          return <>
                            {uniqueValues.map((item) => (
                              <SelectItem
                                key={item}
                                value={item.toString()}
                              >
                                {item}
                              </SelectItem>
                            ))}
                          </>
                        })()}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            )}

            {/* Checkbox for different rear size */}
            <label className="flex gap-2 items-center text-black cursor-pointer">
              <Controller
                name="diffRearSize"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              I need different Rear tire size
            </label>
            <div className="flex gap-2 ">
              <Button type="submit" disabled={!formState.isValid}>
                Apply
              </Button>
              <Button
                type="button"
                onClick={onClear}
                className="bg-transparent text-primary p-1 hover:text-black hover:bg-transparent"
              >
                Clear
              </Button>
            </div>
          </form>
        </Form>
      )}
    </>
  );
};

export default TireSize;
