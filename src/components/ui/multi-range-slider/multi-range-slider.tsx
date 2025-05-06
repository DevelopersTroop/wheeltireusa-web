'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import './multi-range-slider.css';

const MultiRangeSlider = ({
  min,
  max,
  currentLow,
  currentHigh,
  onChange,
}: {
  min: number;
  max: number;
  currentLow: number;
  currentHigh: number;
  onChange: ({
    min,
    max,
    currentLow,
    currentHigh,
  }: {
    min: number;
    max: number;
    currentLow: number;
    currentHigh: number;
  }) => void;
}) => {
  const [minVal, setMinVal] = useState(currentLow);
  const [maxVal, setMaxVal] = useState(currentHigh);
  const minValRef = useRef(currentLow);
  const maxValRef = useRef(currentHigh);
  const range = useRef<HTMLDivElement>(null);

  // Convert to percentage
  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);

  // Get min and max values when their state changes
  useEffect(() => {
    onChange({ min, max, currentLow: minVal, currentHigh: maxVal });
  }, [minVal, maxVal, min, max, onChange]);

  return (
    <>
      <div className={'thumb-container'}>
        <input
          type="range"
          min={min}
          max={max}
          value={minVal}
          onChange={(event) => {
            const value = Math.min(Number(event.target.value), maxVal - 1);
            setMinVal(value);
            minValRef.current = value;
          }}
          className="thumb thumb--left"
          style={{ zIndex: minVal > max - 100 ? '5' : '0' }}
        />

        <input
          type="range"
          min={min}
          max={max}
          value={maxVal}
          onChange={(event) => {
            const value = Math.max(Number(event.target.value), minVal + 1);
            setMaxVal(value);
            maxValRef.current = value;
          }}
          className="thumb thumb--right"
        />

        <div className="slider">
          <div className="slider__track" />
          <div ref={range} className="slider__range" />
        </div>
      </div>
      <div className={'inline-block w-full mt-5 font-medium'}>
        {/* Price: ${minVal} - ${maxVal} */}
        <div className="w-full flex flex-row justify-between">
          <div className="flex flex-col gap-1 items-start">
            <div className="rounded-md border border-[#d9d9d9] px-4 py-3 flex items-center w-24 bg-white">
              <span className={'text-base leading-[19px] text-[#210203]'}>
                ${minVal}
              </span>
            </div>
            <p className="text-[#504949] text-xs font-normal">min</p>
          </div>

          <div className="flex flex-col gap-1 items-end">
            <div className="rounded-md border border-[#d9d9d9] px-4 py-3 flex items-center w-24 bg-white">
              <span className={'text-base leading-[19px] text-[#210203]'}>
                ${maxVal}
              </span>
            </div>
            <p className="text-[#504949] text-xs font-normal text-end">max</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MultiRangeSlider;
