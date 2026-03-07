import {
  FitmentVehicleResponse,
  getFitmentDrives,
  getFitmentMakes,
  getFitmentModels,
  getFitmentTrims,
  getFitmentVehicleInfo,
  getFitmentYears,
  getUpstepWheelsByChassisID,
  DRUpstepWheel,
  getVehicleDataFromDRDNA,
  DRDVehicleDataNAResponse,
} from '@/lib/fitment-api';
import { baseApi } from './base';

const toError = (error: unknown) => ({
  status: 500,
  data: String(error),
  statusText: 'Error',
  message: String(error),
});

const ymmEndpoints = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getYears: builder.query<string[], void>({
      queryFn: async () => {
        try {
          return { data: await getFitmentYears() };
        } catch (error) {
          return { error: toError(error) };
        }
      },
      keepUnusedDataFor: 600,
    }),

    getMakes: builder.query<string[], { year: string }>({
      queryFn: async ({ year }) => {
        try {
          return { data: await getFitmentMakes(year) };
        } catch (error) {
          return { error: toError(error) };
        }
      },
      keepUnusedDataFor: 600,
    }),

    getModels: builder.query<string[], { year: string; make: string }>({
      queryFn: async ({ year, make }) => {
        try {
          return { data: await getFitmentModels(year, make) };
        } catch (error) {
          return { error: toError(error) };
        }
      },
      keepUnusedDataFor: 600,
    }),

    getTrims: builder.query<
      string[],
      { year: string; make: string; model: string }
    >({
      queryFn: async ({ year, make, model }) => {
        try {
          return { data: await getFitmentTrims(year, make, model) };
        } catch (error) {
          return { error: toError(error) };
        }
      },
      keepUnusedDataFor: 600,
    }),

    getDrives: builder.query<
      string[],
      { year: string; make: string; model: string; trim: string }
    >({
      queryFn: async ({ year, make, model, trim }) => {
        try {
          return { data: await getFitmentDrives(year, make, model, trim) };
        } catch (error) {
          return { error: toError(error) };
        }
      },
      keepUnusedDataFor: 600,
    }),

    getVehicleData: builder.query<
      FitmentVehicleResponse,
      { year: string; make: string; model: string; trim: string; drive: string }
    >({
      queryFn: async ({ year, make, model, trim, drive }) => {
        try {
          return {
            data: await getFitmentVehicleInfo(year, make, model, trim, drive),
          };
        } catch (error) {
          return { error: toError(error) };
        }
      },
      keepUnusedDataFor: 600,
    }),
    getUpstepWheelsByChassisID: builder.query<DRUpstepWheel[], { chassisID: string }>({
      queryFn: async ({ chassisID }) => {
        try {
          return { data: await getUpstepWheelsByChassisID(chassisID) };
        } catch (error) {
          return { error: toError(error) };
        }
      },
      keepUnusedDataFor: 600,
    }),
    getVehicleDataFromDRDNA: builder.query<
      DRDVehicleDataNAResponse,
      { DRDModelID: string; DRDChassisID: string }
    >({
      queryFn: async ({ DRDModelID, DRDChassisID }) => {
        try {
          return {
            data: await getVehicleDataFromDRDNA(DRDModelID, DRDChassisID),
          };
        } catch (error) {
          return { error: toError(error) };
        }
      },
      keepUnusedDataFor: 600,
    }),
  }),
});

export const {
  useGetYearsQuery,
  useGetMakesQuery,
  useGetModelsQuery,
  useGetTrimsQuery,
  useGetDrivesQuery,
  useGetVehicleDataQuery,
  useGetUpstepWheelsByChassisIDQuery,
  useGetVehicleDataFromDRDNAQuery,
} = ymmEndpoints;
