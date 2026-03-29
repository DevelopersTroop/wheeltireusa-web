"use client";

import { createContext } from "react";

export type TYmmFilterModalContext = {
  isModalOpen: boolean;
  closeModal: () => void;
  isNeedHelpModalOpen: boolean;
  openNeedHelpModal: () => void;
  closeNeedHelpModal: () => void;
  modalHeight: number;
  headerTitle: string;
  headerSubtitle: string;
  activeStep: 1 | 2;
  setActiveStep: (step: 1 | 2) => void;
  isVehicleStepCompleted: boolean;
  canOpenClassifierStep: boolean;
  setModalHeight: (height: number) => void;
  activeMainTab: "vehicle" | "brand" | "size";
  setActiveMainTab: (tab: "vehicle" | "brand" | "size") => void;
  brandCategory: "tire" | "wheels";
  setBrandCategory: (category: "tire" | "wheels") => void;
  sizeCategory: "tire" | "wheels";
  setSizeCategory: (category: "tire" | "wheels") => void;
  brands: string[];
  isBrandsLoading: boolean;
  yearValue?: string;
  makeValue?: string;
  modelValue?: string;
  trimValue?: string;
  driveValue?: string;
  years: string[];
  makes: string[];
  models: string[];
  trims: string[];
  drives: string[];
  isYearDisabled: boolean;
  isMakeDisabled: boolean;
  isModelDisabled: boolean;
  isTrimDisabled: boolean;
  isDriveDisabled: boolean;
  isYearLoading: boolean;
  isMakeLoading: boolean;
  isModelLoading: boolean;
  isTrimLoading: boolean;
  isDriveLoading: boolean;
  onYearChange: (value: string) => void;
  onMakeChange: (value: string) => void;
  onModelChange: (value: string) => void;
  onTrimChange: (value: string) => void;
  onDriveChange: (value: string) => void;
};

export const YmmFilterModalContext = createContext<TYmmFilterModalContext | null>(
  null
);
