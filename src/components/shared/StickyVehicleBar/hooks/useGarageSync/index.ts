import { useEffect } from "react";
import { TYmmGarageItem } from "@/types/ymm";

export interface YmmHandlers {
  onYearChange: (value: string) => void;
  onMakeChange: (value: string) => void;
  onModelChange: (value: string) => void;
  onTrimChange: (value: string) => void;
  onDriveChange: (value: string) => void;
}

export interface YmmValues {
  year?: string;
  make?: string;
  model?: string;
  trim?: string;
  drive?: string;
}

export interface YmmDisabled {
  isYearDisabled: boolean;
  isMakeDisabled: boolean;
  isModelDisabled: boolean;
  isTrimDisabled: boolean;
  isDriveDisabled: boolean;
}

export default function useGarageSync(
  activeGarageItem: TYmmGarageItem | undefined,
  currentValues: YmmValues,
  handlers: YmmHandlers
) {
  useEffect(() => {
    if (!activeGarageItem) return;
    if (currentValues.year || currentValues.make || currentValues.model) return;

    handlers.onYearChange(activeGarageItem.year);
    handlers.onMakeChange(activeGarageItem.make);
    handlers.onModelChange(activeGarageItem.model || "");
    if (activeGarageItem.trim) {
      handlers.onTrimChange(activeGarageItem.trim || "");
    }
    if (activeGarageItem.drive) {
      handlers.onDriveChange(activeGarageItem.drive || "");
    }
  }, [activeGarageItem]);
}
