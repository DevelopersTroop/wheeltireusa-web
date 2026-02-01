import { TInventoryItem } from "@/types/product";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Each package is keyed by its ID
type IState = {
  [packageId: string]: {
    wheel?: TInventoryItem;
    tire?: TInventoryItem;
  };
};

type TPackageItem = TInventoryItem & { cartPackage: string };

type PackagePayload = {
  packageId: string;
  wheel?: TPackageItem;
  tire?: TPackageItem;
};

const initialState: IState = {};

const packageSlice = createSlice({
  name: "package",
  initialState,
  reducers: {
    // Add or update a package
    addPackage: (state, action: PayloadAction<PackagePayload>) => {
      const { packageId, wheel, tire } = action.payload;

      // Initialize the package entry if not present
      if (!state[packageId]) {
        state[packageId] = {};
      }

      // Only update provided fields (allows partial updates)
      if (wheel !== undefined) {
        state[packageId].wheel = wheel;
      }

      if (tire !== undefined) {
        state[packageId].tire = tire;
      }
    },

    // Optionally: remove a package entirely
    removePackage: (state, action: PayloadAction<string>) => {
      const packageId = action.payload;
      delete state[packageId];
    },

    // Optionally: clear all packages
    clearPackages: () => {
      return {};
    },
  },
});

export const { addPackage, removePackage, clearPackages } =
  packageSlice.actions;
export default packageSlice.reducer;
