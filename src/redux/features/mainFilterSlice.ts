"use client";
import { TMainFilter } from "@/types/main-filter";
import { createSlice } from "@reduxjs/toolkit";

const initialState: TMainFilter = {
  list: {
    years: [],
    makes: [],
    models: [],
    bodyTypes: [],
    subModels: []
  },
  year: "",
  make: "",
  model: "",
  bodyType: "",
  subModel: {
    SubModel: "",
    DRChassisID: "",
    DRModelID: ""
  },
  vehicleInformation: {
    boltPattern: "",
    frontRimSize: "",
    rearRimSize: "",
    frontCenterBore: "",
    rearCenterBore: "",
    maxWheelLoad: "",
    tireSizes: [],
    supportedWheels: []
  },
  submitMainFilter: {},
  isFilterModalOpen: false
}
const mainFilterSlice = createSlice({
  name: "mainFilter",
  initialState,
  reducers: {
    setMainFilter: (state, action: { payload: Partial<TMainFilter> }) => {
      return {
        ...state,
        ...action.payload,
        vehicleInformation: {
          ...state.vehicleInformation,
          ...(action.payload?.vehicleInformation ?? {})
        },
        list: {
          ...state.list,
          ...(action.payload?.list ?? {})
        },
        subModel: {
          ...state.subModel,
          ...(action.payload?.subModel ?? {})
        }
      }
    },
    clearMainFilter: (state) => {
      state = initialState
    },
    submitMainFilter: (state, action: { payload: object }) => {
      state.submitMainFilter = action.payload
    },
    openMainFilterModal: (state) => {
      state.isFilterModalOpen = true
    },
    closeMainFilterModal: (state) => {
      state.isFilterModalOpen = false
    },
  }
});

export default mainFilterSlice.reducer;
export const { setMainFilter, clearMainFilter, submitMainFilter, openMainFilterModal, closeMainFilterModal } = mainFilterSlice.actions;