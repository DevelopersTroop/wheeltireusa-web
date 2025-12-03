import React from 'react';
import SelectBox from '../../../SelectBox/SelectBox';
import useSelectedItem from './useSelectedItem';
import useSelectWidth from '../SelectWidth/useSelectWidth';
import useSelectAspectRatio from '../SelectAspectRatio/useSelectAspectRatio';
import useSelectDiameter from '../SelectDiameter/useSelectDiameter';

type Props = { onFrontUpdate?: () => void };

const SelectedItem = ({ onFrontUpdate }: Props) => {
  const {
    width,
    aspectRatio,
    diameter,
    rearWidth,
    rearAspectRatio,
    rearDiameter,
    updateFrontWidth,
    updateFrontAspectRatio,
    updateFrontDiameter,
    updateRearWidth,
    updateRearAspectRatio,
    updateRearDiameter,
    clearFrontWidth,
    clearFrontAspectRatio,
    clearFrontDiameter,
    clearRearWidth,
    clearRearAspectRatio,
    clearRearDiameter,
    selectedItemRef,
    isRearTireMode,
  } = useSelectedItem();

  const { filteredWidths: frontFilteredWidths } = useSelectWidth({ isRearMode: false });
  const { filteredAspectRatios: frontFilteredAspectRatios } = useSelectAspectRatio({ isRearMode: false });
  const { filteredDiameters: frontFilteredDiameters } = useSelectDiameter({ isRearMode: false });

  const { filteredWidths: rearFilteredWidths } = useSelectWidth({ isRearMode: true });
  const { filteredAspectRatios: rearFilteredAspectRatios } = useSelectAspectRatio({ isRearMode: true });
  const { filteredDiameters: rearFilteredDiameters } = useSelectDiameter({ isRearMode: true });

  const hasRearSelections = rearWidth || rearAspectRatio || rearDiameter;

  return (
    <div
      ref={selectedItemRef}
      className="flex flex-col gap-3 px-6 py-2 order-2"
    >
      {/* Front tire selections */}
      <div className="flex flex-col lg:flex-row gap-2 lg:overflow-x-auto lg:selected-item-scrollbar">
        {width && (
          <SelectBox
            label={isRearTireMode ? 'Front Width' : 'Width'}
            value={width}
            options={frontFilteredWidths ?? []}
            onChange={(v) => {
              updateFrontWidth(v);
              onFrontUpdate?.();
            }}
            onClear={() => {
              clearFrontWidth();
              onFrontUpdate?.();
            }}
          />
        )}
        {aspectRatio && (
          <SelectBox
            label={isRearTireMode ? 'Front Ratio' : 'Ratio'}
            value={aspectRatio}
            options={frontFilteredAspectRatios ?? []}
            onChange={(v) => {
              updateFrontAspectRatio(v);
              onFrontUpdate?.();
            }}
            onClear={() => {
              clearFrontAspectRatio();
              onFrontUpdate?.();
            }}
          />
        )}
        {diameter && (
          <SelectBox
            label={isRearTireMode ? 'Front Diameter' : 'Diameter'}
            value={diameter}
            options={frontFilteredDiameters ?? []}
            onChange={(v) => {
              updateFrontDiameter(v);
              onFrontUpdate?.();
            }}
            onClear={() => {
              clearFrontDiameter();
              onFrontUpdate?.();
            }}
          />
        )}
      </div>

      {/* Rear tire selections - only show if in rear tire mode and has rear selections */}
      {isRearTireMode && hasRearSelections && (
        <>
          <div className="border-t border-gray-200 my-1"></div>
          <div className="flex flex-col lg:flex-row gap-2 lg:overflow-x-auto lg:selected-item-scrollbar">
            {rearWidth && (
              <SelectBox
                label={'Rear Width'}
                value={rearWidth}
                options={rearFilteredWidths ?? []}
                onChange={updateRearWidth}
                onClear={clearRearWidth}
              />
            )}
            {rearAspectRatio && (
              <SelectBox
                label={'Rear Ratio'}
                value={rearAspectRatio}
                options={rearFilteredAspectRatios ?? []}
                onChange={updateRearAspectRatio}
                onClear={clearRearAspectRatio}
              />
            )}
            {rearDiameter && (
              <SelectBox
                label={'Rear Diameter'}
                value={rearDiameter}
                options={rearFilteredDiameters ?? []}
                onChange={updateRearDiameter}
                onClear={clearRearDiameter}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default SelectedItem;
