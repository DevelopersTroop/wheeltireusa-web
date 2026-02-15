export interface IGallery {
  _id?: string;

  // Basic Info
  title?: string;
  slug?: string;
  subtitle?: string;
  description?: string;
  shortDescription?: string;
  thumbnail?: string;

  // User Info (from step 5)
  name?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  instagram?: string;

  // Vehicle Info (from step 1)
  buildUsername: string;
  vehicleType: string;
  year: string;
  make: string;
  model: string;
  liftHeight?: string;
  driveType?: string;
  engine?: string;
  fuelType?: string;
  bodyType?: string;
  doorsNumber?: string;
  bedLength?: string;

  // Wheels (from step 2)
  stockWheels?: boolean;
  wheelBrand?: string;
  wheelModel?: string;
  wheelSize?: string;
  wheelWidth?: string;
  wheelOffset?: string;
  wheelDiameter?: string;
  wheelTitle?: string;
  wheelFront?: string;
  wheelFrontOffset?: string;
  wheelFrontBackspacing?: string;
  wheelRear?: string;
  wheelRearOffset?: string;
  wheelRearBackspacing?: string;
  wheelProduct?: string;

  // Spacers
  spacers?: string;
  frontWheelSpacers?: string;
  rearWheelSpacers?: string;

  // Tires (from step 2)
  stockTires?: boolean;
  tireBrand?: string;
  tireModel?: string;
  tireSize?: string;
  tireWidth?: string;
  tireHeight?: string;
  tireTitle?: string;
  tireFront?: string;
  tireRear?: string;
  tireProduct?: string;

  // Suspension
  suspensionBrand?: string;
  suspension?: string;
  suspensionProduct?: string;

  // Additional Info (from step 2)
  additionalInfo?: string;
  rubbing?: boolean;
  trimming?: boolean;
  stance?: string;
  stanceType?: string;

  // Products (from step 3)
  searchProducts?: string;
  installedProducts?: string[];

  // Photos (from step 4)
  mainImage?: string;
  additionalImages?: string[];

  // Account Info
  subscribe?: boolean;

  // Status Management
  status?: "pending" | "approved" | "rejected";

  // User References
  createdBy?: string | null;
  updatedBy?: string | null;
  deletedBy?: string | null;
  isDelete?: boolean;
  deletedAt?: Date;

  // Timestamps
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IGalleryFormData {
  // Step 1: Vehicle Info
  buildUsername: string;
  instagram?: string;
  vehicleType: string;
  year: string;
  make: string;
  model: string;
  liftHeight?: string;
  driveType?: string;
  engine?: string;
  fuelType?: string;
  bodyType?: string;
  doorsNumber?: string;
  bedLength?: string;

  // Step 2: Wheels & Tires
  stockWheels: boolean;
  wheelBrand?: string;
  wheelModel?: string;
  wheelSize?: string;
  wheelWidth?: string;
  wheelOffset?: string;
  spacers?: string;
  stockTires: boolean;
  tireBrand?: string;
  tireModel?: string;
  tireSize?: string;
  additionalInfo?: string;

  // Step 3: Products
  searchProducts?: string;
  installedProducts?: string[];

  // Step 4: Photos
  mainImage?: string;
  additionalImages?: string[];

  // Step 5: Account
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  subscribe: boolean;
}

export interface IGalleryCreatePayload {
  // Basic Info
  title?: string;
  subtitle?: string;
  description?: string;
  shortDescription?: string;
  thumbnail?: string;

  // User Info
  name?: string;
  email: string;
  firstName: string;
  lastName: string;
  instagram?: string;

  // Vehicle Info
  buildUsername: string;
  vehicleType: string;
  year: string;
  make: string;
  model: string;
  liftHeight?: string;
  driveType?: string;
  engine?: string;
  fuelType?: string;
  bodyType?: string;
  doorsNumber?: string;
  bedLength?: string;

  // Wheels
  stockWheels?: boolean;
  wheelBrand?: string;
  wheelModel?: string;
  wheelSize?: string;
  wheelWidth?: string;
  wheelOffset?: string;
  spacers?: string;

  // Tires
  stockTires?: boolean;
  tireBrand?: string;
  tireModel?: string;
  tireSize?: string;
  additionalInfo?: string;

  // Products
  installedProducts?: string[];

  // Photos
  mainImage?: string;
  additionalImages?: string[];

  // Account
  subscribe?: boolean;
  status?: "pending" | "approved";
}

export type GalleryStatus = "pending" | "approved" | "rejected";
