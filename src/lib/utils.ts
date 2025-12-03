import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isMdScreenOrBigger(): boolean {
  if (typeof window !== 'undefined') {
    // Can't evaluate on server-side
    return window.matchMedia('(min-width: 48rem)').matches;
  }

  return false;
}

export function isLgScreenOrBigger(): boolean {
  if (typeof window === 'undefined') {
    // Can't evaluate on server-side
    return false;
  }

  return window.matchMedia('(min-width: 64rem)').matches;
}

export function parseTireSize(size: string) {
  const regex = /^(\d{3})\/(\d{2})R(\d{2})$/i;
  const match = size.match(regex);

  if (!match) {
    throw new Error('Invalid tire size format');
  }

  return {
    width: parseInt(match[1], 10).toString(), // 305
    ratio: parseInt(match[2], 10).toString(), // 35
    diameter: parseInt(match[3], 10).toString(), // 24
  };
}
export function removeDuplicateDataWithRemovingFloatingPoint(data: string[]) {
  const uniqueData: number[] = [];
  for (const datum of data) {
    if (parseFloat(datum)) {
      uniqueData.push(Math.floor(parseFloat(datum)));
    }
  }
  return Array.from(new Set(uniqueData));
}