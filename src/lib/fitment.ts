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
