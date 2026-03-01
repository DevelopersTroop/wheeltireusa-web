"use client";
import { TSingleFilter } from "@/types/filter";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useMemo, useCallback } from "react";
import { useFilterSync } from "@/hooks/useFilterSync";

type SelectFilterTemplateProps = {
  filterData: TSingleFilter[];
  filterKey: string;
  disabled?: boolean;
  acceptMultipleValues?: boolean;
};

const SelectFilterTemplate = React.memo(({
  filterData,
  filterKey,
  disabled = false,
  acceptMultipleValues = true,
}: SelectFilterTemplateProps) => {
  const { filters, toggleFilterValue } = useFilterSync();
  const currentSelectedValues = useMemo(
    () => filters[filterKey]?.split(",") ?? [],
    [filters, filterKey]
  );

  const onCheckboxChange = useCallback(
    (_checked: boolean, value: string) => {
      toggleFilterValue(filterKey, value, acceptMultipleValues);
    },
    [toggleFilterValue, filterKey, acceptMultipleValues]
  );

  // Memoize the expensive pipe-split + deduplication
  const modifiedFilterData = useMemo(() => {
    const result: TSingleFilter[] = [];
    for (const data of filterData) {
      const splitValues = String(data.value).split(/ \| |\|/);
      for (const value of splitValues) {
        const trimmed = value.trim();
        if (trimmed.length > 0) {
          const existing = result.find(
            (item) => String(item.value).trim() === trimmed
          );
          if (!existing) {
            result.push({ count: data.count, value: trimmed });
          } else {
            existing.count += data.count;
          }
        }
      }
    }
    return result;
  }, [filterData]);

  const shouldScroll = modifiedFilterData.length > 8;

  return (
    <ScrollArea className={shouldScroll ? "h-[20rem] w-full" : "w-full"}>
      <div className="pt-2 pb-1">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-2.5">
            {modifiedFilterData.map((data: TSingleFilter) => {
              const isChecked = currentSelectedValues.includes(
                data.value.toString()
              );
              return (
                <div
                  key={data.value}
                  className="flex items-center gap-3 group cursor-pointer"
                  onClick={(e) => {
                    if (!disabled && e.target === e.currentTarget) {
                      onCheckboxChange(!isChecked, data.value.toString());
                    }
                  }}
                >
                  <Checkbox
                    id={`${filterKey}-${data.value}`}
                    disabled={disabled}
                    checked={isChecked}
                    onCheckedChange={(checked) =>
                      onCheckboxChange(
                        checked as boolean,
                        data.value.toString()
                      )
                    }
                    className="h-[18px] w-[18px] rounded-[3px] border-[1.5px] border-gray-300 shadow-none data-[state=checked]:bg-[#1a1a2e] data-[state=checked]:border-[#1a1a2e] transition-colors"
                  />
                  <label
                    htmlFor={`${filterKey}-${data.value}`}
                    className="text-[13px] font-semibold leading-none text-[#1a1a2e] cursor-pointer select-none"
                  >
                    {data.value}
                    {data.count > 0 && (
                      <span className="text-[#8b8fa3] font-normal ml-1">
                        ({data.count})
                      </span>
                    )}
                  </label>
                </div>
              );
            })}
          </div>
        </form>
      </div>
    </ScrollArea>
  );
});

SelectFilterTemplate.displayName = "SelectFilterTemplate";
export default SelectFilterTemplate;
