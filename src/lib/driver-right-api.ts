// const username = "Tire_Wheel_Experts";
// const securityToken = "0b035d5ccecc43f2a9adce9849c7024e";
const apiBaseUrl = 'https://api.ktcaudio.com/api/v1';

/**
 * Get Regions
 */
const getRegions = async (): Promise<Record<string, string>> => {
  const regionsResponse = await fetch(`${apiBaseUrl}/year-makes/regions`);
  return (await regionsResponse.json()).data.regions as Record<string, string>;
};

/**
 * Get Years
 */
const getYears = async (): Promise<string[]> => {
  const yearsResponse = await fetch(`${apiBaseUrl}/year-makes/years`);
  return (await yearsResponse.json()).data.years as string[];
};

/**
 * Get Makes
 */
const getMakes = async (year: string, regionId = '1'): Promise<string[]> => {
  const makesResponse = await fetch(
    `${apiBaseUrl}/year-makes/makes?year=${year}&regionID=${regionId}`
  );
  return (await makesResponse.json()).data.makes as string[];
};

/**
 * Get Models
 */
const getModels = async (
  year: string,
  make: string,
  regionId = '1'
): Promise<string[]> => {
  const modelsResponse = await fetch(
    `${apiBaseUrl}/year-makes/models?year=${year}&manufacturer=${make}&regionID=${regionId}`
  );
  return (await modelsResponse.json()).data.models as string[];
};

/**
 * Get Body Types
 */
const getBodyTypes = async (
  year: string,
  make: string,
  model: string,
  regionId = '1'
): Promise<string[]> => {
  const bodyTypeResponse = await fetch(
    `https://api.driverightdata.com/EU/api/aaia/GetAAIABodyTypes?username=Tire_Wheel_Experts&securityToken=0b035d5ccecc43f2a9adce9849c7024e&year=${year}&regionID=${regionId}&manufacturer=${make}&model=${model}`
  );
  return (await bodyTypeResponse.json()).map(
    (bodyTypeObj: { BodyType: string }) => bodyTypeObj['BodyType']
  ) as string[];
};

/**
 * Get Sub Models
 */
const getSubModels = async (
  year: string,
  make: string,
  model: string,
  bodyType: string
): Promise<{ SubModel: string; DRChassisID: string; DRModelID: string }[]> => {
  const subModelResponse = await fetch(
    `https://api.driverightdata.com/EU/api/aaia/GetAAIASubModelsWheels?username=Tire_Wheel_Experts&securityToken=0b035d5ccecc43f2a9adce9849c7024e&year=${year}&regionID=1&manufacturer=${make}&model=${model}&bodyType=${bodyType}`
  );
  return (await subModelResponse.json()) as {
    SubModel: string;
    DRChassisID: string;
    DRModelID: string;
  }[];
};

