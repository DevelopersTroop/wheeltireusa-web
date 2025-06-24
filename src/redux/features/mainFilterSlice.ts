'use client';
import { TMainFilter, TMainFilterSubModel } from '@/types/main-filter';
import { DeepPartial } from '@/utils/shared';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const initialMainFilterVehicleInformation = {
  boltPattern: '',
  frontRimSize: '',
  rearRimSize: '',
  frontCenterBore: '',
  rearCenterBore: '',
  maxWheelLoad: '',
  tireSizes: null,
  supportedWheels: [],
};

const initialState: TMainFilter = {
  isFilterModalOpen: false,
  activeTab: null,
  zipCode: null,
  filters: {
    byVehicle: {
      list: {
        years: null,
        makes: null,
        models: null,
        bodyTypesWithSubmodels: null,
      },
      current: {
        year: '',
        make: '',
        model: '',
        frontTireSize: null,
        rearTireSize: null,
        bodyType: '',
        subModel: {
          SubModel: '',
          DRChassisID: '',
          DRModelID: '',
        },
        bodyTypeWithSubmodel: '',
        vehicleInformation: initialMainFilterVehicleInformation,
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
    byTireSize: {
      list: {
        diameters: [],
        widths: [],
        aspectRatios: [],
      },
      current: {
        frontTireDiameter: '',
        rearTireDiameter: '',
        frontTireWidth: '',
        rearTireWidth: '',
        frontTireAspectRatio: '',
        rearTireAspectRatio: '',
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
              bodyTypesWithSubmodels:
                action.payload?.filters?.byVehicle?.list
                  ?.bodyTypesWithSubmodels ?? null,
            },
            current: {
              ...state.filters.byVehicle.current,
              ...(action.payload?.filters?.byVehicle?.current ?? {}),
              subModel: {
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
          byTireSize: {
            ...state.filters.byTireSize,
            ...(action.payload?.filters?.byTireSize ?? {}),
            list: {
              ...state.filters.byTireSize.list,
              ...(action.payload?.filters?.byTireSize?.list ?? {}),
            },
            current: {
              ...state.filters.byTireSize.current,
              ...(action.payload?.filters?.byTireSize?.current ?? {}),
            },
          },
        },
      };
    },
    setBodyTypeWithSubmodel: (
      state,
      action: PayloadAction<
        {
          BodyType: string;
          SubModel: (TMainFilterSubModel & { subModelWithBodyType: string })[];
        }[]
      >
    ) => {
      console.log('action.payload', action.payload);
      state.filters.byVehicle.list.bodyTypesWithSubmodels = action.payload;
    },
    resetInitialVehicleInformation: (
      state,
      action: PayloadAction<undefined>
    ) => {
      state.filters.byVehicle.current.vehicleInformation =
        initialMainFilterVehicleInformation;
    },
    clearMainFilter: (state) => {
      Object.assign(state, initialState);
    },
    openMainFilterModal: (
      state,
      action: PayloadAction<{
        tab: 'Vehicle' | 'TireBrand' | 'TireSize' | null;
      }>
    ) => {
      state.isFilterModalOpen = true;
      state.activeTab = action.payload.tab ?? null;
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
  setBodyTypeWithSubmodel,
  resetInitialVehicleInformation,
} = mainFilterSlice.actions;
