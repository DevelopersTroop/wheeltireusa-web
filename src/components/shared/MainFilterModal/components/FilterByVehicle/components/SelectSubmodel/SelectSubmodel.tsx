import BrickBox from '../../../BrickBox/BrickBox';
import ListSkeleton from '../../../ListSkeleton/ListSkeleton';
import Search from '../../../Search/Search';
import useSelectSubmodel from './useSelectSubmodel';

const SelectSubmodel = () => {
  const { search, filteredSubmodels, setSearch, setSubmodel } =
    useSelectSubmodel();

  return (
    <>
      <div className="pb-5 pt-3 px-6 border-b border-muted-dark order-1">
        <Search search={search} setSearch={setSearch} />
      </div>
      <div className="text-muted-dark text-[20px] px-6 order-2">
        Select Submodel
      </div>
      {filteredSubmodels ? (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 px-6 order-4">
            {filteredSubmodels.map((submodel) => (
              <BrickBox
                showTooltip={true}
                onClick={setSubmodel}
                key={submodel.SubModel ?? ''}
                text={submodel.SubModel}
                filterType="byVehicle"
                fieldName="subModel"
              />
            ))}
          </div>
        </>
      ) : (
        <>
          <ListSkeleton onlyItem={true} />
        </>
      )}
    </>
  );
};

export default SelectSubmodel;
