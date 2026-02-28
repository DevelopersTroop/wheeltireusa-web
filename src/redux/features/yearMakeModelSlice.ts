'use client';
import { TYmm, TYmmGarageItem } from '@/types/ymm';
import { createSlice } from '@reduxjs/toolkit';

const initialState: TYmm = {
  list: {
    years: [],
    makes: [],
    models: [],
    bodyTypes: [],
    subModels: [],
  },
  year: '',
  make: '',
  model: '',
  bodyType: '',
  subModel: {
    SubModel: '',
    DRChassisID: '',
    DRModelID: '',
  },
  vehicleInformation: {
    boltPattern: '',
    frontRimSize: '',
    rearRimSize: '',
    frontCenterBore: '',
    rearCenterBore: '',
    maxWheelLoad: '',
    tireSizes: [],
    supportedWheels: [],
  },
  submitYmm: {},
  garage: [],
  activeGarageId: null,
};
const yearMakeModelSlice = createSlice({
  name: 'yearMakeModel',
  initialState,
  reducers: {
    setYmm: (state, action: { payload: Partial<TYmm> }) => {
      return {
        ...state,
        ...action.payload,
        vehicleInformation: {
          ...state.vehicleInformation,
          ...(action.payload?.vehicleInformation ?? {}),
        },
        list: {
          ...state.list,
          ...(action.payload?.list ?? {}),
        },
        subModel: {
          ...state.subModel,
          ...(action.payload?.subModel ?? {}),
        },
      };
    },
    clearYearMakeModel: (state) => {
      return {
        ...initialState,
        garage: state.garage,
        activeGarageId: null,
      };
    },
    submitYmm: (state, action: { payload: object }) => {
      state.submitYmm = action.payload;
    },
    addToGarage: (state, action: { payload: TYmmGarageItem }) => {
      if (!state.garage) state.garage = [];
      const exists = state.garage.some((item) => item.id === action.payload.id);
      if (!exists) {
        state.garage.push(action.payload);
      }
      state.activeGarageId = action.payload.id;
    },
    setActiveGarage: (state, action: { payload: string }) => {
      state.activeGarageId = action.payload;
    },
    removeFromGarage: (state, action: { payload: string }) => {
      if (state.garage) {
        state.garage = state.garage.filter(
          (item) => item.id !== action.payload
        );
      }
    },
    clearGarage: (state) => {
      state.garage = [];
      state.activeGarageId = null;
    },
  },
});

export default yearMakeModelSlice.reducer;
export const {
  setYmm,
  clearYearMakeModel,
  submitYmm,
  addToGarage,
  removeFromGarage,
  clearGarage,
  setActiveGarage,
} = yearMakeModelSlice.actions;
