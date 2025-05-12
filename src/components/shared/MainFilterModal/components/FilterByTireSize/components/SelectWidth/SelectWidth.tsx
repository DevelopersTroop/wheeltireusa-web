import BrickBox from '../../../BrickBox/BrickBox';
import Search from '../../../Search/Search';
import useSelectWidth from './useSelectWidth';
const SelectWidth = () => {
  const { search, filteredWidths, setSearch, setWidth } = useSelectWidth();

  return (
    <>
      <div className="pb-5 pt-3 px-6 border-b border-muted-dark order-1 flex justify-between">
        <Search search={search} setSearch={setSearch} />
      </div>

      <div className="text-muted-dark text-[20px] px-6 order-3">
        Select Width
      </div>
      <div className="grid grid-cols-5 gap-3 px-6 order-4">
        {filteredWidths.map((width) => (
          <BrickBox
            showTooltip={true}
            onClick={setWidth}
            key={width}
            text={width}
            filterType="byTireSize"
            fieldName="frontTireWidth"
          />
        ))}
      </div>
    </>
  );
};

export default SelectWidth;
