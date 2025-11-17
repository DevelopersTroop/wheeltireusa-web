import React from 'react';
import BrickBox from '../../../BrickBox/BrickBox';
import useSelectedItem from './useSelectedItem';

const SelectedItem = () => {
  const {
    width,
    aspectRatio,
    diameter,
    rearWidth,
    rearAspectRatio,
    rearDiameter,
    clearWidth,
    clearAspectRatio,
    clearDiameter,
    clearRearWidth,
    clearRearAspectRatio,
    clearRearDiameter,
    selectedItemRef,
    isRearTireMode,
  } = useSelectedItem();

  const hasRearSelections = rearWidth || rearAspectRatio || rearDiameter;

  return (
    <div
      ref={selectedItemRef}
      className="flex flex-col gap-3 px-6 py-2 order-2"
    >
      {/* Front tire selections */}
      <div className="flex flex-col lg:flex-row gap-2 lg:overflow-x-auto lg:selected-item-scrollbar">
        {width && (
          <BrickBox
            checked={true}
            filterType="byTireSize"
            fieldName="frontTireWidth"
            text={isRearTireMode ? `Front Width: ${width}` : `Width: ${width}`}
            isDismissable={true}
            onClick={clearWidth}
          />
        )}
        {aspectRatio && (
          <BrickBox
            checked={true}
            filterType="byTireSize"
            fieldName="frontTireAspectRatio"
            text={
              isRearTireMode
                ? `Front Ratio: ${aspectRatio}`
                : `Ratio: ${aspectRatio}`
            }
            isDismissable={true}
            onClick={clearAspectRatio}
          />
        )}
        {diameter && (
          <BrickBox
            checked={true}
            filterType="byTireSize"
            fieldName="frontTireDiameter"
            text={
              isRearTireMode
                ? `Front Diameter: ${diameter}`
                : `Diameter: ${diameter}`
            }
            isDismissable={true}
            onClick={clearDiameter}
          />
        )}
      </div>

      {/* Rear tire selections - only show if in rear tire mode and has rear selections */}
      {isRearTireMode && hasRearSelections && (
        <>
          <div className="border-t border-gray-200 my-1"></div>
          <div className="flex flex-col lg:flex-row gap-2 lg:overflow-x-auto lg:selected-item-scrollbar">
            {rearWidth && (
              <BrickBox
                checked={true}
                filterType="byTireSize"
                fieldName="rearTireWidth"
                text={`Rear Width: ${rearWidth}`}
                isDismissable={true}
                onClick={clearRearWidth}
              />
            )}
            {rearAspectRatio && (
              <BrickBox
                checked={true}
                filterType="byTireSize"
                fieldName="rearTireAspectRatio"
                text={`Rear Ratio: ${rearAspectRatio}`}
                isDismissable={true}
                onClick={clearRearAspectRatio}
              />
            )}
            {rearDiameter && (
              <BrickBox
                checked={true}
                filterType="byTireSize"
                fieldName="rearTireDiameter"
                text={`Rear Diameter: ${rearDiameter}`}
                isDismissable={true}
                onClick={clearRearDiameter}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default SelectedItem;