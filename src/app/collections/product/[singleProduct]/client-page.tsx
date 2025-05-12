'use client';

import Tire from './_tires/tire';
import { TInventoryItem } from '@/types/product';

const productData: TInventoryItem = {
  internal_id: {
    text: '31200',
    value: '31200',
  },
  slug: 'amani-allora-26x16-et-101-fully-polished-af-all26168lpb-101fp-fc1',
  name: 'CVPGTS02',
  title: 'Venom Power 245/35ZR20 95W XL Ragnarok GTS',
  item_type: {
    text: 'Inventory Item',
    value: 'InvtPart',
  },
  item_class: {
    text: 'Tire',
    value: '1',
  },
  brand: {
    text: 'Venom Power',
    value: '61',
  },
  model_group: {
    text: 'Ragnarok GTS',
    value: '1786',
  },
  category: {
    text: 'Tire',
    value: '5',
  },
  forging_style: '',
  wheel_size: '',
  wheel_diameter: '',
  wheel_width: '',
  finish: '',
  lip_size: '',
  offset: '',
  bolt_pattern_1: '',
  bolt_pattern_2: '',
  centerbore: '',
  load_rating: 'XL',
  xfactor: '',
  yfactor: '',
  backspacing: '',
  raw_size: '2453520',
  tire_width: '245',
  tire_aspect_ratio: '35',
  tire_diameter: '20',
  ship_weight: '26.9',
  ship_width: '11.22',
  ship_height: '31.22',
  ship_depth: '31.22',
  purchase_description: 'Venom Power 245/35ZR20 95W XL Ragnarok GTS',
  short_description: 'Venom Power 245/35Zr20 95W Xl Ragnarok GTS',
  item_image:
    'https://4520456.app.netsuite.com/core/media/media.nl?id=6534931&c=4520456&h=zAuBhp-uY3AN8asoJeJ-JLf3R-rn2VoL5UARwYphcz2czId_',
  msrp: '.00',
  price: '85.65',
  inventory_available: '100',
  build_available: '',
  steering_wheel_addon_options_1: '',
  steering_wheel_addon_options_2: '',
  steering_wheel_addon_options_3: '',
  terrain: {
    text: 'Street',
    value: '1',
  },
  blank_bolt_patterns: '',
  design_type: '',
  style: '',
  dually: false,
  finish_type: '',
  suspension_type: '',
  tire_type: [
    {
      text: 'Ultra High Performance (UHP)',
      value: '1',
    },
  ],
  speed_rating: 'W',
  sidewall: {
    text: 'BLK',
    value: '101',
  },
  tire_load_index: '95',
  tire_max_load_lbs: '',
  tire_max_load_lbs_2: '',
  tire_max_load_kg: '',
  tire_max_load_kg_2: '',
  ply: '',
  approved_rim_contours: '8.0-9.5',
  tread_depth_32nds: '10.3',
  tread_depth_mm: '',
  std_rim: '8 1/2J',
  max_air_pressure_kpa: '',
  max_air_pressure_psi: '',
  tire_size: '245/35ZR20',
  seo_description: '',
  front_size: '',
  rear_size: '',
  front_diameter: '',
  front_width: '',
  rear_diameter: '',
  rear_width: '',
  dealer_price: '61.21',
};

/**
 * SingleProductClient Component
 * Fetches product details based on the route params and displays the corresponding product component.
 */
const SingleProductClient = ({ singleProduct }: { singleProduct: string }) => {
  console.log('SingleProductClient', singleProduct);
  return <Tire product={productData} />; // Wrap the product component inside the container.
};

export default SingleProductClient;
