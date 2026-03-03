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
      className="w-full flex items-center justify-between py-2 group cursor-pointer"
    >
      <span className="text-[13px] font-extrabold uppercase tracking-wide text-[#1a1a2e]">
        {title}
      </span>
      <span className="text-[#1a1a2e] text-xl leading-none font-light select-none transition-transform">
        {showFilter ? "−" : "+"}
      </span>
    </button>
  );
};

export default FilterHeading;
