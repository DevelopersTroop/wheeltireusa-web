import BrickBox from '../../../BrickBox/BrickBox';
import Search from '../../../Search/Search';
import useSelectMake from './useSelectMake';
const SelectMake = () => {
  const { search, filteredMakes, setSearch, setMake, alphabets, setAlphabets } =
    useSelectMake();

  return (
    <>
      <div className="pb-5 pt-3 px-6 border-b border-muted-dark order-1 flex justify-between">
        <Search
          search={search}
          setSearch={setSearch}
          setAlphabets={setAlphabets}
          alphabets={alphabets}
        />
      </div>

      <div className="text-muted-dark text-[20px] px-6 order-3">
        Select Make
      </div>
      <div className="grid grid-cols-5 gap-3 px-6 order-4">
        {filteredMakes.map((make) => (
          <BrickBox
            showTooltip={true}
            onClick={setMake}
            key={make}
            text={make}
            filterType="byVehicle"
            fieldName="make"
          />
        ))}
      </div>
    </>
  );
};

export default SelectMake;
