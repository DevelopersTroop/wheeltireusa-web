export { default as useMobileDetection } from "./useMobileDetection";
export { default as useScrollVisibility } from "./useScrollVisibility";
export { default as useGarageSync } from "./useGarageSync";
export { default as useTrackedHandlers } from "./useTrackedHandlers";

export type { YmmHandlers, YmmValues, YmmDisabled } from "./useGarageSync";

// Dropdown state type for controlled open/closed state
export interface DropdownState {
  openMake: boolean;
  openModel: boolean;
  openTrim: boolean;
  openDrive: boolean;
}

// Re-export types needed by components
export interface YmmData {
  years: string[];
  makes: string[];
  models: string[];
  trims: string[];
  drives: string[];
}

export interface YmmLoading {
  isYearLoading: boolean;
  isMakeLoading: boolean;
  isModelLoading: boolean;
  isTrimLoading: boolean;
  isDriveLoading: boolean;
}
