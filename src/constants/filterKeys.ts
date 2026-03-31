/**
 * Centralized mapping of filter keys to user-friendly titles.
 * This ensures consistency across the application and makes it easy
 * to update filter labels in one place.
 */
export const FILTER_KEY_TITLES: Record<string, string> = {
  // Price
  price: "Price Range",

  // Wheel filters
  wheelDiameter: "Wheel Diameter",
  wheelWidth: "Wheel Width",
  color: "Color",
  brand: "Brand",
  model: "Model",
  boltPatterns: "Bolt Pattern",
  offset: "Wheel Offset",
  backspacing: "Backspacing",
  loadRating: "Load Rating",
  centerBore: "Center Bore",
  wheelMaterial: "Wheel Material",
  wheelStructure: "Wheel Structure",

  // Tire filters
  tireDiameter: "Tire Diameter",
  tireWidth: "Tire Width",
  tireRatio: "Aspect Ratio",
  tireType: "Tire Type",
  loadIndex: "Load Index",
  speedRating: "Speed Rating",
  tireSize: "Tire Size",
  loadRange: "Load Range",
  mileageWarranty: "Mileage Warranty",
  terrain: "Terrain",
  sidewall: "Sidewall",
  ply: "Ply",

  // Accessories
  category: "Category",

  // Sort
  sort: "Sort By",
};

/**
 * Convert a camelCase or snake_case key into a human-readable title.
 * "wheelDiameter" → "Wheel Diameter"
 * "bolt_pattern_metric" → "Bolt Pattern Metric"
 * "boltPatterns" → "Bolt Patterns"
 */
function formatKeyToTitle(key: string): string {
  return key
    // insert a space before each uppercase letter in camelCase
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    // replace underscores with spaces
    .replace(/_/g, " ")
    // capitalize each word
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Get the user-friendly title for a filter key.
 * Returns the mapped title if defined, otherwise falls back to
 * auto-formatting the key using formatKeyToTitle.
 *
 * @param key - The filter key (e.g., "wheelDiameter", "color")
 * @returns The user-friendly title for the filter key
 */
export function getFilterKeyTitle(key: string): string {
  return FILTER_KEY_TITLES[key] || formatKeyToTitle(key);
}
