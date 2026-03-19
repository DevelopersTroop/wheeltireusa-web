"use client";

import { ReactNode, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import useYmm from "@/hooks/useYmm";
import { TSingleFilter } from "@/types/filter";
import { useGetFilterListQuery } from "@/redux/apis/product";
import { setIsModalOpen } from "@/redux/features/ymmFilterSlice";
import { useTypedSelector } from "@/redux/store";
import {
  TYmmFilterModalContext,
  YmmFilterModalContext,
} from "./YmmFilterModalContext";

type Props = {
  children: ReactNode;
};

export default function YmmFilterModalProvider({ children }: Props) {
  const isModalOpen = useTypedSelector((state) => state.ymmFilter.isModalOpen);
  const dispatch = useDispatch();
  const [activeMainTab, setActiveMainTab] = useState<"vehicle" | "brand">(
    "vehicle"
  );
  const [modalHeight, setModalHeight] = useState<number>(550);
  const [brandCategory, setBrandCategory] = useState<"tire" | "wheels">("tire");

  const {
    list: { years, makes, models, trims, drives },
    onYearChange,
    onMakeChange,
    onModelChange,
    onTrimChange,
    onDriveChange,
    year,
    make,
    model,
    trim,
    drive,
    isYearDisabled,
    isMakeDisabled,
    isModelDisabled,
    isTrimDisabled,
    isDriveDisabled,
    isYearLoading,
    isMakeLoading,
    isModelLoading,
    isTrimLoading,
    isDriveLoading,
  } = useYmm("ymm_filter_modal");

  const [activeStep, setActiveStep] = useState<1 | 2>(1);
  const {
    data: filterData,
    isLoading: isBrandsLoading,
    isFetching: isBrandsFetching,
  } = useGetFilterListQuery(
    { category: brandCategory },
    { skip: !isModalOpen || activeMainTab !== "brand" }
  );

  const brands = useMemo(
    () =>
      ((filterData?.filters?.brand as TSingleFilter[] | undefined) ?? [])
        .map((item) => item.value?.toString().trim())
        .filter(Boolean)
        .sort((a, b) => a.localeCompare(b)),
    [filterData]
  );

  const displayMake = make && make !== "__DEFAULT_MAKE__" ? make : "";
  const displayModel = model && model !== "__DEFAULT_MODEL__" ? model : "";
  const displayTrim = trim && trim !== "__DEFAULT_TRIM__" ? trim : "";
  const displayDrive = drive && drive !== "__DEFAULT_DRIVE__" ? drive : "";

  const yearValue = year || undefined;
  const makeValue = displayMake || undefined;
  const modelValue = displayModel || undefined;
  const trimValue = displayTrim || undefined;
  const driveValue = displayDrive || undefined;

  const isVehicleStepCompleted = Boolean(yearValue && makeValue && modelValue);

  useEffect(() => {
    if (modelValue) setActiveStep(2);
    else setActiveStep(1);
  }, [modelValue]);

  const value = useMemo<TYmmFilterModalContext>(
    () => ({
      isModalOpen,
      closeModal: () => dispatch(setIsModalOpen(false)),
      modalHeight,
      setModalHeight,
      activeMainTab,
      setActiveMainTab,
      headerTitle:
        [year || "", displayMake].filter(Boolean).join(" ") || "Select Vehicle",
      headerSubtitle: [displayModel, displayTrim, displayDrive]
        .filter(Boolean)
        .join(" "),
      activeStep,
      setActiveStep,
      canOpenClassifierStep: Boolean(modelValue),
      isVehicleStepCompleted,
      brandCategory,
      setBrandCategory,
      brands,
      isBrandsLoading: isBrandsLoading || isBrandsFetching,
      yearValue,
      makeValue,
      modelValue,
      trimValue,
      driveValue,
      years: years ?? [],
      makes: (makes ?? []).filter((item) => item !== "__DEFAULT_MAKE__"),
      models: (models ?? []).filter((item) => item !== "__DEFAULT_MODEL__"),
      trims: (trims ?? []).filter((item) => item !== "__DEFAULT_TRIM__"),
      drives: (drives ?? []).filter((item) => item !== "__DEFAULT_DRIVE__"),
      isYearDisabled,
      isMakeDisabled,
      isModelDisabled,
      isTrimDisabled,
      isDriveDisabled,
      isYearLoading,
      isMakeLoading,
      isModelLoading,
      isTrimLoading,
      isDriveLoading,
      onYearChange: (value: string) => onYearChange(value),
      onMakeChange: (value: string) => onMakeChange(value),
      onModelChange: (value: string) => onModelChange(value),
      onTrimChange: (value: string) => onTrimChange(value),
      onDriveChange: (value: string) => onDriveChange(value),
    }),
    [
      isModalOpen,
      dispatch,
      modalHeight,
      activeMainTab,
      year,
      displayMake,
      displayModel,
      displayTrim,
      displayDrive,
      activeStep,
      modelValue,
      isVehicleStepCompleted,
      brandCategory,
      brands,
      isBrandsLoading,
      isBrandsFetching,
      yearValue,
      makeValue,
      trimValue,
      driveValue,
      years,
      makes,
      models,
      trims,
      drives,
      isYearDisabled,
      isMakeDisabled,
      isModelDisabled,
      isTrimDisabled,
      isDriveDisabled,
      isYearLoading,
      isMakeLoading,
      isModelLoading,
      isTrimLoading,
      isDriveLoading,
      onYearChange,
      onMakeChange,
      onModelChange,
      onTrimChange,
      onDriveChange,
    ]
  );

  return (
    <YmmFilterModalContext.Provider value={value}>
      {children}
    </YmmFilterModalContext.Provider>
  );
}