/** Get DRDChassisReturn_NA */
const getDRDChassisReturn_NA = async (modelId: string, chassisId: string) => {
  const vehicleInfoResponse = await fetch(
    `https://api.driverightdata.com/eu/api/vehicle-info/GetVehicleDataFromDRD_NA?username=Tire_Wheel_Experts&securityToken=0b035d5ccecc43f2a9adce9849c7024e&DRDModelID=${modelId}&DRDChassisID=${chassisId}`
  );
  const vehicleInfo = await vehicleInfoResponse.json();

  // bolt pattern / PCD
  const boltPattern = vehicleInfo['DRDChassisReturn_NA']['PCD'];

  // rim size
  const frontRimSize = vehicleInfo['DRDChassisReturn_NA']['RimSize'];
  const rearRimSize =
    vehicleInfo['DRDChassisReturn_NA']['RimSize_R'] || frontRimSize;

  // center bore
  const frontCenterBore = vehicleInfo['DRDChassisReturn_NA']['CenterBore'];
  const rearCenterBore =
    vehicleInfo['DRDChassisReturn_NA']['CenterBore_R'] || frontCenterBore;

  // max wheel load
  const maxWheelLoad = vehicleInfo['DRDChassisReturn_NA']['WheelLoad_Max_Lbs'];

  // get tire sizes
  const tireSizes: { front: string; rear: string }[] = [];
  const primaryOption = vehicleInfo['DRDModelReturn']['PrimaryOption'] as {
    TireSize: string;
    TireSize_R: string;
  };

  const otherOptions = vehicleInfo['DRDModelReturn'][
    'Options'
  ] as (typeof primaryOption)[];

  const mainFrontTireSize = vehicleInfo['DRDChassisReturn_NA']['TireSize'];
  const mainRearTireSize = vehicleInfo['DRDChassisReturn_NA']['TireSize_R'];

  if (mainFrontTireSize && (mainRearTireSize || mainFrontTireSize)) {
    tireSizes.push({
      front: mainFrontTireSize,
      rear: mainRearTireSize || mainFrontTireSize,
    });
  }

  if (
    primaryOption['TireSize'] &&
    (primaryOption['TireSize_R'] || primaryOption['TireSize'])
  ) {
    tireSizes.push({
      front: primaryOption['TireSize'] as string,
      rear: primaryOption['TireSize_R'] || primaryOption['TireSize'],
    });
  }
  otherOptions.map((option) =>
    tireSizes.push({
      front: option.TireSize,
      rear: option.TireSize_R || option.TireSize,
    })
  );

  return {
    boltPattern,
    frontRimSize,
    rearRimSize,
    frontCenterBore,
    rearCenterBore,
    maxWheelLoad,
    tireSizes,
  } as {
    boltPattern: string;
    frontRimSize: string;
    rearRimSize: string;
    frontCenterBore: string;
    rearCenterBore: string;
    maxWheelLoad: string;
    tireSizes: Record<'front' | 'rear', string>[];
  };
};

/** Get Upstep wheels */
const getUpStepWheels = async (chassisId: string) => {
  const upStepWheelsResponse = await fetch(
    `https://api.driverightdata.com/eu/api/wheel-data/GetUpstepWheelsByChassisID?username=Tire_Wheel_Experts&securityToken=0b035d5ccecc43f2a9adce9849c7024e&chassisID=${chassisId}`
  );
  const upStepWheelsInfo: {
    UpstepID: number;
    ChassisID: number;
    UpstepType: string;
    UpstepCode: string;
    WheelSize: string;
    Tyre1: string;
    Tyre2: string;
    Tyre3: string;
    Tyre4: string;
    Tyre5: string;
    Tyre6: string;
    Tyre7: string;
    Tyre8: string;
    MinOffset: number;
    MaxOffset: number;
    Changedate: string;
    Comments: string;
    SortOrder: number;
    SortOrder2: number;
  }[] = await upStepWheelsResponse.json();
  const data = [];
  for (const wheelInfo of upStepWheelsInfo) {
    const wheelSize = wheelInfo.WheelSize.replaceAll(' ', '')
      .split('x')
      .map((size) => Number(size));
    const upStepType = wheelInfo.UpstepType;
    const minOffset = wheelInfo.MinOffset;
    const maxOffset = wheelInfo.MaxOffset;
    const comments = wheelInfo.Comments;
    data.push({
      diameter: Math.max(...wheelSize),
      width: Math.min(...wheelSize),
      upStepType,
      minOffset,
      maxOffset,
      comments,
    });
  }
  return data;
};

/** Get Vehicle Data */
const getVehicleData = async (modelId: string, chassisId: string) => {
  const DRDChassisReturn_NA = await getDRDChassisReturn_NA(modelId, chassisId);
  const upStepWheels = await getUpStepWheels(chassisId);
  return { ...DRDChassisReturn_NA, supportedWheels: upStepWheels };
};

export {
  getBodyTypes,
  getDRDChassisReturn_NA,
  getMakes,
  getModels,
  getRegions,
  getSubModels,
  getUpStepWheels,
  getVehicleData,
  getYears,
};
