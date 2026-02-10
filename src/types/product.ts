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

export type TInventoryBase = {
  id: number;
  slug: string;
  title: string | null;
  brand: string | null;
  sku: string | null;
  partNumber: string | null;
  model: string | null;
  modelGroup: string | null;
  name: string | null;
  category: TCategory | null;
  categoryText: string | null;
  itemClass: string | null;
  itemType: string | null;

  // Pricing
  price: number | null;
  msrp: number | null;
  map: number | null;
  sellingPrice: number | null;
  salePrice: number | null;
  buyingPrice: number | null;
  dealerPrice: number | null;
  adjustedCost: number | null;
  mmt: number | null;
  final: string | null;
  priceSource: string | null;
  profitMargin: number | null;
  prices: unknown | null;

  // Images
  image: string | null;
  itemImage: string | null;
  originalImage: string | null;
  galleryImage: string | null;
  galleryImages: string[] | null;
  images: string[] | null;
  imageUploaded: boolean | null;

  // Dimensions
  diameter: string | null;
  width: string | null;
  aspectRatio: string | null;

  // Descriptions
  description: string | null;
  shortDescription: string | null;
  descriptionKeyFeatures: string | null;
  purchaseDescription: string | null;
  serviceDescription: string | null;
  seoDescription: string | null;

  // Shipping
  shipWeight: string | null;
  shipWidth: string | null;
  shipHeight: string | null;
  shipDepth: string | null;
  shippingAddressAndCharge: unknown | null;

  // Inventory
  inventoryAvailable: number | null;
  availableStock: number | null;
  inventory: unknown | null;
  stockQuantity: string | null;

  // Classification
  class: string | null;
  vehicleCategory: string | null;
  ecoFocus: string | null;
  hazardProtection: boolean | null;

  // Identifiers
  gtin: string | null;
  upc: string | null;
  internalId: string | null;
  productId: string | null;

  // Vendor
  vendorName: string | null;
  warehouseName: string | null;
  countryOfOrigin: string | null;

  // Compare
  compare: unknown | null;
  comparedData: unknown[] | null;
  competitors: unknown[] | null;
  selectedCompetitor: unknown[] | null;

  // Special
  specialOffers: unknown | null;
  badgeLabel: string | null;
  deliveryTime: string | null;
  customerRating: number | null;
  reviewsCount: number | null;
  properties: unknown | null;

  // Flags
  isDelete: boolean | null;
  manual: boolean | null;

  // Timestamps
  createdAt: string | null;
  updatedAt: string | null;
  deletedAt: string | null;

  // Size factors
  xfactor: number | null;
  yfactor: number | null;

  // Overall diameter
  overallDiaIn: string | null;
  overallDiaMm: string | null;
  overallDiameter: string | null;
  overallDiameterIn: number | null;
  overallDiameterMm: number | null;

  // Stagger sizes
  frontDiameter: string | null;
  frontWidth: string | null;
  frontSize: string | null;
  rearDiameter: string | null;
  rearWidth: string | null;
  rearSize: string | null;
};

export type TTireProduct = TInventoryBase & {
  // Tire sizing
  tireSize: string | null;
  tireWidth: string | null;
  tireRatio: string | null;
  tireDiameter: string | null;
  tireAspectRatio: string | null;
  rawSize: string | null;
  sectWidth: string | null;
  sectionWidthIn: string | null;
  sectionWidthMm: string | null;

  // Tire specs
  tireClass: string | null;
  tireType: string | null;
  tireStyle: string | null;
  tireTitle: string | null;
  tireOrigin: string | null;
  tireWeight: string | null;
  tireLoadIndex: string | null;
  tireMaxLoadKg: string | null;
  tireMaxLoadKg2: string | null;
  tireMaxLoadLbs: string | null;
  tireMaxLoadLbs2: string | null;

  // Performance
  speedRating: string | null;
  speedIndex: string | null;
  loadIndex: string | null;
  loadRange: string | null;
  maxLoad: string | null;
  maxLoadKg: string | null;
  maxLoadLbs: string | null;
  maxLoad2Kg: string | null;
  maxLoad2Lbs: string | null;
  ply: string | null;
  prLr: string | null;
  mS: string | null;
  terrain: string | null;
  suspensionType: string | null;
  runFlat: string | null;

  // Pressure
  maxAirPressureKpa: string | null;
  maxAirPressurePsi: string | null;
  maxInflationPressure: string | null;

  // Measurements
  stdRim: string | null;
  measRimWidth: string | null;
  rimWidthRange: string | null;
  sidewall: string | null;
  approvedRimContours: string | null;
  staticLoadRadiusIn: string | null;
  staticLoadRadiusMm: string | null;
  theoreticalRollingRadius: string | null;
  revsPerMile: string | null;

  // Tread
  treadDepth: string | null;
  treadDepth32nds: string | null;
  treadDepthIn: string | null;
  treadDepthMm: string | null;
  treadWidth: string | null;

  // Ratings
  utqg: string | null;
  mileageWarranty: string | null;
};

export type TWheelProduct = TInventoryBase & {
  // Bolt pattern
  boltPattern1: string | null;
  boltPattern2: string | null;
  blankBoltPatterns: string | null;
  centerbore: string | null;

  // Wheel dimensions
  wheelDiameter: string | null;
  wheelWidth: string | null;
  wheelSize: string | null;
  offset: string | null;
  backspacing: string | null;
  lipSize: string | null;

  // Load
  loadRating: string | null;
  maxLoadKg: string | null;
  maxLoadLbs: string | null;
  maxLoad2Kg: string | null;
  maxLoad2Lbs: string | null;

  // Finish
  finish: string | null;
  finishType: string | null;
  style: string | null;
  designType: string | null;

  // Forging
  forgingBasedImages: string | null;
  forgingStyle: string | null;

  // Build
  buildAvailable: string | null;
  dually: string | null;

  // Addon
  steeringWheelAddonOptions1: string | null;
  steeringWheelAddonOptions2: string | null;
  steeringWheelAddonOptions3: string | null;
};

export type TInventoryItem = TTireProduct | TWheelProduct;

export type TInventoryListItem = TInventoryBase & {
  inventoryId: string | null;
  itemImage: string | null;
  pricingId: string | null;
  inventory: TInventoryBase['id'] | null;
  pricing: TInventoryBase['sellingPrice'] | null;
};
