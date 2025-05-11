import React from 'react';
import BrickBox from '../../../BrickBox/BrickBox';
import useSelectedItem from './useSelectedItem';
const SelectedItem = () => {
  const { year, make, model, clearYear, clearMake, clearModel } =
    useSelectedItem();
  return (
    <div className="flex gap-2 px-6 order-2">
      {year && (
        <BrickBox
          checked={true}
          name="year"
          text={year}
          isDismissable={true}
          onClick={clearYear}
        />
      )}
      {make && (
        <BrickBox
          checked={true}
          name="make"
          text={make}
          isDismissable={true}
          onClick={clearMake}
        />
      )}
      {model && (
        <BrickBox
          checked={true}
          name="model"
          text={model}
          isDismissable={true}
          onClick={clearModel}
        />
      )}
    </div>
  );
};

export default SelectedItem;
