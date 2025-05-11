import BrickBox from '../../../BrickBox/BrickBox';
import Search from '../../../Search/Search';
import useSelectYear from './useSelectYear';

const SelectYear = () => {
  const { search, filteredYears, setSearch, setYear } = useSelectYear();

  return (
    <>
      <div className="pb-5 pt-3 px-6 border-b border-muted-dark order-1">
        <Search search={search} setSearch={setSearch} />
      </div>
      <div className="text-muted-dark text-[20px] px-6 order-3">
        Select Year
      </div>
      <div className="grid grid-cols-5 gap-3 px-6 order-5">
        {filteredYears.map((year) => (
          <BrickBox
            showTooltip={true}
            onClick={setYear}
            key={year}
            text={year}
            name="year"
          />
        ))}
      </div>
    </>
  );
};

export default SelectYear;
