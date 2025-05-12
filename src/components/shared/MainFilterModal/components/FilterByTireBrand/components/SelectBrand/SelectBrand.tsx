import BrickBox from '../../../BrickBox/BrickBox';
import Search from '../../../Search/Search';
import useSelectBrand from './useSelectBrand';
const SelectBrand = () => {
  const {
    search,
    filteredBrands,
    setSearch,
    setBrand,
    alphabets,
    setAlphabets,
  } = useSelectBrand();

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
        {filteredBrands.map((brand) => (
          <BrickBox
            showTooltip={true}
            onClick={setBrand}
            key={brand}
            text={brand}
            filterType="byTireBrand"
            fieldName="brand"
          />
        ))}
      </div>
    </>
  );
};

export default SelectBrand;
