import BrickBox from '../../../BrickBox/BrickBox';
import Search from '../../../Search/Search';
import useSelectAspectRatio from './useSelectAspectRatio';
const SelectAspectRatio = () => {
  const { search, filteredAspectRatios, setSearch, setAspectRatio } =
    useSelectAspectRatio();

  return (
    <>
      <div className="pb-5 pt-3 px-6 border-b border-muted-dark order-1 flex justify-between">
        <Search search={search} setSearch={setSearch} />
      </div>

      <div className="text-muted-dark text-[20px] px-6 order-3">
        Select Aspect Ratio
      </div>
      <div className="grid grid-cols-5 gap-3 px-6 order-4">
        {filteredAspectRatios.map((aspectRatio) => (
          <BrickBox
            showTooltip={true}
            onClick={setAspectRatio}
            key={aspectRatio}
            text={aspectRatio}
            filterType="byTireSize"
            fieldName="frontTireAspectRatio"
          />
        ))}
      </div>
    </>
  );
};

export default SelectAspectRatio;
