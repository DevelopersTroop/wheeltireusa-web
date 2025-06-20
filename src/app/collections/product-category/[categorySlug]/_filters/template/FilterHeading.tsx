// FilterHeading component renders a button that serves as a header for a filter section.
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
const FilterHeading = ({
  showFilter,
  toggleFilter,
  title,
  disabled = false,
}: {
  title: string;
  showFilter: boolean;
  toggleFilter: () => void;
  disabled?: boolean;
}) => {
  return (
    <button
      disabled={disabled}
      onClick={toggleFilter}
      className="w-full flex text-xl leading-6 text-[#210203] font-semibold items-center justify-between py-2 disabled:cursor-not-allowed disabled:opacity-40"
    >
      {title} {/* Display the title of the filter section */}
      {/* Conditionally render the arrow icon based on showFilter and disabled state */}
      {!disabled && showFilter ? (
        // Show "Up" arrow when filter is visible (expanded)
        <div className="text-[#210203]">
          <IoIosArrowUp className="h-4 w-4" />
        </div>
      ) : (
        // Show "Down" arrow when filter is hidden (collapsed)
        <div className="text-[#210203]">
          <IoIosArrowDown className="h-4 w-4" />
        </div>
      )}
    </button>
  );
};

export default FilterHeading;
