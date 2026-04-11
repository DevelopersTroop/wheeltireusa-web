import { DRDVehicleDataNAResponse, DRUpstepWheel, FitmentVehicleDetails } from "./fitment-api";
import { TYmmVehicleInformation } from "@/types/ymm";
export type WheelAxleFitment = {
  boltPattern: string;
  centerBore: number;
  loadRating: number;
  wheelDiameter: number;
  wheelWidth: number;
  minOffset: number;
  maxOffset: number;
  compatibility: "Front" | "Rear" | "Front and Rear"
};



export type NormalizedWheelFitment = {
  front: WheelAxleFitment[];
  rear: WheelAxleFitment[];
};

/** A single tire fitment entry extracted from the vehicle's guaranteed recommendations */
export type TireFitmentEntry = {
  tireSize: string;
  loadIndex: string;
  maxSpeedMPH: string;
};

/** The normalized set of tire fitment data for a selected vehicle */
export type NormalizedTireFitment = {
  entries: TireFitmentEntry[];
};

/** Check types that can fail during tire fitment validation */
export type TireFitmentCheckType =
  | "tireSize"
  | "loadIndex"
  | "speedRating"
  | "missingData";

/** Result type returned by validateTireFitment */
export type TireFitmentValidationResult = {
  isCompatible: boolean;
  matchingEntry: TireFitmentEntry | null;
  failedChecks: TireFitmentCheckType[];
  activeVehicle: {
    year: string;
    make: string;
    model: string;
    trim?: string;
    drive?: string;
  } | null;
};
export function normalizeWheelFitment(
  vehicle?: DRDVehicleDataNAResponse | null,
  wheelTire?: DRUpstepWheel[] | null
): NormalizedWheelFitment | null {
  if(!vehicle )
    return null
  if(!wheelTire)
    return null
  
  const front: WheelAxleFitment[] = []
  const rear: WheelAxleFitment[] = []

  const chassis = vehicle.DRDChassisReturn_NA
  const boltPattern = String(chassis.PCD ?? '').trim()
  const centerBoreFront = parseFloat(String(chassis.CenterBore ?? '').trim() || '0')
  const centerBoreRearRaw = String(chassis.CenterBore_R ?? '').trim()
  const centerBoreRear = parseFloat(centerBoreRearRaw || String(centerBoreFront))
  const loadRating = parseFloat(String(chassis.WheelLoad_Max_Lbs ?? '').trim() || '0')

  console.log("wheelTire", wheelTire)

  for (const item of wheelTire) {
    if (!item || typeof item !== 'object') continue
    const sizeText = String(item.WheelSize ?? '').toLowerCase()
    if (!sizeText.includes('x')) continue

    // Parse "6.5 x 16" -> [6.5, 16]
    const parts = sizeText.split('x').map((p) => parseFloat(p.trim()))
    if (parts.length < 2 || Number.isNaN(parts[0]) || Number.isNaN(parts[1])) continue
    const a = parts[0]
    const b = parts[1]
    const wheelDiameter = Math.max(a, b)
    const wheelWidth = Math.min(a, b)

    const minOffset = Number(item.MinOffset ?? 0)
    const maxOffset = Number(item.MaxOffset ?? 0)

    const fitmentFront: WheelAxleFitment = {
      boltPattern,
      centerBore: centerBoreFront || centerBoreRear || 0,
      loadRating,
      wheelDiameter,
      wheelWidth,
      minOffset: minOffset - 10, // make aggressive
      maxOffset: maxOffset + 10, // make aggressive
      compatibility: 'Front',
    }
    const fitmentRear: WheelAxleFitment = {
      boltPattern,
      centerBore: centerBoreRear || centerBoreFront || 0,
      loadRating,
      wheelDiameter,
      wheelWidth,
      minOffset: minOffset - 10, // make aggressive
      maxOffset: maxOffset + 10, // make aggressive
      compatibility: 'Rear',
    }

    const type = String(item.UpstepType ?? '').trim()
    if (type === 'FrontUpstep') {
      front.push(fitmentFront)
    } else if (type === 'RearUpstep') {
      rear.push(fitmentRear)
    } else {
      // "Upstep" or unspecified => applies to both
      front.push({ ...fitmentFront, compatibility: 'Front and Rear' })
      rear.push({ ...fitmentRear, compatibility: 'Front and Rear' })
    }
  }
  return { front, rear }
}

