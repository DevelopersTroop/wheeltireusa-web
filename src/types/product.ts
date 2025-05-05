export type TInventoryItem = {
  internal_id?: {
    text: string;
    value: string;
  };
  name?: string;
  title?: string;
  item_type?: {
    text: string;
    value: string;
  };
  item_class?: {
    text: string;
    value: string;
  };
  brand?: {
    text: string;
    value: string;
  };
  model_group?: {
    text: string;
    value: string;
  };
  category?: {
    text: string;
    value: string;
  };
  forging_style?: string;
  wheel_size?: string;
  wheel_diameter?: string;
  wheel_width?: string;
  finish?: string;
  lip_size?: string;
  offset?: string;
  bolt_pattern_1?: string;
  bolt_pattern_2?: string;
  centerbore?: string;
  load_rating?: string;
  xfactor?: string;
  yfactor?: string;
  backspacing?: string;
  raw_size?: string;
  tire_width?: string;
  tire_aspect_ratio?: string;
  tire_diameter?: string;
  ship_weight?: string;
  ship_width?: string;
  ship_height?: string;
  ship_depth?: string;
  purchase_description?: string;
  short_description?: string;
  item_image?: string;
  msrp?: string;
  price?: string;
  inventory_available?: string;
  build_available?: string;
  steering_wheel_addon_options_1?: string;
  steering_wheel_addon_options_2?: string;
  steering_wheel_addon_options_3?: string;
  terrain?: {
    text: string;
    value: string;
  };
  blank_bolt_patterns?: string;
  design_type?: string;
  style?: string;
  dually?: boolean;
  finish_type?: string;
  suspension_type?: string;
  tire_type?: {
    text: string;
    value: string;
  }[];
  speed_rating?: string;
  sidewall?: {
    text: string;
    value: string;
  };
  tire_load_index?: string;
  tire_max_load_lbs?: string;
  tire_max_load_lbs_2?: string;
  tire_max_load_kg?: string;
  tire_max_load_kg_2?: string;
  ply?: string;
  approved_rim_contours?: string;
  tread_depth_32nds?: string;
  tread_depth_mm?: string;
  std_rim?: string;
  max_air_pressure_kpa?: string;
  max_air_pressure_psi?: string;
  tire_size?: string;
  seo_description?: string;
  front_size?: string;
  rear_size?: string;
  front_diameter?: string;
  front_width?: string;
  rear_diameter?: string;
  rear_width?: string;
  dealer_price?: string;
};
