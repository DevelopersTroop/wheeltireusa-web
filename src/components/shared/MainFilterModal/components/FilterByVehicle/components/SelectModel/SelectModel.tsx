import BrickBox from '../../../BrickBox/BrickBox';
import Search from '../../../Search/Search';
import useSelectModel from './useSelectModel';

const SelectModel = () => {
  const { search, filteredModels, setSearch, setModel } = useSelectModel();

  return (
    <>
      <div className="pb-5 pt-3 px-6 border-b border-muted-dark order-1">
        <Search search={search} setSearch={setSearch} />
      </div>
      <div className="text-muted-dark text-[20px] px-6 order-2">
        Select Year
      </div>
      <div className="grid grid-cols-4 gap-3 px-6 order-4">
        {filteredModels.map((model) => (
          <BrickBox
            showTooltip={true}
            onClick={setModel}
            key={model}
            text={model}
          />
        ))}
      </div>
    </>
  );
};

export default SelectModel;
