'use client';
export function isTextOverflowed(el: HTMLElement | null): boolean {
  if (typeof window === 'undefined') return false;
  if (!el || !(el instanceof HTMLElement)) {
    return false;
  }

  const style = window.getComputedStyle(el);

  // Get overflow directions
  const overflowX = style.overflowX;
  const overflowY = style.overflowY;

  const hasOverflowX = el.scrollWidth > el.clientWidth;
  const hasOverflowY = el.scrollHeight > el.clientHeight;

  // Check if content is clipped in either direction
  const isClippedX = overflowX !== 'visible' && hasOverflowX;
  const isClippedY = overflowY !== 'visible' && hasOverflowY;

  return isClippedX || isClippedY;
}
