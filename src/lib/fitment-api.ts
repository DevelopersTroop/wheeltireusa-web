const FITMENT_BASE_URL = 'https://tenant-api.devtroop.shop/fitment/cwo-tf';
const FITMENT_TOKEN = 'lY3AReeReUxy4vb5x_KbWedNWA4o6p0vPAndW3eW3jg';

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
