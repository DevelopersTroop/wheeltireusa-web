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
  _id: string;
  item_class?: string;
  slug: string;
  distributorName?: string;
  model_group?: string;
  brand?: string;
  forging_series?: string[];
  msrp?: number;
  price?: number;
  map?: number;
  inventory_available?: number;
  item_image?: string;
  title?: string;
  tire_size?: string;
  tire_type?: string[];
  renderedImages?: string[];
  images?: string[];
  aspect_ratio?: string;
  class?: string;
  description: string;
  diameter?: string;
  gtin?: string;
  load_index?: string;
  m_s?: string;
  max_load_2_kg?: string;
  max_load_2_lbs?: string;
  overall_dia_in?: string;
  overall_dia_mm?: string;
  partnumber: string;
  pr_lr?: string;
  run_flat?: string;
  section_width_in?: string;
  section_width_mm?: string;
  static_load_radius_in?: string;
  static_load_radius_mm?: string;
  theoretical_rolling_radius?: string;
  tire_class?: string;
  tire_origin?: string;
  tread_depth_in?: string;
  tread_pattern?: string;
  tread_width?: string;
  utqg?: string;
  vehicle_category?: string;
  width?: string;
  serviceDescription?: string;
  eco_focus?: string;
  createdBy?: string | null;
  createdAt?: string;
  updatedAt?: string;
  comparedData?: unknown[];
  category?: TCategory;
};
export type TInventoryItem = TInventoryBase & {
  model?: string;
  image_url?: string;
  original_image?: string;
  sidewall?: string;
  load_rating?: string;
  raw_size?: string;
  ship_weight?: string;
  ship_width?: string;
  ship_height?: string;
  ship_depth?: string;
  spoke_style?: string[];
  speed_rating?: string;
  ply?: string;
  approved_rim_contours?: string;
  tread_depth_mm?: string;
  std_rim?: string;
  sort_price?: number;
  max_air_pressure_kpa?: string;
  max_air_pressure_psi?: string;
  imageUploaded?: boolean;
  transferImage?: boolean;
  categoryId?: string;
  stock_available?: boolean;
  load_range?: string;
  hazard_protection?: string;
  max_inflaction_pressure?: string;
  rim_width?: string;
  meas_rim_width?: string;
  revs_per_mile?: string;
  tire_weight?: string;
  country_of_origin?: string;
  inventoryId?: {
    _id: string;
    internal_id: string;
    partnumber: string;
    availability: {
      atlanta_available: number;
      dallas_available: number;
      decatur_available: number;
      fresno_available: number;
      miami_available: number;
      tampa_available: number;
      total_available: number;
    };
  };
  pricingId?: {
    _id: string;
    internal_id: string;
    partnumber: string;
    pricing: {
      price: number;
      msrp: number;
      map: number;
    };
  };
  // inventoryId?: string;
  item_image?: string;
  // pricingId?: string;
  inventory?: TInventoryItem['inventoryId'];
  pricing?: TInventoryItem['pricingId'];
};

export type TInventoryListItem = TInventoryBase & {
  inventoryId?: string;
  item_image?: string;
  pricingId?: string;
  inventory?: TInventoryItem['inventoryId'];
  pricing?: TInventoryItem['pricingId'];
};
