import BrickBox from '../../../BrickBox/BrickBox';
import ListSkeleton from '../../../ListSkeleton/ListSkeleton';
import Search from '../../../Search/Search';
import useSelectBodytype from './useSelectBodytype';

const SelectBodytype = () => {
  const { search, filteredBodytypes, setSearch, setBodytype } =
    useSelectBodytype();

  return (
    <>
      <div className="pb-5 pt-3 px-6 border-b border-muted-dark order-1">
        <Search search={search} setSearch={setSearch} />
      </div>
      <div className="text-muted-dark text-[20px] px-6 order-2">
        Select Bodytype
      </div>
      {filteredBodytypes ? (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 px-6 order-4">
            {filteredBodytypes.map((bodytype) => (
              <BrickBox
                showTooltip={true}
                onClick={setBodytype}
                key={bodytype}
                text={bodytype}
                filterType="byVehicle"
                fieldName="bodyType"
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

export default SelectBodytype;
