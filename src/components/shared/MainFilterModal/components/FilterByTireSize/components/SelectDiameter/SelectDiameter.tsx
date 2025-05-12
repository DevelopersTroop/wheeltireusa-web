import BrickBox from '../../../BrickBox/BrickBox';
import Search from '../../../Search/Search';
import useSelectDiameter from './useSelectDiameter';
const SelectDiameter = () => {
  const { search, filteredDiameters, setSearch, setDiameter } =
    useSelectDiameter();

  return (
    <>
      <div className="pb-5 pt-3 px-6 border-b border-muted-dark order-1 flex justify-between">
        <Search search={search} setSearch={setSearch} />
      </div>

      <div className="text-muted-dark text-[20px] px-6 order-3">
        Select Diameter
      </div>
      <div className="grid grid-cols-5 gap-3 px-6 order-4">
        {filteredDiameters.map((diameter) => (
          <BrickBox
            showTooltip={true}
            onClick={setDiameter}
            key={diameter}
            text={diameter}
            filterType="byTireSize"
            fieldName="frontTireDiameter"
          />
        ))}
      </div>
    </>
  );
};

export default SelectDiameter;
