'use client';
import { TYmm, TYmmGarageItem } from '@/types/ymm';
import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState: TYmm = {
  list: {
    years: [],
    makes: [],
    models: [],
    trims: [],
    drives: [],
  },
  year: '',
  make: '',
  model: '',
  trim: '',
  drive: '',
  vehicleInformation: {
    boltPattern: '',
    frontRimSize: '',
    rearRimSize: '',
    frontCenterBore: '',
    rearCenterBore: '',
    maxWheelLoad: '',
    tireSizes: [],
    supportedWheels: [],
    vehicle_details_2: null,
    tire_fitment: null,
    afterMarketDRSizes: [],
    VehicleDataFromDRD_NA: null,
  },
  submitYmm: {},
  garage: {},
  activeGarageId: null,
  activeYmmInstanceId: '',
  isHomeYmmInView: false,
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
      if (!state.garage) state.garage = {};
      const { year, make, model, trim = '', drive = '' } = action.payload;
      // Find duplicate by value equality
      const existingEntry = Object.entries(state.garage).find(
        ([, item]) =>
          item.year === year &&
          item.make === make &&
          item.model === model &&
          (item.trim ?? '') === trim &&
          (item.drive ?? '') === drive
      );
      if (existingEntry) {
        const [existingId] = existingEntry;
        state.activeGarageId = existingId;
        return;
      }
      const key = uuidv4();
      state.garage[key] = { ...action.payload, id: key };
      state.activeGarageId = key;
    },
    setActiveGarage: (state, action: { payload: string | null }) => {
      state.activeGarageId = action.payload;
      if (action.payload && state.garage[action.payload]) {
        const item = state.garage[action.payload];
        state.year = item.year;
        state.make = item.make;
        state.model = item.model;
        state.trim = item.trim ?? '';
        state.drive = item.drive ?? '';
        // Clear lists to trigger fetches via useYmm
        state.list = {
          ...state.list,
          makes: [],
          models: [],
          trims: [],
          drives: [],
        };
      }
    },
    removeFromGarage: (state, action: { payload: string }) => {
      if (state.garage && state.garage[action.payload]) {
        delete state.garage[action.payload];
      }
      if (state.activeGarageId === action.payload) {
        const remainingIds = Object.keys(state.garage ?? {});
        state.activeGarageId = remainingIds.length ? remainingIds[0] : null;
      }
    },
    clearGarage: (state) => {
      state.garage = {};
      state.activeGarageId = null;
    },
    setHomeYmmInView: (state, action: { payload: boolean }) => {
      state.isHomeYmmInView = action.payload;
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
  setHomeYmmInView,
} = yearMakeModelSlice.actions;
