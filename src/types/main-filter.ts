export type TMainFilterList = {
  years: string[] | null;
  makes: string[] | null;
  models: string[] | null;
  bodyTypes: string[] | null;
  subModels:
    | {
        SubModel: string;
        DRChassisID: string;
        DRModelID: string;
      }[]
    | null;
};

export type TMainFilterSubModel = {
  SubModel: string;
  DRChassisID: string;
  DRModelID: string;
};

export type TMainFilterSuportedWheel = {
  diameter: number;
  width: number;
  upStepType: string;
  minOffset: number;
  maxOffset: number;
  comments: string;
};
export type TMainFilterVehicleInformation = {
  supportedWheels: TMainFilterSuportedWheel[];
  boltPattern: string;
  frontRimSize: string;
  rearRimSize: string;
  frontCenterBore: string;
  rearCenterBore: string;
  maxWheelLoad: string;
  tireSizes: Record<'front' | 'rear', string>[] | null;
};

export type TMainFilter = {
  isFilterModalOpen: boolean;
  filters: {
    byVehicle: {
      list: Partial<TMainFilterList>;
      current: {
        year: string;
        make: string;
        model: string;
        bodyType: string;
        subModel: Partial<TMainFilterSubModel>;
        vehicleInformation: Partial<TMainFilterVehicleInformation>;
      };
    };
    byTireBrand: {
      list: {
        brands: string[];
      };
      current: {
        brand: string;
      };
    };
    byTireSize: {
      list: {
        diameters: string[];
        widths: string[];
        aspectRatios: string[];
      };
      current: {
        frontTireDiameter: string;
        rearTireDiameter: string;
        frontTireWidth: string;
        rearTireWidth: string;
        frontTireAspectRatio: string;
        rearTireAspectRatio: string;
      };
    };
  };
};

export type TDriverightData = {
  DRDModelReturn?: {
    PrimaryOption?: {
      TireSize?: string;
      TireSize_R?: string;
    };
    Options?: {
      TireSize?: string;
      TireSize_R?: string;
    }[];
  };
};
