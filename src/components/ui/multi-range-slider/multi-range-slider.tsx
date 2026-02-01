"use client";

import { Slider } from "@/components/ui/slider";
import { useEffect, useState } from "react";

const MultiRangeSlider = ({ min, max, currentLow, currentHigh, onChange } : { min: number, max: number, currentLow: number, currentHigh: number, onChange: (values: { min: number, max: number, currentLow: number, currentHigh: number }) => void }) => {
  const [values, setValues] = useState([currentLow, currentHigh]);

  useEffect(() => {
    onChange({ min, max, currentLow: values[0], currentHigh: values[1] });
  }, [values, min, max, onChange]);

  return (
    <div className="flex w-full flex-col items-center">
      <Slider
        value={values}
        onValueChange={(newValues) => {
          if (newValues[0] < newValues[1]) {
            setValues(newValues);
          }
        }}
        min={min * 4}
        max={max * 4}
        step={1}
        className="w-full max-w-md cursor-pointer bg-gray-700"
      />
      <div className="mt-3 text-sm font-medium text-gray-700">
        Price: ${values[0]} - ${values[1]}
      </div>
    </div>
  );
};

export default MultiRangeSlider;