/**
 * Extract and normalize tire fitment data from vehicle information.
 * Searches for "Guaranteed" entries in the tire_fitment recommendations tree.
 */
export function normalizeTireFitment(
  vehicleInformation?: Partial<TYmmVehicleInformation> | null,
  activeGarageId?: string | null
): NormalizedTireFitment | null {
  if (!vehicleInformation?.boltPattern || !activeGarageId) {
    return null;
  }

  const recommendations = vehicleInformation.tire_fitment?.recommendations ?? {};
  const entries: TireFitmentEntry[] = [];
  const seen = new Set<string>();

  const addItems = (node: unknown) => {
    if (!Array.isArray(node)) return;
    for (const item of node) {
      if (!item || typeof item !== 'object') continue;
      const record = item as Record<string, unknown>;
      const tireSize = String(record.tireSize ?? '').trim();
      const loadIndex = String(record.tireMaxLoadRating ?? '').trim();
      const maxSpeedMPH = String(record.maxTireSpeedMPH ?? '').trim();
      if (!tireSize || !loadIndex || !maxSpeedMPH) continue;
      const key = `${tireSize}|${loadIndex}|${maxSpeedMPH}`;
      if (seen.has(key)) continue;
      seen.add(key);
      entries.push({ tireSize, loadIndex, maxSpeedMPH });
    }
  };

  const visitGuaranteed = (node: unknown) => {
    if (!node || typeof node !== 'object') return;
    const record = node as Record<string, unknown>;
    for (const [key, value] of Object.entries(record)) {
      if (key === 'Guaranteed') {
        addItems(value);
      } else if (value && typeof value === 'object') {
        visitGuaranteed(value);
      }
    }
  };

  visitGuaranteed(recommendations);

  return entries.length > 0 ? { entries } : null;
}

/**
 * Standard speed rating letter to MPH lookup table
 */
const SPEED_RATING_MPH: Record<string, number> = {
  A1: 3, A2: 6, A3: 7, A4: 12, A5: 16, A6: 19, A7: 22, A8: 25,
  B: 31, C: 37, D: 40, E: 43, F: 50, G: 56, J: 62, K: 68,
  L: 75, M: 81, N: 87, P: 93, Q: 99, R: 106, S: 112, T: 118,
  U: 124, H: 130, V: 149, W: 168, Y: 186, "(Y)": 186, Z: 149,
};

/**
 * Validate tire fitment against vehicle requirements.
 * A tire fits if for ANY fitment entry:
 *   product.tireSize === entry.tireSize
 *   AND product.loadIndex >= entry.loadIndex
 *   AND speed rating MPH >= entry.maxSpeedMPH
 */
