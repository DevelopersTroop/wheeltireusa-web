import { FitmentVehicleDetails } from "./fitment-api";
export type WheelAxleFitment = {
  boltPattern: string;
  centerBore: number;
  lugType: string;
  lugSize: string;

  widthMin: number;
  widthMax: number;

  diameterMin: number;
  diameterMax: number;

  stockOffset: number;
};

export type NormalizedWheelFitment = {
  front: WheelAxleFitment;
  rear: WheelAxleFitment;
};
export function normalizeWheelFitment(
  vehicle?: FitmentVehicleDetails
): NormalizedWheelFitment | null {
  if(!vehicle)
    return null
  // ---------- helpers ----------
  const toNumber = (val: string | number | undefined | null): number => {
    if (val === undefined || val === null || val === "") {
      throw new Error("Missing numeric fitment value");
    }

    const num = Number(val);
    if (Number.isNaN(num)) {
      throw new Error(`Invalid numeric value: ${val}`);
    }

    return num;
  };

  const requiredString = (val: string | undefined | null): string => {
    if (!val) {
      throw new Error("Missing required string fitment value");
    }
    return val;
  };

  // ---------- FRONT ----------
  const front: WheelAxleFitment = {
    boltPattern: requiredString(vehicle.boltpattern),
    centerBore: toNumber(vehicle.hub),
    lugType: requiredString(vehicle.lugType),
    lugSize: requiredString(vehicle.lugSize),

    widthMin: toNumber(vehicle.wheelWidthMin),
    widthMax: toNumber(vehicle.wheelWidthMax),

    diameterMin: toNumber(vehicle.wheelDiameterMin),
    diameterMax: toNumber(vehicle.wheelDiameterMax),

    stockOffset: toNumber(vehicle.stockOffset)
  };

  // ---------- detect REAR existence ----------
  const hasRear =
    vehicle.wheelWidthMinRear ||
    vehicle.wheelWidthMaxRear ||
    vehicle.wheelDiameterMinRear ||
    vehicle.wheelDiameterMaxRear ||
    vehicle.stockWheelDiameterRear;

  let rear: WheelAxleFitment;

  if (hasRear) {
    rear = {
      boltPattern: requiredString(vehicle.boltpattern),
      centerBore: toNumber(vehicle.hub),
      lugType: requiredString(vehicle.lugType),
      lugSize: requiredString(vehicle.lugSize),

      widthMin: toNumber(vehicle.wheelWidthMinRear),
      widthMax: toNumber(vehicle.wheelWidthMaxRear),

      diameterMin: toNumber(vehicle.wheelDiameterMinRear),
      diameterMax: toNumber(vehicle.wheelDiameterMaxRear),

      stockOffset: toNumber(vehicle.stockOffset) // if rear offset differs, add separate field later
    };
  } else {
    // Square setup → clone front
    rear = { ...front };
  }

  return { front, rear };
}