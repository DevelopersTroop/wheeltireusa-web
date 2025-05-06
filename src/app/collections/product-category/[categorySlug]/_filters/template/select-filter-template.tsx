'use client';
import { TSingleFilter } from '@/app/types/filter'; // Importing the type for the filter data
import { Checkbox } from '@/components/ui/checkbox';
// import { ScrollArea } from "@/components/ui/scroll-area";
import { useMemo, useRef, useCallback } from 'react';
import useFilter from '../filter-store/use-filter';
// import { capitalizeWords } from "@/app/utils/string";
import { cn } from '@/lib/utils';
import { capitalizeWords } from '@/utils/string';
import { ScrollArea } from '@/components/ui/scroll-area';

// Props for the SelectFilterTemplate component, including filter data, the key for the filter, and options for customization
type SelectFilterTemplateProps = {
  filterData: TSingleFilter[];
  filterKey: string;
  disabled?: boolean;
  acceptMultipleValues?: boolean;
  capitalize?: boolean;
};

// The SelectFilterTemplate component renders a scrollable filter with checkboxes for selecting filter values.
const SelectFilterTemplate = ({
  filterData,
  filterKey,
  disabled = false,
  acceptMultipleValues = true,
  capitalize = true,
}: SelectFilterTemplateProps) => {
  // Reference to the filter container (not used but could be useful for future enhancements)
  const ref = useRef<HTMLDivElement>(null);

  // Extracting filter actions (toggle, add, remove, replace, and format) from the custom useFilter hook
  const {
    filters,
    toggleFilterValue,
    addFilterValue,
    removeFilterValue,
    replaceFilterValue,
    formatFilterValue,
  } = useFilter();

  // Memoize selected values to prevent unnecessary calculations
  const currentSelectedValues = useMemo(() => {
    return filters[filterKey]?.split(',') ?? [];
  }, [filters, filterKey]);

  // Efficiently process unique filter values
  const modifiedFilterData = useMemo(() => {
    const uniqueFilterValues = new Set<string>();

    filterData.forEach(({ value }) => {
      String(value)
        .split(/ \| |\|/)
        .map((v) => v.trim())
        .filter((v) => v.length > 0)
        .forEach((v) => uniqueFilterValues.add(v));
    });

    return Array.from(uniqueFilterValues).map((value) => ({
      count: 0,
      value,
    }));
  }, [filterData]);

  // Memoize onCheckboxChange to prevent function recreation on each render
  const onCheckboxChange = useCallback(
    (checked: boolean, value: string) => {
      const values = [];
      if (value === 'Passenger') {
        values.push(value);
        values.push('Signature Series');
        values.push('Signature XL Series');
        values.push('AXL Concave');
        values.push('Wire Wheels');
        if (
          typeof filters[filterKey] !== 'undefined' &&
          filters[filterKey].split(',').includes('Passenger')
        ) {
          removeFilterValue(filterKey, values);
        } else {
          if (acceptMultipleValues) {
            addFilterValue(filterKey, values);
          } else {
            replaceFilterValue(filterKey, values.join(','));
          }
        }
      } else {
        values.push(value);
        toggleFilterValue(filterKey, values, acceptMultipleValues);
      }
    },
    [filterKey, acceptMultipleValues, toggleFilterValue]
  );

  // Check if the filter list should scroll (more than 9 filter options)
  const shouldScroll = modifiedFilterData.length > 9;

  return (
    <>
      {/* ScrollArea allows the filter options to be scrollable when there are many options */}
      <ScrollArea
        className={shouldScroll ? 'h-[18.5rem] w-full pb-2' : 'w-full pb-2'}
      >
        <div ref={ref}>
          {/* Form to handle the checkbox selections */}
          <form onSubmit={(e) => e.preventDefault()} className="space-y-3">
            {modifiedFilterData.map((data) => {
              const isSubItem =
                filterKey === 'forging_style' &&
                data.value !== 'Off-Road' &&
                data.value !== 'Dually' &&
                data.value !== 'Passenger';
              return (
                <div
                  key={data.value}
                  className={cn(
                    'flex items-center space-x-2',
                    isSubItem ? 'ml-6' : ''
                  )}
                >
                  {/* Checkbox component for each filter value */}
                  <Checkbox
                    id={data.value}
                    disabled={disabled}
                    checked={currentSelectedValues.includes(
                      formatFilterValue(data.value)
                    )}
                    onCheckedChange={(checked) =>
                      onCheckboxChange(checked as boolean, data.value)
                    }
                    className="border-gray-200 data-[state=checked]:bg-black data-[state=checked]:border-black rounded-sm"
                    aria-label={`Filter option: ${data.value}`}
                  />
                  {/* Label for the checkbox, displaying the filter value */}
                  <label
                    htmlFor={data.value}
                    className="text-base cursor-pointer leading-[19px] text-[#210203] font-normal hover:text-[#1e1e1eb4]"
                  >
                    {capitalize ? capitalizeWords(data.value) : data.value}
                  </label>
                </div>
              );
            })}
          </form>
        </div>
      </ScrollArea>
    </>
  );
};

export default SelectFilterTemplate;
