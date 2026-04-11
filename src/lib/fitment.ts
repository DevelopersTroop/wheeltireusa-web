import { DRDVehicleDataNAResponse, DRUpstepWheel, FitmentVehicleDetails } from "./fitment-api";
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
