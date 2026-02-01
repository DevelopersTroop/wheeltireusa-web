import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
const FilterHeading = ({
  showFilter,
  toggleFilter,
  title,
}: {
  title: string;
  showFilter: boolean;
  toggleFilter: () => void;
}) => {
  return (
    <button
      onClick={toggleFilter}
      className="w-full flex items-center justify-between py-2 text-lg font-medium text-gray-800"
    >
      <span>{title}</span>
      {showFilter ? (
        <div className=" text-gray-600">
          <BiSolidUpArrow className="text-xl" />
        </div>
      ) : (
        <div className=" text-gray-600">
          <BiSolidDownArrow className="text-xl" />
        </div>
      )}
    </button>
  );
};

export default FilterHeading;
