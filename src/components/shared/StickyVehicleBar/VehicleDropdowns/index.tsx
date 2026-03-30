import YmmCustomSelect from "../../YmmCustomSelect/YmmCustomSelect";
import type { DropdownState, YmmData, YmmLoading, YmmValues, YmmHandlers } from "../hooks";

export interface YmmDisabled {
  isYearDisabled: boolean;
  isMakeDisabled: boolean;
  isModelDisabled: boolean;
  isTrimDisabled: boolean;
  isDriveDisabled: boolean;
}

export interface VehicleDropdownsProps {
  values: YmmValues;
  data: YmmData;
  loading: YmmLoading;
  disabled: YmmDisabled;
  handlers: YmmHandlers;
  dropdownState: DropdownState;
  onOpenChange: {
    make: (open: boolean) => void;
    model: (open: boolean) => void;
    trim: (open: boolean) => void;
    drive: (open: boolean) => void;
  };
  compact?: boolean;
}

export default function VehicleDropdowns({
  values,
  data,
  loading,
  disabled,
  handlers,
  dropdownState,
  onOpenChange,
  compact = false,
}: VehicleDropdownsProps) {
  const labelSize = compact ? "text-[9px]" : undefined;
  const wrapperClass = compact ? "[&_button]:!h-9" : "";

  const showTrim = data.trims.length > 0;
  const showDrive = data.drives.length > 0;

  const dropdowns = [
    {
      label: "YEAR",
      value: values.year,
      options: data.years,
      onChange: handlers.onYearChange,
      disabled: disabled.isYearDisabled,
      loading: loading.isYearLoading,
      placeholder: "YEAR",
    },
    {
      label: "MAKE",
      value: values.make === "__DEFAULT_MAKE__" ? undefined : values.make,
      options: data.makes.filter((m) => m !== "__DEFAULT_MAKE__"),
      onChange: handlers.onMakeChange,
      disabled: disabled.isMakeDisabled,
      loading: loading.isMakeLoading,
      placeholder: "MAKE",
      open: dropdownState.openMake,
      onOpenChange: onOpenChange.make,
    },
    {
      label: "MODEL",
      value: values.model === "__DEFAULT_MODEL__" ? undefined : values.model,
      options: data.models,
      onChange: handlers.onModelChange,
      disabled: disabled.isModelDisabled,
      loading: loading.isModelLoading,
      placeholder: "MODEL",
      open: dropdownState.openModel,
      onOpenChange: onOpenChange.model,
    },
    ...(showTrim
      ? [
          {
            label: "TRIM" as const,
            value: values.trim === "__DEFAULT_TRIM__" ? undefined : values.trim,
            options: data.trims,
            onChange: handlers.onTrimChange,
            disabled: disabled.isTrimDisabled,
            loading: loading.isTrimLoading,
            placeholder: "TRIM" as const,
            open: dropdownState.openTrim,
            onOpenChange: onOpenChange.trim,
          },
        ]
      : []),
    ...(showDrive
      ? [
          {
            label: "DRIVE" as const,
            value: values.drive === "__DEFAULT_DRIVE__" ? undefined : values.drive,
            options: data.drives,
            onChange: handlers.onDriveChange,
            disabled: disabled.isDriveDisabled,
            loading: loading.isDriveLoading,
            placeholder: "DRIVE" as const,
            open: dropdownState.openDrive,
            onOpenChange: onOpenChange.drive,
          },
        ]
      : []),
  ];

  return (
    <>
      {dropdowns.map((dropdown) => (
        <div key={dropdown.label} className="flex-1">
          <div className={wrapperClass}>
            <YmmCustomSelect
              label={dropdown.label}
              labelSize={labelSize}
              value={dropdown.value}
              options={dropdown.options}
              onChange={dropdown.onChange}
              placeholder={dropdown.placeholder}
              disabled={dropdown.disabled}
              loading={dropdown.loading}
              open={dropdown.open}
              onOpenChange={dropdown.onOpenChange}
            />
          </div>
        </div>
      ))}
    </>
  );
}
