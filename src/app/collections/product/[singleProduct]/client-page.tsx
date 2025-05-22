'use client';

import Tire from './_tires/tire';
import { TInventoryItem } from '@/types/product';

const productData: TInventoryItem = {
  internal_id: '680a6da7a29afbb08bef2d4d',
  slug: 'amani-allora-26x16-et-101-fully-polished-af-all26168lpb-101fp-fc1',
  title: 'Amani Allora 26x16 ET -101 Fully Polished',
  brand: 'Amani',
  category: {
    _id: '680a6d4ea29afbb08bef1e84',
    title: 'In-stock, Factory Wheels',
    slug: 'in-stock-factory-wheels',
  },
  bolt_pattern_1: 'Blank 8x',
  finish: 'Polished',
  forging_style: 'Off-Road',
  inventory_available: 4,
  item_image: 'ns-products/jzcptvuhymza_1745522761330.png',
  lip_size: '9.88',
  msrp: 1780.17,
  price: 1483.48,
  model_group: 'Allora',
  wheel_size: '26x16',
  tire_size: '',
  tire_type: [],
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
