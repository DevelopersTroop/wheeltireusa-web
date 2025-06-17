import BrickBox from '../../../BrickBox/BrickBox';
import ListSkeleton from '../../../ListSkeleton/ListSkeleton';
import useSelectTireSize from './useSelectTireSize';

const SelectTireSize = ({ direction }: { direction: 'front' | 'rear' }) => {
  const { setTireSize, tireSizes } = useSelectTireSize({ direction });
  return (
    <>
      <div className="text-muted-dark text-[20px] px-6 order-2">
        Select {direction.charAt(0).toUpperCase() + direction.slice(1)} Tire
        Size
      </div>
      {tireSizes && tireSizes.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 px-6 order-4">
            {tireSizes.map((size) => (
              <BrickBox
                showTooltip={true}
                onClick={() => {
                  setTireSize(size);
                }}
                key={size}
                text={size}
                filterType="byVehicle"
                fieldName={`${direction}TireSize`}
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

export default SelectTireSize;
