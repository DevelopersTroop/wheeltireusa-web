import BrickBox from '../../../BrickBox/BrickBox';
import ListSkeleton from '../../../ListSkeleton/ListSkeleton';
import Search from '../../../Search/Search';
import useSelectBodyTypeWithSubmodel from './useSelectBodyTypeWithSubmodel';

const SelectBodyTypeWithSubmodel = () => {
  const {
    search,
    filteredBodyTypesWithSubmodels,
    setSearch,
    setSubmodelWithBodyType,
  } = useSelectBodyTypeWithSubmodel();

  return (
    <>
      <div className="pb-5 pt-3 px-6 border-b border-muted-dark order-1">
        <Search search={search} setSearch={setSearch} />
      </div>
      <div className="text-muted-dark text-[20px] px-6 order-2">
        Select Submodel with Body Type
      </div>
      {filteredBodyTypesWithSubmodels ? (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 px-6 order-4">
            {filteredBodyTypesWithSubmodels.map((submodelWithBodyType) =>
              submodelWithBodyType.SubModel.map((submodel) => (
                <BrickBox
                  showTooltip={true}
                  onClick={setSubmodelWithBodyType}
                  key={submodel.subModelWithBodyType ?? ''}
                  text={submodel.subModelWithBodyType}
                  filterType="byVehicle"
                  fieldName="bodyTypeWithSubmodel"
                />
              ))
            )}
          </div>
        </>
      ) : (
        <>
          <ListSkeleton onlyItem={true} desktop={3} />
        </>
      )}
    </>
  );
};

export default SelectBodyTypeWithSubmodel;
