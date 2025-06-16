import React from 'react';
import BrickBox from '../../../BrickBox/BrickBox';
import useSelectedItem from './useSelectedItem';
const SelectedItem = () => {
  const {
    year,
    make,
    model,
    frontTireSize,
    rearTireSize,
    clearYear,
    clearMake,
    clearModel,
    clearSize,
    selectedItemRef,
  } = useSelectedItem();
  return (
    <div
      ref={selectedItemRef}
      className="flex gap-2 px-6 py-2 order-2 overflow-x-auto selected-item-scrollbar"
    >
      {year && (
        <BrickBox
          checked={true}
          filterType="byVehicle"
          fieldName="year"
          text={year}
          isDismissable={true}
          onClick={clearYear}
        />
      )}
      {make && (
        <BrickBox
          checked={true}
          filterType="byVehicle"
          fieldName="make"
          text={make}
          isDismissable={true}
          onClick={clearMake}
        />
      )}
      {model && (
        <BrickBox
          checked={true}
          filterType="byVehicle"
          fieldName="model"
          text={model}
          isDismissable={true}
          onClick={clearModel}
        />
      )}
      {frontTireSize && (
        <BrickBox
          checked={true}
          filterType="byVehicle"
          fieldName="frontTireSize"
          text={frontTireSize}
          isDismissable={true}
          onClick={clearSize}
        />
      )}
      {rearTireSize && (
        <BrickBox
          checked={true}
          filterType="byVehicle"
          fieldName="rearTireSize"
          text={rearTireSize}
          isDismissable={true}
          onClick={clearSize}
        />
      )}
    </div>
  );
};

export default SelectedItem;
