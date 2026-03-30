import CategoryToggle, { Category } from "../CategoryToggle";
import VehicleDropdowns, { VehicleDropdownsProps } from "../VehicleDropdowns";
import GoButton from "../GoButton";

interface DesktopViewProps {
  category: Category;
  onCategoryChange: (category: Category) => void;
  dropdownsProps: VehicleDropdownsProps;
  onSubmit: () => void;
  isSubmitDisabled: boolean;
}

export default function DesktopView({
  category,
  onCategoryChange,
  dropdownsProps,
  onSubmit,
  isSubmitDisabled,
}: DesktopViewProps) {
  return (
    <div className="flex flex-col gap-0">
      <CategoryToggle category={category} onCategoryChange={onCategoryChange} variant="desktop" />
      <div className="flex items-center gap-2">
        <VehicleDropdowns {...dropdownsProps} compact={true} />
        <GoButton onSubmit={onSubmit} disabled={isSubmitDisabled} variant="desktop" />
      </div>
    </div>
  );
}

export type { Category };
export type { VehicleDropdownsProps };
