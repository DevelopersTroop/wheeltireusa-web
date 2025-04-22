import { createSlice } from "@reduxjs/toolkit";

// const getBoltPatterns = async (year: string, make: string, model: string) => {
//   // fetch(`https://api.driverightdata.com/eu/api/vehicle-info/GetVehicleDataFromDRD_NA?username=Tire_Wheel_Experts&securityToken=0b035d5ccecc43f2a9adce9849c7024e&DRDModelID=178902&DRDChassisID=92688`)
//   return ["5x100", "5x114.3", "5x120"];
// };

const yearMakeModelSlice = createSlice({
  name: "yearMakeModel",
  initialState: {
    year: "",
    make: "",
    model: "",
    bodyType: "",
    subModel: "",
    chassisId: "",
    modelId: "",
    boltPattern: "",
    frontRimSize: "",
    rearRimSize: "",
    frontCenterBore: "",
    rearCenterBore: "",
    tireSizes: [] as Record<"front" | "rear", string>[],
  },
  reducers: {
    setYearMakeModel: (state, action) => {
      state.year = action.payload.year;
      state.make = action.payload.make;
      state.model = action.payload.model;
      state.bodyType = action.payload.bodyType;
      state.subModel = action.payload.subModel;
      state.chassisId = action.payload.chassisId;
      state.modelId = action.payload.modelId;
      state.boltPattern = action.payload.boltPattern;
      state.frontCenterBore = action.payload.frontCenterBore;
      state.rearCenterBore = action.payload.rearCenterBore;
      state.frontRimSize = action.payload.frontRimSize;
      state.rearRimSize = action.payload.rearRimSize;
      state.tireSizes = action.payload.tireSizes;
    },
    clearYearMakeModel: (state) => {
      state.year = "";
      state.make = "";
      state.model = "";
      state.bodyType = "";
      state.subModel = "";
      state.chassisId = "";
      state.modelId = "";
      state.boltPattern = "";
      state.frontRimSize = "";
      state.rearRimSize = "";
      state.frontCenterBore = "";
      state.rearCenterBore = "";
      state.tireSizes = [];
    },
  },
});

export default yearMakeModelSlice.reducer;
export const { setYearMakeModel, clearYearMakeModel } =
  yearMakeModelSlice.actions;
