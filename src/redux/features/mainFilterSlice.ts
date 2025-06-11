'use client';
import { TMainFilter } from '@/types/main-filter';
import { DeepPartial } from '@/utils/shared';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: TMainFilter = {
  isFilterModalOpen: false,
  filters: {
    byVehicle: {
      list: {
        years: null,
        makes: null,
        models: null,
        bodyTypes: null,
        subModels: null,
      },
      current: {
        year: '',
        make: '',
        model: '',
        bodyType: '',
        frontTireSize: null,
        rearTireSize: null,
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
          tireSizes: null,
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
              subModels:
                [
                  // ...(state.filters.byVehicle.list.subModels ?? []),
                  ...(action.payload?.filters?.byVehicle?.list?.subModels ??
                    []),
                ].length > 0
                  ? [
                      // ...(state.filters.byVehicle.list.subModels ?? []),
                      ...(action.payload?.filters?.byVehicle?.list?.subModels ??
                        []),
                    ]
                  : null,
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
