"use client";

import { ReactNode, useEffect, useMemo, useState, useRef } from "react";
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

import { addToGarage, submitYmm, clearYearMakeModel, setYmm } from "@/redux/features/yearMakeModelSlice";
import { TYmmGarageItem } from "@/types/ymm";
import { useRouter, usePathname } from "next/navigation";

type Props = {
  children: ReactNode;
};

export default function YmmFilterModalProvider({ children }: Props) {
  const isModalOpen = useTypedSelector((state) => state.ymmFilter.isModalOpen);
  const redirectPath = useTypedSelector((state) => state.ymmFilter.redirectPath);
  const initialMainTab = useTypedSelector((state) => state.ymmFilter.initialMainTab);
  const initialBrandCategory = useTypedSelector((state) => state.ymmFilter.initialBrandCategory);
  const initialSizeCategory = useTypedSelector((state) => state.ymmFilter.initialSizeCategory);
  const activeGarageId = useTypedSelector((state) => state.persisted.yearMakeModel.activeGarageId);
  const garage = useTypedSelector((state) => state.persisted.yearMakeModel.garage);
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const [activeMainTab, setActiveMainTab] = useState<"vehicle" | "brand" | "size">(
    initialMainTab || "vehicle"
  );
  const [modalHeight, setModalHeight] = useState<number>(500);
  const [isNeedHelpModalOpen, setIsNeedHelpModalOpen] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<1 | 2>(1);
  const [brandCategory, setBrandCategory] = useState<"tire" | "wheels">(initialBrandCategory || "tire");
  const [sizeCategory, setSizeCategory] = useState<"tire" | "wheels">(initialSizeCategory || "wheels");
  const hasAutoFilled = useRef(false);

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
    isYearFetching,
    isMakeFetching,
    isModelFetching,
    isTrimFetching,
    isDriveFetching,
  } = useYmm("ymm_filter_modal");

  const {
    data: filterData,
    isLoading: isBrandsLoading,
    isFetching: isBrandsFetching,
  } = useGetFilterListQuery(
    { category: brandCategory },
    { skip: !isModalOpen || activeMainTab !== "brand" }
  );

  // Reset YMM local state whenever modal opens so it's fresh
  // If there's an active garage, auto-fill from it
  useEffect(() => {
    if (isModalOpen) {
      setActiveMainTab(initialMainTab || "vehicle");
      setBrandCategory(initialBrandCategory || "tire");
      setSizeCategory(initialSizeCategory || "wheels");
      hasAutoFilled.current = false;

      // Check if there's an active garage and auto-fill
      if (activeGarageId && garage[activeGarageId]) {
        const garageItem = garage[activeGarageId];
        dispatch(setYmm({
          year: garageItem.year,
          make: garageItem.make,
          model: garageItem.model,
          trim: garageItem.trim || '',
          drive: garageItem.drive || '',
          list: {
            years: [],
            makes: [],
            models: [],
            trims: [],
            drives: [],
          },
        }));
        hasAutoFilled.current = true;
      } else {
        dispatch(clearYearMakeModel());
      }
    }
  }, [isModalOpen, dispatch, initialMainTab, initialBrandCategory, initialSizeCategory, activeGarageId, garage]);

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

  const handleDriveChange = (val: string) => {
    onDriveChange(val);
    
    // Automatically submit and add to garage when drive is selected
    const cleanModel = model && model !== '__DEFAULT_MODEL__' ? model : '';
    const cleanTrim = trim && trim !== '__DEFAULT_TRIM__' ? trim : '';
    const cleanDrive = val && val !== '__DEFAULT_DRIVE__' ? val : '';
    
    const newItem: TYmmGarageItem = {
      year,
      make,
      model: cleanModel,
      trim: cleanTrim,
      drive: cleanDrive,
    };
    
    dispatch(addToGarage(newItem));
    dispatch(submitYmm(newItem));
    dispatch(setIsModalOpen(false));
    
    // Check dynamic redirection logic requested via redux state
    if (redirectPath) {
      router.push(redirectPath);
    } else if (pathname && !pathname.includes('/collections')) {
      const targetPath = pathname.includes('/tire')
        ? '/collections/product-category/tire'
        : '/collections/product-category/wheels';
      router.push(targetPath);
    }
  };

  const openNeedHelpModal = () => {
    setIsNeedHelpModalOpen(true);
    dispatch(setIsModalOpen(false)); // Close the main modal
  };

  const closeNeedHelpModal = () => {
    setIsNeedHelpModalOpen(false);
  };

  // Compute header title and subtitle based on current selection state
  const headerTitle = useMemo(() => {
    if (yearValue && makeValue && modelValue) {
      return `${yearValue} ${makeValue} ${modelValue}`;
    } else if (yearValue && makeValue) {
      return `${yearValue} ${makeValue}`;
    } else if (yearValue) {
      return yearValue;
    }
    return "Select Your Vehicle";
  }, [yearValue, makeValue, modelValue]);

  const headerSubtitle = useMemo(() => {
    if (trimValue) {
      return trimValue;
    }
    return "";
  }, [trimValue]);

  // Vehicle step is completed when year, make, and model are selected
  const isVehicleStepCompleted = useMemo(() => {
    return !!(yearValue && makeValue && modelValue);
  }, [yearValue, makeValue, modelValue]);

  // Can open classifier step when vehicle step is completed
  const canOpenClassifierStep = isVehicleStepCompleted;

  const value = useMemo<TYmmFilterModalContext>(
    () => ({
      isModalOpen,
      closeModal: () => dispatch(setIsModalOpen(false)),
      isNeedHelpModalOpen,
      openNeedHelpModal,
      closeNeedHelpModal,
      modalHeight,
      setModalHeight,
      headerTitle,
      headerSubtitle,
      activeStep,
      setActiveStep,
      isVehicleStepCompleted,
      canOpenClassifierStep,
      activeMainTab,
      setActiveMainTab,
      brandCategory,
      setBrandCategory,
      sizeCategory,
      setSizeCategory,
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
      isYearLoading: isYearLoading || isYearFetching,
      isMakeLoading: isMakeLoading || isMakeFetching,
      isModelLoading: isModelLoading || isModelFetching,
      isTrimLoading: isTrimLoading || isTrimFetching,
      isDriveLoading: isDriveLoading || isDriveFetching,
      onYearChange: (value: string) => onYearChange(value),
      onMakeChange: (value: string) => onMakeChange(value),
      onModelChange: (value: string) => onModelChange(value),
      onTrimChange: (value: string) => onTrimChange(value),
      onDriveChange: (value: string) => handleDriveChange(value),
    }),
    [
      isModalOpen,
      dispatch,
      isNeedHelpModalOpen,
      modalHeight,
      headerTitle,
      headerSubtitle,
      activeStep,
      isVehicleStepCompleted,
      canOpenClassifierStep,
      activeMainTab,
      brandCategory,
      sizeCategory,
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
      isYearFetching,
      isMakeFetching,
      isModelFetching,
      isTrimFetching,
      isDriveFetching,
      onYearChange,
      onMakeChange,
      onModelChange,
      onTrimChange,
      onDriveChange, handleDriveChange,
    ]
  );

  return (
    <YmmFilterModalContext.Provider value={value}>
      {children}
    </YmmFilterModalContext.Provider>
  );
}
