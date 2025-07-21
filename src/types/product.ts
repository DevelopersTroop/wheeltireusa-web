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
export type TInventoryItem = TInventoryBase & {
  model: string | null;
  imageUrl: string | null;
  originalImage: string | null;
  sidewall: string | null;
  loadRating: string | null;
  rawSize: string | null;
  shipWeight: string | null;
  shipWidth: string | null;
  shipHeight: string | null;
  shipDepth: string | null;
  spokeStyle: string[] | null;
  speedRating: string | null;
  ply: string | null;
  approvedRimContours: string | null;
  treadDepthMm: string | null;
  stdRim: string | null;
  sortPrice: number | null;
  maxAirPressureKpa: string | null;
  maxAirPressurePsi: string | null;
  imageUploaded: boolean | null;
  transferImage: boolean | null;
  categoryId: string | null;
  stockAvailable: boolean | null;
  loadRange: string | null;
  hazardProtection: string | null;
  maxInflactionPressure: string | null;
  rimWidth: string | null;
  measRimWidth: string | null;
  revsPerMile: string | null;
  tireWeight: string | null;
  countryOfOrigin: string | null;
  sku: string | null;
  inventoryId: {
    Id: string;
    internalId: string;
    partnumber: string;
    availability: {
      atlantaAvailable: number;
      dallasAvailable: number;
      decaturAvailable: number;
      fresnoAvailable: number;
      miamiAvailable: number;
      tampaAvailable: number;
      totalAvailable: number;
    };
  } | null;
  pricingId: {
    id: string;
    internalId: string;
    partnumber: string;
    pricing: {
      price: number;
      msrp: number;
      map: number;
    };
  } | null;
  // inventoryId: string | null;
  itemImage: string | null;
  // pricingId: string | null;
  inventory: TInventoryItem['inventoryId'] | null;
  pricing: TInventoryItem['pricingId'] | null;
};

export type TInventoryListItem = TInventoryBase & {
  inventoryId: string | null;
  itemImage: string | null;
  pricingId: string | null;
  inventory: TInventoryItem['inventoryId'] | null;
  pricing: TInventoryItem['pricingId'] | null;
};
