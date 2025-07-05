// Type definition for the props expected by QuantityInput component
export type QuantityInputProps = {
  name: string;
  inventoryAvailable: number;
  id: string;
  className?: string;
  [props: string]: unknown;
};

// Calculate the maximum quantity based on available inventory
export const getMaxQuantity = (inventoryAvailable: number) => {
  return inventoryAvailable === -1
    ? Infinity
    : Math.floor(inventoryAvailable / 1) * 1;
};
