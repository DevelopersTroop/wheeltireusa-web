'use client';
import { TCartProduct } from '@/redux/features/cartSlice';
import { TInventoryItem, TTireSpec } from '@/types/product';
import { TWishListData } from '@/types/wishlist';
import { s3BucketUrl } from './api';
import allTireSizes from '../../public/data/tireSizes.json';
import { addDays, format } from 'date-fns';

export const isInventoryItem = (
  product: TInventoryItem | TCartProduct | TWishListData
): product is TInventoryItem => {
  return 'imageUrl' in product;
};

export const isWishListData = (
  product: TInventoryItem | TCartProduct | TWishListData
): product is TWishListData => {
  return 'imageUrl' in product;
};

export const getProductThumbnail = (product: { itemImage?: string | null }) => {
  if (!product || (product && !product?.itemImage)) {
    return '/images/not-available.webp';
  }
  if (
    product.itemImage?.startsWith('https') ||
    product.itemImage?.startsWith('http')
  ) {
    return product.itemImage;
  }
  return `${s3BucketUrl}/${product?.itemImage}`;
};
export const getProductDeliveryDate = (product: TInventoryItem) => {
  if (!product) {
    return 'N/A';
  }
  return format(addDays(new Date(), 5), 'd MMMM, yyyy');
};
export function matchMetricTireSize(tireSize: string): RegExpMatchArray | null {
  return tireSize.match(/^(\d+)\/(\d+)([A-Z])(\d+)([A-Z+&]+)?$/i);
}

export function matchFlotationTireSize(
  tireSize: string
): RegExpMatchArray | null {
  return tireSize.match(/^([\d.]+)X([\d.]+)([A-Z])([\d.]+)$/i);
}

export function parseTireSpec(tireSize: string): TTireSpec {
  const metricMatch = matchMetricTireSize(tireSize);
  if (metricMatch) {
    const tireWidth = parseInt(metricMatch[1], 10);
    const tireAspectRatio = parseInt(metricMatch[2], 10);
    const tireConstruction = metricMatch[3].toUpperCase();
    const wheelDiameterInch = parseInt(metricMatch[4], 10);

    const sidewallHeightInch = (tireWidth * tireAspectRatio) / 100 / 25.4;
    const tireOverallDiameterInch = parseFloat(
      (2 * sidewallHeightInch + wheelDiameterInch).toFixed(2)
    );
    const plusTireDiameterInch = parseFloat(
      (tireOverallDiameterInch * 1.03).toFixed(2)
    );
    const minusTireDiameterInch = parseFloat(
      (tireOverallDiameterInch * 0.97).toFixed(2)
    );

    return {
      tireWidth,
      tireAspectRatio,
      tireConstruction,
      wheelDiameterInch,
      tireOverallDiameterInch,
      afterMarketTireDiameterRange: {
        plusTireDiameterInch,
        minusTireDiameterInch,
      },
    };
  }

  const flotationMatch = matchFlotationTireSize(tireSize);
  if (flotationMatch) {
    const tireOverallDiameterInch = parseFloat(flotationMatch[1]);
    const tireWidth = parseFloat(flotationMatch[2]);
    const tireConstruction = flotationMatch[3].toUpperCase();
    const wheelDiameterInch = parseFloat(flotationMatch[4]);
    const plusTireDiameterInch = parseFloat(
      (tireOverallDiameterInch * 1.03).toFixed(2)
    );
    const minusTireDiameterInch = parseFloat(
      (tireOverallDiameterInch * 0.97).toFixed(2)
    );

    return {
      tireWidth,
      tireAspectRatio: null,
      tireConstruction,
      wheelDiameterInch,
      tireOverallDiameterInch,
      afterMarketTireDiameterRange: {
        plusTireDiameterInch,
        minusTireDiameterInch,
      },
    };
  }

  return {
    tireWidth: null,
    tireAspectRatio: null,
    tireConstruction: null,
    wheelDiameterInch: null,
    tireOverallDiameterInch: null,
    afterMarketTireDiameterRange: {
      plusTireDiameterInch: null,
      minusTireDiameterInch: null,
    },
  };
}

export function getAllPossibleTireSizes(factoryTireSize: string): string[] {
  const parsedFactoryTireSpec = parseTireSpec(factoryTireSize);
  const allPossibleTireSizes = allTireSizes.filter((tireSize) => {
    const parsedTireSpec = parseTireSpec(tireSize);
    return (
      parsedFactoryTireSpec.afterMarketTireDiameterRange.plusTireDiameterInch &&
      parsedFactoryTireSpec.afterMarketTireDiameterRange
        .minusTireDiameterInch &&
      parsedTireSpec.tireOverallDiameterInch &&
      parsedFactoryTireSpec.afterMarketTireDiameterRange.plusTireDiameterInch >=
        parsedTireSpec.tireOverallDiameterInch &&
      parsedFactoryTireSpec.afterMarketTireDiameterRange
        .minusTireDiameterInch <= parsedTireSpec.tireOverallDiameterInch
    );
  });
  return allPossibleTireSizes;
}

export function isTireAfterMarketTireSizePossible(
  factoryTireSize: string,
  tireSize: string
): boolean {
  const parsedFactoryTireSpec = parseTireSpec(factoryTireSize);
  const parsedTireSpec = parseTireSpec(tireSize);
  console.log('--------------------------------');
  console.log('parsedFactoryTireSpec', factoryTireSize, parsedFactoryTireSpec);
  console.log('parsedTireSpec', tireSize, parsedTireSpec);
  console.log('--------------------------------');
  return Boolean(
    parsedFactoryTireSpec.afterMarketTireDiameterRange.plusTireDiameterInch &&
    parsedFactoryTireSpec.afterMarketTireDiameterRange.minusTireDiameterInch &&
    parsedTireSpec.tireOverallDiameterInch &&
    parsedFactoryTireSpec.afterMarketTireDiameterRange.plusTireDiameterInch >=
      parsedTireSpec.tireOverallDiameterInch &&
    parsedFactoryTireSpec.afterMarketTireDiameterRange.minusTireDiameterInch <=
      parsedTireSpec.tireOverallDiameterInch
  );
}
// for testing
if (typeof window !== 'undefined') {
  window.isTireAfterMarketTireSizePossible = isTireAfterMarketTireSizePossible;
}
