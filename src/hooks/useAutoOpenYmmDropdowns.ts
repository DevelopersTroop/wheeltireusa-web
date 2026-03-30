import { useCallback, useEffect, useState } from "react";

/**
 * Shared hook for auto-open YMM dropdown behavior.
 * Used by: StickyVehicleBar, VehicleTab (Hero)
 * VehicleTabPanel (Modal)
 */

export interface AutoOpenDropdownState {
  openMake: boolean;
  openModel: boolean;
  openTrim: boolean;
  openDrive: boolean;
}

interface UseAutoOpenYmmDropdownsParams {
  /** Available data arrays */
  makes: string[];
  models: string[];
  trims: string[];
  drives: string[];
  /** Loading states */
  isMakeLoading: boolean;
  isModelLoading: boolean;
  isTrimLoading: boolean;
  isDriveLoading: boolean;
  /** Current selected values */
  year?: string;
  make?: string;
  model?: string;
  trim?: string;
  drive?: string;
  /** Original change handlers */
  onYearChange: (value: string) => void;
  onMakeChange: (value: string) => void;
  onModelChange: (value: string) => void;
  onTrimChange: (value: string) => void;
  onDriveChange: (value: string) => void;
}

interface UseAutoOpenYmmDropdownsReturn {
  dropdownState: AutoOpenDropdownState;
  setOpenMake: (open: boolean) => void;
  setOpenModel: (open: boolean) => void;
  setOpenTrim: (open: boolean) => void;
  setOpenDrive: (open: boolean) => void;
  /** Tracked handlers that mark manual user changes before calling original handlers */
  trackedHandlers: {
    onYearChange: (value: string) => void;
    onMakeChange: (value: string) => void;
    onModelChange: (value: string) => void;
    onTrimChange: (value: string) => void;
    onDriveChange: (value: string) => void;
  };
  /** Call this to mark that a manual change occurred */
  markManualChange: () => void;
  /** Whether user has made a manual change */
  hasUserManuallyChanged: boolean;
}

export default function useAutoOpenYmmDropdowns({
  makes,
  models,
  trims,
  drives,
  isMakeLoading,
  isModelLoading,
  isTrimLoading,
  isDriveLoading,
  year,
  make,
  model,
  trim,
  drive,
  onYearChange,
  onMakeChange,
  onModelChange,
  onTrimChange,
  onDriveChange,
}: UseAutoOpenYmmDropdownsParams): UseAutoOpenYmmDropdownsReturn {
  const [dropdownState, setDropdownState] = useState<AutoOpenDropdownState>({
    openMake: false,
    openModel: false,
    openTrim: false,
    openDrive: false,
  });

  const [hasUserManuallyChanged, setHasUserManuallyChanged] = useState(false);

  // Mark that user has made a manual change
  const markManualChange = useCallback(() => {
    setHasUserManuallyChanged(true);
  }, []);

  // Create tracked handlers that mark manual changes before calling original handlers
  const trackedHandlers = useCallback(
    () => ({
      onYearChange: (value: string) => {
        markManualChange();
        onYearChange(value);
      },
      onMakeChange: (value: string) => {
        markManualChange();
        onMakeChange(value);
      },
      onModelChange: (value: string) => {
        markManualChange();
        onModelChange(value);
      },
      onTrimChange: (value: string) => {
        markManualChange();
        onTrimChange(value);
      },
      onDriveChange: (value: string) => {
        markManualChange();
        onDriveChange(value);
      },
    }),
    [onYearChange, onMakeChange, onModelChange, onTrimChange, onDriveChange, markManualChange]
  )();

  // Auto-open Make when makes are loaded after manual Year selection
  useEffect(() => {
    if (!hasUserManuallyChanged) return;
    const shouldOpen = Boolean(!isMakeLoading && makes.length > 0 && year);
    setDropdownState((prev) => ({
      ...prev,
      openMake: shouldOpen,
      openModel: false,
      openTrim: false,
      openDrive: false,
    }));
  }, [isMakeLoading, makes.length, year, hasUserManuallyChanged]);

  // Auto-open Model when models are loaded after manual Make selection
  useEffect(() => {
    if (!hasUserManuallyChanged) return;
    const shouldOpen = Boolean(!isModelLoading && models.length > 0 && make && make !== "__DEFAULT_MAKE__");
    setDropdownState((prev) => ({
      ...prev,
      openMake: false,
      openModel: shouldOpen,
      openTrim: false,
      openDrive: false,
    }));
  }, [isModelLoading, models.length, make, hasUserManuallyChanged]);

  // Auto-open Trim when trims are loaded after manual Model selection
  useEffect(() => {
    if (!hasUserManuallyChanged) return;
    const shouldOpen = Boolean(!isTrimLoading && trims.length > 0 && model && model !== "__DEFAULT_MODEL__");
    setDropdownState((prev) => ({
      ...prev,
      openMake: false,
      openModel: false,
      openTrim: shouldOpen,
      openDrive: false,
    }));
  }, [isTrimLoading, trims.length, model, hasUserManuallyChanged]);

  // Auto-open Drive when drives are loaded after manual Trim selection
  useEffect(() => {
    if (!hasUserManuallyChanged) return;
    const shouldOpen = Boolean(!isDriveLoading && drives.length > 0 && trim && trim !== "__DEFAULT_TRIM__");
    setDropdownState((prev) => ({
      ...prev,
      openMake: false,
      openModel: false,
      openTrim: false,
      openDrive: shouldOpen,
    }));
  }, [isDriveLoading, drives.length, trim, hasUserManuallyChanged]);

  // Individual setters for manual control
  const setOpenMake = useCallback((open: boolean) => {
    setDropdownState((prev) => ({ ...prev, openMake: open }));
  }, []);

  const setOpenModel = useCallback((open: boolean) => {
    setDropdownState((prev) => ({ ...prev, openModel: open }));
  }, []);

  const setOpenTrim = useCallback((open: boolean) => {
    setDropdownState((prev) => ({ ...prev, openTrim: open }));
  }, []);

  const setOpenDrive = useCallback((open: boolean) => {
    setDropdownState((prev) => ({ ...prev, openDrive: open }));
  }, []);

  return {
    dropdownState,
    setOpenMake,
    setOpenModel,
    setOpenTrim,
    setOpenDrive,
    trackedHandlers,
    markManualChange,
    hasUserManuallyChanged,
  };
}