export function validateTireFitment(
  product: {
    tireSize: string | null;
    loadIndex: string | null;
    speedRating: string | null;
  },
  normalizedFitment: NormalizedTireFitment | null,
  activeVehicle?: {
    year: string;
    make: string;
    model: string;
    trim?: string;
    drive?: string;
  } | null
): TireFitmentValidationResult {
  if (!normalizedFitment || !activeVehicle) {
    return {
      isCompatible: false,
      matchingEntry: null,
      failedChecks: ["missingData"],
      activeVehicle: null,
    };
  }

  const failedChecks: TireFitmentCheckType[] = [];

  // Check for missing required product data (only tireSize is required for now)
  if (!product.tireSize) {
    failedChecks.push("tireSize");
  }
  // if (!product.loadIndex) {
  //   failedChecks.push("loadIndex");
  // }

  if (failedChecks.length > 0) {
    return {
      isCompatible: false,
      matchingEntry: null,
      failedChecks,
      activeVehicle,
    };
  }

  // const productLoadIndex = parseFloat(product.loadIndex!);
  // const hasSpeedRating = !!product.speedRating;
  // const productSpeedMPH = hasSpeedRating ? (SPEED_RATING_MPH[product.speedRating!] ?? 0) : 0;

  // Find first matching entry
  let matchingEntry: TireFitmentEntry | null = null;

  for (const entry of normalizedFitment.entries) {
    const sizeMatch = product.tireSize === entry.tireSize;
    // const loadMatch = productLoadIndex >= parseFloat(entry.loadIndex);
    // const speedMatch = !hasSpeedRating || productSpeedMPH >= parseFloat(entry.maxSpeedMPH);

    if (sizeMatch /* && loadMatch && speedMatch */) {
      matchingEntry = entry;
      break;
    }
  }

  // If no match, determine which checks failed
  if (!matchingEntry) {
    const hasSizeMatch = normalizedFitment.entries.some(
      (e) => product.tireSize === e.tireSize
    );
    if (!hasSizeMatch) {
      failedChecks.push("tireSize");
    }

    // const hasLoadMatch = normalizedFitment.entries.some(
    //   (e) => productLoadIndex >= parseFloat(e.loadIndex)
    // );
    // if (!hasLoadMatch) {
    //   failedChecks.push("loadIndex");
    // }

    // // Only check speed rating if the product has one
    // if (hasSpeedRating) {
    //   const hasSpeedMatch = normalizedFitment.entries.some(
    //     (e) => productSpeedMPH >= parseFloat(e.maxSpeedMPH)
    //   );
    //   if (!hasSpeedMatch) {
    //     failedChecks.push("speedRating");
    //   }
    // }
  }

  return {
    isCompatible: matchingEntry !== null,
    matchingEntry,
    failedChecks,
    activeVehicle,
  };
}

/**
 * Safely parse a string to number, handling null/empty/invalid values
 */
export function parseSafeNumber(value: string | null | undefined): number | null {
  if (value === null || value === undefined) {
    return null;
  }
  const stringValue = String(value).trim();
  if (stringValue === '') {
    return null;
  }
  const parsed = parseFloat(stringValue);
  return isNaN(parsed) ? null : parsed;
}

/**
 * Determine compatibility from matching fitments
 */
export function determineCompatibility(
  fitments: WheelAxleFitment[]
): "Front" | "Rear" | "Front and Rear" | null {
  if (fitments.length === 0) {
    return null;
  }

  const hasFrontAndRear = fitments.some(f => f.compatibility === "Front and Rear");
  if (hasFrontAndRear) {
    return "Front and Rear";
  }

  const hasFront = fitments.some(f => f.compatibility === "Front");
  const hasRear = fitments.some(f => f.compatibility === "Rear");

  if (hasFront && hasRear) {
    return "Front and Rear";
  } else if (hasFront) {
    return "Front";
  } else if (hasRear) {
    return "Rear";
  }

  return fitments[0]?.compatibility ?? null;
}

/**
 * Failed check types for fitment validation
 */
export type FitmentCheckType =
  | "boltPattern"
  | "centerBore"
  | "loadRating"
  | "offset"
  | "wheelSize"
  | "missingData";

/**
 * Result type for wheel fitment validation
 */
export type WheelFitmentValidationResult = {
  isCompatible: boolean;
  compatibility: "Front" | "Rear" | "Front and Rear" | null;
  matchingFitments: WheelAxleFitment[];
  failedChecks: FitmentCheckType[];
  activeVehicle: {
    year: string;
    make: string;
    model: string;
    trim?: string;
    drive?: string;
  } | null;
};

/**
 * Validate wheel fitment against vehicle requirements
 */
