
import { useFilterSync } from "@/hooks/useFilterSync";
import { XIcon } from "lucide-react";
import { useMemo } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getFilterKeyTitle } from "@/constants/filterKeys";

export const ActionFilter = () => {
  const {
    toggleFilterValue,
    filters: activeFilters,
    removeSorting,
    clearFilters,
  } = useFilterSync();

  const queryParamsObject: Record<string, string> = {
    "title,asc": "Name (A to Z)",
    "title,desc": "Name (Z to A)",
    "msrp,asc": "Price (low to high)",
    "msrp,desc": "Price (high to low)",
  };
  const manipulatedObject = useMemo(() => {
    return Object.entries(activeFilters).filter(([key]) => key !== "packageId" && key !== "selectedVehicleInformation").map(([key, value]) => {
      if (key !== "sort" && value.split(",").length) {
        return value.split(",").map((item) => ({ key, value: item }));
      } else if (key === "sort") {
        return [{ key, value }];
      }
      return [{ key, value }];
    });
  }, [activeFilters]);
  return (
    <TooltipProvider>
      <div
        className={
          "sticky top-7 z-40 border-b border-gray-300 bg-gray-100 px-5 py-3 text-lg font-medium text-gray-900 transition-colors hover:text-gray-600 md:static md:bg-transparent"
        }
      >
        <div className="flex w-full items-center justify-between">
          <p>Action Filter</p>
          <p
            onClick={clearFilters}
            className="hidden cursor-pointer text-sm text-primary hover:text-primary-hover md:block"
          >
            Clear filter
          </p>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {manipulatedObject.flat().map(({ key, value }) => {
            const displayValue = key === "sort" ? queryParamsObject[value] : value;
            const keyTitle = getFilterKeyTitle(key);
            return (
              <Tooltip key={`${key}-${value}`}>
                <TooltipTrigger asChild>
                  <button
                    className="flex items-center gap-2 rounded-[4px] bg-primary px-2 py-1 text-sm text-white"
                    onClick={() => {
                      if (key === "sort") {
                        removeSorting();
                      } else {
                        toggleFilterValue(key, value);
                      }
                    }}
                  >
                    {displayValue}
                    <XIcon size={14} />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{keyTitle}: {displayValue}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </div>
    </TooltipProvider>
  );
};
