const FITMENT_BASE_URL = 'https://tenant-api.devtroop.shop/fitment/cwo-tf';
const FITMENT_TOKEN = 'lY3AReeReUxy4vb5x_KbWedNWA4o6p0vPAndW3eW3jg';

// Driveright (aftermarket upstep) API constants
const DRIVERIGHT_BASE_URL = 'https://api.driverightdata.com/eu/api';
const DRIVERIGHT_USERNAME = 'Tire_Wheel_Experts';
const DRIVERIGHT_SECURITY_TOKEN = '0b035d5ccecc43f2a9adce9849c7024e';
const DRIVERIGHT_API_KEY = '0b035d5ccecc43f2a9adce9849c7024e';

type FitmentPrimitive = string | number | boolean | null;

export type FitmentRecommendationItem = Record<
  string,
  FitmentPrimitive | FitmentPrimitive[]
>;

export type FitmentRecommendations = Record<
  string,
  Record<string, Record<string, Record<string, FitmentRecommendationItem[]>>>
>;

export type FitmentVehicleDetails = {
  drchassisid: string;
  year: string;
  make: string;
  model: string;
  drive: string;
  trim: string;
  vehicleType: string;
  vehicleType2: string;
  bodyType: string;
  drmodelid: string;
  stockWheelWidth: string;
  stockWheelDiameter: string;
  stockOffset: string;
  stockTireSize: string;
  stockTireSizeSearch: string;
  stockTireDiameter: string;
  tireWidthMin: string;
  tireWidthMax: string;
  tireDiameterMin: string;
  tireDiameterMax: string;
  tireLoadIndex: string;
  tireLoadIndexRear: string;
  tireSpeedIndex: string;
  boltpattern: string;
  boltpatternMm: string;
  boltpatternInches: string;
  hub: string;
  lugType: string;
  lugSize: string;
  factoryStaggered: string;
  wheelDiameterMin: string;
  wheelDiameterMax: string;
  wheelWidthMin: string;
  wheelWidthMax: string;
  staggered: string;
  fuelTypeName: string;
  RegionSort: string;
  stockWheelDiameterRear: string;
  stockTireSizeRear: string;
  tireWidthMinRear: string;
  tireWidthMaxRear: string;
  tireDiameterMinRear: string;
  tireDiameterMaxRear: string;
  wheelDiameterMinRear: string;
  wheelDiameterMaxRear: string;
  wheelWidthMinRear: string;
  wheelWidthMaxRear: string;
  tireSpeedIndexMPH: string;
  tireSpeedIndexMPHRear: string;
  multiChassis: string;
  fuelType: string;
  engine: string[];
  tireDiameterMinList: string[];
  tireDiameterMaxList: string[];
  tireWidthMinList: string[];
  tireWidthMaxList: string[];
  wheelDiameterMinList: number[];
  wheelDiameterMaxList: number[];
  tireDiameterMinRearList: string[];
  tireDiameterMaxRearList: string[];
  tireWidthMinRearList: string[];
  tireWidthMaxRearList: string[];
  wheelDiameterMinRearList: number[];
  wheelDiameterMaxRearList: number[];
  [key: string]: FitmentPrimitive | FitmentPrimitive[] | string[] | number[];
};

export type FitmentVehicleResponse = {
  vehicle_details: FitmentVehicleDetails;
  vehicle_details_2: FitmentVehicleDetails;
  tire_fitment: {
    recommendations: FitmentRecommendations;
    factorySizes: FitmentRecommendationItem[];
  };
};

const withToken = (url: string) =>
  `${url}${url.includes('?') ? '&' : '?'}token=${FITMENT_TOKEN}`;

const fetchJson = async <T>(url: string): Promise<T> => {
  const response = await fetch(withToken(url));
  if (!response.ok) {
    throw new Error(`Fitment API request failed: ${response.status}`);
  }
  return (await response.json()) as T;
};

