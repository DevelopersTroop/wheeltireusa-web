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
    bodyType,
    subModel,
    clearYear,
    clearMake,
    clearModel,
    clearFrontTireSize,
    clearRearTireSize,
    clearBodyType,
    clearSubModel,
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
      {bodyType && (
        <BrickBox
          checked={true}
          filterType="byVehicle"
          fieldName="bodyType"
          text={bodyType}
          isDismissable={true}
          onClick={clearBodyType}
        />
      )}
      {subModel.SubModel && (
        <BrickBox
          checked={true}
          filterType="byVehicle"
          fieldName="subModel"
          text={subModel.SubModel}
          isDismissable={true}
          onClick={clearSubModel}
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
