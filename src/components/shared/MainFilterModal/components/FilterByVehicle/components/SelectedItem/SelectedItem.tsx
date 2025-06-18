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
    clearFrontTireSize,
    clearRearTireSize,
    selectedItemRef,
  } = useSelectedItem();
  return (
    <div
      ref={selectedItemRef}
      className="flex flex-col lg:flex-row gap-2 px-6 py-2 order-2 lg:overflow-x-auto lg:selected-item-scrollbar"
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
          onClick={clearFrontTireSize}
        />
      )}
      {rearTireSize && (
        <BrickBox
          checked={true}
          filterType="byVehicle"
          fieldName="rearTireSize"
          text={rearTireSize}
          isDismissable={true}
          onClick={clearRearTireSize}
        />
      )}
    </div>
  );
};

export default SelectedItem;
