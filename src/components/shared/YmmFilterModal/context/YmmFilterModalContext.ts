"use client";

import { createContext } from "react";

export type TYmmFilterModalContext = {
  isModalOpen: boolean;
  closeModal: () => void;
  modalHeight: number;
  setModalHeight: (height: number) => void;
  activeMainTab: "vehicle" | "brand";
  setActiveMainTab: (tab: "vehicle" | "brand") => void;
  headerTitle: string;
  headerSubtitle: string;
  activeStep: 1 | 2;
  setActiveStep: (step: 1 | 2) => void;
  canOpenClassifierStep: boolean;
  isVehicleStepCompleted: boolean;
  brandCategory: "tire" | "wheels";
  setBrandCategory: (category: "tire" | "wheels") => void;
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
