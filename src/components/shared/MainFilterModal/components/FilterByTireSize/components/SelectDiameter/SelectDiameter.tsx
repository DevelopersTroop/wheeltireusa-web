import { removeDuplicateDataWithRemovingFloatingPoint } from '@/lib/utils';
import BrickBox from '../../../BrickBox/BrickBox';
import ListSkeleton from '../../../ListSkeleton/ListSkeleton';
import Search from '../../../Search/Search';
import useSelectDiameter from './useSelectDiameter';

interface SelectDiameterProps {
  isRearMode?: boolean;
}

const SelectDiameter = ({ isRearMode = false }: SelectDiameterProps) => {
  const { search, filteredDiameters, setSearch, setDiameter } =
    useSelectDiameter({ isRearMode });

  const fieldName = isRearMode ? 'rearTireDiameter' : 'frontTireDiameter';
  const title = isRearMode ? 'Select Rear Diameter' : 'Select Diameter';

  return (
    <>
      <div className="pb-5 pt-3 px-6 border-b border-muted-dark order-1">
        <Search search={search} setSearch={setSearch} />
      </div>
      <div className="text-muted-dark text-[20px] px-6 order-3">{title}</div>
      {filteredDiameters ? (
        (() => {
          const uniqueDiameters = removeDuplicateDataWithRemovingFloatingPoint(filteredDiameters);
          return <>
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 px-6 order-5">
              {uniqueDiameters?.map((diameter) => (
                <BrickBox
                  showTooltip={true}
                  onClick={setDiameter}
                  key={diameter}
                  text={diameter}
                  filterType="byTireSize"
                  fieldName={fieldName}
                />
              ))}
            </div>
          </>
        })()
      ) : (
        <>
          <ListSkeleton onlyItem={true} mobile={2} desktop={5} />
        </>
      )}
    </>
  );
};

export default SelectDiameter;