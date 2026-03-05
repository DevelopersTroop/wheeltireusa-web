import {
  FitmentRecommendationItem,
  FitmentRecommendations,
  FitmentVehicleDetails,
} from '@/lib/fitment-api';

export type TYmmGarageItem = {
  id?: string;
  year: string;
  make: string;
  model: string;
  trim?: string;
  drive?: string;
};

export type TYmmList = {
  years: string[];
  makes: string[];
  models: string[];
  trims: string[];
  drives: string[];
};

export type TYmmSuportedWheel = {
  diameter: number;
  width: number;
  upStepType: string;
  minOffset: number;
  maxOffset: number;
  comments: string;
};
export type TYmmVehicleInformation = {
  supportedWheels: TYmmSuportedWheel[];
  boltPattern: string;
  frontRimSize: string;
  rearRimSize: string;
  frontCenterBore: string;
  rearCenterBore: string;
  maxWheelLoad: string;
  tireSizes: Record<'front' | 'rear', string>[];
  vehicle_details_2: FitmentVehicleDetails;
  tire_fitment: {
    recommendations: FitmentRecommendations;
    factorySizes: FitmentRecommendationItem[];
  } | null;
};

export type TYmm = {
  list: Partial<TYmmList>;
  year: string;
  make: string;
  model: string;
  trim: string;
  drive: string;
  vehicleInformation: Partial<TYmmVehicleInformation>;
  submitYmm: object;
  garage: Record<string, TYmmGarageItem>;
  activeGarageId: string | null;
  activeYmmInstanceId: string;
  isHomeYmmInView: boolean;
};
