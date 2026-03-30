import { CarFront, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import CategoryToggle, { Category } from "../CategoryToggle";
import VehicleDropdowns, { VehicleDropdownsProps } from "../VehicleDropdowns";
import GoButton from "../GoButton";

interface MobileViewProps {
  category: Category;
  onCategoryChange: (category: Category) => void;
  isOpen: boolean;
  onToggle: () => void;
  dropdownsProps: VehicleDropdownsProps;
  onSubmit: () => void;
  isSubmitDisabled: boolean;
}

export default function MobileView({
  category,
  onCategoryChange,
  isOpen,
  onToggle,
  dropdownsProps,
  onSubmit,
  isSubmitDisabled,
}: MobileViewProps) {
  return (
    <div>
      <button onClick={onToggle} className="w-full flex justify-between items-center">
        <div className="flex items-center gap-2">
          <CarFront className="w-4 h-4 text-primary" />
          <span className="text-xs font-semibold">SELECT VEHICLE</span>
        </div>
        <ChevronDown className={cn("transition-transform", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <div className="mt-3 space-y-4">
          <CategoryToggle category={category} onCategoryChange={onCategoryChange} variant="mobile" />
          <VehicleDropdowns {...dropdownsProps} compact={false} />
          <GoButton onSubmit={onSubmit} disabled={isSubmitDisabled} variant="mobile" />
        </div>
      )}
    </div>
  );
}

export type { Category };
export type { VehicleDropdownsProps };
