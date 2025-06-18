import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isMdScreenOrBigger(): boolean {
  if (typeof window === 'undefined') {
    // Can't evaluate on server-side
    return false;
  }

  return window.matchMedia('(min-width: 48rem)').matches;
}

export function isLgScreenOrBigger(): boolean {
  if (typeof window === 'undefined') {
    // Can't evaluate on server-side
    return false;
  }

  return window.matchMedia('(min-width: 64rem)').matches;
}
