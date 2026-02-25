import { TCategory } from './category';

export type TTireSpec = {
  tireWidth: number | null;
  tireAspectRatio: number | null;
  tireConstruction: string | null;
  wheelDiameterInch: number | null;
  tireOverallDiameterInch: number | null;
  afterMarketTireDiameterRange: {
    plusTireDiameterInch: number | null;
    minusTireDiameterInch: number | null;
  };
};

export type TTireProduct = {
  id: number;
  brand: string;
  model: string;
  title: string;
  category: TCategory;
  itemImage: string | null;
  images: string[] | null;
  slug: string;
  vendorName: string;
  partNumber: string;
  shipWeight: string | null;
  shipWidth: string | null;
  shipHeight: string | null;
  shipDepth: string | null;
  shortDescription: string | null;
  availableStock: number | null;
  sellingPrice: number | null;
  vehicleCategory: string | null;
  gtin: string | null;
  tireSize: string;
  tireWidth: string;
  tireRatio: string;
  tireDiameter: string;
  rawSize: string;
  approvedRimContours: string | null;
  sidewall: string | null;
  ply: string | null;
  speedRating: string | null;
  loadIndex: string | null;
  stdRim: string | null;
  maxAirPressureKpa: string | null;
  staticLoadRadiusIn: string | null;
  theoreticalRollingRadius: string | null;
  utqg: string | null;
  treadDepthIn: string | null;
  treadDepthMm: string | null;
  staticLoadRadiusMm: string | null;
  sectionWidthIn: string | null;
  sectionWidthMm: string | null;
  runFlat: string | null;
  maxAirPressurePsi: string | null;
  tireClass: string | null;
  overallDiameterIn: string | null;
  overallDiameterMm: string | null;
  temperature: string | null;
  tireType: string | null;
  tireType2: string | null;
  weight: string | null;
  serviceDescription: string | null;
  treadWear: string | null;
  warranty: string | null;
  manufacturerNumber: string | null;
  loadRange: string | null;
  traction: string | null;
  overallWidthIn: string | null;
  revsPerMile: string | null;
  load_type: string | null;
  maxLoadKg: string | null;
  maxLoadLbs: string | null;
  dualLoadKg: string | null;
  dualLoadLsb: string | null;
  MSRating: string | null;
}

export type TWheelProduct = {
  id: number;
  brand: string;
  model: string;
  title: string;
  category: TCategory;
  itemImage: string | null;
  images: string[] | null;
  slug: string;
  vendorName: string;
  partNumber: string;
  wheelExposedLugs: string | null;
  color: string | null;
  centerBore: string | null;
  weight: string | null;
  wheelWidth: string | null;
  wheelStructure: string | null;
  trueDirectional: string | null;
  manufacturerNumber: string | null;
  boltPatterns: string[] | null;
  offset: string | null;
  wheelStyle: string | null;
  backspacing: string | null;
  wheelSpokeNumber: string | null;
  wheelDiameter: string | null;
  wheelMaterial: string | null;
  wheelSize: string | null;
  maxLoadLbs: string | null;
  maxLoadKg: string | null;
  raw_size: string | null;
   
}
export type TInventoryItem = TTireProduct & TWheelProduct & {

};