import { TCategory } from './category';

export type TTireSpec = {
  tireWidth: number | null; // in mm or inches (depends on format)
  tireAspectRatio: number | null; // in percentage (null for flotation)
  tireConstruction: string | null; // e.g. 'R'
  wheelDiameterInch: number | null; // rim diameter in inches
  tireOverallDiameterInch: number | null; // full outer diameter in inches
  afterMarketTireDiameterRange: {
    plusTireDiameterInch: number | null; // +3% overall diameter
    minusTireDiameterInch: number | null; // -3% overall diameter
  };
};

export type TInventoryBase = {
  id: number;
  itemClass: string | null;
  slug: string;
  distributorName: string | null;
  modelGroup: string | null;
  brand: string | null;
  forgingSeries: string[] | null;
  msrp: number | null;
  price: number | null;
  map: number | null;
  inventoryAvailable: number | null;
  itemImage: string | null;
  title: string | null;
  tireSize: string | null;
  tireType: string[] | null;
  renderedImages: string[] | null;
  images: string[] | null;
  aspectRatio: string | null;
  class: string | null;
  description: string;
  diameter: string | null;
  gtin: string | null;
  loadIndex: string | null;
  mS: string | null;
  maxLoad2Kg: string | null;
  maxLoad2Lbs: string | null;
  overallDiaIn: string | null;
  overallDiaMm: string | null;
  partnumber: string;
  prLr: string | null;
  runFlat: string | null;
  sectionWidthIn: string | null;
  sectionWidthMm: string | null;
  staticLoadRadiusIn: string | null;
  staticLoadRadiusMm: string | null;
  theoreticalRollingRadius: string | null;
  tireClass: string | null;
  tireOrigin: string | null;
  treadDepthIn: string | null;
  treadPattern: string | null;
  treadWidth: string | null;
  utqg: string | null;
  vehicleCategory: string | null;
  width: string | null;
  serviceDescription: string | null;
  ecoFocus: string | null;
  createdBy: string | null | null;
  createdAt: string | null;
  updatedAt: string | null;
  comparedData: unknown[] | null;
  category: TCategory | null;
};

export type TTireProduct = {
  tireSize: string;
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
}

export type TWheelProduct = {
  loadRating: string | null;
  maxLoadKg: string | null;
  maxLoadLbs: string | null;
  maxLoad2Kg: string | null;
  maxLoad2Lbs: string | null;
}
export type TInventoryItem = TTireProduct & TWheelProduct & {
  id: number;
  brand: string;
  model: string;
  title: string;
  category: {
    id: number,
    title: string;
    slug: string,
    description: string
  };
  itemImage: string | null;
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
};

export type TInventoryListItem = TInventoryBase & {
  inventoryId: string | null;
  itemImage: string | null;
  pricingId: string | null;
  inventory: TInventoryItem['id'] | null;
  pricing: TInventoryItem['sellingPrice'] | null;
};
