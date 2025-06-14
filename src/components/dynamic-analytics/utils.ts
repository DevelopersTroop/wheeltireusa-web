export function findParentLink(
  clickedLink: HTMLAnchorElement
): HTMLAnchorElement | null {
  try {
    if (!clickedLink) return null;

    // Directly use the pattern from your original code
    // parentNode→parentNode→parentNode→firstChild pattern
    const parent1 = clickedLink.parentNode;
    if (!parent1) return null;

    const parent2 = parent1.parentNode;
    if (!parent2) return null;

    const parent3 = parent2.parentNode;
    if (!parent3) return null;

    const firstChild = parent3.firstChild as HTMLElement;

    // Check if the firstChild is an anchor element
    if (firstChild && firstChild.tagName === 'A') {
      return firstChild as HTMLAnchorElement;
    }

    return null;
  } catch (error) {
    console.error('Error finding parent link:', error);
    return null;
  }
}

export function findFilterElement(
  element: HTMLElement | Element | null
): HTMLElement | null {
  if (!element) {
    return null;
  }

  let current: Element | null = element.parentElement;

  while (current) {
    if (current.id === 'filter') {
      return element as HTMLElement; // The original element has a 'filter' ancestor
    }
    current = current.parentElement;
  }

  return null; // No ancestor with id 'filter' found
}

export function isDescendantOfFilter(target: HTMLElement | Element | null): {
  filter: boolean;
  elem: Element | null;
} {
  if (!target) {
    return {
      filter: false,
      elem: null,
    };
  }

  const filterElement = document.getElementById('filter');

  if (!filterElement) {
    console.warn('Element with id "filter" not found in the DOM.');
    return {
      filter: false,
      elem: target,
    };
  }

  let current: Node | null = target;

  while (current) {
    if (current === filterElement) {
      return {
        filter: true,
        elem: target,
      }; // The target is a descendant of the 'filter' element
    }
    current = current.parentNode;
  }

  return {
    filter: false,
    elem: target,
  }; // The target is not a descendant of the 'filter' element
}

export function findAncestorWithFirstChildButton(
  target: HTMLElement | null | Element | undefined
): HTMLElement | null {
  if (!target) {
    return null;
  }

  let current: Element | null = target;

  while (current) {
    if (current.firstElementChild?.tagName?.toLowerCase() === 'button') {
      return current instanceof HTMLElement
        ? current
        : (current as HTMLElement);
    }
    current = current.parentElement;
  }

  return null; // No ancestor found whose first child is a button
}
export const normalize = (text: string | undefined | null): string => {
  if (!text) return '';

  return text
    .normalize('NFD') // Normalize accents
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^a-zA-Z0-9]+/g, '-') // Replace non-alphanumeric with dash
    .replace(/^-+|-+$/g, '') // Trim leading/trailing dashes
    .toLowerCase();
};

export function isMobileMenuDescandant(
  target: HTMLElement | null | Element | undefined
): boolean {
  if (!target) {
    return false;
  }
  let current: Element | null = target;

  while (current) {
    if (current.classList.contains('bm-menu-wrap')) {
      return current instanceof HTMLElement ? true : true;
    }
    current = current.parentElement;
  }
  return false;
}
