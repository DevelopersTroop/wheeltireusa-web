import { useCallback, useEffect, useRef, useState } from "react";

export interface DropdownState {
  openMake: boolean;
  openModel: boolean;
  openTrim: boolean;
  openDrive: boolean;
}

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

export interface YmmValues {
  year?: string;
  make?: string;
  model?: string;
  trim?: string;
  drive?: string;
}

export default function useAutoOpenDropdowns(loading: YmmLoading, data: YmmData, values: YmmValues) {
  const [dropdownState, setDropdownState] = useState<DropdownState>({
    openMake: false,
    openModel: false,
    openTrim: false,
    openDrive: false,
  });

  const hasUserManuallyChangedRef = useRef(false);

  const markManualChange = useCallback(() => {
    hasUserManuallyChangedRef.current = true;
  }, []);

  useEffect(() => {
    if (!hasUserManuallyChangedRef.current) return;
    const shouldOpen = Boolean(!loading.isMakeLoading && data.makes.length > 0 && values.year);
    setDropdownState((prev) => ({ ...prev, openMake: shouldOpen }));
  }, [loading.isMakeLoading, data.makes.length, values.year]);

  useEffect(() => {
    if (!hasUserManuallyChangedRef.current) return;
    const shouldOpen = Boolean(
      !loading.isModelLoading && data.models.length > 0 && values.make && values.make !== "__DEFAULT_MAKE__"
    );
    setDropdownState((prev) => ({ ...prev, openModel: shouldOpen }));
  }, [loading.isModelLoading, data.models.length, values.make]);

  useEffect(() => {
    if (!hasUserManuallyChangedRef.current) return;
    const shouldOpen = Boolean(
      !loading.isTrimLoading && data.trims.length > 0 && values.model && values.model !== "__DEFAULT_MODEL__"
    );
    setDropdownState((prev) => ({ ...prev, openTrim: shouldOpen }));
  }, [loading.isTrimLoading, data.trims.length, values.model]);

  useEffect(() => {
    if (!hasUserManuallyChangedRef.current) return;
    const shouldOpen = Boolean(
      !loading.isDriveLoading && data.drives.length > 0 && values.trim && values.trim !== "__DEFAULT_TRIM__"
    );
    setDropdownState((prev) => ({ ...prev, openDrive: shouldOpen }));
  }, [loading.isDriveLoading, data.drives.length, values.trim]);

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
    markManualChange,
  };
}
