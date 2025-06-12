import BrickBox from '../../../BrickBox/BrickBox';
import ListSkeleton from '../../../ListSkeleton/ListSkeleton';
import useSelectSize from './useSelectSize';

const SelectSize = () => {
  const { setTireSize, tireSizes } = useSelectSize();

  return (
    <>
      <div className="text-muted-dark text-[20px] px-6 order-2">
        Select Size
      </div>
      {tireSizes ? (
        <>
          <div className="grid grid-cols-2 gap-3 px-6 order-4">
            {tireSizes.map((size) => (
              <BrickBox
                showTooltip={true}
                onClick={() => {
                  setTireSize(size.front, size.rear);
                }}
                key={`${size.front}-${size.rear}`}
                text={
                  <>
                    <div className="flex space-x-10">
                      <div className="flex flex-col items-start gap-2">
                        <div className="text-sm">Front Size</div>
                        <div className="text-xl">{size.front}</div>
                      </div>
                      <div className="flex flex-col items-start gap-2">
                        <div className="text-sm">Rear Size</div>
                        <div className="text-xl">{size.rear}</div>
                      </div>
                    </div>
                  </>
                }
                filterType="byVehicle"
                fieldName="tireSize"
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

export default SelectSize;
