import BrickBox from '../../../BrickBox/BrickBox';
import ListSkeleton from '../../../ListSkeleton/ListSkeleton';
import Search from '../../../Search/Search';
import useSelectAspectRatio from './useSelectAspectRatio';

interface SelectAspectRatioProps {
  isRearMode?: boolean;
}

const SelectAspectRatio = ({ isRearMode = false }: SelectAspectRatioProps) => {
  const { search, filteredAspectRatios, setSearch, setAspectRatio } =
    useSelectAspectRatio({ isRearMode });

  const fieldName = isRearMode ? 'rearTireAspectRatio' : 'frontTireAspectRatio';
  const title = isRearMode ? 'Select Rear Aspect Ratio' : 'Select Aspect Ratio';

  return (
    <>
      <div className="pb-5 pt-3 px-6 border-b border-muted-dark order-1">
        <Search search={search} setSearch={setSearch} />
      </div>
      <div className="text-muted-dark text-[20px] px-6 order-3">{title}</div>
      {filteredAspectRatios ? (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 px-6 order-5">
            {filteredAspectRatios?.map((aspectRatio) => (
              <BrickBox
                showTooltip={true}
                onClick={setAspectRatio}
                key={aspectRatio}
                text={aspectRatio}
                filterType="byTireSize"
                fieldName={fieldName}
              />
            ))}
          </div>
        </>
      ) : (
        <>
          <ListSkeleton onlyItem={true} mobile={2} desktop={5} />
        </>
      )}
    </>
  );
};

export default SelectAspectRatio;
