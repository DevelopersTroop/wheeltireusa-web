import { s3BucketUrl } from '@/utils/api';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function normalizeImageUrl(imageUrl: string | undefined) {
  if (!imageUrl?.length) {
    return '/tire-not-available.png';
  }
  if (imageUrl.startsWith('https') || imageUrl.startsWith('http')) {
    return imageUrl;
  }
  return `${s3BucketUrl}/${imageUrl}`;
}