export function validateWheelFitment(
  product: {
    boltPatterns: string[] | null;
    centerBore: string | null;
    offset: string | null;
    wheelDiameter: string | null;
    wheelWidth: string | null;
    maxLoadLbs: string | null;
  },
  normalizedFitment: NormalizedWheelFitment | null,
  activeVehicle?: {
    year: string;
    make: string;
    model: string;
    trim?: string;
    drive?: string;
  } | null
): WheelFitmentValidationResult {
  // Early return if no fitment data or no active vehicle
  if (!normalizedFitment || !activeVehicle) {
    return {
      isCompatible: false,
      compatibility: null,
      matchingFitments: [],
      failedChecks: ["missingData"],
      activeVehicle: null,
    };
  }

  // Parse product specifications
  const productSpecs = {
    boltPatterns: product.boltPatterns,
    centerBore: parseSafeNumber(product.centerBore),
    offset: parseSafeNumber(product.offset),
    wheelDiameter: parseSafeNumber(product.wheelDiameter),
    wheelWidth: parseSafeNumber(product.wheelWidth),
    maxLoadLbs: parseSafeNumber(product.maxLoadLbs),
  };

  // Combine front and rear fitments for filtering
  const allFitments = [...normalizedFitment.front, ...normalizedFitment.rear];

  // Track which checks failed for any fitment
  const failedChecks: FitmentCheckType[] = [];

  // Check for missing product data
  if (!productSpecs.boltPatterns || productSpecs.boltPatterns.length === 0) {
    failedChecks.push("boltPattern");
  }
  if (productSpecs.centerBore === null) {
    failedChecks.push("centerBore");
  }
  // Load rating check disabled
  // if (productSpecs.maxLoadLbs === null) {
  //   failedChecks.push("loadRating");
  // }
  if (productSpecs.offset === null) {
    failedChecks.push("offset");
  }
  if (productSpecs.wheelDiameter === null || productSpecs.wheelWidth === null) {
    failedChecks.push("wheelSize");
  }

  // If any product specs are missing, return early
  if (failedChecks.length > 0) {
    return {
      isCompatible: false,
      compatibility: null,
      matchingFitments: [],
      failedChecks,
      activeVehicle,
    };
  }

  // Apply filtering algorithm and track specific failures
  const matchingFitments = allFitments.filter(fitment => {
    // 1. Bolt pattern match
    if (!productSpecs.boltPatterns!.includes(fitment.boltPattern)) {
      return false;
    }

    // 2. Center bore (fitment centerBore <= product centerBore)
    if (fitment.centerBore > productSpecs.centerBore!) {
      return false;
    }

    // 3. Load rating (fitment loadRating <= product loadRating) - DISABLED
    // if (fitment.loadRating > productSpecs.maxLoadLbs!) {
    //   return false;
    // }

    // 4. Offset (product offset between minOffset and maxOffset)
    if (productSpecs.offset! < fitment.minOffset ||
        productSpecs.offset! > fitment.maxOffset) {
      return false;
    }

    // 5. Wheel diameter AND width (both must match exactly)
    if (productSpecs.wheelDiameter! !== fitment.wheelDiameter ||
        productSpecs.wheelWidth! !== fitment.wheelWidth) {
      return false;
    }

    return true;
  });

  // If no match, determine which checks failed
  if (matchingFitments.length === 0) {
    // Check each fitment to see which checks pass for at least one
    const hasBoltPatternMatch = allFitments.some(f =>
      productSpecs.boltPatterns!.includes(f.boltPattern)
    );
    if (!hasBoltPatternMatch) {
      failedChecks.push("boltPattern");
    }

    const hasCenterBoreMatch = allFitments.some(f =>
      f.centerBore <= productSpecs.centerBore!
    );
    if (!hasCenterBoreMatch) {
      failedChecks.push("centerBore");
    }

    // Load rating check disabled
    // const hasLoadRatingMatch = allFitments.some(f =>
    //   f.loadRating <= productSpecs.maxLoadLbs!
    // );
    // if (!hasLoadRatingMatch) {
    //   failedChecks.push("loadRating");
    // }

    const hasOffsetMatch = allFitments.some(f =>
      productSpecs.offset! >= f.minOffset && productSpecs.offset! <= f.maxOffset
    );
    if (!hasOffsetMatch) {
      failedChecks.push("offset");
    }

    const hasSizeMatch = allFitments.some(f =>
      productSpecs.wheelDiameter! === f.wheelDiameter &&
      productSpecs.wheelWidth! === f.wheelWidth
    );
    if (!hasSizeMatch) {
      failedChecks.push("wheelSize");
    }
  }

  // Determine compatibility based on matching fitments
  const compatibility = matchingFitments.length > 0
    ? determineCompatibility(matchingFitments)
    : null;

  return {
    isCompatible: matchingFitments.length > 0,
    compatibility,
    matchingFitments,
    failedChecks,
    activeVehicle,
  };
}
