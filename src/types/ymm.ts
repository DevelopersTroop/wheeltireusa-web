export type TYmmList = {
    years: string[],
    makes: string[],
    models: string[],
    bodyTypes: string[],
    subModels: {
        SubModel: string;
        DRChassisID: string;
        DRModelID: string;
    }[];
}

export type TYmmSubModel = {
    SubModel: string;
    DRChassisID: string;
    DRModelID: string;
}

export type TYmmSuportedWheel = {
    diameter: number;
    width: number;
    upStepType: string;
    minOffset: number;
    maxOffset: number;
    comments: string;
}
export type TYmmVehicleInformation = {
    supportedWheels: TYmmSuportedWheel[];
    boltPattern: string;
    frontRimSize: string;
    rearRimSize: string;
    frontCenterBore: string;
    rearCenterBore: string;
    maxWheelLoad: string;
    tireSizes: Record<"front" | "rear", string>[];
}

export type TYmm = {
    list: Partial<TYmmList>;
    year: string;
    make: string;
    model: string;
    bodyType: string;
    subModel: Partial<TYmmSubModel>;
    vehicleInformation: Partial<TYmmVehicleInformation>;
    submitYmm: object
}