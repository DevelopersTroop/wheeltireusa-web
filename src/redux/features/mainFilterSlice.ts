'use client';
import { TMainFilter } from '@/types/main-filter';
import { DeepPartial } from '@/utils/shared';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: TMainFilter = {
  isFilterModalOpen: false,
  filters: {
    byVehicle: {
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
    },
    byTireBrand: {
      list: {
        brands: [],
      },
      current: {
        brand: '',
      },
    },
  },
};
const mainFilterSlice = createSlice({
  name: 'mainFilter',
  initialState,
  reducers: {
    setMainFilter: (state, action: PayloadAction<DeepPartial<TMainFilter>>) => {
      return {
        ...state,
        ...action.payload,
        filters: {
          ...state.filters,
          ...action.payload.filters,
          byVehicle: {
            ...state.filters.byVehicle,
            list: {
              ...state.filters.byVehicle.list,
              ...(action.payload?.filters?.byVehicle?.list ?? {}),
              subModels: [
                ...(state.filters.byVehicle.list.subModels ?? []),
                ...(action.payload?.filters?.byVehicle?.list?.subModels ?? []),
              ],
            },
            current: {
              ...state.filters.byVehicle.current,
              ...(action.payload?.filters?.byVehicle?.current ?? {}),
              submodel: {
                ...state.filters.byVehicle.current.subModel,
                ...action.payload?.filters?.byVehicle?.current?.subModel,
              },
              vehicleInformation: {
                ...state.filters.byVehicle.current.vehicleInformation,
                ...action.payload?.filters?.byVehicle?.current
                  ?.vehicleInformation,
              },
            },
          },
          byTireBrand: {
            ...state.filters.byTireBrand,
            ...(action.payload?.filters?.byTireBrand ?? {}),
            list: {
              brands: [
                ...(state.filters.byTireBrand.list.brands ?? []),
                ...(action.payload?.filters?.byTireBrand?.list?.brands ?? []),
              ],
            },
            current: {
              ...state.filters.byTireBrand.current,
              ...(action.payload?.filters?.byTireBrand?.current ?? {}),
            },
          },
        },
      };
    },
    clearMainFilter: (state) => {
      Object.assign(state, initialState);
    },
    openMainFilterModal: (state) => {
      state.isFilterModalOpen = true;
    },
    closeMainFilterModal: (state) => {
      state.isFilterModalOpen = false;
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
