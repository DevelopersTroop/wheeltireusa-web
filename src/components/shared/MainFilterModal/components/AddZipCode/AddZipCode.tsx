import React from 'react';
import useAddZipCode from './useAddZipCode';

const AddZipCode = () => {
  const { onChangeZipCode } = useAddZipCode();
  return (
    <>
      <div className="text-muted-dark text-[20px] px-6 order-2">
        Enter your zip code to get best shipping and installation options:
      </div>

      <div className="grid grid-cols-2 gap-3 px-6 order-4">
        <input
          type="text"
          onChange={(e) => onChangeZipCode(e.target.value)}
          placeholder="Enter your zip code"
        />
      </div>
    </>
  );
};

export default AddZipCode;