const fetchDriverightJson = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Driveright API request failed: ${response.status}`);
  }
  return (await response.json()) as T;
};

export const getFitmentYears = async (): Promise<string[]> =>
  fetchJson<string[]>(`${FITMENT_BASE_URL}/get-years`);

export const getFitmentMakes = async (year: string): Promise<string[]> =>
  fetchJson<string[]>(`${FITMENT_BASE_URL}/get-makes?year=${encodeURIComponent(year)}`);

export const getFitmentModels = async (
  year: string,
  make: string
): Promise<string[]> =>
  fetchJson<string[]>(
    `${FITMENT_BASE_URL}/get-models?year=${encodeURIComponent(year)}&make=${encodeURIComponent(make)}`
  );

export const getFitmentTrims = async (
  year: string,
  make: string,
  model: string
): Promise<string[]> =>
  fetchJson<string[]>(
    `${FITMENT_BASE_URL}/get-trim?year=${encodeURIComponent(year)}&make=${encodeURIComponent(make)}&model=${encodeURIComponent(model)}`
  );

export const getFitmentDrives = async (
  year: string,
  make: string,
  model: string,
  trim: string
): Promise<string[]> =>
  fetchJson<string[]>(
    `${FITMENT_BASE_URL}/get-drive?year=${encodeURIComponent(year)}&make=${encodeURIComponent(make)}&model=${encodeURIComponent(model)}&trim=${encodeURIComponent(trim)}`
  );

export const getFitmentVehicleInfo = async (
  year: string,
  make: string,
  model: string,
  trim: string,
  drive: string
): Promise<FitmentVehicleResponse> =>
  fetchJson<FitmentVehicleResponse>(
    `${FITMENT_BASE_URL}/get-tire-fitment?year=${encodeURIComponent(year)}&make=${encodeURIComponent(make)}&model=${encodeURIComponent(model)}&trim=${encodeURIComponent(trim)}&drive=${encodeURIComponent(drive)}`
  );

export type DRUpstepWheel = {
  UpstepID: number;
  ChassisID: number;
  UpstepType: string;
  UpstepCode: string;
  WheelSize: string;
  Tyre1: string;
  Tyre2: string;
  Tyre3: string;
  Tyre4: string;
  Tyre5: string;
  Tyre6: string;
  Tyre7: string;
  Tyre8: string;
  MinOffset: number;
  MaxOffset: number;
  Changedate: string;
  Comments: string;
  SortOrder: number;
  SortOrder2: number;
};

export const getUpstepWheelsByChassisID = async (
  chassisID: string | number
): Promise<DRUpstepWheel[]> => {
  const url = `${DRIVERIGHT_BASE_URL}/wheel-data/GetUpstepWheelsByChassisID?username=${encodeURIComponent(
    DRIVERIGHT_USERNAME
  )}&securityToken=${encodeURIComponent(
    DRIVERIGHT_SECURITY_TOKEN
  )}&chassisID=${encodeURIComponent(String(chassisID))}&api_key=${encodeURIComponent(
    DRIVERIGHT_API_KEY
  )}`;
  return fetchDriverightJson<DRUpstepWheel[]>(url);
};

export type DRDChassisReturnNA = {
  DRDChassisID: string;
  ManufacturerID: string;
  ChassisTitle: string;
  HorsePower: string;
  VIN: string;
  EuroVin: string;
  TireSize: string;
  LoadIndex: string;
  SpeedIndex: string;
  TireSize_R: string;
  LoadIndex_R: string;
  SpeedIndex_R: string;
  RimSize: string;
  RimSize_R: string;
  RimOffset: string;
  RimOffset_R: string;
  PCD: string;
  CenterBore: string;
  NutBoltThreadType: string;
  NutBoltHex_Inches: string;
  BoltLength_Inches: string;
  NutBoltTorque_Lbs_Ft: string;
  ET_Max_F: string;
  ET_Min_F: string;
  ET_Max_R: string;
  ET_Min_R: string;
  WheelLoad_Max_Lbs: string;
  VehicleTrack_F_Inches: string;
  VehicleTrack_R_Inches: string;
  RimWidth_Max_F: string;
  RimWidth_Max_R: string;
  GVW_Lbs: string;
  Axle_Weight_F_Lbs: string;
  Axle_Weight_R_Lbs: string;
  Caliper: string;
  CenterBore_R: string;
  OETireDescription: string;
  RunFlat_F: string;
  RunFlat_R: string;
  ExtraLoad_F: string;
  ExtraLoad_R: string;
  ChangeDate_US: string;
  TPMS: string;
  NutorBolt: string;
  SUV_Car: string;
  MinBoltLength_Min_Inches: string;
  MaxBoltLength__Max_Inches: string;
  NutBoltAM: string;
  NutBoltAMLength_Inches: string;
  NutBoltOEAlloy: string;
  NutBoltOEAlloyLength_Inches: string;
  NutBoltOESteel: string;
  NutBoltOESteelLength_Inches: string;
};

export type DRDModelOptionNA = {
  DRDChassisID: string;
  ModelName: string;
  DRDModelID: string;
  HorsePower: string;
  VIN: string;
  UKYear: string;
  TireSize: string;
  LoadIndex: string;
  SpeedIndex: string;
  TirePressure_PSI: string;
  RimSize: string;
  RimOffset: string;
  TireSize_R: string;
  LoadIndex_R: string;
  SpeedIndex_R: string;
  TirePressure_R_PSI: string;
  RimSize_R: string;
  Offset_R: string;
  Model_Laden_TP_F_PSI: string;
  Model_Laden_TP_R_PSI: string;
  RunFlat_F: string;
  RunFlat_R: string;
  ExtraLoad_F: string;
  ExtraLoad_R: string;
  OEDescription: string;
  ChangeDate_US: string;
};

export type DRDModelReturnNA = {
  PrimaryOption: DRDModelOptionNA;
  Options: DRDModelOptionNA[];
};

export type DRDVehicleDataNAResponse = {
  DRDChassisReturn_NA: DRDChassisReturnNA;
  DRDModelReturn: DRDModelReturnNA;
};

export const getVehicleDataFromDRDNA = async (
  DRDModelID: string | number,
  DRDChassisID: string | number
): Promise<DRDVehicleDataNAResponse> => {
  const url = `${DRIVERIGHT_BASE_URL}/vehicle-info/GetVehicleDataFromDRD_NA?username=${encodeURIComponent(
    DRIVERIGHT_USERNAME
  )}&securityToken=${encodeURIComponent(
    DRIVERIGHT_SECURITY_TOKEN
  )}&DRDModelID=${encodeURIComponent(String(DRDModelID))}&DRDChassisID=${encodeURIComponent(
    String(DRDChassisID)
  )}&api_key=${encodeURIComponent(DRIVERIGHT_API_KEY)}`;
  return fetchDriverightJson<DRDVehicleDataNAResponse>(url);
};
