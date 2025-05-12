import BrickBox from '../../../BrickBox/BrickBox';
import useSelectedItem from './useSelectedItem';

const SelectedItem = () => {
  const {
    frontTireDiameter,
    frontTireWidth,
    frontTireAspectRatio,
    clearFrontTireDiameter,
    clearFrontTireWidth,
    clearFrontTireAspectRatio,
  } = useSelectedItem();
  return (
    <>
      {(frontTireDiameter || frontTireWidth || frontTireAspectRatio) && (
        <div className="flex gap-2 px-6 order-2">
          {frontTireWidth && (
            <BrickBox
              checked={true}
              filterType="byTireSize"
              fieldName="frontTireWidth"
              text={frontTireWidth}
              isDismissable={true}
              onClick={clearFrontTireWidth}
            />
          )}
          {frontTireAspectRatio && (
            <BrickBox
              checked={true}
              filterType="byTireSize"
              fieldName="frontTireAspectRatio"
              text={frontTireAspectRatio}
              isDismissable={true}
              onClick={clearFrontTireAspectRatio}
            />
          )}
          {frontTireDiameter && (
            <BrickBox
              checked={true}
              filterType="byTireSize"
              fieldName="frontTireDiameter"
              text={frontTireDiameter}
              isDismissable={true}
              onClick={clearFrontTireDiameter}
            />
          )}
        </div>
      )}
    </>
  );
};

export default SelectedItem;
