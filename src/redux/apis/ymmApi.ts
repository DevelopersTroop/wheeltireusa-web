import { baseApi } from './base';

const DR_BASE_URL = 'https://api.driverightdata.com/EU/api';
const DR_USERNAME = 'Tire_Wheel_Experts';
const DR_TOKEN = '0b035d5ccecc43f2a9adce9849c7024e';

const ymmEndpoints = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getYears: builder.query<string[], void>({
      query: () => ({
        url: '/year-makes/years',
        method: 'GET',
      }),
      transformResponse: (response: { years: string[] }) => response.years,
      keepUnusedDataFor: 600,
    }),

    getMakes: builder.query<string[], { year: string; regionId?: string }>({
      query: ({ year, regionId = '1' }) => ({
        url: `/year-makes/makes?year=${year}&regionID=${regionId}`,
        method: 'GET',
      }),
      transformResponse: (response: { makes: string[] }) => response.makes,
      keepUnusedDataFor: 600,
    }),

    getModels: builder.query<
      string[],
      { year: string; make: string; regionId?: string }
    >({
      query: ({ year, make, regionId = '1' }) => ({
        url: `/year-makes/models?year=${year}&manufacturer=${make}&regionID=${regionId}`,
        method: 'GET',
      }),
      transformResponse: (response: { models: string[] }) => response.models,
      keepUnusedDataFor: 600,
    }),

    getBodyTypes: builder.query<
      string[],
      { year: string; make: string; model: string; regionId?: string }
    >({
      queryFn: async ({ year, make, model, regionId = '1' }) => {
        try {
          const response = await fetch(
            `${DR_BASE_URL}/aaia/GetAAIABodyTypes?username=${DR_USERNAME}&securityToken=${DR_TOKEN}&year=${year}&regionID=${regionId}&manufacturer=${make}&model=${model}`
          );
          const json = await response.json();
          return {
            data: json.map(
              (bodyTypeObj: { BodyType: string }) => bodyTypeObj.BodyType
            ) as string[],
          };
        } catch (error) {
          return {
            error: {
              status: 500,
              data: String(error),
              statusText: 'Error',
              message: String(error),
            },
          };
        }
      },
      keepUnusedDataFor: 600,
    }),

    getSubModels: builder.query<
      { SubModel: string; DRChassisID: string; DRModelID: string }[],
      { year: string; make: string; model: string; bodyType: string }
    >({
      queryFn: async ({ year, make, model, bodyType }) => {
        try {
          const response = await fetch(
            `${DR_BASE_URL}/aaia/GetAAIASubModelsWheels?username=${DR_USERNAME}&securityToken=${DR_TOKEN}&year=${year}&regionID=1&manufacturer=${make}&model=${model}&bodyType=${bodyType}`
          );
          const json = await response.json();
          return {
            data: json as {
              SubModel: string;
              DRChassisID: string;
              DRModelID: string;
            }[],
          };
        } catch (error) {
          return {
            error: {
              status: 500,
              data: String(error),
              statusText: 'Error',
              message: String(error),
            },
          };
        }
      },
      keepUnusedDataFor: 600,
    }),

    getVehicleData: builder.query<
      {
        boltPattern: string;
        frontRimSize: string;
        rearRimSize: string;
        frontCenterBore: string;
        rearCenterBore: string;
        maxWheelLoad: string;
        tireSizes: Record<'front' | 'rear', string>[];
        supportedWheels: {
          diameter: number;
          width: number;
          upStepType: string;
          minOffset: number;
          maxOffset: number;
          comments: string;
        }[];
      },
      { modelId: string; chassisId: string }
    >({
      queryFn: async ({ modelId, chassisId }) => {
        try {
          // Fetch vehicle info
          const vehicleInfoResponse = await fetch(
            `https://api.driverightdata.com/eu/api/vehicle-info/GetVehicleDataFromDRD_NA?username=${DR_USERNAME}&securityToken=${DR_TOKEN}&DRDModelID=${modelId}&DRDChassisID=${chassisId}`
          );
          const vehicleInfo = await vehicleInfoResponse.json();

          const boltPattern = vehicleInfo['DRDChassisReturn_NA']['PCD'];
          const frontRimSize = vehicleInfo['DRDChassisReturn_NA']['RimSize'];
          const rearRimSize =
            vehicleInfo['DRDChassisReturn_NA']['RimSize_R'] || frontRimSize;
          const frontCenterBore =
            vehicleInfo['DRDChassisReturn_NA']['CenterBore'];
          const rearCenterBore =
            vehicleInfo['DRDChassisReturn_NA']['CenterBore_R'] ||
            frontCenterBore;
          const maxWheelLoad =
            vehicleInfo['DRDChassisReturn_NA']['WheelLoad_Max_Lbs'];

          const tireSizes: { front: string; rear: string }[] = [];
          const primaryOption = vehicleInfo['DRDModelReturn'][
            'PrimaryOption'
          ] as { TireSize: string; TireSize_R: string };
          const otherOptions = vehicleInfo['DRDModelReturn'][
            'Options'
          ] as (typeof primaryOption)[];

          const mainFrontTireSize =
            vehicleInfo['DRDChassisReturn_NA']['TireSize'];
          const mainRearTireSize =
            vehicleInfo['DRDChassisReturn_NA']['TireSize_R'];

          if (mainFrontTireSize && (mainRearTireSize || mainFrontTireSize)) {
            tireSizes.push({
              front: mainFrontTireSize,
              rear: mainRearTireSize || mainFrontTireSize,
            });
          }

          if (
            primaryOption['TireSize'] &&
            (primaryOption['TireSize_R'] || primaryOption['TireSize'])
          ) {
            tireSizes.push({
              front: primaryOption['TireSize'],
              rear: primaryOption['TireSize_R'] || primaryOption['TireSize'],
            });
          }
          otherOptions?.map((option) =>
            tireSizes.push({
              front: option.TireSize,
              rear: option.TireSize_R || option.TireSize,
            })
          );

          // Fetch upstep wheels
          const upStepWheelsResponse = await fetch(
            `https://api.driverightdata.com/eu/api/wheel-data/GetUpstepWheelsByChassisID?username=${DR_USERNAME}&securityToken=${DR_TOKEN}&chassisID=${chassisId}`
          );
          const upStepWheelsInfo: {
            WheelSize: string;
            UpstepType: string;
            MinOffset: number;
            MaxOffset: number;
            Comments: string;
          }[] = await upStepWheelsResponse.json();

          const supportedWheels = upStepWheelsInfo.map((wheelInfo) => {
            const wheelSize = wheelInfo.WheelSize.replaceAll(' ', '')
              .split('x')
              .map((size) => Number(size));
            return {
              diameter: Math.max(...wheelSize),
              width: Math.min(...wheelSize),
              upStepType: wheelInfo.UpstepType,
              minOffset: wheelInfo.MinOffset,
              maxOffset: wheelInfo.MaxOffset,
              comments: wheelInfo.Comments,
            };
          });

          return {
            data: {
              boltPattern,
              frontRimSize,
              rearRimSize,
              frontCenterBore,
              rearCenterBore,
              maxWheelLoad,
              tireSizes,
              supportedWheels,
            },
          };
        } catch (error) {
          return {
            error: {
              status: 500,
              data: String(error),
              statusText: 'Error',
              message: String(error),
            },
          };
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
  useGetBodyTypesQuery,
  useGetSubModelsQuery,
  useGetVehicleDataQuery,
} = ymmEndpoints;
