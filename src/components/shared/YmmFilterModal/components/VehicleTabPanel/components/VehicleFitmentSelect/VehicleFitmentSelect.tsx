"use client";

import YmmCustomSelect from "../../../../../YmmCustomSelect/YmmCustomSelect";

type VehicleFitmentSelectProps = {
  value?: string;
  placeholder?: string;
  options: string[];
  disabled?: boolean;
  loading?: boolean;
  onChange: (value: string) => void;
  className?: string;
  label?: string;
  required?: boolean;
  dropdownMaxHeight?: string | number;
  useDynamicHeight?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export default function VehicleFitmentSelect(props: VehicleFitmentSelectProps) {
  return <YmmCustomSelect {...props} />;
}
