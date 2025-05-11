'use client';
import { TMainFilter } from '@/types/main-filter';
import { DeepPartial } from '@/utils/shared';
import { createSlice } from '@reduxjs/toolkit';

const initialState: TMainFilter = {
  list: {
    years: [],
    makes: [],
    models: [],
    bodyTypes: [],
    subModels: [],
  },
  current: {
    year: '',
    make: '',
    model: '',
    bodyType: '',
    isFilterModalOpen: false,
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
  },
};
const mainFilterSlice = createSlice({
  name: 'mainFilter',
  initialState,
  reducers: {
    setMainFilter: (state, action: { payload: DeepPartial<TMainFilter> }) => {
      return {
        ...state,
        ...action.payload,
        list: {
          ...state.list,
          ...(action.payload?.list ?? {}),
        },
        current: {
          ...state.current,
          ...(action.payload?.current ?? {}),
          submodel: {
            ...state.current.subModel,
            ...action.payload?.current?.subModel,
          },
          vehicleInformation: {
            ...state.current.vehicleInformation,
            ...action.payload?.current?.vehicleInformation,
          },
        },
      };
    },
    clearMainFilter: (state) => {
      Object.assign(state, initialState);
    },
    openMainFilterModal: (state) => {
      state.current.isFilterModalOpen = true;
    },
    closeMainFilterModal: (state) => {
      state.current.isFilterModalOpen = false;
    },
  },
});

export default mainFilterSlice.reducer;
export const {
  setMainFilter,
  clearMainFilter,
  openMainFilterModal,
  closeMainFilterModal,
} = mainFilterSlice.actions;
