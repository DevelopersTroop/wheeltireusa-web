import BrickBox from '../../../BrickBox/BrickBox';
import ListSkeleton from '../../../ListSkeleton/ListSkeleton';
import Search from '../../../Search/Search';
import useSelectWidth from './useSelectWidth';

interface SelectWidthProps {
  isRearMode?: boolean;
}

const SelectWidth = ({ isRearMode = false }: SelectWidthProps) => {
  const { search, filteredWidths, setSearch, setWidth, popularWidths } =
    useSelectWidth({ isRearMode });

  const fieldName = isRearMode ? 'rearTireWidth' : 'frontTireWidth';
  const title = isRearMode ? 'Select Rear Width' : 'Select Width';

  return (
    <>
      <div className="pb-5 pt-3 px-6 border-b border-muted-dark order-1">
        <Search search={search} setSearch={setSearch} />
      </div>
      <div className="text-muted-dark text-[20px] px-6 order-3">{title}</div>

      {/* Popular Widths Section */}
      <div className="px-6 order-4">
        <div className="text-muted-dark text-[16px] mb-3 font-medium">
          Popular Widths
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
          {popularWidths.map((width) => (
            <BrickBox
              showTooltip={true}
              onClick={setWidth}
              key={`popular-${width}`}
              text={width}
              filterType="byTireSize"
              fieldName={fieldName}
            />
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-muted-dark mb-4"></div>

        <div className="text-muted-dark text-[16px] mb-3 font-medium">
          All Widths
        </div>
      </div>

      {filteredWidths ? (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 px-6 order-5">
            {filteredWidths?.map((width) => (
              <BrickBox
                showTooltip={true}
                onClick={setWidth}
                key={width}
                text={width}
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

export default SelectWidth;
