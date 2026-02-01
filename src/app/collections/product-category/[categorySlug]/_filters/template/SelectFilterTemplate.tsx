"use client";
import { TSingleFilter } from "@/types/filter";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRef } from "react";
import { useFilterSync } from "@/hooks/useFilterSync";
// import useFilter from "../filter-store/useFilter";

type SelectFilterTemplateProps = {
  filterData: TSingleFilter[];
  filterKey: string;
  disabled?: boolean;
  acceptMultipleValues?: boolean;
};

const SelectFilterTemplate = ({
  filterData,
  filterKey,
  disabled = false,
  acceptMultipleValues = true,
}: SelectFilterTemplateProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { filters, toggleFilterValue } = useFilterSync()
  const currentSelectedValues = filters[filterKey]?.split(",") ?? []

  const onCheckboxChange = (checked: boolean, value: string) => {
    toggleFilterValue(filterKey, value, acceptMultipleValues);
  };

  let modifiedFilterData: TSingleFilter[] = [];
  for (const data of filterData) {
    const splitedValues = String(data.value).split(/ \| |\|/);
    for (const value of splitedValues) {
      if (value.length > 0) {
        if (
          !modifiedFilterData.find(
            (item) => String(item.value).trim() === value.trim()
          )
        ) {
          modifiedFilterData.push({
            count: 0,
            value: value.trim(),
          });
        }
      }
    }
  }
  modifiedFilterData = Array.from(new Set(modifiedFilterData));

  const shouldScroll = modifiedFilterData.length > 5;

  return (
    <ScrollArea className={shouldScroll ? "h-[18.5rem] w-full" : "w-full"}>
      <div ref={ref}>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-3">
            {modifiedFilterData.map((data: TSingleFilter) => (
              <div key={data.value} className="flex items-center space-x-2">
                <Checkbox
                  id={data.value.toString()}
                  disabled={disabled}
                  checked={currentSelectedValues?.includes(
                    data.value.toString()
                  )}
                  onCheckedChange={(checked) =>
                    onCheckboxChange(checked as boolean, data.value.toString())
                  }
                  className="border-gray-400 data-[state=checked]:bg-primary data-[state=checked]:border-primary rounded-none shadow-sm"
                />
                <label
                  htmlFor={data.value.toString()}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {data.value}
                </label>
              </div>
            ))}
          </div>
        </form>
      </div>
    </ScrollArea>
  );
};

export default SelectFilterTemplate;
